"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/content/profile";
import type { Source } from "@/content/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, stagger, VIEWPORT, EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

const SOURCE_META: Record<Source, { label: string; color: string }> = {
  cv: { label: "CV / work", color: "#4D8DFF" },
  project: { label: "Projects", color: "#69E3FF" },
  "previous-portfolio": { label: "Earlier portfolio", color: "#9B7BFF" },
};

const FILTERS: { id: Source | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cv", label: SOURCE_META.cv.label },
  { id: "project", label: SOURCE_META.project.label },
  { id: "previous-portfolio", label: SOURCE_META["previous-portfolio"].label },
];

export function CapabilitiesSection() {
  const [filter, setFilter] = useState<Source | "all">("all");
  const total = skillCategories.reduce((n, c) => n + c.skills.length, 0);
  const matching =
    filter === "all" ? total : skillCategories.reduce((n, c) => n + c.skills.filter((s) => s.source === filter).length, 0);

  return (
    <section id="capabilities" aria-labelledby="cap-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40 mask-fade-y" />
      <div className="shell relative">
        <SectionHeader
          index="02"
          label="Capabilities registry"
          title={<span id="cap-title">The modules this system runs on.</span>}
          description="No skill bars or made-up percentages — each entry shows where I've actually used it."
        />

        {/* Registry toolbar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-6 flex flex-col gap-4 rounded-xl border border-line bg-navy/50 p-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between"
        >
          <div role="group" aria-label="Filter skills by source" className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => {
              const on = filter === f.id;
              const color = f.id === "all" ? "#E8EDF7" : SOURCE_META[f.id].color;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "flex min-h-9 items-center gap-2 rounded-md border px-3 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors",
                    on ? "border-line-strong bg-slate text-ink" : "border-transparent text-ink-muted hover:text-ink",
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, opacity: on ? 1 : 0.5 }} />
                  {f.label}
                </button>
              );
            })}
          </div>
          <p className="px-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint" aria-live="polite">
            <span className="text-cyan tabular-nums">{String(matching).padStart(2, "0")}</span> / {total} entries ·{" "}
            {skillCategories.length} modules
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {skillCategories.map((cat) => {
            const active = filter === "all" ? cat.skills.length : cat.skills.filter((s) => s.source === filter).length;
            return (
              <motion.article
                key={cat.id}
                variants={fadeUp}
                className={cn(
                  "panel glow-border group flex flex-col overflow-hidden transition-opacity duration-500",
                  active === 0 && "opacity-40",
                )}
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <header className="relative border-b border-line px-5 pb-4 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xs text-cyan">{cat.code}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                      {String(cat.skills.length).padStart(2, "0")} units
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-ink">{cat.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{cat.description}</p>
                  {/* animated bus line */}
                  <motion.span
                    aria-hidden
                    className="absolute bottom-[-1px] left-0 h-px origin-left bg-gradient-to-r from-cyan via-blue to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                    style={{ width: "100%" }}
                  />
                </header>
                <ul className="flex-1 divide-y divide-line/60 px-2 py-2">
                  {cat.skills.map((s) => {
                    const dim = filter !== "all" && s.source !== filter;
                    const meta = SOURCE_META[s.source];
                    return (
                      <li
                        key={s.name}
                        className={cn(
                          "flex items-start gap-3 rounded-md px-3 py-2.5 transition-all duration-300",
                          dim ? "opacity-25" : "hover:bg-slate/60",
                        )}
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45"
                          style={{ background: meta.color, boxShadow: dim ? "none" : `0 0 8px ${meta.color}` }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-ink">{s.name}</p>
                          <p className="mt-0.5 font-mono text-[11px] leading-relaxed text-ink-faint">{s.context}</p>
                        </div>
                        <span className="sr-only">Source: {meta.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
