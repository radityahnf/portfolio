import type { Transition, Variants } from "framer-motion";

/** Shared easing — a calm "expo out" curve used across the site. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const transition = (delay = 0, duration = 0.8): Transition => ({
  duration,
  delay,
  ease: EASE,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transition() },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transition(0, 0.9) },
};

export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** Default viewport settings for scroll reveals. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;
