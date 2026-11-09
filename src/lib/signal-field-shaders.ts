// A perspective field of points: dim "noise" rows ripple, one bright "signal" row runs
// through them. Camera parallax comes from uPointer; everything else is time-driven.
export const signalFieldVertexShader = `
attribute vec2 aGrid;
attribute float aSignal;

uniform float uTime;
uniform float uAspect;
uniform float uPixelRatio;
uniform vec2 uPointer;
uniform float uShiftX;

varying float vDepth;
varying float vSignal;

const float SPAN_X = 14.0;
const float SPAN_Z = 11.0;
const float NEAR_Z = 1.6;
const float EYE_HEIGHT = 1.35;
const float FOCAL = 1.25;
const float NOISE_SIZE = 2.1;
const float SIGNAL_SIZE = 3.4;

void main() {
  float x = (aGrid.x - 0.5) * SPAN_X;
  float z = NEAR_Z + aGrid.y * SPAN_Z;

  float noise = 0.32 * sin(x * 0.7 + uTime * 0.45) * cos(z * 0.6 - uTime * 0.3)
              + 0.14 * sin((x - z) * 1.4 + uTime * 0.6);
  float signal = 0.62 * sin(x * 1.1 - uTime * 1.2) * exp(-0.018 * x * x) + noise * 0.15;
  float y = mix(noise, signal + 0.35, aSignal) - EYE_HEIGHT;

  float yaw = uPointer.x * 0.22;
  float pivot = NEAR_Z + SPAN_Z * 0.5;
  float cx = x * cos(yaw) - (z - pivot) * sin(yaw);
  float cz = x * sin(yaw) + (z - pivot) * cos(yaw) + pivot;
  float cy = y - uPointer.y * 0.35;

  gl_Position = vec4(cx * FOCAL / (cz * uAspect) + uShiftX, cy * FOCAL / cz - 0.12, 0.0, 1.0);
  gl_PointSize = mix(NOISE_SIZE, SIGNAL_SIZE, aSignal) * uPixelRatio * (4.0 / cz);
  vDepth = aGrid.y;
  vSignal = aSignal;
}
`;

export const signalFieldFragmentShader = `
precision mediump float;

uniform vec3 uNoiseColor;
uniform vec3 uSignalColor;

varying float vDepth;
varying float vSignal;

void main() {
  vec2 offset = gl_PointCoord - 0.5;
  if (dot(offset, offset) > 0.25) discard;
  float nearness = 1.0 - vDepth;
  float alpha = mix(0.08 + 0.42 * nearness * nearness, 0.95, vSignal);
  vec3 color = mix(uNoiseColor, uSignalColor, vSignal);
  gl_FragColor = vec4(color * alpha, alpha);
}
`;
