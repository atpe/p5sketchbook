attribute vec3 aPosition;

void main() {
  vec4 pos4 = vec4(aPosition, 1.0);
  pos4.xy = 2.0 * pos4.xy - 1.0;
  gl_Position = pos4;
}