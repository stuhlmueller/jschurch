
;;seed the random number generator
(randomize-rng)

(document.write (church-main '(top) (make-empty-store)))