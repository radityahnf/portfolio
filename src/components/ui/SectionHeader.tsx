"use client";

import { motion } from "framer-motion";
import { reveal, VIEWPORT } from "@/lib/motion";

interface Props {
  index: string;
  label: string;
  title: string;
  titleId: string;
  description?: string;
}

export function SectionHeader({ index, label, title, titleId, description }: Props) {
  return (
    <motion.header
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="mb-10 grid gap-4 md:mb-12 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16"
    >
      <div>
        <p className="meta mb-4">
          <span className="text-ink-2">{index}</span> <span className="mx-1 text-line-strong">/</span> {label}
        </p>
        <h2 id={titleId} className="text-balance text-[32px] font-medium leading-[1.15] tracking-[-0.02em] text-ink sm:text-[40px]">
          {title}
        </h2>
      </div>
      {description && <p className="max-w-[36rem] text-pretty text-base text-ink-2 lg:pb-1">{description}</p>}
    </motion.header>
  );
}
