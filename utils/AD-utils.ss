
;;this is untested!!!
;;to use, comment out (rnrs) from header-ikarus.sc and comment in the other stuff.


;; fn: real --> real
(define (church-derivative address store fn)
  (let* ((scheme-fn (lambda (x) (fn address store x)))
         (scheme-derivative (derivative-R scheme-fn)))
    (lambda (address store x) (scheme-derivative x))))

;;fn: list real --> real
(define (church-gradient address store fn)
  (let* ((scheme-fn (lambda (x) (fn address store x)))
         (scheme-gradient (gradient-list-R scheme-fn)))
    (lambda (address store x) (scheme-gradient x))))