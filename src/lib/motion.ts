import type { Variants } from "framer-motion";

/** One easing curve for the whole site. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Section entrance: a short fade and 8px rise. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export const stagger = (step = 0.05): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step } },
});

export const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;
