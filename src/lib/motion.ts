import type { Variants } from "framer-motion";

/** One slow, cinematic ease-out used everywhere. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

/** For text masked by an overflow-hidden parent: the line rises into view. */
export const lineRise: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 1.1, ease: EASE } },
};

export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;
