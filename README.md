# JSChurch

*JSChurch is deprecated. If you are looking to write probabilistic programs in Scheme syntax, [webchurch](http://github.com/probmods/webchurch) is your best bet. You can use it online at [probmods.org](http://probmods.org), or on your computer via nodejs. If you are not tied to Scheme syntax, then I recommend [webppl](http://github.com/probmods/webppl), our most recent probabilistic programming language. You can use it online at [dippl.org](http://dippl.org), or via nodejs as well. webppl is significantly faster than previous implementations, and additionally supports particle filtering and best-first enumeration inference strategies.*

# Instructions

- `jschurch make` builds the Church compiler in Javascript.
- `jschurch webservice` additionally combines all Javascript needed to run Church code (via scheme2js web service) into a single file.
- `jschurch run filename.church` compiles filename.church to Javascript using the Church compiler generated by make, then runs the program using node.

# Installation

To get access to the `bher` and `jschurch` command line tools and scheme libraries from any directory, `cd` into the bher directory and type:

    echo -e "\nexport PATH=`pwd`:\$PATH" >> ~/.bashrc 
    echo -e "\nexport IKARUS_LIBRARY_PATH=`pwd`:\$IKARUS_LIBRARY_PATH" >> ~/.bashrc
    source ~/.bashrc

Replace `~/.bashrc` with the path to your shell configuration file.
