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