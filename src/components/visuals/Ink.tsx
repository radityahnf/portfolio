/**
 * Shared ink-wash primitives, drawn in SVG so they stay sharp at any size and
 * cost almost nothing to load. No images, no WebGL.
 */

/** Filters used across the page. Rendered once, near the top of <main>. */
export function InkDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        {/* Rough, bleeding edge for the sun and seals */}
        <filter id="ink-bleed" colorInterpolationFilters="sRGB" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="0.6" />
        </filter>
        {/* Brush-like ridgelines and wash edges for mountains */}
        <filter id="ink-wash" colorInterpolationFilters="sRGB" x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="4" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="22" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="1.2" />
        </filter>
        {/* Dry-brush stroke texture */}
        <filter id="ink-stroke" colorInterpolationFilters="sRGB" x="-5%" y="-50%" width="110%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.04" numOctaves="2" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

/** Deterministic pseudo-random numbers, so server and client render the same scene. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** A mountain ridge as a closed path across the full width. */
export function ridgePath(opts: { seed: number; base: number; height: number; peaks: number; width?: number; floor?: number }) {
  const { seed, base, height, peaks, width = 1600, floor = 1000 } = opts;
  const r = rng(seed);
  const pts: [number, number][] = [];
  const steps = peaks * 8;
  // A few peaks with sharp-ish summits, plus small noise for brush texture.
  const peakX = Array.from({ length: peaks }, (_, i) => ((i + 0.3 + r() * 0.5) / peaks) * width);
  const peakH = peakX.map(() => height * (0.45 + r() * 0.55));
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    let y = base;
    for (let k = 0; k < peaks; k++) {
      const d = Math.abs(x - peakX[k]) / (width / peaks);
      y -= peakH[k] * Math.max(0, 1 - d * 1.15) ** 1.6;
    }
    y += (r() - 0.5) * height * 0.06;
    pts.push([x, y]);
  }
  return `M0,${floor} L${pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L")} L${width},${floor} Z`;
}

/** Foreground grass as one path of thin, slightly bent blades. */
export function grassPath(opts: { seed: number; count: number; width?: number; floor?: number; height: number }) {
  const { seed, count, width = 1600, floor = 1000, height } = opts;
  const r = rng(seed);
  let d = "";
  for (let i = 0; i < count; i++) {
    const x = r() * width;
    const h = height * (0.35 + r() * 0.65);
    const lean = (r() - 0.35) * h * 0.45;
    const w = 1.5 + r() * 2.5;
    d += `M${(x - w).toFixed(1)},${floor} Q${(x + lean * 0.4).toFixed(1)},${(floor - h * 0.6).toFixed(1)} ${(x + lean).toFixed(1)},${(floor - h).toFixed(1)} Q${(x + lean * 0.4 + w).toFixed(1)},${(floor - h * 0.55).toFixed(1)} ${(x + w).toFixed(1)},${floor} Z `;
  }
  return d;
}

/** The red sun: a single blood-red disc with an ink-bled edge. */
export function RedSun({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <radialGradient id="sun-fill" cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#B3121C" />
          <stop offset="65%" stopColor="#A30D17" />
          <stop offset="100%" stopColor="#650B12" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="88" fill="url(#sun-fill)" filter="url(#ink-bleed)" />
    </svg>
  );
}

/** Name seal (hanko): katakana stacked vertically inside a worn red square. */
export function Seal({ text, className }: { text: string; className?: string }) {
  const chars = [...text];
  const size = 64;
  const step = (size - 16) / chars.length;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} role="img" aria-label={`Seal: ${text}`}>
      <rect x="4" y="4" width={size - 8} height={size - 8} rx="3" fill="#A30D17" filter="url(#ink-bleed)" />
      <rect x="8" y="8" width={size - 16} height={size - 16} fill="none" stroke="#090909" strokeOpacity="0.55" strokeWidth="1" />
      {chars.map((c, i) => (
        <text
          key={i}
          x={size / 2}
          y={8 + step * (i + 0.5)}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily='"Shippori Mincho", serif'
          fontSize={step * 0.9}
          fontWeight={500}
          fill="#090909"
          fillOpacity="0.85"
        >
          {c}
        </text>
      ))}
    </svg>
  );
}

/** A single dry-brush stroke, used as a red underline on hover. */
export function BrushStroke({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 24" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        d="M4 14 C 60 6, 140 18, 220 11 S 360 8, 396 12 L 394 17 C 330 20, 250 15, 170 19 S 40 20, 6 18 Z"
        fill="#A30D17"
        filter="url(#ink-stroke)"
      />
    </svg>
  );
}

/** Seigaiha (wave) pattern, for very faint background bands. */
export function Seigaiha({ className, id = "seigaiha" }: { className?: string; id?: string }) {
  return (
    <svg className={className} aria-hidden>
      <defs>
        <pattern id={id} width="48" height="24" patternUnits="userSpaceOnUse">
          {[22, 16, 10, 4].map((r) => (
            <g key={r} fill="none" stroke="rgba(232,227,220,0.6)" strokeWidth="0.6">
              <path d={`M${24 - r},24 A${r},${r} 0 0 1 ${24 + r},24`} />
              <path d={`M${-r},12 A${r},${r} 0 0 1 ${r},12`} />
              <path d={`M${48 - r},12 A${r},${r} 0 0 1 ${48 + r},12`} />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
