"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type LiquidEtherProps = {
  autoSpeed?: number;
  className?: string;
  colors?: [string, string, string, string];
  intensity?: number;
  mouseForce?: number;
  resolution?: number;
  style?: CSSProperties;
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform float uIntensity;
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.52;
    mat2 rotate = mat2(0.78, -0.62, 0.62, 0.78);

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = rotate * p * 2.04 + vec2(18.4, 9.7);
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 ratio = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 pos = (uv - 0.5) * ratio;
    vec2 pointer = (uPointer - 0.5) * ratio;

    float time = uTime * 0.16;
    float distanceToPointer = length(pos - pointer);
    float pointerRipple = exp(-distanceToPointer * distanceToPointer * 10.0) * uPointerStrength;

    vec2 driftA = vec2(time * 0.34, -time * 0.18);
    vec2 driftB = vec2(-time * 0.14, time * 0.28);
    vec2 liquidWarp = vec2(
      fbm(pos * 2.1 + driftA),
      fbm(pos * 2.4 + driftB)
    ) - 0.5;

    vec2 field = pos + liquidWarp * 0.34 + pointerRipple * 0.11;
    float ether = fbm(field * 2.1 + vec2(time * 0.32, -time * 0.2));
    float vein = fbm(field * 5.6 + vec2(-time * 0.42, time * 0.24));
    float ribbon = smoothstep(0.38, 0.84, ether + vein * 0.24 + pointerRipple * 0.58);
    float mist = smoothstep(0.12, 0.92, fbm(field * 1.2 + time * 0.22));

    vec3 paletteA = mix(uColor0, uColor1, smoothstep(0.18, 0.82, ether));
    vec3 paletteB = mix(uColor2, uColor3, smoothstep(0.2, 0.86, vein));
    vec3 color = mix(paletteA, paletteB, mist * 0.62);
    color += vec3(0.08, 0.06, 0.03) * pointerRipple;

    float edgeFade = smoothstep(0.02, 0.22, uv.x) *
      smoothstep(0.02, 0.22, uv.y) *
      (1.0 - smoothstep(0.78, 0.98, uv.x)) *
      (1.0 - smoothstep(0.78, 0.98, uv.y));
    float alpha = (0.08 + ribbon * 0.34 + mist * 0.12 + pointerRipple * 0.22) * edgeFade * uIntensity;

    gl_FragColor = vec4(color, alpha);
  }
`;

function colorToVec3(color: string) {
  const parsed = new THREE.Color(color);
  return new THREE.Vector3(parsed.r, parsed.g, parsed.b);
}

export function LiquidEther({
  autoSpeed = 0.36,
  className = "",
  colors = ["#c8a96a", "#789aa3", "#b36b52", "#91a28f"],
  intensity = 1,
  mouseForce = 0.85,
  resolution = 0.62,
  style
}: LiquidEtherProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || typeof window === "undefined") return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
      premultipliedAlpha: false
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5) * resolution);
    renderer.domElement.className = "liquid-ether-canvas";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uPointerStrength: { value: 0 },
      uIntensity: { value: intensity },
      uColor0: { value: colorToVec3(colors[0]) },
      uColor1: { value: colorToVec3(colors[1]) },
      uColor2: { value: colorToVec3(colors[2]) },
      uColor3: { value: colorToVec3(colors[3]) }
    };
    const material = new THREE.ShaderMaterial({
      blending: THREE.NormalBlending,
      depthTest: false,
      depthWrite: false,
      fragmentShader,
      transparent: true,
      uniforms,
      vertexShader
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const pointer = new THREE.Vector2(0.5, 0.5);
    const targetPointer = new THREE.Vector2(0.5, 0.5);
    let pointerStrength = 0;
    let targetStrength = 0;
    let lastInteraction = 0;
    let raf = 0;

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetPointer.set(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight);
      targetStrength = mouseForce;
      lastInteraction = performance.now();
    };

    const animate = (now: number) => {
      const seconds = now * 0.001;
      const idle = now - lastInteraction > 2200;

      if (idle) {
        targetPointer.set(
          0.5 + Math.sin(seconds * autoSpeed * 0.92) * 0.32 + Math.sin(seconds * autoSpeed * 0.31) * 0.06,
          0.5 + Math.cos(seconds * autoSpeed * 0.74) * 0.28
        );
        targetStrength = 0.42;
      } else {
        targetStrength *= 0.965;
      }

      pointer.lerp(targetPointer, 0.055);
      pointerStrength += (targetStrength - pointerStrength) * 0.05;

      uniforms.uTime.value = seconds;
      uniforms.uPointer.value.copy(pointer);
      uniforms.uPointerStrength.value = pointerStrength;
      uniforms.uIntensity.value = intensity;

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    resize();
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [autoSpeed, colors, intensity, mouseForce, resolution]);

  return (
    <div
      aria-hidden="true"
      className={`liquid-ether-container ${className}`}
      ref={mountRef}
      style={style}
    />
  );
}
