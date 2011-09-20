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

// Binomial probability distribution function via Normal approximation
// Peizer & Pratt 1968, JASA 63: 1416-1456
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

// Poisson probability distribution function via iterative expansion
function poisson_pdf(k, mu)
{
    return Math.exp(k * Math.log(mu) - mu - lnfact(k));
}

// Draw sample from Poisson distribution
// Knuth TAOCP 2
function sample_poisson_knuth(mu)
{
    var n = Math.floor(mu);  
    if(n<1) n=1;
    
    var x = sample_gamma(n);
    if(x>u) return sample_binomial(n-1, mu/x);
    else return sample n+sample_poisson(mu-x);
}

// Draw sample from Poisson distribution
// Ahrens-Dieter
function sample_poisson(mu)
{
    var k=0;
    var w=mu;
    var c=18;  // 16 to 24?

    if(w<c)
    {        
        var p=1;
        var b=Math.exp(-w);
        do
        {
            var u=Math.random();
            p=p*u;
            k++;
        } while(p<b);
    }
    else
    {
        var d = 7/8;
        var n = Math.floor[d * w];
        var x = sample_gamma(n);
        
    }
}

// Draw a sample from a Gaussian distribution
// Marsaglia '64
// TODO: replace with Ziggurat method
var gaussian_spare,have_spare=false;
function sample_gaussian(mu,sigma)
{
    if(have_spare){ have_spare=false; return gaussian_spare; }

    var x,y;
    do
    {
        x = 2*Math.random() - 1; y = 2*Math.random() - 1;
        s = x*x + y*y;
    } 
    while(s >= 1);
    
    var t = Math.sqrt(-2*Math.log(s)/s);
    gaussian_spare=t*y; have_spare=true;
    return t*x;
}

// Draw sample from a Gamma distribution
// Marsagli and Tsang '00
// This is reasonably efficient provided sample_gaussian is efficient
function sample_gamma(a)
{
    var x,v,u;
    var d = a-1/3;
    var c = 1/Math.sqrt(9*d);

    while(true)
    {
        do{x = sample_gaussian(0,1);  v = 1+c*x;} while(v <= 0);
        
        v=v*v*v; 
        u=Math.random();
        
        if(u < 1 - .331*(x*x)*(x*x)) return d*v;
        if(Math.log(u) < .5*x*x + d*(1 - v + Math.log(v))) return d*v;
    }            
}