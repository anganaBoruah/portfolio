"use client";

import { useEffect, useRef } from "react";

import { palette } from "@/lib/palette";
import {
  signalFieldFragmentShader,
  signalFieldVertexShader,
} from "@/lib/signal-field-shaders";

const WIDE_GRID = { columns: 150, rows: 60 };
const NARROW_GRID = { columns: 80, rows: 44 };
const NARROW_BREAKPOINT_PX = 640;
const WIDE_BREAKPOINT_PX = 1024;
// Pushes the field right on wide screens so the signal clears the name column.
const WIDE_SHIFT_X = 0.35;
const SIGNAL_POINTS_PER_COLUMN = 4;
const SIGNAL_DEPTH = 0.3;
const MAX_PIXEL_RATIO = 2;
const POINTER_EASING = 0.05;
const MS_PER_SECOND = 1000;
const HEX_CHANNEL = 255;
const POINTER_CENTER = 0.5;

const toRgb = (hex: string) =>
  [1, 3, 5].map(
    (start) => parseInt(hex.slice(start, start + 2), 16) / HEX_CHANNEL,
  );

function buildPoints(width: number) {
  const { columns, rows } =
    width < NARROW_BREAKPOINT_PX ? NARROW_GRID : WIDE_GRID;
  const signalCount = columns * SIGNAL_POINTS_PER_COLUMN;
  const grid: number[] = [];
  const signal: number[] = [];
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      grid.push(column / (columns - 1), row / (rows - 1));
      signal.push(0);
    }
  }
  for (let i = 0; i < signalCount; i++) {
    grid.push(i / (signalCount - 1), SIGNAL_DEPTH);
    signal.push(1);
  }
  return {
    grid: new Float32Array(grid),
    signal: new Float32Array(signal),
    count: signal.length,
  };
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", {
      antialias: true,
      premultipliedAlpha: true,
    });
    if (!canvas || !gl) return;
    const vertex = compile(gl, gl.VERTEX_SHADER, signalFieldVertexShader);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, signalFieldFragmentShader);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);

    const points = buildPoints(canvas.clientWidth);
    for (const [name, data, size] of [
      ["aGrid", points.grid, 2],
      ["aSignal", points.signal, 1],
    ] as const) {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const location = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    }
    const uniform = (name: string) => gl.getUniformLocation(program, name);
    gl.uniform3fv(uniform("uNoiseColor"), toRgb(palette.paper));
    gl.uniform3fv(uniform("uSignalColor"), toRgb(palette.signal));
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let frame = 0;

    const draw = (time: number) => {
      pointer.x += (pointer.targetX - pointer.x) * POINTER_EASING;
      pointer.y += (pointer.targetY - pointer.y) * POINTER_EASING;
      gl.uniform1f(uniform("uTime"), reduceMotion ? 0 : time / MS_PER_SECOND);
      gl.uniform2f(uniform("uPointer"), pointer.x, pointer.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, points.count);
    };
    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };
    const resize = () => {
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        MAX_PIXEL_RATIO,
      );
      canvas.width = canvas.clientWidth * pixelRatio;
      canvas.height = canvas.clientHeight * pixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(
        uniform("uAspect"),
        canvas.clientWidth / canvas.clientHeight,
      );
      gl.uniform1f(uniform("uPixelRatio"), pixelRatio);
      gl.uniform1f(
        uniform("uShiftX"),
        canvas.clientWidth >= WIDE_BREAKPOINT_PX ? WIDE_SHIFT_X : 0,
      );
      draw(performance.now());
    };
    const onPointerMove = (event: globalThis.PointerEvent) => {
      pointer.targetX = event.clientX / window.innerWidth - POINTER_CENTER;
      pointer.targetY = event.clientY / window.innerHeight - POINTER_CENTER;
    };

    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry?.isIntersecting && !reduceMotion)
        frame = requestAnimationFrame(loop);
    });
    const sizing = new ResizeObserver(resize);
    visibility.observe(canvas);
    sizing.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      visibility.disconnect();
      sizing.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="size-full" />;
}
