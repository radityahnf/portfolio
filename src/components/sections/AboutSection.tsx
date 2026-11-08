"use client";

import { motion } from "framer-motion";
import { about } from "@/content/profile";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { reveal, stagger, VIEWPORT } from "@/lib/motion";

// Formal numerals (daiji), which read clearly as characters at small sizes.
const KANJI_NUMERALS = ["壱", "弐", "参", "肆"];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 sm:py-40">
      <div className="shell">
        <SectionHead
          section="about"
          titleId="about-title"
          lines={[{ text: "Backend that holds" }, { text: "up in production", outline: true }]}
        />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Summary and record */}
          <Reveal className="lg:col-span-5">
            <p className="font-serif text-2xl leading-[1.6] text-ink sm:text-[28px]">{about.summary}</p>
            <dl className="mt-12 border-t border-line">
              {about.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[120px_1fr] items-baseline gap-4 border-b border-line py-4">
                  <dt className="meta">{f.label}</dt>
                  <dd className="text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Reasoning, set like short essays */}
          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="space-y-14 lg:col-span-6 lg:col-start-7 lg:pt-2"
          >
            {about.panels.map((p, i) => (
              <motion.article key={p.id} variants={reveal} className="grid grid-cols-[40px_1fr] gap-4">
                <span lang="ja" aria-hidden className="font-serif text-2xl leading-none text-blood-bright">
                  {KANJI_NUMERALS[i]}
                </span>
                <div>
                  <h3 className="meta mb-4 text-ink-2">{p.label}</h3>
                  {p.title && <p className="display mb-4 text-4xl text-ink">{p.title}</p>}
                  <p className="text-pretty text-[17px] leading-[1.8] text-ink-2">{p.body}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
