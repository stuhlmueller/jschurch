#!r6rs

;; functional trie that stores lists

;; This implementation does not look for the longest prefix, but
;; creates a tree node for each list element.

(library

 (church trie)

 (export make-empty-trie
         copy-trie
         trie-insert
         trie-lookup
         trie-update
         ;trie-pop
         ;trie-empty?
         ;trie-size
         trie->values
         ;trie-remove-all
         alist->trie)

 (import (rnrs)
         (scheme-tools srfi-compat :1)
         (church readable-scheme)
         ;(only (vicare) pretty-print)
         )

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
       (if (not (eq? 'none (trie->val trie)));(null? (trie->children trie))
           (fn (trie->val trie))
           (map (lambda (c) (walk-trie (cdr c) fn)) (trie->children trie))))

     (define (alist->trie alist)
       (if (null? alist)
           (make-empty-trie)
           (trie-insert (alist->trie (cdr alist)) (caar alist) (cdar alist))))

     ;;walk trie, making new pairs.
     (define (copy-trie trie)
       (make-trie (trie->val trie) (map (lambda (k-t) (cons (car k-t) (copy-trie (cdr k-t)))) (trie->children trie))))

     (define (trie-insert trie key val) (trie-update trie key (lambda (v) val)))
     (define (trie-lookup trie key)
       (define val 'none)
       (trie-update trie key (lambda (v) (set! val v) v))
       val)
     (define (trie-update trie key fn)
       (let loop ((trie trie)
                  (key key))
         (if (null? key)
             (set-car! trie (fn (trie->val trie)))
             (let* ((entry (assoc (car key) (trie->children trie)))
                    (sub-trie (if (eq? #f entry)
                                  (let ((new-child (make-empty-trie)))
                                    (set-cdr! trie (cons (cons (car key) new-child) (trie->children trie)))
                                    new-child)
                                  (cdr entry))))
               (loop sub-trie (cdr key))))))

 )