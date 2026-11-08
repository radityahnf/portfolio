"use client";

import { motion } from "framer-motion";
import { sectionMeta } from "@/lib/sections";
import { lineRise, reveal, stagger, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface Props {
  /** Section id from the nav map — supplies the number and Japanese label. */
  section: string;
  /** Override for sub-sections that aren't in the nav (e.g. Education). */
  label?: string;
  ja?: string;
  index?: string;
  titleId: string;
  /** Headline lines; `outline: true` draws the line as hollow type. */
  lines: { text: string; outline?: boolean }[];
  aside?: React.ReactNode;
  className?: string;
}

/**
 * Editorial section opener: a tiny index and label, the section's name in
 * Japanese, a thin rule, then the headline in oversized condensed type.
 */
export function SectionHead({ section, label, ja, index, titleId, lines, aside, className }: Props) {
  const meta = sectionMeta(section);
  return (
    <motion.header
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={cn("mb-14 md:mb-20", className)}
    >
      <motion.div variants={reveal} className="flex items-baseline justify-between gap-6 pb-4">
        <p className="meta">
          <span className="text-ink">{index ?? meta.code}</span>
          <span className="mx-3 text-ink-3/60">—</span>
          {label ?? meta.label}
        </p>
        <p lang="ja" className="font-serif text-sm tracking-[0.3em] text-ink-3">
          {ja ?? meta.ja}
        </p>
      </motion.div>
      <motion.div variants={reveal} className="rule" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <h2 id={titleId} className="display text-[clamp(2.25rem,6vw,6rem)] text-ink">
          {lines.map((l) => (
            <span key={l.text} className="block overflow-hidden pb-[0.04em]">
              <motion.span variants={lineRise} className={cn("block", l.outline && "outline-text")}>
                {l.text}
              </motion.span>
            </span>
          ))}
        </h2>
        {aside && (
          <motion.div variants={reveal} className="max-w-sm lg:pb-3">
            {aside}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
