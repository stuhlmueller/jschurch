if (!String.prototype.supplant) {
  String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
                        function (a, b) {
                          var r = o[b];
                          return typeof r === 'string' || typeof r === 'number' ? r : a;
                        }
                       );
  };
}

var scheme2jsTemplate = ";; Broken placeholder constants\n\
(define infinity 999999999999)\n\
(define minus-infinity (- 999999999999))\n\
(define nan (/ 1 0))\n\
(define pi 3.14159265)\n\
\n\
;; These are the correct defines, but they don't work until we fix the compiler\n\
;; (define infinity Number.POSITIVE_INFINITY)\n\
;; (define minus-infinity Number.NEGATIVE_INFINITY)\n\
;; (define nan Number.NaN)\n\
;; (define pi Math.PI)\n\
\n\
;; These functions are defined in math-functions.js\n\
;;(define logistic #f)\n\
;;(define lnfact #f)\n\
;;(define logsumexp #f)\n\
;(define normalize #f)\n\
\n\
;; These functions are defined in math-functions.js, but need aliases\n\
(define sample-gamma sample_gamma)\n\
(define gamma-pdf gamma_pdf) ;; Why was this an ln version? Score computations are done in ln domain, so need ln-score...\n\
(define sample-poisson sample_poisson)\n\
(define sample-binomial sample_binomial)\n\
(define sample-beta sample_beta)\n\
(define sample-gaussian sample_gaussian)\n\
(define gaussian-pdf gaussian_pdf) ;; Why was this an ln version? Score computations are done in ln domain, so need ln-score...\n\
(define sample-dirichlet sample_dirichlet)\n\
(define dirichlet-lnpdf dirichlet_lnpdf)\n\
(define sample-tdist sample_tdist)\n\
(define tdist-pdf tdist_pdf)\n\
(define sample-generalized-tdist sample_generalized_tdist)\n\
(define binomial-pdf binomial_pdf)\n\
(define poisson-pdf poisson_pdf)\n\
(define random-real random_real)\n\
(define random-integer random_integer)\n\
(define seed-rng seed_rng)\n\
\n\
;; These two are defined, but there are some name clashes\n\
;;(define sum #f)\n\
;;(define mean #f)\n\
\n\
;;;The following math functions (which are provided by GSL in the ikarus version) could be given js implementations...\n\
(define (discrete-pdf probs val) (list-ref probs val))\n\
(define (discrete-sampler probs)\n\
  (let loop ((probs probs)\n\
             (past 0)\n\
             (i 0))\n\
    (if (< (random-real) (/ (first probs) (- 1 past)))\n\
        i\n\
        (loop (rest probs) (+ past (first probs)) (+ i 1)))))\n\
\n\
;;;various functions needed by header:\n\
\n\
;; ;(fold kons knil lis) = (fold kons (kons (car lis) knil) (cdr lis))\n\
;; ;(fold kons knil '()) = knil\n\
(define (fold f z xs)\n\
  (if (null? xs)\n\
      z\n\
      (fold f (f (first xs) z) (rest xs))))\n\
\n\
(define current-date (lambda args #f))\n\
(define exact->inexact (lambda (x) x))\n\
(define inexact->exact (lambda (x) x))\n\
;; (define (display x) (document.write x))\n\
;; (define pretty-print display)\n\
\n\
(define scheme-gensym gensym)\n\
\n\
(define true #t)\n\
(define false #f)\n\
\n\
(define first car)\n\
(define rest cdr)\n\
(define pair cons)\n\
(define (second lst) (cadr lst))\n\
(define (third lst) (caddr lst))\n\
(define (fourth lst) (cadddr lst))\n\
(define (fifth lst) (list-ref lst 4))\n\
(define (sixth lst) (list-ref lst 5))\n\
(define (seventh lst) (list-ref lst 6))\n\
(define (eighth lst) (list-ref lst 7))\n\
(define (ninth lst) (list-ref lst 8))\n\
(define (tenth lst) (list-ref lst 9))\n\
\n\
;;;for score gradients (currently not working), requires AD:\n\
(define (*with-score-gradient*) #f)\n\
(define (xy-gradient-R x) (error 'grad-undefined \n\"xy-gradient-R undefined\"))\n\
(define (tape? x) #f)\n\
(define (tapify x) x)\n\
(define (untapify x) x)\n\
;; (define (min a b) (if (< a b) a b)) ;;FIXME: proper dmin?\n\
;; (define (continuous? x) (and (real? x) (not (fixnum? x))))\n\
(define continuous? real?)\n\
\n\
;;;the program, defining the church-main function, will be spliced in here:\n\
{churchprogram}\n\
\n\
;;go...\n\
(display (church-main '(top) (make-empty-store)))";