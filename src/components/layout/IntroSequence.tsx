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
const DURATION_MS = 2300;

const BOOT_LINES = [
  "init kernel.identity",
  "mount /systems /projects /experience",
  "link capabilities.registry",
  "establish uplink",
];

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
      className="nexus-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-void"
      role="dialog"
      aria-modal="true"
      aria-label="NEXUS intro"
      exit={{ opacity: 0, transition: { duration: 0.7, ease: EASE } }}
    >
      <div className="absolute inset-0 bg-grid mask-radial opacity-70" aria-hidden />
      <motion.div
        aria-hidden
        className="absolute inset-0 m-auto h-[46vmin] w-[46vmin] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(77,141,255,0.22), transparent 65%)" }}
        animate={{ scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative w-[min(88vw,420px)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)", transition: { duration: 0.6, ease: EASE } }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="label mb-2">SYS / BOOT SEQUENCE</p>
            <p className="font-display text-5xl font-semibold tracking-[0.2em] text-ink sm:text-6xl">
              NEXUS
            </p>
          </div>
          <p className="font-mono text-3xl font-light tabular-nums text-cyan">{String(pct).padStart(3, "0")}</p>
        </div>

        <div className="relative h-px w-full bg-line" aria-hidden>
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue via-cyan to-violet shadow-[0_0_12px_rgba(105,227,255,0.8)]"
            style={{ width: `${pct}%` }}
          />
        </div>

        <ul className="mt-6 h-[104px] space-y-1.5 font-mono text-xs text-ink-muted" aria-live="off">
          {BOOT_LINES.slice(0, visibleLines).map((line) => (
            <motion.li key={line} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between">
              <span>
                <span className="text-blue">›</span> {line}
              </span>
              <span className="text-ok">OK</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <button
        ref={skipRef}
        type="button"
        onClick={onDone}
        className="absolute bottom-6 right-4 rounded-md border border-line-strong bg-slate/70 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-cyan/60 hover:text-ink sm:bottom-8 sm:right-8"
      >
        Skip intro <span className="ml-1 text-ink-faint">[esc]</span>
      </button>
    </motion.div>
  );
}
