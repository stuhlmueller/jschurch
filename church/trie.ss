#!r6rs

;; functional trie that stores lists

;; This implementation does not look for the longest prefix, but
;; creates a tree node for each list element.

(library

 (church trie)

 (export make-empty-trie
         trie-insert
         trie-lookup
         trie-pop
         trie-empty?
         trie-size
         trie->alist
         trie-remove-all
         alist->trie)

 (import (rnrs)
         (scheme-tools srfi-compat :1)
         (church readable-scheme)
         ;(only (vicare) pretty-print)
         )
 
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

 )