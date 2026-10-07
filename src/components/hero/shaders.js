// 3D simplex noise — Ashima Arts / Stefan Gustavson (MIT).
const noise = /* glsl */ `
vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x  = x_ * ns.x + ns.yyyy;
  vec4 y  = y_ * ns.x + ns.yyyy;
  vec4 h  = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

export const orbVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDisp;
${noise}
void main() {
  float t = uTime * 0.25;
  float n1 = snoise(position * 1.1 + vec3(t, t * 0.8, -t * 0.6));
  float n2 = snoise(position * 3.2 - vec3(t * 1.4));
  float disp = n1 * uAmp + n2 * 0.045;
  vDisp = disp;

  vec3 displaced = position + normal * disp;
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`

export const orbFragment = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDisp;

// Cosine palette (Inigo Quilez) tuned to blue / purple / cyan.
vec3 palette(float t) {
  vec3 a = vec3(0.45, 0.40, 0.75);
  vec3 b = vec3(0.35, 0.30, 0.25);
  vec3 c = vec3(1.0);
  vec3 d = vec3(0.62, 0.72, 0.45);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewDir))), 2.2);
  vec3 irid = palette(vDisp * 1.8 + fresnel * 0.6 + uTime * 0.05);
  vec3 base = mix(vec3(0.02, 0.03, 0.08), irid, 0.3 + 0.7 * smoothstep(-0.25, 0.35, vDisp));
  vec3 rim = mix(vec3(0.31, 0.49, 1.0), vec3(0.13, 0.83, 0.93), fresnel);
  vec3 color = base * 0.55 + rim * fresnel * 1.7;
  gl_FragColor = vec4(color, 1.0);
}
`

export const haloVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aScale;
attribute float aSpeed;
varying float vAlpha;
varying float vMix;
void main() {
  vec3 p = position;
  float ang = uTime * 0.06 * aSpeed;
  float c = cos(ang), s = sin(ang);
  p.xz = mat2(c, -s, s, c) * p.xz;
  p.y += sin(uTime * 0.6 * aSpeed + position.x * 2.0) * 0.06;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aScale * uPixelRatio * (18.0 / -mv.z);
  vAlpha = 0.25 + 0.5 * (aScale / 2.0);
  vMix = fract(aSpeed * 7.13);
}
`

export const haloFragment = /* glsl */ `
varying float vAlpha;
varying float vMix;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.0, d) * vAlpha;
  vec3 col = mix(vec3(0.31, 0.49, 1.0), vec3(0.13, 0.83, 0.93), vMix);
  gl_FragColor = vec4(col, a);
}
`
