"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_SECTIONS, navIdFor } from "@/lib/sections";
import { useActiveSection } from "@/lib/hooks";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { Seal } from "@/components/visuals/Ink";
import { ArrowUp } from "@/components/ui/Icons";

/** Minimal persistent interface: name, navigation, CV link, back-to-top. */
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
      <a
        href="#main"
        className="fixed left-4 top-4 z-[90] -translate-y-24 bg-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-obsidian transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-cine",
          // No backdrop-filter while the menu is open: it would trap the fixed menu inside the header.
          menuOpen ? "bg-obsidian" : scrolled ? "bg-obsidian/80 backdrop-blur-sm" : "bg-transparent",
        )}
      >
        <div className="shell relative z-10 flex h-16 items-center justify-between gap-6 lg:h-20">
          <a href="#home" className="group flex items-center gap-3" aria-label={`${profile.name}, back to top`}>
            <Seal text={profile.ja.seal} className="h-7 w-7" />
            <span className="meta text-ink transition-colors group-hover:text-ink-2">{profile.shortName}</span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_SECTIONS.map((s) => {
                const on = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={on ? "location" : undefined}
                      className={cn(
                        "group relative flex items-baseline gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300",
                        on ? "text-ink" : "text-ink-3 hover:text-ink",
                      )}
                    >
                      <span className={cn("text-[10px]", on ? "text-blood-bright" : "text-ink-3/60")}>{s.code}</span>
                      {s.label}
                      {on && (
                        <motion.span
                          layoutId="nav-mark"
                          className="absolute -bottom-0.5 left-0 right-0 h-px bg-blood"
                          transition={{ duration: 0.6, ease: EASE }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <a href={profile.cvPath} download className="ink-link hidden pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink sm:inline">
              CV
            </a>
            <button
              type="button"
              className="flex h-10 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? "Close" : "Menu"}
              <span aria-hidden className="relative block h-2.5 w-5">
                <span className={cn("absolute left-0 h-px w-5 bg-ink transition-transform duration-500 ease-cine", menuOpen ? "top-1 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-px w-5 bg-ink transition-transform duration-500 ease-cine", menuOpen ? "top-1 -rotate-45" : "top-2.5")} />
              </span>
            </button>
          </div>
        </div>
        <MobileMenu open={menuOpen} active={active} onClose={() => setMenuOpen(false)} />
      </header>

      <AnimatePresence>
        {scrolled && section !== "home" && (
          <motion.a
            href="#home"
            aria-label="Back to top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center border border-line-strong bg-obsidian/80 text-ink-2 transition-colors duration-300 hover:border-blood hover:text-ink lg:right-12"
          >
            <ArrowUp />
          </motion.a>
        )}
      </AnimatePresence>
    </>
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
          className="fixed inset-0 z-0 overflow-y-auto bg-obsidian pt-16 lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <nav aria-label="Mobile" className="shell flex min-h-full flex-col py-8">
            <ul className="border-t border-line">
              {NAV_SECTIONS.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.05, ease: EASE }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={onClose}
                    aria-current={active === s.id ? "location" : undefined}
                    className="flex items-center justify-between border-b border-line py-4"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className={cn("font-mono text-[11px]", active === s.id ? "text-blood-bright" : "text-ink-3")}>{s.code}</span>
                      <span className={cn("display text-5xl", active === s.id ? "text-ink" : "text-ink-2")}>{s.label}</span>
                    </span>
                    <span lang="ja" className="font-serif text-sm tracking-[0.3em] text-ink-3">
                      {s.ja}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={profile.cvPath} download className="meta mt-10 text-ink">
              Download CV ↓
            </a>
            <p className="meta mt-auto pt-12">
              {profile.city} · {profile.coordinates.join(" · ")}
            </p>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
