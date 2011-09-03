<!DOCTYPE html>
<html>
<body>

<div id="bs-console"></div>

<script type="text/javascript" src="../external/biwascheme/lib/biwascheme.js">

(define discrete-pdf #f)
(define discrete-sampler #f)

(define infinity +inf.0)
(define minus-infinity -inf.0)
(define nan +nan.0)

(define pi #f)
(define logistic #f)
(define lnfact #f)
(define binomial-pdf #f)
(define gamma-lnpdf #f)
(define dirichlet-lnpdf #f)
(define poisson-pdf #f)
(define gaussian-lnpdf #f)
(define tdist-pdf #f)
(define mean #f)
(define mmultinomial-lnpdf #f)
(define normalize #f)
(define sample-binomial #f)
(define sample-poisson #f)
(define sample-gaussian #f)
(define sample-generalized-tdist #f)
(define sample-tdist #f)
(define sample-gamma #f)
(define sample-dirichlet #f)
(define sample-mmultinomial #f)
(define seed-rng #f)
(define sum #f)
(define logsumexp #f)

;; from jscreme
(define (append . args)
  (letrec ((recur (lambda (ls)
		    (cond ((null? (cdr ls))
			   (car ls))
			  ((null? (car ls))
			   (recur (cdr ls)))
			  (else
			   (cons (caar ls) (recur (cons (cdar ls) (cdr ls)))))))))
    (if (null? args)
	'()
	(recur args))))

(define (make-list len . maybe-elt)
  (let ((elt (cond ((null? maybe-elt) #f) ; Default value
		   ((null? (cdr maybe-elt)) (car maybe-elt))
		   (else (error "Too many arguments to MAKE-LIST"
				(cons len maybe-elt))))))
    (do ((i len (- i 1))
	 (ans '() (cons elt ans)))
	((<= i 0) ans))))

;; (define (make-list len . maybe-elt)
;;   (let ((elt (if ((null? maybe-elt) #f) ; Default value
;;                  (car maybe-elt))))
;;     (let loop ((i len)
;;                (lst '()))
;;       (if (<= i 0) lst (loop (- i 1) (cons elt lst))))))

;; right fold
(define (fold f base xs) 
  (if (null? xs)
      base
      (f (car xs)
         (fold f
               base
               (cdr xs)))))

(define (fold-left f z xs)
  (if (null? xs)
      z
      (fold f (f z (first xs)) (rest xs))))

(define randomize-rng (lambda args #f))
(define current-date (lambda args #f))
(define exact->inexact (lambda (x) x))
(define inexact->exact (lambda (x) x))
(define pretty-print display)

(define scheme-gensym gensym)

(define first car)
(define rest cdr)
(define pair cons)
(define (second lst) (list-ref lst 1))
(define (third lst) (list-ref lst 2))
(define (fourth lst) (list-ref lst 3))
(define (fifth lst) (list-ref lst 4))
(define (sixth lst) (list-ref lst 5))
(define (seventh lst) (list-ref lst 6))
(define (eighth lst) (list-ref lst 7))
(define (ninth lst) (list-ref lst 8))
(define (tenth lst) (list-ref lst 9))

;;;non-functional trie
;;provides: make-empty-trie, copy-trie, trie-insert, trie-lookup, trie-update, trie->values, alist->trie

(define none 'none)

(define (make-empty-trie)
  (make-trie none '()))

;; children is a list [(key-part . trie) ...]
(define (make-trie val children)
  (pair val children))

(define trie->val car)

(define trie->children cdr)

(define (trie-empty? trie)
  (null? (trie->children trie)))

(define (trie->values trie)
  (define vals '())
  (walk-trie trie (lambda (v) (set! vals (cons v vals))))
  vals)

;;apply fn to all the leaves of trie.
(define (walk-trie trie fn)
  (if (null? (trie->children trie))
      (fn (trie->val trie))
      (map (lambda (c) (walk-trie (cdr c) fn)) (trie->children trie))))

(define (alist->trie alist)
  (if (null? alist)
      (make-empty-trie)
      (trie-insert (alist->trie (cdr alist)) (caar alist) (cdar alist))))

;;walk trie, making new pairs.
(define (copy-trie trie)
  (make-trie (trie->val trie) (map (lambda (k-t) (cons (car k-t) (copy-trie (cdr k-t)))) (trie->children trie))))

;; overwrites existing value if any
(define (trie-insert trie key val)
  (if (null? key)
      (set-car! trie val)
      (let ((sub-trie (assoc (car key) (trie->children trie))))
        (if (eq? #f sub-trie)
            (set-cdr! trie (cons (cons (car key) (trie-insert (make-empty-trie) (cdr key) val))
                                 (trie->children trie)))
            (trie-insert (cdr sub-trie) (cdr key) val))))
  trie)

(define (trie-lookup trie key)
  (if (null? key)
      (trie->val trie)
      (let ((sub-trie (assoc (car key) (trie->children trie))))
        (if (eq? #f sub-trie)
            (error "there should be a path to the val" (list key trie) "trie-lookup")
            (trie-lookup (cdr sub-trie) (cdr key))))))
      
(define (trie-update trie key fn)
  (if (null? key)
      (set-car! trie (fn (trie->val trie)))
      (let ((sub-trie (assoc (car key) (trie->children trie))))
        (if (eq? #f sub-trie)
            (set-cdr! trie (cons (cons (car key) (trie-update (make-empty-trie) (cdr key) fn))
                                 (trie->children trie)))
            (trie-update (cdr sub-trie) (cdr key) fn))))
  trie)


;;for score gradients:
(define (*with-score-gradient*) #f)
(define (xy-gradient-R x) (error 'grad-undefined "xy-gradient-R undefined"))
(define (tape? x) #f)
(define (tapify x) x)
(define (untapify x) x)
;; (define (min a b) (if (< a b) a b)) ;;FIXME: proper dmin?
;; (define (continuous? x) (and (real? x) (not (fixnum? x))))
(define continuous? real?)
