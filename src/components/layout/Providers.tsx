"use client";

import { MotionConfig } from "framer-motion";
import { IntroProvider } from "./IntroSequence";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <IntroProvider>{children}</IntroProvider>
    </MotionConfig>
  );
}
