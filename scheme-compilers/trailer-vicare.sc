
;;seed the random number generator
(randomize-rng)

(display
(church-main '(top) (make-empty-store))
) (newline)
;;done