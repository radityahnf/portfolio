"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_SECTIONS, navIdFor } from "@/lib/sections";
import { useActiveSection, useClock } from "@/lib/hooks";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { buttonStyles } from "@/components/ui/Button";
import { StatusDot } from "@/components/ui/StatusDot";
import { ArrowUp, Close, Download, Menu } from "@/components/ui/Icons";

/** Persistent interface: header with navigation and local time, plus back-to-top. */
export function Chrome() {
  const section = useActiveSection();
  const active = navIdFor(section);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[90] -translate-y-24 rounded-lg bg-ink px-4 py-2 text-sm text-page transition-transform duration-fast focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-menu ease-out",
          // No backdrop-filter while the menu is open: it would trap the fixed menu inside the header.
          menuOpen ? "border-line bg-page" : scrolled ? "border-line bg-page/90 backdrop-blur-md" : "border-transparent",
        )}
      >
        <div className="shell relative z-10 flex h-16 items-center justify-between gap-6">
          <Logo />
          <DesktopNav active={active} />
          <div className="flex items-center gap-4">
            <LocalTime className="hidden xl:flex" />
            <a href={profile.cvPath} download className={cn(buttonStyles("secondary", "sm"), "hidden sm:inline-flex")}>
              <Download /> CV
            </a>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong text-ink lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <Close width={18} height={18} /> : <Menu width={18} height={18} />}
            </button>
          </div>
        </div>
        <MobileMenu open={menuOpen} active={active} onClose={() => setMenuOpen(false)} />
      </header>

      <BackToTop visible={scrolled && section !== "home"} />
    </>
  );
}

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2" aria-label={`${profile.name}, back to top`}>
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" aria-hidden>
        <path d="M12 2.5 20.5 7.25v9.5L12 21.5l-8.5-4.75v-9.5L12 2.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 7.5v9M8 9.75l8 4.5M16 9.75l-8 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="text-base font-medium text-ink">{profile.shortName}</span>
    </a>
  );
}

function DesktopNav({ active }: { active: string }) {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {NAV_SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "relative flex h-9 items-center rounded-lg px-3 text-sm transition-colors duration-fast ease-out",
                  on ? "text-ink" : "text-ink-2 hover:text-ink",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-raised shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    transition={{ duration: 0.2, ease: EASE }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** The site's one live detail: the local time where I work, next to a status dot. */
function LocalTime({ className }: { className?: string }) {
  const time = useClock(profile.timeZone);
  return (
    <p className={cn("meta items-center gap-2 whitespace-nowrap", className)}>
      <StatusDot />
      <span>Jakarta</span>
      <span className="tabular-nums text-ink-2" suppressHydrationWarning>
        {time ? time.slice(0, 5) : "--:--"}
      </span>
      <span>{profile.timeZoneLabel}</span>
    </p>
  );
}

function MobileMenu({ open, active, onClose }: { open: boolean; active: string; onClose: () => void }) {
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
          className="fixed inset-0 z-0 overflow-y-auto bg-page pt-16 lg:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          <nav aria-label="Mobile" className="shell flex min-h-full flex-col py-6">
            <ul>
              {NAV_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={onClose}
                    aria-current={active === s.id ? "location" : undefined}
                    className={cn(
                      "flex h-14 items-center justify-between border-b border-line text-2xl",
                      active === s.id ? "text-ink" : "text-ink-2",
                    )}
                  >
                    {s.label}
                    {active === s.id && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </a>
                </li>
              ))}
            </ul>
            <a href={profile.cvPath} download className={cn(buttonStyles("primary"), "mt-8")}>
              <Download /> Download CV
            </a>
            <div className="mt-auto pt-10">
              <LocalTime className="flex" />
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BackToTop({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#home"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="fixed bottom-6 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong bg-card text-ink-2 transition-colors duration-fast hover:text-ink sm:right-6"
        >
          <ArrowUp />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
