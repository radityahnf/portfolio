"use client";

import { motion } from "framer-motion";
import { reveal, VIEWPORT } from "@/lib/motion";

/** Fades and lifts a block once as it scrolls into view. */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VIEWPORT} className={className}>
      {children}
    </motion.div>
  );
}
