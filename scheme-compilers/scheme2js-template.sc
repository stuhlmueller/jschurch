3;; Broken placeholder constants
(define infinity 999999999999)
(define minus-infinity (- 999999999999))
(define nan (/ 1 0))
(define pi 3.14159265)

;; These are the correct defines, but they don't work until we fix the compiler
;; (define infinity Number.POSITIVE_INFINITY)
;; (define minus-infinity Number.NEGATIVE_INFINITY)
;; (define nan Number.NaN)
;; (define pi Math.PI)

;; These functions are defined in math-functions.js
;;(define logistic #f)
;;(define lnfact #f)
;;(define logsumexp #f)
;(define normalize #f)

;; These functions are defined in math-functions.js, but need aliases
(define sample-gamma sample_gamma)
(define gamma-pdf gamma_pdf)
(define gamma-lnpdf gamma_lnpdf)
(define sample-poisson sample_poisson)
(define sample-binomial sample_binomial)
(define sample-beta sample_beta)
(define sample-gaussian sample_gaussian)
(define gaussian-pdf gaussian_pdf)
(define gaussian-lnpdf gaussian_lnpdf)
(define sample-dirichlet sample_dirichlet)
(define dirichlet-lnpdf dirichlet_lnpdf)
(define sample-tdist sample_tdist)
(define tdist-pdf tdist_pdf)
(define sample-generalized-tdist sample_generalized_tdist)
(define binomial-pdf binomial_pdf)
(define poisson-pdf poisson_pdf)
(define random-real random_real)
(define random-integer random_integer)
(define seed-rng seed_rng)

;; These two are defined, but there are some name clashes
;;(define sum #f)
;;(define mean #f)

;;;The following math functions (which are provided by GSL in the ikarus version) could be given js implementations...
(define (discrete-pdf probs val) (list-ref probs val))
(define (discrete-sampler probs)
  (let loop ((probs probs)
             (past 0)
             (i 0))
    (if (< (random-real) (/ (first probs) (- 1 past)))
        i
        (loop (rest probs) (+ past (first probs)) (+ i 1)))))

;;;various functions needed by header:

;; ;(fold kons knil lis) = (fold kons (kons (car lis) knil) (cdr lis))
;; ;(fold kons knil '()) = knil
(define (fold f z xs)
  (if (null? xs)
      z
      (fold f (f (first xs) z) (rest xs))))

(define current-date (lambda args #f))
(define exact->inexact (lambda (x) x))
(define inexact->exact (lambda (x) x))
(define (display x) (document.write x))
(define pretty-print display)

(define scheme-gensym gensym)

(define true #t)
(define false #f)

(define first car)
(define rest cdr)
(define pair cons)
(define (second lst) (cadr lst))
(define (third lst) (caddr lst))
(define (fourth lst) (cadddr lst))
(define (fifth lst) (list-ref lst 4))
(define (sixth lst) (list-ref lst 5))
(define (seventh lst) (list-ref lst 6))
(define (eighth lst) (list-ref lst 7))
(define (ninth lst) (list-ref lst 8))
(define (tenth lst) (list-ref lst 9))

;;;for score gradients (currently not working), requires AD:
(define (*with-score-gradient*) #f)
(define (xy-gradient-R x) (error 'grad-undefined "xy-gradient-R undefined"))
(define (tape? x) #f)
(define (tapify x) x)
(define (untapify x) x)
;; (define (min a b) (if (< a b) a b)) ;;FIXME: proper dmin?
;; (define (continuous? x) (and (real? x) (not (fixnum? x))))
(define continuous? real?)

;;;the program, defining the church-main function, will be spliced in here:
%(churchprogram)s

;;go...
(display (church-main '(top) (make-empty-store)))
