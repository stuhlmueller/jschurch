#!r6rs

;; authors: noah goodman

;;this library generates the church-specific header definitions.
;;the header includes:
;;  church-make-xrp
;;  church-apply, church-eval
;;  mcmc helper code.
;;  deterministic (non-higher-order) scheme primitives wrapped up into church- forms. 

;;this should generate scheme compatible with r4rs+srfi1.

;;NOTE: primitive symbols not otherwise defined are assumed to be provided by the target language. this include, for example, a bunch of random sampling/scoring functions that xrp-preamble will want.


(library
 (church header)

 (export generate-header)

 (import (rnrs)
         (scheme-tools srfi-compat :1) ; lists
         (church readable-scheme)
         )

 (define *no-forcing* true)
 (define *AD* true) ;;when AD is true, continuous XRP return values will be tapified.
 
 ;;the header is a list of definitions in the (target) scheme. it provides primitives, xrp handling, mh helpers, etc.
 ;;any free "church-" variable in the program that isn't provided explicitly (by generate-special or by external defs)
 ;;is assumed to be a scheme primitive, and a church- definition is generated for it.
 ;;(free symbols that occur in operator position are assumed primitive, and won't have church- prefix.)
 (define (generate-header free-variables external-defs lazy)
   (set! *no-forcing* (not lazy)) 
   (let* ((special-defs (generate-special))
          (def-symbols (map (lambda (d) (if (pair? (second d)) (first (second d)) (second d)))
                            (append special-defs external-defs))) ;;get symbols defined by header and external fns.
          ;;any remaining church- free variables is assumed to have an underlying primitive, package them up:
          (primitive-defs (map primitive-def (lset-difference eq? (filter church-symbol? free-variables) def-symbols))))
     (append external-defs primitive-defs special-defs)))

 (define (prefix-church symb) (string->symbol (string-append "church-" (symbol->string symb))))
 (define (un-prefix-church symb) (if (church-symbol? symb)
                                     (string->symbol (list->string (drop (string->list (symbol->string symb)) 7)))
                                     symb))
 (define (church-symbol? symb) (and (< 7 (length (string->list (symbol->string symb))))
                                    (equal? "church-" (list->string (take (string->list (symbol->string symb)) 7)))))
 (define (primitive-def symb)
   (if *no-forcing*
       `(define ,symb (lambda (address store . args) (apply ,(un-prefix-church symb) args)))
       `(define ,symb (lambda (address store . args) (apply ,(un-prefix-church symb) (map (lambda (a) (church-force address store a)) args))))))



 (define (generate-special)
   `(
;;;
     ;;misc church primitives
     (define (church-apply address store proc args)
       ,(if *no-forcing*
            `(apply proc address store args)
            `(apply (church-force address store proc) address store (church-force address store args))
            ))

     ;; ;;requires compile, eval, and environment to be available from underlying scheme....
     ;; (define (church-eval addr store sexpr)
     ;;   ;(display (compile sexpr '()) ))
     ;;   ((eval `(letrec ,(map (lambda (def)
     ;;                          (if (symbol? (cadr def))
     ;;                              (list (cadr def) (caddr def))
     ;;                              `(,(car (cadr def)) (lambda ,(cdr (cadr def)) ,@(cddr def)))))
     ;;                        (compile (list sexpr) '()))
     ;;            church-main)
     ;;         (environment '(rnrs)
     ;;                      '(rnrs mutable-pairs)
     ;;                      '(_srfi :1)
     ;;                      '(rename (church external math-env) (sample-discrete discrete-sampler))
     ;;                      '(rename (only (ikarus) gensym pretty-print exact->inexact) (gensym scheme-gensym))
     ;;                      '(_srfi :19)
     ;;                      '(church compiler)
     ;;                      '(rnrs eval)  ))
     ;;         addr store))
     
     (define church-true #t)
     (define church-false #f)
     (define (church-or address store . args) (fold (lambda (x y) (or x y)) #f args))
     (define (church-and address store . args) (fold (lambda (x y) (and x y)) #t args))

     ;;provided for laziness and constraint prop:
     (define (church-force address store val) (if (and (pair? val) (eq? (car val) 'delayed))
                                                  (church-force address store ((cadr val) address store))
                                                  val))



     
     ;; ;;;
     ;;      (define (set-xrp-stats! xrp-creation-address stats store) ...)
     ;;      (define (get-xrp-stats xrp-creation-address store) ...)
     ;;      (define (store->choice-handler store) ...)
     ;;      (define (set-choice-handler! store handler) ...)


     ;;      (define (church-make-xrp address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support)
     ;;        (let ((creation-address address))

     ;;          ;;make an entry for the stats of this xrp, initialized to init-stats.
     ;;          (set-xrp-stats! creation-address init-stats store)

     ;;          ;;when the xrp is called, it calls the choice-handler with it's information and the current address.
     ;;          ;;the choice handler returns the chosen value and updates the xrp-stats.
     ;;          (lambda (address store . args)
     ;;            ((store->choice-handler store) address store xrp-name creation-address sample incr-stats decr-stats score hyperparams proposer support))))

     ;; ;;;handling random choices and (mh) state...
     
     ;;      ;;the trivial choice handler just samples from the prior, and maintains no state.
     ;;      ;;the church top level installs this handler using the 'sample' special form.
     ;;      (define (trivial-choice-handler address store xrp-name xrp-creation-address sample incr-stats decr-stats score hyperparams proposer support)
     ;;        (let ((stats (get-xrp-stats xrp-creation-address))
     ;;              (tmp (sample address store stats hyperparams args))
     ;;              (value (first tmp))
     ;;              (new-stats (second tmp))
     ;;              (incr-score (third tmp)))
     ;;          (set-xrp-stats! creation-address new-stats store)
     ;;          value))
     
     
     ;;      ;;the mh choice handler is more interesting: it maintains a database of random choices, and tries to re-use them...
     ;;      (define (mh-choice-handler address store xrp-name xrp-creation-address sample incr-stats decr-stats score stats hyperparams proposer support)
     ;;        (let ((stats (get-xrp-stats xrp-creation-address))
     ;;              (tmp (if (existing choice?)
     
     ;;                       (sample address store stats hyperparams args)))
     ;;              (value (first tmp))
     ;;              (new-stats (second tmp))
     ;;              (incr-score (third tmp)))
     ;;          (update-xrp-stats! creation-address new-stats store)
     ;;          value))


     
     ;; ;;;for mcmc-preamble we must provide: counterfactual-update, make-initial-mcmc-state, mcmc-state->xrp-draws, mcmc-state->score, mcmc-state->query-value.




     

;;;
     ;;stuff for xrps (and dealing with stores):
     (define (make-store xrp-draws xrp-stats score tick enumeration-flag) (list xrp-draws xrp-stats score tick enumeration-flag))
     (define (make-empty-store) (make-store (make-addbox) (make-addbox) 0.0 0 #f))
     (define store->xrp-draws first)
     (define set-store-xrp-draws! set-car!)
     (define store->xrp-stats second)
     (define store->score third)
     (define (set-store-score! store score) (cons (car store) (cons (cadr store) (set-car! (caddr store) score))))
     (define store->tick fourth)
     (define store->enumeration-flag fifth) ;;FIXME: this is a hacky way to deal with enumeration...

     (define (church-reset-store-xrp-draws address store)
       (set-store-xrp-draws! store (make-addbox)))

     ;; (define (return-with-store store new-store value) (begin (set-car! store (car new-store))
     ;;                                                           (set-cdr! store (cdr new-store))
     ;;                                                           value))
     
     ;; addboxes hold info indexed by the evaluation address.
     ;; doesn't attempt to maintain order.

     ;; (define alist-insert
     ;;   (lambda (addbox address info)
     ;;     (cons (cons address info) addbox)))

     ;; ;; ;; returns pair of info and remaining addbox. returns false if no
     ;; ;; info with this address.
     ;; (define alist-pop
     ;;   (lambda (addbox address)
     ;;     (if (null? addbox)
     ;;         (cons #f '())
     ;;         (if (equal? address (caar addbox))
     ;;             (cons (cdar addbox) (cdr addbox))
     ;;             (let ((ret (alist-pop (cdr addbox) address)))
     ;;               (cons (car ret) (cons (car addbox) (cdr ret))))))))

     ;; (define (make-empty-alist) '())
     ;; (define alist-size length)
     ;; (define alist-empty? null?)
     
     ;; alist addbox
     ;; (define add-into-addbox alist-insert)
     ;; (define pull-outof-addbox alist-pop)
     ;; (define make-addbox make-empty-alist)
     ;; (define addbox->alist (lambda (addbox) addbox))
     ;; (define alist->addbox (lambda (alist) alist))
     ;; (define addbox-size alist-size)
     ;; (define addbox-empty? alist-empty?)

     ;; trie addbox
     (define make-addbox make-empty-trie)
     (define copy-addbox copy-trie)
     (define (insert-addbox addbox address val) (trie-insert addbox (reverse address) val))
     (define (read-addbox addbox address) (trie-lookup addbox (reverse address)))
     (define (update-addbox addbox address fn) (trie-update addbox (reverse address) fn))
     (define addbox->values trie->values)
     (define (alist->addbox alist) (alist->trie (map (lambda (b) (cons (reverse (car b)) (cdr b))) alist)))
                                        ;(define addbox-size trie-size)
     (define addbox-empty? trie-empty?)

     (define (make-xrp-draw address value xrp-name proposer-thunk ticks score support)
       (list address value xrp-name proposer-thunk ticks score support))
     (define xrp-draw-address first)
     (define xrp-draw-value second)
     (define xrp-draw-name third)
     (define xrp-draw-proposer fourth)
     (define xrp-draw-ticks fifth) ;;ticks is a pair of timer tick when this xrp-draw is touched and previous touch if any.
     (define xrp-draw-score sixth)
     (define xrp-draw-support seventh)

     ;;note: this assumes that the fns (sample, incr-stats, decr-stats, etc) are church procedures.
     ;;FIXME: what should happen with the store when the sampler is a church random fn? should not accumulate stats/score since these are 'marginalized'.
     (define (church-make-xrp address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support)
                                        ;,(if *lazy*
       ;;FIXME!! only rebind args if lazy..
       (let* ((xrp-name (church-force address store xrp-name))
              (sample (church-force address store sample))
              (incr-stats (church-force address store incr-stats))
              (decr-stats (church-force address store decr-stats))
              (score (church-force address store score))
              (init-stats (church-force address store init-stats))
              (hyperparams (church-force address store hyperparams))
              (proposer (church-force address store proposer))
              (support (church-force address store support)))

         ;;reset stats if this is first touch on this tick.
         (update-addbox (store->xrp-stats store)
                        address ;;FIXME: reverse?
                        (lambda (stats)
                          (if (or (eq? 'none stats) (not (= (store->tick store) (second stats))))
                              (list init-stats (store->tick store))
                              stats)))
         
         (let* ((xrp-address address)
                (proposer (if (null? proposer)
                              (lambda (address store operands old-value) ;;--> proposed-value forward-log-prob backward-log-prob
                                (let* ((dec (decr-stats address store old-value (car (read-addbox (store->xrp-stats store) xrp-address)) hyperparams operands))
                                       (decstats (second dec))
                                       (decscore (third dec))
                                       (inc (sample address store decstats hyperparams operands))
                                       (proposal-value (first inc))
                                       (incscore (third inc)))
                                  (list proposal-value incscore decscore)))
                              proposer)))
           ;;the xrp itself: we update the xrp-draw at call address and return the new value.
           (lambda (address store . args)
             (define new-val '())
             (update-addbox (store->xrp-draws store)
                            address ;;FIXME: reverse?
                            (lambda (xrp-draw)
                              ;;FIXME!! check if xrp-address has changed?
                              ;;if this xrp-draw exists and has been touched on this tick, as in mem, don't change score or stats.
                              (if (and (not (eq? 'none xrp-draw)) (equal? (store->tick store) (car (xrp-draw-ticks xrp-draw))))
                                  (begin (set! new-val (xrp-draw-value xrp-draw))
                                         xrp-draw)
                                  (let* ((stats (car (read-addbox (store->xrp-stats store) xrp-address))) ;;FIXME: should only need to find the stats once, then do mutable update...
                                         (support-vals (if (null? support) '() (support address store stats hyperparams args)))
                                         (tmp (if (eq? 'none xrp-draw)
                                                  (sample address store stats hyperparams args)
                                                  (incr-stats address store (xrp-draw-value xrp-draw) stats hyperparams args)))
                                        ;(value ,(if *AD* '(if (continuous? (first tmp)) (tapify (first tmp)) (first tmp)) '(first tmp)))
                                         (value (first tmp))
                                         (new-stats (list (second tmp) (store->tick store)))
                                         (incr-score (third tmp)) ;;FIXME: need to catch measure zero xrp situation?
                                         (last-tick (if (eq? 'none xrp-draw)
                                                        #f
                                                        (car (xrp-draw-ticks xrp-draw))))
                                         (new-xrp-draw (make-xrp-draw address
                                                                      value
                                                                      xrp-name
                                                                      (lambda (address store state) ;;FIXME: clean up this proposer stuff...
                                                                        (let ((store (cons (first (mcmc-state->store state)) (cdr (mcmc-state->store state)))))
                                                                          (church-apply (mcmc-state->address state) store proposer (list args value))))
                                                                      (cons (store->tick store) last-tick)
                                                                      incr-score
                                                                      support-vals)))
                                    (set! new-val value)
                                    (insert-addbox (store->xrp-stats store) xrp-address new-stats)
                                    (set-store-score! store (+ (store->score store) incr-score))
                                    new-xrp-draw))))
             new-val))))
           
           ;;mcmc-state structures consist of a store (which captures xrp state, etc), a score (which includes constraint enforcement), and a return value from applying a nfqp.
           ;;constructor/accessor fns: mcmc-state->xrp-draws, mcmc-state->score, mcmc-state->query-value, church-make-initial-mcmc-state.
           (define (make-mcmc-state store value address) (list store value address))

           (define mcmc-state->store first)
           (define mcmc-state->address third)
           (define (mcmc-state->xrp-draws state) (store->xrp-draws (mcmc-state->store state)))
           (define (mcmc-state->score state)
             (if (not (eq? #t (first (second state))))
                 minus-infinity ;;enforce conditioner.
                 (store->score (mcmc-state->store state))))
           ;;compute the gradient of the score of a trace-container wrt any tapified erp values.
           (define (mcmc-state->gradient state)
             (first
              (second
               (xy-gradient-R (lambda (f xrp-draws) (filter-map (lambda (x) (if (tape? (xrp-draw-value x))
                                                                                (f (xrp-draw-value x)) ;;FIXME: check structure
                                                                                #f))
                                                                xrp-draws)) ;map-independent
                              (addbox->values (mcmc-state->xrp-draws state)) ;x-reverse
                              (mcmc-state->score state) ;y-reverse
                              tapify))))
           
           
           ;;this assumes that nfqp returns a thunk, which is the delayed query value. we force (apply) the thunk here, using the store from the current state.
           ;;FIXME!!: need to copy so that this will be sampled fresh each time...
           (define (mcmc-state->query-value state)
             (church-apply (mcmc-state->address state) (mcmc-state->store state) (cdr (second state)) '()))

           ;;this captures the current store/address and packages up an initial mcmc-state.
           ;;should copy here? not needed currently, since counterfactual-update coppies and is only thing aplied to states....
           (define (church-make-initial-mcmc-state address store)
             (make-mcmc-state store 'init-val address))

           ;; ;;this is like church-make-initial-mcmc-state, but flags the created state to init new xrp-draws at left-most element of support.
           ;; ;;clears the xrp-draws since it is meant to happen when we begin enumeration (so none of the xrp-draws in store can be relevant).
           ;; (define (church-make-initial-enumeration-state address store)
           ;;   (make-mcmc-state (make-store '() (store->xrp-stats store) (store->score store) (store->tick store) #t)
           ;;                    'init-val address))

           ;;this is the key function for doing mcmc -- update the execution of a procedure, with optional changes to xrp-draw values.
           ;;  takes: an mcmc state, a normal-from-proc, and an optional list of interventions (which is is a list of xrp-draw new-value pairs to assert).
           ;;  returns: a new mcmc state and the bw/fw score of any creations and deletions.
           ;;must exit with store being the original store, which allows it to act as a 'counterfactual'. this is taken care of by wrapping as primitive (ie. non church- name).
           (define (counterfactual-update state nfqp . interventions)
             (let* ((interv-store (make-store (fold (lambda (interv xrps)
                                                      (update-addbox xrps  (xrp-draw-address (first interv))
                                                                     (lambda (xrp-draw)
                                                                       (make-xrp-draw (xrp-draw-address (first interv))
                                                                                      (cdr interv)
                                                                                      (xrp-draw-name (first interv))
                                                                                      (xrp-draw-proposer (first interv))
                                                                                      (xrp-draw-ticks (first interv))
                                                                                      'dummy-score ;;dummy score which will be replace on update.
                                                                                      (xrp-draw-support (first interv))
                                                                                      ))))
                                                    (copy-addbox (store->xrp-draws (mcmc-state->store state)))
                                                    interventions)
                                              (copy-addbox (store->xrp-stats (mcmc-state->store state)))
                                              0.0
                                              (+ 1 (store->tick (mcmc-state->store state))) ;;increment the generation counter.
                                              (store->enumeration-flag (mcmc-state->store state))
                                              ))
                    ;;application of the nfqp happens with interv-store, which is a copy so won't mutate original state.
                    ;;after application the store must be captured and put into the mcmc-state.
                    (value (church-apply (mcmc-state->address state) interv-store nfqp '()))
                    (cd-bw/fw (if (store->enumeration-flag interv-store)
                                  0
                                  (clean-store interv-store))) ;;FIXME!! need to clean out unused xrp-stats?
                    (proposal-state (make-mcmc-state interv-store value (mcmc-state->address state))))
               (list proposal-state cd-bw/fw)))

           ;;we need to pull out the subset of new-state xrp-draws that were touched on this pass,
           ;;at the same time we want to accumulate the bw score of these deleted xrp-draws and the fw score of any new ones.
           ;;FIXME: this doesn't play nice with addbox abstraction, and is linear time in the number of xrp-draws.
           ;;FIXME: this method won't work with caching since used xrp-draws may not get 'touched'...
           ;;FIXME: assumes new choices drawn from the conditional prior -- that's currently true but not general.
           (define (clean-store store)
             (let loop ((draws (addbox->values (store->xrp-draws store)))
                        (used-draws '())
                        (bw/fw 0.0))
               (if (null? draws)
                   (begin (set-store-xrp-draws! store (alist->addbox (map (lambda (d) (cons (xrp-draw-address d) d)) used-draws)))
                          bw/fw)
                   (if (= (first (xrp-draw-ticks (car draws))) (store->tick store))
                       (if (null? (cdr (xrp-draw-ticks (car draws))))
                           ;;this was a new xrp-draw, accumulate fw prob:
                           (loop (cdr draws) (cons (car draws) used-draws) (- bw/fw
                                                                              (xrp-draw-score (car draws)) ;;NOTE: incremental differs here
                                                                              ))
                           ;;this xrp-draw existed already:
                           (loop (cdr draws) (cons (car draws) used-draws) bw/fw))
                       ;;this xrp-draw was not used in last update, drop it and accumulate bw prob:
                       (loop (cdr draws) used-draws (+ bw/fw
                                                       (xrp-draw-score (car draws)) ;;NOTE: incremental differs here
                                                       ))))))
           )
         )

       )
