(import
 ;; (rnrs)
 ;; ;;for AD fun comment these in and (rnrs) out:
 ;; ;;(except (rnrs) real? negative? positive? zero? >= <= > < = atan cos sin expt log exp sqrt / * - +)
 ;; ;;(church utils AD)
 
 ;; (rnrs mutable-pairs) ;;because the header uses set-car! when note storethreading.
 ;; (except (srfi :1) remove partition member map for-each fold-right find filter assoc) ;;provides some list functions that are used.
 ;; (srfi :19) ;;date+time for inference timing
 ;; (rename (scheme-tools math) (sample-discrete discrete-sampler)) ;;this provides the gsl sampling/scoring functions.
 ;; (rename (only (ikarus)
 ;;               gensym ;;this is needed.
 ;;               pretty-print
 ;;               exact->inexact) ;;this isn't really needed.
 ;;         (gensym scheme-gensym))

 ;; (church trie)

 ;; ;(church compiler)
 ;; ;(rnrs eval)

 ;; ;(except (srfi :69) string-ci-hash string-hash) ;;used for CGIS, can comment out otherwise...

 ;; )



 (except (rnrs) real? negative? positive? zero? >= <= > < = atan cos sin expt log exp sqrt / * - + min)
 (church AD)
 (rename (except (scheme-tools math) lngamma) (sample-discrete discrete-sampler)) ;;this provides the gsl sampling/scoring functions.
 
 (rnrs mutable-pairs) ;;because the header uses set-car!
 (scheme-tools srfi-compat :1) ;;provides some list functions that are used.
 (srfi :19) ;;date+time for inference timing
 (srfi :48)
 (rename (only (ikarus)
               gensym ;;this is needed.
               pretty-print
               exact->inexact
	       inexact->exact) ;;this isn't really needed.
         (gensym scheme-gensym))

 ;(church readable-scheme)

 ;(church trie)

 (church compiler)
 (rnrs eval)

 ;(except (scheme-tools srfi-compat :69) string-ci-hash string-hash) ;;used for CGIS, can comment out otherwise...

 (only (scheme-tools) normalize string-sort bin)
 )

;;for score gradients:
(define (*with-score-gradient*) #f)
(define tapify (make-tapifier))
(define (min a b) (if (< a b) a b)) ;;FIXME: proper dmin?
(define (continuous? x) (and (real? x) (not (fixnum? x))))


(define infinity +inf.0)
(define minus-infinity -inf.0)
(define nan +nan.0)

(define rest cdr)
(define pair cons)
(define true #t)
(define false #f)

%(churchprogram)s

;;seed the random number generator
(randomize-rng)

(display
(church-main '(top) (make-empty-store))
) (newline)
;;done