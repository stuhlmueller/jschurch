attribute vec3 vertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main(void) 
{
    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
}
