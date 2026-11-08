"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/content/profile";
import type { Project } from "@/content/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectDiagram } from "@/components/visuals/ProjectDiagram";
import { ProjectDetail } from "./ProjectDetail";
import { ArrowRight, ArrowUpRight, GitHub } from "@/components/ui/Icons";
import { fadeUp, VIEWPORT, EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function ProjectsSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.id === openId) ?? null;

  // Deep link: #mission-<id> opens a project directly.
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#mission-(.+)$/);
      if (m && projects.some((p) => p.id === m[1])) setOpenId(m[1]);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
    if (window.location.hash.startsWith("#mission-")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="03"
          label="Mission files"
          title={<span id="projects-title">Selected missions, documented.</span>}
          description="Each project is filed like an engineering case: the problem, what I built, and the decisions behind it. Open a file for the full breakdown."
        />

        <div className="space-y-6 lg:space-y-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setOpenId(p.id)} />
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-8 font-mono text-xs text-ink-faint"
        >
          More work lives on{" "}
          <a href="https://github.com/radityahnf" target="_blank" rel="noopener noreferrer" className="text-ink-muted underline decoration-line-strong underline-offset-4 hover:text-cyan">
            GitHub
          </a>
          . Most of my professional work is in private company codebases.
        </motion.p>
      </div>

      <ProjectDetail project={open} onClose={close} />
    </section>
  );
}

function ProjectCard({ project: p, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE }}
      className="panel glow-border group relative overflow-hidden"
      style={{ ["--accent" as string]: p.accent }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {/* accent wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(800px circle at ${flip ? "0%" : "100%"} 0%, ${p.accent}14, transparent 55%)` }}
      />

      {/* File header strip */}
      <div className="relative flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] sm:px-7">
        <span style={{ color: p.accent }}>{p.code}</span>
        <StatusBadge status={p.status} />
        <span className="text-ink-faint">{p.year}</span>
        <span className="hidden text-ink-faint sm:inline">{p.type}</span>
        <span className="ml-auto hidden text-ink-faint md:inline">file://missions/{p.id}</span>
      </div>

      <div className={cn("relative grid lg:grid-cols-2", flip && "lg:[&>*:first-child]:order-2")}>
        <div className="flex flex-col p-5 sm:p-7 lg:p-10">
          <h3 className="font-display text-[2rem] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-5xl">
            {p.name}
          </h3>
          <p className="mt-3 font-display text-lg text-ink-muted">{p.tagline}</p>
          <p className="mt-6 text-pretty leading-relaxed text-ink-muted">{p.summary}</p>

          <dl className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
            <div>
              <dt className="label">Problem</dt>
              <dd className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-ink-muted">{p.problem}</dd>
            </div>
            <div>
              <dt className="label">My role</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink">{p.role}</dd>
            </div>
          </dl>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
            {p.stack.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
            <button
              type="button"
              onClick={onOpen}
              className="group/btn inline-flex min-h-11 items-center gap-2.5 rounded-lg px-5 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-void transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ background: p.accent, boxShadow: `0 10px 40px -12px ${p.accent}` }}
              aria-haspopup="dialog"
            >
              Open mission file
              <ArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />
            </button>
            {p.links.github && (
              <a
                href={p.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line-strong px-4 font-mono text-xs uppercase tracking-[0.08em] text-ink-muted transition-colors hover:border-ink-muted hover:text-ink"
              >
                <GitHub /> Source
              </a>
            )}
            {p.links.live && (
              <a
                href={p.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 px-2 font-mono text-xs uppercase tracking-[0.08em] text-ink-muted transition-colors hover:text-ink"
              >
                Live demo <ArrowUpRight />
              </a>
            )}
          </div>
        </div>

        {/* Diagram */}
        {/* Clicking the diagram is a mouse shortcut; the "Open mission file" button is the accessible path. */}
        <div
          onClick={onOpen}
          className="relative flex min-h-[240px] cursor-pointer flex-col justify-center border-t border-line bg-void/40 p-4 sm:p-6 lg:border-l lg:border-t-0"
        >
          <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint sm:left-6">
            fig.{String(index + 1).padStart(2, "0")} — {p.diagram.title}
          </div>
          <ProjectDiagram
            id={`card-${p.id}`}
            diagram={p.diagram}
            accent={p.accent}
            className="mt-6 h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint sm:left-6">
            <span className="h-2 w-2 rounded-sm" style={{ background: `${p.accent}55`, border: `1px solid ${p.accent}` }} />
            Built by me
          </div>
        </div>
      </div>
    </motion.article>
  );
}
