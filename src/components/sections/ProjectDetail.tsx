"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/content/types";
import { ProjectDiagram } from "@/components/visuals/ProjectDiagram";
import { ArrowUpRight, Close, GitHub } from "@/components/ui/Icons";
import { EASE } from "@/lib/motion";

/** Full mission file for a project, shown as an accessible modal dialog. */
export function ProjectDetail({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && <DetailDialog key={project.id} project={project} onClose={onClose} />}
    </AnimatePresence>
  );
}

function DetailDialog({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      // Keep focus inside the dialog.
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  const titleId = `mission-${p.id}-title`;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: EASE } }}
      transition={{ duration: 0.2, ease: EASE }}
    >
      <div className="absolute inset-0 bg-base/80" onClick={onClose} aria-hidden />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border border-line bg-card shadow-[0_24px_64px_rgba(0,0,0,0.5)] sm:max-h-[88vh] sm:rounded-2xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }}
        exit={{ opacity: 0, y: 8, transition: { duration: 0.2, ease: EASE } }}
      >
        {/* Header */}
        <div className="flex h-14 items-center gap-4 border-b border-line px-6 sm:px-8">
          <span className="meta">Case study</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="ml-auto inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-ink-2 transition-colors duration-fast hover:bg-raised hover:text-ink"
            aria-label="Close case study"
          >
            <span className="hidden sm:inline">Close</span>
            <Close />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain">
          {/* Title block */}
          <div className="px-6 pb-8 pt-8 sm:px-8 sm:pt-10">
            <h2 id={titleId} className="text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[44px]">
              {p.name}
            </h2>
            <p className="mt-2 max-w-2xl text-lg text-ink-2">{p.tagline}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
              {[
                ["Status", p.status.charAt(0) + p.status.slice(1).toLowerCase()],
                ["Year", p.year],
                ["Type", p.type],
                ["Role", p.role],
              ].map(([k, v]) => (
                <div key={k} className="bg-card px-4 py-3">
                  <dt className="meta">{k}</dt>
                  <dd className="mt-1 text-sm text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-10 px-6 pb-10 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
            <div className="space-y-10">
              <Block label="Overview">
                <p>{p.summary}</p>
              </Block>
              <Block label="Problem">
                <p>{p.problem}</p>
              </Block>
              <Block label="My contribution">
                <ul className="space-y-3">
                  {p.contribution.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink-3" aria-hidden />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </Block>
              <Block label="Key decisions">
                <div className="grid gap-3">
                  {p.decisions.map((d) => (
                    <div key={d.title} className="rounded-xl border border-line bg-base p-4">
                      <p className="font-medium text-ink">{d.title}</p>
                      <p className="mt-1 text-ink-2">{d.body}</p>
                    </div>
                  ))}
                </div>
              </Block>
              {p.challenges && p.challenges.length > 0 && (
                <Block label="Challenges">
                  <ul className="list-disc space-y-2 pl-5">
                    {p.challenges.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </Block>
              )}
              {p.outcomes.length > 0 && (
                <Block label="Outcomes">
                  <ul className="list-disc space-y-2 pl-5">
                    {p.outcomes.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </Block>
              )}
            </div>

            <aside className="space-y-8">
              <div className="rounded-xl border border-line bg-base p-4">
                <p className="meta mb-3">Architecture: {p.diagram.title.charAt(0).toLowerCase() + p.diagram.title.slice(1)}</p>
                <ProjectDiagram id={`detail-${p.id}`} diagram={p.diagram} accent={p.accent} detailed className="h-auto w-full" />
                <p className="mt-4 text-sm text-ink-2">{p.architecture}</p>
              </div>

              <div>
                <p className="meta mb-3">Technologies</p>
                <ul className="flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-2">
                {p.links.github && (
                  <a
                    href={p.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center justify-between rounded-lg border border-line-strong bg-raised px-4 text-sm text-ink transition-colors duration-fast hover:border-ink-3/40"
                  >
                    <span className="flex items-center gap-2">
                      <GitHub /> Source code
                    </span>
                    <ArrowUpRight />
                  </a>
                )}
                {p.links.live && (
                  <a
                    href={p.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center justify-between rounded-lg bg-ink px-4 text-sm font-medium text-page transition-colors duration-fast hover:bg-white"
                  >
                    Live demo <ArrowUpRight />
                  </a>
                )}
              </div>

              {p.notes && p.notes.length > 0 && (
                <ul className="meta space-y-1">
                  {p.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}
            </aside>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="meta mb-3">{label}</h3>
      <div className="text-pretty text-ink-2">{children}</div>
    </section>
  );
}
