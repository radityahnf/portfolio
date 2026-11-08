"use client";

import { useState } from "react";
import { skillCategories } from "@/content/profile";
import type { Source } from "@/content/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const SOURCES: { id: Source; label: string; dot: string }[] = [
  { id: "cv", label: "Work and CV", dot: "bg-accent" },
  { id: "project", label: "Projects", dot: "bg-ink-2" },
  { id: "previous-portfolio", label: "Earlier portfolio", dot: "border border-ink-3 bg-transparent" },
];
const DOT = Object.fromEntries(SOURCES.map((s) => [s.id, s.dot])) as Record<Source, string>;

export function CapabilitiesSection() {
  const [filter, setFilter] = useState<Source | "all">("all");
  const total = skillCategories.reduce((n, c) => n + c.skills.length, 0);
  const shown =
    filter === "all" ? total : skillCategories.reduce((n, c) => n + c.skills.filter((s) => s.source === filter).length, 0);

  return (
    <section id="capabilities" aria-labelledby="cap-title" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="02"
          label="Capabilities"
          titleId="cap-title"
          title="What I work with, and where I used it"
          description="No skill bars or percentages. Each entry says where I actually used it."
        />

        <Reveal>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div role="group" aria-label="Filter by source" className="flex flex-wrap gap-1">
              {[{ id: "all" as const, label: "All", dot: "" }, ...SOURCES].map((f) => {
                const on = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm transition-colors duration-fast ease-out",
                      on ? "bg-raised text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" : "text-ink-2 hover:text-ink",
                    )}
                  >
                    {f.dot && <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", f.dot)} />}
                    {f.label}
                  </button>
                );
              })}
            </div>
            <p className="meta tabular-nums" aria-live="polite">
              {shown} of {total}
            </p>
          </div>

          <div className="card divide-y divide-line">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="grid gap-4 p-6 md:grid-cols-[240px_1fr] md:gap-8">
                <div>
                  <h3 className="font-medium text-ink">{cat.title}</h3>
                  <p className="mt-1 text-sm text-ink-3">{cat.description}</p>
                </div>
                <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
                  {cat.skills.map((s) => {
                    const dim = filter !== "all" && s.source !== filter;
                    return (
                      <li key={s.name} className={cn("flex gap-3 transition-opacity duration-menu ease-out", dim && "opacity-30")}>
                        <span aria-hidden className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", DOT[s.source])} />
                        <div className="min-w-0">
                          <p className="text-[15px] text-ink">{s.name}</p>
                          <p className="meta mt-1">{s.context}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
