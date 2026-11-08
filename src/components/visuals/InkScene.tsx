"use client";

import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { grassPath, ridgePath } from "./Ink";

/**
 * Hero landscape: ink-wash mountains in layers of mist, a field of grass in the
 * foreground and a blood-red sun. Layers drift at different speeds on scroll.
 * Static otherwise — nothing loops.
 */
export function InkScene({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = (dist: number) => (reduce ? 0 : dist);
  const ySun = useTransform(scrollYProgress, [0, 1], [0, p(220)]);
  const yFar = useTransform(scrollYProgress, [0, 1], [0, p(150)]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, p(90)]);
  const yNear = useTransform(scrollYProgress, [0, 1], [0, p(40)]);

  const paths = useMemo(
    () => ({
      far: ridgePath({ seed: 21, base: 620, height: 340, peaks: 4 }),
      mid: ridgePath({ seed: 8, base: 760, height: 330, peaks: 3 }),
      near: ridgePath({ seed: 42, base: 860, height: 190, peaks: 5 }),
      grassBack: grassPath({ seed: 5, count: 520, height: 120 }),
      grassFront: grassPath({ seed: 9, count: 260, height: 210 }),
    }),
    [],
  );

  return (
    <div ref={ref} className={className} aria-hidden>
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        <defs>
          <linearGradient id="wash-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#57524e" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#3a3734" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#1a1918" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#090909" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wash-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34312f" />
            <stop offset="45%" stopColor="#1e1d1c" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0c0c0c" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="wash-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#161515" />
            <stop offset="100%" stopColor="#080808" />
          </linearGradient>
          <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8E3DC" stopOpacity="0" />
            <stop offset="50%" stopColor="#E8E3DC" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#E8E3DC" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="sun-hero" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#B3121C" />
            <stop offset="70%" stopColor="#A30D17" />
            <stop offset="100%" stopColor="#650B12" />
          </radialGradient>
          <filter id="fog-blur" x="-10%" y="-60%" width="120%" height="220%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#090909" stopOpacity="0" />
            <stop offset="100%" stopColor="#090909" />
          </linearGradient>
        </defs>

        {/* Sun, low and slightly behind the far range */}
        <motion.g style={{ y: ySun }}>
          <circle cx="1120" cy="420" r="138" fill="url(#sun-hero)" filter="url(#ink-bleed)" />
        </motion.g>

        <motion.g style={{ y: yFar }}>
          <path d={paths.far} fill="url(#wash-far)" filter="url(#ink-wash)" />
          <rect x="-100" y="500" width="1800" height="220" fill="url(#fog)" filter="url(#fog-blur)" />
        </motion.g>

        <motion.g style={{ y: yMid }}>
          <path d={paths.mid} fill="url(#wash-mid)" filter="url(#ink-wash)" />
          <rect x="-100" y="640" width="1800" height="220" fill="url(#fog)" filter="url(#fog-blur)" />
        </motion.g>

        <motion.g style={{ y: yNear }}>
          <path d={paths.near} fill="url(#wash-near)" filter="url(#ink-wash)" />
          <path d={paths.grassBack} fill="#0d0d0d" />
          <path d={paths.grassFront} fill="#070707" />
        </motion.g>

        <rect x="0" y="860" width="1600" height="140" fill="url(#ground)" />
      </svg>
    </div>
  );
}
