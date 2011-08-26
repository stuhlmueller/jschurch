#!r6rs

;; classifier-guided importance sampler (except so far just builds the training set, doesn't have code to use a classifier to importance sample).
;; takes a church thunk.
;; forward samples to build a training set, then calls SVMLib to get a set of classifiers that predict probability of return value from singe xrp-draw given previous draws and total return value.
;; returns thunk that importance samples using the classifiers (returning importance weights) -- not done yet.

;; want to use importance weights to estimate the variance of the sampler.
;; how well does CGIS work compared to plain IS,
;;    as the amount of training data changes?
;;    for more apriori typical and more extreme evidence?
;;    depending on the model (determinism? hierarchy?)?
;;    does laziness help?

;; works as an external library for bher: provides a function that takes a church thunk and generates a set of training sets for classifiers at each address.
;; future version should return a function that takes an address and feature set and returns an importance distribution.


;;to use:
;; make a church file with a program something like this:
;;
;; (define numd 100)
;; (define prior 0.5);(/ 4 numd))
;; (define w 0.4)
;; (define w0 0.01)
;; (define (sample-symptoms)
;;   (let ((diseases (repeat numd (lambda () (flip prior)))))
;;     (rest 
;;      (fold (lambda (d a)
;;              (let ((parents (first a))
;;                    (symptoms (rest a)))
;;                (pair
;;                 (pair d (drop-right parents 1))
;;                 (pair (noisy-or w w0 parents) symptoms))))
;;            (pair (take diseases 4) '())
;;            (drop diseases 4)))))
;; (define (noisy-or w w0 parents)
;;   (flip (- 1 (* (- 1 w0) (expt (- 1 w) (sum (map (lambda (x) (if x 1 0)) parents)))))))
;; (save-all-to-libsvm
;;  (generate-training-sets sample-symptoms 1000)
;;  "qmr")
;;
;;then run it with CGIS.ss as an external include, eg:    ./bher QMRSVM.church -e utils/CGIS.ss
;;then have fun running libsvm. eg:   ./svm-train -v 2 ../../bher/qmr190.libsvm




(define ind 0)
(define ind-hash (make-hash-table))

(define (address->index addr)
  (hash-table-ref ind-hash addr (lambda ()
                                  (set! ind (+ ind 1))
                                  (hash-table-set! ind-hash addr ind)
                                  ind)))

(define training-sets (make-hash-table))

;;take a world (list of address value pairs) and output value and add it as a training example to the training set for each address it contains.
;;output should already have been converted into a list.
(define (add-example world output)
  (let loop ((world-so-far '())
             (world-to-go (map (lambda (x) (cons (address->index (car x)) (cdr x))) world)))
    (if (null? world-to-go)
        '()
        (let ((this-index (car (car world-to-go)))
              (this-choice (cdr (car world-to-go)))
              (this-features (append output
                                     (ind-assoc->list world-so-far))
                             ))
          (hash-table-update! training-sets this-index (lambda (x) (cons (cons this-choice this-features) x)) (lambda () '()))
          (loop (cons (car world-to-go) world-so-far) (cdr world-to-go))))))


(define (ind-assoc->list alist)
  (define (insert-missing alist prev-index)
    (if (null? alist)
        '()
        (if (= (+ prev-index 1) (car (car alist)))
            (cons (car alist) (insert-missing (cdr alist) (+ prev-index 1)))
            (cons (cons (+ prev-index 1) 'none) (insert-missing alist (+ prev-index 1))))))
  (map cdr
       (insert-missing (list-sort (lambda (x y) (< (car x) (car y))) alist) 0)))


(define (church-generate-training-sets address store thunk N)
  (map (lambda (x) (add-example (cdr x) (car x)))
       (repeat N (lambda () (let* ((newstore (cons (car store) (cdr store)))
                                   (output (thunk '(CGIS) newstore)))
                              (cons output
                                    (map (lambda (xrp-draw) (cons (xrp-draw-address xrp-draw) (xrp-draw-value xrp-draw)))
                                         (map cdr (addbox->alist (store->xrp-draws newstore)))))))))
  (hash-table-fold training-sets
                   (lambda (key value accum)
                     (cons value accum))
                   '()))

(define (repeat n thunk) (if (= -1 n) '() (cons (thunk) (repeat (- n 1) thunk))))




(define (save-to-libsvm trainingset filename)
  (define feature 0)
  (with-output-to-file (string-append filename ".libsvm")
               (lambda ()
                 (for-each
                  (lambda (ex)
                    (set! feature 0)
                    (display (bool->num (car ex)))
                    (display "   ")
                    (for-each 
                     (lambda (f)
                       (set! feature (+ 1 feature))
                       (display feature)
                       (display ":")
                       (display (bool->num f))
                       (display "  "))
                     (cdr ex))
                    (display "\n"))
                  trainingset))))

(define (save-all-to-libsvm trainingsets filenamebase)
  (define i 0)
  (for-each (lambda (tr)
              (set! i (+ i 1))
              (save-to-libsvm tr (string-append filenamebase (number->string i))))
            trainingsets))

(define (bool->num x) (if (eq? x #t) 1
                          (if (eq? x #f) 0
                              x)))
                          