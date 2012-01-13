
                                        ;(library (church readable-scheme)

                                        ;         (export pair rest
                                        ;                 repeat
                                        ;                 true false true? false?
                                        ;                 tagged-list?
                                        ;                 gensym
                                        ;                 readable-gensym
                                        ;                 pretty-print
                                        ;                 )

                                        ;         (import (scheme-tools srfi-compat :1)
                                        ;                 (rnrs)
                                        ;                 (only (ikarus) gensym pretty-print with-output-to-string)
                                        ;                 )         


;;;things needed only for r5rs (?)
(define first car)
(define second cadr)
(define third caddr)
(define fourth cadddr)
(define (fifth lst) (list-ref lst 4))
(define (sixth lst) (list-ref lst 5))
(define (seventh lst) (list-ref lst 6))
(define (eighth lst) (list-ref lst 7))
(define (ninth lst) (list-ref lst 8))
(define (tenth lst) (list-ref lst 9))

;; (define (fold f z xs)
;;   (if (null? xs)
;;       z
;;       (fold f (f (first xs) z) (rest xs))))


;;;other things
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

;(define (readable-gensym)
;  (string->symbol (with-output-to-string (lambda () (display (gensym))))))

;; (define gensymind 0)
;; (define (gensym)
;;   (set! gensymind (+ 1 gensymind))
;;   (string->symbol (string-append "g" (number->string gensymind))))
  

                                        ;)
