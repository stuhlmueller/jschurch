var __codeCache = {};
var evalChurchCode = function(churchCode, returnValueHandler){
  var key = hex_md5(churchCode);

  var churchInputExpr = "";
  var schemeExpr = "";
  var compilationSuccess = true;
  try {
    churchInputExpr = sc_read(new sc_StringInputPort("(" + churchCode + ")"));
    schemeExpr = compile(churchInputExpr, null);
    var wrappedSchemeExpr = scheme2jsTemplate.supplant(
      { churchprogram : String(schemeExpr).slice(1,-1) });
  } catch (err) {
    compilationSuccess = false;
    returnValueHandler(err);
  }

  if (!(compilationSuccess)) {
    return false;
  }

  if (__codeCache[key]) {
    console.log("running from client-side cache");
    eval(__codeCache[key]);
  } else {
    console.log("submitting to scheme2js server");
    var url="http://focusedattention.org/scheme2js/scheme2js.php?scheme=" +
      encodeURIComponent(wrappedSchemeExpr) +
      "&callback=?";
      jQuery.getJSON(url, null, function(compiledCode){
              __codeCache[key] = compiledCode;
              // Set output ports
              SC_DEFAULT_OUT = new sc_GenericOutputPort(returnValueHandler);
              SC_ERROR_OUT = SC_DEFAULT_OUT;
              // Run compiled file
              try {
                eval(compiledCode);
              } catch (err) {
                returnValueHandler(err);
              }
      });
    }
};