#!/usr/bin/python
import sys
import re
import os
from os.path import abspath, dirname, exists, join

load_pattern = r"(\(load\s+\"([^\"]+)\"\s*\))"

def inline(fn, paths):
    """
    Recursively inline all occurrences of (load "filename") in the
    file named "fn", searching all paths in the variable "paths", and
    return the inlined file contents.
    """
    for path in paths:
        fp = join(path, fn)
        if exists(fp):
            s = open(fp).read()
            break
    for (sexp, fn2) in re.findall(load_pattern, s):
        paths2 = [abspath(dirname(fn2))] + paths
        s = s.replace(sexp, inline(fn2, paths2))
    return s

if __name__ == "__main__":
    assert len(sys.argv) == 2
    root = abspath(dirname(sys.argv[0]))
    print inline(sys.argv[1], [root, join(root, "church/")])
