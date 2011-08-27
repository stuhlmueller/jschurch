<!DOCTYPE html>
<html>
<body>

<div id="bs-console"></div>

<script type="text/javascript" src="../external/biwascheme/lib/biwascheme.js">

(define discrete-pdf #f)
(define discrete-sampler #f)
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


;; trie
 (define none 'none)
 
 ;; look for first element x that matches pred, replace with (update x)
 (define (replace lst pred update)
   (if (null? lst)
       '()
       (if (pred (car lst))
           (cons (update (car lst))
                 (cdr lst))
           (cons (car lst)
                 (replace (cdr lst) pred update)))))

 (define (make-empty-trie)
   (make-trie none '()))

 (define (trie-empty? trie)
   (and (eq? (trie->val trie) none)
        (null? (trie->children trie))))

 ;; children is a list [(key-part . trie) ...]
 (define (make-trie val children)
   (pair val children))

 (define trie->val car)

 (define trie->children cdr)

 (define (trie->alist trie)
   (define (%trie->alist trie path)
     (let ([child-vals (apply append
                              (map (lambda (b) (%trie->alist (cdr b) (cons (car b) path)))
                                   (trie->children trie)))])
       (if (eq? (trie->val trie) none)
           child-vals
           (cons (cons (reverse path) (trie->val trie))
                 child-vals))))
   (%trie->alist trie '()))

 (define (trie-size trie)
   (+ (if (eq? (trie->val trie) none) 0 1)
      (apply + (map (lambda (b) (trie-size (cdr b)))
                    (trie->children trie)))))

 (define (alist->trie alist)
   (let loop ([trie (make-empty-trie)]
              [to-insert alist])
     (if (null? to-insert)
         trie
         (loop (trie-insert trie (caar to-insert) (cdar to-insert))
               (cdr to-insert)))))

 ;; overwrites existing value if any
 (define (trie-insert trie key val)
   (if (null? key)
       (make-trie val
                  (trie->children trie))
       (make-trie (trie->val trie)
                  (trie-insert* (trie->children trie) key val))))
 
 ;; assumes that only one child matches key
 (define (trie-insert* bindings key val)
   (let ([v (assoc (car key) bindings)])
     (if (eq? v #f)
         ;; build fresh subtree
         (cons (cons (car key)
                     (trie-insert (make-empty-trie) (cdr key) val))
               bindings)
         ;; insert into existing subtree
         (replace bindings
                  (lambda (b) (equal? (car b) (car key)))
                  (lambda (b) (cons (car b) (trie-insert (cdr b) (cdr key) val)))))))

 (define (trie-lookup trie key)
   (if (null? key)
       (trie->val trie)
       (let ([b (assoc (car key)
                       (trie->children trie))])
         (if (eq? b #f)
             #f
             (trie-lookup (cdr b) (cdr key))))))

 (define (trie-remove-all trie keys)
   (if (null? keys)
       trie
       (trie-remove-all (cdr (trie-pop trie (car keys)))
                        (cdr keys))))

 ;; returns (val . list-of-nodes-along-path) if key is found, otherwise #f
 (define (trie-lookup+reverse-path trie key path)
   (if (null? key)
       (cons (trie->val trie)
             path)
       (let ([b (assoc (car key)
                       (trie->children trie))])
         (if (eq? b #f)
             #f
             (trie-lookup+reverse-path (cdr b) (cdr key) (cons b path))))))
 
 ;; if key in trie, return (val . new-trie)
 ;; otherwise, return (#f . trie)
 ;; new-trie does not have any unnecessary nodes
 (define (trie-pop trie key)
   (let ([val/reverse-path (trie-lookup+reverse-path trie key '())])
     (if (eq? val/reverse-path #f)
         (cons #f trie)
         (cons (car val/reverse-path)
               (trie-remove-path trie (cdr val/reverse-path))))))

 ;; search path from back to front, then return path from front until
 ;; (and including) place where pred hit
 ;; (9 8 7 6 5 4 3 2 1)
 ;; don't check first item
 (define (path-upto reverse-path pred)
   (let loop ([p reverse-path])
     (if (null? p)
         '()
         (if (null? (cdr p)) 
             '()
             (if (pred (cadr p))
                 (reverse p)
                 (loop (cdr p)))))))

 ;; strategy:
 ;; on the way down, accumulate list of all nodes+parents along the way
 ;; find the first node that has only a single child
 ;; replace this node with childless node, recursively replace children up to root
 (define (trie-remove-path trie reverse-path)
   (if (not (null? (trie->children (cdar reverse-path))))
       (trie-insert trie (reverse (map car reverse-path)) none)
       (let* ([path-to-divergence
               (path-upto (reverse (cons (cons 'no-key trie) (reverse reverse-path))) ;; FIXME!!
                          (lambda (b) (or (> (length (trie->children (cdr b))) 1)
                                     (not (eq? (trie->val (cdr b)) #f)))))]
              [path-to-divergence (if (null? path-to-divergence) (list (cons 'no-key trie)) path-to-divergence)])
         (let loop ([path-remaining path-to-divergence])
           (let* ([t (cdar path-remaining)])
             (make-trie (trie->val t)
                        (if (null? (cdr path-remaining))
                            '()
                            (if (null? (cddr path-remaining))
                                (filter (lambda (b) (not (eq? (car b) (caadr path-remaining))))
                                        (trie->children t))
                                (replace (trie->children t)
                                         (lambda (b) (eq? (car b) (caadr path-remaining)))
                                         (lambda (b) (cons (car b) (loop (cdr path-remaining)))))))))))))

;;for score gradients:
(define (*with-score-gradient*) #f)
(define (xy-gradient-R x) (error 'grad-undefined "xy-gradient-R undefined"))
(define (tape? x) #f)
(define (tapify x) x)
(define (untapify x) x)
;; (define (min a b) (if (< a b) a b)) ;;FIXME: proper dmin?
;; (define (continuous? x) (and (real? x) (not (fixnum? x))))
(define continuous? real?)
