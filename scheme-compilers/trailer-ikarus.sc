
;;seed the random number generator
(randomize-rng)

(display
 (untapify
  (church-main '(top) (make-empty-store))))
(newline)
;;done