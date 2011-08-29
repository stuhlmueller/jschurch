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

 
 (define (compile top-list external-defs . lazy)
   (let* ((church-sexpr  `(begin
                            (load "standard-preamble.church")
                            (load "xrp-preamble.church")
                            (load "mcmc-preamble.church")
                            ,@top-list))
          (ds-sexpr (de-sugar-all church-sexpr))
          (ds-sexpr (if (eq? #t lazy)
                        (add-forcing ds-sexpr) ;;to make everything lazy, wrap church-sexpr with (lazify ..) before desugaring.
                        ds-sexpr))
          (scexpr (addressing ds-sexpr)))
     `( ,@(generate-header (free-variables scexpr '()) external-defs (eq? #t lazy))
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
    ;;  at application the address is extended with a unique (to the source position) symbol.
    ((application? sexpr) `(,(addressing (first sexpr)) (cons ',(next-addr) address) store ,@(map addressing (rest sexpr))))
    ;;symbols are renamed to avoid collisions with target language.
    ((symbol? sexpr) (church-rename sexpr))
    ;;some compilers can't handle the r6rs inf numbers.
    ((number? sexpr) (cond ((nan? sexpr) 'nan)
                           ((= sexpr +inf.0) 'infinity)
                           ((= sexpr -inf.0) 'minus-infinity)
                           (else sexpr)))
    ;;sel-evaluating forms are left alone (assume target language has same primitive types).
    (else sexpr) ))

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
    ;;((self-evaluating? sexpr) (make-syntax 'self-evaluating sugared-sexpr sexpr) )
    ((quoted? sexpr) '())
    ((lambda? sexpr) (free-variables (lambda-body sexpr) (let loop ((params (lambda-parameters sexpr)))
                                                           (if (null? params)
                                                               bound-vars
                                                               (if (pair? params)
                                                                   (pair (first params) (loop (rest params)))
                                                                   (pair params bound-vars))))))
    ((if? sexpr)  (apply append (map (lambda (e) (free-variables e bound-vars)) (rest sexpr))))
    ((application? sexpr) (apply append (map (lambda (e) (free-variables e bound-vars)) sexpr)))
    ((symbol? sexpr) (if (memq sexpr bound-vars) '() (list sexpr)))
    (else '()) ))

 
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



 )

