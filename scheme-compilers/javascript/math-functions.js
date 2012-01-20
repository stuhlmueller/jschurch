// Set the random number generator
var random = new MRG32k3a();
var intRandom = random.uint32;

// Use these functions from the scheme2js runtime.js if available
var sc_list2vector = (typeof sc_list2vector == "function") ? sc_list2vector : function(x) { return x };
var sc_vector2list = (typeof sc_vector2list == "function") ? sc_vector2list : function(x) { return x };

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
    alpha = sc_list2vector(alpha);
    var theta = new Array(alpha.length);
    var sum = 0;

    for(i=0; i<alpha.length; i++){ theta[i] = sample_gamma(alpha[i],1); sum += theta[i]; }
    for(i=0; i<alpha.length; i++) theta[i] /= sum;
    
    return sc_vector2list(theta);
}

// Evaluate the logarithm of the Dirichlet distribution
function dirichlet_lnpdf(theta, alpha)
{
    alpha = sc_list2vector(alpha);
    theta = sc_list2vector(theta);
    var logp = log_gamma(sum(alpha));
    
    for(i=0; i<alpha.length; i++) logp += (alpha[i] - 1)*Math.log(theta[i]);
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
    v = sc_list2vector(v);
    var t=0,
        val;

    for(i=0;i<v.length;i++)
    {
        var abs=Math.abs(v[i]);        
        if(abs>t){ t=abs; val=v[i]; }                          
    }

    var sum=0;
    for(i=0;i<v.length;i++) {
      sum += Math.exp(v[i]-val);
    }

    return Math.log(sum) + val;
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
// N.B.: this doesn't get used in compiled Church->JS code
// so we don't need to use sc_list2vector / sc_vector2list
function sum(v)
{
    var sum=0;
    for(i=0;i<v.length;i++) sum += v[i];
    return sum;
}

// Calculate the mean of elements in a vector
// N.B.: this doesn't get used in compiled Church->JS code
// so we don't need to use sc_list2vector / sc_vector2list
function mean(v)
{
    return sum(v)/v.length;
}

// Normalize a vector
function normalize(v)
{
    v = sc_list2vector(v);
    var s=0;
    for(i=0;i<v.length;i++) s += v[i]*v[i];
    s = Math.sqrt(s);
    for(i=0;i<v.length;i++) v[i] /= s;
    return sc_vector2list(v);
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
