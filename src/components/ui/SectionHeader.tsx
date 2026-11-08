"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface Props {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "left" | "split";
}

/** Consistent section heading: index, system label, headline and optional description. */
export function SectionHeader({ index, label, title, description, className, align = "split" }: Props) {
  return (
    <motion.header
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={cn(
        "mb-12 grid gap-6 md:mb-16",
        align === "split" && "lg:grid-cols-[1.2fr_1fr] lg:items-end",
        className,
      )}
    >
      <div>
        <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
          <span className="font-mono text-2xs text-cyan">[{index}]</span>
          <span className="h-px w-10 bg-gradient-to-r from-cyan/70 to-transparent" />
          <span className="label">{label}</span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-balance font-display text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.5rem]"
        >
          {title}
        </motion.h2>
      </div>
      {description && (
        <motion.p variants={fadeUp} className="max-w-xl text-pretty text-base leading-relaxed text-ink-muted lg:pb-2 lg:text-[17px]">
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
