"use client";

import { motion } from "framer-motion";
import { about, profile } from "@/content/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";
import { StatusDot } from "@/components/ui/StatusDot";

const PANEL_ACCENTS = ["#4D8DFF", "#9B7BFF", "#69E3FF", "#5BE3A6"];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="01"
          label="System overview"
          title={
            <span id="about-title">
              An engineer who builds for <span className="grad-text">production</span>, not just for demos.
            </span>
          }
          description="A quick read on who I am, how I work, and what I'm focused on right now."
        />

        <div className="grid gap-5 lg:grid-cols-12">
          {/* Diagnostic summary */}
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="panel brackets overflow-hidden lg:col-span-5"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="label">diag://profile</span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ok">
                <StatusDot /> Loaded
              </span>
            </div>
            <div className="p-5 sm:p-7">
              <p className="font-display text-xl font-medium leading-snug text-ink sm:text-[22px]">{profile.shortName}</p>
              <p className="mt-4 text-pretty leading-relaxed text-ink-muted">{about.summary}</p>

              <dl className="mt-7 space-y-0 font-mono text-xs">
                {about.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline gap-3 border-t border-line py-2.5">
                    <dt className="shrink-0 uppercase tracking-[0.1em] text-ink-faint">{f.label}</dt>
                    <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-line-strong" />
                    <dd className="text-right text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7">
                <p className="label mb-3">Main interests</p>
                <ul className="flex flex-wrap gap-2">
                  {about.interests.map((i, idx) => (
                    <li key={i} className="chip">
                      <span className="text-ink-faint">{String(idx + 1).padStart(2, "0")}</span>
                      <span className="text-ink">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>

          {/* Panels */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid gap-5 sm:grid-cols-2 lg:col-span-7"
          >
            {about.panels.map((p, i) => (
              <motion.article
                key={p.id}
                variants={fadeUp}
                className="panel glow-border group flex flex-col overflow-hidden p-5 sm:p-6"
                style={{ ["--accent" as string]: PANEL_ACCENTS[i % PANEL_ACCENTS.length] }}
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-2xs uppercase" style={{ color: PANEL_ACCENTS[i % PANEL_ACCENTS.length] }}>
                    {p.label}
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint">0{i + 1}/0{about.panels.length}</span>
                </div>
                <PanelGlyph index={i} color={PANEL_ACCENTS[i % PANEL_ACCENTS.length]} />
                <h3 className="mt-auto pt-6 font-display text-xl font-semibold tracking-tight text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{p.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Small abstract glyph per panel — purely decorative. */
function PanelGlyph({ index, color }: { index: number; color: string }) {
  const common = { fill: "none", stroke: color, strokeWidth: 1.2 } as const;
  return (
    <svg viewBox="0 0 120 48" className="h-12 w-28 opacity-80" aria-hidden>
      {index === 0 && (
        <g {...common}>
          <rect x="2" y="16" width="22" height="16" rx="3" />
          <rect x="49" y="16" width="22" height="16" rx="3" />
          <rect x="96" y="16" width="22" height="16" rx="3" />
          <path d="M24 24h25M71 24h25" strokeDasharray="3 3" className="dash-flow" />
        </g>
      )}
      {index === 1 && (
        <g {...common}>
          <path d="M2 36h30l10-24h36l10 24h30" />
          <path d="M42 12v24M78 12v24" opacity=".4" />
          <circle cx="60" cy="24" r="4" fill={color} stroke="none" />
        </g>
      )}
      {index === 2 && (
        <g {...common}>
          <path d="M2 34 L18 30 L30 32 L44 18 L58 22 L72 10 L86 16 L100 8 L118 12" />
          <path d="M2 44h116" opacity=".3" />
          <circle cx="72" cy="10" r="3" fill={color} stroke="none" />
        </g>
      )}
      {index === 3 && (
        <g {...common}>
          <circle cx="24" cy="24" r="14" />
          <path d="M17 24l5 5 9-10" />
          <path d="M44 24h20" strokeDasharray="2 3" />
          <rect x="70" y="10" width="48" height="28" rx="4" />
          <path d="M78 20h20M78 28h32" opacity=".5" />
        </g>
      )}
    </svg>
  );
}
