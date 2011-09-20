#!r6rs

;; authors: noah goodman

;;this library provides the compile procedure and takes care of code transformation.

;;todo for stalin etc: bind random primitives from gsl, add compiler-specific headers.

;;external dependencies:
;; compiler: srfi 1.
;; runtime: gensym, gsl (bound in math-env), srfi 1. (for eval also need compiler + scheme eval.)

(library
 (church compiler)

 (export compile)

 (import (rnrs)
         (scheme-tools srfi-compat :1) ; lists
         (church readable-scheme)
         (church desugar)
         (church header)
         )

 ;;list of the primitive routines (defined in header) that need access to address and store.
 (define *threaded-primitives*
   '(apply force reset-store-xrp-draws make-xrp make-initial-mcmc-state make-initial-enumeration-state))

 (define (compile top-list external-defs . lazy)
   (let* ((church-sexpr  `(begin
                            (load "standard-preamble.church")
                            (load "xrp-preamble.church")
                            (load "mcmc-preamble.church")
                            ,@top-list))
          (ds-sexpr (remove-dead (de-sugar-all church-sexpr))) ;;desugar and remove unused defs.
          (ds-sexpr (if (eq? #t lazy)
                        (add-forcing ds-sexpr) ;;this supports lazy evaluation, by adding force at applications, etc.
                        ds-sexpr))
          (primitive? (let ((primitive-symbols (delete-duplicates (free-variables ds-sexpr '()))))
                        (lambda (sym) (and (not (memq sym *threaded-primitives*))
                                           (memq sym primitive-symbols)))))
          (scexpr (addressing* ds-sexpr primitive?)))
     `( ,@(generate-header (delete-duplicates (free-variables scexpr '())) external-defs (eq? #t lazy))
        (define (church-main address store) ,scexpr))))

 ;;syntax:
 (define (mem? sexpr) (tagged-list? sexpr 'mem))
 (define (lambda? exp) (tagged-list? exp 'lambda))
 (define (lambda-parameters exp) (cadr exp))
 (define (lambda-body exp) (caddr exp))
 (define (quoted? exp) (tagged-list? exp 'quote))
 (define (begin? exp) (tagged-list? exp 'begin))
                                        ;(define (definition? exp) (tagged-list? exp 'define))
 (define (if? exp) (tagged-list? exp 'if))
 (define (application? exp) (pair? exp))
 (define (letrec? exp) (tagged-list? exp 'letrec))

 ;;this transformation makes addresses (that parallel the dynamic call stack) be computed by the program.
 ;; each procedure gains address and store arguments. (the store is used to pass context information down to the random choices.)
 ;;this transform also does a church-rename to all symbols in the program (which adds church- prefix), to avoid collision with the target language.
 ;;note that mem is transformed away by re-using creation-site addresses (at the expense of re-running the mem'd computation).
 (define (addressing* sexpr primitive?)
   (define (addressing sexpr)
     (cond
      ((begin? sexpr) `(begin ,@(map addressing (rest sexpr))))
      ((quoted? sexpr) sexpr)
      ((if? sexpr) `(if ,@(map addressing (rest sexpr))))
      ((letrec? sexpr) `(letrec ,(map (lambda (binding) (list (church-rename (first binding)) (addressing (second binding)))) (second sexpr))
                          ,(addressing (third sexpr))))
                                        ;((definition? sexpr) (error "addressing" "defines should have all been de-sugared in letrecs!"))
      ((lambda? sexpr) `(lambda ,(cons 'address (cons 'store (church-rename-parameters (lambda-parameters sexpr))))
                          ,(addressing (lambda-body sexpr))))
      ((mem? sexpr) `((lambda (mem-address store proc)
                        (lambda (address store . args) (church-apply (cons args mem-address) store proc args)))
                      address
                      store
                      ,(addressing (second sexpr))))
      ;;both operator and operands are transformed; extra args (address and store) are passed into operator.
      ;;  unless the operator is primitive, at application the address is extended with a unique (to the source position) symbol.
      ((application? sexpr)
       (if (and (symbol? (first sexpr)) (primitive? (first sexpr)))
           `(,(first sexpr) ,@(map addressing (rest sexpr)))
           `(,(addressing (first sexpr)) (cons ',(next-addr) address) store ,@(map addressing (rest sexpr)))))
      ;;symbols (that aren't primitive and in operator position) are renamed to avoid collisions with target language when wrapping them.

      ((symbol? sexpr) (church-rename sexpr))
      ;;((symbol? sexpr) (if (not (primitive? sexpr)) (church-rename sexpr) sexpr))
      ;;some compilers can't handle the r6rs inf numbers.
      ((number? sexpr) (cond ((nan? sexpr) 'nan)
                             ((= sexpr +inf.0) 'infinity)
                             ((= sexpr -inf.0) 'minus-infinity)
                             (else sexpr)))
      ;;sel-evaluating forms are left alone (assume target language has same primitive types).
      (else sexpr) ))
   (addressing sexpr))

 (define symbol-index 0)
 (define (next-addr)
   (set! symbol-index (+ 1 symbol-index))
   (string->symbol (string-append "a" (number->string symbol-index))))

 (define (church-rename variable)
   (string->symbol (string-append "church-" (symbol->string variable))))

 (define (church-rename-parameters parameters)
   (cond ((pair? parameters)
          (cons (church-rename (car parameters))
                (church-rename-parameters (cdr parameters))))
         ((null? parameters) '())
         ((symbol? parameters) (church-rename parameters))
         (else (error parameters "This shouldn't happen"))))


 ;;this is used to find the free variables in a program, which need to be provided by the header (as special forms or primitives).
 (define (free-variables sexpr bound-vars)
   (cond
    ((begin? sexpr) (apply append (map (lambda (e) (free-variables e bound-vars)) (rest sexpr))))
    ((letrec? sexpr)
     (let ((new-bound (append (map first (second sexpr)) bound-vars)))
       (apply append (map (lambda (e) (free-variables e new-bound)) (pair (third sexpr) (map second (second sexpr)))))))
    ((quoted? sexpr) '())
    ((lambda? sexpr) (free-variables (lambda-body sexpr) (let loop ((params (lambda-parameters sexpr)))
                                                           (if (null? params)
                                                               bound-vars
                                                               (if (pair? params)
                                                                   (pair (first params) (loop (rest params)))
                                                                   (pair params bound-vars))))))
    ((mem? sexpr) (free-variables (second sexpr) bound-vars))
    ((if? sexpr)  (apply append (map (lambda (e) (free-variables e bound-vars)) (rest sexpr))))
    ((application? sexpr) (apply append (map (lambda (e) (free-variables e bound-vars)) sexpr)))
    ((symbol? sexpr) (if (memq sexpr bound-vars) '() (list sexpr)))
    (else '()) ))

 ;;remove unused bindings from letrecs.
 ;;would be great to do true dead code elimination, but this would require flow analysis.
 (define (remove-dead sexpr)
   (cond
    ((quoted? sexpr) sexpr)
    ((letrec? sexpr)
     (let ((kept-bindings
            (let loop ((bindings '())
                       (unused-bindings-vars (map first (second sexpr)))
                       (free-vars (free-variables (third sexpr) '())))
              (let* ((new-binding-vars (lset-intersection eq? unused-bindings-vars free-vars)))
                (if (null? new-binding-vars)
                    (filter (lambda (b) (memq (first b) bindings)) (second sexpr)) ;;keep the bindings that are used.
                    (loop (append new-binding-vars bindings) ;;extended binding set
                          (lset-difference eq? unused-bindings-vars new-binding-vars) ;;remaining binding vars
                          (apply append (map (lambda (b) (free-variables (second (assoc b (second sexpr))) '())) new-binding-vars)))))))) ;;free vars of new bindings

       `(letrec ,(remove-dead kept-bindings)
          ,(remove-dead (third sexpr)))))
    ((list? sexpr) (map remove-dead sexpr))
    (else sexpr)))



 ;;this supports lazy evaluation by adding force to appropriate places (must also add forcing to primitives via header).
 (define (add-forcing sexpr)
   (cond
    ((begin? sexpr) `(begin ,@(map (lambda (e) `(force ,(add-forcing e))) (drop-right (rest sexpr) 1)) ,(add-forcing (last sexpr))))
    ((letrec? sexpr) `(letrec ,(map (lambda (binding) (list (first binding) (add-forcing (second binding))))
                                    (second sexpr))
                        ,(add-forcing (third sexpr))))
    ((mem? sexpr) (map add-forcing sexpr))
    ((quoted? sexpr) sexpr)
    ((lambda? sexpr) `(lambda ,(lambda-parameters sexpr) ,(add-forcing (lambda-body sexpr))))
    ((if? sexpr) `(if (force ,(add-forcing (second sexpr))) ,(add-forcing (third sexpr)) ,(add-forcing (fourth sexpr))))
    ((application? sexpr) `((force ,(add-forcing (first sexpr))) ,@(map add-forcing (rest sexpr))))
    (else sexpr) ))



 ;; ;;do a partial evaluation with constraint propogation.
 ;; ;;abstract values are: xrp (from make-xrp), random (if a an xrp may have contributed to this value), and ordinary values.
 ;; ;;when an ordinary value is applied to ordinary values we repace with a static result (to evaluate away non-random things).
 ;; ;;functions that cannot invoke xrp values as operators are marked as deterministic (allows to avoid addressing in them).
 ;; ;;when an xrp value is applied in a constrained context, we mark with set-xrp.
 ;; (define WC 'wildcard-cs)
 ;; (define XV 'xrp-val)
 ;; (define (peval/constraints sexpr cs env)
 ;;   (cond
 ;;    ((begin? sexpr) (apply append (map (lambda (e) (free-variables e bound-vars)) (rest sexpr))))
 ;;    ((letrec? sexpr)
 ;;     (let ((new-bound (append (map first (second sexpr)) bound-vars)))
 ;;       (apply append (map (lambda (e) (free-variables e new-bound)) (pair (third sexpr) (map second (second sexpr)))))))
 ;;    ((quoted? sexpr) '())
 ;;    ((lambda? sexpr) (make-closure sexpr env)) ;;lambda generates the usual lambda value. need closure?
 ;;    ((mem? sexpr) (free-variables (second sexpr) bound-vars))
 ;;    ((if? sexpr)  (apply append (map (lambda (e) (free-variables e bound-vars)) (rest sexpr))))
 ;;    ((application? sexpr)
 ;;     (let ((operator (peval/constraints (first sexpr) WC env))
 ;;           (cond
 ;;            ((eq? (first sexpr) 'make-xrp) XV)
 ;;            ((eq? operator XV) ..)
 ;;            ((lambda? operator) ...)
 ;;            ((primitive? operator) ...) ;;for invertible ones, invert.

 ;;      (apply append (map (lambda (e) (free-variables e bound-vars)) sexpr)))
 ;;    ((symbol? sexpr) (env-lookup sexpr env)) ;;fix: if it isn't bound, assume it's primitive.
 ;;    (else sexpr) ))


 )
