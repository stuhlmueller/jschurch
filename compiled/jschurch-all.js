
var jsChurch = (
  function(){
    /************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/************* GENERATED FILE - DO NOT EDIT *************/
/*=====================================================================*/
/*    Author      :  Florian Loitsch                                   */
/*    Copyright   :  2007-11 Florian Loitsch, see LICENSE file         */
/*    -------------------------------------------------------------    */
/*    This file is part of Scheme2Js.                                  */
/*                                                                     */
/*   Scheme2Js is distributed in the hope that it will be useful,      */
/*   but WITHOUT ANY WARRANTY; without even the implied warranty of    */
/*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the     */
/*   LICENSE file for more details.                                    */
/*=====================================================================*/

/*
 * To use write/prints/... the default-output port has to be set first.
 * Simply setting SC_DEFAULT_OUT and SC_ERROR_OUT to the desired values
 * should do the trick.
 * In the following example the std-out and error-port are redirected to
 * a DIV.
function initRuntime() {
    function escapeHTML(s) {
	var tmp = s;
	tmp = tmp.replace(/&/g, "&amp;");
	tmp = tmp.replace(/</g, "&lt;");
	tmp = tmp.replace(/>/g, "&gt;");
	tmp = tmp.replace(/ /g, "&nbsp;");
	tmp = tmp.replace(/\n/g, "<br />");
	tmp = tmp.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp");
	return tmp;

    }

    document.write("<div id='stdout'></div>");
    SC_DEFAULT_OUT = new sc_GenericOutputPort(
	function(s) {
	    var stdout = document.getElementById('stdout');
	    stdout.innerHTML = stdout.innerHTML + escapeHTML(s);
	});
    SC_ERROR_OUT = SC_DEFAULT_OUT;
}
*/


function sc_print_debug() {
    sc_print.apply(null, arguments);
}
/*** META ((export *js*)) */
var sc_JS_GLOBALS = this;

var __sc_LINE=-1;
var __sc_FILE="";

/*** META ((export #t)
           (arity -1)) */
function sc_alert() {
   var len = arguments.length;
   var s = "";
   var i;

   for( i = 0; i < len; i++ ) {
       s += sc_toDisplayString(arguments[ i ]);
   }

   return alert( s );
}

/*** META ((export #t) (arity #t)) */
function sc_typeof( x ) {
   return typeof x;
}

var __sc_errorHook = false;

/*** META ((export error-hook-set!) (arity #t)) */
function sc_errorHookSet( h ) {
   __sc_errorHook = h;
}

/*** META ((export error-hook) (arity #t)) */
function sc_errorHook() {
   return __sc_errorHook;
}

/*** META ((export #t) (arity -1)) */
function sc_error() {
   var e = new Error("sc_error");

   if (arguments.length >= 1) {
      e.name = arguments[0];
      if (arguments.length >= 2) {
	 e.message = arguments[1];
	 if (arguments.length >= 3) {
	    e.scObject = arguments[2];
	 }
      }
   }

   throw __sc_errorHook ? __sc_errorHook( e, arguments ) : e;
}

function sc_arity_check(fun, nbArgs) {
   function err( args, msg, obj ) {
      var where= ("callee" in args && "caller" in args.callee ?
		  ("sc_name" in args.callee.caller ?
		   args.callee.caller.sc_name : args.callee.caller)
		  : "arity-check");
      sc_error(where, msg, obj);
      return undefined;
   }

   if (typeof fun !== "function") {
      return err(arguments, "not a function", fun);
   }

   var fun_arity = fun.sc_arity;

   if (fun_arity === undefined || fun_arity === false) return fun;
   if (fun_arity >= 0 && nbArgs == fun_arity) return fun;
   if (fun_arity < 0 && nbArgs >= -1-fun_arity) return fun;
   var errorMsg = "Wrong number of arguments: " + fun_arity + " expected, " +
      nbArgs + " provided";
   return err( arguments, errorMsg, fun);
}

/*** META ((export #t) (arity #t)) */
function sc_raise(obj) {
    throw obj;
}


/*** META ((export with-handler-lambda) (arity #t)) */
function sc_withHandlerLambda(handler, body) {
    try {
	return body();
    } catch(e) {
	if (!e._internalException)
	    return handler(e);
	else
	    throw e;
    }
}

var sc_properties = new Object();

/*** META ((export #t) (arity #t)) */
function sc_putpropBang(sym, key, val) {
    var ht = sc_properties[sym];
    if (!ht) {
	ht = new Object();
	sc_properties[sym] = ht;
    }
    ht[key] = val;
}

/*** META ((export #t) (arity #t)) */
function sc_getprop(sym, key) {
    var ht = sc_properties[sym];
    if (ht) {
	if (key in ht)
	    return ht[key];
	else
	    return false;
    } else
	return false;
}

/*** META ((export #t) (arity #t)) */
function sc_rempropBang(sym, key) {
    var ht = sc_properties[sym];
    if (ht)
	delete ht[key];
}

/*** META ((export #t) (arity #t)) */
function sc_any2String(o) {
    return sc_jsstring2string(sc_toDisplayString(o));
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 "==="))
           (type bool))
*/
function sc_isEqv(o1, o2) {
    return (o1 === o2);
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 "==="))
           (type bool))
*/
function sc_isEq(o1, o2) {
    return (o1 === o2);
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isNumber(n) {
    return (typeof n === "number");
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isComplex(n) {
    return sc_isNumber(n);
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isReal(n) {
    return sc_isNumber(n);
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isRational(n) {
    return sc_isReal(n);
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isInteger(n) {
    return (parseInt(n) === n);
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (postfix ", false")))
*/
// we don't have exact numbers...
function sc_isExact(n) {
    return false;
}

/*** META ((export #t) (arity #t)
           (peephole (postfix ", true"))
	   (type bool))
*/
function sc_isInexact(n) {
    return true;
}

/*** META ((export = =fx =fl)
           (type bool)
           (peephole (infix 2 2 "==="))
           (arity -3))
*/
function sc_equal(x) {
    for (var i = 1; i < arguments.length; i++)
	if (x !== arguments[i])
	    return false;
    return true;
}

/*** META ((export < <fx <fl)
           (type bool)
           (peephole (infix 2 2 "<"))
           (arity -3))
*/
function sc_less(x) {
    for (var i = 1; i < arguments.length; i++) {
	if (x >= arguments[i])
	    return false;
	x = arguments[i];
    }
    return true;
}

/*** META ((export > >fx >fl)
           (type bool)
           (peephole (infix 2 2 ">"))
           (arity -3))
*/
function sc_greater(x, y) {
    for (var i = 1; i < arguments.length; i++) {
	if (x <= arguments[i])
	    return false;
	x = arguments[i];
    }
    return true;
}

/*** META ((export <= <=fx <=fl)
           (type bool)
           (peephole (infix 2 2 "<="))
           (arity -3))
*/
function sc_lessEqual(x, y) {
    for (var i = 1; i < arguments.length; i++) {
	if (x > arguments[i])
	    return false;
	x = arguments[i];
    }
    return true;
}

/*** META ((export >= >=fl >=fx)
           (type bool)
           (peephole (infix 2 2 ">="))
           (arity -3))
*/
function sc_greaterEqual(x, y) {
    for (var i = 1; i < arguments.length; i++) {
	if (x < arguments[i])
	    return false;
	x = arguments[i];
    }
    return true;
}

/*** META ((export zero? zerofx? zerofl?) (arity #t)
           (type bool)
           (peephole (postfix "=== 0")))
*/
function sc_isZero(x) {
    return (x === 0);
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (postfix "> 0")))
*/
function sc_isPositive(x) {
    return (x > 0);
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (postfix "< 0")))
*/
function sc_isNegative(x) {
    return (x < 0);
}

/*** META ((export odd? oddfx? evenfl?) (arity #t)
           (type bool)
           (peephole (postfix "%2===1")))
*/
function sc_isOdd(x) {
    return (x % 2 === 1);
}

/*** META ((export even? evenfx? evenfl?) (arity #t)
           (type bool)
           (peephole (postfix "%2===0")))
*/
function sc_isEven(x) {
    return (x % 2 === 0);
}

/*** META ((export #t)
           (arity -2)) */
var sc_max = Math.max;
/*** META ((export #t)
           (arity -2)) */
var sc_min = Math.min;

/*** META ((export + +fx +fl)
           (peephole (infix 0 #f "+" "0"))
           (arity -1))
*/
function sc_plus() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++)
	sum += arguments[i];
    return sum;
}

/*** META ((export * *fx *fl)
           (peephole (infix 0 #f "*" "1"))
           (arity -1))
*/
function sc_multi() {
    var product = 1;
    for (var i = 0; i < arguments.length; i++)
	product *= arguments[i];
    return product;
}

/*** META ((export - -fx -fl negfx negfl)
           (peephole (minus))
           (arity -2))
*/
function sc_minus(x) {
    if (arguments.length === 1)
	return -x;
    else {
	var res = x;
	for (var i = 1; i < arguments.length; i++)
	    res -= arguments[i];
	return res;
    }
}

/*** META ((export / /fl)
           (peephole (div))
           (arity -2))
*/
function sc_div(x) {
    if (arguments.length === 1)
	return 1/x;
    else {
	var res = x;
	for (var i = 1; i < arguments.length; i++)
	    res /= arguments[i];
	return res;
    }
}

/*** META ((export #t)
           (arity 1))
*/
var sc_abs = Math.abs;

/*** META ((export quotient /fx) (arity #t)
           (peephole (hole 2 "parseInt(" x "/" y ")")))
*/
function sc_quotient(x, y) {
    return parseInt(x / y);
}

/*** META ((export remainder remainderfl) (arity #t)
           (peephole (infix 2 2 "%")))
*/
function sc_remainder(x, y) {
    return x % y;
}

/*** META ((export modulo modulofx) (arity #t))
*/
function sc_modulo(x, y) {
    var remainder = x % y;
    // if they don't have the same sign
    if ((remainder * y) < 0)
	return remainder + y;
    else
	return remainder;
}

function sc_euclid_gcd(a, b) {
    var temp;
    if (a === 0) return b;
    if (b === 0) return a;
    if (a < 0) {a = -a;};
    if (b < 0) {b = -b;};
    if (b > a) {temp = a; a = b; b = temp;};
    while (true) {
	a %= b;
	if(a === 0) {return b;};
	b %= a;
	if(b === 0) {return a;};
    };
    return b;
}

/*** META ((export #t)
           (arity -1))
*/
function sc_gcd() {
    var gcd = 0;
    for (var i = 0; i < arguments.length; i++)
	gcd = sc_euclid_gcd(gcd, arguments[i]);
    return gcd;
}

/*** META ((export #t)
           (arity -1))
*/
function sc_lcm() {
    var lcm = 1;
    for (var i = 0; i < arguments.length; i++) {
	var f = Math.round(arguments[i] / sc_euclid_gcd(arguments[i], lcm));
	lcm *= Math.abs(f);
    }
    return lcm;
}

// LIMITATION: numerator and denominator don't make sense in floating point world.
//var SC_MAX_DECIMALS = 1000000
//
// function sc_numerator(x) {
//     var rounded = Math.round(x * SC_MAX_DECIMALS);
//     return Math.round(rounded / sc_euclid_gcd(rounded, SC_MAX_DECIMALS));
// }

// function sc_denominator(x) {
//     var rounded = Math.round(x * SC_MAX_DECIMALS);
//     return Math.round(SC_MAX_DECIMALS / sc_euclid_gcd(rounded, SC_MAX_DECIMALS));
// }

/*** META ((export #t)
           (arity 1))
*/
var sc_floor = Math.floor;
/*** META ((export #t)
           (arity 1))
*/
var sc_ceiling = Math.ceil;
/*** META ((export #t)
           (arity 1))
*/
var sc_truncate = parseInt;
/*** META ((export #t)
           (arity 1))
*/
var sc_round = Math.round;

// LIMITATION: sc_rationalize doesn't make sense in a floating point world.

/*** META ((export #t)
           (arity 1))
*/
var sc_exp = Math.exp;
/*** META ((export #t)
           (arity 1))
*/
var sc_log = Math.log;
/*** META ((export #t)
           (arity 1))
*/
var sc_sin = Math.sin;
/*** META ((export #t)
           (arity 1))
*/
var sc_cos = Math.cos;
/*** META ((export #t)
           (arity 1))
*/
var sc_tan = Math.tan;
/*** META ((export #t)
           (arity 1))
*/
var sc_asin = Math.asin;
/*** META ((export #t)
           (arity 1))
*/
var sc_acos = Math.acos;
/*** META ((export #t)
           (arity -2))
*/
var sc_atan = Math.atan;

/*** META ((export #t)
           (arity 1))
*/
var sc_sqrt = Math.sqrt;
/*** META ((export #t)
           (arity 2))
*/
var sc_expt = Math.pow;

// LIMITATION: we don't have complex numbers.
// LIMITATION: the following functions are hence not implemented.
// LIMITATION: make-rectangular, make-polar, real-part, imag-part, magnitude, angle
// LIMITATION: 2 argument atan

/*** META ((export #t) (arity #t)
           (peephole (id)))
*/
function sc_exact2inexact(x) {
    return x;
}

/*** META ((export #t) (arity #t)
           (peephole (postfix "<< 0")))
*/
function sc_inexact2exact(x) {
    return x << 0;
}

function sc_number2jsstring(x, radix) {
    if (radix)
	return x.toString(radix);
    else
	return x.toString();
}

function sc_jsstring2number(s, radix) {
    if (s === "") return false;

    if (radix) {
	var t = parseInt(s, radix);
	if (!t && t !== 0) return false;
	// verify that each char is in range. (parseInt ignores leading
	// white and trailing chars)
	var allowedChars = "01234567890abcdefghijklmnopqrstuvwxyz".substring(0, radix+1);
	if ((new RegExp("^["+allowedChars+"]*$", "i")).test(s))
	    return t;
	else return false;
    } else {
	var t = +s; // does not ignore trailing chars.
	if (!t && t !== 0) return false;
	// simply verify that first char is not whitespace.
	var c = s.charAt(0);
	// if +c is 0, but the char is not "0", then we have a whitespace.
	if (+c === 0 && c !== "0") return false;
	return t;
    }
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (not)))
*/
function sc_not(b) {
    return b === false;
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isBoolean(b) {
    return (b === true) || (b === false);
}

function sc_Pair(car, cdr) {
    this.car = car;
    this.cdr = cdr;
}

sc_Pair.prototype.toString = function() {
    return sc_toDisplayString(this);
};
sc_Pair.prototype.sc_toWriteOrDisplayString = function(writeOrDisplay) {
    var current = this;

    var res = "(";

    while(true) {
	res += writeOrDisplay(current.car);
	if (sc_isPair(current.cdr)) {
	    res += " ";
	    current = current.cdr;
	} else if (current.cdr !== null) {
	    res += " . " + writeOrDisplay(current.cdr);
	    break;
	} else // current.cdr == null
	    break;
    }

    res += ")";

    return res;
};
sc_Pair.prototype.sc_toDisplayString = function() {
    return this.sc_toWriteOrDisplayString(sc_toDisplayString);
};
sc_Pair.prototype.sc_toWriteString = function() {
    return this.sc_toWriteOrDisplayString(sc_toWriteString);
};
// sc_Pair.prototype.sc_toWriteCircleString in IO.js

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (postfix " instanceof sc_Pair")))
*/
function sc_isPair(p) {
    return (p instanceof sc_Pair);
}

function sc_isPairEqual(p1, p2, comp) {
    return (comp(p1.car, p2.car) && comp(p1.cdr, p2.cdr));
}

/*** META ((export #t) (arity #t)
           (peephole (hole 2 "new sc_Pair(" car ", " cdr ")")))
*/
function sc_cons(car, cdr) {
    return new sc_Pair(car, cdr);
}

/*** META ((export cons*)
           (arity -2))
*/
function sc_consStar() {
    var res = arguments[arguments.length - 1];
    for (var i = arguments.length-2; i >= 0; i--)
	res = new sc_Pair(arguments[i], res);
    return res;
}

/*** META ((export #t) (arity #t)
           (peephole (postfix ".car")))
*/
function sc_car(p) {
    return p.car;
}

/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr")))
*/
function sc_cdr(p) {
    return p.cdr;
}

/*** META ((export #t) (arity #t)
           (peephole (hole 2 p ".car = " val)))
*/
function sc_setCarBang(p, val) {
    p.car = val;
}

/*** META ((export #t) (arity #t)
           (peephole (hole 2 p ".cdr = " val)))
*/
function sc_setCdrBang(p, val) {
    p.cdr = val;
}

/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car")))
*/
function sc_caar(p) { return p.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car")))
*/
function sc_cadr(p) { return p.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr")))
*/
function sc_cdar(p) { return p.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr")))
*/
function sc_cddr(p) { return p.cdr.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car.car")))
*/
function sc_caaar(p) { return p.car.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr.car")))
*/
function sc_cadar(p) { return p.car.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car.car")))
*/
function sc_caadr(p) { return p.cdr.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr.car")))
*/
function sc_caddr(p) { return p.cdr.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car.cdr")))
*/
function sc_cdaar(p) { return p.car.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car.cdr")))
*/
function sc_cdadr(p) { return p.cdr.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr.cdr")))
*/
function sc_cddar(p) { return p.car.cdr.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr.cdr")))
*/
function sc_cdddr(p) { return p.cdr.cdr.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car.car.car")))
*/
function sc_caaaar(p) { return p.car.car.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr.car.car")))
*/
function sc_caadar(p) { return p.car.cdr.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car.car.car")))
*/
function sc_caaadr(p) { return p.cdr.car.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr.car.car")))
*/
function sc_caaddr(p) { return p.cdr.cdr.car.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car.car.cdr")))
*/
function sc_cdaaar(p) { return p.car.car.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr.car.cdr")))
*/
function sc_cdadar(p) { return p.car.cdr.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car.car.cdr")))
*/
function sc_cdaadr(p) { return p.cdr.car.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr.car.cdr")))
*/
function sc_cdaddr(p) { return p.cdr.cdr.car.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car.cdr.car")))
*/
function sc_cadaar(p) { return p.car.car.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr.cdr.car")))
*/
function sc_caddar(p) { return p.car.cdr.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car.cdr.car")))
*/
function sc_cadadr(p) { return p.cdr.car.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr.cdr.car")))
*/
function sc_cadddr(p) { return p.cdr.cdr.cdr.car; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.car.cdr.cdr")))
*/
function sc_cddaar(p) { return p.car.car.cdr.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".car.cdr.cdr.cdr")))
*/
function sc_cdddar(p) { return p.car.cdr.cdr.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.car.cdr.cdr")))
*/
function sc_cddadr(p) { return p.cdr.car.cdr.cdr; }
/*** META ((export #t) (arity #t)
           (peephole (postfix ".cdr.cdr.cdr.cdr")))
*/
function sc_cddddr(p) { return p.cdr.cdr.cdr.cdr; }

/*** META ((export #t) (arity #t)) */
function sc_lastPair(l) {
    if (!sc_isPair(l)) sc_error("sc_lastPair: pair expected");
    var res = l;
    var cdr = l.cdr;
    while (sc_isPair(cdr)) {
	res = cdr;
	cdr = res.cdr;
    }
    return res;
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (postfix " === null")))
*/
function sc_isNull(o) {
    return (o === null);
}

/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isList(o) {
   var rabbit = o;
   var turtle = o;

   while (true) {
       if (rabbit === null ||
	   (rabbit instanceof sc_Pair && rabbit.cdr === null))
	   return true;  // end of list
       else {
	   if ((rabbit instanceof sc_Pair) &&
	       (rabbit.cdr instanceof sc_Pair)) {
	       rabbit = rabbit.cdr.cdr;
	       turtle = turtle.cdr;
	       if (rabbit === turtle) return false; // cycle
	   } else
	       return false; // not pair
       }
   }
}

/*** META ((export #t)
           (arity -1))
 */
function sc_list() {
    var res = null;
    var a = arguments;
    for (var i = a.length-1; i >= 0; i--)
	res = new sc_Pair(a[i], res);
    return res;
}

/*** META ((export #t)
           (arity -2))
*/
function sc_iota(num, init) {
   var res = null;
   if (!init) init = 0;
   for (var i = num - 1; i >= 0; i--)
      res = new sc_Pair(i + init, res);
   return res;
}

/*** META ((export #t)
           (arity -2))
*/
function sc_makeList(nbEls, fill) {
    var res = null;
    for (var i = 0; i < nbEls; i++)
	res = new sc_Pair(fill, res);
    return res;
}

/*** META ((export #t) (arity #t)) */
function sc_length(l) {
    var res = 0;
    while (l !== null) {
	res++;
	l = l.cdr;
    }
    return res;
}

/*** META ((export #t) (arity #t)) */
function sc_remq(o, l) {
    var dummy = { cdr : null };
    var tail = dummy;
    while (l !== null) {
	if (l.car !== o) {
	    tail.cdr = sc_cons(l.car, null);
	    tail = tail.cdr;
	}
	l = l.cdr;
    }
    return dummy.cdr;
}

/*** META ((export #t) (arity #t)) */
function sc_remqBang(o, l) {
    var dummy = { cdr : null };
    var tail = dummy;
    var needsAssig = true;
    while (l !== null) {
	if (l.car === o) {
	    needsAssig = true;
	} else {
	    if (needsAssig) {
		tail.cdr = l;
		needsAssig = false;
	    }
	    tail = l;
	}
	l = l.cdr;
    }
    tail.cdr = null;
    return dummy.cdr;
}

/*** META ((export #t) (arity #t)) */
function sc_delete(o, l) {
    var dummy = { cdr : null };
    var tail = dummy;
    while (l !== null) {
	if (!sc_isEqual(l.car, o)) {
	    tail.cdr = sc_cons(l.car, null);
	    tail = tail.cdr;
	}
	l = l.cdr;
    }
    return dummy.cdr;
}

/*** META ((export #t) (arity #t)) */
function sc_deleteBang(o, l) {
    var dummy = { cdr : null };
    var tail = dummy;
    var needsAssig = true;
    while (l !== null) {
	if (sc_isEqual(l.car, o)) {
	    needsAssig = true;
	} else {
	    if (needsAssig) {
		tail.cdr = l;
		needsAssig = false;
	    }
	    tail = l;
	}
	l = l.cdr;
    }
    tail.cdr = null;
    return dummy.cdr;
}

function sc_reverseAppendBang(l1, l2) {
    var res = l2;
    while (l1 !== null) {
	var tmp = res;
	res = l1;
	l1 = l1.cdr;
	res.cdr = tmp;
    }
    return res;
}

function sc_dualAppend(l1, l2) {
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    var rev = sc_reverse(l1);
    return sc_reverseAppendBang(rev, l2);
}

/*** META ((export append eappend) ;; we want eappend for the quasiquotes.
           (arity -1))
*/
function sc_append() {
    if (arguments.length === 0)
	return null;
    var res = arguments[arguments.length - 1];
    for (var i = arguments.length - 2; i >= 0; i--)
	res = sc_dualAppend(arguments[i], res);
    return res;
}

function sc_dualAppendBang(l1, l2) {
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    var tmp = l1;
    while (tmp.cdr !== null) tmp=tmp.cdr;
    tmp.cdr = l2;
    return l1;
}

/*** META ((export #t)
           (arity -1))
*/
function sc_appendBang() {
    var res = null;
    for (var i = 0; i < arguments.length; i++)
	res = sc_dualAppendBang(res, arguments[i]);
    return res;
}

/*** META ((export #t) (arity #t)) */
function sc_reverse(l1) {
    var res = null;
    while (l1 !== null) {
	res = sc_cons(l1.car, res);
	l1 = l1.cdr;
    }
    return res;
}

/*** META ((export #t) (arity #t)) */
function sc_reverseBang(l) {
    return sc_reverseAppendBang(l, null);
}

/*** META ((export #t) (arity #t)) */
function sc_listTail(l, k) {
    var res = l;
    for (var i = 0; i < k; i++) {
	res = res.cdr;
    }
    return res;
}

/*** META ((export #t) (arity #t)) */
function sc_listRef(l, k) {
    return sc_listTail(l, k).car;
}

/* // unoptimized generic versions
function sc_memX(o, l, comp) {
    while (l != null) {
	if (comp(l.car, o))
	    return l;
	l = l.cdr;
    }
    return false;
}
function sc_memq(o, l) { return sc_memX(o, l, sc_isEq); }
function sc_memv(o, l) { return sc_memX(o, l, sc_isEqv); }
function sc_member(o, l) { return sc_memX(o, l, sc_isEqual); }
*/

/* optimized versions */
/*** META ((export #t) (arity #t)) */
function sc_memq(o, l) {
    while (l !== null) {
	if (l.car === o)
	    return l;
	l = l.cdr;
    }
    return false;
}
/*** META ((export #t) (arity #t)) */
function sc_memv(o, l) {
    while (l !== null) {
	if (l.car === o)
	    return l;
	l = l.cdr;
    }
    return false;
}
/*** META ((export #t) (arity #t)) */
function sc_member(o, l) {
    while (l !== null) {
	if (sc_isEqual(l.car,o))
	    return l;
	l = l.cdr;
    }
    return false;
}

/* // generic unoptimized versions
function sc_assX(o, al, comp) {
    while (al != null) {
	if (comp(al.car.car, o))
	    return al.car;
	al = al.cdr;
    }
    return false;
}
function sc_assq(o, al) { return sc_assX(o, al, sc_isEq); }
function sc_assv(o, al) { return sc_assX(o, al, sc_isEqv); }
function sc_assoc(o, al) { return sc_assX(o, al, sc_isEqual); }
*/
// optimized versions
/*** META ((export #t) (arity #t)) */
function sc_assq(o, al) {
    while (al !== null) {
	if (al.car.car === o)
	    return al.car;
	al = al.cdr;
    }
    return false;
}
/*** META ((export #t) (arity #t)) */
function sc_assv(o, al) {
    while (al !== null) {
	if (al.car.car === o)
	    return al.car;
	al = al.cdr;
    }
    return false;
}
/*** META ((export #t) (arity #t)) */
function sc_assoc(o, al) {
    while (al !== null) {
	if (sc_isEqual(al.car.car, o))
	    return al.car;
	al = al.cdr;
    }
    return false;
}

/* can be used for mutable strings and characters */
function sc_isCharStringEqual(cs1, cs2) { return cs1.val === cs2.val; }
function sc_isCharStringLess(cs1, cs2) { return cs1.val < cs2.val; }
function sc_isCharStringGreater(cs1, cs2) { return cs1.val > cs2.val; }
function sc_isCharStringLessEqual(cs1, cs2) { return cs1.val <= cs2.val; }
function sc_isCharStringGreaterEqual(cs1, cs2) { return cs1.val >= cs2.val; }
function sc_isCharStringCIEqual(cs1, cs2)
    { return cs1.val.toLowerCase() === cs2.val.toLowerCase(); }
function sc_isCharStringCILess(cs1, cs2)
    { return cs1.val.toLowerCase() < cs2.val.toLowerCase(); }
function sc_isCharStringCIGreater(cs1, cs2)
    { return cs1.val.toLowerCase() > cs2.val.toLowerCase(); }
function sc_isCharStringCILessEqual(cs1, cs2)
    { return cs1.val.toLowerCase() <= cs2.val.toLowerCase(); }
function sc_isCharStringCIGreaterEqual(cs1, cs2)
    { return cs1.val.toLowerCase() >= cs2.val.toLowerCase(); }

function sc_Char(c) {
    var cached = sc_Char.lazy[c];
    if (cached)
	return cached;
    this.val = c;
    sc_Char.lazy[c] = this;
    // add return, so FF does not complain.
    return undefined;
}
sc_Char.lazy = new Object();
// thanks to Eric
sc_Char.char2readable = {
    "\000": "#\\null",
    "\007": "#\\bell",
    "\010": "#\\backspace",
    "\011": "#\\tab",
    "\012": "#\\newline",
    "\014": "#\\page",
    "\015": "#\\return",
    "\033": "#\\escape",
    "\040": "#\\space",
    "\177": "#\\delete",

  /* poeticless names */
    "\001": "#\\soh",
    "\002": "#\\stx",
    "\003": "#\\etx",
    "\004": "#\\eot",
    "\005": "#\\enq",
    "\006": "#\\ack",

    "\013": "#\\vt",
    "\016": "#\\so",
    "\017": "#\\si",

    "\020": "#\\dle",
    "\021": "#\\dc1",
    "\022": "#\\dc2",
    "\023": "#\\dc3",
    "\024": "#\\dc4",
    "\025": "#\\nak",
    "\026": "#\\syn",
    "\027": "#\\etb",

    "\030": "#\\can",
    "\031": "#\\em",
    "\032": "#\\sub",
    "\033": "#\\esc",
    "\034": "#\\fs",
    "\035": "#\\gs",
    "\036": "#\\rs",
    "\037": "#\\us"};

sc_Char.readable2char = {
    "null": "\000",
    "bell": "\007",
    "backspace": "\010",
    "tab": "\011",
    "newline": "\012",
    "page": "\014",
    "return": "\015",
    "escape": "\033",
    "space": "\040",
    "delete": "\000",
    "soh": "\001",
    "stx": "\002",
    "etx": "\003",
    "eot": "\004",
    "enq": "\005",
    "ack": "\006",
    "bel": "\007",
    "bs": "\010",
    "ht": "\011",
    "nl": "\012",
    "vt": "\013",
    "np": "\014",
    "cr": "\015",
    "so": "\016",
    "si": "\017",
    "dle": "\020",
    "dc1": "\021",
    "dc2": "\022",
    "dc3": "\023",
    "dc4": "\024",
    "nak": "\025",
    "syn": "\026",
    "etb": "\027",
    "can": "\030",
    "em": "\031",
    "sub": "\032",
    "esc": "\033",
    "fs": "\034",
    "gs": "\035",
    "rs": "\036",
    "us": "\037",
    "sp": "\040",
    "del": "\177"};

sc_Char.prototype.toString = function() {
    return this.val;
};
// sc_toDisplayString == toString
sc_Char.prototype.sc_toWriteString = function() {
    var entry = sc_Char.char2readable[this.val];
    if (entry)
	return entry;
    else
	return "#\\" + this.val;
};

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (postfix "instanceof sc_Char")))
*/
function sc_isChar(c) {
    return (c instanceof sc_Char);
}

/*** META ((export char=?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val === " c2 ".val")))
*/
var sc_isCharEqual = sc_isCharStringEqual;
/*** META ((export char<?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val < " c2 ".val")))
*/
var sc_isCharLess = sc_isCharStringLess;
/*** META ((export char>?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val > " c2 ".val")))
*/
var sc_isCharGreater = sc_isCharStringGreater;
/*** META ((export char<=?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val <= " c2 ".val")))
*/
var sc_isCharLessEqual = sc_isCharStringLessEqual;
/*** META ((export char>=?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val >= " c2 ".val")))
*/
var sc_isCharGreaterEqual = sc_isCharStringGreaterEqual;
/*** META ((export char-ci=?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val.toLowerCase() === " c2 ".val.toLowerCase()")))
*/
var sc_isCharCIEqual = sc_isCharStringCIEqual;
/*** META ((export char-ci<?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val.toLowerCase() < " c2 ".val.toLowerCase()")))
*/
var sc_isCharCILess = sc_isCharStringCILess;
/*** META ((export char-ci>?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val.toLowerCase() > " c2 ".val.toLowerCase()")))
*/
var sc_isCharCIGreater = sc_isCharStringCIGreater;
/*** META ((export char-ci<=?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val.toLowerCase() <= " c2 ".val.toLowerCase()")))
*/
var sc_isCharCILessEqual = sc_isCharStringCILessEqual;
/*** META ((export char-ci>=?)
           (arity 2)
           (type bool)
           (peephole (hole 2 c1 ".val.toLowerCase() >= " c2 ".val.toLowerCase()")))
*/
var sc_isCharCIGreaterEqual = sc_isCharStringCIGreaterEqual;

var SC_NUMBER_CLASS = "0123456789";
var SC_WHITESPACE_CLASS = ' \r\n\t\f';
var SC_LOWER_CLASS = 'abcdefghijklmnopqrstuvwxyz';
var SC_UPPER_CLASS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function sc_isCharOfClass(c, cl) { return (cl.indexOf(c) != -1); }
/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isCharAlphabetic(c)
    { return sc_isCharOfClass(c.val, SC_LOWER_CLASS) ||
	  sc_isCharOfClass(c.val, SC_UPPER_CLASS); }
/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (hole 1 "SC_NUMBER_CLASS.indexOf(" c ".val) != -1")))
*/
function sc_isCharNumeric(c)
    { return sc_isCharOfClass(c.val, SC_NUMBER_CLASS); }
/*** META ((export #t) (arity #t)
           (type bool))
*/
function sc_isCharWhitespace(c) {
    var tmp = c.val;
    return tmp === " " || tmp === "\r" || tmp === "\n" || tmp === "\t" || tmp === "\f";
}
/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (hole 1 "SC_UPPER_CLASS.indexOf(" c ".val) != -1")))
*/
function sc_isCharUpperCase(c)
    { return sc_isCharOfClass(c.val, SC_UPPER_CLASS); }
/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (hole 1 "SC_LOWER_CLASS.indexOf(" c ".val) != -1")))
*/
function sc_isCharLowerCase(c)
    { return sc_isCharOfClass(c.val, SC_LOWER_CLASS); }

/*** META ((export #t) (arity #t)
           (peephole (postfix ".val.charCodeAt(0)")))
*/
function sc_char2integer(c)
    { return c.val.charCodeAt(0); }
/*** META ((export #t) (arity #t)
           (peephole (hole 1 "new sc_Char(String.fromCharCode(" n "))")))
*/
function sc_integer2char(n)
    { return new sc_Char(String.fromCharCode(n)); }

/*** META ((export #t) (arity #t)
           (peephole (hole 1 "new sc_Char(" c ".val.toUpperCase())")))
*/
function sc_charUpcase(c)
    { return new sc_Char(c.val.toUpperCase()); }
/*** META ((export #t) (arity #t)
           (peephole (hole 1 "new sc_Char(" c ".val.toLowerCase())")))
*/
function sc_charDowncase(c)
    { return new sc_Char(c.val.toLowerCase()); }

function sc_makeJSStringOfLength(k, c) {
    var fill;
    if (c === undefined)
	fill = " ";
    else
	fill = c;
    var res = "";
    var len = 1;
    // every round doubles the size of fill.
    while (k >= len) {
	if (k & len)
	    res = res.concat(fill);
	fill = fill.concat(fill);
	len *= 2;
    }
    return res;
}

function sc_makejsString(k, c) {
    var fill;
    if (c)
	fill = c.val;
    else
	fill = " ";
    return sc_makeJSStringOfLength(k, fill);
}

function sc_jsstring2list(s) {
    var res = null;
    for (var i = s.length - 1; i >= 0; i--)
	res = sc_cons(new sc_Char(s.charAt(i)), res);
    return res;
}

function sc_list2jsstring(l) {
    var a = new Array();
    while(l !== null) {
	a.push(l.car.val);
	l = l.cdr;
    }
    return "".concat.apply("", a);
}

var sc_Vector = Array;

sc_Vector.prototype.sc_toWriteOrDisplayString = function(writeOrDisplay) {
    if (this.length === 0) return "#()";

    var res = "#(" + writeOrDisplay(this[0]);
    for (var i = 1; i < this.length; i++)
	res += " " + writeOrDisplay(this[i]);
    res += ")";
    return res;
};
sc_Vector.prototype.sc_toDisplayString = function() {
    return this.sc_toWriteOrDisplayString(sc_toDisplayString);
};
sc_Vector.prototype.sc_toWriteString = function() {
    return this.sc_toWriteOrDisplayString(sc_toWriteString);
};

/*** META ((export vector? array?) (arity #t)
           (type bool)
           (peephole (postfix " instanceof sc_Vector")))
*/
function sc_isVector(v) {
    return (v instanceof sc_Vector);
}

// only applies to vectors
function sc_isVectorEqual(v1, v2, comp) {
    if (v1.length !== v2.length) return false;
    for (var i = 0; i < v1.length; i++)
	if (!comp(v1[i], v2[i])) return false;
    return true;
}

/*** META ((export make-vector make-array)
           (arity -2))
*/
function sc_makeVector(size, fill) {
    var a = new sc_Vector(size);
    if (fill !== undefined)
	sc_vectorFillBang(a, fill);
    return a;
}

/*** META ((export vector array)
           (arity -1)
           (peephole (vector)))
*/
function sc_vector() {
    var a = new sc_Vector();
    for (var i = 0; i < arguments.length; i++)
	a.push(arguments[i]);
    return a;
}

/*** META ((export vector-length array-length) (arity #t)
           (peephole (postfix ".length")))
*/
function sc_vectorLength(v) {
    return v.length;
}

/*** META ((export vector-ref array-ref) (arity #t)
           (peephole (hole 2 v "[" pos "]")))
*/
function sc_vectorRef(v, pos) {
    return v[pos];
}

/*** META ((export vector-set! array-set!) (arity #t)
           (peephole (hole 3 v "[" pos "] = " val)))
*/
function sc_vectorSetBang(v, pos, val) {
    v[pos] = val;
}

/*** META ((export vector->list array->list) (arity #t)) */
function sc_vector2list(a) {
    var res = null;
    for (var i = a.length-1; i >= 0; i--)
	res = sc_cons(a[i], res);
    return res;
}

/*** META ((export list->vector list->array) (arity #t)) */
function sc_list2vector(l) {
    var a = new sc_Vector();
    while(l !== null) {
	a.push(l.car);
	l = l.cdr;
    }
    return a;
}

/*** META ((export vector-fill! array-fill!) (arity #t)) */
function sc_vectorFillBang(a, fill) {
    for (var i = 0; i < a.length; i++)
	a[i] = fill;
}


/*** META ((export #t) (arity #t)) */
function sc_copyVector(a, len) {
    if (len <= a.length)
	return a.slice(0, len);
    else {
	var tmp = a.concat();
	tmp.length = len;
	return tmp;
    }
}

/*** META ((export #t) (arity -2)
           (peephole (hole 3 a ".slice(" start "," end ")")))
*/
function sc_vectorCopy(a, start, end) {
    return a.slice(start, end);
}

/*** META ((export #t) (arity -4)) */
function sc_vectorCopyBang(target, tstart, source, sstart, send) {
    if (!sstart) sstart = 0;
    if (!send) send = source.length;

    // if target == source we don't want to overwrite not yet copied elements.
    if (tstart <= sstart) {
	for (var i = tstart, j = sstart; j < send; i++, j++) {
	    target[i] = source[j];
	}
    } else {
	var diff = send - sstart;
	for (var i = tstart + diff - 1, j = send - 1;
	     j >= sstart;
	     i--, j--) {
	    target[i] = source[j];
	}
    }
    return target;
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (hole 1 "typeof " o " === 'function'")))
*/
function sc_isProcedure(o) {
    return (typeof o === "function");
}

/*** META ((export #t) (arity -3)) */
function sc_apply(proc) {
    var args = new Array();
    // first part of arguments are not in list-form.
    for (var i = 1; i < arguments.length - 1; i++)
	args.push(arguments[i]);
    var l = arguments[arguments.length - 1];
    while (l !== null) {
	args.push(l.car);
	l = l.cdr;
    }
    return proc.apply(null, args);
}

/*** META ((export #t) (arity -2)) */
function sc_map(proc, l1) {
    if (l1 === undefined)
	return null;
    // else
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    var revres = null;
    while (l1 !== null) {
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	revres = sc_cons(proc.apply(null, applyArgs), revres);
    }
    return sc_reverseAppendBang(revres, null);
}

/*** META ((export #t) (arity -2)) */
function sc_mapBang(proc, l1) {
    if (l1 === undefined)
	return null;
    // else
    var l1_orig = l1;
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    while (l1 !== null) {
	var tmp = l1;
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	tmp.car = proc.apply(null, applyArgs);
    }
    return l1_orig;
}

/*** META ((export #t) (arity -2)) */
function sc_forEach(proc, l1) {
    if (l1 === undefined)
	return undefined;
    // else
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    while (l1 !== null) {
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	proc.apply(null, applyArgs);
    }
    // add return so FF does not complain.
    return undefined;
}

/*** META ((export #t) (arity #t)) */
function sc_filter(proc, l1) {
    var dummy = { cdr : null };
    var tail = dummy;
    while (l1 !== null) {
	if (proc(l1.car) !== false) {
	    tail.cdr = sc_cons(l1.car, null);
	    tail = tail.cdr;
	}
	l1 = l1.cdr;
    }
    return dummy.cdr;
}

/*** META ((export #t) (arity #t)) */
function sc_filterBang(proc, l1) {
    var head = sc_cons("dummy", l1);
    var it = head;
    var next = l1;
    while (next !== null) {
        if (proc(next.car) !== false) {
	    it.cdr = next
	    it = next;
	}
	next = next.cdr;
    }
    it.cdr = null;
    return head.cdr;
}

function sc_filterMap1(proc, l1) {
    var revres = null;
    while (l1 !== null) {
        var tmp = proc(l1.car)
        if (tmp !== false) revres = sc_cons(tmp, revres);
        l1 = l1.cdr;
    }
    return sc_reverseAppendBang(revres, null);
}
function sc_filterMap2(proc, l1, l2) {
    var revres = null;
    while (l1 !== null) {
        var tmp = proc(l1.car, l2.car);
        if(tmp !== false) revres = sc_cons(tmp, revres);
	l1 = l1.cdr;
	l2 = l2.cdr
    }
    return sc_reverseAppendBang(revres, null);
}

/*** META ((export #t) (arity -2)) */
function sc_filterMap(proc, l1, l2, l3) {
    if (l2 === undefined)
	return sc_filterMap1(proc, l1);
    else if (l3 === undefined)
	return sc_filterMap2(proc, l1, l2);
    // else
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    var revres = null;
    while (l1 !== null) {
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	var tmp = proc.apply(null, applyArgs);
	if(tmp !== false) revres = sc_cons(tmp, revres);
    }
    return sc_reverseAppendBang(revres, null);
}

function sc_any1(proc, l) {
    var revres = null;
    while (l !== null) {
        var tmp = proc(l.car);
        if(tmp !== false) return tmp;
	l = l.cdr;
    }
    return false;
}

/*** META ((export #t) (arity -2)) */
function sc_any(proc, l1, l2) {
    if (l1 === undefined)
	return false;
    if (l2 === undefined)
	return sc_any1(proc, l1);
    // else
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    while (l1 !== null) {
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	var tmp =  proc.apply(null, applyArgs);
	if (tmp !== false) return tmp;
    }
    return false;
}

/*** META ((export any?) (arity -2)
           (peephole (hole 2 "sc_any(" proc "," l ") !== false")))
*/
function sc_anyPred(proc, l) {
    return sc_any(proc, l) !== false;
}


function sc_every1(proc, l) {
    var revres = null;
    var tmp = true;
    while (l !== null) {
        tmp = proc(l.car);
        if (tmp === false) return false;
	l = l.cdr;
    }
    return tmp;
}

/*** META ((export #t) (arity -2)) */
function sc_every(proc, l1, l2) {
    if (l1 === undefined)
	return true;
    if (l2 === undefined)
	return sc_every1(proc, l1);
    // else
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    var tmp = true;
    while (l1 !== null) {
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	var tmp = proc.apply(null, applyArgs);
	if (tmp === false) return false;
    }
    return tmp;
}

/*** META ((export every?) (arity -2)
           (peephole (hole 2 "sc_every(" proc "," l ") !== false")))
*/
function sc_everyPred(proc, l) {
    var tmp = sc_every(proc, l);
    if (tmp !== false) return true;
    return false;
}

/*** META ((export #t) (arity #t)
           (peephole (postfix "()")))
*/
function sc_force(o) {
    return o();
}

/*** META ((export #t) (arity #t)) */
function sc_makePromise(proc) {
    var isResultReady = false;
    var result = undefined;
    return function() {
	if (!isResultReady) {
	    var tmp = proc();
	    if (!isResultReady) {
		isResultReady = true;
		result = tmp;
	    }
	}
	return result;
    };
}

function sc_Values(values) {
    this.values = values;
}

/*** META ((export #t) (arity -1)
           (peephole (values)))
*/
function sc_values() {
    if (arguments.length === 1)
	return arguments[0];
    else
	return new sc_Values(arguments);
}

/*** META ((export #t) (arity #t)) */
function sc_callWithValues(producer, consumer) {
   if( !sc_isProcedure(producer) )
      sc_error( "callWithValue", "producer not a procedure", producer );

    var produced = producer();
    if (produced instanceof sc_Values)
	return consumer.apply(null, produced.values);
    else
	return consumer(produced);
}

/*** META ((export #t) (arity #t)) */
function sc_dynamicWind(before, thunk, after) {
    before();
    try {
	var res = thunk();
	return res;
    } finally {
	after();
    }
}


// TODO: eval/scheme-report-environment/null-environment/interaction-environment

// LIMITATION: 'load' doesn't exist without files.
// LIMITATION: transcript-on/transcript-off doesn't exist without files.


function sc_Struct(name) {
    this.name = name;
}
sc_Struct.prototype.sc_toDisplayString = function() {
    return "#<struct" + sc_hash(this) + ">";
};
sc_Struct.prototype.sc_toWriteString = sc_Struct.prototype.sc_toDisplayString;

/*** META ((export #t) (arity #t)
           (peephole (hole 1 "new sc_Struct(" name ")")))
*/
function sc_makeStruct(name) {
    return new sc_Struct(name);
}

/*** META ((export #t) (arity 1)
           (type bool)
           (peephole (postfix " instanceof sc_Struct")))
*/
function sc_isStruct(o) {
    return (o instanceof sc_Struct);
}

/*** META ((export #t) (arity #t)
           (type bool)
           (peephole (hole 2 "(" 1 " instanceof sc_Struct) && ( " 1 ".name === " 0 ")")))
*/
function sc_isStructNamed(name, s) {
    return ((s instanceof sc_Struct) && (s.name === name));
}

/*** META ((export struct-field) (arity #t)
           (peephole (hole 3 0 "[" 2 "]")))
*/
function sc_getStructField(s, name, field) {
    return s[field];
}

/*** META ((export struct-field-set!) (arity #t)
           (peephole (hole 4 0 "[" 2 "] = " 3)))
*/
function sc_setStructFieldBang(s, name, field, val) {
    s[field] = val;
}

/*** META ((export #t) (arity #t)
           (peephole (prefix "~")))
*/
function sc_bitNot(x) {
    return ~x;
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 "&")))
*/
function sc_bitAnd(x, y) {
    return x & y;
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 "|")))
*/
function sc_bitOr(x, y) {
    return x | y;
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 "^")))
*/
function sc_bitXor(x, y) {
    return x ^ y;
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 "<<")))
*/
function sc_bitLsh(x, y) {
    return x << y;
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 ">>")))
*/
function sc_bitRsh(x, y) {
    return x >> y;
}

/*** META ((export #t) (arity #t)
           (peephole (infix 2 2 ">>>")))
*/
function sc_bitUrsh(x, y) {
    return x >>> y;
}

/*** META ((export js-field js-property js-ref) (arity #t)
           (peephole (hole 2 o "[" field "]")))
*/
function sc_jsField(o, field) {
    return o[field];
}

/*** META ((export js-field-set! js-property-set! js-set!)
           (arity #t)
           (peephole (hole 3 o "[" field "] = " val)))
*/
function sc_setJsFieldBang(o, field, val) {
    return o[field] = val;
}

/*** META ((export js-field-delete! js-property-delete!)
           (arity #t)
           (peephole (hole 2 "delete " o "[" field "]")))
*/
function sc_deleteJsFieldBang(o, field) {
    delete o[field];
}

/*** META ((export #t)
           (arity -3)
           (peephole (jsCall)))
*/
function sc_jsCall(o, fun) {
    var args = new Array();
    for (var i = 2; i < arguments.length; i++)
	args[i-2] = arguments[i];
    return fun.apply(o, args);
}

/*** META ((export #t)
           (arity -3)
           (peephole (jsMethodCall)))
*/
function sc_jsMethodCall(o, field) {
    var args = new Array();
    for (var i = 2; i < arguments.length; i++)
	args[i-2] = arguments[i];
    return o[field].apply(o, args);
}

/*** META ((export new js-new)
           (arity -2)
           (peephole (jsNew)))
*/
function sc_jsNew(c) {
    var evalStr = "new c(";
    evalStr +=arguments.length > 1? "arguments[1]": "";
    for (var i = 2; i < arguments.length; i++)
	evalStr += ", arguments[" + i + "]";
    evalStr +=")";
    return eval(evalStr);
}

// ======================== RegExp ====================
/*** META ((export #t) (arity #t)) */
function sc_pregexp(re) {
    return new RegExp(sc_string2jsstring(re));
}

/*** META ((export #t) (arity #t)) */
function sc_pregexpMatch(re, s) {
    var reg = (re instanceof RegExp) ? re : sc_pregexp(re);
    var tmp = reg.exec(sc_string2jsstring(s));

    if (tmp == null) return false;

    var res = null;
    for (var i = tmp.length-1; i >= 0; i--) {
	if (tmp[i] !== null) {
	    res = sc_cons(sc_jsstring2string(tmp[i]), res);
	} else {
	    res = sc_cons(false, res);
	}
    }
    return res;
}

/*** META ((export #t) (arity #t)) */
function sc_pregexpReplace(re, s1, s2) {
   var reg;
   var jss1 = sc_string2jsstring(s1);
   var jss2 = sc_string2jsstring(s2);

   if (re instanceof RegExp) {
       if (re.global)
	   reg = re;
       else
	   reg = new RegExp(re.source);
   } else {
       reg = new RegExp(sc_string2jsstring(re));
   }

   return jss1.replace(reg, jss2);
}

/*** META ((export pregexp-replace*) (arity #t)) */
function sc_pregexpReplaceAll(re, s1, s2) {
   var reg;
   var jss1 = sc_string2jsstring(s1);
   var jss2 = sc_string2jsstring(s2);

   if (re instanceof RegExp) {
      if (re.global)
	  reg = re;
      else
	  reg = new RegExp(re.source, "g");
   } else {
       reg = new RegExp(sc_string2jsstring(re), "g");
   }

   return jss1.replace(reg, jss2);
}

/*** META ((export #t) (arity #t)) */
function sc_pregexpSplit(re, s) {
   var reg = ((re instanceof RegExp) ?
	      re :
	      new RegExp(sc_string2jsstring(re)));
   var jss = sc_string2jsstring(s);
   var tmp = jss.split(reg);

   if (tmp == null) return false;

   return sc_vector2list(tmp);
}

function sc_pregexpCreateCharsetMatcher(set) {
    if (set.length === 0 || set.length === 1) return new RegExp("[" + set + "]");
    var res = "[";
    for (var i = 0; i < set.length; i++) {
	var c = set.charAt(i);
	if (c === "]")
	    res += "\\]";
	else if (c === "^")
	    res += "\\^";
	else if (c === "\\")
	    res += "\\\\";
	else if (c === "-")
	    res += "\\-";
	else res += c;
    }
    return new RegExp(res + "]");
}

/* =========================================================================== */
/* Other library stuff */
/* =========================================================================== */

/*** META ((export #t) (arity #t)
           (peephole (hole 1 "Math.floor(Math.random()*" 'n ")")))
*/
function sc_random(n) {
    return Math.floor(Math.random()*n);
}

/*** META ((export current-date) (arity #t)
           (peephole (hole 0 "new Date()")))
*/
function sc_currentDate() {
   return new Date();
}

/*** META ((export current-seconds) (arity #t))
*/
function sc_currentSeconds() {
   return (new Date()).getTime() / 1000;
}

/*** META ((export current-microseconds) (arity #t))
*/
function sc_currentMicroseconds() {
   return (new Date()).getTime();
}

/*** META ((export #t) (arity #t))
*/
function sc_time(proc) {
   var start = sc_currentMicroseconds();
   var res = proc();
   var stop = sc_currentMicroseconds();

   return sc_values( res, stop - start, 0, 0 );
}

function sc_Hashtable() {
}
sc_Hashtable.prototype.toString = function() {
    return "#{%hashtable}";
};
// sc_toWriteString == sc_toDisplayString == toString

function sc_HashtableElement(key, val) {
    this.key = key;
    this.val = val;
}

// the arity of make-hashtable inside Bigloo is -1. However we don't use it
// here. So for now simply don't give the arity...
/*** META ((export #t)
           (peephole (hole 0 "new sc_Hashtable()")))
*/
function sc_makeHashtable() {
    return new sc_Hashtable();
}

/*** META ((export #t) (arity #t)
           (type bool)) */
function sc_isHashtable(o) {
    return o instanceof sc_Hashtable;
}

/*** META ((export #t) (arity #t)) */
function sc_hashtablePutBang(ht, key, val) {
    var hash = sc_hash(key);
    ht[hash] = new sc_HashtableElement(key, val);
}

/*** META ((export #t) (arity #t)) */
function sc_hashtableGet(ht, key) {
    var hash = sc_hash(key);
    if (hash in ht)
	return ht[hash].val;
    else
	return false;
}

/*** META ((export #t) (arity #t)) */
function sc_hashtableForEach(ht, f) {
    for (var v in ht) {
	if (ht[v] instanceof sc_HashtableElement)
	    f(ht[v].key, ht[v].val);
    }
}

/*** META ((export hashtable-contains?)
           (arity #t)
           (peephole (hole 2 "sc_hash(" 1 ") in " 0)))
*/
function sc_hashtableContains(ht, key) {
    var hash = sc_hash(key);
    if (hash in ht)
	return true;
    else
	return false;
}

var SC_HASH_COUNTER = 0;

function sc_hash(o) {
    if (o === null)
	return "null";
    else if (o === undefined)
	return "undefined";
    else if (o === true)
	return "true";
    else if (o === false)
	return "false";
    else if (typeof o === "number")
	return "num-" + o;
    else if (typeof o === "string")
	return "jsstr-" + o;
    else if (o.sc_getHash)
	return o.sc_getHash();
    else
	return sc_counterHash.call(o);
}
function sc_counterHash() {
    if (!this.sc_hash) {
	this.sc_hash = "hash-" + SC_HASH_COUNTER;
	SC_HASH_COUNTER++;
    }
    return this.sc_hash;
}

function sc_Trampoline() {
}

sc_Trampoline.prototype.restart = function() {
    while (true) {
	this.calls = this.MAX_TAIL_CALLs-1;
	var res = this.f.apply(this, this.args);
	if (res !== this)
	    return res;
    }
}

/*** META ((export bind-exit-lambda) (arity #t)) */
function sc_bindExitLambda(proc) {
    var escape_obj = new sc_BindExitException();
    var escape = function(res) {
	escape_obj.res = res;
	throw escape_obj;
    };
    try {
	return proc(escape);
    } catch(e) {
	if (e === escape_obj) {
	    return e.res;
	}
	throw e;
    }
}
function sc_BindExitException() {
    this._internalException = true;
}

var SC_SCM2JS_GLOBALS = new Object();

var SC_TAIL_OBJECT = new sc_Trampoline();  // (used in runtime_callcc.)
SC_SCM2JS_GLOBALS.TAIL_OBJECT = SC_TAIL_OBJECT;
/*=====================================================================*/
/*    Author      :  Florian Loitsch                                   */
/*    Copyright   :  2007-11 Florian Loitsch, see LICENSE file         */
/*    -------------------------------------------------------------    */
/*    This file is part of Scheme2Js.                                  */
/*                                                                     */
/*   Scheme2Js is distributed in the hope that it will be useful,      */
/*   but WITHOUT ANY WARRANTY; without even the implied warranty of    */
/*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the     */
/*   LICENSE file for more details.                                    */
/*=====================================================================*/

// ======================== I/O =======================

/*------------------------------------------------------------------*/

function sc_EOF() {
}
var SC_EOF_OBJECT = new sc_EOF();

function sc_Port() {
}

/* --------------- Input ports -------------------------------------*/

function sc_InputPort() {
}
sc_InputPort.prototype = new sc_Port();

sc_InputPort.prototype.peekChar = function() {
    if (!("peeked" in this))
	this.peeked = this.getNextChar();
    return this.peeked;
}
sc_InputPort.prototype.readChar = function() {
    var tmp = this.peekChar();
    delete this.peeked;
    return tmp;
}
sc_InputPort.prototype.isCharReady = function() {
    return true;
}
sc_InputPort.prototype.close = function() {
    // do nothing
}

/* .............. String port ..........................*/
function sc_ErrorInputPort() {
};
sc_ErrorInputPort.prototype = new sc_InputPort();
sc_ErrorInputPort.prototype.getNextChar = function() {
    throw "can't read from error-port.";
};
sc_ErrorInputPort.prototype.isCharReady = function() {
    return false;
};


/* .............. String port ..........................*/

function sc_StringInputPort(jsStr) {
    // we are going to do some charAts on the str.
    // instead of recreating all the time a String-object, we
    // create one in the beginning. (not sure, if this is really an optim)
    this.str = new String(jsStr);
    this.pos = 0;
}
sc_StringInputPort.prototype = new sc_InputPort();
sc_StringInputPort.prototype.getNextChar = function() {
    if (this.pos >= this.str.length)
	return SC_EOF_OBJECT;
    return this.str.charAt(this.pos++);
};

/* ------------- Read and other lib-funs  -------------------------------*/
function sc_Token(type, val, pos) {
    this.type = type;
    this.val = val;
    this.pos = pos;
}
sc_Token.EOF = 0/*EOF*/;
sc_Token.OPEN_PAR = 1/*OPEN_PAR*/;
sc_Token.CLOSE_PAR = 2/*CLOSE_PAR*/;
sc_Token.OPEN_BRACE = 3/*OPEN_BRACE*/;
sc_Token.CLOSE_BRACE = 4/*CLOSE_BRACE*/;
sc_Token.OPEN_BRACKET = 5/*OPEN_BRACKET*/;
sc_Token.CLOSE_BRACKET = 6/*CLOSE_BRACKET*/;
sc_Token.WHITESPACE = 7/*WHITESPACE*/;
sc_Token.QUOTE = 8/*QUOTE*/;
sc_Token.ID = 9/*ID*/;
sc_Token.DOT = 10/*DOT*/;
sc_Token.STRING = 11/*STRING*/;
sc_Token.NUMBER = 12/*NUMBER*/;
sc_Token.ERROR = 13/*ERROR*/;
sc_Token.VECTOR_BEGIN = 14/*VECTOR_BEGIN*/;
sc_Token.TRUE = 15/*TRUE*/;
sc_Token.FALSE = 16/*FALSE*/;
sc_Token.UNSPECIFIED = 17/*UNSPECIFIED*/;
sc_Token.REFERENCE = 18/*REFERENCE*/;
sc_Token.STORE = 19/*STORE*/;
sc_Token.CHAR = 20/*CHAR*/;

var SC_ID_CLASS = SC_LOWER_CLASS + SC_UPPER_CLASS + "!$%*+-./:<=>?@^_~";
function sc_Tokenizer(port) {
    this.port = port;
}
sc_Tokenizer.prototype.peekToken = function() {
    if (this.peeked)
	return this.peeked;
    var newToken = this.nextToken();
    this.peeked = newToken;
    return newToken;
};
sc_Tokenizer.prototype.readToken = function() {
    var tmp = this.peekToken();
    delete this.peeked;
    return tmp;
};
sc_Tokenizer.prototype.nextToken = function() {
    var port = this.port;

    function isNumberChar(c) {
	return (c >= "0" && c <= "9");
    };
    function isIdOrNumberChar(c) {
	return SC_ID_CLASS.indexOf(c) != -1 || // ID-char
	    (c >= "0" && c <= "9");
    }
    function isWhitespace(c) {
	return c === " " || c === "\r" || c === "\n" || c === "\t" || c === "\f";
    };
    function isWhitespaceOrEOF(c) {
	return isWhitespace(c) || c === SC_EOF_OBJECT;
    };

    function readString() {
	res = "";
	while (true) {
	    var c = port.readChar();
	    switch (c) {
	    case '"':
		return new sc_Token(11/*STRING*/, res);
	    case "\\":
		var tmp = port.readChar();
		switch (tmp) {
		case '0': res += "\0"; break;
		case 'a': res += "\a"; break;
		case 'b': res += "\b"; break;
		case 'f': res += "\f"; break;
		case 'n': res += "\n"; break;
		case 'r': res += "\r"; break;
		case 't': res += "\t"; break;
		case 'v': res += "\v"; break;
		case '"': res += '"'; break;
		case '\\': res += '\\'; break;
		case 'x':
		    /* hexa-number */
		    var nb = 0;
		    while (true) {
			var hexC = port.peekChar();
			if (hexC >= '0' && hexC <= '9') {
			    port.readChar();
			    nb = nb * 16 + hexC.charCodeAt(0) - '0'.charCodeAt(0);
			} else if (hexC >= 'a' && hexC <= 'f') {
			    port.readChar();
			    nb = nb * 16 + hexC.charCodeAt(0) - 'a'.charCodeAt(0);
			} else if (hexC >= 'A' && hexC <= 'F') {
			    port.readChar();
			    nb = nb * 16 + hexC.charCodeAt(0) - 'A'.charCodeAt(0);
			} else {
			    // next char isn't part of hex.
			    res += String.fromCharCode(nb);
			    break;
			}
		    }
		    break;
		default:
		    if (tmp === SC_EOF_OBJECT) {
			return new sc_Token(13/*ERROR*/, "unclosed string-literal" + res);
		    }
		    res += tmp;
		}
		break;
	    default:
		if (c === SC_EOF_OBJECT) {
		    return new sc_Token(13/*ERROR*/, "unclosed string-literal" + res);
		}
		res += c;
	    }
	}
    };
    function readIdNumberOrKeyword(firstChar) {
	var res = firstChar;
	while (isIdOrNumberChar(port.peekChar()))
	    res += port.readChar();
	if (isNaN(res)) {
	    if (res.length > 1) {
		colonCode = ':'.charCodeAt(0);
		if (res.charCodeAt(0) == colonCode) {
		    if (res.charCodeAt(1) != colonCode) {
			return new sc_Token(21/*KEYWORD*/, res.substring(1, res.length));
		    }
		} else if (res.charCodeAt(res.length - 1) == colonCode &&
			   res.charCodeAt(res.length - 2) != colonCode) {
		    return new sc_Token(21/*KEYWORD*/, res.substring(0, res.length - 1));
		}
	    }
	    return new sc_Token(9/*ID*/, res);
	} else {
	    return new sc_Token(12/*NUMBER*/, res - 0);
	}
    };

    function skipWhitespaceAndComments() {
	var done = false;
	while (!done) {
	    done = true;
	    while (isWhitespace(port.peekChar()))
		port.readChar();
	    if (port.peekChar() === ';') {
		port.readChar();
		done = false;
		while (true) {
		    curChar = port.readChar();
		    if (curChar === SC_EOF_OBJECT ||
			curChar === '\n')
			break;
		}
	    }
	}
    };

    function readDot() {
	if (isWhitespace(port.peekChar()))
	    return new sc_Token(10/*DOT*/);
	else
	    return readIdNumberOrKeyword(".");
    };

    function readSharp() {
	var c = port.readChar();
	if (isWhitespace(c))
	    return new sc_Token(13/*ERROR*/, "bad #-pattern0.");

	// reference
	if (isNumberChar(c)) {
	    var nb = c - 0;
	    while (isNumberChar(port.peekChar()))
		nb = nb*10 + (port.readChar() - 0);
	    switch (port.readChar()) {
	    case '#':
		return new sc_Token(18/*REFERENCE*/, nb);
	    case '=':
		return new sc_Token(19/*STORE*/, nb);
	    default:
		return new sc_Token(13/*ERROR*/, "bad #-pattern1." + nb);
	    }
	}

	if (c === "(")
	    return new sc_Token(14/*VECTOR_BEGIN*/);

	if (c === "\\") { // character
	    var tmp = ""
	    while (!isWhitespaceOrEOF(port.peekChar()))
		tmp += port.readChar();
	    switch (tmp.length) {
	    case 0: // it's escaping a whitespace char:
		if (sc_isEOFObject(port.peekChar))
		    return new sc_Token(13/*ERROR*/, "bad #-pattern2.");
		else
		    return new sc_Token(20/*CHAR*/, port.readChar());
	    case 1:
		return new sc_Token(20/*CHAR*/, tmp);
	    default:
		var entry = sc_Char.readable2char[tmp.toLowerCase()];
		if (entry)
		    return new sc_Token(20/*CHAR*/, entry);
		else
		    return new sc_Token(13/*ERROR*/, "unknown character description: #\\" + tmp);
	    }
	}

	// some constants (#t, #f, #unspecified)
	var res;
	var needing;
	switch (c) {
	case 't': res = new sc_Token(15/*TRUE*/, true); needing = ""; break;
	case 'f': res = new sc_Token(16/*FALSE*/, false); needing = ""; break;
	case 'u': res = new sc_Token(17/*UNSPECIFIED*/, undefined); needing = "nspecified"; break;
	default:
	    return new sc_Token(13/*ERROR*/, "bad #-pattern3: " + c);
	}
	while(true) {
	    c = port.peekChar();
	    if ((isWhitespaceOrEOF(c) || c === ')') &&
		needing == "")
		return res;
	    else if (isWhitespace(c) || needing == "")
		return new sc_Token(13/*ERROR*/, "bad #-pattern4 " + c + " " + needing);
	    else if (needing.charAt(0) == c) {
		port.readChar(); // consume
		needing = needing.slice(1);
	    } else
		return new sc_Token(13/*ERROR*/, "bad #-pattern5");
	}

    };

    skipWhitespaceAndComments();
    var curChar = port.readChar();
    if (curChar === SC_EOF_OBJECT)
	return new sc_Token(0/*EOF*/, curChar);
    switch (curChar)
    {
    case " ":
    case "\n":
    case "\t":
	return readWhitespace();
    case "(":
	return new sc_Token(1/*OPEN_PAR*/);
    case ")":
	return new sc_Token(2/*CLOSE_PAR*/);
    case "{":
	return new sc_Token(3/*OPEN_BRACE*/);
    case "}":
	return new sc_Token(4/*CLOSE_BRACE*/);
    case "[":
	return new sc_Token(5/*OPEN_BRACKET*/);
    case "]":
	return new sc_Token(6/*CLOSE_BRACKET*/);
    case "'":
	return new sc_Token(8/*QUOTE*/);
    case "#":
	return readSharp();
    case ".":
	return readDot();
    case '"':
	return readString();
    default:
	if (isIdOrNumberChar(curChar))
	    return readIdNumberOrKeyword(curChar);
	throw "unexpected character: " + curChar;
    }
};

function sc_Reader(tokenizer) {
    this.tokenizer = tokenizer;
    this.backref = new Array();
}
sc_Reader.prototype.read = function() {
    function readList(listBeginType) {
	function matchesPeer(open, close) {
	    return open === 1/*OPEN_PAR*/ && close === 2/*CLOSE_PAR*/
	    	|| open === 3/*OPEN_BRACE*/ && close === 4/*CLOSE_BRACE*/
		|| open === 5/*OPEN_BRACKET*/ && close === 6/*CLOSE_BRACKET*/;
	};
	var res = null;

	while (true) {
	    var token = tokenizer.peekToken();

	    switch (token.type) {
	    case 2/*CLOSE_PAR*/:
	    case 4/*CLOSE_BRACE*/:
	    case 6/*CLOSE_BRACKET*/:
		if (matchesPeer(listBeginType, token.type)) {
		    tokenizer.readToken(); // consume token
		    return sc_reverseBang(res);
		} else
		    throw "closing par doesn't match: " + listBeginType
			+ " " + listEndType;

	    case 0/*EOF*/:
		throw "unexpected end of file";

	    case 10/*DOT*/:
		tokenizer.readToken(); // consume token
		var cdr = this.read();
		var par = tokenizer.readToken();
		if (!matchesPeer(listBeginType, par.type))
		    throw "closing par doesn't match: " + listBeginType
			+ " " + par.type;
		else
		    return sc_reverseAppendBang(res, cdr);


	    default:
		res = sc_cons(this.read(), res);
	    }
	}
    };
    // original scheme2js readQuote seems to be missing symbol prefix
    function readQuote() {
	return sc_cons(sc_SYMBOL_PREFIX + "quote", sc_cons(this.read(), null));
    };
    // function readQuote() {
    //     return sc_cons("quote", sc_cons(this.read(), null));
    // };
    function readVector() {
	// opening-parenthesis is already consumed
	var a = new Array();
	while (true) {
	    var token = tokenizer.peekToken();
	    switch (token.type) {
	    case 2/*CLOSE_PAR*/:
		tokenizer.readToken();
		return a;

	    default:
		a.push(this.read());
	    }
	}
    };

    function storeRefence(nb) {
	var tmp = this.read();
	this.backref[nb] = tmp;
	return tmp;
    };

    function readReference(nb) {
	if (nb in this.backref)
	    return this.backref[nb];
	else
	    throw "bad reference: " + nb;
    };

    var tokenizer = this.tokenizer;

    var token = tokenizer.readToken();

    // handle error
    if (token.type === 13/*ERROR*/)
	throw token.val;

    switch (token.type) {
    case 1/*OPEN_PAR*/:
    case 3/*OPEN_BRACE*/:
    case 5/*OPEN_BRACKET*/:
	return readList.call(this, token.type);
    case 8/*QUOTE*/:
	return readQuote.call(this);
    case 11/*STRING*/:
	return sc_jsstring2string(token.val);
    case 20/*CHAR*/:
	return new sc_Char(token.val);
    case 14/*VECTOR_BEGIN*/:
	return readVector.call(this);
    case 18/*REFERENCE*/:
	return readReference.call(this, token.val);
    case 19/*STORE*/:
	return storeRefence.call(this, token.val);
    case 9/*ID*/:
	return sc_jsstring2symbol(token.val);
    case 21/*KEYWORD*/:
	return sc_jsstring2keyword(token.val);
    case 0/*EOF*/:
    case 12/*NUMBER*/:
    case 15/*TRUE*/:
    case 16/*FALSE*/:
    case 17/*UNSPECIFIED*/:
	return token.val;
    default:
	throw "unexpected token " + token.type + " " + token.val;
    }
};

/*** META ((export #t) (arity -1)) */
function sc_read(port) {
    if (port === undefined) // we assume the port hasn't been given.
	port = SC_DEFAULT_IN; // THREAD: shared var...
    var reader = new sc_Reader(new sc_Tokenizer(port));
    return reader.read();
}
/*** META ((export #t) (arity -1)) */
function sc_readChar(port) {
    if (port === undefined) // we assume the port hasn't been given.
	port = SC_DEFAULT_IN; // THREAD: shared var...
    var t = port.readChar();
    return t === SC_EOF_OBJECT? t: new sc_Char(t);
}
/*** META ((export #t) (arity -1)) */
function sc_peekChar(port) {
    if (port === undefined) // we assume the port hasn't been given.
	port = SC_DEFAULT_IN; // THREAD: shared var...
    var t = port.peekChar();
    return t === SC_EOF_OBJECT? t: new sc_Char(t);
}
/*** META ((export #t)
           (arity -1)
           (type bool))
*/
function sc_isCharReady(port) {
    if (port === undefined) // we assume the port hasn't been given.
	port = SC_DEFAULT_IN; // THREAD: shared var...
    return port.isCharReady();
}
/*** META ((export #t)
           (arity #t)
           (peephole (postfix ".close()")))
*/
function sc_closeInputPort(p) {
    return p.close();
}

/*** META ((export #t)
           (arity #t)
           (type bool)
           (peephole (postfix " instanceof sc_InputPort")))
*/
function sc_isInputPort(o) {
    return (o instanceof sc_InputPort);
}

/*** META ((export eof-object?)
           (arity #t)
           (type bool)
           (peephole (postfix " === SC_EOF_OBJECT")))
*/
function sc_isEOFObject(o) {
    return o === SC_EOF_OBJECT;
}

/*** META ((export #t)
           (arity #t)
           (peephole (hole 0 "SC_DEFAULT_IN")))
*/
function sc_currentInputPort() {
    return SC_DEFAULT_IN;
}

/* ------------ file operations are not supported -----------*/
/*** META ((export #t) (arity #t)) */
function sc_callWithInputFile(s, proc) {
    throw "can't open " + s;
}

/*** META ((export #t) (arity #t)) */
function sc_callWithOutputFile(s, proc) {
    throw "can't open " + s;
}

/*** META ((export #t) (arity #t)) */
function sc_withInputFromFile(s, thunk) {
    throw "can't open " + s;
}

/*** META ((export #t) (arity #t)) */
function sc_withOutputToFile(s, thunk) {
    throw "can't open " + s;
}

/*** META ((export #t) (arity #t)) */
function sc_openInputFile(s) {
    throw "can't open " + s;
}

/*** META ((export #t) (arity #t)) */
function sc_openOutputFile(s) {
    throw "can't open " + s;
}

/* ----------------------------------------------------------------------------*/
/*** META ((export #t) (arity #t)) */
function sc_basename(p) {
   var i = p.lastIndexOf('/');

   if(i >= 0)
      return p.substring(i + 1, p.length);
   else
      return p;
}

/*** META ((export #t) (arity #t)) */
function sc_dirname(p) {
   var i = p.lastIndexOf('/');

   if(i >= 0)
      return p.substring(0, i);
   else
      return '';
}

/* ----------------------------------------------------------------------------*/

/*** META ((export #t) (arity #t)) */
function sc_withInputFromPort(p, thunk) {
    try {
	var tmp = SC_DEFAULT_IN; // THREAD: shared var.
	SC_DEFAULT_IN = p;
	return thunk();
    } finally {
	SC_DEFAULT_IN = tmp;
    }
}

/*** META ((export #t) (arity #t)) */
function sc_withInputFromString(s, thunk) {
    return sc_withInputFromPort(new sc_StringInputPort(sc_string2jsstring(s)), thunk);
}

/*** META ((export #t) (arity #t)) */
function sc_withOutputToPort(p, thunk) {
    try {
	var tmp = SC_DEFAULT_OUT; // THREAD: shared var.
	SC_DEFAULT_OUT = p;
	return thunk();
    } finally {
	SC_DEFAULT_OUT = tmp;
    }
}

/*** META ((export #t) (arity #t)) */
function sc_withOutputToString(thunk) {
    var p = new sc_StringOutputPort();
    sc_withOutputToPort(p, thunk);
    return p.close();
}

/*** META ((export #t) (arity #t)) */
function sc_withOutputToProcedure(proc, thunk) {
    var t = function(s) { proc(sc_jsstring2string(s)); };
    return sc_withOutputToPort(new sc_GenericOutputPort(t), thunk);
}

/*** META ((export #t)
           (arity #t)
           (peephole (hole 0 "new sc_StringOutputPort()")))
*/
function sc_openOutputString() {
    return new sc_StringOutputPort();
}

/*** META ((export #t) (arity #t)) */
function sc_openInputString(str) {
    return new sc_StringInputPort(sc_string2jsstring(str));
}

/* ----------------------------------------------------------------------------*/

function sc_OutputPort() {
}
sc_OutputPort.prototype = new sc_Port();
sc_OutputPort.prototype.appendJSString = function(obj) {
    /* do nothing */
}
sc_OutputPort.prototype.close = function() {
    /* do nothing */
}

function sc_StringOutputPort() {
    this.res = "";
}
sc_StringOutputPort.prototype = new sc_OutputPort();
sc_StringOutputPort.prototype.appendJSString = function(s) {
    this.res += s;
}
sc_StringOutputPort.prototype.close = function() {
    return sc_jsstring2string(this.res);
}

/*** META ((export #t) (arity #t)) */
function sc_getOutputString(sp) {
    return sc_jsstring2string(sp.res);
}


function sc_ErrorOutputPort() {
}
sc_ErrorOutputPort.prototype = new sc_OutputPort();
sc_ErrorOutputPort.prototype.appendJSString = function(s) {
    throw "don't write on ErrorPort!";
}
sc_ErrorOutputPort.prototype.close = function() {
    /* do nothing */
}

function sc_GenericOutputPort(appendJSString, close) {
    this.appendJSString = appendJSString;
    if (close)
	this.close = close;
}
sc_GenericOutputPort.prototype = new sc_OutputPort();

/*** META ((export #t)
           (arity #t)
	   (type bool)
           (peephole (postfix " instanceof sc_OutputPort")))
*/
function sc_isOutputPort(o) {
    return (o instanceof sc_OutputPort);
}

/*** META ((export #t)
           (arity #t)
           (peephole (postfix ".close()")))
*/
function sc_closeOutputPort(p) {
    return p.close();
}

/* ------------------ write ---------------------------------------------------*/

/*** META ((export #t) (arity -2)) */
function sc_write(o, p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString(sc_toWriteString(o));
}

function sc_toWriteStringProcedure(o) {
   if ("sc_name" in o) {
      return "#<procedure " + sc_name + " " + (o.sc_location != "#f" ? o.sc_location : "") + ":" + sc_hash(o) + ">";
   } else {
      var n = o.toString().match( /function[ \t\n]+([_a-zA-Z0-9$]+)/ );

      return "#<procedure " + (n ? n[ 1 ] : "anonymous") + ":" + sc_hash(o) + ">";
   }
}

function sc_toWriteString(o) {
   if (o === null)
      return "()";
   if (o === true)
      return "#t";
   if (o === false)
      return "#f";
   if (o === undefined)
      return "#unspecified";
    // window is only declared inside browsers. Otherwise this.window should be undefined
   if (o === this.window)

      return "window";
   if (typeof o === 'function') {
      sc_toWriteStringProcedure(o);
   }
   if (o.sc_toWriteString)
      return o.sc_toWriteString();
   return o.toString();
}

function sc_escapeWriteString(s) {
    var res = "";
    var j = 0;
    for (i = 0; i < s.length; i++) {
	switch (s.charAt(i)) {
	case "\0": res += s.substring(j, i) + "\\0"; j = i + 1; break;
	case "\b": res += s.substring(j, i) + "\\b"; j = i + 1; break;
	case "\f": res += s.substring(j, i) + "\\f"; j = i + 1; break;
	case "\n": res += s.substring(j, i) + "\\n"; j = i + 1; break;
	case "\r": res += s.substring(j, i) + "\\r"; j = i + 1; break;
	case "\t": res += s.substring(j, i) + "\\t"; j = i + 1; break;
	case '"': res += s.substring(j, i) + '\\"'; j = i + 1; break;
	case "\\": res += s.substring(j, i) + "\\\\"; j = i + 1; break;
	default:
	    var c = s.charAt(i);
	    if ("\a" !== "a" && c == "\a") {
		res += s.substring(j, i) + "\\a"; j = i + 1; continue;
	    }
	    if ("\v" !== "v" && c == "\v") {
		res += s.substring(j, i) + "\\v"; j = i + 1; continue;
	    }
	    //if (s.charAt(i) < ' ' || s.charCodeAt(i) > 127) {
	    // CARE: Manuel is this OK with HOP?
	    if (s.charAt(i) < ' ') {
		/* non printable character and special chars */
		res += s.substring(j, i) + "\\x" + s.charCodeAt(i).toString(16);
		j = i + 1;
	    }
	    // else just let i increase...
	}
    }
    res += s.substring(j, i);
    return res;
}

/* ------------------ display ---------------------------------------------------*/

/*** META ((export #t) (arity -2)) */
function sc_display(o, p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString(sc_toDisplayString(o));
}

function sc_toDisplayString(o) {
    if (o === null)
	return "()";
    else if (o === true)
	return "#t";
    else if (o === false)
	return "#f";
    else if (o === undefined)
	return "#unspecified";
    // window is only declared inside browsers. Otherwise this.window should be undefined
    else if (o === this.window)
        return "window";
    else if (typeof o === 'function')
       return sc_toWriteStringProcedure(o);
    else if (o.sc_toDisplayString)
	return o.sc_toDisplayString();
    else
	return o.toString();
}

/* ------------------ newline ---------------------------------------------------*/

/*** META ((export #t) (arity -1)) */
function sc_newline(p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString("\n");
}

/* ------------------ write-char ---------------------------------------------------*/

/*** META ((export #t) (arity -2)) */
function sc_writeChar(c, p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString(c.val);
}

/* ------------------ write/display-circle -----------------------------------------*/

/*** META ((export #t) (arity -2)) */
function sc_writeCircle(o, p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString(sc_toCircleString(o, sc_toWriteString));
}

/*** META ((export #t) (arity -2)) */
function sc_displayCircle(o, p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString(sc_toCircleString(o, sc_toDisplayString));
}

function sc_toCircleString(o, writeOrDisplay) {
    var symb = sc_gensym("writeCircle");
    var nbPointer = new Object();
    nbPointer.nb = 0;
    sc_prepCircle(o, symb, nbPointer);
    return sc_genToCircleString(o, symb, writeOrDisplay);
}

function sc_prepCircle(o, symb, nbPointer) {
    // TODO sc_Struct
    if (o instanceof sc_Pair ||
	o instanceof sc_Vector) {
	if (o[symb] !== undefined) {
	    // not the first visit.
	    o[symb]++;
	    // unless there is already a number, assign one.
	    if (!o[symb + "nb"]) o[symb + "nb"] = nbPointer.nb++;
	    return;
	}
	o[symb] = 0;
	if (o instanceof sc_Pair) {
	    sc_prepCircle(o.car, symb, nbPointer);
	    sc_prepCircle(o.cdr, symb, nbPointer);
	} else {
	    for (var i = 0; i < o.length; i++)
		sc_prepCircle(o[i], symb, nbPointer);
	}
    }
}

function sc_genToCircleString(o, symb, writeOrDisplay) {
    if (!(o instanceof sc_Pair ||
	  o instanceof sc_Vector))
	return writeOrDisplay(o);
    return o.sc_toCircleString(symb, writeOrDisplay);
}
sc_Pair.prototype.sc_toCircleString = function(symb, writeOrDisplay, inList) {
    if (this[symb + "use"]) { // use-flag is set. Just use it.
	var nb = this[symb + "nb"];
	if (this[symb]-- === 0) { // if we are the last use. remove all fields.
	    delete this[symb];
	    delete this[symb + "nb"];
	    delete this[symb + "use"];
	}
	if (inList)
	    return '. #' + nb + '#';
	else
	    return '#' + nb + '#';
    }
    if (this[symb]-- === 0) { // if we are the last use. remove all fields.
	delete this[symb];
	delete this[symb + "nb"];
	delete this[symb + "use"];
    }

    var res = "";

    if (this[symb] !== undefined) { // implies > 0
	this[symb + "use"] = true;
	if (inList)
	    res += '. #' + this[symb + "nb"] + '=';
	else
	    res += '#' + this[symb + "nb"] + '=';
	inList = false;
    }

    if (!inList)
	res += "(";

    // print car
    res += sc_genToCircleString(this.car, symb, writeOrDisplay);

    if (sc_isPair(this.cdr)) {
	res += " " + this.cdr.sc_toCircleString(symb, writeOrDisplay, true);
    } else if (this.cdr !== null) {
	res += " . " + sc_genToCircleString(this.cdr, symb, writeOrDisplay);
    }
    if (!inList)
	res += ")";
    return res;
};
sc_Vector.prototype.sc_toCircleString = function(symb, writeOrDisplay) {
    if (this[symb + "use"]) { // use-flag is set. Just use it.
	var nb = this[symb + "nb"];
	if (this[symb]-- === 0) { // if we are the last use. remove all fields.
	    delete this[symb];
	    delete this[symb + "nb"];
	    delete this[symb + "use"];
	}
	return '#' + nb + '#';
    }
    if (this[symb]-- === 0) { // if we are the last use. remove all fields.
	delete this[symb];
	delete this[symb + "nb"];
	delete this[symb + "use"];
    }

    var res = "";
    if (this[symb] !== undefined) { // implies > 0
	this[symb + "use"] = true;
	res += '#' + this[symb + "nb"] + '=';
    }
    res += "#(";
    for (var i = 0; i < this.length; i++) {
	res += sc_genToCircleString(this[i], symb, writeOrDisplay);
	if (i < this.length - 1) res += " ";
    }
    res += ")";
    return res;
};


/* ------------------ print ---------------------------------------------------*/

/*** META ((export #t) (arity -1)) */
function sc_print(s) {
    if (arguments.length === 1) {
	sc_display(s);
	sc_newline();
    }
    else {
	for (var i = 0; i < arguments.length; i++)
	    sc_display(arguments[i]);
	sc_newline();
    }
}

/* ------------------ format ---------------------------------------------------*/
/*** META ((export #t) (arity -2)) */
function sc_format(s) {
   var len = s.length;
   var p = new sc_StringOutputPort();
   var i = 0, j = 1;

   while( i < len ) {
      var i2 = s.indexOf("~", i);

      if (i2 == -1) {
	  p.appendJSString( s.substring( i, len ) );
	  return p.close();
      } else if (i2 == (len - 1)) {
	  p.appendJSString(s.substring(i, len));
	  return p.close();
      } else if (i2 == (len - 2) && s.charAt(i2 + 1) == ":") {
	  p.appendJSString(s.substring(i, len));
	  return p.close();
      } else {
	  if (i2 > i) p.appendJSString(s.substring(i, i2));

	  var alternativeForm = (s.charAt(i2 + 1) == ":");
	  if (alternativeForm) i2++;

	  // already advance before evalualating escape sequences.
	  // this way it is easier to see.
	  // no escape sequence requires 'i'.
	  i = i2 + 2;

	  switch(s.charCodeAt(i2 + 1)) {
	  case 65:
	  case 97:
	      // a
	      if (alternativeForm)
		  sc_displayCircle(arguments[j], p);
	      else
		  sc_display(arguments[j], p);
	      j++;
	      break;

	  case 83:
	  case 115:
	      // s
	      if (alternativeForm)
		  sc_writeCircle(arguments[j], p);
	      else
		  sc_write(arguments[j], p);
	      j++;
	      break;

	  case 86:
	  case 118:
	      // v
	      if (alternativeForm)
		  sc_displayCircle(arguments[j], p);
	      else
		  sc_display(arguments[j], p);
	      p.appendJSString("\n");
	      j++;
	      break;

	  case 67:
	  case 99:
	      // c
	      p.appendJSString(String.fromCharCode(arguments[j]));
	      j++;
	      break;

	  case 88:
	  case 120:
	      // x
	      p.appendJSString(arguments[j].toString(16));
	      j++;
	      break;

	  case 79:
	  case 111:
	      // o
	      p.appendJSString(arguments[j].toString(8));
	      j++;
	      break;

	  case 66:
	  case 98:
	      // b
	      p.appendJSString(arguments[j].toString(2));
	      j++;
	      break;

	  case 37:
	  case 110:
	      // %, n
	      p.appendJSString("\n");
	      break;

	  case 114:
	      // r
	      p.appendJSString("\r");
	      break;

	  case 126:
	      // ~
	      p.appendJSString("~");
	      break;

	  default:
	      sc_error( "format: illegal ~"
			+ String.fromCharCode(s.charCodeAt(i2 + 1))
			+ " sequence" );
	      return "";
	  }
      }
   }

   return p.close();
}

/* ------------------ global ports ---------------------------------------------------*/

var SC_DEFAULT_IN = new sc_ErrorInputPort();
var SC_DEFAULT_OUT = new sc_ErrorOutputPort();
var SC_ERROR_OUT = new sc_ErrorOutputPort();

/*=====================================================================*/
/*    Author      :  Florian Loitsch                                   */
/*    Copyright   :  2007-11 Florian Loitsch, see LICENSE file         */
/*    -------------------------------------------------------------    */
/*    This file is part of Scheme2Js.                                  */
/*                                                                     */
/*   Scheme2Js is distributed in the hope that it will be useful,      */
/*   but WITHOUT ANY WARRANTY; without even the implied warranty of    */
/*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the     */
/*   LICENSE file for more details.                                    */
/*=====================================================================*/

var sc_SYMBOL_PREFIX = "\uEBAC";
var sc_KEYWORD_PREFIX = "\uEBAD";

/*** META ((export #t) (arity #t)
           (peephole (id))) */
function sc_jsstring2string(s) {
    return s;
}

/*** META ((export #t) (arity #t)
           (peephole (prefix "'\\uEBAC' +")))
*/
function sc_jsstring2symbol(s) {
    return sc_SYMBOL_PREFIX + s;
}

/*** META ((export #t) (arity #t)
           (peephole (id)))
*/
function sc_string2jsstring(s) {
    return s;
}

/*** META ((export #t) (arity #t)
           (peephole (symbol2jsstring_immutable)))
*/
function sc_symbol2jsstring(s) {
    return s.slice(1);
}

/*** META ((export #t) (arity #t)
           (peephole (postfix ".slice(1)")))
*/
function sc_keyword2jsstring(k) {
    return k.slice(1);
}

/*** META ((export #t) (arity #t)
           (peephole (prefix "'\\uEBAD' +")))
*/
function sc_jsstring2keyword(s) {
    return sc_KEYWORD_PREFIX + s;
}

/*** META ((export #t)
           (arity #t)
           (type bool))
*/
function sc_isKeyword(s) {
    return (typeof s === "string") &&
	(s.charAt(0) === sc_KEYWORD_PREFIX);
}


/*** META ((export #t) (arity -1)) */
var sc_gensym = function() {
    var counter = 1000;
    return function(sym) {
	counter++;
	if (!sym) sym = sc_SYMBOL_PREFIX;
	return sym + "s" + counter + "~" + "^sC-GeNsYm ";
    };
}();


/*** META ((export #t)
           (arity #t)
           (type bool))
*/
function sc_isEqual(o1, o2) {
    return ((o1 === o2) ||
	    (sc_isPair(o1) && sc_isPair(o2)
	     && sc_isPairEqual(o1, o2, sc_isEqual)) ||
	    (sc_isVector(o1) && sc_isVector(o2)
	     && sc_isVectorEqual(o1, o2, sc_isEqual)));
}

/*** META ((export number->symbol integer->symbol) (arity -2)) */
function sc_number2symbol(x, radix) {
    return sc_SYMBOL_PREFIX + sc_number2jsstring(x, radix);
}

/*** META ((export number->string integer->string) (arity -2)) */
var sc_number2string = sc_number2jsstring;

/*** META ((export #t) (arity -2)) */
function sc_symbol2number(s, radix) {
    return sc_jsstring2number(s.slice(1), radix);
}

/*** META ((export #t) (arity -2)) */
var sc_string2number = sc_jsstring2number;

/*** META ((export #t) (arity -2)
           (peephole (hole 2 "parseInt(" s "," radix ")")))
*/
function sc_string2integer(s, radix) {
   return parseInt(s, radix);
}

/*** META ((export #t) (arity #t)
           (peephole (hole 1 "parseFloat(" s ")")))
*/
function sc_string2real(s) {
   return parseFloat(s);
}

/*** META ((export #t)
           (arity #t)
           (type bool))
*/
function sc_isSymbol(s) {
    return (typeof s === "string") &&
	(s.charAt(0) === sc_SYMBOL_PREFIX);
}

/*** META ((export #t)
           (arity #t)
           (peephole (symbol2string_immutable)))
*/
function sc_symbol2string(s) {
    return s.slice(1);
}

/*** META ((export #t)
           (arity #t)
           (peephole (prefix "'\\uEBAC' +")))
*/
function sc_string2symbol(s) {
    return sc_SYMBOL_PREFIX + s;
}

/*** META ((export symbol-append)
           (arity -1)
           (peephole (symbolAppend_immutable)))
*/
function sc_symbolAppend() {
    var res = sc_SYMBOL_PREFIX;
    for (var i = 0; i < arguments.length; i++)
	res += arguments[i].slice(1);
    return res;
}

/*** META ((export #t)
           (arity #t)
           (peephole (postfix ".val")))
*/
function sc_char2string(c) { return c.val; }

/*** META ((export #t)
           (arity #t)
           (peephole (hole 1 "'\\uEBAC' + " c ".val")))
*/
function sc_char2symbol(c) { return sc_SYMBOL_PREFIX + c.val; }

/*** META ((export #t)
           (arity #t)
           (type bool))
*/
function sc_isString(s) {
    return (typeof s === "string") &&
	(s.charAt(0) !== sc_SYMBOL_PREFIX);
}

/*** META ((export #t) (arity -2)) */
var sc_makeString = sc_makejsString;


/*** META ((export #t) (arity -1)) */
function sc_string() {
    for (var i = 0; i < arguments.length; i++)
	arguments[i] = arguments[i].val;
    return "".concat.apply("", arguments);
}

/*** META ((export #t)
           (arity #t)
           (peephole (postfix ".length")))
*/
function sc_stringLength(s) { return s.length; }

/*** META ((export #t) (arity #t)) */
function sc_stringRef(s, k) {
    return new sc_Char(s.charAt(k));
}

/* there's no stringSet in the immutable version
function sc_stringSet(s, k, c)
*/


/*** META ((export string=?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 " === " str2)))
*/
function sc_isStringEqual(s1, s2) {
    return s1 === s2;
}
/*** META ((export string<?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 " < " str2)))
*/
function sc_isStringLess(s1, s2) {
    return s1 < s2;
}
/*** META ((export string>?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 " > " str2)))
*/
function sc_isStringGreater(s1, s2) {
    return s1 > s2;
}
/*** META ((export string<=?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 " <= " str2)))
*/
function sc_isStringLessEqual(s1, s2) {
    return s1 <= s2;
}
/*** META ((export string>=?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 " >= " str2)))
*/
function sc_isStringGreaterEqual(s1, s2) {
    return s1 >= s2;
}
/*** META ((export string-ci=?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 ".toLowerCase() === " str2 ".toLowerCase()")))
*/
function sc_isStringCIEqual(s1, s2) {
    return s1.toLowerCase() === s2.toLowerCase();
}
/*** META ((export string-ci<?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 ".toLowerCase() < " str2 ".toLowerCase()")))
*/
function sc_isStringCILess(s1, s2) {
    return s1.toLowerCase() < s2.toLowerCase();
}
/*** META ((export string-ci>?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 ".toLowerCase() > " str2 ".toLowerCase()")))
*/
function sc_isStringCIGreater(s1, s2) {
    return s1.toLowerCase() > s2.toLowerCase();
}
/*** META ((export string-ci<=?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 ".toLowerCase() <= " str2 ".toLowerCase()")))
*/
function sc_isStringCILessEqual(s1, s2) {
    return s1.toLowerCase() <= s2.toLowerCase();
}
/*** META ((export string-ci>=?)
           (arity #t)
	   (type bool)
           (peephole (hole 2 str1 ".toLowerCase() >= " str2 ".toLowerCase()")))
*/
function sc_isStringCIGreaterEqual(s1, s2) {
    return s1.toLowerCase() >= s2.toLowerCase();
}

/*** META ((export string-contains)
           (arity -3)
	   (type bool))
*/
function sc_stringContains(s1,s2,start) {
   return s1.indexOf(s2,start ? start : 0) >= 0;
}

/*** META ((export string-contains-ci)
           (arity -3)
	   (type bool))
*/
function sc_stringCIContains(s1,s2,start) {
   return s1.toLowerCase().indexOf(s2.toLowerCase(),start ? start : 0) >= 0;
}

/*** META ((export #t)
           (arity -2))
*/
function sc_substring(s, start, end) {
   return s.substring(start, (!end || end < 0) ? s.length : end);
}

/*** META ((export #t) (arity -4))
*/
function sc_isSubstring_at(str1, str2, i, len) {
    if (!len) len = str2.length;
    else if (str2.length < len) return false;
    if (str1.length < len + i) return false;
    return str2.substring(0, len) == str1.substring(i, i+len);
    return s2 == s1.substring(i, i+ s2.length);
}

/*** META ((export substring=?) (arity #t))
*/
function sc_isSubstring(s1, s2, len) {
    if (s1.length < len) return false;
    if (s2.length < len) return false;
    return s2.substring(0, len) == s1.substring(0, len);
}

/*** META ((export #t)
           (arity -1)
           (peephole (infix 0 #f "+" "''")))
*/
function sc_stringAppend() {
    return "".concat.apply("", arguments);
}

/*** META ((export #t) (arity 1)) */
var sc_string2list = sc_jsstring2list;

/*** META ((export #t) (arity 1)) */
var sc_list2string = sc_list2jsstring;

/*** META ((export #t)
           (arity #t)
           (peephole (id)))
*/
function sc_stringCopy(s) {
    return s;
}

/* there's no string-fill in the immutable version
function sc_stringFill(s, c)
*/

/*** META ((export #t)
           (arity #t)
           (peephole (postfix ".slice(1)")))
*/
function sc_keyword2string(o) {
    return o.slice(1);
}

/*** META ((export #t)
           (arity #t)
           (peephole (prefix "'\\uEBAD' +")))
*/
function sc_string2keyword(o) {
    return sc_KEYWORD_PREFIX + o;
}

String.prototype.sc_toDisplayString = function() {
    if (this.charAt(0) === sc_SYMBOL_PREFIX)
	// TODO: care for symbols with spaces (escape-chars symbols).
	return this.slice(1);
    else if (this.charAt(0) === sc_KEYWORD_PREFIX)
	return ":" + this.slice(1);
    else
	return this.toString();
};

String.prototype.sc_toWriteString = function() {
    if (this.charAt(0) === sc_SYMBOL_PREFIX)
	// TODO: care for symbols with spaces (escape-chars symbols).
	return this.slice(1);
    else if (this.charAt(0) === sc_KEYWORD_PREFIX)
	return ":" + this.slice(1);
    else
	return '"' + sc_escapeWriteString(this) + '"';
};

/*** META ((export #t)
           (arity #t)
           (peephole (hole 2 1 ".indexOf(" 0 ") === 0")))
*/
function sc_isStringPrefix(cs1, cs2) {
    return cs2.indexOf(cs1) === 0;
}

/*** META ((export #t) (arity #t)) */
function sc_isStringSuffix(cs1, cs2) {
    var tmp = cs2.lastIndexOf(cs1);
    return tmp !== false && tmp >= 0 && tmp === cs2.length - cs1.length;
}

/*** META ((export #t) (arity #t)) */
function sc_stringSplit(s, sep) {
    if (sep.length === 1)
	return sc_vector2list(s.split(sep));
    return sc_vector2list(s.split(sc_pregexpCreateCharsetMatcher(sep)));
}

/*** META ((export #t) (arity -3)) */
function sc_stringIndex(s, cset, start) {
   var res;
   if (!start) start = 0;

   if (cset instanceof sc_Char) {
      res = s.indexOf(sc_char2string(cset), start);
      return res >= 0 ? res : false;
   }
   if (cset.length == 1) {
      res = s.indexOf(cset, start);
      return res >= 0 ? res : false;
   } else {
      for (var i = start; i < s.length; i++ ) {
	 if (cset.indexOf(s.charAt(i)))
	    return i;
      }

      return false;
   }
}

/*** META ((export #t) (arity -3)) */
function sc_stringIndexRight(s, cset, start) {
   var res;
   if (!start) start = s.length - 1;

   if (cset instanceof sc_Char) {
      res = s.lastIndexof(sc_char2string(cset), start);
      return res >= 0 ? res : false;
   }
   if (cset.length == 1) {
      res = s.lastIndexOf(cset, start);
      return res >= 0 ? res : false;
   } else {
      for (var i = start; i >= 0; i-- ) {
	 if (cset.indexOf(s.charAt(i)))
	    return i;
      }

      return false;
   }
}

/*** META ((export #t) (arity 1)) */
function sc_string_downcase(s) {
   return s.toLowerCase();
}

/*** META ((export #t) (arity 1)) */
function sc_string_upcase(s) {
   return s.toUpperCase();
}

/*** META ((export #t) (arity 1)) */
function sc_string_capitalize(s) {
   return s.replace(/\w+/g, function (w) {
	 return w.charAt(0).toUpperCase() + w.substr(1).toLowerCase();
      });
}

/*** META ((export #t) (arity 1)) */
function sc_prefix(s) {
   var i = s.lastIndexOf(".");
   return i ? s.substring(0, i) : s;
}

/*** META ((export #t) (arity 1)) */
function sc_suffix(s) {
   var i = s.lastIndexOf(".");
   return i ? s.substring(i+1,i.length) : s;
}
var a_dsssl__="dsssl formal parsing";var b_dsssl__="Unexpected #!keys parameters";var c_dsssl__="keyword argument misses value";var BGl_dssslzd2checkzd2keyzd2argsz12zc0zzdssslz00=function(a,b){if(b===null){var m=a;while(!(m===null)){var l=!(m instanceof sc_Pair);if(l!==false){var d=l;}else{var k=m.cdr===null;if(k!==false){d=k;}else{d=!sc_isKeyword(m.car);}}if(d!==false){return sc_error(a_dsssl__,b_dsssl__,m);}else{m=m.cdr.cdr;}}return a;}else{var n=null;var h=a;var i=false;var j=n;while(!(h===null)){var g=!(h instanceof sc_Pair);if(g!==false){var c=g;}else{var f=h.cdr===null;if(f!==false){c=f;}else{var e=!sc_isKeyword(h.car);if(e!==false){c=e;}else{c=sc_memq(h.car,b)===false;}}}if(c!==false){if(i===false){h=h.cdr;}else{i=false;j=new sc_Pair(h.car,j);h=h.cdr;}}else{h=h.cdr.cdr;i=true;}}return sc_reverseBang(j);}};var BGl_dssslzd2getzd2keyzd2argzd2zzdssslz00=function(a,b,c){var d=a;while(!(d===null)){if(!sc_isKeyword(d.car)){d=d.cdr;}else{if(d.car===b){if(!(d.cdr instanceof sc_Pair)){return sc_error("\uEBACdsssl-get-key-arg",c_dsssl__,d.car);}else{return d.cdr.car;}}else{if(!(d.cdr instanceof sc_Pair)){return sc_error("\uEBACdsssl-get-key-arg",c_dsssl__,d.car);}else{d=d.cdr.cdr;}}}}return c;};var BGl_dssslzd2getzd2keyzd2restzd2argz00zzdssslz00=function(a,b){var f=a;while(!(f===null)){var e=!sc_isKeyword(f.car);if(e!==false){var c=e;}else{var d=f.cdr===null;if(d!==false){c=d;}else{c=sc_memq(f.car,b)===false;}}if(c!==false){return f;}else{f=f.cdr.cdr;}}return null;};

var const_church_compiler_tmp;
var BgL_sc_const_1z00_church_compiler_tmp;
var BgL_sc_const_2z00_church_compiler_tmp;
var BgL_sc_const_3z00_church_compiler_tmp;
var BgL_sc_const_4z00_church_compiler_tmp;
var BgL_sc_const_5z00_church_compiler_tmp;
var BgL_sc_const_6z00_church_compiler_tmp;
var BgL_sc_const_7z00_church_compiler_tmp;
var BgL_sc_const_8z00_church_compiler_tmp;
var BgL_sc_const_9z00_church_compiler_tmp;
var BgL_sc_const_10z00_church_compiler_tmp;
var BgL_sc_const_11z00_church_compiler_tmp;
var BgL_sc_const_12z00_church_compiler_tmp;
var BgL_sc_const_13z00_church_compiler_tmp;
var BgL_sc_const_14z00_church_compiler_tmp;
var BgL_sc_const_15z00_church_compiler_tmp;
var BgL_sc_const_16z00_church_compiler_tmp;
var BgL_sc_const_17z00_church_compiler_tmp;
var BgL_sc_const_18z00_church_compiler_tmp;
var BgL_takezd2rightzd2;
var BgL_symbolzd2indexzd2;
var remove;
var BgL_seqzd2withzd2loadzf3zf3;
var BgL_addressingza2za2;
var BgL_dropzd2rightz12zc0;
var BgL_namedzd2letzd2ze3letrecze3;
var BgL_za2ADza2z00;
var BgL_removezd2deadzd2;
var BgL_truezf3zf3;
var BgL_namedzd2letzd2ze3lambdaze3;
var BgL_nextzd2addrzd2;
var drop;
var BgL_foldzd2rightzd2;
var BgL_desugarzd2definezd2fnz00;
var every;
var BgL_splitzd2atzd2;
var BgL_pairzd2forzd2eachz00;
var BgL_lsetzd2unionzd2;
var rest;
var BgL_namedzd2letzf3z21;
var BgL_desugarzd2fragmentzd2lambdaz00;
var BgL_notzd2pairzf3z21;
var fold;
var BgL_dezd2sugarzd2;
var BgL_reducezd2rightzd2;
var BgL_spanz12z12;
var BgL_desugarzd2letza2z70;
var BgL_addzd2forcingzd2;
var BgL_alistzd2copyzd2;
var BgL_lsetzd2intersectionz12zc0;
var any;
var BgL_dropzd2whilezd2;
var BgL_lengthzb2zb2;
var BgL_pairzd2foldzd2rightz00;
var BgL_sugarzd2patternzd2;
var BgL_annealedzd2gradientzd2ascentzf3zf3;
var BgL_beginzd2defineszf3z21;
var BgL_dezd2sugarzd2allz00;
var BgL_churchzd2renamezd2;
var eighth;
var seventh;
var count;
var BgL_taggedzd2listzf3z21;
var BgL_lambdazd2bodyzd2;
var BgL_sugarzd2registryzd2;
var BgL_freezd2variableszd2;
var BgL_mhzd2queryzf2annealedzd2initzf3z01;
var BgL_ifzf3zf3;
var reduce;
var BgL_truez00;
var BgL_openzd2includedzd2filez00;
var BgL_removez12z12;
var BgL_falsez00;
var BgL_condzf3zf3;
var BgL_desugarzd2psmczd2queryz00;
var BgL_laza7ifyzf3z54;
var fifth;
var BgL_primitivezd2defzd2;
var BgL_lambdazf3zf3;
var BgL_mapz12z12;
var BgL_lsetzd2xorz12zc0;
var BgL_applicationzf3zf3;
var BgL_filezd2ze3listz31;
var BgL_lambdazd2parameterszd2;
var BgL_reversez12z12;
var compile;
var unfold;
var BgL_beginzf3zf3;
var BgL_partitionz12z12;
var BgL_takezd2whilezd2;
var BgL_deletezd2duplicateszd2;
var infinity;
var iota;
var BgL_listzd2indexzd2;
var BgL_registerzd2sugarz12zc0;
var BgL_whenzf3zf3;
var BgL_fragmentzd2lambdazf3z21;
var BgL_findzd2tailzd2;
var BgL_desugarzd2temperedzd2queryz00;
var second;
var BgL_dottedzd2listzf3z21;
var BgL_takezd2whilez12zc0;
var BgL_z52lset2zc3zd3z42;
var BgL_lsetzd2differencezd2;
var BgL_desugarzd2beginzd2definesz00;
var unzip5;
var BgL_listzd2tabulatezd2;
var BgL_makezd2laza7yz75;
var BgL_delayzd2exprzd2;
var unzip4;
var BgL_memzf3zf3;
var unzip3;
var BgL_generatezd2specialzd2;
var unzip2;
var unzip1;
var BgL_z52cdrsz52;
var concatenate;
var BgL_appendz12z12;
var ninth;
var BgL_filterzd2mapzd2;
var BgL_sugarzd2translatorzd2;
var BgL_letzf3zf3;
var BgL_expandzd2loadszd2;
var BgL_temperedzd2queryzf3z21;
var BgL_deletezd2duplicatesz12zc0;
var BgL_takez12z12;
var BgL_timeszd2tozd2tryz00;
var BgL_consza2za2;
var BgL_reallyzd2appendzd2mapz00;
var sixth;
var BgL_definitionzf3zf3;
var BgL_mapzd2inzd2orderz00;
var BgL_carzb2cdrzb2;
var BgL_alistzd2deletez12zc0;
var repeat;
var BgL_generatezd2headerzd2;
var BgL_splitzd2atz12zc0;
var xcons;
var BgL_appendzd2mapzd2;
var filter;
var BgL_hmczd2queryzf2annealedzd2initzf3z01;
var BgL_appendzd2mapz12zc0;
var zip;
var BgL_nullzd2listzf3z21;
var BgL_churchzd2symbolzf3z21;
var BgL_concatenatez12z12;
var BgL_circularzd2listzd2;
var BgL_lsetzd2xorzd2;
var BgL_letreczf3zf3;
var BgL_desugarzd2whenzd2;
var BgL_appendzd2reversezd2;
var BgL_checkzd2argzd2;
var BgL_lsetzd3zd3;
var BgL_deletez12z12;
var BgL_makezd2listzd2;
var BgL_filterz12z12;
var BgL_casezf3zf3;
var BgL_pairzd2foldzd2;
var BgL_falsezf3zf3;
var BgL_lastzd2pairzd2;
var take;
var BgL_lsetzc3zd3z10;
var BgL_letzd2ze3lambdaz31;
var BgL_properzd2listzf3z21;
var BgL_listzd2copyzd2;
var member;
var pair;
var BgL_beginzd2wrapzd2;
var BgL_prefixzd2churchzd2;
var tenth;
var BgL_z52carszb2cdrszf2nozd2testzc0;
var partition;
var BgL_lsetzd2adjoinzd2;
var BgL_alistzd2deletezd2;
var BgL_desugarzd2casezd2;
var third;
var BgL_lsetzd2unionz12zc0;
var BgL_desugarzd2laza7ifyz75;
var BgL_churchzd2renamezd2parametersz00;
var BgL_breakz12z12;
var BgL_z52carszb2ze0;
var BgL_z52carszb2cdrsze0;
var assoc;
var find;
var BgL_dropzd2rightzd2;
var BgL_unfoldzd2rightzd2;
var BgL_circularzd2listzf3z21;
var BgL_lsetzd2diffzb2intersectionz12z72;
var first;
var BgL_desugarzd2mhzd2queryzf2annealedzd2initz20;
var BgL_unzd2prefixzd2churchz00;
var BgL_deletez00;
var BgL_minuszd2infinityzd2;
var BgL_appendzd2reversez12zc0;
var map;
var BgL_alistzd2conszd2;
var BgL_lsetzd2differencez12zc0;
var BgL_quotedzf3zf3;
var last;
var BgL_z52carszb2cdrszb2z52;
var BgL_letza2zf3z51;
var BgL_listzd3zd3;
var BgL_lsetzd2diffzb2intersectionz60;
var BgL_registerzd2queryzd2sugarz00;
var BgL_desugarzd2hmczd2queryzf2annealedzd2initz20;
var span;
var BgL_desugarzd2annealedzd2gradientzd2ascentzd2;
var BgL_za2nozd2forcingza2zd2;
var BgL_za2threadedzd2primitivesza2zd2;
var BgL_breakz00;
var BgL_includezd2pathszd2;
var BgL_psmczd2queryzf3z21;
var fourth;
var BgL_lsetzd2intersectionzd2;
var BgL_desugarzd2condzd2;
var BgL_definezd2fnzf3z21;
var BgL_loadzf3zf3;
const_church_compiler_tmp = sc_list(new sc_Pair("\uEBACxrp-name", new sc_Pair(new sc_Pair("\uEBACchurch-force", new sc_Pair("\uEBACaddress", new sc_Pair("\uEBACstore", new sc_Pair("\uEBACxrp-name", null)))), null)), new sc_Pair("\uEBACsample", new sc_Pair(new sc_Pair("\uEBACchurch-force", new sc_Pair("\uEBACaddress", new sc_Pair("\uEBACstore", new sc_Pair("\uEBACsample", null)))), null)), new sc_Pair("\uEBACincr-stats", new sc_Pair(new sc_Pair("\uEBACchurch-force", new sc_Pair("\uEBACaddress", new sc_Pair("\uEBACstore", new sc_Pair("\uEBACincr-stats", null)))), null)), new sc_Pair("\uEBACdecr-stats", new sc_Pair(new sc_Pair("\uEBACchurch-force", new sc_Pair("\uEBACaddress", new sc_Pair("\uEBACstore", new sc_Pair("\uEBACdecr-stats", null)))), null)), new sc_Pair("\uEBACscore", new sc_Pair(new sc_Pair("\uEBACchurch-force", new sc_Pair("\uEBACaddress", new sc_Pair("\uEBACstore", new sc_Pair("\uEBACscore", null)))), null)), new sc_Pair("\uEBACinit-stats", new sc_Pair(new sc_Pair("\uEBACchurch-force", new sc_Pair("\uEBACaddress", new sc_Pair("\uEBACstore", new sc_Pair("\uEBACinit-stats", null)))), null)), new sc_Pair("\uEBAChyperparams", new sc_Pair(new sc_Pair("\uEBACchurch-force", new sc_Pair("\uEBACaddress", new sc_Pair("\uEBACstore", new sc_Pair("\uEBAChyperparams", null)))), null)), new sc_Pair("\uEBACproposer", new sc_Pair(new sc_Pair("\uEBACchurch-force", new sc_Pair("\uEBACaddress", new sc_Pair("\uEBACstore", new sc_Pair("\uEBACproposer", null)))), null)), new sc_Pair("\uEBACsupport", new sc_Pair(new sc_Pair("\uEBACchurch-force", new sc_Pair("\uEBACaddress", new sc_Pair("\uEBACstore", new sc_Pair("\uEBACsupport", null)))), null)));
BgL_sc_const_1z00_church_compiler_tmp = "null-list?: argument out of domain";
BgL_sc_const_2z00_church_compiler_tmp = "  temps remaining: ";
BgL_sc_const_3z00_church_compiler_tmp = "open-included-file";
BgL_sc_const_4z00_church_compiler_tmp = "else clause in cond expression must be last.";
BgL_sc_const_5z00_church_compiler_tmp = "Invalid case expression.";
BgL_sc_const_6z00_church_compiler_tmp = "can't decr a value from CRP that doesn't label any table!";
BgL_sc_const_7z00_church_compiler_tmp = "annealing-initializer: failed, restarting at top ...\n";
BgL_sc_const_8z00_church_compiler_tmp = "annealing-initializer: succeeded!\n";
BgL_sc_const_9z00_church_compiler_tmp = "warning: no-proposals not implemented.\n";
BgL_sc_const_10z00_church_compiler_tmp = " not found on Church include paths.";
BgL_sc_const_11z00_church_compiler_tmp = "Negative step count";
BgL_sc_const_12z00_church_compiler_tmp = "ascent loop, temp=";
BgL_sc_const_13z00_church_compiler_tmp = sc_list("\uEBACapply", "\uEBACforce", "\uEBACreset-store-xrp-draws", "\uEBACmake-xrp", "\uEBACmake-initial-mcmc-state", "\uEBACmake-initial-enumeration-state");
BgL_sc_const_14z00_church_compiler_tmp = "This shouldn't happen";
BgL_sc_const_15z00_church_compiler_tmp = "Too many arguments to MAKE-LIST";
BgL_sc_const_16z00_church_compiler_tmp = "annealing-initializer:\n";
BgL_sc_const_17z00_church_compiler_tmp = "Too many arguments";
BgL_sc_const_18z00_church_compiler_tmp = "\n  current temp: ";
BgL_checkzd2argzd2 = function(pred, val, caller) {
    var val_1;
    val_1 = val;
    while (pred(val_1) === false) {
      val_1 = sc_error("Bad argument", val_1, pred, caller);
    }
    return val_1;
  };
xcons = function(d, a) {
    return new sc_Pair(a, d);
  };
BgL_makezd2listzd2 = function(len) {
    var maybe_elt = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      maybe_elt = sc_cons(arguments[sc_tmp], maybe_elt);
    }
    var i;
    var ans;
    var ans_2;
    var elt;
    BgL_checkzd2argzd2(function(n) {
        if (sc_isInteger(n)) {
          return n >= 0;
        } else {
          return false;
        }
      }, len, BgL_makezd2listzd2);
    if (maybe_elt === null) {
      elt = false;
    } else {
      if (maybe_elt.cdr === null) {
        elt = maybe_elt.car;
      } else {
        elt = sc_error(BgL_sc_const_15z00_church_compiler_tmp, new sc_Pair(len, maybe_elt));
      }
    }
    ans_2 = null;
    i = len;
    ans = ans_2;
    while (!(i <= 0)) {
      --i;
      ans = new sc_Pair(elt, ans);
    }
    return ans;
  };
BgL_listzd2tabulatezd2 = function(len, proc) {
    var i;
    var ans;
    var ans_3;
    var i_4;
    BgL_checkzd2argzd2(function(n) {
        if (sc_isInteger(n)) {
          return n >= 0;
        } else {
          return false;
        }
      }, len, BgL_listzd2tabulatezd2);
    BgL_checkzd2argzd2(sc_isProcedure, proc, BgL_listzd2tabulatezd2);
    i_4 = len - 1;
    ans_3 = null;
    i = i_4;
    ans = ans_3;
    while (!(i < 0)) {
      ans = new sc_Pair(proc(i), ans);
      --i;
    }
    return ans;
  };
BgL_consza2za2 = function(first) {
    var rest = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      rest = sc_cons(arguments[sc_tmp], rest);
    }
    var recur;
    recur = function(x, rest) {
        var stmp;
        var rest_5;
        var x_6;
        if (rest instanceof sc_Pair) {
          x_6 = rest.car;
          rest_5 = rest.cdr;
          if (rest_5 instanceof sc_Pair) {
            stmp = new sc_Pair(x_6, recur(rest_5.car, rest_5.cdr));
          } else {
            stmp = x_6;
          }
          return new sc_Pair(x, stmp);
        } else {
          return x;
        }
      };
    if (rest instanceof sc_Pair) {
      return new sc_Pair(first, recur(rest.car, rest.cdr));
    } else {
      return first;
    }
  };
BgL_listzd2copyzd2 = function(lis) {
    var recur;
    recur = function(lis) {
        var stmp;
        var lis_7;
        if (lis instanceof sc_Pair) {
          lis_7 = lis.cdr;
          if (lis_7 instanceof sc_Pair) {
            stmp = new sc_Pair(lis_7.car, recur(lis_7.cdr));
          } else {
            stmp = lis_7;
          }
          return new sc_Pair(lis.car, stmp);
        } else {
          return lis;
        }
      };
    if (lis instanceof sc_Pair) {
      return new sc_Pair(lis.car, recur(lis.cdr));
    } else {
      return lis;
    }
  };
iota = function(count) {
    var BgL_sc_maybezd2startzb2step_19z60 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      BgL_sc_maybezd2startzb2step_19z60 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2startzb2step_19z60);
    }
    var n;
    var r;
    var g1266;
    var step;
    var tmp1265;
    var start;
    BgL_checkzd2argzd2(sc_isInteger, count, iota);
    if (count < 0) {
      sc_error(BgL_sc_const_11z00_church_compiler_tmp, iota, count);
    }
    if (BgL_sc_maybezd2startzb2step_19z60 === null) {
      start = 0;
    } else {
      start = BgL_sc_maybezd2startzb2step_19z60.car;
    }
    tmp1265 = BgL_sc_maybezd2startzb2step_19z60 === null;
    if ((tmp1265 !== false? tmp1265: rest(BgL_sc_maybezd2startzb2step_19z60) === null) !== false) {
      step = 1;
    } else {
      step = BgL_sc_maybezd2startzb2step_19z60.cdr.car;
    }
    BgL_checkzd2argzd2(sc_isNumber, start, iota);
    BgL_checkzd2argzd2(sc_isNumber, step, iota);
    g1266 = null;
    n = 0;
    r = g1266;
    while (!(n === count)) {
      r = new sc_Pair(start + n * step, r);
      n = 1 + n;
    }
    return sc_reverse(r);
  };
BgL_circularzd2listzd2 = function(val1) {
    var vals = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      vals = sc_cons(arguments[sc_tmp], vals);
    }
    var ans;
    ans = new sc_Pair(val1, vals);
    BgL_lastzd2pairzd2(ans).cdr = ans;
    return ans;
  };
BgL_properzd2listzf3z21 = function(x) {
    var lag;
    var x_9;
    var x_10;
    var x_11;
    var lag_12;
    x_11 = x;
    lag_12 = x;
    while (x_11 instanceof sc_Pair) {
      x_10 = x_11.cdr;
      if (x_10 instanceof sc_Pair) {
        x_9 = x_10.cdr;
        lag = lag_12.cdr;
        if (!(x_9 === lag)) {
          x_11 = x_9;
          lag_12 = lag;
        } else {
          return false;
        }
      } else {
        return x_10 === null;
      }
    }
    return x_11 === null;
  };
BgL_dottedzd2listzf3z21 = function(x) {
    var lag;
    var x_13;
    var x_14;
    var x_15;
    var lag_16;
    x_15 = x;
    lag_16 = x;
    while (x_15 instanceof sc_Pair) {
      x_14 = x_15.cdr;
      if (x_14 instanceof sc_Pair) {
        x_13 = x_14.cdr;
        lag = lag_16.cdr;
        if (!(x_13 === lag)) {
          x_15 = x_13;
          lag_16 = lag;
        } else {
          return false;
        }
      } else {
        return !(x_14 === null);
      }
    }
    return !(x_15 === null);
  };
BgL_circularzd2listzf3z21 = function(x) {
    var tmp1267;
    var lag;
    var x_17;
    var x_18;
    var x_19;
    var lag_20;
    x_19 = x;
    lag_20 = x;
    while (x_19 instanceof sc_Pair) {
      x_18 = x_19.cdr;
      if (x_18 instanceof sc_Pair) {
        x_17 = x_18.cdr;
        lag = lag_20.cdr;
        tmp1267 = x_17 === lag;
        if (tmp1267 !== false) {
          return tmp1267;
        } else {
          x_19 = x_17;
          lag_20 = lag;
        }
      } else {
        return false;
      }
    }
    return false;
  };
BgL_notzd2pairzf3z21 = function(x) {
    return !(x instanceof sc_Pair);
  };
BgL_nullzd2listzf3z21 = function(l) {
    if (l instanceof sc_Pair) {
      return false;
    } else {
      if (l === null) {
        return true;
      } else {
        return sc_error(BgL_sc_const_1z00_church_compiler_tmp, l);
      }
    }
  };
BgL_listzd3zd3 = function(BgL_sc_zd3_20zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var list_a;
    var list_b;
    var others;
    var list_b_22;
    var tmp1271;
    var list_a_23;
    var others_24;
    var list_a_25;
    var others_26;
    var g1270;
    var g1269;
    var tmp1268;
    tmp1268 = lists === null;
    if (tmp1268 !== false) {
      return tmp1268;
    } else {
      g1269 = lists.car;
      g1270 = lists.cdr;
      list_a_25 = g1269;
      others_26 = g1270;
      continue1461:
        do {
          list_a_23 = list_a_25;
          others_24 = others_26;
          do {
            tmp1271 = others_24 === null;
            if (tmp1271 !== false) {
              return tmp1271;
            } else {
              list_b_22 = others_24.car;
              others = others_24.cdr;
              if (list_a_23 === list_b_22) {
                list_a_23 = list_b_22;
                others_24 = others;
              } else {
                list_a = list_a_23;
                list_b = list_b_22;
                while (BgL_nullzd2listzf3z21(list_a) === false) {
                  if (BgL_nullzd2listzf3z21(list_b) === false) {
                    if (BgL_sc_zd3_20zd3(list_a.car, list_b.car) !== false) {
                      list_a = list_a.cdr;
                      list_b = list_b.cdr;
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                }
                if (BgL_nullzd2listzf3z21(list_b) !== false) {
                  list_a_25 = list_b;
                  others_26 = others;
                  continue continue1461;
                } else {
                  return false;
                }
              }
            }
          } while (true);
        } while (true);
    }
  };
BgL_lengthzb2zb2 = function(x) {
    var len;
    var lag;
    var x_27;
    var len_28;
    var x_29;
    var x_30;
    var lag_31;
    var len_32;
    x_30 = x;
    lag_31 = x;
    len_32 = 0;
    while (x_30 instanceof sc_Pair) {
      x_29 = x_30.cdr;
      len_28 = len_32 + 1;
      if (x_29 instanceof sc_Pair) {
        x_27 = x_29.cdr;
        lag = lag_31.cdr;
        len = len_28 + 1;
        if (!(x_27 === lag)) {
          x_30 = x_27;
          lag_31 = lag;
          len_32 = len;
        } else {
          return false;
        }
      } else {
        return len_28;
      }
    }
    return len_32;
  };
zip = function(list1) {
    var more_lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      more_lists = sc_cons(arguments[sc_tmp], more_lists);
    }
    return sc_apply(map, sc_list, list1, more_lists);
  };
first = sc_car;
second = sc_cadr;
third = sc_caddr;
fourth = sc_cadddr;
fifth = function(x) {
    return x.cdr.cdr.cdr.cdr.car;
  };
sixth = function(x) {
    return x.cdr.cdr.cdr.cdr.cdr.car;
  };
seventh = function(x) {
    return x.cdr.cdr.cdr.cdr.cdr.cdr.car;
  };
eighth = function(x) {
    return x.cdr.cdr.cdr.cdr.cdr.cdr.cdr.car;
  };
ninth = function(x) {
    return x.cdr.cdr.cdr.cdr.cdr.cdr.cdr.cdr.car;
  };
tenth = function(x) {
    return x.cdr.cdr.cdr.cdr.cdr.cdr.cdr.cdr.cdr.car;
  };
BgL_carzb2cdrzb2 = function(pair) {
    return new sc_Values([pair.car, pair.cdr]);
  };
take = function(lis, k) {
    var recur;
    BgL_checkzd2argzd2(sc_isInteger, k, take);
    recur = function(lis, k) {
        var stmp;
        var k_33;
        var lis_34;
        if (k === 0) {
          return null;
        } else {
          lis_34 = lis.cdr;
          k_33 = k - 1;
          if (k_33 === 0) {
            stmp = null;
          } else {
            stmp = new sc_Pair(lis_34.car, recur(lis_34.cdr, k_33 - 1));
          }
          return new sc_Pair(lis.car, stmp);
        }
      };
    if (k === 0) {
      return null;
    } else {
      return new sc_Pair(lis.car, recur(lis.cdr, k - 1));
    }
  };
drop = function(lis, k) {
    var lis_35;
    var k_36;
    BgL_checkzd2argzd2(sc_isInteger, k, drop);
    lis_35 = lis;
    k_36 = k;
    while (!(k_36 === 0)) {
      lis_35 = lis_35.cdr;
      --k_36;
    }
    return lis_35;
  };
BgL_takez12z12 = function(lis, k) {
    BgL_checkzd2argzd2(sc_isInteger, k, BgL_takez12z12);
    if (k === 0) {
      return null;
    } else {
      drop(lis, k - 1).cdr = null;
      return lis;
    }
  };
BgL_takezd2rightzd2 = function(lis, k) {
    var lag;
    var lead;
    var g1272;
    BgL_checkzd2argzd2(sc_isInteger, k, BgL_takezd2rightzd2);
    g1272 = drop(lis, k);
    lag = lis;
    lead = g1272;
    while (lead instanceof sc_Pair) {
      lag = lag.cdr;
      lead = lead.cdr;
    }
    return lag;
  };
BgL_dropzd2rightzd2 = function(lis, k) {
    var recur;
    var g1273;
    BgL_checkzd2argzd2(sc_isInteger, k, BgL_dropzd2rightzd2);
    g1273 = drop(lis, k);
    recur = function(lag, lead) {
        var stmp;
        var lead_37;
        var lag_38;
        if (lead instanceof sc_Pair) {
          lag_38 = lag.cdr;
          lead_37 = lead.cdr;
          if (lead_37 instanceof sc_Pair) {
            stmp = new sc_Pair(lag_38.car, recur(lag_38.cdr, lead_37.cdr));
          } else {
            stmp = null;
          }
          return new sc_Pair(lag.car, stmp);
        } else {
          return null;
        }
      };
    if (g1273 instanceof sc_Pair) {
      return new sc_Pair(lis.car, recur(lis.cdr, g1273.cdr));
    } else {
      return null;
    }
  };
BgL_dropzd2rightz12zc0 = function(lis, k) {
    var lag;
    var lead;
    var g1274;
    var lead_39;
    BgL_checkzd2argzd2(sc_isInteger, k, BgL_dropzd2rightz12zc0);
    lead_39 = drop(lis, k);
    if (lead_39 instanceof sc_Pair) {
      g1274 = lead_39.cdr;
      lag = lis;
      lead = g1274;
      while (lead instanceof sc_Pair) {
        lag = lag.cdr;
        lead = lead.cdr;
      }
      lag.cdr = null;
      return lis;
    } else {
      return null;
    }
  };
BgL_splitzd2atzd2 = function(x, k) {
    var recur;
    BgL_checkzd2argzd2(sc_isInteger, k, BgL_splitzd2atzd2);
    recur = function(lis, k) {
        if (k === 0) {
          return new sc_Values([null, lis]);
        } else {
          return sc_callWithValues(function() {
                    return recur(lis.cdr, k - 1);
                  }, function(prefix, suffix) {
                    return new sc_Values([new sc_Pair(lis.car, prefix), suffix]);
                  });
        }
      };
    return recur(x, k);
  };
BgL_splitzd2atz12zc0 = function(x, k) {
    var suffix;
    var prev;
    BgL_checkzd2argzd2(sc_isInteger, k, BgL_splitzd2atz12zc0);
    if (k === 0) {
      return new sc_Values([null, x]);
    } else {
      prev = drop(x, k - 1);
      suffix = prev.cdr;
      prev.cdr = null;
      return new sc_Values([x, suffix]);
    }
  };
last = function(lis) {
    return BgL_lastzd2pairzd2(lis).car;
  };
BgL_lastzd2pairzd2 = function(lis) {
    var tail;
    var lis_40;
    BgL_checkzd2argzd2(sc_isPair, lis, BgL_lastzd2pairzd2);
    lis_40 = lis;
    do {
      tail = lis_40.cdr;
      if (tail instanceof sc_Pair) {
        lis_40 = tail;
      } else {
        return lis_40;
      }
    } while (true);
  };
unzip1 = function(lis) {
    return map(sc_car, lis);
  };
unzip2 = function(lis) {
    var recur;
    recur = function(lis) {
        var elt;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return new sc_Values([lis, lis]);
        } else {
          elt = lis.car;
          return sc_callWithValues(function() {
                    return recur(lis.cdr);
                  }, function(a, b) {
                    return new sc_Values([new sc_Pair(elt.car, a), new sc_Pair(elt.cdr.car, b)]);
                  });
        }
      };
    return recur(lis);
  };
unzip3 = function(lis) {
    var recur;
    recur = function(lis) {
        var elt;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return new sc_Values([lis, lis, lis]);
        } else {
          elt = lis.car;
          return sc_callWithValues(function() {
                    return recur(lis.cdr);
                  }, function(a, b, c) {
                    return new sc_Values([new sc_Pair(elt.car, a), new sc_Pair(elt.cdr.car, b), new sc_Pair(elt.cdr.cdr.car, c)]);
                  });
        }
      };
    return recur(lis);
  };
unzip4 = function(lis) {
    var recur;
    recur = function(lis) {
        var elt;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return new sc_Values([lis, lis, lis, lis]);
        } else {
          elt = lis.car;
          return sc_callWithValues(function() {
                    return recur(lis.cdr);
                  }, function(a, b, c, d) {
                    return new sc_Values([new sc_Pair(elt.car, a), new sc_Pair(elt.cdr.car, b), new sc_Pair(elt.cdr.cdr.car, c), new sc_Pair(elt.cdr.cdr.cdr.car, d)]);
                  });
        }
      };
    return recur(lis);
  };
unzip5 = function(lis) {
    var recur;
    recur = function(lis) {
        var elt;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return new sc_Values([lis, lis, lis, lis, lis]);
        } else {
          elt = lis.car;
          return sc_callWithValues(function() {
                    return recur(lis.cdr);
                  }, function(a, b, c, d, e) {
                    return new sc_Values([new sc_Pair(elt.car, a), new sc_Pair(elt.cdr.car, b), new sc_Pair(elt.cdr.cdr.car, c), new sc_Pair(elt.cdr.cdr.cdr.car, d), new sc_Pair(elt.cdr.cdr.cdr.cdr.car, e)]);
                  });
        }
      };
    return recur(lis);
  };
BgL_appendz12z12 = function() {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 0; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var rest;
    var next;
    var tail_cons;
    var rest_41;
    var g1276;
    var rest_42;
    var first;
    var lists_43;
    var prev;
    var g1275;
    g1275 = null;
    lists_43 = lists;
    prev = g1275;
    while (!!(lists_43 instanceof sc_Pair)) {
      first = lists_43.car;
      rest_42 = lists_43.cdr;
      if (!(first instanceof sc_Pair)) {
        lists_43 = rest_42;
        prev = first;
      } else {
        g1276 = BgL_lastzd2pairzd2(first);
        tail_cons = g1276;
        rest_41 = rest_42;
        while (rest_41 instanceof sc_Pair) {
          next = rest_41.car;
          rest = rest_41.cdr;
          tail_cons.cdr = next;
          if (next instanceof sc_Pair) {
            tail_cons = BgL_lastzd2pairzd2(next);
          }
          rest_41 = rest;
        }
        return first;
      }
    }
    return prev;
  };
BgL_appendzd2reversezd2 = function(rev_head, tail) {
    var rev_head_44;
    var tail_45;
    rev_head_44 = rev_head;
    tail_45 = tail;
    while (BgL_nullzd2listzf3z21(rev_head_44) === false) {
      tail_45 = new sc_Pair(rev_head_44.car, tail_45);
      rev_head_44 = rev_head_44.cdr;
    }
    return tail_45;
  };
BgL_appendzd2reversez12zc0 = function(rev_head, tail) {
    var next_rev;
    var rev_head_46;
    var tail_47;
    rev_head_46 = rev_head;
    tail_47 = tail;
    while (BgL_nullzd2listzf3z21(rev_head_46) === false) {
      next_rev = rev_head_46.cdr;
      rev_head_46.cdr = tail_47;
      tail_47 = rev_head_46;
      rev_head_46 = next_rev;
    }
    return tail_47;
  };
concatenate = function(lists) {
    return BgL_reducezd2rightzd2(sc_append, null, lists);
  };
BgL_concatenatez12z12 = function(lists) {
    return BgL_reducezd2rightzd2(BgL_appendz12z12, null, lists);
  };
BgL_z52cdrsz52 = function(lists) {
    return BgL_callzd2withzd2currentzd2continuationzd2(function(abort) {
              var lis;
              var recur;
              recur = function(lists) {
                  var stmp;
                  var lis;
                  var lists_48;
                  var lis_49;
                  if (lists instanceof sc_Pair) {
                    lis_49 = lists.car;
                    if (BgL_nullzd2listzf3z21(lis_49) !== false) {
                      return abort(null);
                    } else {
                      lists_48 = lists.cdr;
                      if (lists_48 instanceof sc_Pair) {
                        lis = lists_48.car;
                        if (BgL_nullzd2listzf3z21(lis) !== false) {
                          stmp = abort(null);
                        } else {
                          stmp = new sc_Pair(lis.cdr, recur(lists_48.cdr));
                        }
                      } else {
                        stmp = null;
                      }
                      return new sc_Pair(lis_49.cdr, stmp);
                    }
                  } else {
                    return null;
                  }
                };
              if (lists instanceof sc_Pair) {
                lis = lists.car;
                if (BgL_nullzd2listzf3z21(lis) !== false) {
                  return abort(null);
                } else {
                  return new sc_Pair(lis.cdr, recur(lists.cdr));
                }
              } else {
                return null;
              }
            });
  };
BgL_z52carszb2ze0 = function(lists, last_elt) {
    var recur;
    recur = function(lists) {
        var stmp;
        var lists_50;
        if (lists instanceof sc_Pair) {
          lists_50 = lists.cdr;
          if (lists_50 instanceof sc_Pair) {
            stmp = new sc_Pair(lists_50.car.car, recur(lists_50.cdr));
          } else {
            stmp = sc_list(last_elt);
          }
          return new sc_Pair(lists.car.car, stmp);
        } else {
          return sc_list(last_elt);
        }
      };
    if (lists instanceof sc_Pair) {
      return new sc_Pair(lists.car.car, recur(lists.cdr));
    } else {
      return sc_list(last_elt);
    }
  };
BgL_z52carszb2cdrsze0 = function(lists) {
    return BgL_callzd2withzd2currentzd2continuationzd2(function(abort) {
              var recur;
              recur = function(lists) {
                  if (lists instanceof sc_Pair) {
                    return sc_callWithValues(function() {
                              return BgL_carzb2cdrzb2(lists);
                            }, function(list, other_lists) {
                              if (BgL_nullzd2listzf3z21(list) !== false) {
                                return abort(null, null);
                              } else {
                                return sc_callWithValues(function() {
                                          return BgL_carzb2cdrzb2(list);
                                        }, function(a, d) {
                                          return sc_callWithValues(function() {
                                                    return recur(other_lists);
                                                  }, function(cars, cdrs) {
                                                    return new sc_Values([new sc_Pair(a, cars), new sc_Pair(d, cdrs)]);
                                                  });
                                        });
                              }
                            });
                  } else {
                    return new sc_Values([null, null]);
                  }
                };
              return recur(lists);
            });
  };
BgL_z52carszb2cdrszb2z52 = function(lists, cars_final) {
    return BgL_callzd2withzd2currentzd2continuationzd2(function(abort) {
              var recur;
              recur = function(lists) {
                  if (lists instanceof sc_Pair) {
                    return sc_callWithValues(function() {
                              return BgL_carzb2cdrzb2(lists);
                            }, function(list, other_lists) {
                              if (BgL_nullzd2listzf3z21(list) !== false) {
                                return abort(null, null);
                              } else {
                                return sc_callWithValues(function() {
                                          return BgL_carzb2cdrzb2(list);
                                        }, function(a, d) {
                                          return sc_callWithValues(function() {
                                                    return recur(other_lists);
                                                  }, function(cars, cdrs) {
                                                    return new sc_Values([new sc_Pair(a, cars), new sc_Pair(d, cdrs)]);
                                                  });
                                        });
                              }
                            });
                  } else {
                    return new sc_Values([sc_list(cars_final), null]);
                  }
                };
              return recur(lists);
            });
  };
BgL_z52carszb2cdrszf2nozd2testzc0 = function(lists) {
    var recur;
    recur = function(lists) {
        if (lists instanceof sc_Pair) {
          return sc_callWithValues(function() {
                    return BgL_carzb2cdrzb2(lists);
                  }, function(list, other_lists) {
                    return sc_callWithValues(function() {
                              return BgL_carzb2cdrzb2(list);
                            }, function(a, d) {
                              return sc_callWithValues(function() {
                                        return recur(other_lists);
                                      }, function(cars, cdrs) {
                                        return new sc_Values([new sc_Pair(a, cars), new sc_Pair(d, cdrs)]);
                                      });
                            });
                  });
        } else {
          return new sc_Values([null, null]);
        }
      };
    return recur(lists);
  };
count = function(pred, list1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lis;
    var i;
    var lp;
    BgL_checkzd2argzd2(sc_isProcedure, pred, count);
    if (lists instanceof sc_Pair) {
      lp = function(list1, lists, i) {
          if (BgL_nullzd2listzf3z21(list1) !== false) {
            return i;
          } else {
            return sc_callWithValues(function() {
                      return BgL_z52carszb2cdrsze0(lists);
                    }, function(as_51, ds) {
                      if (as_51 === null) {
                        return i;
                      } else {
                        return lp(list1.cdr, ds, sc_apply(pred, list1.car, as_51) !== false? i + 1: i);
                      }
                    });
          }
        };
      return lp(list1, lists, 0);
    } else {
      lis = list1;
      i = 0;
      while (BgL_nullzd2listzf3z21(lis) === false) {
        if (pred(lis.car) !== false) {
          ++i;
        }
        lis = lis.cdr;
      }
      return i;
    }
  };
BgL_unfoldzd2rightzd2 = function(p, f, g, seed) {
    var maybe_tail = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 4; --sc_tmp) {
      maybe_tail = sc_cons(arguments[sc_tmp], maybe_tail);
    }
    var seed_52;
    var ans;
    var g1277;
    BgL_checkzd2argzd2(sc_isProcedure, p, BgL_unfoldzd2rightzd2);
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_unfoldzd2rightzd2);
    BgL_checkzd2argzd2(sc_isProcedure, g, BgL_unfoldzd2rightzd2);
    if (maybe_tail === null) {
      g1277 = null;
    } else {
      g1277 = maybe_tail.car;
    }
    seed_52 = seed;
    ans = g1277;
    while (p(seed_52) === false) {
      ans = new sc_Pair(f(seed_52), ans);
      seed_52 = g(seed_52);
    }
    return ans;
  };
unfold = function(p, f, g, seed) {
    var maybe_tail_gen = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 4; --sc_tmp) {
      maybe_tail_gen = sc_cons(arguments[sc_tmp], maybe_tail_gen);
    }
    var recur;
    var recur_53;
    var tail_gen;
    BgL_checkzd2argzd2(sc_isProcedure, p, unfold);
    BgL_checkzd2argzd2(sc_isProcedure, f, unfold);
    BgL_checkzd2argzd2(sc_isProcedure, g, unfold);
    if (maybe_tail_gen instanceof sc_Pair) {
      tail_gen = maybe_tail_gen.car;
      if (maybe_tail_gen.cdr instanceof sc_Pair) {
        return sc_apply(sc_error, BgL_sc_const_17z00_church_compiler_tmp, unfold, p, f, g, seed, maybe_tail_gen);
      } else {
        recur_53 = function(seed) {
            var stmp;
            var seed_54;
            if (p(seed) !== false) {
              return tail_gen(seed);
            } else {
              seed_54 = g(seed);
              if (p(seed_54) !== false) {
                stmp = tail_gen(seed_54);
              } else {
                stmp = new sc_Pair(f(seed_54), recur_53(g(seed_54)));
              }
              return new sc_Pair(f(seed), stmp);
            }
          };
        if (p(seed) !== false) {
          return tail_gen(seed);
        } else {
          return new sc_Pair(f(seed), recur_53(g(seed)));
        }
      }
    } else {
      recur = function(seed) {
          var stmp;
          var seed_55;
          if (p(seed) !== false) {
            return null;
          } else {
            seed_55 = g(seed);
            if (p(seed_55) !== false) {
              stmp = null;
            } else {
              stmp = new sc_Pair(f(seed_55), recur(g(seed_55)));
            }
            return new sc_Pair(f(seed), stmp);
          }
        };
      if (p(seed) !== false) {
        return null;
      } else {
        return new sc_Pair(f(seed), recur(g(seed)));
      }
    }
  };
fold = function(kons, knil, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lis;
    var ans;
    var lp;
    var g1278;
    BgL_checkzd2argzd2(sc_isProcedure, kons, fold);
    if (lists instanceof sc_Pair) {
      g1278 = new sc_Pair(lis1, lists);
      lp = function(lists, ans) {
          return sc_callWithValues(function() {
                    return BgL_z52carszb2cdrszb2z52(lists, ans);
                  }, function(BgL_sc_carszb2ans_21zb2, cdrs) {
                    if (BgL_sc_carszb2ans_21zb2 === null) {
                      return ans;
                    } else {
                      return lp(cdrs, sc_apply(kons, BgL_sc_carszb2ans_21zb2));
                    }
                  });
        };
      return lp(g1278, knil);
    } else {
      lis = lis1;
      ans = knil;
      while (BgL_nullzd2listzf3z21(lis) === false) {
        ans = kons(lis.car, ans);
        lis = lis.cdr;
      }
      return ans;
    }
  };
BgL_foldzd2rightzd2 = function(kons, knil, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var head;
    var recur;
    var cdrs;
    var recur_57;
    var g1279;
    BgL_checkzd2argzd2(sc_isProcedure, kons, BgL_foldzd2rightzd2);
    if (lists instanceof sc_Pair) {
      g1279 = new sc_Pair(lis1, lists);
      recur_57 = function(lists) {
          var stmp;
          var cdrs;
          var cdrs_58;
          cdrs_58 = BgL_z52cdrsz52(lists);
          if (cdrs_58 === null) {
            return knil;
          } else {
            cdrs = BgL_z52cdrsz52(cdrs_58);
            if (cdrs === null) {
              stmp = knil;
            } else {
              stmp = sc_apply(kons, BgL_z52carszb2ze0(cdrs_58, recur_57(cdrs)));
            }
            return sc_apply(kons, BgL_z52carszb2ze0(lists, stmp));
          }
        };
      cdrs = BgL_z52cdrsz52(g1279);
      if (cdrs === null) {
        return knil;
      } else {
        return sc_apply(kons, BgL_z52carszb2ze0(g1279, recur_57(cdrs)));
      }
    } else {
      recur = function(lis) {
          var stmp;
          var head;
          var lis_59;
          var head_60;
          if (BgL_nullzd2listzf3z21(lis) !== false) {
            return knil;
          } else {
            head_60 = lis.car;
            lis_59 = lis.cdr;
            if (BgL_nullzd2listzf3z21(lis_59) !== false) {
              stmp = knil;
            } else {
              head = lis_59.car;
              stmp = kons(head, recur(lis_59.cdr));
            }
            return kons(head_60, stmp);
          }
        };
      if (BgL_nullzd2listzf3z21(lis1) !== false) {
        return knil;
      } else {
        head = lis1.car;
        return kons(head, recur(lis1.cdr));
      }
    }
  };
BgL_pairzd2foldzd2rightz00 = function(f, zero, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lis;
    var recur;
    var cdrs;
    var recur_61;
    var g1280;
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_pairzd2foldzd2rightz00);
    if (lists instanceof sc_Pair) {
      g1280 = new sc_Pair(lis1, lists);
      recur_61 = function(lists) {
          var stmp;
          var cdrs;
          var cdrs_62;
          cdrs_62 = BgL_z52cdrsz52(lists);
          if (cdrs_62 === null) {
            return zero;
          } else {
            cdrs = BgL_z52cdrsz52(cdrs_62);
            stmp = sc_list(cdrs === null? zero: sc_apply(f, BgL_appendz12z12(cdrs_62, sc_list(recur_61(cdrs)))));
            return sc_apply(f, BgL_appendz12z12(lists, stmp));
          }
        };
      cdrs = BgL_z52cdrsz52(g1280);
      if (cdrs === null) {
        return zero;
      } else {
        return sc_apply(f, BgL_appendz12z12(g1280, sc_list(recur_61(cdrs))));
      }
    } else {
      recur = function(lis) {
          var stmp;
          var stmp_63;
          var lis_64;
          var lis_65;
          if (BgL_nullzd2listzf3z21(lis) !== false) {
            return zero;
          } else {
            lis_65 = lis.cdr;
            if (BgL_nullzd2listzf3z21(lis_65) !== false) {
              stmp = zero;
            } else {
              lis_64 = lis_65.cdr;
              if (BgL_nullzd2listzf3z21(lis_64) !== false) {
                stmp_63 = zero;
              } else {
                stmp_63 = f(lis_64, recur(lis_64.cdr));
              }
              stmp = f(lis_65, stmp_63);
            }
            return f(lis, stmp);
          }
        };
      if (BgL_nullzd2listzf3z21(lis1) !== false) {
        return zero;
      } else {
        lis = lis1.cdr;
        return f(lis1, BgL_nullzd2listzf3z21(lis) !== false? zero: f(lis, recur(lis.cdr)));
      }
    }
  };
BgL_pairzd2foldzd2 = function(f, zero, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 3; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var tail;
    var lis;
    var ans;
    var tails;
    var lists_66;
    var ans_67;
    var g1281;
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_pairzd2foldzd2);
    if (lists instanceof sc_Pair) {
      g1281 = new sc_Pair(lis1, lists);
      lists_66 = g1281;
      ans_67 = zero;
      do {
        tails = BgL_z52cdrsz52(lists_66);
        if (tails === null) {
          return ans_67;
        } else {
          ans_67 = sc_apply(f, BgL_appendz12z12(lists_66, sc_list(ans_67)));
          lists_66 = tails;
        }
      } while (true);
    } else {
      lis = lis1;
      ans = zero;
      while (BgL_nullzd2listzf3z21(lis) === false) {
        tail = lis.cdr;
        ans = f(lis, ans);
        lis = tail;
      }
      return ans;
    }
  };
reduce = function(f, ridentity, lis) {
    BgL_checkzd2argzd2(sc_isProcedure, f, reduce);
    if (BgL_nullzd2listzf3z21(lis) !== false) {
      return ridentity;
    } else {
      return fold(f, lis.car, lis.cdr);
    }
  };
BgL_reducezd2rightzd2 = function(f, ridentity, lis) {
    var recur;
    var g1283;
    var g1282;
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_reducezd2rightzd2);
    if (BgL_nullzd2listzf3z21(lis) !== false) {
      return ridentity;
    } else {
      g1282 = lis.car;
      g1283 = lis.cdr;
      recur = function(head, lis) {
          var stmp;
          var lis_68;
          var head_69;
          if (lis instanceof sc_Pair) {
            head_69 = lis.car;
            lis_68 = lis.cdr;
            if (lis_68 instanceof sc_Pair) {
              stmp = f(head_69, recur(lis_68.car, lis_68.cdr));
            } else {
              stmp = head_69;
            }
            return f(head, stmp);
          } else {
            return head;
          }
        };
      if (g1283 instanceof sc_Pair) {
        return f(g1282, recur(g1283.car, g1283.cdr));
      } else {
        return g1282;
      }
    }
  };
BgL_appendzd2mapzd2 = function(f, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    return BgL_reallyzd2appendzd2mapz00(BgL_appendzd2mapzd2, sc_append, f, lis1, lists);
  };
BgL_appendzd2mapz12zc0 = function(f, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    return BgL_reallyzd2appendzd2mapz00(BgL_appendzd2mapz12zc0, BgL_appendz12z12, f, lis1, lists);
  };
BgL_reallyzd2appendzd2mapz00 = function(who, appender, f, lis1, lists) {
    var vals;
    var recur;
    var g1285;
    var g1284;
    BgL_checkzd2argzd2(sc_isProcedure, f, who);
    if (lists instanceof sc_Pair) {
      return sc_callWithValues(function() {
                return BgL_z52carszb2cdrsze0(new sc_Pair(lis1, lists));
              }, function(cars, cdrs) {
                var recur;
                if (cars === null) {
                  return null;
                } else {
                  recur = function(cars, cdrs) {
                      var vals;
                      vals = sc_apply(f, cars);
                      return sc_callWithValues(function() {
                                return BgL_z52carszb2cdrsze0(cdrs);
                              }, function(cars2, cdrs2) {
                                if (cars2 === null) {
                                  return vals;
                                } else {
                                  return appender(vals, recur(cars2, cdrs2));
                                }
                              });
                    };
                  return recur(cars, cdrs);
                }
              });
    } else {
      if (BgL_nullzd2listzf3z21(lis1) !== false) {
        return null;
      } else {
        g1284 = lis1.car;
        g1285 = lis1.cdr;
        recur = function(elt, rest) {
            var stmp;
            var vals;
            var rest_70;
            var elt_71;
            var vals_72;
            vals_72 = f(elt);
            if (BgL_nullzd2listzf3z21(rest) !== false) {
              return vals_72;
            } else {
              elt_71 = rest.car;
              rest_70 = rest.cdr;
              vals = f(elt_71);
              if (BgL_nullzd2listzf3z21(rest_70) !== false) {
                stmp = vals;
              } else {
                stmp = appender(vals, recur(rest_70.car, rest_70.cdr));
              }
              return appender(vals_72, stmp);
            }
          };
        vals = f(g1284);
        if (BgL_nullzd2listzf3z21(g1285) !== false) {
          return vals;
        } else {
          return appender(vals, recur(g1285.car, g1285.cdr));
        }
      }
    }
  };
BgL_pairzd2forzd2eachz00 = function(proc, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var tail;
    var lis;
    var tails;
    var lists_73;
    var g1286;
    BgL_checkzd2argzd2(sc_isProcedure, proc, BgL_pairzd2forzd2eachz00);
    if (lists instanceof sc_Pair) {
      g1286 = new sc_Pair(lis1, lists);
      lists_73 = g1286;
      do {
        tails = BgL_z52cdrsz52(lists_73);
        if (tails instanceof sc_Pair) {
          sc_apply(proc, lists_73);
          lists_73 = tails;
        } else {
          return false;
        }
      } while (true);
    } else {
      lis = lis1;
      while (BgL_nullzd2listzf3z21(lis) === false) {
        tail = lis.cdr;
        proc(lis);
        lis = tail;
      }
      return false;
    }
  };
BgL_mapz12z12 = function(f, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lp;
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_mapz12z12);
    if (lists instanceof sc_Pair) {
      lp = function(lis1, lists) {
          if (BgL_nullzd2listzf3z21(lis1) === false) {
            return sc_callWithValues(function() {
                      return BgL_z52carszb2cdrszf2nozd2testzc0(lists);
                    }, function(heads, tails) {
                      lis1.car = sc_apply(f, lis1.car, heads);
                      return lp(lis1.cdr, tails);
                    });
          } else {
            return false;
          }
        };
      lp(lis1, lists);
    } else {
      BgL_pairzd2forzd2eachz00(function(pair) {
          return pair.car = f(pair.car);
        }, lis1);
    }
    return lis1;
  };
BgL_filterzd2mapzd2 = function(f, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var recur;
    var recur_74;
    var g1287;
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_filterzd2mapzd2);
    if (lists instanceof sc_Pair) {
      g1287 = new sc_Pair(lis1, lists);
      recur_74 = function(lists) {
          return sc_callWithValues(function() {
                    return BgL_z52carszb2cdrsze0(lists);
                  }, function(cars, cdrs) {
                    var g1289;
                    if (cars instanceof sc_Pair) {
                      g1289 = sc_apply(f, cars);
                      if (g1289 !== false) {
                        return new sc_Pair(g1289, recur_74(cdrs));
                      } else {
                        return recur_74(cdrs);
                      }
                    } else {
                      return null;
                    }
                  });
        };
      return recur_74(g1287);
    } else {
      recur = function(lis) {
          var g1291;
          var tail;
          if (BgL_nullzd2listzf3z21(lis) !== false) {
            return lis;
          } else {
            tail = recur(lis.cdr);
            g1291 = f(lis.car);
            if (g1291 !== false) {
              return new sc_Pair(g1291, tail);
            } else {
              return tail;
            }
          }
        };
      return recur(lis1);
    }
  };
BgL_mapzd2inzd2orderz00 = function(f, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var x;
    var tail;
    var recur;
    var recur_75;
    var g1292;
    BgL_checkzd2argzd2(sc_isProcedure, f, BgL_mapzd2inzd2orderz00);
    if (lists instanceof sc_Pair) {
      g1292 = new sc_Pair(lis1, lists);
      recur_75 = function(lists) {
          return sc_callWithValues(function() {
                    return BgL_z52carszb2cdrsze0(lists);
                  }, function(cars, cdrs) {
                    var x;
                    if (cars instanceof sc_Pair) {
                      x = sc_apply(f, cars);
                      return new sc_Pair(x, recur_75(cdrs));
                    } else {
                      return null;
                    }
                  });
        };
      return recur_75(g1292);
    } else {
      recur = function(lis) {
          var stmp;
          var x;
          var tail;
          var x_76;
          var tail_77;
          if (BgL_nullzd2listzf3z21(lis) !== false) {
            return lis;
          } else {
            tail_77 = lis.cdr;
            x_76 = f(lis.car);
            if (BgL_nullzd2listzf3z21(tail_77) !== false) {
              stmp = tail_77;
            } else {
              tail = tail_77.cdr;
              x = f(tail_77.car);
              stmp = new sc_Pair(x, recur(tail));
            }
            return new sc_Pair(x_76, stmp);
          }
        };
      if (BgL_nullzd2listzf3z21(lis1) !== false) {
        return lis1;
      } else {
        tail = lis1.cdr;
        x = f(lis1.car);
        return new sc_Pair(x, recur(tail));
      }
    }
  };
map = BgL_mapzd2inzd2orderz00;
filter = function(pred, lis) {
    var recur;
    BgL_checkzd2argzd2(sc_isProcedure, pred, filter);
    recur = function(lis) {
        var new_tail;
        var tail;
        var head;
        var lis_78;
        lis_78 = lis;
        while (BgL_nullzd2listzf3z21(lis_78) === false) {
          head = lis_78.car;
          tail = lis_78.cdr;
          if (pred(head) !== false) {
            new_tail = recur(tail);
            if (tail === new_tail) {
              return lis_78;
            } else {
              return new sc_Pair(head, new_tail);
            }
          } else {
            lis_78 = tail;
          }
        }
        return lis_78;
      };
    return recur(lis);
  };
BgL_filterz12z12 = function(pred, lis) {
    var lis_79;
    var lis_80;
    var prev;
    var lis_81;
    var prev_82;
    var lis_83;
    var lis_84;
    var ans;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_filterz12z12);
    ans = lis;
    while (BgL_nullzd2listzf3z21(ans) === false) {
      if (pred(ans.car) === false) {
        ans = ans.cdr;
      } else {
        lis_84 = ans.cdr;
        BgL_whilezd2break1495zd2: {
          prev_82 = ans;
          lis_83 = lis_84;
          continue1462:
            do {
              prev = prev_82;
              lis_81 = lis_83;
              while (lis_81 instanceof sc_Pair) {
                if (pred(lis_81.car) !== false) {
                  prev = lis_81;
                  lis_81 = lis_81.cdr;
                } else {
                  lis_80 = lis_81.cdr;
                  lis_79 = lis_80;
                  while (lis_79 instanceof sc_Pair) {
                    if (pred(lis_79.car) !== false) {
                      prev.cdr = lis_79;
                      prev_82 = lis_79;
                      lis_83 = lis_79.cdr;
                      continue continue1462;
                    } else {
                      lis_79 = lis_79.cdr;
                    }
                  }
                  {
                    prev.cdr = lis_79;
                    break BgL_whilezd2break1495zd2;
                  }
                }
              }
              {
                false;
                break BgL_whilezd2break1495zd2;
              }
            } while (true);
        }
        return ans;
      }
    }
    return ans;
  };
partition = function(pred, lis) {
    var recur;
    BgL_checkzd2argzd2(sc_isProcedure, pred, partition);
    recur = function(lis) {
        var tail;
        var elt;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return new sc_Values([lis, lis]);
        } else {
          elt = lis.car;
          tail = lis.cdr;
          return sc_callWithValues(function() {
                    return recur(tail);
                  }, function(in_85, out) {
                    if (pred(elt) !== false) {
                      return new sc_Values([out instanceof sc_Pair? new sc_Pair(elt, in_85): lis, out]);
                    } else {
                      return new sc_Values([in_85, in_85 instanceof sc_Pair? new sc_Pair(elt, out): lis]);
                    }
                  });
        }
      };
    return recur(lis);
  };
BgL_partitionz12z12 = function(pred, lis) {
    var prev_l;
    var l;
    var prev_l_86;
    var l_87;
    var g1294;
    var g1293;
    var scan_in;
    var scan_out;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_partitionz12z12);
    if (BgL_nullzd2listzf3z21(lis) !== false) {
      return new sc_Values([lis, lis]);
    } else {
      scan_in = function(in_prev, out_prev, lis) {
          var in_prev_88;
          var lis_89;
          in_prev_88 = in_prev;
          lis_89 = lis;
          while (lis_89 instanceof sc_Pair) {
            if (pred(lis_89.car) !== false) {
              in_prev_88 = lis_89;
              lis_89 = lis_89.cdr;
            } else {
              out_prev.cdr = lis_89;
              return scan_out(in_prev_88, lis_89, lis_89.cdr);
            }
          }
          return out_prev.cdr = lis_89;
        };
      scan_out = function(in_prev, out_prev, lis) {
          var out_prev_90;
          var lis_91;
          out_prev_90 = out_prev;
          lis_91 = lis;
          while (lis_91 instanceof sc_Pair) {
            if (pred(lis_91.car) !== false) {
              in_prev.cdr = lis_91;
              return scan_in(lis_91, out_prev_90, lis_91.cdr);
            } else {
              out_prev_90 = lis_91;
              lis_91 = lis_91.cdr;
            }
          }
          return in_prev.cdr = lis_91;
        };
      if (pred(lis.car) !== false) {
        g1293 = lis.cdr;
        prev_l_86 = lis;
        l_87 = g1293;
        while (!!(l_87 instanceof sc_Pair)) {
          if (pred(l_87.car) !== false) {
            prev_l_86 = l_87;
            l_87 = l_87.cdr;
          } else {
            scan_out(prev_l_86, l_87, l_87.cdr);
            return new sc_Values([lis, l_87]);
          }
        }
        return new sc_Values([lis, l_87]);
      } else {
        g1294 = lis.cdr;
        prev_l = lis;
        l = g1294;
        while (!!(l instanceof sc_Pair)) {
          if (pred(l.car) !== false) {
            scan_in(l, prev_l, l.cdr);
            return new sc_Values([l, lis]);
          } else {
            prev_l = l;
            l = l.cdr;
          }
        }
        return new sc_Values([l, lis]);
      }
    }
  };
remove = function(pred, l) {
    return filter(function(x) {
              return pred(x) === false;
            }, l);
  };
BgL_removez12z12 = function(pred, l) {
    return BgL_filterz12z12(function(x) {
              return pred(x) === false;
            }, l);
  };
BgL_deletez00 = function(x, lis) {
    var BgL_sc_maybezd2zd3_22z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      BgL_sc_maybezd2zd3_22z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_22z01);
    }
    var BgL_sc_zd3_23zd3;
    if (BgL_sc_maybezd2zd3_22z01 === null) {
      BgL_sc_zd3_23zd3 = sc_isEqual;
    } else {
      BgL_sc_zd3_23zd3 = BgL_sc_maybezd2zd3_22z01.car;
    }
    return filter(function(y) {
              return BgL_sc_zd3_23zd3(x, y) === false;
            }, lis);
  };
BgL_deletez12z12 = function(x, lis) {
    var BgL_sc_maybezd2zd3_24z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      BgL_sc_maybezd2zd3_24z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_24z01);
    }
    var BgL_sc_zd3_25zd3;
    if (BgL_sc_maybezd2zd3_24z01 === null) {
      BgL_sc_zd3_25zd3 = sc_isEqual;
    } else {
      BgL_sc_zd3_25zd3 = BgL_sc_maybezd2zd3_24z01.car;
    }
    return BgL_filterz12z12(function(y) {
              return BgL_sc_zd3_25zd3(x, y) === false;
            }, lis);
  };
member = function(x, lis) {
    var BgL_sc_maybezd2zd3_26z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      BgL_sc_maybezd2zd3_26z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_26z01);
    }
    var BgL_sc_zd3_27zd3;
    if (BgL_sc_maybezd2zd3_26z01 === null) {
      BgL_sc_zd3_27zd3 = sc_isEqual;
    } else {
      BgL_sc_zd3_27zd3 = BgL_sc_maybezd2zd3_26z01.car;
    }
    return BgL_findzd2tailzd2(function(y) {
              return BgL_sc_zd3_27zd3(x, y);
            }, lis);
  };
BgL_deletezd2duplicateszd2 = function(lis) {
    var BgL_sc_maybezd2zd3_28z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      BgL_sc_maybezd2zd3_28z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_28z01);
    }
    var recur;
    var BgL_sc_eltzd3_29zd3;
    if (BgL_sc_maybezd2zd3_28z01 === null) {
      BgL_sc_eltzd3_29zd3 = sc_isEqual;
    } else {
      BgL_sc_eltzd3_29zd3 = BgL_sc_maybezd2zd3_28z01.car;
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_eltzd3_29zd3, BgL_deletezd2duplicateszd2);
    recur = function(lis) {
        var new_tail;
        var tail;
        var x;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return lis;
        } else {
          x = lis.car;
          tail = lis.cdr;
          new_tail = recur(BgL_deletez00(x, tail, BgL_sc_eltzd3_29zd3));
          if (tail === new_tail) {
            return lis;
          } else {
            return new sc_Pair(x, new_tail);
          }
        }
      };
    return recur(lis);
  };
BgL_deletezd2duplicatesz12zc0 = function(lis, BgL_sc_maybezd2zd3_30z01) {
    var recur;
    var BgL_sc_eltzd3_31zd3;
    if (BgL_sc_maybezd2zd3_30z01 === null) {
      BgL_sc_eltzd3_31zd3 = sc_isEqual;
    } else {
      BgL_sc_eltzd3_31zd3 = BgL_sc_maybezd2zd3_30z01.car;
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_eltzd3_31zd3, BgL_deletezd2duplicatesz12zc0);
    recur = function(lis) {
        var new_tail;
        var tail;
        var x;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return lis;
        } else {
          x = lis.car;
          tail = lis.cdr;
          new_tail = recur(BgL_deletez12z12(x, tail, BgL_sc_eltzd3_31zd3));
          if (tail === new_tail) {
            return lis;
          } else {
            return new sc_Pair(x, new_tail);
          }
        }
      };
    return recur(lis);
  };
assoc = function(x, lis) {
    var BgL_sc_maybezd2zd3_32z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      BgL_sc_maybezd2zd3_32z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_32z01);
    }
    var BgL_sc_zd3_33zd3;
    if (BgL_sc_maybezd2zd3_32z01 === null) {
      BgL_sc_zd3_33zd3 = sc_isEqual;
    } else {
      BgL_sc_zd3_33zd3 = BgL_sc_maybezd2zd3_32z01.car;
    }
    return find(function(entry) {
              return BgL_sc_zd3_33zd3(x, entry.car);
            }, lis);
  };
BgL_alistzd2conszd2 = function(key, datum, alist) {
    return new sc_Pair(new sc_Pair(key, datum), alist);
  };
BgL_alistzd2copyzd2 = function(alist) {
    return map(function(elt) {
              return new sc_Pair(elt.car, elt.cdr);
            }, alist);
  };
BgL_alistzd2deletezd2 = function(key, alist) {
    var BgL_sc_maybezd2zd3_34z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      BgL_sc_maybezd2zd3_34z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_34z01);
    }
    var BgL_sc_zd3_35zd3;
    if (BgL_sc_maybezd2zd3_34z01 === null) {
      BgL_sc_zd3_35zd3 = sc_isEqual;
    } else {
      BgL_sc_zd3_35zd3 = BgL_sc_maybezd2zd3_34z01.car;
    }
    return filter(function(elt) {
              return BgL_sc_zd3_35zd3(key, elt.car) === false;
            }, alist);
  };
BgL_alistzd2deletez12zc0 = function(key, alist) {
    var BgL_sc_maybezd2zd3_36z01 = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      BgL_sc_maybezd2zd3_36z01 = sc_cons(arguments[sc_tmp], BgL_sc_maybezd2zd3_36z01);
    }
    var BgL_sc_zd3_37zd3;
    if (BgL_sc_maybezd2zd3_36z01 === null) {
      BgL_sc_zd3_37zd3 = sc_isEqual;
    } else {
      BgL_sc_zd3_37zd3 = BgL_sc_maybezd2zd3_36z01.car;
    }
    return BgL_filterz12z12(function(elt) {
              return BgL_sc_zd3_37zd3(key, elt.car) === false;
            }, alist);
  };
find = function(pred, list) {
    var g1296;
    g1296 = BgL_findzd2tailzd2(pred, list);
    if (g1296 !== false) {
      return g1296.car;
    } else {
      return false;
    }
  };
BgL_findzd2tailzd2 = function(pred, list) {
    var list_108;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_findzd2tailzd2);
    list_108 = list;
    while (BgL_nullzd2listzf3z21(list_108) === false) {
      if (pred(list_108.car) !== false) {
        return list_108;
      } else {
        list_108 = list_108.cdr;
      }
    }
    return false;
  };
BgL_takezd2whilezd2 = function(pred, lis) {
    var x;
    var recur;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_takezd2whilezd2);
    recur = function(lis) {
        var stmp;
        var x;
        var lis_109;
        var x_110;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return null;
        } else {
          x_110 = lis.car;
          if (pred(x_110) !== false) {
            lis_109 = lis.cdr;
            if (BgL_nullzd2listzf3z21(lis_109) !== false) {
              stmp = null;
            } else {
              x = lis_109.car;
              if (pred(x) !== false) {
                stmp = new sc_Pair(x, recur(lis_109.cdr));
              } else {
                stmp = null;
              }
            }
            return new sc_Pair(x_110, stmp);
          } else {
            return null;
          }
        }
      };
    if (BgL_nullzd2listzf3z21(lis) !== false) {
      return null;
    } else {
      x = lis.car;
      if (pred(x) !== false) {
        return new sc_Pair(x, recur(lis.cdr));
      } else {
        return null;
      }
    }
  };
BgL_dropzd2whilezd2 = function(pred, lis) {
    var lis_111;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_dropzd2whilezd2);
    lis_111 = lis;
    while (BgL_nullzd2listzf3z21(lis_111) === false) {
      if (pred(lis_111.car) !== false) {
        lis_111 = lis_111.cdr;
      } else {
        return lis_111;
      }
    }
    return null;
  };
BgL_takezd2whilez12zc0 = function(pred, lis) {
    var x;
    var prev;
    var rest;
    var g1298;
    var tmp1297;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_takezd2whilez12zc0);
    tmp1297 = BgL_nullzd2listzf3z21(lis);
    if ((tmp1297 !== false? tmp1297: pred(lis.car) === false) !== false) {
      return null;
    } else {
      g1298 = lis.cdr;
      BgL_whilezd2break1503zd2: {
        prev = lis;
        rest = g1298;
        while (rest instanceof sc_Pair) {
          x = rest.car;
          if (pred(x) !== false) {
            prev = rest;
            rest = rest.cdr;
          } else {
            {
              prev.cdr = null;
              break BgL_whilezd2break1503zd2;
            }
          }
        }
      }
      return lis;
    }
  };
span = function(pred, lis) {
    var recur;
    BgL_checkzd2argzd2(sc_isProcedure, pred, span);
    recur = function(lis) {
        var x;
        if (BgL_nullzd2listzf3z21(lis) !== false) {
          return new sc_Values([null, null]);
        } else {
          x = lis.car;
          if (pred(x) !== false) {
            return sc_callWithValues(function() {
                      return recur(lis.cdr);
                    }, function(prefix, suffix) {
                      return new sc_Values([new sc_Pair(x, prefix), suffix]);
                    });
          } else {
            return new sc_Values([null, lis]);
          }
        }
      };
    return recur(lis);
  };
BgL_spanz12z12 = function(pred, lis) {
    var x;
    var prev;
    var rest;
    var suffix;
    var g1300;
    var tmp1299;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_spanz12z12);
    tmp1299 = BgL_nullzd2listzf3z21(lis);
    if ((tmp1299 !== false? tmp1299: pred(lis.car) === false) !== false) {
      return new sc_Values([null, lis]);
    } else {
      g1300 = lis.cdr;
      BgL_whilezd2break1504zd2: {
        prev = lis;
        rest = g1300;
        while (BgL_nullzd2listzf3z21(rest) === false) {
          x = rest.car;
          if (pred(x) !== false) {
            prev = rest;
            rest = rest.cdr;
          } else {
            prev.cdr = null;
            {
              suffix = rest;
              break BgL_whilezd2break1504zd2;
            }
          }
        }
        suffix = rest;
      }
      return new sc_Values([lis, suffix]);
    }
  };
BgL_breakz00 = function(pred, lis) {
    return span(function(x) {
              return pred(x) === false;
            }, lis);
  };
BgL_breakz12z12 = function(pred, lis) {
    return BgL_spanz12z12(function(x) {
              return pred(x) === false;
            }, lis);
  };
any = function(pred, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var tmp1304;
    var head;
    var tail;
    var g1303;
    var g1302;
    BgL_checkzd2argzd2(sc_isProcedure, pred, any);
    if (lists instanceof sc_Pair) {
      return sc_callWithValues(function() {
                return BgL_z52carszb2cdrsze0(new sc_Pair(lis1, lists));
              }, function(heads, tails) {
                var lp;
                if (heads instanceof sc_Pair) {
                  lp = function(heads, tails) {
                      return sc_callWithValues(function() {
                                return BgL_z52carszb2cdrsze0(tails);
                              }, function(next_heads, next_tails) {
                                var tmp1301;
                                if (next_heads instanceof sc_Pair) {
                                  tmp1301 = sc_apply(pred, heads);
                                  if (tmp1301 !== false) {
                                    return tmp1301;
                                  } else {
                                    return lp(next_heads, next_tails);
                                  }
                                } else {
                                  return sc_apply(pred, heads);
                                }
                              });
                    };
                  return lp(heads, tails);
                } else {
                  return false;
                }
              });
    } else {
      if (BgL_nullzd2listzf3z21(lis1) === false) {
        g1302 = lis1.car;
        g1303 = lis1.cdr;
        head = g1302;
        tail = g1303;
        while (BgL_nullzd2listzf3z21(tail) === false) {
          tmp1304 = pred(head);
          if (tmp1304 !== false) {
            return tmp1304;
          } else {
            head = tail.car;
            tail = tail.cdr;
          }
        }
        return pred(head);
      } else {
        return false;
      }
    }
  };
every = function(pred, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var head;
    var tail;
    var g1308;
    var g1307;
    var tmp1306;
    BgL_checkzd2argzd2(sc_isProcedure, pred, every);
    if (lists instanceof sc_Pair) {
      return sc_callWithValues(function() {
                return BgL_z52carszb2cdrsze0(new sc_Pair(lis1, lists));
              }, function(heads, tails) {
                var lp;
                var tmp1305;
                tmp1305 = !(heads instanceof sc_Pair);
                if (tmp1305 !== false) {
                  return tmp1305;
                } else {
                  lp = function(heads, tails) {
                      return sc_callWithValues(function() {
                                return BgL_z52carszb2cdrsze0(tails);
                              }, function(next_heads, next_tails) {
                                if (next_heads instanceof sc_Pair) {
                                  if (sc_apply(pred, heads) !== false) {
                                    return lp(next_heads, next_tails);
                                  } else {
                                    return false;
                                  }
                                } else {
                                  return sc_apply(pred, heads);
                                }
                              });
                    };
                  return lp(heads, tails);
                }
              });
    } else {
      tmp1306 = BgL_nullzd2listzf3z21(lis1);
      if (tmp1306 !== false) {
        return tmp1306;
      } else {
        g1307 = lis1.car;
        g1308 = lis1.cdr;
        head = g1307;
        tail = g1308;
        while (BgL_nullzd2listzf3z21(tail) === false) {
          if (pred(head) !== false) {
            head = tail.car;
            tail = tail.cdr;
          } else {
            return false;
          }
        }
        return pred(head);
      }
    }
  };
BgL_listzd2indexzd2 = function(pred, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lis;
    var n;
    var lp;
    var g1309;
    BgL_checkzd2argzd2(sc_isProcedure, pred, BgL_listzd2indexzd2);
    if (lists instanceof sc_Pair) {
      g1309 = new sc_Pair(lis1, lists);
      lp = function(lists, n) {
          return sc_callWithValues(function() {
                    return BgL_z52carszb2cdrsze0(lists);
                  }, function(heads, tails) {
                    if (heads instanceof sc_Pair) {
                      if (sc_apply(pred, heads) !== false) {
                        return n;
                      } else {
                        return lp(tails, n + 1);
                      }
                    } else {
                      return false;
                    }
                  });
        };
      return lp(g1309, 0);
    } else {
      lis = lis1;
      n = 0;
      while (BgL_nullzd2listzf3z21(lis) === false) {
        if (pred(lis.car) !== false) {
          return n;
        } else {
          lis = lis.cdr;
          ++n;
        }
      }
      return false;
    }
  };
BgL_reversez12z12 = function(lis) {
    var tail;
    var lis_112;
    var ans;
    var g1310;
    g1310 = null;
    lis_112 = lis;
    ans = g1310;
    while (BgL_nullzd2listzf3z21(lis_112) === false) {
      tail = lis_112.cdr;
      lis_112.cdr = ans;
      ans = lis_112;
      lis_112 = tail;
    }
    return ans;
  };
BgL_z52lset2zc3zd3z42 = function(BgL_sc_zd3_38zd3, lis1, lis2) {
    return every(function(x) {
              return member(x, lis2, BgL_sc_zd3_38zd3);
            }, lis1);
  };
BgL_lsetzc3zd3z10 = function(BgL_sc_zd3_39zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var tmp1315;
    var rest;
    var s2;
    var tmp1314;
    var s1;
    var rest_115;
    var g1313;
    var g1312;
    var tmp1311;
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_39zd3, BgL_lsetzc3zd3z10);
    tmp1311 = !(lists instanceof sc_Pair);
    if (tmp1311 !== false) {
      return tmp1311;
    } else {
      g1312 = lists.car;
      g1313 = lists.cdr;
      s1 = g1312;
      rest_115 = g1313;
      do {
        tmp1314 = !(rest_115 instanceof sc_Pair);
        if (tmp1314 !== false) {
          return tmp1314;
        } else {
          s2 = rest_115.car;
          rest = rest_115.cdr;
          tmp1315 = s2 === s1;
          if ((tmp1315 !== false? tmp1315: BgL_z52lset2zc3zd3z42(BgL_sc_zd3_39zd3, s1, s2)) !== false) {
            s1 = s2;
            rest_115 = rest;
          } else {
            return false;
          }
        }
      } while (true);
    }
  };
BgL_lsetzd3zd3 = function(BgL_sc_zd3_40zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var tmp1320;
    var rest;
    var s2;
    var tmp1319;
    var s1;
    var rest_117;
    var g1318;
    var g1317;
    var tmp1316;
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_40zd3, BgL_lsetzd3zd3);
    tmp1316 = !(lists instanceof sc_Pair);
    if (tmp1316 !== false) {
      return tmp1316;
    } else {
      g1317 = lists.car;
      g1318 = lists.cdr;
      s1 = g1317;
      rest_117 = g1318;
      do {
        tmp1319 = !(rest_117 instanceof sc_Pair);
        if (tmp1319 !== false) {
          return tmp1319;
        } else {
          s2 = rest_117.car;
          rest = rest_117.cdr;
          tmp1320 = s1 === s2;
          if ((tmp1320 !== false? tmp1320: BgL_z52lset2zc3zd3z42(BgL_sc_zd3_40zd3, s1, s2) !== false && BgL_z52lset2zc3zd3z42(BgL_sc_zd3_40zd3, s2, s1)) !== false) {
            s1 = s2;
            rest_117 = rest;
          } else {
            return false;
          }
        }
      } while (true);
    }
  };
BgL_lsetzd2adjoinzd2 = function(BgL_sc_zd3_41zd3, lis) {
    var elts = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      elts = sc_cons(arguments[sc_tmp], elts);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_41zd3, BgL_lsetzd2adjoinzd2);
    return fold(function(elt, ans) {
              if (member(elt, ans, BgL_sc_zd3_41zd3) !== false) {
                return ans;
              } else {
                return new sc_Pair(elt, ans);
              }
            }, lis, elts);
  };
BgL_lsetzd2unionzd2 = function(BgL_sc_zd3_42zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_42zd3, BgL_lsetzd2unionzd2);
    return reduce(function(lis, ans) {
              if (lis === null) {
                return ans;
              } else {
                if (ans === null) {
                  return lis;
                } else {
                  if (lis === ans) {
                    return ans;
                  } else {
                    return fold(function(elt, ans) {
                              if (any(function(x) {
                                      return BgL_sc_zd3_42zd3(x, elt);
                                    }, ans) !== false) {
                                return ans;
                              } else {
                                return new sc_Pair(elt, ans);
                              }
                            }, ans, lis);
                  }
                }
              }
            }, null, lists);
  };
BgL_lsetzd2unionz12zc0 = function(BgL_sc_zd3_43zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_43zd3, BgL_lsetzd2unionz12zc0);
    return reduce(function(lis, ans) {
              if (lis === null) {
                return ans;
              } else {
                if (ans === null) {
                  return lis;
                } else {
                  if (lis === ans) {
                    return ans;
                  } else {
                    return BgL_pairzd2foldzd2(function(pair, ans) {
                              var elt;
                              elt = pair.car;
                              if (any(function(x) {
                                      return BgL_sc_zd3_43zd3(x, elt);
                                    }, ans) !== false) {
                                return ans;
                              } else {
                                pair.cdr = ans;
                                return pair;
                              }
                            }, ans, lis);
                  }
                }
              }
            }, null, lists);
  };
BgL_lsetzd2intersectionzd2 = function(BgL_sc_zd3_44zd3, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lists_122;
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_44zd3, BgL_lsetzd2intersectionzd2);
    lists_122 = BgL_deletez00(lis1, lists, sc_isEq);
    if (any(BgL_nullzd2listzf3z21, lists_122) !== false) {
      return null;
    } else {
      if (lists_122 === null) {
        return lis1;
      } else {
        return filter(function(x) {
                  return every(function(lis) {
                            return member(x, lis, BgL_sc_zd3_44zd3);
                          }, lists_122);
                }, lis1);
      }
    }
  };
BgL_lsetzd2intersectionz12zc0 = function(BgL_sc_zd3_45zd3, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lists_124;
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_45zd3, BgL_lsetzd2intersectionz12zc0);
    lists_124 = BgL_deletez00(lis1, lists, sc_isEq);
    if (any(BgL_nullzd2listzf3z21, lists_124) !== false) {
      return null;
    } else {
      if (lists_124 === null) {
        return lis1;
      } else {
        return BgL_filterz12z12(function(x) {
                  return every(function(lis) {
                            return member(x, lis, BgL_sc_zd3_45zd3);
                          }, lists_124);
                }, lis1);
      }
    }
  };
BgL_lsetzd2differencezd2 = function(BgL_sc_zd3_46zd3, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lists_126;
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_46zd3, BgL_lsetzd2differencezd2);
    lists_126 = filter(sc_isPair, lists);
    if (lists_126 === null) {
      return lis1;
    } else {
      if (sc_memq(lis1, lists_126) !== false) {
        return null;
      } else {
        return filter(function(x) {
                  return every(function(lis) {
                            return member(x, lis, BgL_sc_zd3_46zd3) === false;
                          }, lists_126);
                }, lis1);
      }
    }
  };
BgL_lsetzd2differencez12zc0 = function(BgL_sc_zd3_47zd3, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    var lists_128;
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_47zd3, BgL_lsetzd2differencez12zc0);
    lists_128 = filter(sc_isPair, lists);
    if (lists_128 === null) {
      return lis1;
    } else {
      if (sc_memq(lis1, lists_128) !== false) {
        return null;
      } else {
        return BgL_filterz12z12(function(x) {
                  return every(function(lis) {
                            return member(x, lis, BgL_sc_zd3_47zd3) === false;
                          }, lists_128);
                }, lis1);
      }
    }
  };
BgL_lsetzd2xorzd2 = function(BgL_sc_zd3_48zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_48zd3, BgL_lsetzd2xorzd2);
    return reduce(function(b, a) {
              return sc_callWithValues(function() {
                        return BgL_lsetzd2diffzb2intersectionz60(BgL_sc_zd3_48zd3, a, b);
                      }, function(a_b, a_int_b) {
                        if (a_b === null) {
                          return BgL_lsetzd2differencezd2(BgL_sc_zd3_48zd3, b, a);
                        } else {
                          if (a_int_b === null) {
                            return sc_append(b, a);
                          } else {
                            return fold(function(xb, ans) {
                                      if (member(xb, a_int_b, BgL_sc_zd3_48zd3) !== false) {
                                        return ans;
                                      } else {
                                        return new sc_Pair(xb, ans);
                                      }
                                    }, a_b, b);
                          }
                        }
                      });
            }, null, lists);
  };
BgL_lsetzd2xorz12zc0 = function(BgL_sc_zd3_49zd3) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 1; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_49zd3, BgL_lsetzd2xorz12zc0);
    return reduce(function(b, a) {
              return sc_callWithValues(function() {
                        return BgL_lsetzd2diffzb2intersectionz12z72(BgL_sc_zd3_49zd3, a, b);
                      }, function(a_b, a_int_b) {
                        if (a_b === null) {
                          return BgL_lsetzd2differencez12zc0(BgL_sc_zd3_49zd3, b, a);
                        } else {
                          if (a_int_b === null) {
                            return BgL_appendz12z12(b, a);
                          } else {
                            return BgL_pairzd2foldzd2(function(b_pair, ans) {
                                      if (member(b_pair.car, a_int_b, BgL_sc_zd3_49zd3) !== false) {
                                        return ans;
                                      } else {
                                        b_pair.cdr = ans;
                                        return b_pair;
                                      }
                                    }, a_b, b);
                          }
                        }
                      });
            }, null, lists);
  };
BgL_lsetzd2diffzb2intersectionz60 = function(BgL_sc_zd3_50zd3, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_50zd3, BgL_lsetzd2diffzb2intersectionz60);
    if (every(BgL_nullzd2listzf3z21, lists) !== false) {
      return new sc_Values([lis1, null]);
    } else {
      if (sc_memq(lis1, lists) !== false) {
        return new sc_Values([null, lis1]);
      } else {
        return partition(function(elt) {
                  return any(function(lis) {
                            return member(elt, lis, BgL_sc_zd3_50zd3);
                          }, lists) === false;
                }, lis1);
      }
    }
  };
BgL_lsetzd2diffzb2intersectionz12z72 = function(BgL_sc_zd3_51zd3, lis1) {
    var lists = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lists = sc_cons(arguments[sc_tmp], lists);
    }
    BgL_checkzd2argzd2(sc_isProcedure, BgL_sc_zd3_51zd3, BgL_lsetzd2diffzb2intersectionz12z72);
    if (every(BgL_nullzd2listzf3z21, lists) !== false) {
      return new sc_Values([lis1, null]);
    } else {
      if (sc_memq(lis1, lists) !== false) {
        return new sc_Values([null, lis1]);
      } else {
        return BgL_partitionz12z12(function(elt) {
                  return any(function(lis) {
                            return member(elt, lis, BgL_sc_zd3_51zd3);
                          }, lists) === false;
                }, lis1);
      }
    }
  };
first = sc_car;
second = sc_cadr;
third = sc_caddr;
fourth = sc_cadddr;
fifth = function(lst) {
    return sc_listRef(lst, 4);
  };
sixth = function(lst) {
    return sc_listRef(lst, 5);
  };
seventh = function(lst) {
    return sc_listRef(lst, 6);
  };
eighth = function(lst) {
    return sc_listRef(lst, 7);
  };
ninth = function(lst) {
    return sc_listRef(lst, 8);
  };
tenth = function(lst) {
    return sc_listRef(lst, 9);
  };
rest = sc_cdr;
pair = sc_cons;
BgL_truez00 = true;
BgL_falsez00 = false;
BgL_truezf3zf3 = function(x) {
    return !(x === BgL_falsez00);
  };
BgL_falsezf3zf3 = function(x) {
    return x === BgL_falsez00;
  };
repeat = function(n, thunk) {
    if (n > 0) {
      return pair(thunk(), repeat(n - 1, thunk));
    } else {
      return sc_list();
    }
  };
BgL_taggedzd2listzf3z21 = function(exp, tag) {
    if (exp instanceof sc_Pair) {
      return exp.car === tag;
    } else {
      return BgL_falsez00;
    }
  };
BgL_memzf3zf3 = function(sexpr) {
    return BgL_taggedzd2listzf3z21(sexpr, "\uEBACmem");
  };
BgL_lambdazf3zf3 = function(exp) {
    return BgL_taggedzd2listzf3z21(exp, "\uEBAClambda");
  };
BgL_lambdazd2parameterszd2 = function(exp) {
    return exp.cdr.car;
  };
BgL_lambdazd2bodyzd2 = function(exp) {
    return exp.cdr.cdr.car;
  };
BgL_quotedzf3zf3 = function(exp) {
    return BgL_taggedzd2listzf3z21(exp, "\uEBACquote");
  };
BgL_beginzf3zf3 = function(exp) {
    return BgL_taggedzd2listzf3z21(exp, "\uEBACbegin");
  };
BgL_definitionzf3zf3 = function(exp) {
    return BgL_taggedzd2listzf3z21(exp, "\uEBACdefine");
  };
BgL_ifzf3zf3 = function(exp) {
    return BgL_taggedzd2listzf3z21(exp, "\uEBACif");
  };
BgL_applicationzf3zf3 = function(exp) {
    return exp instanceof sc_Pair;
  };
BgL_letreczf3zf3 = function(exp) {
    return BgL_taggedzd2listzf3z21(exp, "\uEBACletrec");
  };
BgL_includezd2pathszd2 = sc_list(".\u002f", "include\u002f", ".\u002fchurch\u002f");
BgL_openzd2includedzd2filez00 = function(filename) {
    var path_list;
    var path_list_133;
    path_list_133 = BgL_includezd2pathszd2;
    path_list = path_list_133;
    while (!(path_list === null)) {
      if (BgL_filezd2existszf3z21(first(path_list) + filename) !== false) {
        return sc_openInputFile(first(path_list) + filename);
      } else {
        path_list = rest(path_list);
      }
    }
    return sc_error(BgL_sc_const_3z00_church_compiler_tmp, "File " + filename + BgL_sc_const_10z00_church_compiler_tmp);
  };
BgL_sugarzd2registryzd2 = null;
BgL_registerzd2sugarz12zc0 = function(pattern, translator) {
    var times_to_try = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      times_to_try = sc_cons(arguments[sc_tmp], times_to_try);
    }
    return BgL_sugarzd2registryzd2 = new sc_Pair(sc_list(pattern, translator, times_to_try), BgL_sugarzd2registryzd2);
  };
BgL_sugarzd2patternzd2 = first;
BgL_sugarzd2translatorzd2 = second;
BgL_timeszd2tozd2tryz00 = third;
BgL_dezd2sugarzd2 = function(expr) {
    var expr_134;
    var sugar_list;
    var new_expr;
    var sugar_list_135;
    var storage;
    var expr_136;
    var tmp;
    var unchanged;
    unchanged = sc_gensym();
    expr_136 = expr;
    tmp = 0;
    do {
      storage = {pass: undefined};
      with (storage) {
        pass = tmp;
        sugar_list_135 = filter(function(s) {
              var tmp1321;
              tmp1321 = BgL_timeszd2tozd2tryz00(s) === null;
              if (tmp1321 !== false) {
                return tmp1321;
              } else {
                return pass < first(BgL_timeszd2tozd2tryz00(s));
              }
            }, BgL_sugarzd2registryzd2);
        BgL_whilezd2break1512zd2: {
          expr_134 = expr_136;
          sugar_list = sugar_list_135;
          while (!(sugar_list === null)) {
            if (BgL_sugarzd2patternzd2(first(sugar_list))(expr_134) !== false) {
              {
                new_expr = BgL_sugarzd2translatorzd2(first(sugar_list))(expr_134);
                break BgL_whilezd2break1512zd2;
              }
            } else {
              sugar_list = rest(sugar_list);
            }
          }
          new_expr = unchanged;
        }
        if (new_expr === unchanged) {
          return expr_136;
        } else {
          expr_136 = new_expr;
          tmp = pass + 1;
        }
      }
    } while (true);
  };
BgL_dezd2sugarzd2allz00 = function(sexpr) {
    var new_sexpr;
    new_sexpr = BgL_dezd2sugarzd2(sexpr);
    if (sc_isList(new_sexpr)) {
      return map(BgL_dezd2sugarzd2allz00, new_sexpr);
    } else {
      return new_sexpr;
    }
  };
BgL_beginzd2wrapzd2 = function(exprs) {
    if (rest(exprs) === null) {
      return first(exprs);
    } else {
      return BgL_consza2za2("\uEBACbegin", sc_append(exprs, BgL_consza2za2(null)));
    }
  };
BgL_letzf3zf3 = function(expr) {
    if (BgL_taggedzd2listzf3z21(expr, "\uEBAClet") !== false) {
      return sc_isList(second(expr));
    } else {
      return false;
    }
  };
BgL_letzd2ze3lambdaz31 = function(expr) {
    var body;
    var value_exprs;
    var vars;
    var bindings;
    bindings = second(expr);
    vars = map(first, bindings);
    value_exprs = map(second, bindings);
    body = BgL_beginzd2wrapzd2(drop(expr, 2));
    return BgL_consza2za2(BgL_consza2za2("\uEBAClambda", vars, body, null), sc_append(value_exprs, BgL_consza2za2(null)));
  };
BgL_namedzd2letzf3z21 = function(expr) {
    if (BgL_taggedzd2listzf3z21(expr, "\uEBAClet") !== false) {
      return sc_isSymbol(second(expr));
    } else {
      return false;
    }
  };
BgL_namedzd2letzd2ze3letrecze3 = function(expr) {
    return BgL_consza2za2("\uEBACletrec", BgL_consza2za2(BgL_consza2za2(second(expr), BgL_consza2za2("\uEBAClambda", map(first, third(expr)), BgL_beginzd2wrapzd2(drop(expr, 3)), null), null), null), BgL_consza2za2(second(expr), sc_append(map(second, third(expr)), BgL_consza2za2(null))), null);
  };
BgL_namedzd2letzd2ze3lambdaze3 = function(expr) {
    var let_conversion;
    var proc_name;
    proc_name = second(expr);
    let_conversion = BgL_letzd2ze3lambdaz31(rest(expr));
    return BgL_consza2za2(BgL_consza2za2("\uEBACY", BgL_consza2za2("\uEBAClambda", BgL_consza2za2(proc_name, null), first(let_conversion), null), null), sc_append(rest(let_conversion), BgL_consza2za2(null)));
  };
BgL_letza2zf3z51 = function(expr) {
    return BgL_taggedzd2listzf3z21(expr, "\uEBAClet*");
  };
BgL_desugarzd2letza2z70 = function(expr) {
    var value_exprs;
    var var_137;
    var binding;
    var body;
    var bindings;
    bindings = second(expr);
    body = BgL_beginzd2wrapzd2(drop(expr, 2));
    if (bindings === null) {
      return body;
    } else {
      binding = first(bindings);
      var_137 = first(binding);
      value_exprs = second(binding);
      if (rest(bindings) === null) {
        return BgL_consza2za2(BgL_consza2za2("\uEBAClambda", BgL_consza2za2(var_137, null), body, null), value_exprs, null);
      } else {
        return BgL_consza2za2(BgL_consza2za2("\uEBAClambda", BgL_consza2za2(var_137, null), BgL_consza2za2("\uEBAClet*", rest(bindings), body, null), null), value_exprs, null);
      }
    }
  };
BgL_casezf3zf3 = function(expr) {
    return BgL_taggedzd2listzf3z21(expr, "\uEBACcase");
  };
BgL_desugarzd2casezd2 = function(expr) {
    var value_exprs;
    var key_expr;
    var key_symbol;
    key_symbol = sc_gensym();
    key_expr = second(expr);
    value_exprs = drop(expr, 2);
    return BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2(key_symbol, key_expr, null), null), BgL_consza2za2("\uEBACcond", sc_append(map(function(value_expr) {
                    var val_expr;
                    var values;
                    values = first(value_expr);
                    val_expr = rest(value_expr);
                    if (sc_isList(values)) {
                      return BgL_consza2za2(BgL_consza2za2("\uEBACany", BgL_consza2za2("\uEBAClist", sc_append(map(function(val) {
                                        return BgL_consza2za2("\uEBACequal?", key_symbol, val, null);
                                      }, values), BgL_consza2za2(null))), null), sc_append(val_expr, BgL_consza2za2(null)));
                    } else {
                      if (sc_isEqual(values, "\uEBACelse")) {
                        return BgL_consza2za2("\uEBACelse", sc_append(val_expr, BgL_consza2za2(null)));
                      } else {
                        return sc_error(BgL_sc_const_5z00_church_compiler_tmp, values);
                      }
                    }
                  }, value_exprs), BgL_consza2za2(null))), null);
  };
BgL_condzf3zf3 = function(expr) {
    return BgL_taggedzd2listzf3z21(expr, "\uEBACcond");
  };
BgL_desugarzd2condzd2 = function(expr) {
    var loop;
    var g1322;
    g1322 = rest(expr);
    loop = function(conditions) {
        var test;
        var condition;
        if (conditions === null) {
          return new sc_Pair("\uEBACvoid", null);
        } else {
          condition = first(conditions);
          test = first(condition);
          if (sc_isEqual(test, "\uEBACelse")) {
            if (!(rest(conditions) === null)) {
              return sc_error(expr, BgL_sc_const_4z00_church_compiler_tmp);
            } else {
              return BgL_beginzd2wrapzd2(rest(condition));
            }
          } else {
            return BgL_consza2za2("\uEBACif", test, BgL_beginzd2wrapzd2(rest(condition)), loop(rest(conditions)), null);
          }
        }
      };
    return loop(g1322);
  };
BgL_whenzf3zf3 = function(expr) {
    return BgL_taggedzd2listzf3z21(expr, "\uEBACwhen");
  };
BgL_desugarzd2whenzd2 = function(expr) {
    return BgL_consza2za2("\uEBACif", second(expr), BgL_consza2za2("\uEBACbegin", sc_append(expr.cdr.cdr, BgL_consza2za2(null))), BgL_consza2za2("\uEBACquote", BgL_consza2za2("\uEBACvoid", null), null), null);
  };
BgL_definezd2fnzf3z21 = function(expr) {
    if (BgL_taggedzd2listzf3z21(expr, "\uEBACdefine") !== false) {
      return !sc_isSymbol(second(expr));
    } else {
      return false;
    }
  };
BgL_desugarzd2definezd2fnz00 = function(expr) {
    var def_body;
    var def_params;
    var def_var;
    if (BgL_definezd2fnzf3z21(expr) !== false) {
      def_var = first(second(expr));
      def_params = rest(second(expr));
      def_body = rest(rest(expr));
      return BgL_consza2za2("\uEBACdefine", def_var, BgL_consza2za2("\uEBAClambda", def_params, sc_append(def_body, BgL_consza2za2(null))), null);
    } else {
      return expr;
    }
  };
BgL_seqzd2withzd2loadzf3zf3 = function(expr) {
    if (sc_isList(expr)) {
      return fold(function(subexpr, accum) {
                var tmp1323;
                tmp1323 = BgL_taggedzd2listzf3z21(subexpr, "\uEBACload");
                if (tmp1323 !== false) {
                  return tmp1323;
                } else {
                  return accum;
                }
              }, BgL_falsez00, expr);
    } else {
      return false;
    }
  };
BgL_expandzd2loadszd2 = function(expr) {
    return sc_apply(sc_append, map(function(subexpr) {
                if (BgL_loadzf3zf3(subexpr) !== false) {
                  return BgL_filezd2ze3listz31(BgL_openzd2includedzd2filez00(second(subexpr)));
                } else {
                  return sc_list(subexpr);
                }
              }, expr));
  };
BgL_filezd2ze3listz31 = function(filehandle) {
    var next;
    next = sc_read(filehandle);
    if (next === SC_EOF_OBJECT) {
      return null;
    } else {
      return new sc_Pair(next, BgL_filezd2ze3listz31(filehandle));
    }
  };
BgL_loadzf3zf3 = function(expr) {
    return BgL_taggedzd2listzf3z21(expr, "\uEBACload");
  };
BgL_beginzd2defineszf3z21 = function(sexpr) {
    if (BgL_taggedzd2listzf3z21(sexpr, "\uEBACbegin") !== false) {
      return !(filter(function(e) {
                  return BgL_taggedzd2listzf3z21(e, "\uEBACdefine");
                }, sexpr) === null);
    } else {
      return false;
    }
  };
BgL_desugarzd2beginzd2definesz00 = function(sexpr) {
    var non_defines;
    var defines;
    defines = map(BgL_desugarzd2definezd2fnz00, filter(function(e) {
            return BgL_taggedzd2listzf3z21(e, "\uEBACdefine");
          }, rest(sexpr)));
    non_defines = filter(function(e) {
          return BgL_taggedzd2listzf3z21(e, "\uEBACdefine") === false;
        }, rest(sexpr));
    return BgL_consza2za2("\uEBACletrec", map(rest, defines), BgL_beginzd2wrapzd2(non_defines), null);
  };
BgL_registerzd2queryzd2sugarz00 = function(query_name) {
    var is_query;
    var desugar_query;
    is_query = function(expr) {
        if (BgL_taggedzd2listzf3z21(expr, query_name) !== false) {
          return sc_length(rest(expr)) >= 2;
        } else {
          return false;
        }
      };
    desugar_query = function(expr) {
        var cond_exp;
        var query_exp;
        var defs;
        var BgL_sc_defszb2queryzb2cond_52z00;
        var control_args;
        var is_not_define;
        is_not_define = function(subexpr) {
            return BgL_taggedzd2listzf3z21(subexpr, "\uEBACdefine") === false;
          };
        control_args = rest(BgL_takezd2whilezd2(is_not_define, expr));
        BgL_sc_defszb2queryzb2cond_52z00 = BgL_dropzd2whilezd2(is_not_define, expr);
        defs = BgL_dropzd2rightzd2(BgL_sc_defszb2queryzb2cond_52z00, 2);
        query_exp = sc_listRef(BgL_sc_defszb2queryzb2cond_52z00, sc_length(BgL_sc_defszb2queryzb2cond_52z00) - 2);
        cond_exp = last(BgL_sc_defszb2queryzb2cond_52z00);
        return BgL_consza2za2(query_name, sc_append(control_args, BgL_consza2za2(BgL_consza2za2("\uEBAClambda", null, BgL_consza2za2("\uEBACbegin", sc_append(defs, BgL_consza2za2(BgL_consza2za2("\uEBACpair", cond_exp, BgL_consza2za2("\uEBAClambda", null, query_exp, null), null), null))), null), null)));
      };
    return BgL_registerzd2sugarz12zc0(is_query, desugar_query, 1);
  };
BgL_temperedzd2queryzf3z21 = function(query_name, expr) {
    if (BgL_taggedzd2listzf3z21(expr, query_name) !== false) {
      return sc_length(rest(expr)) >= 2;
    } else {
      return false;
    }
  };
BgL_desugarzd2temperedzd2queryz00 = function(query_name, expr) {
    return BgL_letza2zd2valuesz70(BgL_controlzd2partzd2(defs)(BgL_breakz00(function(subexpr) {
                  return BgL_taggedzd2listzf3z21(subexpr, "\uEBACdefine");
                }, BgL_dropzd2rightzd2(expr, 2)))(BgL_tempzd2argszd2()(second(BgL_controlzd2partzd2)), temps()(third(BgL_controlzd2partzd2)), BgL_controlzd2argszd2()(drop(BgL_controlzd2partzd2, 3)), BgL_queryzd2expzd2(BgL_condzd2expzd2)(sc_apply(sc_values, BgL_takezd2rightzd2(expr, 2)))), BgL_consza2za2(query_name, temps, sc_append(BgL_controlzd2argszd2, BgL_consza2za2(BgL_consza2za2("\uEBAClambda", BgL_tempzd2argszd2, BgL_consza2za2("\uEBAClambda", null, BgL_consza2za2("\uEBACbegin", sc_append(defs, BgL_consza2za2(BgL_consza2za2("\uEBACpair", BgL_condzd2expzd2, BgL_consza2za2("\uEBAClambda", null, BgL_queryzd2expzd2, null), null), null))), null), null), null))));
  };
BgL_psmczd2queryzf3z21 = function(expr) {
    return BgL_temperedzd2queryzf3z21("\uEBACpsmc-query", expr);
  };
BgL_desugarzd2psmczd2queryz00 = function(expr) {
    return BgL_desugarzd2temperedzd2queryz00("\uEBACpsmc-query", expr);
  };
BgL_mhzd2queryzf2annealedzd2initzf3z01 = function(expr) {
    return BgL_temperedzd2queryzf3z21("\uEBACmh-query\u002fannealed-init", expr);
  };
BgL_desugarzd2mhzd2queryzf2annealedzd2initz20 = function(expr) {
    return BgL_desugarzd2temperedzd2queryz00("\uEBACmh-query\u002fannealed-init", expr);
  };
BgL_hmczd2queryzf2annealedzd2initzf3z01 = function(expr) {
    return BgL_temperedzd2queryzf3z21("\uEBAChmc-query\u002fannealed-init", expr);
  };
BgL_desugarzd2hmczd2queryzf2annealedzd2initz20 = function(expr) {
    return BgL_desugarzd2temperedzd2queryz00("\uEBAChmc-query\u002fannealed-init", expr);
  };
BgL_annealedzd2gradientzd2ascentzf3zf3 = function(expr) {
    return BgL_temperedzd2queryzf3z21("\uEBACannealed-gradient-ascent", expr);
  };
BgL_desugarzd2annealedzd2gradientzd2ascentzd2 = function(expr) {
    return BgL_desugarzd2temperedzd2queryz00("\uEBACannealed-gradient-ascent", expr);
  };
BgL_laza7ifyzf3z54 = function(expr) {
    return BgL_taggedzd2listzf3z21(expr, "\uEBAClazify");
  };
BgL_desugarzd2laza7ifyz75 = function(expr) {
    return BgL_makezd2laza7yz75(second(expr));
  };
BgL_makezd2laza7yz75 = function(sexpr) {
    var tmp1324;
    tmp1324 = BgL_beginzf3zf3(sexpr);
    if ((tmp1324 !== false? tmp1324: BgL_memzf3zf3(sexpr)) !== false) {
      return map(BgL_makezd2laza7yz75, sexpr);
    } else {
      if (BgL_quotedzf3zf3(sexpr) !== false) {
        return sexpr;
      } else {
        if (BgL_letreczf3zf3(sexpr) !== false) {
          return BgL_consza2za2("\uEBACletrec", map(function(binding) {
                      return sc_list(first(binding), BgL_delayzd2exprzd2(second(binding)));
                    }, second(sexpr)), BgL_makezd2laza7yz75(third(sexpr)), null);
        } else {
          if (BgL_definitionzf3zf3(sexpr) !== false) {
            return BgL_consza2za2("\uEBACdefine", second(sexpr), BgL_delayzd2exprzd2(third(sexpr)), null);
          } else {
            if (BgL_lambdazf3zf3(sexpr) !== false) {
              return BgL_consza2za2("\uEBAClambda", BgL_lambdazd2parameterszd2(sexpr), BgL_makezd2laza7yz75(BgL_lambdazd2bodyzd2(sexpr)), null);
            } else {
              if (BgL_ifzf3zf3(sexpr) !== false) {
                return BgL_consza2za2("\uEBACif", BgL_makezd2laza7yz75(second(sexpr)), BgL_delayzd2exprzd2(third(sexpr)), BgL_delayzd2exprzd2(fourth(sexpr)), null);
              } else {
                if (BgL_applicationzf3zf3(sexpr) !== false) {
                  return BgL_consza2za2(BgL_makezd2laza7yz75(first(sexpr)), sc_append(map(BgL_delayzd2exprzd2, rest(sexpr)), BgL_consza2za2(null)));
                } else {
                  return sexpr;
                }
              }
            }
          }
        }
      }
    }
  };
BgL_delayzd2exprzd2 = function(sexpr) {
    var tmp1325;
    tmp1325 = BgL_lambdazf3zf3(sexpr);
    if ((tmp1325 !== false? tmp1325: BgL_memzf3zf3(sexpr) !== false && BgL_lambdazf3zf3(first(sexpr))) !== false) {
      return BgL_makezd2laza7yz75(sexpr);
    } else {
      return BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBACquote", "\uEBACdelayed", null), BgL_consza2za2("\uEBACmem", BgL_consza2za2("\uEBAClambda", null, BgL_makezd2laza7yz75(sexpr), null), null), null);
    }
  };
BgL_fragmentzd2lambdazf3z21 = function(expr) {
    return BgL_taggedzd2listzf3z21(expr, "\uEBACf-lambda");
  };
BgL_desugarzd2fragmentzd2lambdaz00 = function(sexpr) {
    return BgL_consza2za2("\uEBACDPmem", 1.0, BgL_consza2za2("\uEBAClambda", BgL_lambdazd2parameterszd2(sexpr), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACflip", null), BgL_lambdazd2bodyzd2(sexpr), BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBACquote", "\uEBACdelayed", null), BgL_consza2za2("\uEBAClambda", null, BgL_lambdazd2bodyzd2(sexpr), null), null), null), null), null);
  };
BgL_registerzd2sugarz12zc0(BgL_letzf3zf3, BgL_letzd2ze3lambdaz31);
BgL_registerzd2sugarz12zc0(BgL_letza2zf3z51, BgL_desugarzd2letza2z70);
BgL_registerzd2sugarz12zc0(BgL_namedzd2letzf3z21, BgL_namedzd2letzd2ze3letrecze3);
BgL_registerzd2sugarz12zc0(BgL_casezf3zf3, BgL_desugarzd2casezd2);
BgL_registerzd2sugarz12zc0(BgL_condzf3zf3, BgL_desugarzd2condzd2);
BgL_registerzd2sugarz12zc0(BgL_beginzd2defineszf3z21, BgL_desugarzd2beginzd2definesz00);
BgL_registerzd2sugarz12zc0(BgL_definezd2fnzf3z21, BgL_desugarzd2definezd2fnz00);
BgL_registerzd2sugarz12zc0(BgL_seqzd2withzd2loadzf3zf3, BgL_expandzd2loadszd2);
BgL_registerzd2sugarz12zc0(BgL_whenzf3zf3, BgL_desugarzd2whenzd2);
BgL_registerzd2queryzd2sugarz00("\uEBACmh-query");
BgL_registerzd2queryzd2sugarz00("\uEBACrejection-query");
BgL_registerzd2queryzd2sugarz00("\uEBACenumeration-query");
BgL_registerzd2queryzd2sugarz00("\uEBACgradient-ascent");
BgL_registerzd2queryzd2sugarz00("\uEBAChmc-query");
BgL_registerzd2sugarz12zc0(BgL_psmczd2queryzf3z21, BgL_desugarzd2psmczd2queryz00, 1);
BgL_registerzd2sugarz12zc0(BgL_mhzd2queryzf2annealedzd2initzf3z01, BgL_desugarzd2mhzd2queryzf2annealedzd2initz20, 1);
BgL_registerzd2sugarz12zc0(BgL_hmczd2queryzf2annealedzd2initzf3z01, BgL_desugarzd2hmczd2queryzf2annealedzd2initz20, 1);
BgL_registerzd2sugarz12zc0(BgL_annealedzd2gradientzd2ascentzf3zf3, BgL_desugarzd2annealedzd2gradientzd2ascentzd2, 1);
BgL_registerzd2sugarz12zc0(BgL_fragmentzd2lambdazf3z21, BgL_desugarzd2fragmentzd2lambdaz00);
BgL_registerzd2sugarz12zc0(BgL_laza7ifyzf3z54, BgL_desugarzd2laza7ifyz75);
BgL_za2nozd2forcingza2zd2 = BgL_truez00;
BgL_za2ADza2z00 = BgL_truez00;
BgL_generatezd2headerzd2 = function(free_variables, external_defs, lazy) {
    var primitive_defs;
    var def_symbols;
    var special_defs;
    BgL_za2nozd2forcingza2zd2 = lazy === false;
    special_defs = BgL_generatezd2specialzd2();
    def_symbols = map(function(d) {
          if (second(d) instanceof sc_Pair) {
            return first(second(d));
          } else {
            return second(d);
          }
        }, sc_append(special_defs, external_defs));
    primitive_defs = map(BgL_primitivezd2defzd2, BgL_lsetzd2differencezd2(sc_isEq, filter(BgL_churchzd2symbolzf3z21, free_variables), def_symbols));
    return sc_append(external_defs, primitive_defs, special_defs);
  };
BgL_prefixzd2churchzd2 = function(symb) {
    return '\uEBAC' + ("church-" + symb.slice(1));
  };
BgL_unzd2prefixzd2churchz00 = function(symb) {
    if (BgL_churchzd2symbolzf3z21(symb) !== false) {
      return '\uEBAC' + sc_list2string(drop(sc_string2list(symb.slice(1)), 7));
    } else {
      return symb;
    }
  };
BgL_churchzd2symbolzf3z21 = function(symb) {
    if (7 < sc_length(sc_string2list(symb.slice(1)))) {
      return sc_isEqual("church-", sc_list2string(take(sc_string2list(symb.slice(1)), 7)));
    } else {
      return false;
    }
  };
BgL_primitivezd2defzd2 = function(symb) {
    if (BgL_za2nozd2forcingza2zd2 !== false) {
      return BgL_consza2za2("\uEBACdefine", symb, BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACaddress", "\uEBACstore", "\uEBACargs"), BgL_consza2za2("\uEBACapply", BgL_unzd2prefixzd2churchz00(symb), "\uEBACargs", null), null), null);
    } else {
      return BgL_consza2za2("\uEBACdefine", symb, BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACaddress", "\uEBACstore", "\uEBACargs"), BgL_consza2za2("\uEBACapply", BgL_unzd2prefixzd2churchz00(symb), BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACa", null), BgL_consza2za2("\uEBACchurch-force", "\uEBACaddress", "\uEBACstore", "\uEBACa", null), null), "\uEBACargs", null), null), null), null);
    }
  };
BgL_generatezd2specialzd2 = function() {
    return BgL_consza2za2(BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACchurch-apply", "\uEBACaddress", "\uEBACstore", "\uEBACproc", "\uEBACargs", null), BgL_za2nozd2forcingza2zd2 !== false? BgL_consza2za2("\uEBACapply", "\uEBACproc", "\uEBACaddress", "\uEBACstore", "\uEBACargs", null): BgL_consza2za2("\uEBACapply", BgL_consza2za2("\uEBACchurch-force", "\uEBACaddress", "\uEBACstore", "\uEBACproc", null), "\uEBACaddress", "\uEBACstore", BgL_consza2za2("\uEBACchurch-force", "\uEBACaddress", "\uEBACstore", "\uEBACargs", null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACchurch-true", true, null), BgL_consza2za2("\uEBACdefine", "\uEBACchurch-false", false, null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACchurch-or", "\uEBACaddress", "\uEBACstore", "\uEBACargs"), BgL_consza2za2("\uEBACfold", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACx", "\uEBACy", null), BgL_consza2za2("\uEBACor", "\uEBACx", "\uEBACy", null), null), false, "\uEBACargs", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACchurch-and", "\uEBACaddress", "\uEBACstore", "\uEBACargs"), BgL_consza2za2("\uEBACfold", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACx", "\uEBACy", null), BgL_consza2za2("\uEBACand", "\uEBACx", "\uEBACy", null), null), true, "\uEBACargs", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACchurch-force", "\uEBACaddress", "\uEBACstore", "\uEBACval", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACand", BgL_consza2za2("\uEBACpair?", "\uEBACval", null), BgL_consza2za2("\uEBACeq?", BgL_consza2za2("\uEBACcar", "\uEBACval", null), BgL_consza2za2("\uEBACquote", "\uEBACdelayed", null), null), null), BgL_consza2za2("\uEBACchurch-force", "\uEBACaddress", "\uEBACstore", BgL_consza2za2(BgL_consza2za2("\uEBACcadr", "\uEBACval", null), "\uEBACaddress", "\uEBACstore", null), null), "\uEBACval", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-store", "\uEBACxrp-draws", "\uEBACxrp-stats", "\uEBACscore", "\uEBACtick", "\uEBACenumeration-flag", null), BgL_consza2za2("\uEBAClist", "\uEBACxrp-draws", "\uEBACxrp-stats", "\uEBACscore", "\uEBACtick", "\uEBACenumeration-flag", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-empty-store", null), BgL_consza2za2("\uEBACmake-store", BgL_consza2za2("\uEBACmake-addbox", null), BgL_consza2za2("\uEBACmake-addbox", null), 0.0, 0, false, null), null), BgL_consza2za2("\uEBACdefine", "\uEBACstore->xrp-draws", "\uEBACfirst", null), BgL_consza2za2("\uEBACdefine", "\uEBACset-store-xrp-draws!", "\uEBACset-car!", null), BgL_consza2za2("\uEBACdefine", "\uEBACstore->xrp-stats", "\uEBACsecond", null), BgL_consza2za2("\uEBACdefine", "\uEBACstore->score", "\uEBACthird", null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACset-store-score!", "\uEBACstore", "\uEBACscore", null), BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACcar", "\uEBACstore", null), BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACcadr", "\uEBACstore", null), BgL_consza2za2("\uEBACset-car!", BgL_consza2za2("\uEBACcddr", "\uEBACstore", null), "\uEBACscore", null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACstore->tick", "\uEBACfourth", null), BgL_consza2za2("\uEBACdefine", "\uEBACstore->enumeration-flag", "\uEBACfifth", null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACchurch-reset-store-xrp-draws", "\uEBACaddress", "\uEBACstore", null), BgL_consza2za2("\uEBACset-store-xrp-draws!", "\uEBACstore", BgL_consza2za2("\uEBACmake-addbox", null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACtrienone", BgL_consza2za2("\uEBACquote", "\uEBACnone", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-trie", "\uEBACval", "\uEBACchildren", null), BgL_consza2za2("\uEBACpair", "\uEBACval", "\uEBACchildren", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-empty-trie", null), BgL_consza2za2("\uEBACmake-trie", "\uEBACtrienone", BgL_consza2za2("\uEBACquote", null, null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACtrie->val", "\uEBACcar", null), BgL_consza2za2("\uEBACdefine", "\uEBACtrie->children", "\uEBACcdr", null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACtrie-empty?", "\uEBACtrie", null), BgL_consza2za2("\uEBACnull?", BgL_consza2za2("\uEBACtrie->children", "\uEBACtrie", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACtrie->values", "\uEBACtrie", null), BgL_consza2za2("\uEBACdefine", "\uEBACvals", BgL_consza2za2("\uEBACquote", null, null), null), BgL_consza2za2("\uEBACwalk-trie", "\uEBACtrie", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACv", null), BgL_consza2za2("\uEBACset!", "\uEBACvals", BgL_consza2za2("\uEBACcons", "\uEBACv", "\uEBACvals", null), null), null), null), "\uEBACvals", null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACwalk-trie", "\uEBACtrie", "\uEBACfn", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnot", BgL_consza2za2("\uEBACeq?", "\uEBACtrienone", BgL_consza2za2("\uEBACtrie->val", "\uEBACtrie", null), null), null), BgL_consza2za2("\uEBACfn", BgL_consza2za2("\uEBACtrie->val", "\uEBACtrie", null), null), BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACc", null), BgL_consza2za2("\uEBACwalk-trie", BgL_consza2za2("\uEBACcdr", "\uEBACc", null), "\uEBACfn", null), null), BgL_consza2za2("\uEBACtrie->children", "\uEBACtrie", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACalist->trie", "\uEBACalist", null), BgL_consza2za2("\uEBAClet", "\uEBACloop", BgL_consza2za2(BgL_consza2za2("\uEBACalist", "\uEBACalist", null), BgL_consza2za2("\uEBACtrie", BgL_consza2za2("\uEBACmake-empty-trie", null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACalist", null), "\uEBACtrie", BgL_consza2za2("\uEBACloop", BgL_consza2za2("\uEBACcdr", "\uEBACalist", null), BgL_consza2za2("\uEBACtrie-insert", "\uEBACtrie", BgL_consza2za2("\uEBACcaar", "\uEBACalist", null), BgL_consza2za2("\uEBACcdar", "\uEBACalist", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACcopy-trie", "\uEBACtrie", null), BgL_consza2za2("\uEBACmake-trie", BgL_consza2za2("\uEBACtrie->val", "\uEBACtrie", null), BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACk-t", null), BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACcar", "\uEBACk-t", null), BgL_consza2za2("\uEBACcopy-trie", BgL_consza2za2("\uEBACcdr", "\uEBACk-t", null), null), null), null), BgL_consza2za2("\uEBACtrie->children", "\uEBACtrie", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACtrie-insert", "\uEBACtrie", "\uEBACkey", "\uEBACval", null), BgL_consza2za2("\uEBACtrie-update", "\uEBACtrie", "\uEBACkey", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACv", null), "\uEBACval", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACtrie-lookup", "\uEBACtrie", "\uEBACkey", null), BgL_consza2za2("\uEBACdefine", "\uEBACval", "\uEBACtrienone", null), BgL_consza2za2("\uEBACtrie-update", "\uEBACtrie", "\uEBACkey", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACv", null), BgL_consza2za2("\uEBACset!", "\uEBACval", "\uEBACv", null), "\uEBACv", null), null), "\uEBACval", null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACtrie-update", "\uEBACtrie", "\uEBACkey", "\uEBACfn", null), BgL_consza2za2("\uEBAClet", "\uEBACloop", BgL_consza2za2(BgL_consza2za2("\uEBACtrie", "\uEBACtrie", null), BgL_consza2za2("\uEBACkey", "\uEBACkey", null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACkey", null), BgL_consza2za2("\uEBACset-car!", "\uEBACtrie", BgL_consza2za2("\uEBACfn", BgL_consza2za2("\uEBACtrie->val", "\uEBACtrie", null), null), null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACentry", BgL_consza2za2("\uEBACassoc", BgL_consza2za2("\uEBACcar", "\uEBACkey", null), BgL_consza2za2("\uEBACtrie->children", "\uEBACtrie", null), null), null), BgL_consza2za2("\uEBACsub-trie", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACeq?", false, "\uEBACentry", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACnew-child", BgL_consza2za2("\uEBACmake-empty-trie", null), null), null), BgL_consza2za2("\uEBACset-cdr!", "\uEBACtrie", BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACcar", "\uEBACkey", null), "\uEBACnew-child", null), BgL_consza2za2("\uEBACtrie->children", "\uEBACtrie", null), null), null), "\uEBACnew-child", null), BgL_consza2za2("\uEBACcdr", "\uEBACentry", null), null), null), null), BgL_consza2za2("\uEBACloop", "\uEBACsub-trie", BgL_consza2za2("\uEBACcdr", "\uEBACkey", null), null), null), null), null), "\uEBACtrie", null), BgL_consza2za2("\uEBACdefine", "\uEBACmake-addbox", "\uEBACmake-empty-trie", null), BgL_consza2za2("\uEBACdefine", "\uEBACcopy-addbox", "\uEBACcopy-trie", null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACinsert-addbox", "\uEBACaddbox", "\uEBACaddress", "\uEBACval", null), BgL_consza2za2("\uEBACtrie-insert", "\uEBACaddbox", BgL_consza2za2("\uEBACreverse", "\uEBACaddress", null), "\uEBACval", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACread-addbox", "\uEBACaddbox", "\uEBACaddress", null), BgL_consza2za2("\uEBACtrie-lookup", "\uEBACaddbox", BgL_consza2za2("\uEBACreverse", "\uEBACaddress", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACupdate-addbox", "\uEBACaddbox", "\uEBACaddress", "\uEBACfn", null), BgL_consza2za2("\uEBACtrie-update", "\uEBACaddbox", BgL_consza2za2("\uEBACreverse", "\uEBACaddress", null), "\uEBACfn", null), null), BgL_consza2za2("\uEBACdefine", "\uEBACaddbox->values", "\uEBACtrie->values", null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACalist->addbox", "\uEBACalist", null), BgL_consza2za2("\uEBACalist->trie", BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACb", null), BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACreverse", BgL_consza2za2("\uEBACcar", "\uEBACb", null), null), BgL_consza2za2("\uEBACcdr", "\uEBACb", null), null), null), "\uEBACalist", null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACaddbox-empty?", "\uEBACtrie-empty?", null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-xrp-draw", "\uEBACaddress", "\uEBACvalue", "\uEBACxrp-name", "\uEBACproposer-thunk", "\uEBACticks", "\uEBACscore", "\uEBACsupport", null), BgL_consza2za2("\uEBAClist", "\uEBACaddress", "\uEBACvalue", "\uEBACxrp-name", "\uEBACproposer-thunk", "\uEBACticks", "\uEBACscore", "\uEBACsupport", null), null), BgL_consza2za2("\uEBACdefine", "\uEBACxrp-draw-address", "\uEBACfirst", null), BgL_consza2za2("\uEBACdefine", "\uEBACxrp-draw-value", "\uEBACsecond", null), BgL_consza2za2("\uEBACdefine", "\uEBACxrp-draw-name", "\uEBACthird", null), BgL_consza2za2("\uEBACdefine", "\uEBACxrp-draw-proposer", "\uEBACfourth", null), BgL_consza2za2("\uEBACdefine", "\uEBACxrp-draw-ticks", "\uEBACfifth", null), BgL_consza2za2("\uEBACdefine", "\uEBACxrp-draw-score", "\uEBACsixth", null), BgL_consza2za2("\uEBACdefine", "\uEBACxrp-draw-support", "\uEBACseventh", null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACchurch-make-xrp", "\uEBACaddress", "\uEBACstore", "\uEBACxrp-name", "\uEBACsample", "\uEBACincr-stats", "\uEBACdecr-stats", "\uEBACscore", "\uEBACinit-stats", "\uEBAChyperparams", "\uEBACproposer", "\uEBACsupport", null), BgL_consza2za2("\uEBAClet*", BgL_za2nozd2forcingza2zd2 !== false? null: const_church_compiler_tmp, BgL_consza2za2("\uEBACupdate-addbox", BgL_consza2za2("\uEBACstore->xrp-stats", "\uEBACstore", null), "\uEBACaddress", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstats", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACor", BgL_consza2za2("\uEBACeq?", "\uEBACtrienone", "\uEBACstats", null), BgL_consza2za2("\uEBACnot", BgL_consza2za2("\uEBAC=", BgL_consza2za2("\uEBACstore->tick", "\uEBACstore", null), BgL_consza2za2("\uEBACsecond", "\uEBACstats", null), null), null), null), BgL_consza2za2("\uEBAClist", "\uEBACinit-stats", BgL_consza2za2("\uEBACstore->tick", "\uEBACstore", null), null), "\uEBACstats", null), null), null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACxrp-address", "\uEBACaddress", null), BgL_consza2za2("\uEBACproposer", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACproposer", null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACaddress", "\uEBACstore", "\uEBACoperands", "\uEBACold-value", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACdec", BgL_consza2za2("\uEBACdecr-stats", "\uEBACaddress", "\uEBACstore", "\uEBACold-value", BgL_consza2za2("\uEBACcar", BgL_consza2za2("\uEBACread-addbox", BgL_consza2za2("\uEBACstore->xrp-stats", "\uEBACstore", null), "\uEBACxrp-address", null), null), "\uEBAChyperparams", "\uEBACoperands", null), null), BgL_consza2za2("\uEBACdecstats", BgL_consza2za2("\uEBACsecond", "\uEBACdec", null), null), BgL_consza2za2("\uEBACdecscore", BgL_consza2za2("\uEBACthird", "\uEBACdec", null), null), BgL_consza2za2("\uEBACsandbox-store", BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACmake-addbox", null), BgL_consza2za2("\uEBACcdr", "\uEBACstore", null), null), null), BgL_consza2za2("\uEBACinc", BgL_consza2za2("\uEBACsample", "\uEBACaddress", "\uEBACsandbox-store", "\uEBACdecstats", "\uEBAChyperparams", "\uEBACoperands", null), null), BgL_consza2za2("\uEBACproposal-value", BgL_consza2za2("\uEBACfirst", "\uEBACinc", null), null), BgL_consza2za2("\uEBACincscore", BgL_consza2za2("\uEBACthird", "\uEBACinc", null), null), null), BgL_consza2za2("\uEBAClist", "\uEBACproposal-value", "\uEBACincscore", "\uEBACdecscore", null), null), null), "\uEBACproposer", null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACaddress", "\uEBACstore", "\uEBACargs"), BgL_consza2za2("\uEBACdefine", "\uEBACnew-val", BgL_consza2za2("\uEBACquote", null, null), null), BgL_consza2za2("\uEBACupdate-addbox", BgL_consza2za2("\uEBACstore->xrp-draws", "\uEBACstore", null), "\uEBACaddress", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACxrp-draw", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACand", BgL_consza2za2("\uEBACnot", BgL_consza2za2("\uEBACeq?", "\uEBACtrienone", "\uEBACxrp-draw", null), null), BgL_consza2za2("\uEBACequal?", BgL_consza2za2("\uEBACstore->tick", "\uEBACstore", null), BgL_consza2za2("\uEBACcar", BgL_consza2za2("\uEBACxrp-draw-ticks", "\uEBACxrp-draw", null), null), null), null), BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACset!", "\uEBACnew-val", BgL_consza2za2("\uEBACxrp-draw-value", "\uEBACxrp-draw", null), null), "\uEBACxrp-draw", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACstats", BgL_consza2za2("\uEBACcar", BgL_consza2za2("\uEBACread-addbox", BgL_consza2za2("\uEBACstore->xrp-stats", "\uEBACstore", null), "\uEBACxrp-address", null), null), null), BgL_consza2za2("\uEBACsupport-vals", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACsupport", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACsupport", "\uEBACaddress", "\uEBACstore", "\uEBACstats", "\uEBAChyperparams", "\uEBACargs", null), null), null), BgL_consza2za2("\uEBACsandbox-store", BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACmake-addbox", null), BgL_consza2za2("\uEBACcdr", "\uEBACstore", null), null), null), BgL_consza2za2("\uEBACtmp", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACeq?", "\uEBACtrienone", "\uEBACxrp-draw", null), BgL_consza2za2("\uEBACsample", "\uEBACaddress", "\uEBACsandbox-store", "\uEBACstats", "\uEBAChyperparams", "\uEBACargs", null), BgL_consza2za2("\uEBACincr-stats", "\uEBACaddress", "\uEBACsandbox-store", BgL_consza2za2("\uEBACxrp-draw-value", "\uEBACxrp-draw", null), "\uEBACstats", "\uEBAChyperparams", "\uEBACargs", null), null), null), BgL_consza2za2("\uEBACvalue", BgL_consza2za2("\uEBACfirst", "\uEBACtmp", null), null), BgL_consza2za2("\uEBACnew-stats", BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBACsecond", "\uEBACtmp", null), BgL_consza2za2("\uEBACstore->tick", "\uEBACstore", null), null), null), BgL_consza2za2("\uEBACincr-score", BgL_consza2za2("\uEBACthird", "\uEBACtmp", null), null), BgL_consza2za2("\uEBAClast-tick", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACeq?", "\uEBACtrienone", "\uEBACxrp-draw", null), false, BgL_consza2za2("\uEBACcar", BgL_consza2za2("\uEBACxrp-draw-ticks", "\uEBACxrp-draw", null), null), null), null), BgL_consza2za2("\uEBACnew-xrp-draw", BgL_consza2za2("\uEBACmake-xrp-draw", "\uEBACaddress", "\uEBACvalue", "\uEBACxrp-name", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACaddress", "\uEBACstore", "\uEBACstate", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACstore", BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACfirst", BgL_consza2za2("\uEBACmcmc-state->store", "\uEBACstate", null), null), BgL_consza2za2("\uEBACcdr", BgL_consza2za2("\uEBACmcmc-state->store", "\uEBACstate", null), null), null), null), null), BgL_consza2za2("\uEBACchurch-apply", BgL_consza2za2("\uEBACmcmc-state->address", "\uEBACstate", null), "\uEBACstore", "\uEBACproposer", BgL_consza2za2("\uEBAClist", "\uEBACargs", "\uEBACvalue", null), null), null), null), BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACstore->tick", "\uEBACstore", null), "\uEBAClast-tick", null), "\uEBACincr-score", "\uEBACsupport-vals", null), null), null), BgL_consza2za2("\uEBACset!", "\uEBACnew-val", "\uEBACvalue", null), BgL_consza2za2("\uEBACinsert-addbox", BgL_consza2za2("\uEBACstore->xrp-stats", "\uEBACstore", null), "\uEBACxrp-address", "\uEBACnew-stats", null), BgL_consza2za2("\uEBACset-store-score!", "\uEBACstore", BgL_consza2za2("\uEBAC+", BgL_consza2za2("\uEBACstore->score", "\uEBACstore", null), "\uEBACincr-score", null), null), "\uEBACnew-xrp-draw", null), null), null), null), "\uEBACnew-val", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-mcmc-state", "\uEBACstore", "\uEBACvalue", "\uEBACaddress", null), BgL_consza2za2("\uEBAClist", "\uEBACstore", "\uEBACvalue", "\uEBACaddress", null), null), BgL_consza2za2("\uEBACdefine", "\uEBACmcmc-state->store", "\uEBACfirst", null), BgL_consza2za2("\uEBACdefine", "\uEBACmcmc-state->address", "\uEBACthird", null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmcmc-state->xrp-draws", "\uEBACstate", null), BgL_consza2za2("\uEBACstore->xrp-draws", BgL_consza2za2("\uEBACmcmc-state->store", "\uEBACstate", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmcmc-state->score", "\uEBACstate", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnot", BgL_consza2za2("\uEBACeq?", true, BgL_consza2za2("\uEBACfirst", BgL_consza2za2("\uEBACsecond", "\uEBACstate", null), null), null), null), "\uEBACminus-infinity", BgL_consza2za2("\uEBACstore->score", BgL_consza2za2("\uEBACmcmc-state->store", "\uEBACstate", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmcmc-state->gradient", "\uEBACstate", null), BgL_consza2za2("\uEBACfirst", BgL_consza2za2("\uEBACsecond", BgL_consza2za2("\uEBACxy-gradient-R", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACf", "\uEBACxrp-draws", null), BgL_consza2za2("\uEBACfilter-map", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACx", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACtape?", BgL_consza2za2("\uEBACxrp-draw-value", "\uEBACx", null), null), BgL_consza2za2("\uEBACf", BgL_consza2za2("\uEBACxrp-draw-value", "\uEBACx", null), null), false, null), null), "\uEBACxrp-draws", null), null), BgL_consza2za2("\uEBACaddbox->values", BgL_consza2za2("\uEBACmcmc-state->xrp-draws", "\uEBACstate", null), null), BgL_consza2za2("\uEBACmcmc-state->score", "\uEBACstate", null), "\uEBACtapify", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmcmc-state->query-value", "\uEBACstate", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACstore", BgL_consza2za2("\uEBACmcmc-state->store", "\uEBACstate", null), null), BgL_consza2za2("\uEBACstore", BgL_consza2za2("\uEBACmake-store", BgL_consza2za2("\uEBACcopy-addbox", BgL_consza2za2("\uEBACstore->xrp-draws", "\uEBACstore", null), null), BgL_consza2za2("\uEBACcopy-addbox", BgL_consza2za2("\uEBACstore->xrp-stats", "\uEBACstore", null), null), BgL_consza2za2("\uEBACstore->score", "\uEBACstore", null), BgL_consza2za2("\uEBACstore->tick", "\uEBACstore", null), BgL_consza2za2("\uEBACstore->enumeration-flag", "\uEBACstore", null), null), null), null), BgL_consza2za2("\uEBACchurch-apply", BgL_consza2za2("\uEBACmcmc-state->address", "\uEBACstate", null), "\uEBACstore", BgL_consza2za2("\uEBACcdr", BgL_consza2za2("\uEBACsecond", "\uEBACstate", null), null), BgL_consza2za2("\uEBACquote", null, null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACchurch-make-initial-mcmc-state", "\uEBACaddress", "\uEBACstore", null), BgL_consza2za2("\uEBACmake-mcmc-state", "\uEBACstore", BgL_consza2za2("\uEBACquote", "\uEBACinit-val", null), "\uEBACaddress", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACcounterfactual-update", "\uEBACstate", "\uEBACnfqp", "\uEBACinterventions"), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACinterv-store", BgL_consza2za2("\uEBACmake-store", BgL_consza2za2("\uEBACfold", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACinterv", "\uEBACxrps", null), BgL_consza2za2("\uEBACupdate-addbox", "\uEBACxrps", BgL_consza2za2("\uEBACxrp-draw-address", BgL_consza2za2("\uEBACfirst", "\uEBACinterv", null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACxrp-draw", null), BgL_consza2za2("\uEBACmake-xrp-draw", BgL_consza2za2("\uEBACxrp-draw-address", BgL_consza2za2("\uEBACfirst", "\uEBACinterv", null), null), BgL_consza2za2("\uEBACcdr", "\uEBACinterv", null), BgL_consza2za2("\uEBACxrp-draw-name", BgL_consza2za2("\uEBACfirst", "\uEBACinterv", null), null), BgL_consza2za2("\uEBACxrp-draw-proposer", BgL_consza2za2("\uEBACfirst", "\uEBACinterv", null), null), BgL_consza2za2("\uEBACxrp-draw-ticks", BgL_consza2za2("\uEBACfirst", "\uEBACinterv", null), null), BgL_consza2za2("\uEBACquote", "\uEBACdummy-score", null), BgL_consza2za2("\uEBACxrp-draw-support", BgL_consza2za2("\uEBACfirst", "\uEBACinterv", null), null), null), null), null), null), BgL_consza2za2("\uEBACcopy-addbox", BgL_consza2za2("\uEBACstore->xrp-draws", BgL_consza2za2("\uEBACmcmc-state->store", "\uEBACstate", null), null), null), "\uEBACinterventions", null), BgL_consza2za2("\uEBACcopy-addbox", BgL_consza2za2("\uEBACstore->xrp-stats", BgL_consza2za2("\uEBACmcmc-state->store", "\uEBACstate", null), null), null), 0.0, BgL_consza2za2("\uEBAC+", 1, BgL_consza2za2("\uEBACstore->tick", BgL_consza2za2("\uEBACmcmc-state->store", "\uEBACstate", null), null), null), BgL_consza2za2("\uEBACstore->enumeration-flag", BgL_consza2za2("\uEBACmcmc-state->store", "\uEBACstate", null), null), null), null), BgL_consza2za2("\uEBACvalue", BgL_consza2za2("\uEBACchurch-apply", BgL_consza2za2("\uEBACmcmc-state->address", "\uEBACstate", null), "\uEBACinterv-store", "\uEBACnfqp", BgL_consza2za2("\uEBACquote", null, null), null), null), BgL_consza2za2("\uEBACcd-bw\u002ffw", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACstore->enumeration-flag", "\uEBACinterv-store", null), 0, BgL_consza2za2("\uEBACclean-store", "\uEBACinterv-store", null), null), null), BgL_consza2za2("\uEBACproposal-state", BgL_consza2za2("\uEBACmake-mcmc-state", "\uEBACinterv-store", "\uEBACvalue", BgL_consza2za2("\uEBACmcmc-state->address", "\uEBACstate", null), null), null), null), BgL_consza2za2("\uEBAClist", "\uEBACproposal-state", "\uEBACcd-bw\u002ffw", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACclean-store", "\uEBACstore", null), BgL_consza2za2("\uEBAClet", "\uEBACloop", BgL_consza2za2(BgL_consza2za2("\uEBACdraws", BgL_consza2za2("\uEBACaddbox->values", BgL_consza2za2("\uEBACstore->xrp-draws", "\uEBACstore", null), null), null), BgL_consza2za2("\uEBACused-draws", BgL_consza2za2("\uEBACquote", null, null), null), BgL_consza2za2("\uEBACbw\u002ffw", 0.0, null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACdraws", null), BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACset-store-xrp-draws!", "\uEBACstore", BgL_consza2za2("\uEBACalist->addbox", BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACd", null), BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACxrp-draw-address", "\uEBACd", null), "\uEBACd", null), null), "\uEBACused-draws", null), null), null), "\uEBACbw\u002ffw", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC=", BgL_consza2za2("\uEBACfirst", BgL_consza2za2("\uEBACxrp-draw-ticks", BgL_consza2za2("\uEBACcar", "\uEBACdraws", null), null), null), BgL_consza2za2("\uEBACstore->tick", "\uEBACstore", null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACeq?", false, BgL_consza2za2("\uEBACcdr", BgL_consza2za2("\uEBACxrp-draw-ticks", BgL_consza2za2("\uEBACcar", "\uEBACdraws", null), null), null), null), BgL_consza2za2("\uEBACloop", BgL_consza2za2("\uEBACcdr", "\uEBACdraws", null), BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACcar", "\uEBACdraws", null), "\uEBACused-draws", null), BgL_consza2za2("\uEBAC-", "\uEBACbw\u002ffw", BgL_consza2za2("\uEBACxrp-draw-score", BgL_consza2za2("\uEBACcar", "\uEBACdraws", null), null), null), null), BgL_consza2za2("\uEBACloop", BgL_consza2za2("\uEBACcdr", "\uEBACdraws", null), BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACcar", "\uEBACdraws", null), "\uEBACused-draws", null), "\uEBACbw\u002ffw", null), null), BgL_consza2za2("\uEBACloop", BgL_consza2za2("\uEBACcdr", "\uEBACdraws", null), "\uEBACused-draws", BgL_consza2za2("\uEBAC+", "\uEBACbw\u002ffw", BgL_consza2za2("\uEBACxrp-draw-score", BgL_consza2za2("\uEBACcar", "\uEBACdraws", null), null), null), null), null), null), null), null), null);
  };
infinity = 1 / 0.0;
BgL_minuszd2infinityzd2 = 1 / -0.0;
BgL_za2threadedzd2primitivesza2zd2 = BgL_sc_const_13z00_church_compiler_tmp;
compile = function(top_list, external_defs) {
    var lazy = null;
    for (var sc_tmp = arguments.length - 1; sc_tmp >= 2; --sc_tmp) {
      lazy = sc_cons(arguments[sc_tmp], lazy);
    }
    var scexpr;
    var is_primitive;
    var primitive_symbols;
    var ds_sexpr;
    var ds_sexpr_139;
    var church_sexpr;
    church_sexpr = BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACsample", "\uEBACthunk", null), BgL_consza2za2("\uEBACthunk", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACuniform-draw", "\uEBAClst", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBAClst", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBAClist-ref", "\uEBAClst", BgL_consza2za2("\uEBACsample-integer", BgL_consza2za2("\uEBAClength", "\uEBAClst", null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACall", "\uEBAClst", null), BgL_consza2za2("\uEBACapply", "\uEBACand", "\uEBAClst", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACany", "\uEBAClst", null), BgL_consza2za2("\uEBACapply", "\uEBACor", "\uEBAClst", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACproduct", "\uEBAClst", null), BgL_consza2za2("\uEBACapply", "\uEBAC*", "\uEBAClst", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACsum", "\uEBAClst", null), BgL_consza2za2("\uEBACapply", "\uEBAC+", "\uEBAClst", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACrepeat", "\uEBACN", "\uEBACproc", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC=", "\uEBACN", 0, null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACproc", null), BgL_consza2za2("\uEBACrepeat", BgL_consza2za2("\uEBAC-", "\uEBACN", 1, null), "\uEBACproc", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACfor-each", "\uEBACproc", "\uEBAClst", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBAClst", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACproc", BgL_consza2za2("\uEBACfirst", "\uEBAClst", null), null), BgL_consza2za2("\uEBACfor-each", "\uEBACproc", BgL_consza2za2("\uEBACrest", "\uEBAClst", null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACfold", "\uEBACproc", "\uEBACinit", "\uEBAClsts"), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", BgL_consza2za2("\uEBACfirst", "\uEBAClsts", null), null), "\uEBACinit", BgL_consza2za2("\uEBACapply", "\uEBACfold", BgL_consza2za2("\uEBACpair", "\uEBACproc", BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACapply", "\uEBACproc", BgL_consza2za2("\uEBACappend", BgL_consza2za2("\uEBACsingle-map", "\uEBACfirst", "\uEBAClsts", null), BgL_consza2za2("\uEBAClist", "\uEBACinit", null), null), null), BgL_consza2za2("\uEBACsingle-map", "\uEBACrest", "\uEBAClsts", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACreverse", "\uEBAClst", null), BgL_consza2za2("\uEBAClet", "\uEBACloop", BgL_consza2za2(BgL_consza2za2("\uEBACnewlst", BgL_consza2za2("\uEBACquote", null, null), null), BgL_consza2za2("\uEBAClst", "\uEBAClst", null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBAClst", null), "\uEBACnewlst", BgL_consza2za2("\uEBACloop", BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACcar", "\uEBAClst", null), "\uEBACnewlst", null), BgL_consza2za2("\uEBACcdr", "\uEBAClst", null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmap", "\uEBACproc", "\uEBAClsts"), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", BgL_consza2za2("\uEBACrest", "\uEBAClsts", null), null), BgL_consza2za2("\uEBACsingle-map", "\uEBACproc", BgL_consza2za2("\uEBACfirst", "\uEBAClsts", null), null), BgL_consza2za2("\uEBACmulti-map", "\uEBACproc", "\uEBAClsts", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACsingle-map", "\uEBACproc", "\uEBAClst", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBAClst", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACproc", BgL_consza2za2("\uEBACfirst", "\uEBAClst", null), null), BgL_consza2za2("\uEBACmap", "\uEBACproc", BgL_consza2za2("\uEBACrest", "\uEBAClst", null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmulti-map", "\uEBACproc", "\uEBAClsts", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", BgL_consza2za2("\uEBACfirst", "\uEBAClsts", null), null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACapply", "\uEBACproc", BgL_consza2za2("\uEBACsingle-map", "\uEBACfirst", "\uEBAClsts", null), null), BgL_consza2za2("\uEBACmulti-map", "\uEBACproc", BgL_consza2za2("\uEBACsingle-map", "\uEBACrest", "\uEBAClsts", null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmany-map", "\uEBACproc", "\uEBAClsts"), BgL_consza2za2("\uEBACmulti-map", "\uEBACproc", "\uEBAClsts", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACfilter", "\uEBACpred", "\uEBAClst", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBAClst", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACpred", BgL_consza2za2("\uEBACfirst", "\uEBAClst", null), null), BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACfirst", "\uEBAClst", null), BgL_consza2za2("\uEBACfilter", "\uEBACpred", BgL_consza2za2("\uEBACrest", "\uEBAClst", null), null), null), BgL_consza2za2("\uEBACfilter", "\uEBACpred", BgL_consza2za2("\uEBACrest", "\uEBAClst", null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACfilter-map", "\uEBACproc", "\uEBAClst", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBAClst", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACval", BgL_consza2za2("\uEBACproc", BgL_consza2za2("\uEBACfirst", "\uEBAClst", null), null), null), null), BgL_consza2za2("\uEBACif", "\uEBACval", BgL_consza2za2("\uEBACpair", "\uEBACval", BgL_consza2za2("\uEBACfilter-map", "\uEBACproc", BgL_consza2za2("\uEBACrest", "\uEBAClst", null), null), null), BgL_consza2za2("\uEBACfilter-map", "\uEBACproc", BgL_consza2za2("\uEBACrest", "\uEBAClst", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBAClist-index", "\uEBACpred", "\uEBAClst", "\uEBACi"), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBAClst", null), "\uEBACfalse", BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACi", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACi", null), 0, BgL_consza2za2("\uEBACfirst", "\uEBACi", null), null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACpred", BgL_consza2za2("\uEBACfirst", "\uEBAClst", null), null), "\uEBACi", BgL_consza2za2("\uEBAClist-index", "\uEBACpred", BgL_consza2za2("\uEBACrest", "\uEBAClst", null), BgL_consza2za2("\uEBAC+", "\uEBACi", 1, null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACzip", "\uEBAClists"), BgL_consza2za2("\uEBACmulti-map", "\uEBAClist", "\uEBAClists", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACrejection-query", "\uEBACnfqp", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACval", BgL_consza2za2("\uEBACnfqp", null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACfirst", "\uEBACval", null), BgL_consza2za2(BgL_consza2za2("\uEBACrest", "\uEBACval", null), null), BgL_consza2za2("\uEBACrejection-query", "\uEBACnfqp", null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACdiscrete", "\uEBACsample-discrete", null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmultinomial", "\uEBACvals", "\uEBACprobs", null), BgL_consza2za2("\uEBAClist-ref", "\uEBACvals", BgL_consza2za2("\uEBACdiscrete", "\uEBACprobs", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACbeta", "\uEBACa", "\uEBACb", null), BgL_consza2za2("\uEBACdirichlet", BgL_consza2za2("\uEBAClist", "\uEBACa", "\uEBACb", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-GEM", "\uEBACalpha", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACsticks", BgL_consza2za2("\uEBACmem", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACx", null), BgL_consza2za2("\uEBACbeta", 1.0, "\uEBACalpha", null), null), null), null), null), BgL_consza2za2("\uEBAClambda", null, BgL_consza2za2("\uEBACpick-a-stick", "\uEBACsticks", 1, null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACpick-a-stick", "\uEBACsticks", "\uEBACJ", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACflip", BgL_consza2za2("\uEBACsticks", "\uEBACJ", null), null), "\uEBACJ", BgL_consza2za2("\uEBACpick-a-stick", "\uEBACsticks", BgL_consza2za2("\uEBAC+", "\uEBACJ", 1, null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACsticky-DPmem", "\uEBACalpha", "\uEBACproc", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACaugmented-proc", BgL_consza2za2("\uEBACmem", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACpart", null), BgL_consza2za2("\uEBACapply", "\uEBACproc", "\uEBACargs", null), null), null), null), BgL_consza2za2("\uEBACcrps", BgL_consza2za2("\uEBACmem", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", null), BgL_consza2za2("\uEBACmake-GEM", "\uEBACalpha", null), null), null), null), null), BgL_consza2za2("\uEBAClambda", "\uEBACargsin", BgL_consza2za2("\uEBACaugmented-proc", "\uEBACargsin", BgL_consza2za2(BgL_consza2za2("\uEBACcrps", "\uEBACargsin", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-PYP", "\uEBACa", "\uEBACb", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACsticks", BgL_consza2za2("\uEBACmem", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACx", null), BgL_consza2za2("\uEBACbeta", BgL_consza2za2("\uEBAC-", 1.0, "\uEBACa", null), BgL_consza2za2("\uEBAC+", "\uEBACb", BgL_consza2za2("\uEBAC*", "\uEBACa", "\uEBACx", null), null), null), null), null), null), null), BgL_consza2za2("\uEBAClambda", null, BgL_consza2za2("\uEBACpick-a-stick", "\uEBACsticks", 1, null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACPYmem", "\uEBACa", "\uEBACb", "\uEBACproc", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACaugmented-proc", BgL_consza2za2("\uEBACmem", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACpart", null), BgL_consza2za2("\uEBACapply", "\uEBACproc", "\uEBACargs", null), null), null), null), BgL_consza2za2("\uEBACcrps", BgL_consza2za2("\uEBACmem", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", null), BgL_consza2za2("\uEBACmake-PYP", "\uEBACa", "\uEBACb", null), null), null), null), null), BgL_consza2za2("\uEBAClambda", "\uEBACargsin", BgL_consza2za2("\uEBACaugmented-proc", "\uEBACargsin", BgL_consza2za2(BgL_consza2za2("\uEBACcrps", "\uEBACargsin", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACflatten", "\uEBAClst", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBAClst", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAClist?", BgL_consza2za2("\uEBACfirst", "\uEBAClst", null), null), BgL_consza2za2("\uEBACappend", BgL_consza2za2("\uEBACflatten", BgL_consza2za2("\uEBACfirst", "\uEBAClst", null), null), BgL_consza2za2("\uEBACflatten", BgL_consza2za2("\uEBACrest", "\uEBAClst", null), null), null), BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACfirst", "\uEBAClst", null), BgL_consza2za2("\uEBACflatten", BgL_consza2za2("\uEBACrest", "\uEBAClst", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmean", "\uEBAClst", null), BgL_consza2za2("\uEBAC\u002f", BgL_consza2za2("\uEBACapply", "\uEBAC+", "\uEBAClst", null), BgL_consza2za2("\uEBAClength", "\uEBAClst", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACvariance", "\uEBAClst", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACmn", BgL_consza2za2("\uEBACmean", "\uEBAClst", null), null), null), BgL_consza2za2("\uEBACmean", BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACx", null), BgL_consza2za2("\uEBACexpt", BgL_consza2za2("\uEBAC-", "\uEBACx", "\uEBACmn", null), 2, null), null), "\uEBAClst", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACno-proposals", "\uEBACx", null), BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACdisplay", BgL_sc_const_9z00_church_compiler_tmp, null), "\uEBACx", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-stateless-xrp", "\uEBACxrp-name", "\uEBACsampler", "\uEBACscorer", "\uEBACproposal-support"), BgL_consza2za2("\uEBACmake-xrp", "\uEBACxrp-name", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstats", "\uEBAChyperparams", "\uEBACargs", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACvalue", BgL_consza2za2("\uEBACapply", "\uEBACsampler", "\uEBACargs", null), null), BgL_consza2za2("\uEBACvalue", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACand", BgL_consza2za2("\uEBAC*with-score-gradient*", null), BgL_consza2za2("\uEBACcontinuous?", "\uEBACvalue", null), null), BgL_consza2za2("\uEBACtapify", BgL_consza2za2("\uEBACuntapify", "\uEBACvalue", null), null), "\uEBACvalue", null), null), null), BgL_consza2za2("\uEBAClist", "\uEBACvalue", "\uEBACstats", BgL_consza2za2("\uEBACscorer", "\uEBACargs", "\uEBACvalue", null), null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACvalue", "\uEBACstats", "\uEBAChyperparams", "\uEBACargs", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACvalue", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACand", BgL_consza2za2("\uEBAC*with-score-gradient*", null), BgL_consza2za2("\uEBACcontinuous?", "\uEBACvalue", null), null), BgL_consza2za2("\uEBACtapify", BgL_consza2za2("\uEBACuntapify", "\uEBACvalue", null), null), "\uEBACvalue", null), null), null), BgL_consza2za2("\uEBAClist", "\uEBACvalue", "\uEBACstats", BgL_consza2za2("\uEBACscorer", "\uEBACargs", "\uEBACvalue", null), null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACvalue", "\uEBACstats", "\uEBAChyperparams", "\uEBACargs", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACvalue", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACand", BgL_consza2za2("\uEBAC*with-score-gradient*", null), BgL_consza2za2("\uEBACcontinuous?", "\uEBACvalue", null), null), BgL_consza2za2("\uEBACtapify", BgL_consza2za2("\uEBACuntapify", "\uEBACvalue", null), null), "\uEBACvalue", null), null), null), BgL_consza2za2("\uEBAClist", "\uEBACvalue", "\uEBACstats", BgL_consza2za2("\uEBACscorer", "\uEBACargs", "\uEBACvalue", null), null), null), null), BgL_consza2za2("\uEBACquote", "\uEBACscorer", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACproposal-support", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACfirst", "\uEBACproposal-support", null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACproposal-support", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", BgL_consza2za2("\uEBACrest", "\uEBACproposal-support", null), null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACpr", BgL_consza2za2("\uEBACsecond", "\uEBACproposal-support", null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstats", "\uEBAChyperparams", "\uEBACargs", null), BgL_consza2za2("\uEBACpr", "\uEBACargs", null), null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACflip", BgL_consza2za2("\uEBACmake-stateless-xrp", BgL_consza2za2("\uEBACquote", "\uEBACflip", null), BgL_consza2za2("\uEBAClambda", "\uEBACw", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACw", null), BgL_consza2za2("\uEBAC<", BgL_consza2za2("\uEBACrandom-real", null), 0.5, null), BgL_consza2za2("\uEBAC<", BgL_consza2za2("\uEBACrandom-real", null), BgL_consza2za2("\uEBACcar", "\uEBACw", null), null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACval", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACargs", null), BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAClog", 2.0, null), null), BgL_consza2za2("\uEBACif", "\uEBACval", BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), null), BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBAC-", 1, BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), null), null), null), null), null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", null), BgL_consza2za2("\uEBAClist", "\uEBACtrue", "\uEBACfalse", null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBAClog-flip", BgL_consza2za2("\uEBACmake-stateless-xrp", BgL_consza2za2("\uEBACquote", "\uEBAClog-flip", null), BgL_consza2za2("\uEBAClambda", "\uEBACw", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACw", null), BgL_consza2za2("\uEBAC<", BgL_consza2za2("\uEBACrandom-real", null), 0.5, null), BgL_consza2za2("\uEBAC<", BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBACrandom-real", null), null), BgL_consza2za2("\uEBACcar", "\uEBACw", null), null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACval", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACargs", null), BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAClog", 2.0, null), null), BgL_consza2za2("\uEBACif", "\uEBACval", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBAC-", 1.0, BgL_consza2za2("\uEBACexp", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), null), null), null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACdirichlet", BgL_consza2za2("\uEBACmake-stateless-xrp", BgL_consza2za2("\uEBACquote", "\uEBACdirichlet", null), "\uEBACsample-dirichlet", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACval", null), BgL_consza2za2("\uEBACdirichlet-lnpdf", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), "\uEBACval", null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACsample-discrete", BgL_consza2za2("\uEBACmake-stateless-xrp", BgL_consza2za2("\uEBACquote", "\uEBACsample-discrete", null), "\uEBACdiscrete-sampler", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACval", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC>=", "\uEBACval", BgL_consza2za2("\uEBAClength", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), null), null), "\uEBACminus-infinity", BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACp", BgL_consza2za2("\uEBACdiscrete-pdf", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), "\uEBACval", null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC>", "\uEBACp", 0, null), BgL_consza2za2("\uEBAClog", "\uEBACp", null), "\uEBACminus-infinity", null), null), null), null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", null), BgL_consza2za2("\uEBACiota", BgL_consza2za2("\uEBAClength", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACsample-integer", BgL_consza2za2("\uEBACmake-stateless-xrp", BgL_consza2za2("\uEBACquote", "\uEBACsample-integer", null), "\uEBACrandom-integer", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACval", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACn", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACand", BgL_consza2za2("\uEBACinteger?", "\uEBACval", null), BgL_consza2za2("\uEBAC>=", "\uEBACval", 0, null), BgL_consza2za2("\uEBAC<", "\uEBACval", "\uEBACn", null), null), BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAClog", "\uEBACn", null), null), "\uEBACminus-infinity", null), null), null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", null), BgL_consza2za2("\uEBACiota", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACuniform", BgL_consza2za2("\uEBACmake-stateless-xrp", BgL_consza2za2("\uEBACquote", "\uEBACuniform", null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACa", "\uEBACb", null), BgL_consza2za2("\uEBAC+", BgL_consza2za2("\uEBAC*", BgL_consza2za2("\uEBAC-", "\uEBACb", "\uEBACa", null), BgL_consza2za2("\uEBACrandom-real", null), null), "\uEBACa", null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACval", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACa", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), null), BgL_consza2za2("\uEBACb", BgL_consza2za2("\uEBACsecond", "\uEBACargs", null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACor", BgL_consza2za2("\uEBAC<", "\uEBACval", "\uEBACa", null), BgL_consza2za2("\uEBAC>", "\uEBACval", "\uEBACb", null), null), "\uEBACminus-infinity", BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBAC-", "\uEBACb", "\uEBACa", null), null), null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACexponential", BgL_consza2za2("\uEBACmake-stateless-xrp", BgL_consza2za2("\uEBACquote", "\uEBACexponential", null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACinv-mean", null), BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAC\u002f", BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBACrandom-real", null), null), "\uEBACinv-mean", null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACval", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC<", "\uEBACval", 0, null), "\uEBACminus-infinity", BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACinv-mean", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), null), null), BgL_consza2za2("\uEBAC+", BgL_consza2za2("\uEBAClog", "\uEBACinv-mean", null), BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAC*", "\uEBACinv-mean", "\uEBACval", null), null), null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACgaussian", BgL_consza2za2("\uEBACmake-stateless-xrp", BgL_consza2za2("\uEBACquote", "\uEBACgaussian", null), BgL_consza2za2("\uEBAClambda", "\uEBACargs", BgL_consza2za2("\uEBACsample-gaussian", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), BgL_consza2za2("\uEBACsecond", "\uEBACargs", null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACval", null), BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBACgaussian-pdf", "\uEBACval", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), BgL_consza2za2("\uEBACsecond", "\uEBACargs", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACgensym", BgL_consza2za2("\uEBACmake-stateless-xrp", BgL_consza2za2("\uEBACquote", "\uEBACgensym", null), BgL_consza2za2("\uEBAClambda", "\uEBACprefix", BgL_consza2za2("\uEBACapply", "\uEBACscheme-gensym", "\uEBACprefix", null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACval", null), BgL_consza2za2("\uEBAClog", 0.9, null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACrandom-permutation", BgL_consza2za2("\uEBACmake-stateless-xrp", BgL_consza2za2("\uEBACquote", "\uEBACrandom-permutation", null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBAClen", null), BgL_consza2za2("\uEBAClet", "\uEBACloop", BgL_consza2za2(BgL_consza2za2("\uEBACperm", BgL_consza2za2("\uEBACiota", "\uEBAClen", null), null), BgL_consza2za2("\uEBACn", BgL_consza2za2("\uEBAC-", "\uEBAClen", 1, null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC=", "\uEBACn", 0, null), "\uEBACperm", BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACk", BgL_consza2za2("\uEBACsample-integer", BgL_consza2za2("\uEBAC+", "\uEBACn", 1, null), null), null), null), BgL_consza2za2("\uEBACloop", BgL_consza2za2("\uEBACput", BgL_consza2za2("\uEBACput", "\uEBACperm", "\uEBACk", BgL_consza2za2("\uEBAClist-ref", "\uEBACperm", "\uEBACn", null), null), "\uEBACn", BgL_consza2za2("\uEBAClist-ref", "\uEBACperm", "\uEBACk", null), null), BgL_consza2za2("\uEBAC-", "\uEBACn", 1, null), null), null), null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACval", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBAClen", BgL_consza2za2("\uEBACfirst", "\uEBACargs", null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC=", "\uEBAClen", BgL_consza2za2("\uEBAClength", "\uEBACval", null), null), BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAClnfact", "\uEBAClen", null), null), BgL_consza2za2("\uEBAClog", 0, null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACput", "\uEBAClst", "\uEBACind", "\uEBACelt", null), BgL_consza2za2("\uEBACappend", BgL_consza2za2("\uEBACtake", "\uEBAClst", "\uEBACind", null), BgL_consza2za2("\uEBAClist", "\uEBACelt", null), BgL_consza2za2("\uEBACdrop", "\uEBAClst", BgL_consza2za2("\uEBAC+", 1, "\uEBACind", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACpermute", "\uEBAClst", null), BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACind", null), BgL_consza2za2("\uEBAClist-ref", "\uEBAClst", "\uEBACind", null), null), BgL_consza2za2("\uEBACrandom-permutation", BgL_consza2za2("\uEBAClength", "\uEBAClst", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-dirichlet-discrete", "\uEBAChyp", null), BgL_consza2za2("\uEBACmake-xrp", BgL_consza2za2("\uEBACquote", "\uEBACdirichlet-discrete", null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstats", "\uEBAChyperparams", "\uEBACargs", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACcounts", BgL_consza2za2("\uEBACmap", "\uEBAC+", "\uEBACstats", "\uEBAChyperparams", null), null), BgL_consza2za2("\uEBACtotal-counts", BgL_consza2za2("\uEBACapply", "\uEBAC+", "\uEBACcounts", null), null), BgL_consza2za2("\uEBACprobs", BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACc", null), BgL_consza2za2("\uEBAC\u002f", "\uEBACc", "\uEBACtotal-counts", null), null), "\uEBACcounts", null), null), BgL_consza2za2("\uEBACvalue", BgL_consza2za2("\uEBACsample-discrete", "\uEBACprobs", null), null), BgL_consza2za2("\uEBACnew-stats", BgL_consza2za2("\uEBACappend", BgL_consza2za2("\uEBACtake", "\uEBACstats", "\uEBACvalue", null), BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBAC+", 1, BgL_consza2za2("\uEBAClist-ref", "\uEBACstats", "\uEBACvalue", null), null), null), BgL_consza2za2("\uEBACdrop", "\uEBACstats", BgL_consza2za2("\uEBAC+", 1, "\uEBACvalue", null), null), null), null), null), BgL_consza2za2("\uEBAClist", "\uEBACvalue", "\uEBACnew-stats", BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBAClist-ref", "\uEBACprobs", "\uEBACvalue", null), null), null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACvalue", "\uEBACstats", "\uEBAChyperparams", "\uEBACargs", null), BgL_consza2za2("\uEBAClist", "\uEBACvalue", BgL_consza2za2("\uEBACappend", BgL_consza2za2("\uEBACtake", "\uEBACstats", "\uEBACvalue", null), BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBAC+", BgL_consza2za2("\uEBAClist-ref", "\uEBACstats", "\uEBACvalue", null), 1, null), null), BgL_consza2za2("\uEBACdrop", "\uEBACstats", BgL_consza2za2("\uEBAC+", 1, "\uEBACvalue", null), null), null), BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBAC+", BgL_consza2za2("\uEBAClist-ref", "\uEBACstats", "\uEBACvalue", null), BgL_consza2za2("\uEBAClist-ref", "\uEBAChyperparams", "\uEBACvalue", null), null), null), BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBAC+", BgL_consza2za2("\uEBACapply", "\uEBAC+", "\uEBACstats", null), BgL_consza2za2("\uEBACapply", "\uEBAC+", "\uEBAChyperparams", null), null), null), null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACvalue", "\uEBACstats", "\uEBAChyperparams", "\uEBACargs", null), BgL_consza2za2("\uEBAClist", "\uEBACvalue", BgL_consza2za2("\uEBACappend", BgL_consza2za2("\uEBACtake", "\uEBACstats", "\uEBACvalue", null), BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAClist-ref", "\uEBACstats", "\uEBACvalue", null), 1, null), null), BgL_consza2za2("\uEBACdrop", "\uEBACstats", BgL_consza2za2("\uEBAC+", 1, "\uEBACvalue", null), null), null), BgL_consza2za2("\uEBAC+", BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBAC+", -1, BgL_consza2za2("\uEBAClist-ref", "\uEBACstats", "\uEBACvalue", null), BgL_consza2za2("\uEBAClist-ref", "\uEBAChyperparams", "\uEBACvalue", null), null), null), BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBAC+", -1, BgL_consza2za2("\uEBACapply", "\uEBAC+", "\uEBACstats", null), BgL_consza2za2("\uEBACapply", "\uEBAC+", "\uEBAChyperparams", null), null), null), null), null), null), null), BgL_consza2za2("\uEBACquote", "\uEBACdirichlet-discrete-scorer", null), BgL_consza2za2("\uEBACmake-list", BgL_consza2za2("\uEBAClength", "\uEBAChyp", null), 0.0, null), "\uEBAChyp", BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstats", "\uEBAChyperparams", "\uEBACargs", null), BgL_consza2za2("\uEBACiota", BgL_consza2za2("\uEBAClength", "\uEBAChyperparams", null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-beta-binomial", "\uEBACalpha", "\uEBACbeta", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACdd", BgL_consza2za2("\uEBACmake-dirichlet-discrete", BgL_consza2za2("\uEBAClist", "\uEBACalpha", "\uEBACbeta", null), null), null), null), BgL_consza2za2("\uEBAClambda", null, BgL_consza2za2("\uEBAC=", BgL_consza2za2("\uEBACdd", null), 1, null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-symmetric-dirichlet-discrete", "\uEBACN", "\uEBAChyp", null), BgL_consza2za2("\uEBACmake-dirichlet-discrete", BgL_consza2za2("\uEBACmake-list", "\uEBACN", "\uEBAChyp", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-CRP", "\uEBACalpha", "\uEBACopt"), BgL_consza2za2("\uEBACmake-xrp", BgL_consza2za2("\uEBACquote", "\uEBACCRP", null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstats", "\uEBAChyperparam", "\uEBACargs", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACcount-map", "\uEBACstats", null), BgL_consza2za2("\uEBACcounts", BgL_consza2za2("\uEBACpair", "\uEBAChyperparam", BgL_consza2za2("\uEBACmap", "\uEBACrest", "\uEBACcount-map", null), null), null), BgL_consza2za2("\uEBACtotal-counts", BgL_consza2za2("\uEBACapply", "\uEBAC+", "\uEBACcounts", null), null), BgL_consza2za2("\uEBACprobs", BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACc", null), BgL_consza2za2("\uEBAC\u002f", "\uEBACc", "\uEBACtotal-counts", null), null), "\uEBACcounts", null), null), BgL_consza2za2("\uEBACtable-index", BgL_consza2za2("\uEBACsample-discrete", "\uEBACprobs", null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACmember", BgL_consza2za2("\uEBACquote", "\uEBACstickemup", null), "\uEBACargs", null), BgL_consza2za2("\uEBAClist", "\uEBACcount-map", "\uEBACcount-map", BgL_consza2za2("\uEBAClist-ref", "\uEBACprobs", "\uEBACtable-index", null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC=", "\uEBACtable-index", 0, null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACtable-symbol", BgL_consza2za2("\uEBACgensym", null), null), BgL_consza2za2("\uEBACnew-count-map", BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACpair", "\uEBACtable-symbol", 1, null), "\uEBACcount-map", null), null), null), BgL_consza2za2("\uEBAClist", "\uEBACtable-symbol", "\uEBACnew-count-map", BgL_consza2za2("\uEBAClist-ref", "\uEBACprobs", "\uEBACtable-index", null), null), null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACtable-symbol", BgL_consza2za2("\uEBACfirst", BgL_consza2za2("\uEBAClist-ref", "\uEBACcount-map", BgL_consza2za2("\uEBAC-", "\uEBACtable-index", 1, null), null), null), null), BgL_consza2za2("\uEBACtable-count", BgL_consza2za2("\uEBAC+", 1, BgL_consza2za2("\uEBACrest", BgL_consza2za2("\uEBAClist-ref", "\uEBACcount-map", BgL_consza2za2("\uEBAC-", "\uEBACtable-index", 1, null), null), null), null), null), BgL_consza2za2("\uEBACnew-count-map", BgL_consza2za2("\uEBACappend", BgL_consza2za2("\uEBACtake", "\uEBACcount-map", BgL_consza2za2("\uEBAC-", "\uEBACtable-index", 1, null), null), BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBACpair", "\uEBACtable-symbol", "\uEBACtable-count", null), null), BgL_consza2za2("\uEBACdrop", "\uEBACcount-map", "\uEBACtable-index", null), null), null), null), BgL_consza2za2("\uEBAClist", "\uEBACtable-symbol", "\uEBACnew-count-map", BgL_consza2za2("\uEBAClist-ref", "\uEBACprobs", "\uEBACtable-index", null), null), null), null), null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACvalue", "\uEBACstats", "\uEBAChyperparam", "\uEBACargs", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACcount-map", "\uEBACstats", null), BgL_consza2za2("\uEBACcounts", BgL_consza2za2("\uEBACpair", "\uEBAChyperparam", BgL_consza2za2("\uEBACmap", "\uEBACrest", "\uEBACcount-map", null), null), null), BgL_consza2za2("\uEBACtotal-counts", BgL_consza2za2("\uEBACapply", "\uEBAC+", "\uEBACcounts", null), null), BgL_consza2za2("\uEBACprobs", BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACc", null), BgL_consza2za2("\uEBAC\u002f", "\uEBACc", "\uEBACtotal-counts", null), null), "\uEBACcounts", null), null), BgL_consza2za2("\uEBACtable-index", BgL_consza2za2("\uEBAClist-index", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACc", null), BgL_consza2za2("\uEBACeq?", "\uEBACvalue", BgL_consza2za2("\uEBACfirst", "\uEBACc", null), null), null), "\uEBACcount-map", null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACeq?", "\uEBACfalse", "\uEBACtable-index", null), BgL_consza2za2("\uEBAClist", "\uEBACvalue", BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACpair", "\uEBACvalue", 1, null), "\uEBACcount-map", null), BgL_consza2za2("\uEBAClist-ref", "\uEBACprobs", 0, null), null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACtable-count", BgL_consza2za2("\uEBACrest", BgL_consza2za2("\uEBAClist-ref", "\uEBACcount-map", "\uEBACtable-index", null), null), null), BgL_consza2za2("\uEBACnew-table-count", BgL_consza2za2("\uEBAC+", "\uEBACtable-count", 1, null), null), BgL_consza2za2("\uEBACnew-count-map", BgL_consza2za2("\uEBACappend", BgL_consza2za2("\uEBACtake", "\uEBACcount-map", "\uEBACtable-index", null), BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBACpair", "\uEBACvalue", "\uEBACnew-table-count", null), null), BgL_consza2za2("\uEBACdrop", "\uEBACcount-map", BgL_consza2za2("\uEBAC+", 1, "\uEBACtable-index", null), null), null), null), null), BgL_consza2za2("\uEBAClist", "\uEBACvalue", "\uEBACnew-count-map", BgL_consza2za2("\uEBAClist-ref", "\uEBACprobs", "\uEBACtable-index", null), null), null), null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACvalue", "\uEBACstats", "\uEBAChyperparam", "\uEBACargs", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACcount-map", "\uEBACstats", null), BgL_consza2za2("\uEBACcounts", BgL_consza2za2("\uEBACmap", "\uEBACrest", "\uEBACcount-map", null), null), BgL_consza2za2("\uEBACtable-index", BgL_consza2za2("\uEBAClist-index", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACc", null), BgL_consza2za2("\uEBACeq?", "\uEBACvalue", BgL_consza2za2("\uEBACfirst", "\uEBACc", null), null), null), "\uEBACcount-map", null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACeq?", "\uEBACfalse", "\uEBACtable-index", null), BgL_consza2za2("\uEBACerror", "\uEBACtable-index", BgL_sc_const_6z00_church_compiler_tmp, null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACtable-count", BgL_consza2za2("\uEBACrest", BgL_consza2za2("\uEBAClist-ref", "\uEBACcount-map", "\uEBACtable-index", null), null), null), BgL_consza2za2("\uEBACnew-table-count", BgL_consza2za2("\uEBAC-", "\uEBACtable-count", 1, null), null), BgL_consza2za2("\uEBACnew-count-map", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC=", 0, "\uEBACnew-table-count", null), BgL_consza2za2("\uEBACappend", BgL_consza2za2("\uEBACtake", "\uEBACcount-map", "\uEBACtable-index", null), BgL_consza2za2("\uEBACdrop", "\uEBACcount-map", BgL_consza2za2("\uEBAC+", 1, "\uEBACtable-index", null), null), null), BgL_consza2za2("\uEBACappend", BgL_consza2za2("\uEBACtake", "\uEBACcount-map", "\uEBACtable-index", null), BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBACpair", "\uEBACvalue", "\uEBACnew-table-count", null), null), BgL_consza2za2("\uEBACdrop", "\uEBACcount-map", BgL_consza2za2("\uEBAC+", 1, "\uEBACtable-index", null), null), null), null), null), null), BgL_consza2za2("\uEBAClist", "\uEBACvalue", "\uEBACnew-count-map", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC=", 0, "\uEBACnew-table-count", null), BgL_consza2za2("\uEBAC\u002f", "\uEBAChyperparam", BgL_consza2za2("\uEBAC+", "\uEBAChyperparam", BgL_consza2za2("\uEBACapply", "\uEBAC+", "\uEBACcounts", null), BgL_consza2za2("\uEBAC-", 1, null), null), null), BgL_consza2za2("\uEBAC\u002f", "\uEBACnew-table-count", BgL_consza2za2("\uEBAC+", "\uEBAChyperparam", BgL_consza2za2("\uEBACapply", "\uEBAC+", "\uEBACcounts", null), BgL_consza2za2("\uEBAC-", 1, null), null), null), null), null), null), null), null), null), BgL_consza2za2("\uEBACquote", "\uEBACCRP-scorer", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACopt", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACfirst", "\uEBACopt", null), null), "\uEBACalpha", BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACquote", null, null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACDPmem", "\uEBACalpha", "\uEBACproc", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACaugmented-proc", BgL_consza2za2("\uEBACmem", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACpart", null), BgL_consza2za2("\uEBACapply", "\uEBACproc", "\uEBACargs", null), null), null), null), BgL_consza2za2("\uEBACcrps", BgL_consza2za2("\uEBACmem", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", null), BgL_consza2za2("\uEBACmake-CRP", "\uEBACalpha", null), null), null), null), null), BgL_consza2za2("\uEBAClambda", "\uEBACargsin", BgL_consza2za2("\uEBACaugmented-proc", "\uEBACargsin", BgL_consza2za2(BgL_consza2za2("\uEBACcrps", "\uEBACargsin", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACrobbable-DPmem", "\uEBACalpha", "\uEBACproc", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACaugmented-proc", BgL_consza2za2("\uEBACmem", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", "\uEBACpart", null), BgL_consza2za2("\uEBACapply", "\uEBACproc", "\uEBACargs", null), null), null), null), BgL_consza2za2("\uEBACcrps", BgL_consza2za2("\uEBACmem", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACargs", null), BgL_consza2za2("\uEBACmake-CRP", "\uEBACalpha", null), null), null), null), null), BgL_consza2za2("\uEBAClambda", "\uEBACargsin", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACmember", BgL_consza2za2("\uEBACquote", "\uEBACstickemup", null), "\uEBACargsin", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACargs", BgL_consza2za2("\uEBACremove", BgL_consza2za2("\uEBACquote", "\uEBACstickemup", null), "\uEBACargsin", null), null), null), BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACtable", null), BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBACaugmented-proc", "\uEBACargs", BgL_consza2za2("\uEBACcar", "\uEBACtable", null), null), BgL_consza2za2("\uEBACcdr", "\uEBACtable", null), null), null), BgL_consza2za2(BgL_consza2za2("\uEBACcrps", "\uEBACargs", null), BgL_consza2za2("\uEBACquote", "\uEBACstickemup", null), null), null), null), BgL_consza2za2("\uEBACaugmented-proc", "\uEBACargsin", BgL_consza2za2(BgL_consza2za2("\uEBACcrps", "\uEBACargsin", null), null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBAClog-flip*", BgL_consza2za2("\uEBAClambda", "\uEBACw", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACw", null), BgL_consza2za2("\uEBAC<", BgL_consza2za2("\uEBACrandom-real", null), 0.5, null), BgL_consza2za2("\uEBAC<", BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBACrandom-real", null), null), BgL_consza2za2("\uEBACcar", "\uEBACw", null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACuniform-draw*", "\uEBAClst", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBAClst", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBAClist-ref", "\uEBAClst", BgL_consza2za2("\uEBACrandom-integer", BgL_consza2za2("\uEBAClength", "\uEBAClst", null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACproposable-xrps", "\uEBACstate", "\uEBACproposable?", null), BgL_consza2za2("\uEBACfilter", "\uEBACproposable?", BgL_consza2za2("\uEBACaddbox->values", BgL_consza2za2("\uEBACmcmc-state->xrp-draws", "\uEBACstate", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACselective-proposal-distribution", "\uEBACstate", "\uEBACnormal-form-proc", "\uEBACproposable?", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACaddbox-empty?", BgL_consza2za2("\uEBACmcmc-state->xrp-draws", "\uEBACstate", null), null), BgL_consza2za2("\uEBAClist", 0.0, "\uEBACstate", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACproposal-xrps", BgL_consza2za2("\uEBACproposable-xrps", "\uEBACstate", "\uEBACproposable?", null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACproposal-xrps", null), BgL_consza2za2("\uEBAClist", 0.0, "\uEBACstate", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACchosen-xrp", BgL_consza2za2("\uEBACuniform-draw*", "\uEBACproposal-xrps", null), null), BgL_consza2za2("\uEBACret1", BgL_consza2za2(BgL_consza2za2("\uEBACxrp-draw-proposer", "\uEBACchosen-xrp", null), "\uEBACstate", null), null), BgL_consza2za2("\uEBACproposed-val", BgL_consza2za2("\uEBACfirst", "\uEBACret1", null), null), BgL_consza2za2("\uEBACproposal-fw-score", BgL_consza2za2("\uEBACsecond", "\uEBACret1", null), null), BgL_consza2za2("\uEBACproposal-bw-score", BgL_consza2za2("\uEBACthird", "\uEBACret1", null), null), BgL_consza2za2("\uEBACret2", BgL_consza2za2("\uEBACcounterfactual-update", "\uEBACstate", "\uEBACnormal-form-proc", BgL_consza2za2("\uEBACpair", "\uEBACchosen-xrp", "\uEBACproposed-val", null), null), null), BgL_consza2za2("\uEBACproposal-state", BgL_consza2za2("\uEBACfirst", "\uEBACret2", null), null), BgL_consza2za2("\uEBACcd-bw\u002ffw", BgL_consza2za2("\uEBACsecond", "\uEBACret2", null), null), BgL_consza2za2("\uEBACind-fw", BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBAClength", "\uEBACproposal-xrps", null), null), null), null), BgL_consza2za2("\uEBACind-bw", BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBAClength", BgL_consza2za2("\uEBACproposable-xrps", "\uEBACproposal-state", "\uEBACproposable?", null), null), null), null), null), null), BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBAC+", BgL_consza2za2("\uEBAC-", "\uEBACproposal-bw-score", "\uEBACproposal-fw-score", null), "\uEBACcd-bw\u002ffw", BgL_consza2za2("\uEBAC-", "\uEBACind-bw", "\uEBACind-fw", null), null), "\uEBACproposal-state", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACbasic-proposal-distribution", "\uEBACstate", "\uEBACnormal-form-proc", null), BgL_consza2za2("\uEBACselective-proposal-distribution", "\uEBACstate", "\uEBACnormal-form-proc", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACxrp-draw", null), "\uEBACtrue", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACrejection-initializer", "\uEBACnormal-form-proc", null), BgL_consza2za2("\uEBAClet", "\uEBACloop", null, BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACrejectioninit-proposal-state", BgL_consza2za2("\uEBACfirst", BgL_consza2za2("\uEBACcounterfactual-update", BgL_consza2za2("\uEBACmake-initial-mcmc-state", null), "\uEBACnormal-form-proc", null), null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC=", "\uEBACminus-infinity", BgL_consza2za2("\uEBACmcmc-state->score", "\uEBACrejectioninit-proposal-state", null), null), BgL_consza2za2("\uEBACloop", null), "\uEBACrejectioninit-proposal-state", null), null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACverbose-init", false, null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACannealing-initializer", "\uEBACrej-steps", "\uEBACtemps:low->high", "\uEBACtemps->nfqp", "\uEBACrejuv-kernel-builder"), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACrejuv-kernel-builder", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACrejuv-kernel-builder", null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACnfqp", null), BgL_consza2za2("\uEBACbasic-repeat-kernel", "\uEBACrej-steps", "\uEBACnfqp", null), null), BgL_consza2za2("\uEBACfirst", "\uEBACrejuv-kernel-builder", null), null), null), BgL_consza2za2("\uEBACtemps:high->low", BgL_consza2za2("\uEBACreverse", "\uEBACtemps:low->high", null), null), BgL_consza2za2("\uEBACnormal-form-proc", BgL_consza2za2("\uEBACapply", "\uEBACtemps->nfqp", BgL_consza2za2("\uEBACfirst", "\uEBACtemps:high->low", null), null), null), BgL_consza2za2("\uEBACinitial-state", BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACreset-store-xrp-draws", null), BgL_consza2za2("\uEBACrejection-initializer", "\uEBACnormal-form-proc", null), null), null), null), BgL_consza2za2("\uEBAClet", "\uEBACnext-temp", BgL_consza2za2(BgL_consza2za2("\uEBACtemps", BgL_consza2za2("\uEBACrest", "\uEBACtemps:high->low", null), null), BgL_consza2za2("\uEBACmcmc-state", "\uEBACinitial-state", null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC=", "\uEBACminus-infinity", BgL_consza2za2("\uEBACmcmc-state->score", "\uEBACmcmc-state", null), null), BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACwhen", "\uEBACverbose-init", BgL_consza2za2("\uEBACdisplay", BgL_sc_const_7z00_church_compiler_tmp, null), null), BgL_consza2za2("\uEBACannealing-initializer", "\uEBACrej-steps", "\uEBACtemps:low->high", "\uEBACtemps->nfqp", "\uEBACrejuv-kernel-builder", null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACtemps", null), BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACwhen", "\uEBACverbose-init", BgL_consza2za2("\uEBACdisplay", BgL_sc_const_8z00_church_compiler_tmp, null), null), "\uEBACmcmc-state", null), BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACwhen", "\uEBACverbose-init", BgL_consza2za2("\uEBACfor-each", "\uEBACdisplay", BgL_consza2za2("\uEBAClist", BgL_sc_const_16z00_church_compiler_tmp, BgL_sc_const_2z00_church_compiler_tmp, BgL_consza2za2("\uEBAClength", "\uEBACtemps", null), BgL_sc_const_18z00_church_compiler_tmp, BgL_consza2za2("\uEBACfirst", "\uEBACtemps", null), "\n", null), null), null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACnfqp", BgL_consza2za2("\uEBACapply", "\uEBACtemps->nfqp", BgL_consza2za2("\uEBACfirst", "\uEBACtemps", null), null), null), BgL_consza2za2("\uEBACrescored-state", BgL_consza2za2("\uEBACfirst", BgL_consza2za2("\uEBACcounterfactual-update", "\uEBACmcmc-state", "\uEBACnfqp", null), null), null), BgL_consza2za2("\uEBACkernel", BgL_consza2za2("\uEBACrejuv-kernel-builder", "\uEBACnfqp", null), null), BgL_consza2za2("\uEBACrej-state", BgL_consza2za2("\uEBACkernel", "\uEBACrescored-state", null), null), null), BgL_consza2za2("\uEBACnext-temp", BgL_consza2za2("\uEBACrest", "\uEBACtemps", null), "\uEBACrej-state", null), null), null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-mh-kernel", "\uEBACproposal-distribution", "\uEBACscorer", null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstate", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACret", BgL_consza2za2("\uEBACproposal-distribution", "\uEBACstate", null), null), BgL_consza2za2("\uEBACbw\u002ffw", BgL_consza2za2("\uEBACfirst", "\uEBACret", null), null), BgL_consza2za2("\uEBACproposal-state", BgL_consza2za2("\uEBACsecond", "\uEBACret", null), null), BgL_consza2za2("\uEBACold-p", BgL_consza2za2("\uEBACscorer", "\uEBACstate", null), null), BgL_consza2za2("\uEBACnew-p", BgL_consza2za2("\uEBACscorer", "\uEBACproposal-state", null), null), BgL_consza2za2("\uEBACaccept", BgL_consza2za2("\uEBAClog-flip*", BgL_consza2za2("\uEBACmin", 0.0, BgL_consza2za2("\uEBAC+", BgL_consza2za2("\uEBAC-", "\uEBACnew-p", "\uEBACold-p", null), "\uEBACbw\u002ffw", null), null), null), null), BgL_consza2za2("\uEBACdummy", BgL_consza2za2("\uEBACreset-store-xrp-draws", null), null), null), BgL_consza2za2("\uEBACif", "\uEBACaccept", "\uEBACproposal-state", "\uEBACstate", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACcycle-kernel", "\uEBACkernels"), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstate", null), BgL_consza2za2("\uEBACfold", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACk", "\uEBACs", null), BgL_consza2za2("\uEBACk", "\uEBACs", null), null), "\uEBACstate", "\uEBACkernels", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACrepeat-kernel", "\uEBACsteps", "\uEBACkernel", null), BgL_consza2za2("\uEBACapply", "\uEBACcycle-kernel", BgL_consza2za2("\uEBACmake-list", "\uEBACsteps", "\uEBACkernel", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACbasic-repeat-kernel", "\uEBACsteps", "\uEBACnfqp", null), BgL_consza2za2("\uEBACrepeat-kernel", "\uEBACsteps", BgL_consza2za2("\uEBACmake-mh-kernel", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstate", null), BgL_consza2za2("\uEBACbasic-proposal-distribution", "\uEBACstate", "\uEBACnfqp", null), null), "\uEBACmcmc-state->score", null), null), null), BgL_consza2za2("\uEBACdefine", "\uEBACinference-timing", false, null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACrepeated-mcmc-query-core", "\uEBACinitializer", "\uEBACkernel", "\uEBACnum-samples", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACinit-state", BgL_consza2za2("\uEBACinitializer", null), null), null), BgL_consza2za2("\uEBACmcmc-loop", "\uEBACkernel", "\uEBACinit-state", "\uEBACnum-samples", BgL_consza2za2("\uEBACquote", null, null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmcmc-loop", "\uEBACkernel", "\uEBACstate", "\uEBACsamples-left", "\uEBACsamples", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC<", "\uEBACsamples-left", 1, null), BgL_consza2za2("\uEBACreverse", "\uEBACsamples", null), BgL_consza2za2("\uEBACmcmc-loop", "\uEBACkernel", BgL_consza2za2("\uEBACkernel", "\uEBACstate", null), BgL_consza2za2("\uEBAC-", "\uEBACsamples-left", 1, null), BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACmcmc-state->query-value", "\uEBACstate", null), "\uEBACsamples", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmh-query", "\uEBACsamples", "\uEBAClag", "\uEBACnormal-form-proc", null), BgL_consza2za2("\uEBACrepeated-mcmc-query-core", BgL_consza2za2("\uEBAClambda", null, BgL_consza2za2("\uEBACrejection-initializer", "\uEBACnormal-form-proc", null), null), BgL_consza2za2("\uEBACbasic-repeat-kernel", "\uEBAClag", "\uEBACnormal-form-proc", null), "\uEBACsamples", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmh-query\u002fannealed-init", "\uEBACtemps", "\uEBACsamples", "\uEBAClag", "\uEBACrej-steps", "\uEBACtemps->nfqp", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACnormal-form-proc", BgL_consza2za2("\uEBACapply", "\uEBACtemps->nfqp", BgL_consza2za2("\uEBACfirst", "\uEBACtemps", null), null), null), null), BgL_consza2za2("\uEBACrepeated-mcmc-query-core", BgL_consza2za2("\uEBAClambda", null, BgL_consza2za2("\uEBACannealing-initializer", "\uEBACrej-steps", "\uEBACtemps", "\uEBACtemps->nfqp", null), null), BgL_consza2za2("\uEBACbasic-repeat-kernel", "\uEBAClag", "\uEBACnormal-form-proc", null), "\uEBACsamples", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-gradient-step", "\uEBACstep-size", "\uEBACnfqp", null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstate", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACgrad", BgL_consza2za2("\uEBACmcmc-state->gradient", "\uEBACstate", null), null), BgL_consza2za2("\uEBACxrp-draws", BgL_consza2za2("\uEBACmcmc-state->xrp-draws", "\uEBACstate", null), null), BgL_consza2za2("\uEBACxrp-changes", BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACgv", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACxrp-draw", BgL_consza2za2("\uEBACfirst", BgL_consza2za2("\uEBACpull-outof-addbox", "\uEBACxrp-draws", BgL_consza2za2("\uEBACfirst", "\uEBACgv", null), null), null), null), null), BgL_consza2za2("\uEBACpair", "\uEBACxrp-draw", BgL_consza2za2("\uEBAC+", BgL_consza2za2("\uEBACxrp-draw-value", "\uEBACxrp-draw", null), BgL_consza2za2("\uEBAC*", "\uEBACstep-size", BgL_consza2za2("\uEBACsigmoid", BgL_consza2za2("\uEBACrest", "\uEBACgv", null), null), null), null), null), null), null), "\uEBACgrad", null), null), BgL_consza2za2("\uEBACproposal", BgL_consza2za2("\uEBACapply", "\uEBACcounterfactual-update", BgL_consza2za2("\uEBACpair", "\uEBACstate", BgL_consza2za2("\uEBACpair", "\uEBACnfqp", "\uEBACxrp-changes", null), null), null), null), null), BgL_consza2za2("\uEBACfirst", "\uEBACproposal", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACsigmoid", "\uEBACx", null), BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBAC\u002f", 1, BgL_consza2za2("\uEBAC+", 1, BgL_consza2za2("\uEBACexp", BgL_consza2za2("\uEBAC-", "\uEBACx", null), null), null), null), 0.5, null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACgradient-ascent", "\uEBACsteps", "\uEBACstep-size", "\uEBACnfqp", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACgstep", BgL_consza2za2("\uEBACmake-gradient-step", "\uEBACstep-size", "\uEBACnfqp", null), null), null), BgL_consza2za2("\uEBAClet", "\uEBACloop", BgL_consza2za2(BgL_consza2za2("\uEBACstate", BgL_consza2za2("\uEBACrejection-initializer", "\uEBACnfqp", null), null), BgL_consza2za2("\uEBACtrail", BgL_consza2za2("\uEBACquote", null, null), null), BgL_consza2za2("\uEBACsteps-remaining", "\uEBACsteps", null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC<", "\uEBACsteps-remaining", 1, null), BgL_consza2za2("\uEBACreverse", "\uEBACtrail", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACnewstate", BgL_consza2za2("\uEBACgstep", "\uEBACstate", null), null), null), BgL_consza2za2("\uEBACloop", "\uEBACnewstate", BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACmcmc-state->query-value", "\uEBACnewstate", null), "\uEBACtrail", null), BgL_consza2za2("\uEBAC-", "\uEBACsteps-remaining", 1, null), null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACannealed-gradient-ascent", "\uEBACtemps:high->low", "\uEBACstep-size", "\uEBACtemps->nfqp", null), BgL_consza2za2("\uEBAClet", "\uEBACloop", BgL_consza2za2(BgL_consza2za2("\uEBACstate", BgL_consza2za2("\uEBACrejection-initializer", BgL_consza2za2("\uEBACapply", "\uEBACtemps->nfqp", BgL_consza2za2("\uEBACfirst", "\uEBACtemps:high->low", null), null), null), null), BgL_consza2za2("\uEBACtrail", BgL_consza2za2("\uEBACquote", null, null), null), BgL_consza2za2("\uEBACtemps", "\uEBACtemps:high->low", null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACtemps", null), BgL_consza2za2("\uEBACreverse", "\uEBACtrail", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACnewstate", BgL_consza2za2(BgL_consza2za2("\uEBACmake-gradient-step", "\uEBACstep-size", BgL_consza2za2("\uEBACapply", "\uEBACtemps->nfqp", BgL_consza2za2("\uEBACfirst", "\uEBACtemps", null), null), null), "\uEBACstate", null), null), null), BgL_consza2za2("\uEBACdisplay", BgL_sc_const_12z00_church_compiler_tmp, null), BgL_consza2za2("\uEBACdisplay", BgL_consza2za2("\uEBACfirst", "\uEBACtemps", null), null), BgL_consza2za2("\uEBACnewline", null), BgL_consza2za2("\uEBACloop", "\uEBACnewstate", BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACmcmc-state->query-value", "\uEBACnewstate", null), "\uEBACtrail", null), BgL_consza2za2("\uEBACrest", "\uEBACtemps", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACcontinuous-xrp-draw?", "\uEBACxrp-draw", null), BgL_consza2za2("\uEBACtape?", BgL_consza2za2("\uEBACxrp-draw-value", "\uEBACxrp-draw", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACdiscrete-xrp-draw?", "\uEBACxrp-draw", null), BgL_consza2za2("\uEBACnot", BgL_consza2za2("\uEBACcontinuous-xrp-draw?", "\uEBACxrp-draw", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACalist-map", "\uEBACproc", "\uEBACalist", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACalist", null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACfst", BgL_consza2za2("\uEBACfirst", "\uEBACalist", null), null), null), BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACproc", BgL_consza2za2("\uEBACfirst", "\uEBACfst", null), BgL_consza2za2("\uEBACrest", "\uEBACfst", null), null), BgL_consza2za2("\uEBACalist-map", "\uEBACproc", BgL_consza2za2("\uEBACrest", "\uEBACalist", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACorder-values", "\uEBACalist", "\uEBACorder", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACtrie", BgL_consza2za2("\uEBACalist->trie", "\uEBACalist", null), null), null), BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACkey", null), BgL_consza2za2("\uEBACfirst", BgL_consza2za2("\uEBACtrie-pop", "\uEBACtrie", "\uEBACkey", null), null), null), "\uEBACorder", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACscalar*", "\uEBACsc", "\uEBAClst", null), BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACx", null), BgL_consza2za2("\uEBAC*", "\uEBACsc", "\uEBACx", null), null), "\uEBAClst", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBAClist+", "\uEBACa", "\uEBACb", null), BgL_consza2za2("\uEBACmap", "\uEBAC+", "\uEBACa", "\uEBACb", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBAClist*", "\uEBACa", "\uEBACb", null), BgL_consza2za2("\uEBACmap", "\uEBAC*", "\uEBACa", "\uEBACb", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACincrement-state", "\uEBACstate", "\uEBACnfqp", "\uEBACincrements", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACxrp-draws", BgL_consza2za2("\uEBACmcmc-state->xrp-draws", "\uEBACstate", null), null), BgL_consza2za2("\uEBACxrp-changes", BgL_consza2za2("\uEBACalist-map", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACaddr", "\uEBACinc", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACxrp-draw", BgL_consza2za2("\uEBACfirst", BgL_consza2za2("\uEBACpull-outof-addbox", "\uEBACxrp-draws", "\uEBACaddr", null), null), null), null), BgL_consza2za2("\uEBACpair", "\uEBACxrp-draw", BgL_consza2za2("\uEBAC+", BgL_consza2za2("\uEBACxrp-draw-value", "\uEBACxrp-draw", null), "\uEBACinc", null), null), null), null), "\uEBACincrements", null), null), null), BgL_consza2za2("\uEBACapply", "\uEBACcounterfactual-update", BgL_consza2za2("\uEBACpair", "\uEBACstate", BgL_consza2za2("\uEBACpair", "\uEBACnfqp", "\uEBACxrp-changes", null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACleapfrog-step", "\uEBACnfqp", "\uEBACq", "\uEBACa:p", "\uEBACm-inv", "\uEBACdt", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACaddresses", BgL_consza2za2("\uEBACmap", "\uEBACfirst", "\uEBACa:p", null), null), BgL_consza2za2("\uEBACp", BgL_consza2za2("\uEBACmap", "\uEBACrest", "\uEBACa:p", null), null), BgL_consza2za2("\uEBACq-gradient", BgL_consza2za2("\uEBACorder-values", BgL_consza2za2("\uEBACmcmc-state->gradient", "\uEBACq", null), "\uEBACaddresses", null), null), BgL_consza2za2("\uEBACp-half", BgL_consza2za2("\uEBAClist+", "\uEBACp", BgL_consza2za2("\uEBACscalar*", BgL_consza2za2("\uEBAC\u002f", "\uEBACdt", 2.0, null), "\uEBACq-gradient", null), null), null), BgL_consza2za2("\uEBACincrements", BgL_consza2za2("\uEBACscalar*", "\uEBACdt", BgL_consza2za2("\uEBAClist*", "\uEBACm-inv", "\uEBACp-half", null), null), null), BgL_consza2za2("\uEBACq-next\u002fbwfw", BgL_consza2za2("\uEBACincrement-state", "\uEBACq", "\uEBACnfqp", BgL_consza2za2("\uEBACmap", "\uEBACpair", "\uEBACaddresses", "\uEBACincrements", null), null), null), BgL_consza2za2("\uEBACq-next-gradient", BgL_consza2za2("\uEBACorder-values", BgL_consza2za2("\uEBACmcmc-state->gradient", BgL_consza2za2("\uEBACfirst", "\uEBACq-next\u002fbwfw", null), null), "\uEBACaddresses", null), null), BgL_consza2za2("\uEBACp-next", BgL_consza2za2("\uEBAClist+", "\uEBACp-half", BgL_consza2za2("\uEBACscalar*", BgL_consza2za2("\uEBAC\u002f", "\uEBACdt", 2.0, null), "\uEBACq-next-gradient", null), null), null), null), BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBACfirst", "\uEBACq-next\u002fbwfw", null), BgL_consza2za2("\uEBACmap", "\uEBACpair", "\uEBACaddresses", "\uEBACp-next", null), BgL_consza2za2("\uEBACsecond", "\uEBACq-next\u002fbwfw", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACleapfrog", "\uEBACnfqp", "\uEBACq", "\uEBACa:p", "\uEBACdt", "\uEBACsteps", "\uEBACmaybe-bw\u002ffw"), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACbw-fw", BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACnull?", "\uEBACmaybe-bw\u002ffw", null), 0.0, BgL_consza2za2("\uEBACfirst", "\uEBACmaybe-bw\u002ffw", null), null), null), BgL_consza2za2("\uEBACm-inv", BgL_consza2za2("\uEBACmake-list", BgL_consza2za2("\uEBAClength", "\uEBACa:p", null), 1.0, null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBAC=", "\uEBACsteps", 0, null), BgL_consza2za2("\uEBAClist", "\uEBACq", "\uEBACa:p", "\uEBACbw-fw", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACqn\u002fpn\u002fbwfw+", BgL_consza2za2("\uEBACleapfrog-step", "\uEBACnfqp", "\uEBACq", "\uEBACa:p", "\uEBACm-inv", "\uEBACdt", null), null), null), BgL_consza2za2("\uEBACleapfrog", "\uEBACnfqp", BgL_consza2za2("\uEBACfirst", "\uEBACqn\u002fpn\u002fbwfw+", null), BgL_consza2za2("\uEBACsecond", "\uEBACqn\u002fpn\u002fbwfw+", null), "\uEBACdt", BgL_consza2za2("\uEBAC-", "\uEBACsteps", 1, null), BgL_consza2za2("\uEBAC+", "\uEBACbw-fw", BgL_consza2za2("\uEBACthird", "\uEBACqn\u002fpn\u002fbwfw+", null), null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-leapfrog-proposal", "\uEBACnfqp", "\uEBACdt", "\uEBACsteps", null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACq-p", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACq\u002fp\u002fbwfw", BgL_consza2za2("\uEBACleapfrog", "\uEBACnfqp", BgL_consza2za2("\uEBACfirst", "\uEBACq-p", null), BgL_consza2za2("\uEBACsecond", "\uEBACq-p", null), "\uEBACdt", "\uEBACsteps", null), null), null), BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBACthird", "\uEBACq\u002fp\u002fbwfw", null), BgL_consza2za2("\uEBAClist", BgL_consza2za2("\uEBACfirst", "\uEBACq\u002fp\u002fbwfw", null), BgL_consza2za2("\uEBACsecond", "\uEBACq\u002fp\u002fbwfw", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBAChamiltonian-score", "\uEBACq-p", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACq", BgL_consza2za2("\uEBACfirst", "\uEBACq-p", null), null), BgL_consza2za2("\uEBACa:p", BgL_consza2za2("\uEBACsecond", "\uEBACq-p", null), null), null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACscore", BgL_consza2za2("\uEBACmcmc-state->score", "\uEBACq", null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACequal?", "\uEBACscore", "\uEBACminus-infinity", null), "\uEBACminus-infinity", BgL_consza2za2("\uEBAC+", "\uEBACscore", BgL_consza2za2("\uEBAC*", -0.5, BgL_consza2za2("\uEBACapply", "\uEBAC+", BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACx", null), BgL_consza2za2("\uEBACexpt", "\uEBACx", 2, null), null), BgL_consza2za2("\uEBACmap", "\uEBACrest", "\uEBACa:p", null), null), null), null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-leapfrog-kernel", "\uEBACnfqp", "\uEBACdt", "\uEBACleapfrog-steps", null), BgL_consza2za2("\uEBACmake-mh-kernel", BgL_consza2za2("\uEBACmake-leapfrog-proposal", "\uEBACnfqp", "\uEBACdt", "\uEBACleapfrog-steps", null), "\uEBAChamiltonian-score", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmomentum-prior", "\uEBACstate", null), BgL_consza2za2("\uEBACfold", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACdraw", "\uEBACmomenta", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACcontinuous-xrp-draw?", "\uEBACdraw", null), BgL_consza2za2("\uEBACpair", BgL_consza2za2("\uEBACsample-gaussian", 0.0, 1.0, null), "\uEBACmomenta", null), "\uEBACmomenta", null), null), BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACaddbox->values", BgL_consza2za2("\uEBACmcmc-state->xrp-draws", "\uEBACstate", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACmake-hmc-kernel", "\uEBACnfqp", "\uEBACdt", "\uEBACleapfrog-steps", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACleapfrog-kernel", BgL_consza2za2("\uEBACmake-leapfrog-kernel", "\uEBACnfqp", "\uEBACdt", "\uEBACleapfrog-steps", null), null), null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstate", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACmomenta", BgL_consza2za2("\uEBACmomentum-prior", "\uEBACstate", null), null), null), BgL_consza2za2("\uEBACfirst", BgL_consza2za2("\uEBACleapfrog-kernel", BgL_consza2za2("\uEBAClist", "\uEBACstate", "\uEBACmomenta", null), null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBAChmc-query", "\uEBACnum-samples", "\uEBAClag", "\uEBACdt", "\uEBACleapfrog-steps", "\uEBACnfqp", null), BgL_consza2za2("\uEBACrepeated-mcmc-query-core", BgL_consza2za2("\uEBAClambda", null, BgL_consza2za2("\uEBACrejection-initializer", "\uEBACnfqp", null), null), BgL_consza2za2("\uEBACrepeat-kernel", "\uEBAClag", BgL_consza2za2("\uEBACcycle-kernel", BgL_consza2za2("\uEBACmake-hmc-kernel", "\uEBACnfqp", "\uEBACdt", "\uEBACleapfrog-steps", null), BgL_consza2za2("\uEBACmake-mh-kernel", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstate", null), BgL_consza2za2("\uEBACselective-proposal-distribution", "\uEBACstate", "\uEBACnfqp", "\uEBACdiscrete-xrp-draw?", null), null), "\uEBACmcmc-state->score", null), null), null), "\uEBACnum-samples", null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBAChmc-query\u002fannealed-init", "\uEBACtemps", "\uEBACinit-step-size", "\uEBACnum-samples", "\uEBAClag", "\uEBACdt", "\uEBACleapfrog-steps", "\uEBACtemps->nfqp", null), BgL_consza2za2("\uEBAClet", BgL_consza2za2(BgL_consza2za2("\uEBACnfqp", BgL_consza2za2("\uEBACapply", "\uEBACtemps->nfqp", BgL_consza2za2("\uEBACfirst", "\uEBACtemps", null), null), null), null), BgL_consza2za2("\uEBACrepeated-mcmc-query-core", BgL_consza2za2("\uEBAClambda", null, BgL_consza2za2("\uEBACannealing-initializer", 1, "\uEBACtemps", "\uEBACtemps->nfqp", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACnfqp", null), BgL_consza2za2("\uEBACmake-gradient-step", "\uEBACinit-step-size", "\uEBACnfqp", null), null), null), null), BgL_consza2za2("\uEBACrepeat-kernel", "\uEBAClag", BgL_consza2za2("\uEBACcycle-kernel", BgL_consza2za2("\uEBACmake-hmc-kernel", "\uEBACnfqp", "\uEBACdt", "\uEBACleapfrog-steps", null), BgL_consza2za2("\uEBACmake-mh-kernel", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstate", null), BgL_consza2za2("\uEBACselective-proposal-distribution", "\uEBACstate", "\uEBACnfqp", "\uEBACdiscrete-xrp-draw?", null), null), "\uEBACmcmc-state->score", null), null), null), "\uEBACnum-samples", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACpsmc-query", "\uEBACtemps", "\uEBACpopsize", "\uEBAClag", "\uEBACtemps->nfqp", null), BgL_consza2za2("\uEBACmap", "\uEBACmcmc-state->query-value", BgL_consza2za2("\uEBACsmc-core", "\uEBACtemps", "\uEBACpopsize", "\uEBAClag", "\uEBACtemps->nfqp", null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACsmc-core", "\uEBACtemps", "\uEBACpopsize", "\uEBAClag", "\uEBACtemps->nfqp", null), BgL_consza2za2("\uEBAClet", "\uEBACsmc", BgL_consza2za2(BgL_consza2za2("\uEBACtemps", "\uEBACtemps", null), BgL_consza2za2("\uEBACpopulation", BgL_consza2za2("\uEBACrepeat", "\uEBACpopsize", BgL_consza2za2("\uEBAClambda", null, BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACreset-store-xrp-draws", null), BgL_consza2za2("\uEBACrejection-initializer", BgL_consza2za2("\uEBACapply", "\uEBACtemps->nfqp", BgL_consza2za2("\uEBACfirst", "\uEBACtemps", null), null), null), null), null), null), null), BgL_consza2za2("\uEBACweights", BgL_consza2za2("\uEBACmake-list", "\uEBACpopsize", 0, null), null), null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACrets", BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstate", null), BgL_consza2za2("\uEBACcounterfactual-update", "\uEBACstate", BgL_consza2za2("\uEBACapply", "\uEBACtemps->nfqp", BgL_consza2za2("\uEBACfirst", "\uEBACtemps", null), null), null), null), "\uEBACpopulation", null), null), BgL_consza2za2("\uEBACnew-population", BgL_consza2za2("\uEBACmap", "\uEBACfirst", "\uEBACrets", null), null), BgL_consza2za2("\uEBACcd-bw\u002ffw", BgL_consza2za2("\uEBACmap", "\uEBACsecond", "\uEBACrets", null), null), BgL_consza2za2("\uEBACweights", BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACold-weight", "\uEBACold-state", "\uEBACnew-state", "\uEBACcd-bw\u002ffw", null), BgL_consza2za2("\uEBAC+", "\uEBACold-weight", BgL_consza2za2("\uEBAC-", BgL_consza2za2("\uEBACmcmc-state->score", "\uEBACnew-state", null), BgL_consza2za2("\uEBACmcmc-state->score", "\uEBACold-state", null), null), "\uEBACcd-bw\u002ffw", null), null), "\uEBACweights", "\uEBACpopulation", "\uEBACnew-population", "\uEBACcd-bw\u002ffw", null), null), BgL_consza2za2("\uEBACresample-distribution", BgL_consza2za2("\uEBACmap", "\uEBACexp", BgL_consza2za2("\uEBAClog-normalize", "\uEBACweights", null), null), null), BgL_consza2za2("\uEBACcollapse?", BgL_consza2za2("\uEBACnan?", BgL_consza2za2("\uEBACfirst", "\uEBACresample-distribution", null), null), null), BgL_consza2za2("\uEBACnew2-population", BgL_consza2za2("\uEBACif", "\uEBACcollapse?", BgL_consza2za2("\uEBACquote", null, null), BgL_consza2za2("\uEBACrepeat", "\uEBACpopsize", BgL_consza2za2("\uEBAClambda", null, BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACreset-store-xrp-draws", null), BgL_consza2za2("\uEBACmultinomial", "\uEBACnew-population", "\uEBACresample-distribution", null), null), null), null), null), null), BgL_consza2za2("\uEBACweights", BgL_consza2za2("\uEBACmake-list", "\uEBACpopsize", 0, null), null), BgL_consza2za2("\uEBACkernel", BgL_consza2za2("\uEBACrepeat-kernel", "\uEBAClag", BgL_consza2za2("\uEBACmake-mh-kernel", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACstate", null), BgL_consza2za2("\uEBACbasic-proposal-distribution", "\uEBACstate", BgL_consza2za2("\uEBACapply", "\uEBACtemps->nfqp", BgL_consza2za2("\uEBACfirst", "\uEBACtemps", null), null), null), null), "\uEBACmcmc-state->score", null), null), null), BgL_consza2za2("\uEBACnew3-population", BgL_consza2za2("\uEBACmap", "\uEBACkernel", "\uEBACnew2-population", null), null), null), BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACx", "\uEBACy", null), BgL_consza2za2("\uEBACbegin", BgL_consza2za2("\uEBACdisplay", "  ", null), BgL_consza2za2("\uEBACdisplay", "\uEBACx", null), BgL_consza2za2("\uEBACdisplay", "  ", null), BgL_consza2za2("\uEBACdisplay", "\uEBACy", null), BgL_consza2za2("\uEBACdisplay", "\n", null), null), null), BgL_consza2za2("\uEBACmap", "\uEBACmcmc-state->query-value", "\uEBACnew3-population", null), BgL_consza2za2("\uEBACmap", "\uEBACmcmc-state->score", "\uEBACnew3-population", null), null), BgL_consza2za2("\uEBACdisplay", "\n", null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACor", "\uEBACcollapse?", BgL_consza2za2("\uEBACnull?", BgL_consza2za2("\uEBACrest", "\uEBACtemps", null), null), null), "\uEBACnew3-population", BgL_consza2za2("\uEBACsmc", BgL_consza2za2("\uEBACrest", "\uEBACtemps", null), "\uEBACnew3-population", "\uEBACweights", null), null), null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBAClog-sum-exp", "\uEBAClog-vals"), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACmax-log-val", BgL_consza2za2("\uEBACapply", "\uEBACmax", "\uEBAClog-vals", null), null), null), BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACequal?", "\uEBACmax-log-val", "\uEBACminus-infinity", null), "\uEBACminus-infinity", BgL_consza2za2("\uEBAC+", BgL_consza2za2("\uEBAClog", BgL_consza2za2("\uEBACexact->inexact", BgL_consza2za2("\uEBACsum", BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACval", null), BgL_consza2za2("\uEBACexp", BgL_consza2za2("\uEBAC-", "\uEBACval", "\uEBACmax-log-val", null), null), null), "\uEBAClog-vals", null), null), null), null), "\uEBACmax-log-val", null), null), null), null), BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBAClog-normalize", "\uEBAClog-scores", null), BgL_consza2za2("\uEBAClet*", BgL_consza2za2(BgL_consza2za2("\uEBACscore-sum", BgL_consza2za2("\uEBACapply", "\uEBAClog-sum-exp", "\uEBAClog-scores", null), null), null), BgL_consza2za2("\uEBACmap", BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACscore", null), BgL_consza2za2("\uEBAC-", "\uEBACscore", "\uEBACscore-sum", null), null), "\uEBAClog-scores", null), null), null), sc_append(top_list, BgL_consza2za2(null)));
    ds_sexpr_139 = BgL_removezd2deadzd2(BgL_dezd2sugarzd2allz00(church_sexpr));
    if (true === lazy) {
      ds_sexpr = BgL_addzd2forcingzd2(ds_sexpr_139);
    } else {
      ds_sexpr = ds_sexpr_139;
    }
    primitive_symbols = BgL_deletezd2duplicateszd2(BgL_freezd2variableszd2(ds_sexpr, null));
    is_primitive = function(sym) {
        if (sc_memq(sym, BgL_za2threadedzd2primitivesza2zd2) === false) {
          return sc_memq(sym, primitive_symbols);
        } else {
          return false;
        }
      };
    scexpr = BgL_addressingza2za2(ds_sexpr, is_primitive);
    return BgL_consza2za2(sc_append(BgL_generatezd2headerzd2(BgL_deletezd2duplicateszd2(BgL_freezd2variableszd2(scexpr, null)), external_defs, true === lazy), BgL_consza2za2(BgL_consza2za2("\uEBACdefine", BgL_consza2za2("\uEBACchurch-main", "\uEBACaddress", "\uEBACstore", null), scexpr, null), null)));
  };
BgL_memzf3zf3 = function(sexpr) {
    return BgL_taggedzd2listzf3z21(sexpr, "\uEBACmem");
  };
BgL_lambdazf3zf3 = function(exp) {
    return BgL_taggedzd2listzf3z21(exp, "\uEBAClambda");
  };
BgL_lambdazd2parameterszd2 = function(exp) {
    return exp.cdr.car;
  };
BgL_lambdazd2bodyzd2 = function(exp) {
    return exp.cdr.cdr.car;
  };
BgL_quotedzf3zf3 = function(exp) {
    return BgL_taggedzd2listzf3z21(exp, "\uEBACquote");
  };
BgL_beginzf3zf3 = function(exp) {
    return BgL_taggedzd2listzf3z21(exp, "\uEBACbegin");
  };
BgL_ifzf3zf3 = function(exp) {
    return BgL_taggedzd2listzf3z21(exp, "\uEBACif");
  };
BgL_applicationzf3zf3 = function(exp) {
    return exp instanceof sc_Pair;
  };
BgL_letreczf3zf3 = function(exp) {
    return BgL_taggedzd2listzf3z21(exp, "\uEBACletrec");
  };
BgL_addressingza2za2 = function(sexpr, is_primitive) {
    var addressing;
    addressing = function(sexpr) {
        if (BgL_beginzf3zf3(sexpr) !== false) {
          return BgL_consza2za2("\uEBACbegin", sc_append(map(addressing, rest(sexpr)), BgL_consza2za2(null)));
        } else {
          if (BgL_quotedzf3zf3(sexpr) !== false) {
            return sexpr;
          } else {
            if (BgL_ifzf3zf3(sexpr) !== false) {
              return BgL_consza2za2("\uEBACif", sc_append(map(addressing, rest(sexpr)), BgL_consza2za2(null)));
            } else {
              if (BgL_letreczf3zf3(sexpr) !== false) {
                return BgL_consza2za2("\uEBACletrec", map(function(binding) {
                            return sc_list(BgL_churchzd2renamezd2(first(binding)), addressing(second(binding)));
                          }, second(sexpr)), addressing(third(sexpr)), null);
              } else {
                if (BgL_lambdazf3zf3(sexpr) !== false) {
                  return BgL_consza2za2("\uEBAClambda", new sc_Pair("\uEBACaddress", new sc_Pair("\uEBACstore", BgL_churchzd2renamezd2parametersz00(BgL_lambdazd2parameterszd2(sexpr)))), addressing(BgL_lambdazd2bodyzd2(sexpr)), null);
                } else {
                  if (BgL_memzf3zf3(sexpr) !== false) {
                    return BgL_consza2za2(BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACmem-address", "\uEBACstore", "\uEBACproc", null), BgL_consza2za2("\uEBAClambda", BgL_consza2za2("\uEBACaddress", "\uEBACstore", "\uEBACargs"), BgL_consza2za2("\uEBACchurch-apply", BgL_consza2za2("\uEBACcons", "\uEBACargs", "\uEBACmem-address", null), "\uEBACstore", "\uEBACproc", "\uEBACargs", null), null), null), "\uEBACaddress", "\uEBACstore", addressing(second(sexpr)), null);
                  } else {
                    if (BgL_applicationzf3zf3(sexpr) !== false) {
                      if (sc_isSymbol(first(sexpr)) && is_primitive(first(sexpr)) !== false) {
                        return BgL_consza2za2(first(sexpr), sc_append(map(addressing, rest(sexpr)), BgL_consza2za2(null)));
                      } else {
                        return BgL_consza2za2(addressing(first(sexpr)), BgL_consza2za2("\uEBACcons", BgL_consza2za2("\uEBACquote", BgL_nextzd2addrzd2(), null), "\uEBACaddress", null), "\uEBACstore", sc_append(map(addressing, rest(sexpr)), BgL_consza2za2(null)));
                      }
                    } else {
                      if (sc_isSymbol(sexpr)) {
                        return BgL_churchzd2renamezd2(sexpr);
                      } else {
                        if (sc_isNumber(sexpr)) {
                          return sexpr;
                        } else {
                          return sexpr;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
    return addressing(sexpr);
  };
BgL_symbolzd2indexzd2 = 0;
BgL_nextzd2addrzd2 = function() {
    BgL_symbolzd2indexzd2 = 1 + BgL_symbolzd2indexzd2;
    return '\uEBAC' + ("a" + sc_number2string(BgL_symbolzd2indexzd2));
  };
BgL_churchzd2renamezd2 = function(variable) {
    return '\uEBAC' + ("church-" + variable.slice(1));
  };
BgL_churchzd2renamezd2parametersz00 = function(parameters) {
    if (parameters instanceof sc_Pair) {
      return new sc_Pair(BgL_churchzd2renamezd2(parameters.car), BgL_churchzd2renamezd2parametersz00(parameters.cdr));
    } else {
      if (parameters === null) {
        return null;
      } else {
        if (sc_isSymbol(parameters)) {
          return BgL_churchzd2renamezd2(parameters);
        } else {
          return sc_error(parameters, BgL_sc_const_14z00_church_compiler_tmp);
        }
      }
    }
  };
BgL_freezd2variableszd2 = function(sexpr, bound_vars) {
    var stmp;
    var loop;
    var g1326;
    var new_bound;
    if (BgL_beginzf3zf3(sexpr) !== false) {
      return sc_apply(sc_append, map(function(e) {
                  return BgL_freezd2variableszd2(e, bound_vars);
                }, rest(sexpr)));
    } else {
      if (BgL_letreczf3zf3(sexpr) !== false) {
        new_bound = sc_append(map(first, second(sexpr)), bound_vars);
        return sc_apply(sc_append, map(function(e) {
                    return BgL_freezd2variableszd2(e, new_bound);
                  }, pair(third(sexpr), map(second, second(sexpr)))));
      } else {
        if (BgL_quotedzf3zf3(sexpr) !== false) {
          return null;
        } else {
          if (BgL_lambdazf3zf3(sexpr) !== false) {
            g1326 = BgL_lambdazd2parameterszd2(sexpr);
            loop = function(params) {
                var stmp;
                var params_140;
                if (params === null) {
                  return bound_vars;
                } else {
                  if (params instanceof sc_Pair) {
                    params_140 = rest(params);
                    if (params_140 === null) {
                      stmp = bound_vars;
                    } else {
                      if (params_140 instanceof sc_Pair) {
                        stmp = pair(first(params_140), loop(rest(params_140)));
                      } else {
                        stmp = pair(params_140, bound_vars);
                      }
                    }
                    return pair(first(params), stmp);
                  } else {
                    return pair(params, bound_vars);
                  }
                }
              };
            if (g1326 === null) {
              stmp = bound_vars;
            } else {
              if (g1326 instanceof sc_Pair) {
                stmp = pair(first(g1326), loop(rest(g1326)));
              } else {
                stmp = pair(g1326, bound_vars);
              }
            }
            return BgL_freezd2variableszd2(BgL_lambdazd2bodyzd2(sexpr), stmp);
          } else {
            if (BgL_memzf3zf3(sexpr) !== false) {
              return BgL_freezd2variableszd2(second(sexpr), bound_vars);
            } else {
              if (BgL_ifzf3zf3(sexpr) !== false) {
                return sc_apply(sc_append, map(function(e) {
                            return BgL_freezd2variableszd2(e, bound_vars);
                          }, rest(sexpr)));
              } else {
                if (BgL_applicationzf3zf3(sexpr) !== false) {
                  return sc_apply(sc_append, map(function(e) {
                              return BgL_freezd2variableszd2(e, bound_vars);
                            }, sexpr));
                } else {
                  if (sc_isSymbol(sexpr)) {
                    if (sc_memq(sexpr, bound_vars) !== false) {
                      return null;
                    } else {
                      return sc_list(sexpr);
                    }
                  } else {
                    return null;
                  }
                }
              }
            }
          }
        }
      }
    }
  };
BgL_removezd2deadzd2 = function(sexpr) {
    var new_binding_vars;
    var storage;
    var tmp;
    var unused_bindings_vars;
    var free_vars;
    var kept_bindings;
    var g1329;
    var g1328;
    var g1327;
    if (BgL_quotedzf3zf3(sexpr) !== false) {
      return sexpr;
    } else {
      if (BgL_letreczf3zf3(sexpr) !== false) {
        g1327 = null;
        g1328 = map(first, second(sexpr));
        g1329 = BgL_freezd2variableszd2(third(sexpr), null);
        BgL_whilezd2break1514zd2: {
          tmp = g1327;
          unused_bindings_vars = g1328;
          free_vars = g1329;
          do {
            storage = {bindings: undefined};
            with (storage) {
              bindings = tmp;
              new_binding_vars = BgL_lsetzd2intersectionzd2(sc_isEq, unused_bindings_vars, free_vars);
              if (new_binding_vars === null) {
                {
                  kept_bindings = filter(function(b) {
                        return sc_memq(first(b), bindings);
                      }, second(sexpr));
                  break BgL_whilezd2break1514zd2;
                }
              } else {
                tmp = sc_append(new_binding_vars, tmp);
                unused_bindings_vars = BgL_lsetzd2differencezd2(sc_isEq, unused_bindings_vars, new_binding_vars);
                free_vars = sc_apply(sc_append, map(function(b) {
                        return BgL_freezd2variableszd2(second(assoc(b, second(sexpr))), null);
                      }, new_binding_vars));
              }
            }
          } while (true);
        }
        return BgL_consza2za2("\uEBACletrec", BgL_removezd2deadzd2(kept_bindings), BgL_removezd2deadzd2(third(sexpr)), null);
      } else {
        if (sc_isList(sexpr)) {
          return map(BgL_removezd2deadzd2, sexpr);
        } else {
          return sexpr;
        }
      }
    }
  };
BgL_addzd2forcingzd2 = function(sexpr) {
    if (BgL_beginzf3zf3(sexpr) !== false) {
      return BgL_consza2za2("\uEBACbegin", sc_append(map(function(e) {
                    return BgL_consza2za2("\uEBACforce", BgL_addzd2forcingzd2(e), null);
                  }, BgL_dropzd2rightzd2(rest(sexpr), 1)), BgL_consza2za2(BgL_addzd2forcingzd2(last(sexpr)), null)));
    } else {
      if (BgL_letreczf3zf3(sexpr) !== false) {
        return BgL_consza2za2("\uEBACletrec", map(function(binding) {
                    return sc_list(first(binding), BgL_addzd2forcingzd2(second(binding)));
                  }, second(sexpr)), BgL_addzd2forcingzd2(third(sexpr)), null);
      } else {
        if (BgL_memzf3zf3(sexpr) !== false) {
          return map(BgL_addzd2forcingzd2, sexpr);
        } else {
          if (BgL_quotedzf3zf3(sexpr) !== false) {
            return sexpr;
          } else {
            if (BgL_lambdazf3zf3(sexpr) !== false) {
              return BgL_consza2za2("\uEBAClambda", BgL_lambdazd2parameterszd2(sexpr), BgL_addzd2forcingzd2(BgL_lambdazd2bodyzd2(sexpr)), null);
            } else {
              if (BgL_ifzf3zf3(sexpr) !== false) {
                return BgL_consza2za2("\uEBACif", BgL_consza2za2("\uEBACforce", BgL_addzd2forcingzd2(second(sexpr)), null), BgL_addzd2forcingzd2(third(sexpr)), BgL_addzd2forcingzd2(fourth(sexpr)), null);
              } else {
                if (BgL_applicationzf3zf3(sexpr) !== false) {
                  return BgL_consza2za2(BgL_consza2za2("\uEBACforce", BgL_addzd2forcingzd2(first(sexpr)), null), sc_append(map(BgL_addzd2forcingzd2, rest(sexpr)), BgL_consza2za2(null)));
                } else {
                  return sexpr;
                }
              }
            }
          }
        }
      }
    }
  };


/*! jQuery v1.7 jquery.com | jquery.org/license */
(function(a,b){function cA(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cx(a){if(!cm[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cn||(cn=c.createElement("iframe"),cn.frameBorder=cn.width=cn.height=0),b.appendChild(cn);if(!co||!cn.createElement)co=(cn.contentWindow||cn.contentDocument).document,co.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),co.close();d=co.createElement(a),co.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cn)}cm[a]=e}return cm[a]}function cw(a,b){var c={};f.each(cs.concat.apply([],cs.slice(0,b)),function(){c[this]=a});return c}function cv(){ct=b}function cu(){setTimeout(cv,0);return ct=f.now()}function cl(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ck(){try{return new a.XMLHttpRequest}catch(b){}}function ce(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cd(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function cc(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bG.test(a)?d(a,e):cc(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)cc(a+"["+e+"]",b[e],c,d);else d(a,b)}function cb(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function ca(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bV,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=ca(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=ca(a,c,d,e,"*",g));return l}function b_(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bR),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bE(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bz:bA;if(d>0){c!=="border"&&f.each(e,function(){c||(d-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?d+=parseFloat(f.css(a,c+this))||0:d-=parseFloat(f.css(a,"border"+this+"Width"))||0});return d+"px"}d=bB(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0,c&&f.each(e,function(){d+=parseFloat(f.css(a,"padding"+this))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+this+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+this))||0)});return d+"px"}function br(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bi,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bq(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bp(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bp)}function bp(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bo(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bn(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bm(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bl(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function X(a){var b=Y.split(" "),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function W(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(R.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function V(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function N(){return!0}function M(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function K(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(K,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=/-([a-z]|[0-9])/ig,x=/^-ms-/,y=function(a,b){return(b+"").toUpperCase()},z=d.userAgent,A,B,C,D=Object.prototype.toString,E=Object.prototype.hasOwnProperty,F=Array.prototype.push,G=Array.prototype.slice,H=String.prototype.trim,I=Array.prototype.indexOf,J={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7",length:0,size:function(){return this.length},toArray:function(){return G.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?F.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),B.add(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(G.apply(this,arguments),"slice",G.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:F,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;B.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!B){B=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",C,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",C),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&K()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return a!=null&&m.test(a)&&!isNaN(a)},type:function(a){return a==null?String(a):J[D.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!E.call(a,"constructor")&&!E.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||E.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(x,"ms-").replace(w,y)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:H?function(a){return a==null?"":H.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?F.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(I)return I.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=G.call(arguments,2),g=function(){return a.apply(c,f.concat(G.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){J["[object "+b+"]"]=b.toLowerCase()}),A=e.uaMatch(z),A.browser&&(e.browser[A.browser]=!0,e.browser.version=A.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?C=function(){c.removeEventListener("DOMContentLoaded",C,!1),e.ready()}:c.attachEvent&&(C=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",C),e.ready())}),typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return e});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){return i.done.apply(i,arguments).fail.apply(i,arguments)},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/><nav></nav>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=a.getElementsByTagName("input")[0],k={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,unknownElems:!!a.getElementsByTagName("nav").length,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:a.className!=="t",enctype:!!c.createElement("form").enctype,submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,k.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,k.optDisabled=!h.disabled;try{delete a.test}catch(v){k.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function(){k.noCloneEvent=!1}),a.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),k.radioValue=i.value==="t",i.setAttribute("checked","checked"),a.appendChild(i),l=c.createDocumentFragment(),l.appendChild(a.lastChild),k.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",m=c.getElementsByTagName("body")[0],o=c.createElement(m?"div":"body"),p={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},m&&f.extend(p,{position:"absolute",left:"-999px",top:"-999px"});for(t in p)o.style[t]=p[t];o.appendChild(a),n=m||b,n.insertBefore(o,n.firstChild),k.appendChecked=i.checked,k.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,k.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",k.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",q=a.getElementsByTagName("td"),u=q[0].offsetHeight===0,q[0].style.display="",q[1].style.display="none",k.reliableHiddenOffsets=u&&q[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",a.appendChild(j),k.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(a.attachEvent)for(t in{submit:1,change:1,focusin:1})s="on"+t,u=s in a,u||(a.setAttribute(s,"return;"),u=typeof a[s]=="function"),k[t+"Bubbles"]=u;f(function(){var a,b,d,e,g,h,i=1,j="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",l="visibility:hidden;border:0;",n="style='"+j+"border:5px solid #000;padding:0;'",p="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>";m=c.getElementsByTagName("body")[0];!m||(a=c.createElement("div"),a.style.cssText=l+"width:0;height:0;position:static;top:0;margin-top:"+i+"px",m.insertBefore(a,m.firstChild),o=c.createElement("div"),o.style.cssText=j+l,o.innerHTML=p,a.appendChild(o),b=o.firstChild,d=b.firstChild,g=b.nextSibling.firstChild.firstChild,h={doesNotAddBorder:d.offsetTop!==5,doesAddBorderForTableAndCells:g.offsetTop===5},d.style.position="fixed",d.style.top="20px",h.fixedPosition=d.offsetTop===20||d.offsetTop===15,d.style.position=d.style.top="",b.style.overflow="hidden",b.style.position="relative",h.subtractsBorderForOverflowNotVisible=d.offsetTop===-5,h.doesNotIncludeMarginInBodyOffset=m.offsetTop!==i,m.removeChild(a),o=a=null,f.extend(k,h))}),o.innerHTML="",n.removeChild(o),o=l=g=h=m=j=a=i=null;return k}(),f.boxModel=f.support.boxModel;var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[f.expando]:a[f.expando]&&f.expando,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[f.expando]=n=++f.uuid:n=f.expando),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[f.expando]:f.expando;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)?b=b:b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" "));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[f.expando]:a.removeAttribute?a.removeAttribute(f.expando):a[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];if(!arguments.length){if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}return b}e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!a||j===3||j===8||j===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g},removeAttr:function(a,b){var c,d,e,g,h=0;if(a.nodeType===1){d=(b||"").split(p),g=d.length;for(;h<g;h++)e=d[h].toLowerCase(),c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1)}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return b;h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/\.(.*)$/,A=/^(?:textarea|input|select)$/i,B=/\./g,C=/ /g,D=/[^\w\s.|`]/g,E=/^([^\.]*)?(?:\.(.+))?$/,F=/\bhover(\.\S+)?/,G=/^key/,H=/^(?:mouse|contextmenu)|click/,I=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,J=function(a){var b=I.exec(a);b&&
(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},K=function(a,b){return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||a.id===b[2])&&(!b[3]||b[3].test(a.className))},L=function(a){return f.event.special.hover?a:a.replace(F,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=L(c).split(" ");for(k=0;k<c.length;k++){l=E.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,namespace:n.join(".")},p),g&&(o.quick=J(g),!o.quick&&f.expr.match.POS.test(g)&&(o.isPositional=!0)),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d){var e=f.hasData(a)&&f._data(a),g,h,i,j,k,l,m,n,o,p,q;if(!!e&&!!(m=e.events)){b=L(b||"").split(" ");for(g=0;g<b.length;g++){h=E.exec(b[g])||[],i=h[1],j=h[2];if(!i){j=j?"."+j:"";for(l in m)f.event.remove(a,l+j,c,d);return}n=f.event.special[i]||{},i=(d?n.delegateType:n.bindType)||i,p=m[i]||[],k=p.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;if(c||j||d||n.remove)for(l=0;l<p.length;l++){q=p[l];if(!c||c.guid===q.guid)if(!j||j.test(q.namespace))if(!d||d===q.selector||d==="**"&&q.selector)p.splice(l--,1),q.selector&&p.delegateCount--,n.remove&&n.remove.call(a,q)}else p.length=0;p.length===0&&k!==p.length&&((!n.teardown||n.teardown.call(a,j)===!1)&&f.removeEvent(a,i,e.handle),delete m[i])}f.isEmptyObject(m)&&(o=e.handle,o&&(o.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"",(g||!e)&&c.preventDefault();if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,n=null;for(m=e.parentNode;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length;l++){m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d);if(c.isPropagationStopped())break}c.type=h,c.isDefaultPrevented()||(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=(f.event.special[c.type]||{}).handle,j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click"))for(m=c.target;m!=this;m=m.parentNode||this){o={},q=[];for(k=0;k<e;k++)r=d[k],s=r.selector,t=o[s],r.isPositional?t=(t||(o[s]=f(s))).index(m)>=0:t===b&&(t=o[s]=r.quick?K(m,r.quick):f(m).is(s)),t&&q.push(r);q.length&&j.push({elem:m,matches:q})}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){p=j[k],c.currentTarget=p.elem;for(l=0;l<p.matches.length&&!c.isImmediatePropagationStopped();l++){r=p.matches[l];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=(i||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement wheelDelta".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},focus:{delegateType:"focusin",noBubble:!0},blur:{delegateType:"focusout",noBubble:!0},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?N:M):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=N;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=N;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=N,this.stopPropagation()},isDefaultPrevented:M,isPropagationStopped:M,isImmediatePropagationStopped:M},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]=f.event.special[b]={delegateType:b,bindType:b,handle:function(a){var b=this,c=a.relatedTarget,d=a.handleObj,e=d.selector,g,h;if(!c||d.origType===a.type||c!==b&&!f.contains(b,c))g=a.type,a.type=d.origType,h=d.handler.apply(this,arguments),a.type=g;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(A.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;A.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return A.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=M;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=M);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),G.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),H.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw"Syntax error, unrecognized expression: "+a};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var O=/Until$/,P=/^(?:parents|prevUntil|prevAll)/,Q=/,/,R=/^.[^:#\[\.,]*$/,S=Array.prototype.slice,T=f.expr.match.POS,U={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(W(this,a,!1),"not",a)},filter:function(a){return this.pushStack(W(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?T.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=T.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(V(c[0])||V(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=S.call(arguments);O.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!U[a]?f.unique(e):e,(this.length>1||Q.test(d))&&P.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var Y="abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",Z=/ jQuery\d+="(?:\d+|null)"/g,$=/^\s+/,_=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,ba=/<([\w:]+)/,bb=/<tbody/i,bc=/<|&#?\w+;/,bd=/<(?:script|style)/i,be=/<(?:script|object|embed|option|style)/i,bf=new RegExp("<(?:"+Y.replace(" ","|")+")","i"),bg=/checked\s*(?:[^=]|=\s*.checked.)/i,bh=/\/(java|ecma)script/i,bi=/^\s*<!(?:\[CDATA\[|\-\-)/,bj={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bk=X(c);bj.optgroup=bj.option,bj.tbody=bj.tfoot=bj.colgroup=bj.caption=bj.thead,bj.th=bj.td,f.support.htmlSerialize||(bj._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after"
,arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Z,""):null;if(typeof a=="string"&&!bd.test(a)&&(f.support.leadingWhitespace||!$.test(a))&&!bj[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(_,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bg.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bl(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,br)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!be.test(j)&&(f.support.checkClone||!bg.test(j))&&!f.support.unknownElems&&bf.test(j)&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bn(a,d),e=bo(a),g=bo(d);for(h=0;e[h];++h)g[h]&&bn(e[h],g[h])}if(b){bm(a,d);if(c){e=bo(a),g=bo(d);for(h=0;e[h];++h)bm(e[h],g[h])}}e=g=null;return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!bc.test(k))k=b.createTextNode(k);else{k=k.replace(_,"<$1></$2>");var l=(ba.exec(k)||["",""])[1].toLowerCase(),m=bj[l]||bj._default,n=m[0],o=b.createElement("div");b===c?bk.appendChild(o):X(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=bb.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&$.test(k)&&o.insertBefore(b.createTextNode($.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bq(k[i]);else bq(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||bh.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bs=/alpha\([^)]*\)/i,bt=/opacity=([^)]*)/,bu=/([A-Z]|^ms)/g,bv=/^-?\d+(?:px)?$/i,bw=/^-?\d/,bx=/^([\-+])=([\-+.\de]+)/,by={position:"absolute",visibility:"hidden",display:"block"},bz=["Left","Right"],bA=["Top","Bottom"],bB,bC,bD;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bB(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bx.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bB)return bB(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bE(a,b,d);f.swap(a,by,function(){e=bE(a,b,d)});return e}},set:function(a,b){if(!bv.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bt.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bs,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bs.test(g)?g.replace(bs,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bB(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bC=function(a,c){var d,e,g;c=c.replace(bu,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bD=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bv.test(f)&&bw.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bB=bC||bD,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bF=/%20/g,bG=/\[\]$/,bH=/\r?\n/g,bI=/#.*$/,bJ=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bK=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bL=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bM=/^(?:GET|HEAD)$/,bN=/^\/\//,bO=/\?/,bP=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bQ=/^(?:select|textarea)/i,bR=/\s+/,bS=/([?&])_=[^&]*/,bT=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bU=f.fn.load,bV={},bW={},bX,bY,bZ=["*/"]+["*"];try{bX=e.href}catch(b$){bX=c.createElement("a"),bX.href="",bX=bX.href}bY=bT.exec(bX.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bU)return bU.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bP,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bQ.test(this.nodeName)||bK.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bH,"\r\n")}}):{name:b.name,value:c.replace(bH,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?cb(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),cb(a,b);return a},ajaxSettings:{url:bX,isLocal:bL.test(bY[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bZ},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:b_(bV),ajaxTransport:b_(bW),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cd(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=ce(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bJ.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bI,"").replace(bN,bY[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bR),d.crossDomain==null&&(r=bT.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bY[1]&&r[2]==bY[2]&&(r[3]||(r[1]==="http:"?80:443))==(bY[3]||(bY[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),ca(bV,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bM.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bO.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bS,"$1_="+x);d.url=y+(y===d.url?(bO.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bZ+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=ca(bW,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){s<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)cc(g,a[g],c,e);return d.join("&").replace(bF,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cf=f.now(),cg=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cf++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cg.test(b.url)||e&&cg.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cg,l),b.url===j&&(e&&(k=k.replace(cg,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ch=a.ActiveXObject?function(){for(var a in cj)cj[a](0,1)}:!1,ci=0,cj;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ck()||cl()}:ck,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ch&&delete cj[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++ci,ch&&(cj||(cj={},f(a).unload(ch)),cj[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cm={},cn,co,cp=/^(?:toggle|show|hide)$/,cq=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cr,cs=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],ct;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cw("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cx(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cw("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cw("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cx(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cp.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=cq.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cw("show",1),slideUp:cw("hide",1),slideToggle:cw("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=ct||cu(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cr&&(cr=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=ct||cu(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cr),cr=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now))}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cy=/^t(?:able|d|h)$/i,cz=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cA(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cy.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cz.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cz.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cA(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cA(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);

// From http://baagoe.com/en/RandomMusings/javascript/
function Alea() {
  return (function(args) {
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    if (args.length == 0) {
      args = [+new Date];
    }
    var mash = Mash();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(args[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(args[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    mash = null;

    var random = function() {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
    random.uint32 = function() {
      return random() * 0x100000000; // 2^32
    };
    random.fract53 = function() {
      return random() + 
        (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };
    random.version = 'Alea 0.9';
    random.args = args;
    return random;

  } (Array.prototype.slice.call(arguments)));
};


// From http://baagoe.com/en/RandomMusings/javascript/
function KISS07() {
  return (function(args) {
    // George Marsaglia, 2007-06-23
    //http://groups.google.com/group/comp.lang.fortran/msg/6edb8ad6ec5421a5
    var x = 123456789;
    var y = 362436069;
    var z =  21288629;
    var w =  14921776;
    var c = 0;

    if (args.length == 0) {
      args = [+new Date];
    }
    var mash = Mash();
    for (var i = 0; i < args.length; i++) {
      x ^= mash(args[i]) * 0x100000000; // 2^32
      y ^= mash(args[i]) * 0x100000000;
      z ^= mash(args[i]) * 0x100000000;
      w ^= mash(args[i]) * 0x100000000;
    }
    if (y === 0) {
      y = 1;
    }
    c ^= z >>> 31;
    z &= 0x7fffffff;
    if ((z % 7559) === 0) {
      z++;
    }
    w &= 0x7fffffff;
    if ((w % 7559) === 0) {
      w++;
    }
    mash = null;

    var uint32 = function() {
      var t;

      x += 545925293;
      x >>>= 0;

      y ^= y << 13;
      y ^= y >>> 17;
      y ^= y << 5;

      t = z + w + c;
      z = w;
      c = t >>> 31;
      w = t & 0x7fffffff;

      return x + y + w >>> 0;
    };

    var random = function() {
      return uint32() * 2.3283064365386963e-10; // 2^-32
    };
    random.uint32 = uint32;
    random.fract53 = function() {
      return random() +
        (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
    };
    random.args = args;
    random.version = 'KISS07 0.9';

    return random;
  } (Array.prototype.slice.call(arguments)));
};


// From http://baagoe.com/en/RandomMusings/javascript/
function Kybos() {
  return (function(args) {
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;
    var s = [];
    var k = 0;

    var mash = Mash();
    var s0 = mash(' ');
    var s1 = mash(' ');
    var s2 = mash(' ');
    for (var j = 0; j < 8; j++) {
      s[j] = mash(' ');
    }

    if (args.length == 0) {
      args = [+new Date];
    }
    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(args[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(args[i]);
      if (s2 < 0) {
        s2 += 1;
      }
      for (var j = 0; j < 8; j++) {
        s[j] -= mash(args[i]);
        if (s[j] < 0) {
          s[j] += 1;
        }
      }
    }

    var random = function() {
      var a = 2091639;
      k = s[k] * 8 | 0;
      var r = s[k];
      var t = a * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      s2 = t - (c = t | 0);
      s[k] -= s2;
      if (s[k] < 0) {
        s[k] += 1;
      }
      return r;
    };
    random.uint32 = function() {
      return random() * 0x100000000; // 2^32
    };
    random.fract53 = function() {
      return random() +
        (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };
    random.addNoise = function() {
      for (var i = arguments.length - 1; i >= 0; i--) {
        for (j = 0; j < 8; j++) {
          s[j] -= mash(arguments[i]);
          if (s[j] < 0) {
            s[j] += 1;
          }
        }
      }
    };
    random.version = 'Kybos 0.9';
    random.args = args;
    return random;

  } (Array.prototype.slice.call(arguments)));
};


// From http://baagoe.com/en/RandomMusings/javascript/
function LFIB4() {
  return(function(args) {
    // George Marsaglia's LFIB4,
    //http://groups.google.com/group/sci.crypt/msg/eb4ddde782b17051
    var k0 = 0,
        k1 = 58,
        k2 = 119,
        k3 = 178;

    var s = [];

    var mash = Mash();
    if (args.length === 0) {
      args = [+new Date()];
    }
    for (var j = 0; j < 256; j++) {
      s[j] = mash(' ');
      s[j] -= mash(' ') * 4.76837158203125e-7; // 2^-21
      if (s[j] < 0) {
        s[j] += 1;
      }
    }
    for (var i = 0; i < args.length; i++) {
      for (var j = 0; j < 256; j++) {
        s[j] -= mash(args[i]);
        s[j] -= mash(args[i]) * 4.76837158203125e-7; // 2^-21
        if (s[j] < 0) {
          s[j] += 1;
        }
      }
    }
    mash = null;

    var random = function() {
      var x;

      k0 = (k0 + 1) & 255;
      k1 = (k1 + 1) & 255;
      k2 = (k2 + 1) & 255;
      k3 = (k3 + 1) & 255;

      x = s[k0] - s[k1];
      if (x < 0) {
        x += 1;
      }
      x -= s[k2];
      if (x < 0) {
        x += 1;
      }
      x -= s[k3];
      if (x < 0) {
        x += 1;
      }

      return s[k0] = x;
    }

    random.uint32 = function() {
      return random() * 0x100000000 >>> 0; // 2^32
    };
    random.fract53 = random;
    random.version = 'LFIB4 0.9';
    random.args = args;

    return random;
  } (Array.prototype.slice.call(arguments)));
};


// From http://baagoe.com/en/RandomMusings/javascript/
function LFib() {
  return (function(args) {
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var k0 = 255,
        k1 = 52,
        k2 = 0;
    var s = [];

    var mash = Mash();
    if (args.length === 0) {
      args = [+new Date()];
    }
    for (var j = 0; j < 256; j++) {
      s[j] = mash(' ');
      s[j] -= mash(' ') * 4.76837158203125e-7; // 2^-21
      if (s[j] < 0) {
        s[j] += 1;
      }
    }
    for (var i = 0; i < args.length; i++) {
      for (var j = 0; j < 256; j++) {
        s[j] -= mash(args[i]);
        s[j] -= mash(args[i]) * 4.76837158203125e-7; // 2^-21
        if (s[j] < 0) {
          s[j] += 1;
        }
      }
    }
    mash = null;

    var random = function() {
      k0 = (k0 + 1) & 255;
      k1 = (k1 + 1) & 255;
      k2 = (k2 + 1) & 255;

      var x = s[k0] - s[k1];
      if (x < 0.0) {
        x += 1.0;
      }
      x -= s[k2];
      if (x < 0.0) {
        x += 1.0;
      }
      return s[k0] = x;
    }

    random.uint32 = function() {
      return random() * 0x100000000 >>> 0; // 2^32
    };
    random.fract53 = random;
    random.version = 'LFib 0.9';
    random.args = args;

    return random;
  } (Array.prototype.slice.call(arguments)));
};


// From http://baagoe.com/en/RandomMusings/javascript/
function MRG32k3a() {
  return (function(args) {
    // Copyright (c) 1998, 2002 Pierre L'Ecuyer, DIRO, Université de Montréal.
    // http://www.iro.umontreal.ca/~lecuyer/
    var m1 = 4294967087;
    var m2 = 4294944443;
    var s10 = 12345,
        s11 = 12345,
        s12 = 123,
        s20 = 12345,
        s21 = 12345,
        s22 = 123;

    if (args.length === 0) {
      args = [+new Date()];
    }
    var mash = Mash();
    for (var i = 0; i < args.length; i++) {
      s10 += mash(args[i]) * 0x100000000; // 2 ^ 32
      s11 += mash(args[i]) * 0x100000000;
      s12 += mash(args[i]) * 0x100000000;
      s20 += mash(args[i]) * 0x100000000;
      s21 += mash(args[i]) * 0x100000000;
      s22 += mash(args[i]) * 0x100000000;
    }
    s10 %= m1;
    s11 %= m1;
    s12 %= m1;
    s20 %= m2;
    s21 %= m2;
    s22 %= m2;
    mash = null;

    var uint32 = function() {
      var m1 = 4294967087;
      var m2 = 4294944443;
      var a12 = 1403580;
      var a13n = 810728;
      var a21 = 527612;
      var a23n = 1370589;

      var k, p1, p2;

      /* Component 1 */
      p1 = a12 * s11 - a13n * s10;
      k = p1 / m1 | 0;
      p1 -= k * m1;
      if (p1 < 0) p1 += m1;
      s10 = s11;
      s11 = s12;
      s12 = p1;

      /* Component 2 */
      p2 = a21 * s22 - a23n * s20;
      k = p2 / m2 | 0;
      p2 -= k * m2;
      if (p2 < 0) p2 += m2;
      s20 = s21;
      s21 = s22;
      s22 = p2;

      /* Combination */
      if (p1 <= p2) return p1 - p2 + m1;
      else return p1 - p2;
    };

    var random = function() {
      return uint32() * 2.3283064365386963e-10; // 2^-32
    };
    random.uint32 = uint32;
    random.fract53 = function() {
      return random() +
        (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
    };
    random.version = 'MRG32k3a 0.9';
    random.args = args;

    return random;
  } (Array.prototype.slice.call(arguments)));
};


// From http://baagoe.com/en/RandomMusings/javascript/
// Johannes Baagøe <baagoe@baagoe.com>, 2010
function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = 'Mash 0.9';
  return mash;
}



// From http://baagoe.com/en/RandomMusings/javascript/
function Xorshift03() {
  return (function(args) {
    // George Marsaglia, 13 May 2003
    // http://groups.google.com/group/comp.lang.c/msg/e3c4ea1169e463ae
    var x = 123456789,
        y = 362436069,
        z = 521288629,
        w = 88675123,
        v = 886756453;

    if (args.length == 0) {
      args = [+new Date];
    }
    var mash = Mash();
    for (var i = 0; i < args.length; i++) {
      x ^= mash(args[i]) * 0x100000000; // 2^32
      y ^= mash(args[i]) * 0x100000000;
      z ^= mash(args[i]) * 0x100000000;
      v ^= mash(args[i]) * 0x100000000;
      w ^= mash(args[i]) * 0x100000000;
    }
    mash = null;

    var uint32 = function() {
      var t = (x ^ (x >>> 7)) >>> 0;
      x = y;
      y = z;
      z = w;
      w = v;
      v = (v ^ (v << 6)) ^ (t ^ (t << 13)) >>> 0;
      return ((y + y + 1) * v) >>> 0;
    }

    var random = function() {
      return uint32() * 2.3283064365386963e-10; // 2^-32
    };
    random.uint32 = uint32;
    random.fract53 = function() {
      return random() +
        (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
    };
    random.version = 'Xorshift03 0.9';
    random.args = args;
    return random;

  } (Array.prototype.slice.call(arguments)));
};


if (!String.prototype.supplant) {
  String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
                        function (a, b) {
                          var r = o[b];
                          return typeof r === 'string' || typeof r === 'number' ? r : a;
                        }
                       );
  };
}

var scheme2jsTemplate = ";; Broken placeholder constants\n\
(define infinity 999999999999)\n\
(define minus-infinity (- 999999999999))\n\
(define nan (/ 1 0))\n\
(define pi 3.14159265)\n\
\n\
;; These are the correct defines, but they don't work until we fix the compiler\n\
;; (define infinity Number.POSITIVE_INFINITY)\n\
;; (define minus-infinity Number.NEGATIVE_INFINITY)\n\
;; (define nan Number.NaN)\n\
;; (define pi Math.PI)\n\
\n\
;; These functions are defined in math-functions.js\n\
;;(define logistic #f)\n\
;;(define lnfact #f)\n\
;;(define logsumexp #f)\n\
;(define normalize #f)\n\
\n\
;; These functions are defined in math-functions.js, but need aliases\n\
(define sample-gamma sample_gamma)\n\
(define gamma-pdf gamma_pdf)\n\
(define gamma-lnpdf gamma_lnpdf)\n\
(define sample-poisson sample_poisson)\n\
(define sample-binomial sample_binomial)\n\
(define sample-beta sample_beta)\n\
(define sample-gaussian sample_gaussian)\n\
(define gaussian-pdf gaussian_pdf)\n\
(define gaussian-lnpdf gaussian_lnpdf)\n\
(define sample-dirichlet sample_dirichlet)\n\
(define dirichlet-lnpdf dirichlet_lnpdf)\n\
(define sample-tdist sample_tdist)\n\
(define tdist-pdf tdist_pdf)\n\
(define sample-generalized-tdist sample_generalized_tdist)\n\
(define binomial-pdf binomial_pdf)\n\
(define poisson-pdf poisson_pdf)\n\
(define random-real random_real)\n\
(define random-integer random_integer)\n\
(define seed-rng seed_rng)\n\
\n\
;; These two are defined, but there are some name clashes\n\
;;(define sum #f)\n\
;;(define mean #f)\n\
\n\
;;;The following math functions (which are provided by GSL in the ikarus version) could be given js implementations...\n\
(define (discrete-pdf probs val) (list-ref probs val))\n\
(define (discrete-sampler probs)\n\
  (let loop ((probs probs)\n\
             (past 0)\n\
             (i 0))\n\
    (if (< (random-real) (/ (first probs) (- 1 past)))\n\
        i\n\
        (loop (rest probs) (+ past (first probs)) (+ i 1)))))\n\
\n\
;;;various functions needed by header:\n\
\n\
;; ;(fold kons knil lis) = (fold kons (kons (car lis) knil) (cdr lis))\n\
;; ;(fold kons knil '()) = knil\n\
(define (fold f z xs)\n\
  (if (null? xs)\n\
      z\n\
      (fold f (f (first xs) z) (rest xs))))\n\
\n\
(define current-date (lambda args #f))\n\
(define exact->inexact (lambda (x) x))\n\
(define inexact->exact (lambda (x) x))\n\
;; (define (display x) (document.write x))\n\
;; (define pretty-print display)\n\
\n\
(define scheme-gensym gensym)\n\
\n\
(define true #t)\n\
(define false #f)\n\
\n\
(define first car)\n\
(define rest cdr)\n\
(define pair cons)\n\
(define (second lst) (cadr lst))\n\
(define (third lst) (caddr lst))\n\
(define (fourth lst) (cadddr lst))\n\
(define (fifth lst) (list-ref lst 4))\n\
(define (sixth lst) (list-ref lst 5))\n\
(define (seventh lst) (list-ref lst 6))\n\
(define (eighth lst) (list-ref lst 7))\n\
(define (ninth lst) (list-ref lst 8))\n\
(define (tenth lst) (list-ref lst 9))\n\
\n\
;;;for score gradients (currently not working), requires AD:\n\
(define (*with-score-gradient*) #f)\n\
(define (xy-gradient-R x) (error 'grad-undefined \"xy-gradient-R undefined\"))\n\
(define (tape? x) #f)\n\
(define (tapify x) x)\n\
(define (untapify x) x)\n\
;; (define (min a b) (if (< a b) a b)) ;;FIXME: proper dmin?\n\
;; (define (continuous? x) (and (real? x) (not (fixnum? x))))\n\
(define continuous? real?)\n\
\n\
;;;the program, defining the church-main function, will be spliced in here:\n\
{churchprogram}\n\
\n\
;;go...\n\
(display (church-main '(top) (make-empty-store)))\n\
";


// Set the random number generator
var random = new MRG32k3a();
var intRandom = random.uint32;

function random_integer(n)
{ 
    return intRandom() % n; 
}

function random_real()
{ 
    return random(); 
}

function seed_rng(seed)
{
    random = new MRG32k3a(seed);
    intRandom = random.uint32;
}

// Draw sample from Poisson distribution
// Knuth TAOCP 2 (roughly optimal)
function sample_poisson(mu)
{
    var k = 0;

    while(mu > 10)
    {
        var m = 7/8*mu;
        var x = Math.sample_gamma(m);

        if(x > mu) return k + sample_binomial(mu/x, m-1);
        else{ mu -= x; k += m; }
    }

    var emu = Math.exp(-mu);
    var p = 1;
    do{ p *= random(); k++; } while(p > emu);

    return k-1;
}

// Poisson probability distribution function via iterative expansion
function poisson_pdf(k, mu)
{
    return Math.exp(k * Math.log(mu) - mu - lnfact(k));
}

// Draw sample from a Gamma distribution
// Marsagli and Tsang '00 (roughly optimal)
function sample_gamma(a,b)
{
    if(a < 1) return sample_gamma(1+a,b) * Math.pow(random(), 1/a);

    var x,v,u;
    var d = a-1/3;
    var c = 1/Math.sqrt(9*d);

    while(true)
    {
        do{x = sample_gaussian(0,1);  v = 1+c*x;} while(v <= 0);

        v=v*v*v;
        u=random();

        if((u < 1 - .331*x*x*x*x) || (Math.log(u) < .5*x*x + d*(1 - v + Math.log(v)))) return b*d*v;
    }
}

// Evaluate gamma pdf
function gamma_pdf(x,a,b)
{
    if(x<0) return 0;
    if(x==0) return a==1 ? 1/b : 0;
    if(a==1) return Math.exp(-x/b)/b;
    
    return Math.exp((a - 1)*Math.log(x/b) - x/b - log_gamma(a))/b;
}

// Evaluate log gammma pdf
function gamma_lnpdf(x,a,b)
{
    return (1 - a)*Math.log(x) - x/b - log_gamma(a) - a*Math.log(b);
}

// Draw a sample from a Binomial distribution
// Knuth TAOCP 2 (could be improved, i.e. via Kachitvichyanukul & Schmeiser)
function sample_binomial(p,n)
{
    var k = 0;
    var N = 10;

    var a, b;
    while(n > N)
    {
        a = 1 + n/2;
        b = 1 + n-a;

        var x = sample_beta(a,b);

        if(x >= p){ n = a-1; p /= x; }
        else{ k += a; n = b - 1; p = (p-x) / (1-x); }
    }

    var u;
    for(i=0; i<n; i++)
    {
        u = random();
        if(u<p) k++;
    }

    return k;
}

// Binomial probability distribution function via Normal approximation
// Peizer & Pratt 1968, JASA 63: 1416-1456 (may not be optimal...)
function binomial_pdf(k, p, n)
{
    var inv2 = 1/2, inv3 = 1/3, inv6 = 1/6;

    if (k >= n) return 1;

    var q = 1 - p;
    var s = k + inv2;
    var t = n - k - inv2;
    var d1 = s + inv6 - (n + inv3) * p;
    var d2 = q /(s+inv2) - p/(t+inv2) + (q-inv2)/(n+1);

    d2 = d1 + 0.02 * d2;

    var num = 1 + q * g(s/(n*p)) + p * g(t/(n*q));
    var den = (n + inv6) * p * q;
    var z = num / den;

    z = d2 * Math.sqrt(z);
    z = normal_cdf(z);

    return z;
}

// Draw a sample from a Beta distribution
// Knuth TAOCP 2 (roughly optimal)
function sample_beta(a, b)
{
    var x = sample_gamma(a, 1);
    return x / (x + sample_gamma(b, 1));
}

// Draw a sample from a Gaussian distribution
// Leva '92 (could be improved, i.e. via Ziggurat method)
function sample_gaussian(mu,sigma)
{
    var u, v, x, y, q;

    do
    {
        u = 1 - random();
        v = 1.7156 * (random() - .5);
        x = u - 0.449871;
        y = Math.abs(v) + 0.386595;
        q = x*x + y*(0.196*y - 0.25472*x);
    }
    while(q >= 0.27597 && (q > 0.27846 || v*v > -4 * u * u * Math.log(u)))

    return mu + sigma*v/u;
}

// Evaluate the gaussian distribution
function gaussian_pdf(x,mu,sigma)
{
    x-=mu;
    var asigma = Math.abs(sigma);
    var u = x/asigma;
    return (1/ Math.sqrt(2*Math.PI) * asigma) * Math.exp(-u*u/2);  
}

// Evaluate the log gaussian distribution
function gaussian_lnpdf(x,mu,sigma)
{
    return -.5*(1.8378770664093453 + Math.log(sigma) + (x - mu)*(x - mu)/sigma);
}

// Draw a sample from a Dirichlet distribution
// Law & Kelton (roughly optimal)
// TODO: may need to match function signature for Ikarus compatibility
// TODO: handle underflow in normalization
function sample_dirichlet(alpha)
{
    var theta = new Array(alpha.length);
    var sum = 0;

    for(i=0; i<alpha.length; i++){ theta[i] = sample_gamma(alpha[i],1); sum += theta[i]; }
    for(i=0; i<alpha.length; i++) theta[i] /= sum;

    return theta;
}

// Evaluate the logarithm of the Dirichlet distribution
function dirichlet_lnpdf(alpha, theta)
{
    var logp = 0;
    
    for(i=0; i<alpha.length; i++) logp = (alpha[i] - 1)*Math.log(theta[i]);
    logp += log_gamma(sum(alpha));
    for(i=0; i<alpha.length; i++) logp -= log_gamma(alpha[i]);

    return logp;      
}

// Draw a sample from a Student's t-distribution
// Marsaglia '80
function sample_tdist(nu)
{
    if(nu <= 2) return sample_gaussian(0,1) / sqrt( 2 * sample_gamma(nu/2, 1) / nu);

    var a,b,c,t;
    do
    {
        a = sample_gaussian(0,1);
        b = -1 / (nu/2 - 1) * log1p(-random());
        c = a*a/(nu - 2);
    }
    while(1-c < 0 || Math.exp(-b-c) > (1-c));

    return a / Math.sqrt((1-c/nu) * (1-c));
}

// Evaluate t-distribution
function tdist_pdf(x,nu)
{
    var a = log_gamma(nu/2);
    var b = log_gamma((nu+1)/2);
    
    return Math.exp(b-a)/Math.sqrt(Math.PI*nu) * Math.pow(1 + x*x/nu, -(nu+1)/2);
}

// Draw a sample from a generalized t-distribution
function sample_generalized_tdist(nu,mu,sigma_squared)
{
    return sample_tdist(nu)*Math.sqrt(sigma_squared) + mu;
}

// Return the log of a sum of exponentials, to minimize under/overflow
function logsumexp(v)
{
    var t=0;
    var v;

    for(i=0;i<v.length;i++)
    {
        abs=Math.abs(v[i]);        
        if(abs>t){ t=abs; val=v[i]; }                          
    }

    var sum=0;
    for(i=0;i<v.length;i++) sum += Math.exp(v[i]-val);

    return Math.log(sum) + v;
}

// Evaluate the log of gamma(x)
// Lancsoz approximation from Numerical Recipes in C
function log_gamma(xx)
{
    var cof = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5]; 

    var x = xx - 1.0;
    var tmp = x + 5.5; tmp -= (x + 0.5)*Math.log(tmp);
    var ser=1.000000000190015;
    for (j=0;j<=5;j++){ x++; ser += cof[j]/x; }
    return -tmp+Math.log(2.5066282746310005*ser);
}

// Calculate the sum of elements in a vector
function sum(v)
{
    var sum=0;
    for(i=0;i<v.length;i++) sum += v[i];
    return sum;
}

// Calculate the mean of elements in a vector
function mean(v)
{
    return sum(v)/v.length;
}

// Normalize a vector
function normalize(v)
{
    var s=0;
    for(i=0;i<v.length;i++) s += v[i]*v[i];
    s = Math.sqrt(s);
    for(i=0;i<v.length;i++) v[i] /= s;
    return v;
}

// Returns log(1 + x) in a numerically stable way
function log1p(x)
{
    var ret = 0;
    var n = 50; // degree of precision

    if(x <= -1) return Number.NEGATIVE_INFINITY;
    if(x < 0 || x > 1) return Math.log(1+x);

    for(i=1; i<n; i++)
        if ((i % 2) === 0) ret -= Math.pow(x,i)/i;
        else ret += Math.pow(x,i)/i;

    return ret;
}

// factorial(x)
function fact(x)
{
    var t=1;
    while(x>1) t*=x--;
    return t;
}

// ln(x!) by Stirling's formula
// [Knuth I: p111]
function lnfact(x)
{
    if (x < 1) x = 1;

    if (x < 12) return Math.log(fact(Math.round(x)));

    var invx = 1 / x;
    var invx2 = invx * invx;
    var invx3 = invx2 * invx;
    var invx5 = invx3 * invx2;
    var invx7 = invx5 * invx2;

    var sum = ((x + 0.5) * Math.log(x)) - x;
    sum += Math.log(2*Math.PI) / 2;
    sum += (invx / 12) - (invx3 / 360);
    sum += (invx5 / 1260) - (invx7 / 1680);

    return sum;
}

// logistic(x)
function logistic(x)
{
    return 1 / (1 + Math.exp(-x));
}

// Normal cumulative distribution function
// Abramowitz & Stegun 26.2.19
// |e(x)| < 1.5E-7
function normal_cdf(x)
{
    var d1 = 0.0498673470;
    var d2 = 0.0211410061;
    var d3 = 0.0032776263;
    var d4 = 0.0000380036;
    var d5 = 0.0000488906;
    var d6 = 0.0000053830;
    var a = Math.abs(x);
    var t;

   t = 1.0 + a*(d1+a*(d2+a*(d3+a*(d4+a*(d5+a*d6)))));

   t *= t;  t *= t;  t *= t;  t *= t;
   t = 1.0 / (t+t);

   if (x >= 0)  t = 1-t;
   return t;
}

// Peizer & Pratt 1968, JASA 63: 1416-1456
function g(x)
{
    var  switchlev = 0.1;
    var z;

    if (x == 0)  return 1;
    if (x == 1)  return 0;

    var d = 1 - x;

    if (Math.abs(d) > switchlev) return (1 - (x * x) + (2 * x * Math.log(x))) / (d * d);

    z = d / 3;
    var di = d;

    for (var i = 2; i <= 7; i++)
    {
        di *= d;
        z += (2 * di) / ((i+1) * (i+2));
    }
    return z;
}


var __codeCache = {};
var evalChurchCode = function(churchCode, returnValueHandler){
  var churchInputExpr = sc_read(new sc_StringInputPort("(" + churchCode + ")"));
  var schemeExpr = compile(churchInputExpr, null);
  var wrappedSchemeExpr = scheme2jsTemplate.supplant(
    { churchprogram : String(schemeExpr).slice(1,-1) });
  
  key = hex_md5(wrappedSchemeExpr);
  
  // reset symbol-index to 0 so that recompiling the same code results in the same addresses every time
  BgL_symbolzd2indexzd2=0;
  
  if (__codeCache[key]) {
    console.log("running from client-side cache");
    eval(__codeCache[key])
  } else {
    console.log("submitting to scheme2js server");
    var url="http://focusedattention.org/scheme2js/scheme2js.php?scheme=" +
      encodeURIComponent(wrappedSchemeExpr) +
      "&callback=?";
      jQuery.getJSON(url, null, function(compiledCode){
              __codeCache[key] = compiledCode
              // Set output ports
              SC_DEFAULT_OUT = new sc_GenericOutputPort(returnValueHandler);
              SC_ERROR_OUT = SC_DEFAULT_OUT;
              // Run compiled file
              eval(compiledCode);
      });
    }
};
    return {
      "eval" : evalChurchCode
    };
  })();
var evalChurchCode = jsChurch.eval;
