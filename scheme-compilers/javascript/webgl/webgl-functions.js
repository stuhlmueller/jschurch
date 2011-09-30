var gl;
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var shaderProgram;

function initGL(canvas) 
{
    try
    {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } 
    catch (e) {}
    if(!gl)  alert("Could not initialise WebGL, sorry :-(");
}

function drawScene() 
{
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var aspectRatio = gl.viewportWidth / gl.viewportHeight;
    mat4.perspective(45, aspectRatio, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES,0,triangleVertexPositionBuffer.numItems);
}

function webGLStart() 
{
    var canvas = document.getElementById("canvas");
    initGL(canvas);
    initShaders();
    initBuffers();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    drawScene();
}

function getShader(gl,id) 
{
    var shaderScript = document.getElementById(id);

    document.write(shaderScript);

    if(!shaderScript) return null;
    
    var str = "";
    var k = shaderScript.firstChild;
    while(k) 
    {
        if (k.nodeType == 3) str += k.textContent;
        k = k.nextSibling;
    }
    
    var shader;
    if(shaderScript.type == "x-shader/x-fragment") shader = gl.createShader(gl.FRAGMENT_SHADER);
    else if(shaderScript.type == "x-shader/x-vertex") shader = gl.createShader(gl.VERTEX_SHADER);
    else return null;
    
    gl.shaderSource(shader,str);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) 
    {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }    
    return shader;
}

function initShaders() 
{
    var fragmentShader = getShader(gl,"shader-fs");
    var vertexShader = getShader(gl,"shader-vs");
    
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram,vertexShader);
    gl.attachShader(shaderProgram,fragmentShader);
    gl.linkProgram(shaderProgram);
    
    if (!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)) alert("Could not initialise shaders");
    
    gl.useProgram(shaderProgram);
      
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    
    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram,"uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram,"uMVMatrix");
}


function setMatrixUniforms() 
{
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform,false,pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform,false,mvMatrix);
}

function initBuffers() 
{
    triangleVertexPositionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER,triangleVertexPositionBuffer);

    var vertices = [0,0,0,1,0,0,1,1,0];

    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
    triangleVertexPositionBuffer.itemSize = 3;
    triangleVertexPositionBuffer.numItems = 3;
}
