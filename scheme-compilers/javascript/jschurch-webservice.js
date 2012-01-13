var evalChurchCode = function(churchCode, returnValueHandler){
  var churchInputExpr = sc_read(new sc_StringInputPort("(" + churchCode + ")"));
  var schemeExpr = compile(churchInputExpr, null);
  var wrappedSchemeExpr = scheme2jsTemplate.supplant(
    { churchprogram : String(schemeExpr).slice(1,-1) });
  var url="http://focusedattention.org/scheme2js/scheme2js.php?scheme=" +
    encodeURIComponent(wrappedSchemeExpr) +
    "&callback=?";
  jQuery.getJSON(url, null, function(compiledCode){
              // Set output ports
              SC_DEFAULT_OUT = new sc_GenericOutputPort(returnValueHandler);
              SC_ERROR_OUT = SC_DEFAULT_OUT;
              // Run compiled file
              eval(compiledCode);
            });
};