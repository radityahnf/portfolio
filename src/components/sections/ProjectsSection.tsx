"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projects, profile } from "@/content/profile";
import type { Project } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { ProjectDiagram } from "@/components/visuals/ProjectDiagram";
import { BrushStroke } from "@/components/visuals/Ink";
import { ProjectDetail } from "./ProjectDetail";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { EASE, VIEWPORT } from "@/lib/motion";
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
    <section id="projects" aria-labelledby="projects-title" className="relative py-28 sm:py-40">
      <div className="shell">
        <SectionHead
          section="projects"
          titleId="projects-title"
          lines={[{ text: "Selected" }, { text: "works", outline: true }]}
          aside={
            <p className="font-serif leading-[1.8] text-ink-2">
              Most of my professional work lives in private company codebases. These two are a university team project and a personal one.
            </p>
          }
        />

        <div className="border-t border-line-strong">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} onOpen={() => setOpenId(p.id)} />
          ))}
        </div>

        <p className="meta mt-8">
          More on{" "}
          <a href={profile.links.github.href} target="_blank" rel="noopener noreferrer" className="ink-link pb-0.5 text-ink">
            GitHub ↗
          </a>
        </p>
      </div>

      <ProjectDetail project={open} onClose={close} />
    </section>
  );
}

function ProjectRow({ project: p, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: EASE }}
      className="group grid gap-10 border-b border-line py-14 lg:grid-cols-12 lg:gap-12 lg:py-20"
    >
      {/* Text column */}
      <div className={cn("flex flex-col lg:col-span-6", flip && "lg:order-2 lg:col-start-7")}>
        <div className="meta flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <span className="text-ink">
            <span lang="ja" className="mr-2 font-serif normal-case tracking-[0.2em] text-ink-3">
              作品
            </span>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{p.year}</span>
          <span>{p.type}</span>
          <span className="text-ink-2">{p.status.charAt(0) + p.status.slice(1).toLowerCase()}</span>
        </div>

        <button type="button" onClick={onOpen} aria-haspopup="dialog" className="relative mt-8 self-start text-left">
          <h3 className="display text-[clamp(3.5rem,8vw,7.5rem)] text-ink transition-transform duration-700 ease-cine group-hover:translate-x-2">
            {p.name}
          </h3>
          <BrushStroke className="pointer-events-none absolute -bottom-2 left-0 h-4 w-full origin-left scale-x-0 transition-transform duration-700 ease-cine group-hover:scale-x-100" />
          <span className="sr-only">Read the case study</span>
        </button>
        <p className="mt-6 font-serif text-xl text-ink-2">{p.tagline}</p>
        <p className="mt-6 max-w-xl text-pretty leading-[1.8] text-ink-2">{p.summary}</p>

        <dl className="mt-8 grid gap-3 border-t border-line pt-6 sm:grid-cols-[100px_1fr]">
          <dt className="meta">Role</dt>
          <dd className="text-ink">{p.role}</dd>
          <dt className="meta">Stack</dt>
          <dd className="text-ink-2">{p.stack.join(" · ")}</dd>
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 lg:mt-auto lg:pt-10">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="group/cta inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink"
          >
            <span className="ink-link pb-1">Read case study</span>
            <ArrowRight className="text-blood-bright transition-transform duration-500 ease-cine group-hover/cta:translate-x-1" />
          </button>
          {p.links.github && (
            <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="meta ink-link pb-1 hover:text-ink">
              Source <ArrowUpRight className="inline" />
            </a>
          )}
          {p.links.live && (
            <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="meta ink-link pb-1 hover:text-ink">
              Live demo <ArrowUpRight className="inline" />
            </a>
          )}
        </div>
      </div>

      {/* Visual: the architecture plate, framed like a print */}
      <div
        onClick={onOpen}
        className={cn("relative cursor-pointer lg:col-span-6", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}
      >
        <div className="paper relative overflow-hidden border border-line p-6 transition-colors duration-700 ease-cine group-hover:border-line-strong sm:p-10">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <p className="meta">Plate {String(index + 1).padStart(2, "0")}</p>
            <p className="meta text-right">{p.diagram.title}</p>
          </div>
          <ProjectDiagram
            id={`card-${p.id}`}
            diagram={p.diagram}
            accent={p.accent}
            className="h-auto w-full transition-transform duration-1000 ease-cine group-hover:scale-[1.02]"
          />
          <p className="meta mt-6 flex items-center gap-3">
            <span aria-hidden className="h-2 w-2 bg-blood" />
            Built by me
          </p>
        </div>
      </div>
    </motion.article>
  );
}
