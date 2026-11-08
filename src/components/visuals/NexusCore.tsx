"use client";

import { useEffect, useRef } from "react";

/**
 * NEXUS core — a rotating geodesic structure with orbiting capability nodes,
 * drawn with Canvas 2D and a hand-rolled 3D projection.
 * - No WebGL needed, so there's nothing to fall back from.
 * - Pauses when off-screen or when the tab is hidden.
 * - Renders one still frame for reduced-motion users.
 * - Tilts toward the pointer on devices that can hover.
 */

type Vec3 = [number, number, number];

interface Props {
  labels: string[];
  className?: string;
  onRotation?: (x: number, y: number) => void;
}

const PHI = (1 + Math.sqrt(5)) / 2;

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
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  const addEdge = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (edgeSet.has(key)) return;
    edgeSet.add(key);
    edges.push([a, b]);
  };
  for (const [a, b, c] of faces) {
    const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a);
    addEdge(a, ab); addEdge(ab, b); addEdge(b, bc); addEdge(bc, c); addEdge(c, ca); addEdge(ca, a);
    addEdge(ab, bc); addEdge(bc, ca); addEdge(ca, ab);
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

export function NexusCore({ labels, className, onRotation }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onRotationRef = useRef(onRotation);
  onRotationRef.current = onRotation;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const { verts, edges } = buildGeodesic();

    // Signals that travel along edges.
    const signals = Array.from({ length: 7 }, () => ({
      e: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.35 + Math.random() * 0.5,
    }));

    const rings = [
      { tiltX: 1.15, tiltZ: 0.35, r: 1.55, speed: 0.22 },
      { tiltX: 1.45, tiltZ: -0.6, r: 1.85, speed: -0.16 },
      { tiltX: 0.55, tiltZ: 1.1, r: 2.1, speed: 0.12 },
    ];

    let w = 0, h = 0, dpr = 1, scale = 1, compact = false;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      compact = w < 420;
      scale = Math.min(w, h) * (compact ? 0.2 : 0.19);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(0);
    });
    ro.observe(canvas);

    const rx = -0.35;
    let ry = 0.6;
    let targetTiltX = 0, targetTiltY = 0, tiltX = 0, tiltY = 0;
    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetTiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 0.9;
      targetTiltX = ((e.clientY - rect.top) / rect.height - 0.5) * 0.7;
    };
    if (canHover && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    const project = (v: Vec3) => {
      const persp = 4 / (4 + v[2]);
      return { x: w / 2 + v[0] * scale * persp, y: h / 2 + v[1] * scale * persp, z: v[2], p: persp };
    };

    let last = performance.now();
    let time = 0;
    let raf = 0;
    let running = false;
    let reportAcc = 0;

    const draw = (dt: number) => {
      time += dt;
      ry += dt * 0.18;
      tiltX += (targetTiltX - tiltX) * Math.min(1, dt * 3);
      tiltY += (targetTiltY - tiltY) * Math.min(1, dt * 3);
      const RX = rx + tiltX;
      const RY = ry + tiltY;

      ctx.clearRect(0, 0, w, h);

      // Core glow
      const cx = w / 2, cy = h / 2;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 1.6);
      glow.addColorStop(0, "rgba(77,141,255,0.28)");
      glow.addColorStop(0.45, "rgba(155,123,255,0.08)");
      glow.addColorStop(1, "rgba(8,11,18,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Rings + satellites (computed first so back halves can be drawn behind the core)
      type Sat = { x: number; y: number; z: number; label: string; color: string };
      const sats: Sat[] = [];
      const ringPaths: { pts: { x: number; y: number; z: number }[] }[] = [];
      rings.forEach((ring, ri) => {
        const pts: { x: number; y: number; z: number }[] = [];
        const ringAt = (a: number): Vec3 => {
          let v: Vec3 = [Math.cos(a) * ring.r, 0, Math.sin(a) * ring.r];
          // tilt the ring plane
          const c = Math.cos(ring.tiltX), s = Math.sin(ring.tiltX);
          v = [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
          const cz = Math.cos(ring.tiltZ), sz = Math.sin(ring.tiltZ);
          v = [v[0] * cz - v[1] * sz, v[0] * sz + v[1] * cz, v[2]];
          return rotate(v, RX * 0.6, tiltY * 0.8);
        };
        for (let i = 0; i <= 72; i++) {
          const p = project(ringAt((i / 72) * Math.PI * 2));
          pts.push(p);
        }
        ringPaths.push({ pts });
        const perRing = compact ? 1 : 2;
        for (let k = 0; k < perRing; k++) {
          const li = ri * 2 + k;
          if (li >= labels.length) continue;
          const a = time * ring.speed + (k * Math.PI) + ri * 1.3;
          const p = project(ringAt(a));
          sats.push({ ...p, label: labels[li], color: ri === 1 ? "#9B7BFF" : ri === 2 ? "#69E3FF" : "#4D8DFF" });
        }
      });

      const drawRings = (front: boolean) => {
        ctx.lineWidth = 1;
        for (const { pts } of ringPaths) {
          for (let i = 0; i < pts.length - 1; i++) {
            const a = pts[i], b = pts[i + 1];
            const z = (a.z + b.z) / 2;
            if (front ? z > 0 : z <= 0) continue;
            const alpha = front ? 0.38 : 0.12;
            ctx.strokeStyle = `rgba(137,149,170,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      };

      drawRings(false);

      // Geodesic sphere
      const pv = verts.map((v) => project(rotate(v, RX, RY)));
      for (const [a, b] of edges) {
        const pa = pv[a], pb = pv[b];
        const z = (pa.z + pb.z) / 2; // -1 (front) .. 1 (back)
        const depth = (1 - z) / 2;
        ctx.strokeStyle = `rgba(${Math.round(77 + 28 * depth)},${Math.round(141 + 86 * depth)},255,${0.06 + depth * 0.42})`;
        ctx.lineWidth = 0.6 + depth * 0.7;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
      for (let i = 0; i < pv.length; i++) {
        const p = pv[i];
        const depth = (1 - p.z) / 2;
        const pulse = i % 7 === 0 ? 0.5 + 0.5 * Math.sin(time * 2 + i) : 0;
        ctx.fillStyle = `rgba(232,237,247,${0.15 + depth * 0.65})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.8 + depth * 1.4 + pulse * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Inner counter-rotating octahedron
      const oct: Vec3[] = [[0.5, 0, 0], [-0.5, 0, 0], [0, 0.5, 0], [0, -0.5, 0], [0, 0, 0.5], [0, 0, -0.5]];
      const po = oct.map((v) => project(rotate(v, -RX * 1.4 + time * 0.3, -RY * 1.6)));
      ctx.strokeStyle = "rgba(105,227,255,0.55)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        for (let j = i + 1; j < 6; j++) {
          if (Math.floor(i / 2) === Math.floor(j / 2)) continue;
          ctx.moveTo(po[i].x, po[i].y);
          ctx.lineTo(po[j].x, po[j].y);
        }
      }
      ctx.stroke();

      // Signals
      for (const s of signals) {
        s.t += dt * s.speed;
        if (s.t >= 1) {
          s.t = 0;
          // continue from the end vertex along a connected edge
          const end = edges[s.e][1];
          const next = edges.findIndex(([a], idx) => a === end && idx !== s.e);
          s.e = next >= 0 ? next : Math.floor(Math.random() * edges.length);
        }
        const [a, b] = edges[s.e];
        const pa = pv[a], pb = pv[b];
        const x = pa.x + (pb.x - pa.x) * s.t;
        const y = pa.y + (pb.y - pa.y) * s.t;
        const depth = (1 - (pa.z + pb.z) / 2) / 2;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, `rgba(105,227,255,${0.35 + depth * 0.6})`);
        g.addColorStop(1, "rgba(105,227,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      drawRings(true);

      // Satellites with leader lines to the core
      ctx.font = `500 ${compact ? 9 : 10}px "JetBrains Mono Variable", ui-monospace, monospace`;
      for (const s of sats) {
        const front = s.z <= 0;
        const alpha = front ? 1 : 0.35;
        ctx.strokeStyle = `rgba(137,149,170,${front ? 0.18 : 0.06})`;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 7, 0, Math.PI * 2);
        ctx.stroke();

        const text = s.label.toUpperCase();
        const tw = ctx.measureText(text).width;
        const right = s.x > cx;
        const tx = Math.max(6, Math.min(w - tw - 6, right ? s.x + 14 : s.x - 14 - tw));
        ctx.fillStyle = "rgba(8,11,18,0.75)";
        ctx.fillRect(tx - 5, s.y - 9, tw + 10, 17);
        ctx.strokeStyle = "rgba(137,149,170,0.3)";
        ctx.strokeRect(tx - 5, s.y - 9, tw + 10, 17);
        ctx.fillStyle = "#E8EDF7";
        ctx.fillText(text, tx, s.y + 3.5);
        ctx.globalAlpha = 1;
      }

      reportAcc += dt;
      if (onRotationRef.current && reportAcc > 0.12) {
        reportAcc = 0;
        const deg = (r: number) => ((((r * 180) / Math.PI) % 360) + 360) % 360;
        onRotationRef.current(deg(RX), deg(RY));
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
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

    // Wait for the mono font so the first frame's labels render correctly.
    document.fonts?.ready.then(() => draw(0));
    draw(0);

    let inView = true;
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
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
  }, [labels]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
