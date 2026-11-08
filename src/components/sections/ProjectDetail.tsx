"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/content/types";
import { ProjectDiagram } from "@/components/visuals/ProjectDiagram";
import { ArrowUpRight, Close, GitHub } from "@/components/ui/Icons";
import { StatusBadge } from "@/components/ui/StatusBadge";
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
      exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
    >
      <div className="absolute inset-0 bg-void/80 backdrop-blur-md" onClick={onClose} aria-hidden />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="panel relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-b-none bg-navy/95 sm:max-h-[88vh] sm:rounded-xl"
        style={{ ["--accent" as string]: p.accent }}
        initial={{ opacity: 0, y: 60, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } }}
        exit={{ opacity: 0, y: 40, scale: 0.98, transition: { duration: 0.35, ease: EASE } }}
      >
        <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }} />

        {/* Header */}
        <div className="flex items-center gap-4 border-b border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] sm:px-8">
          <span style={{ color: p.accent }}>{p.code}</span>
          <StatusBadge status={p.status} />
          <span className="hidden text-ink-faint sm:inline">Mission file · declassified</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="ml-auto inline-flex h-9 items-center gap-2 rounded-md border border-line-strong px-3 text-ink-muted transition-colors hover:border-ink-muted hover:text-ink"
            aria-label="Close mission file"
          >
            <span className="hidden sm:inline">Close</span>
            <Close />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain">
          {/* Title block */}
          <div className="relative px-5 pb-8 pt-8 sm:px-8 sm:pt-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(600px circle at 100% 0%, ${p.accent}18, transparent 60%)` }}
            />
            <h2 id={titleId} className="relative font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-6xl">
              {p.name}
            </h2>
            <p className="relative mt-3 max-w-2xl text-lg text-ink-muted">{p.tagline}</p>

            <dl className="relative mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line font-mono text-[11px] uppercase tracking-[0.08em] md:grid-cols-4">
              {[
                ["Status", p.status],
                ["Year", p.year],
                ["Type", p.type],
                ["Role", p.role],
              ].map(([k, v]) => (
                <div key={k} className="bg-navy px-4 py-3">
                  <dt className="text-ink-faint">{k}</dt>
                  <dd className="mt-1 normal-case tracking-normal text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-10 px-5 pb-10 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
            <div className="space-y-10">
              <Block label="01 · Overview">
                <p>{p.summary}</p>
              </Block>
              <Block label="02 · Problem">
                <p>{p.problem}</p>
              </Block>
              <Block label="03 · My contribution">
                <ul className="space-y-3">
                  {p.contribution.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: p.accent }} aria-hidden />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </Block>
              <Block label="04 · Key engineering decisions">
                <div className="grid gap-3">
                  {p.decisions.map((d, i) => (
                    <div key={d.title} className="rounded-lg border border-line bg-void/40 p-4">
                      <p className="flex items-baseline gap-3 font-display text-base font-semibold text-ink">
                        <span className="font-mono text-[10px] text-ink-faint">D{i + 1}</span>
                        {d.title}
                      </p>
                      <p className="mt-1.5 text-[15px] text-ink-muted">{d.body}</p>
                    </div>
                  ))}
                </div>
              </Block>
              {p.challenges && p.challenges.length > 0 && (
                <Block label="05 · Challenges">
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
              <div className="rounded-xl border border-line bg-void/50 p-4">
                <p className="label mb-3">Architecture · {p.diagram.title}</p>
                <ProjectDiagram id={`detail-${p.id}`} diagram={p.diagram} accent={p.accent} detailed className="h-auto w-full" />
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{p.architecture}</p>
              </div>

              <div>
                <p className="label mb-3">Technologies</p>
                <ul className="flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <li key={t} className="chip text-ink">
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
                    className="flex min-h-11 items-center justify-between rounded-lg border border-line-strong px-4 font-mono text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink-muted"
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
                    className="flex min-h-11 items-center justify-between rounded-lg px-4 font-mono text-xs uppercase tracking-[0.08em] text-void transition-all hover:brightness-110"
                    style={{ background: p.accent }}
                  >
                    Live demo <ArrowUpRight />
                  </a>
                )}
              </div>

              {p.notes && p.notes.length > 0 && (
                <ul className="space-y-1 font-mono text-[11px] leading-relaxed text-ink-faint">
                  {p.notes.map((n) => (
                    <li key={n}>{"// "}{n}</li>
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
      <h3 className="label mb-3 flex items-center gap-3">
        {label}
        <span className="h-px flex-1 bg-line" />
      </h3>
      <div className="text-pretty leading-relaxed text-ink-muted">{children}</div>
    </section>
  );
}
