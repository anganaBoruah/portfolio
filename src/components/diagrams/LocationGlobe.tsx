"use client";

import { useEffect, useRef } from "react";

import { palette } from "@/lib/palette";

type LocationGlobeProps = {
  latitude: number;
  longitude: number;
};

const DEGREE = Math.PI / 180;
const MERIDIAN_STEP = 30 * DEGREE;
const PARALLEL_STEP = 20 * DEGREE;
const PARALLEL_LIMIT = 60 * DEGREE;
const DOT_STEP = 3 * DEGREE;
// Tips the north pole toward the viewer so the pin sits a little above the equator.
const VIEW_TILT = 18 * DEGREE;
const SECONDS_PER_TURN = 48;
const RADIUS_RATIO = 0.46;
const DOT_SIZE = 1.5;
const PIN_RADIUS = 4;
const PIN_RING_RADIUS = 10;
const FRONT_ALPHA_MIN = 0.22;
const FRONT_ALPHA_RANGE = 0.6;
const BACK_ALPHA = 0.06;
const RING_ALPHA = 0.45;

const dots: { lat: number; lon: number }[] = [];
for (let lon = 0; lon < 2 * Math.PI; lon += MERIDIAN_STEP) {
  for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += DOT_STEP)
    dots.push({ lat, lon });
}
for (let lat = -PARALLEL_LIMIT; lat <= PARALLEL_LIMIT; lat += PARALLEL_STEP) {
  for (let lon = 0; lon < 2 * Math.PI; lon += DOT_STEP) dots.push({ lat, lon });
}

function project(lat: number, lon: number, spin: number) {
  const x = Math.cos(lat) * Math.sin(lon + spin);
  const y = Math.sin(lat);
  const z = Math.cos(lat) * Math.cos(lon + spin);
  return {
    x,
    y: y * Math.cos(VIEW_TILT) - z * Math.sin(VIEW_TILT),
    z: y * Math.sin(VIEW_TILT) + z * Math.cos(VIEW_TILT),
  };
}

export function LocationGlobe({ latitude, longitude }: LocationGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pin = { lat: latitude * DEGREE, lon: longitude * DEGREE };
    const homeSpin = -pin.lon;
    const startedAt = performance.now();
    let spin = homeSpin;
    let size = 0;
    let frame = 0;

    const draw = () => {
      const center = size / 2;
      const radius = size * RADIUS_RATIO;
      context.clearRect(0, 0, size, size);
      context.globalAlpha = 1;
      context.strokeStyle = palette.line;
      context.beginPath();
      context.arc(center, center, radius, 0, 2 * Math.PI);
      context.stroke();

      context.fillStyle = palette.paper;
      for (const dot of dots) {
        const point = project(dot.lat, dot.lon, spin);
        context.globalAlpha =
          point.z > 0
            ? FRONT_ALPHA_MIN + FRONT_ALPHA_RANGE * point.z
            : BACK_ALPHA;
        context.fillRect(
          center + point.x * radius - DOT_SIZE / 2,
          center - point.y * radius - DOT_SIZE / 2,
          DOT_SIZE,
          DOT_SIZE,
        );
      }

      const pinPoint = project(pin.lat, pin.lon, spin);
      const pinX = center + pinPoint.x * radius;
      const pinY = center - pinPoint.y * radius;
      context.globalAlpha = pinPoint.z > 0 ? 1 : BACK_ALPHA;
      context.fillStyle = palette.signal;
      context.beginPath();
      context.arc(pinX, pinY, PIN_RADIUS, 0, 2 * Math.PI);
      context.fill();
      context.globalAlpha *= RING_ALPHA;
      context.strokeStyle = palette.signal;
      context.beginPath();
      context.arc(pinX, pinY, PIN_RING_RADIUS, 0, 2 * Math.PI);
      context.stroke();
    };

    const resize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      size = canvas.getBoundingClientRect().width;
      canvas.width = size * pixelRatio;
      canvas.height = size * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    };

    const tick = (now: number) => {
      spin =
        homeSpin + ((now - startedAt) / 1000 / SECONDS_PER_TURN) * 2 * Math.PI;
      draw();
      frame = requestAnimationFrame(tick);
    };

    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry?.isIntersecting && !reduceMotion)
        frame = requestAnimationFrame(tick);
    });
    const sizing = new ResizeObserver(resize);
    visibility.observe(canvas);
    sizing.observe(canvas);
    return () => {
      visibility.disconnect();
      sizing.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [latitude, longitude]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="aspect-square w-full"
    />
  );
}
