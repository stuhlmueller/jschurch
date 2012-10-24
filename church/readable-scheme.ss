#!r6rs

(library (church readable-scheme)
         
         (export pair rest
                 repeat
                 true false true? false?
                 tagged-list?
                 gensym
                 readable-gensym
                 pretty-print
                 gensym->symbol
                 )
         
         (import (scheme-tools srfi-compat :1)
                 (rnrs)
                 (only (ikarus) gensym pretty-print with-output-to-string)
                 )         
        
         (define rest cdr)
         (define pair cons)
         
         (define true #t)
         (define false #f)
         
         (define (true? x)
           (not (eq? x false)))
         
         (define (false? x)
           (eq? x false))
         
         (define (repeat n thunk)
           (if (> n 0)
               (pair (thunk) (repeat (- n 1) thunk))
               (list) ))
         
         (define (tagged-list? exp tag)
           (if (pair? exp)
               (eq? (car exp) tag)
               false))

         (define (readable-gensym)
           (string->symbol (with-output-to-string (lambda () (display (gensym))))))

         (define (gensym->symbol g)
           (string->symbol (with-output-to-string (lambda () (display g))))) 
         
         )
