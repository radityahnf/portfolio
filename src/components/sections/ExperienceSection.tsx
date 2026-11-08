"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experience } from "@/content/profile";
import type { Experience } from "@/content/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusDot } from "@/components/ui/StatusDot";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function ExperienceSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" aria-labelledby="exp-title" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="04"
          label="Deployment history"
          title={<span id="exp-title">Where I&apos;ve shipped.</span>}
          description="From QA automation to backend engineering — each role added a layer to how I build and support systems."
        />

        <ol ref={listRef} className="relative">
          {/* Timeline rail */}
          <div aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:left-[calc(200px+7px)]">
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-cyan via-blue to-violet shadow-[0_0_10px_rgba(105,227,255,0.6)]"
              style={{ scaleY: progress }}
            />
          </div>

          {experience.map((job, i) => (
            <TimelineEntry key={job.id} job={job} index={i} total={experience.length} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineEntry({ job, index, total }: { job: Experience; index: number; total: number }) {
  const active = job.end === null;
  const deployId = `DEPLOY_${String(total - index).padStart(2, "0")}`;

  return (
    <li className="relative grid gap-4 pb-12 pl-9 last:pb-0 md:grid-cols-[200px_1fr] md:gap-0 md:pl-0">
      {/* Date column */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE }}
        className="md:pr-10 md:pt-5 md:text-right"
      >
        <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink">
          {job.start} — {job.end ?? <span className="text-ok">Present</span>}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          {deployId} · {job.type}
        </p>
      </motion.div>

      {/* Marker */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center md:left-[200px] md:top-6"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
      >
        <span className={cn("absolute inset-0 rotate-45 border bg-void", active ? "border-ok" : "border-cyan/70")} />
        <span className={cn("relative h-1.5 w-1.5 rotate-45", active ? "bg-ok shadow-[0_0_10px_#5BE3A6]" : "bg-cyan")} />
      </motion.span>

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
        className="panel group md:ml-10"
      >
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line p-5 sm:p-6">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">{job.role}</h3>
            <p className="mt-1 text-ink-muted">
              <span className="text-ink">{job.company}</span>
              <span className="mx-2 text-ink-faint">/</span>
              {job.location}
            </p>
          </div>
          {active && (
            <span className="flex items-center gap-2 rounded-full border border-ok/30 bg-ok/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ok">
              <StatusDot /> Active
            </span>
          )}
        </header>
        <div className="p-5 sm:p-6">
          <p className="label mb-3">{job.summary}</p>
          {job.impact && (
            <div className="mb-5 flex items-center gap-4 rounded-lg border border-cyan/25 bg-cyan/[0.05] px-4 py-3">
              <span className="font-display text-3xl font-semibold tracking-tight text-cyan">{job.impact.value}</span>
              <span className="font-mono text-[11px] uppercase leading-snug tracking-[0.08em] text-ink-muted">{job.impact.label}</span>
            </div>
          )}
          <ul className="space-y-2.5">
            {job.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink-muted">
                <span aria-hidden className="mt-[10px] h-px w-3 shrink-0 bg-cyan/70" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          {job.stack.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
              {job.stack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.article>
    </li>
  );
}
