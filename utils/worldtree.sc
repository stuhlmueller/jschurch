

;;auxiliary function which captures the xrp-draw sequence from evaluating a church thunk. makes a dot file of the world-tree that this implies
;;note: this is not a proper church random function, as it returns the call store, not the store after sampling thunk.
;;note: this doesn't currently work with store threading method.

(define (church-repeat-with-trace address store N thunk dotfilename . world-tree)
  (if (= N 0)
      (makedot dotfilename (first world-tree))
      (let* ((tmpstore (cons '() (cdr store))) ;;tmpstore has empty xrp-draws
             (world-tree (if (null? world-tree) (make-world-tree) (first world-tree)))
             (retval (church-apply address tmpstore thunk '())))
        (church-repeat-with-trace address store (- N 1) thunk dotfilename
                                  (add-path world-tree (map (lambda (x) (list (car x) (xrp-draw-value (cdr x)) (xrp-draw-name (cdr x))))
                                                            (cons (final retval) (store->xrp-draws tmpstore))))))))

;(define init (cons '(init) (make-xrp-draw '(addr) 'initval 'init-name '() '() '())))
(define (final val) (cons '(final) (make-xrp-draw '(final) val 'final-name '() '() '() #f)))


;;world-tree is an a-list edge transitions to counts
(define (make-world-tree) '())
;;and edge is a path->path transition (a path is a list of (address . value) pairs).
(define (add-edge world-tree edge)
  (let ((e (assoc edge world-tree)))
    (if e
        (alist-cons edge (+ 1 (cdr e)) (alist-delete edge world-tree))
        (alist-cons edge 1 world-tree))))
(define (add-path world-tree path)
  (if (null? (cdr path))
      world-tree
      (add-edge (add-path world-tree (cdr path))
                (list (path->node (cdr path));(cons (caar (cdr path)) (cdr (cdr path)))
                      (path->node path) ))))

(define (path->node path)
  (cons (list (first (first path)) (third (first path))) ;;drop value from first, so that a single node is created for all the return values.
        (cdr path)))
(define (node->prev-val node)
  (second (second node)))
(define (node->xrp-name node)
  (second (first node)))
                      

(define (makedot filename wt)
  (for-each display (list "making dot file " (string-append filename ".dot") "\n"))
  (with-output-to-file (string-append filename ".dot")
    (lambda ()
      (for-each display
                (append '("digraph G {\n")
                        ;;start node
                        (let ((top (first (car (find (lambda (e1) (not (find (lambda (e2) (equal? (first (car e1)) (second (car e2)))) wt))) wt)))))
                          (list (node->string top)
                                "[ label = \" " (write-to-string (node->xrp-name top)) " \"  ] \n"))
                        ;;link statements
                        (apply append
                               (map (lambda (e) (list (node->string (first (car e)))
                                                             " -> " (node->string (second (car e)))
                                                             " [ " "label = \" " (write-to-string (node->prev-val (second (car e))));(cdr (second (second (car e)))))
                                                             ", " (write-to-string (cdr e))  " \","
                                                             "penwidth=" (write-to-string
                                                                          (log (+ 1 (cdr e))));(max .01 (/ (floor (* 100 (* 4.0 ))) 100.0)))
                                                             " ] \n"
                                                              (node->string (second (car e)))
                                                              "[ label = \" " (write-to-string (if (eq? 'final-name (node->xrp-name (second (car e))))
                                                                                                   (node->prev-val (second (car e)))
                                                                                                   (node->xrp-name (second (car e))))) " \"  ] \n"
                                                             )) wt))
                        
                        '("}\n")
                        ))))
  '())

(define (node->string node)
  (apply string-append
         (apply string-append (map symbol->string (first (first node))))
         (map (lambda (av) (apply string-append (write-to-string (second av)) (map symbol->string (first av)))) (cdr node))))

(define (write-to-string val)
  (cond ((eq? val #t) "True")
        ((eq? val #f) "False")
        (else (let-values (((string-port extractor) (open-string-output-port)))

                (write val string-port)
                (extractor)))))