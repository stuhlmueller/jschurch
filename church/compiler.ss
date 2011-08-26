#!r6rs

;; authors: noah goodman

;;this library provides the compile procedure and takes care of code transformation.

;;todo for stalin etc: bind random primitives from gsl, add compiler-specific headers.

;;external dependencies:  compiler: srfi 1.  runtime: gensym, gsl as bound in math-env, srfi 1.

(library
 (church compiler)

 (export compile)

 (import (rnrs)
         (scheme-tools srfi-compat :1) ; lists
         (church readable-scheme)
         (church desugar)
         (church header)
         )

 (define *storethreading* false)
 (define *lazy* false) ;;at the moment this just turns on forcing, in order to support lazified code. explicitly lazify an expression to make it lazy.
 
 (define (compile top-list external-defs)
   (let* ((church-sexpr  `(begin
                            (load "standard-preamble.church")
                            (load "xrp-preamble.church")
                            (load "mcmc-preamble.church")
                            ,@top-list))
          (ds-sexpr (de-sugar-all church-sexpr))
          (ds-sexpr (if *lazy*
                        (add-forcing ds-sexpr) ;;to make everything lazy, wrap church-sexpr with (lazify ..) before desugaring.
                        ds-sexpr))
          (scexpr (if *storethreading*
                      (storethreading (addressing ds-sexpr))
                      (addressing ds-sexpr))))
     `( ,@(generate-header *storethreading* *lazy* (free-variables scexpr '()) external-defs)
        (define (church-main address store) ,scexpr))))
 
 (define symbol-index 0)
 (define (next-addr)
   (set! symbol-index (+ 1 symbol-index))
   (string->symbol (string-append "a" (number->string symbol-index))))

 (define (mem? sexpr) (tagged-list? sexpr 'mem))
 (define (lambda? exp) (tagged-list? exp 'lambda))
 (define (lambda-parameters exp) (cadr exp))
 (define (lambda-body exp) (caddr exp))
 (define (quoted? exp) (tagged-list? exp 'quote))
 (define (begin? exp) (tagged-list? exp 'begin))
 (define (definition? exp) (tagged-list? exp 'define))
 (define (if? exp) (tagged-list? exp 'if))
 (define (application? exp) (pair? exp))
 (define (letrec? exp) (tagged-list? exp 'letrec))

 (define *qobi?* #f)
 (define (set-qobi!) (set! *qobi?* #t))
 
 (define (church-rename variable)
   (string->symbol (string-append "church-" (symbol->string variable))))

 (define (church-rename-parameters parameters)
  (cond ((pair? parameters)
	 (cons (church-rename (car parameters))
	       (church-rename-parameters (cdr parameters))))
	((null? parameters) '())
	((symbol? parameters) (church-rename parameters))
	(else (error parameters "This shouldn't happen"))))

 (define (addressing sexpr)
   (cond
    ((begin? sexpr) `(begin ,@(map addressing (rest sexpr))))
    ((definition? sexpr) (error "addressing" "defines should have all been de-sugared!"))
    ((letrec? sexpr) `(letrec ,(map (lambda (binding) (list (church-rename (first binding)) (addressing (second binding)))) (second sexpr))
                        ,(addressing (third sexpr))))
    ((mem? sexpr) `((lambda (mem-address store proc)
                      (lambda (address store . args) (church-apply (cons args mem-address) store proc args)))
                    address
                    store
                    ,(addressing (second sexpr))))
    ;;((self-evaluating? sexpr) (make-syntax 'self-evaluating sugared-sexpr sexpr) )
    ((quoted? sexpr) sexpr)
    ((lambda? sexpr) `(lambda ,(cons 'address (cons 'store (church-rename-parameters (lambda-parameters sexpr))))
                        ,(addressing (lambda-body sexpr))))
    ((if? sexpr) `(if ,@(map addressing (rest sexpr))))
    ((application? sexpr) `(,(addressing (first sexpr)) (cons ',(next-addr) address) store ,@(map addressing (rest sexpr))))
    ((and *qobi?* (number? sexpr)) (cond ((nan? sexpr) 'nan)
                                         ((= sexpr +inf.0) 'infinity)
                                         ((= sexpr -inf.0) 'minus-infinity)
                                         (else sexpr)))
    ((symbol? sexpr) (church-rename sexpr))
    (else sexpr) )) 

 ;;this happens after addressing, so store is already passed 'down' the calls. must do a-normal form conversion and return store.
 ;;assumes that every application has address and store as first two operand exprs, and that every lambda takes these.
 ;;FIXME!! the generated letrec doesn't work right (inits are evaluated with symbols bound to void).
 (define (storethreading sexpr)
    (cond
     ((begin? sexpr) (storethreading (last sexpr))) ;;FIXME!!! don't drop non-final exprs...
     ((letrec? sexpr) 
      (let ((ret-symbols (repeat (+ 1 (length (second sexpr))) gensym)))
        `(letrec ((,(first ret-symbols) (list 'foo store))
                   ,@(apply append (map (lambda (rs prev-rs binding) `((,rs (let ((store (second ,prev-rs))) ,(storethreading (second binding))))
                                                                       (,(first binding) (first ,rs))))
                                        (rest ret-symbols) (drop-right ret-symbols 1) (second sexpr))))
                  (let ((store (second ,(last ret-symbols)))) ,(storethreading (third sexpr))))))
    ((quoted? sexpr) `(list ,sexpr store))
    ((lambda? sexpr) `(list ,sexpr store))
    ((if? sexpr) `(let* ((p ,(storethreading (second sexpr)))
                         (p-value (first p))
                         (store (second p)))
                    (if p-value ,(storethreading (third sexpr)) ,(storethreading (fourth sexpr)))))
    ((application? sexpr)
     (let ((value-symbols (repeat (- (length sexpr) 2) gensym))
           (ret-symbols (repeat (- (length sexpr) 2) gensym)))
       `(let* ((,(first ret-symbols) ,(storethreading (first sexpr)))
               (,(first value-symbols) (first ,(first ret-symbols)))
               (store (second ,(first ret-symbols)))
               ,@(apply append
                        (map (lambda (rs vs e) `((,rs ,(storethreading e))
                                          (,vs (first ,rs))
                                          (store (second ,rs))))
                             (rest ret-symbols)
                             (rest value-symbols)
                             (drop sexpr 3))))
          (,(first value-symbols) ,(second sexpr) store ,@(rest value-symbols)))))
    (else `(list ,sexpr store)) ))


 ;;this is used to find the free variables in a program, which need to be provided by the header. (will also be used by caching...)
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

 
 ;;this happens after lazifying, it adds force to appropriate places (must also add forcing to primitives via header).
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

