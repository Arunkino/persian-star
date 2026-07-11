"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * "Plasma cutter" hero effect: a white-hot point travels the perimeter of a
 * rounded-rect frame, leaving a fading red cut-line and throwing small sparks.
 *
 * Engineered to never hurt UX:
 * - single canvas + one rAF, particle cap, DPR clamped
 * - pauses when offscreen (IntersectionObserver) or tab hidden
 * - renders nothing under prefers-reduced-motion
 * - pointer-events: none, aria-hidden
 */
interface SparkFrameProps {
  className?: string;
  /** Corner radius of the traced frame (match the framed card). */
  radius?: number;
  /** Gap between canvas edge and the traced frame — headroom for sparks. */
  inset?: number;
  /** Seconds for one full loop of the frame. */
  loopSeconds?: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  ttl: number;
  size: number;
}

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

export function SparkFrame({
  className,
  radius = 10,
  inset = 48,
  loopSeconds = 16,
}: SparkFrameProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const TRAIL_MS = 700;

    let raf = 0;
    let inView = true;
    let tabVisible = true;
    let last = performance.now();
    let dist = 0;
    let spawnAcc = 0;
    let perimeter = 1;
    let maxSparks = 140;
    let spawnRate = 90; // sparks per second (continuous)
    let pointAt: (d: number) => { x: number; y: number; tx: number; ty: number } =
      () => ({ x: 0, y: 0, tx: 1, ty: 0 });

    const sparks: Spark[] = [];
    const trail: TrailPoint[] = [];

    /** Rebuild the parametric rounded-rect path from the current canvas size. */
    const rebuild = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      maxSparks = w < 640 ? 70 : 140;
      spawnRate = w < 640 ? 50 : 90;

      const x0 = inset;
      const y0 = inset;
      const x1 = w - inset;
      const y1 = h - inset;
      const r = Math.max(1, Math.min(radius, (x1 - x0) / 2, (y1 - y0) / 2));
      const ew = x1 - x0 - 2 * r; // straight edge widths
      const eh = y1 - y0 - 2 * r;
      const arc = (Math.PI / 2) * r;
      perimeter = 2 * ew + 2 * eh + 4 * arc;

      // Clockwise from the top-left corner's end: top → TR arc → right → BR
      // arc → bottom → BL arc → left → TL arc. Returns position + tangent.
      pointAt = (d: number) => {
        d = ((d % perimeter) + perimeter) % perimeter;
        if (d < ew) return { x: x0 + r + d, y: y0, tx: 1, ty: 0 };
        d -= ew;
        if (d < arc) {
          const a = -Math.PI / 2 + d / r;
          return {
            x: x1 - r + Math.cos(a) * r,
            y: y0 + r + Math.sin(a) * r,
            tx: -Math.sin(a),
            ty: Math.cos(a),
          };
        }
        d -= arc;
        if (d < eh) return { x: x1, y: y0 + r + d, tx: 0, ty: 1 };
        d -= eh;
        if (d < arc) {
          const a = d / r;
          return {
            x: x1 - r + Math.cos(a) * r,
            y: y1 - r + Math.sin(a) * r,
            tx: -Math.sin(a),
            ty: Math.cos(a),
          };
        }
        d -= arc;
        if (d < ew) return { x: x1 - r - d, y: y1, tx: -1, ty: 0 };
        d -= ew;
        if (d < arc) {
          const a = Math.PI / 2 + d / r;
          return {
            x: x0 + r + Math.cos(a) * r,
            y: y1 - r + Math.sin(a) * r,
            tx: -Math.sin(a),
            ty: Math.cos(a),
          };
        }
        d -= arc;
        if (d < eh) return { x: x0, y: y1 - r - d, tx: 0, ty: -1 };
        d -= eh;
        const a = Math.PI + d / r;
        return {
          x: x0 + r + Math.cos(a) * r,
          y: y0 + r + Math.sin(a) * r,
          tx: -Math.sin(a),
          ty: Math.cos(a),
        };
      };
    };

    const spawn = (
      x: number,
      y: number,
      tx: number,
      ty: number,
      count: number,
    ) => {
      for (let i = 0; i < count; i++) {
        if (sparks.length >= maxSparks) return;
        // Spray backwards off the cut direction with a wide cone.
        const spread = (Math.random() - 0.5) * Math.PI * 0.9;
        const cos = Math.cos(spread);
        const sin = Math.sin(spread);
        const dx = -tx * cos - -ty * sin;
        const dy = -tx * sin + -ty * cos;
        const speed = 40 + Math.random() * 220;
        sparks.push({
          x,
          y,
          vx: dx * speed,
          vy: dy * speed - 20,
          age: 0,
          ttl: 0.35 + Math.random() * 0.75,
          size: 0.8 + Math.random() * 1.6,
        });
      }
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!inView || !tabVisible) return;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Advance the cutter
      dist += (perimeter / loopSeconds) * dt;
      const head = pointAt(dist);
      trail.push({ x: head.x, y: head.y, t: now });
      while (trail.length && now - trail[0].t > TRAIL_MS) trail.shift();

      // Fading cut-line
      ctx.lineCap = "round";
      for (let i = 1; i < trail.length; i++) {
        const p0 = trail[i - 1];
        const p1 = trail[i];
        const age = (now - p1.t) / TRAIL_MS;
        ctx.strokeStyle = `rgba(255,59,59,${(1 - age) * 0.55})`;
        ctx.lineWidth = 2 * (1 - age) + 0.4;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }

      // Continuous spray + occasional burst
      spawnAcc += spawnRate * dt;
      while (spawnAcc > 1) {
        spawnAcc -= 1;
        spawn(head.x, head.y, head.tx, head.ty, 1);
      }
      if (Math.random() < dt * 0.8) {
        spawn(head.x, head.y, head.tx, head.ty, 6 + Math.floor(Math.random() * 6));
      }

      // Sparks (additive so they read as light)
      ctx.globalCompositeOperation = "lighter";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.age += dt;
        if (s.age >= s.ttl) {
          sparks.splice(i, 1);
          continue;
        }
        s.vy += 420 * dt; // gravity
        s.vx *= Math.exp(-1.6 * dt); // drag
        s.vy *= Math.exp(-0.4 * dt);
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const k = s.age / s.ttl; // 0 → 1: white-hot → ember red
        const g = Math.round(210 * (1 - k) + 45 * k);
        const b = Math.round(140 * (1 - k));
        ctx.fillStyle = `rgba(255,${g},${b},${1 - k})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (1 - k * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }

      // Cutter head: soft glow + white-hot core
      const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 22);
      glow.addColorStop(0, "rgba(255,120,60,0.5)");
      glow.addColorStop(1, "rgba(255,59,59,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,240,220,0.95)";
      ctx.beginPath();
      ctx.arc(head.x, head.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    const ro = new ResizeObserver(rebuild);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    const onVisibility = () => {
      tabVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    rebuild();
    raf = requestAnimationFrame((t) => {
      last = t;
      step(t);
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [radius, inset, loopSeconds]);

  return (
    <div
      className={cn("pointer-events-none absolute", className)}
      aria-hidden="true"
    >
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
