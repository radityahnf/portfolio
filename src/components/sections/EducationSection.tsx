"use client";

import { motion } from "framer-motion";
import { certifications, education } from "@/content/profile";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";
import { ArrowUpRight } from "@/components/ui/Icons";

export function EducationSection() {
  return (
    <section id="education" aria-labelledby="edu-title" className="relative pb-24 sm:pb-32">
      <div className="shell">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid gap-5 lg:grid-cols-[200px_1fr]"
        >
          <motion.div variants={fadeUp} className="lg:pt-6">
            <p className="font-mono text-2xs text-cyan">[04.1]</p>
            <h2 id="edu-title" className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
              Education
            </h2>
            {certifications.length > 0 && <p className="label mt-1">&amp; certifications</p>}
          </motion.div>

          <div className="grid gap-4 lg:ml-10">
            {education.map((e) => (
              <motion.article key={e.institution} variants={fadeUp} className="panel brackets overflow-hidden">
                <div className="grid md:grid-cols-[1fr_auto]">
                  <div className="p-5 sm:p-7">
                    <p className="label">Academic record</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                      {e.degree}
                    </h3>
                    <p className="mt-2 text-ink-muted">
                      {e.institution}
                      <span className="mx-2 text-ink-faint">/</span>
                      {e.location}
                    </p>
                    {e.notes.length > 0 && (
                      <ul className="mt-4 space-y-1 text-sm text-ink-muted">
                        {e.notes.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <dl className="grid grid-cols-2 gap-px border-t border-line bg-line font-mono text-[11px] uppercase tracking-[0.1em] md:grid-cols-1 md:border-l md:border-t-0">
                    <div className="bg-navy px-5 py-4 md:px-7">
                      <dt className="text-ink-faint">Enrolled</dt>
                      <dd className="mt-1 text-ink">{e.start}</dd>
                    </div>
                    <div className="bg-navy px-5 py-4 md:px-7">
                      <dt className="text-ink-faint">Graduated</dt>
                      <dd className="mt-1 text-ink">{e.end}</dd>
                    </div>
                  </dl>
                </div>
              </motion.article>
            ))}

            {certifications.length > 0 && (
              <motion.ul variants={fadeUp} className="grid gap-3 sm:grid-cols-2">
                {certifications.map((c) => (
                  <li key={c.name} className="panel p-5">
                    <p className="label">
                      {c.issuer} · {c.year}
                    </p>
                    <p className="mt-2 font-medium text-ink">
                      {c.url ? (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-cyan">
                          {c.name} <ArrowUpRight />
                        </a>
                      ) : (
                        c.name
                      )}
                    </p>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
