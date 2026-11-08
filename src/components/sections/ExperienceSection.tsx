"use client";

import { motion } from "framer-motion";
import { experience } from "@/content/profile";
import type { Experience } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { EASE, VIEWPORT } from "@/lib/motion";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="relative py-28 sm:py-40">
      <div className="shell">
        <SectionHead
          section="experience"
          titleId="exp-title"
          lines={[{ text: "From QA automation" }, { text: "to backend", outline: true }]}
          aside={<p className="font-serif leading-[1.8] text-ink-2">QA intern, backend intern, Odoo developer, now Traveloka.</p>}
        />

        {/* Column headings, like an archive ledger */}
        <div className="meta hidden grid-cols-[220px_1fr] gap-12 border-b border-line-strong pb-4 md:grid">
          <span>Period</span>
          <span>Role and record</span>
        </div>
        <ol>
          {experience.map((job) => (
            <Entry key={job.id} job={job} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Entry({ job }: { job: Experience }) {
  const current = job.end === null;
  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE }}
      className="grid gap-6 border-b border-line py-12 md:grid-cols-[220px_1fr] md:gap-12 md:py-16"
    >
      <div className="flex items-baseline justify-between gap-4 md:block">
        <p className="font-mono text-sm uppercase tracking-[0.12em] text-ink tabular-nums">
          {job.start} — {job.end ?? "Present"}
        </p>
        <p className="meta md:mt-2">{job.type}</p>
        {current && (
          <p className="mt-4 hidden items-center gap-2 md:flex">
            <span lang="ja" className="border border-blood px-1.5 py-0.5 font-serif text-xs text-blood-bright">
              現職
            </span>
            <span className="meta">Current</span>
          </p>
        )}
      </div>

      <div>
        <h3 className="display text-[clamp(1.875rem,3.6vw,3.25rem)] text-ink">{job.role}</h3>
        <p className="mt-3 font-serif text-xl text-ink-2">
          {job.company}
          <span className="ml-3 font-sans text-sm text-ink-3">{job.location}</span>
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_220px] lg:gap-16">
          <ul className="space-y-4">
            {job.highlights.map((h) => (
              <li key={h} className="grid grid-cols-[20px_1fr] text-pretty leading-[1.8] text-ink-2">
                <span aria-hidden className="mt-3.5 h-px w-3 bg-ink-3" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-8">
            {job.impact && (
              <div>
                <p className="display text-6xl text-blood-bright">{job.impact.value}</p>
                <p className="meta mt-3 leading-5">{job.impact.label}</p>
              </div>
            )}
            {job.stack.length > 0 && (
              <div>
                <p className="meta mb-2">Stack</p>
                <p className="text-sm leading-[1.8] text-ink-2">{job.stack.join(" · ")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}
