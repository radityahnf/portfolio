"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { NAV_SECTIONS, navIdFor } from "@/lib/sections";
import { useActiveSection, useClock } from "@/lib/hooks";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { StatusDot } from "@/components/ui/StatusDot";
import { ArrowUp, Close, Download, Menu } from "@/components/ui/Icons";

/** Persistent interface: navigation, system status panel, scroll progress and back-to-top. */
export function Chrome() {
  const section = useActiveSection();
  const active = navIdFor(section);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <a
        href="#main"
        className="fixed left-4 top-4 z-[90] -translate-y-24 rounded-md bg-blue px-4 py-2 font-mono text-xs text-void transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2.5" : "py-4 sm:py-5",
        )}
      >
        <div className="shell relative z-10">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-xl border px-3 py-2 transition-all duration-500 sm:px-4",
              scrolled || menuOpen
                ? "border-line bg-void/75 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                : "border-transparent bg-transparent",
            )}
          >
            <Logo />
            <DesktopNav active={active} />
            <div className="flex items-center gap-2">
              <SystemStatus section={section} />
              <a
                href={profile.cvPath}
                download
                className="hidden min-h-10 items-center gap-2 rounded-lg border border-line-strong px-3.5 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-colors hover:border-cyan/60 hover:text-white sm:inline-flex"
              >
                <Download /> CV
              </a>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong text-ink lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((o) => !o)}
              >
                {menuOpen ? <Close width={18} height={18} /> : <Menu width={18} height={18} />}
              </button>
            </div>
          </div>
        </div>
        <MobileMenu open={menuOpen} active={active} section={section} onClose={() => setMenuOpen(false)} />
      </header>

      <BackToTop visible={scrolled && section !== "home"} />
    </>
  );
}

function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label="NEXUS — back to top">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-md border border-line-strong bg-slate/70">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-cyan transition-transform duration-700 group-hover:rotate-180" aria-hidden>
          <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7v10M7.5 9.5l9 5M16.5 9.5l-9 5" stroke="currentColor" strokeWidth="1" opacity=".6" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold tracking-[0.28em] text-ink">NEXUS</span>
        <span className="mt-1 font-mono text-[10px] tracking-[0.12em] text-ink-faint">{profile.initials}.SYS</span>
      </span>
    </a>
  );
}

function DesktopNav({ active }: { active: string }) {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1 rounded-lg border border-line bg-navy/50 p-1 backdrop-blur">
        {NAV_SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative flex items-center gap-2 rounded-md px-3.5 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors",
                  isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md border border-blue/40 bg-blue/10 shadow-[inset_0_0_20px_rgba(77,141,255,0.15)]"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className={cn("relative hidden text-[10px] 2xl:inline", isActive ? "text-cyan" : "text-ink-faint")}>{s.code}</span>
                <span className="relative">{s.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileMenu({
  open,
  active,
  section,
  onClose,
}: {
  open: boolean;
  active: string;
  section: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-0 overflow-y-auto bg-void/95 pt-24 backdrop-blur-xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
          <nav aria-label="Mobile" className="shell relative flex min-h-full flex-col py-6">
            <ul className="space-y-1">
              {NAV_SECTIONS.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4, ease: EASE }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={onClose}
                    aria-current={active === s.id ? "location" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 border-b border-line py-4",
                      active === s.id ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    <span className={cn("font-mono text-xs", active === s.id ? "text-cyan" : "text-ink-faint")}>{s.code}</span>
                    <span className="font-display text-3xl font-medium tracking-tight">{s.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <a
                href={profile.cvPath}
                download
                className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue font-mono text-sm uppercase tracking-[0.1em] text-void"
              >
                <Download /> Download CV
              </a>
            </div>
            <div className="mt-auto pt-10">
              <StatusReadout section={section} />
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatusReadout({ section }: { section: string }) {
  const time = useClock(profile.timeZone);
  return (
    <dl className="grid grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-[0.1em]">
      <div>
        <dt className="text-ink-faint">Status</dt>
        <dd className="mt-1 flex items-center gap-2 text-ink">
          <StatusDot /> Online
        </dd>
      </div>
      <div>
        <dt className="text-ink-faint">Section</dt>
        <dd className="mt-1 truncate text-cyan">{section}</dd>
      </div>
      <div>
        <dt className="text-ink-faint">{profile.timeZoneLabel}</dt>
        <dd className="mt-1 tabular-nums text-ink" suppressHydrationWarning>
          {time || "--:--:--"}
        </dd>
      </div>
    </dl>
  );
}

/** Compact status panel (desktop). Only shows things that are actually true. */
function SystemStatus({ section }: { section: string }) {
  const time = useClock(profile.timeZone);
  const idx = NAV_SECTIONS.findIndex((s) => s.id === navIdFor(section));
  return (
    <aside aria-label="System status" className="hidden xl:block">
      <div className="flex min-h-10 items-center gap-3 whitespace-nowrap rounded-lg border border-line px-3 font-mono text-[10px] uppercase tracking-[0.12em]">
        <span className="flex items-center gap-2 text-ink">
          <StatusDot /> Online
        </span>
        <span className="h-3 w-px bg-line-strong" />
        <span className="text-ink-faint">
          SEC <span className="text-cyan">{String(Math.max(idx, 0)).padStart(2, "0")}</span>
          <span className="ml-2 text-ink-muted">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={section}
                className="inline-block w-[78px] truncate align-bottom"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {section}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
        <span className="h-3 w-px bg-line-strong" />
        <span className="tabular-nums text-ink-muted" suppressHydrationWarning>
          {profile.timeZoneLabel} {time || "--:--:--"}
        </span>
      </div>
    </aside>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[55] h-px origin-left bg-gradient-to-r from-blue via-cyan to-violet"
      style={{ scaleX }}
    />
  );
}

function BackToTop({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#home"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="group fixed bottom-5 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-lg border border-line-strong bg-navy/80 text-ink-muted backdrop-blur-md transition-colors hover:border-cyan/60 hover:text-cyan sm:right-5"
        >
          <ArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
