"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

const DEFAULT_MAX_TILT_DEG = 6;
const POINTER_CENTER = 0.5;
const PERCENT = 100;

// Children opt into depth with [transform:translateZ(...)]; the card keeps preserve-3d.
export function TiltCard({
  children,
  className = "",
  maxTilt = DEFAULT_MAX_TILT_DEG,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function follow(event: PointerEvent<HTMLDivElement>) {
    const card = cardRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!card || event.pointerType !== "mouse" || reduceMotion) return;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    card.style.setProperty("--tilt-x", `${(POINTER_CENTER - y) * maxTilt}deg`);
    card.style.setProperty("--tilt-y", `${(x - POINTER_CENTER) * maxTilt}deg`);
    card.style.setProperty("--glare-x", `${x * PERCENT}%`);
    card.style.setProperty("--glare-y", `${y * PERCENT}%`);
  }

  function settle() {
    const card = cardRef.current;
    if (!card) return;
    for (const property of ["--tilt-x", "--tilt-y", "--glare-x", "--glare-y"]) {
      card.style.removeProperty(property);
    }
  }

  return (
    <div className="h-full [perspective:70rem]">
      <div
        ref={cardRef}
        onPointerMove={follow}
        onPointerLeave={settle}
        className={`group/tilt relative h-full transition-transform duration-500 ease-(--ease-soft) [transform-style:preserve-3d] [transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] motion-reduce:transition-none ${className}`}
      >
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100 [background:radial-gradient(28rem_circle_at_var(--glare-x,50%)_var(--glare-y,50%),rgb(238_235_225/0.07),transparent_60%)]"
        />
      </div>
    </div>
  );
}
