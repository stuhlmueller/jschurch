#!r6rs

(library (church longs-readable-scheme)
         
         (export gensym->symbol)
         
         (import (scheme-tools srfi-compat :1)
                 (rnrs)
                 (only (ikarus) gensym pretty-print with-output-to-string)
                 )         
        
         (define (gensym->symbol g)
           (string->symbol (with-output-to-string (lambda () (display g))))) 
         
         )