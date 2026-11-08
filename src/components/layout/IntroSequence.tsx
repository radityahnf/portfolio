"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Short "system boot" intro. It plays once per browser session, can be
 * skipped with the button or Escape, and never plays for reduced-motion users.
 * The page underneath is fully rendered the whole time.
 */

const IntroContext = createContext<{ done: boolean }>({ done: true });
export const useIntro = () => useContext(IntroContext);

import { INTRO_STORAGE_KEY } from "@/lib/constants";
const DURATION_MS = 1600;

const BOOT_LINES = ["Loading profile", "Loading experience", "Loading projects", "Ready"];

export function IntroProvider({ children }: { children: React.ReactNode }) {
  // `pending` until we know on the client whether to play the intro.
  const [state, setState] = useState<"pending" | "playing" | "done">("pending");

  useEffect(() => {
    const skip = document.documentElement.dataset.intro === "skip";
    setState(skip ? "done" : "playing");
  }, []);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      /* storage unavailable — fine */
    }
    document.documentElement.dataset.intro = "skip";
    setState("done");
  }, []);

  return (
    <IntroContext.Provider value={{ done: state === "done" }}>
      {children}
      <AnimatePresence>{state !== "done" && <IntroOverlay key="intro" onDone={finish} active={state === "playing"} />}</AnimatePresence>
    </IntroContext.Provider>
  );
}

function IntroOverlay({ onDone, active }: { onDone: () => void; active: boolean }) {
  const [progress, setProgress] = useState(0);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!active) return;
    skipRef.current?.focus({ preventScroll: true });
    const start = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION_MS);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(loop);
      else window.setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(loop);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onDone();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, onDone]);

  const pct = Math.round(progress * 100);
  const visibleLines = Math.min(BOOT_LINES.length, Math.floor(progress * (BOOT_LINES.length + 1)));

  return (
    <motion.div
      className="nexus-intro fixed inset-0 z-[100] flex items-center justify-center bg-page"
      role="dialog"
      aria-modal="true"
      aria-label="NEXUS intro"
      exit={{ opacity: 0, transition: { duration: 0.4, ease: EASE } }}
    >
      <motion.div
        className="w-[min(88vw,400px)]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="mb-6 flex items-end justify-between">
          <p className="text-[40px] font-medium leading-none tracking-[0.04em] text-ink">NEXUS</p>
          <p className="font-mono text-sm tabular-nums text-ink-2">{pct}%</p>
        </div>

        <div className="relative h-px w-full bg-line" aria-hidden>
          <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${pct}%` }} />
        </div>

        <ul className="mt-6 h-24 space-y-2 font-mono text-xs text-ink-3" aria-live="off">
          {BOOT_LINES.slice(0, visibleLines).map((line) => (
            <li key={line} className="flex justify-between">
              <span>{line}</span>
              <span className="text-positive">ok</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <button
        ref={skipRef}
        type="button"
        onClick={onDone}
        className="absolute bottom-6 right-4 inline-flex h-9 items-center gap-2 rounded-lg border border-line-strong px-4 text-sm text-ink-2 transition-colors duration-fast hover:text-ink sm:bottom-8 sm:right-8"
      >
        Skip intro <span className="font-mono text-xs text-ink-3">Esc</span>
      </button>
    </motion.div>
  );
}
