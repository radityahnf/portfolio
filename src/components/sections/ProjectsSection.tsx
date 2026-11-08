"use client";

import { useCallback, useEffect, useState } from "react";
import { projects, profile } from "@/content/profile";
import type { Project } from "@/content/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectDiagram } from "@/components/visuals/ProjectDiagram";
import { ProjectDetail } from "./ProjectDetail";
import { ArrowRight, ArrowUpRight, GitHub } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

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
    <section id="projects" aria-labelledby="projects-title" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="03"
          label="Projects"
          titleId="projects-title"
          title="Selected projects"
          description="Most of my professional work lives in private company codebases. These two are a university team project and a personal one."
        />

        <div className="grid gap-4">
          {projects.map((p, i) => (
            <Reveal key={p.id}>
              <ProjectCard project={p} index={i} onOpen={() => setOpenId(p.id)} />
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-sm text-ink-3">
          More on{" "}
          <a
            href={profile.links.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-2 underline decoration-line-strong underline-offset-4 transition-colors duration-fast hover:text-ink"
          >
            GitHub
          </a>
        </p>
      </div>

      <ProjectDetail project={open} onClose={close} />
    </section>
  );
}

function ProjectCard({ project: p, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const flip = index % 2 === 1;
  return (
    <article className="card grid overflow-hidden lg:grid-cols-2">
      <div className={cn("flex flex-col p-6 sm:p-8 lg:p-10", flip && "lg:order-2")}>
        <p className="meta flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="inline-flex items-center gap-1.5 text-ink-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-positive" />
            {p.status.charAt(0) + p.status.slice(1).toLowerCase()}
          </span>
          <span className="text-line-strong">/</span>
          {p.year}
          <span className="text-line-strong">/</span>
          {p.type}
        </p>
        <h3 className="mt-6 text-[32px] font-medium leading-[1.1] tracking-[-0.02em] text-ink">{p.name}</h3>
        <p className="mt-2 text-lg text-ink-2">{p.tagline}</p>
        <p className="mt-6 text-pretty text-ink-2">{p.summary}</p>

        <dl className="mt-6 grid gap-1 border-t border-line pt-6 text-sm sm:grid-cols-[96px_1fr] sm:gap-x-4">
          <dt className="meta pt-0.5">My role</dt>
          <dd className="text-ink">{p.role}</dd>
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {p.stack.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-2 lg:mt-auto lg:pt-8">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-medium text-page shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-[background-color,transform] duration-fast ease-out hover:bg-white active:scale-[0.98]"
          >
            Read case study <ArrowRight />
          </button>
          {p.links.github && (
            <a
              href={p.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-ink-2 transition-colors duration-fast hover:text-ink"
            >
              <GitHub /> Source
            </a>
          )}
          {p.links.live && (
            <a
              href={p.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm text-ink-2 transition-colors duration-fast hover:text-ink"
            >
              Live demo <ArrowUpRight />
            </a>
          )}
        </div>
      </div>

      {/* Diagram — clicking it is a mouse shortcut; the button above is the accessible path. */}
      <div
        onClick={onOpen}
        className={cn(
          "flex cursor-pointer flex-col justify-center gap-4 border-t border-line bg-base p-6 sm:p-8 lg:border-t-0",
          flip ? "lg:order-1 lg:border-r" : "lg:border-l",
        )}
      >
        <p className="meta">{p.diagram.title}</p>
        <ProjectDiagram id={`card-${p.id}`} diagram={p.diagram} accent={p.accent} className="h-auto w-full" />
        <p className="meta flex items-center gap-2">
          <span aria-hidden className="h-2 w-2 rounded-sm border border-accent bg-accent-soft" />
          Built by me
        </p>
      </div>
    </article>
  );
}
