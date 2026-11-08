"use client";

import { useEffect, useRef } from "react";

/**
 * The NEXUS core — a slowly rotating geodesic sphere drawn with Canvas 2D and a
 * small hand-rolled 3D projection. One color, depth shown only through opacity.
 * - No WebGL, so there's nothing to fall back from.
 * - Pauses off-screen and when the tab is hidden.
 * - Draws one still frame for reduced-motion users.
 * - Tilts slightly toward the pointer on devices that can hover.
 */

type Vec3 = [number, number, number];

const PHI = (1 + Math.sqrt(5)) / 2;
const ACCENT = "77,141,255";

function buildGeodesic(): { verts: Vec3[]; edges: [number, number][] } {
  const base: Vec3[] = [
    [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
    [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
    [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
  ];
  const faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];
  const norm = (v: Vec3): Vec3 => {
    const l = Math.hypot(...v);
    return [v[0] / l, v[1] / l, v[2] / l];
  };
  const verts: Vec3[] = base.map(norm);
  const cache = new Map<string, number>();
  const mid = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    const hit = cache.get(key);
    if (hit !== undefined) return hit;
    const va = verts[a], vb = verts[b];
    verts.push(norm([(va[0] + vb[0]) / 2, (va[1] + vb[1]) / 2, (va[2] + vb[2]) / 2]));
    cache.set(key, verts.length - 1);
    return verts.length - 1;
  };
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  const add = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (!seen.has(key)) {
      seen.add(key);
      edges.push([a, b]);
    }
  };
  for (const [a, b, c] of faces) {
    const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a);
    add(a, ab); add(ab, b); add(b, bc); add(bc, c); add(c, ca); add(ca, a);
    add(ab, bc); add(bc, ca); add(ca, ab);
  }
  return { verts, edges };
}

const rotate = (v: Vec3, rx: number, ry: number): Vec3 => {
  const [x, y, z] = v;
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cx = Math.cos(rx), sx = Math.sin(rx);
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx];
};

export function NexusCore({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const { verts, edges } = buildGeodesic();
    const oct: Vec3[] = [[0.42, 0, 0], [-0.42, 0, 0], [0, 0.42, 0], [0, -0.42, 0], [0, 0, 0.42], [0, 0, -0.42]];

    let w = 0, h = 0, scale = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.min(w, h) * 0.4;
    };
    resize();

    const rx = -0.35;
    let ry = 0.6;
    let targetX = 0, targetY = 0, tiltX = 0, tiltY = 0;
    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      targetY = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
      targetX = ((e.clientY - r.top) / r.height - 0.5) * 0.4;
    };
    if (canHover && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    const project = (v: Vec3) => {
      const p = 4 / (4 + v[2]);
      return { x: w / 2 + v[0] * scale * p, y: h / 2 + v[1] * scale * p, z: v[2] };
    };

    let time = 0;
    const draw = (dt: number) => {
      time += dt;
      ry += dt * 0.12;
      tiltX += (targetX - tiltX) * Math.min(1, dt * 3);
      tiltY += (targetY - tiltY) * Math.min(1, dt * 3);
      const RX = rx + tiltX, RY = ry + tiltY;

      ctx.clearRect(0, 0, w, h);

      // Sphere: back edges faint, front edges brighter. One hue throughout.
      const pv = verts.map((v) => project(rotate(v, RX, RY)));
      for (const [a, b] of edges) {
        const pa = pv[a], pb = pv[b];
        const front = (1 - (pa.z + pb.z) / 2) / 2; // 0 back .. 1 front
        ctx.strokeStyle = `rgba(${ACCENT},${0.08 + front * 0.5})`;
        ctx.lineWidth = 0.75 + front * 0.5;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
      ctx.fillStyle = `rgb(${ACCENT})`;
      for (const p of pv) {
        const front = (1 - p.z) / 2;
        ctx.globalAlpha = 0.15 + front * 0.75;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + front * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Inner octahedron, turning the other way.
      const po = oct.map((v) => project(rotate(v, -RX * 1.3 + time * 0.2, -RY * 1.5)));
      ctx.strokeStyle = `rgba(${ACCENT},0.45)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < 6; i++)
        for (let j = i + 1; j < 6; j++) {
          if (Math.floor(i / 2) === Math.floor(j / 2)) continue;
          ctx.moveTo(po[i].x, po[i].y);
          ctx.lineTo(po[j].x, po[j].y);
        }
      ctx.stroke();
    };

    let raf = 0, last = 0, running = false;
    const loop = (now: number) => {
      draw(Math.min(0.05, (now - last) / 1000));
      last = now;
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(0);
    });
    ro.observe(canvas);
    draw(0);

    let inView = true;
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView && !document.hidden) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : inView && start());
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
