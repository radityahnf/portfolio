"use client";

import { useState } from "react";
import { alsoUsed, skillCategories } from "@/content/profile";
import type { Source } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const ALL_SOURCES: { id: Source; label: string }[] = [
  { id: "cv", label: "Work" },
  { id: "project", label: "Projects" },
  { id: "previous-portfolio", label: "Earlier portfolio" },
];
// Only offer filters for sources that actually appear in the list.
const SOURCES = ALL_SOURCES.filter((s) => skillCategories.some((c) => c.skills.some((k) => k.source === s.id)));

export function CapabilitiesSection() {
  const [filter, setFilter] = useState<Source | "all">("all");
  const total = skillCategories.reduce((n, c) => n + c.skills.length, 0);
  const shown =
    filter === "all" ? total : skillCategories.reduce((n, c) => n + c.skills.filter((s) => s.source === filter).length, 0);

  return (
    <section id="capabilities" aria-labelledby="cap-title" className="relative py-28 sm:py-40">
      <div className="shell">
        <SectionHead
          section="capabilities"
          titleId="cap-title"
          lines={[{ text: "What I work with," }, { text: "and where", outline: true }]}
        />

        <Reveal>
          {/* Index filter */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label="Filter by where it was used" className="flex flex-wrap gap-6">
              {[{ id: "all" as const, label: "All" }, ...SOURCES].map((f) => {
                const on = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "relative py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300",
                      on ? "text-ink" : "text-ink-3 hover:text-ink",
                    )}
                  >
                    {f.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute bottom-0 left-0 h-px w-full origin-left bg-blood transition-transform duration-500 ease-cine",
                        on ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </button>
                );
              })}
            </div>
            <p className="meta tabular-nums" aria-live="polite">
              {String(shown).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          </div>

          {/* Archival index: one row per category */}
          <div className="border-t border-line-strong">
            {skillCategories.map((cat, ci) => (
              <div key={cat.id} className="grid gap-6 border-b border-line py-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12">
                <div className="flex items-baseline gap-4">
                  <span className="meta">{String(ci + 1).padStart(2, "0")}</span>
                  <h3 className="display text-2xl text-ink sm:text-3xl">{cat.title}</h3>
                </div>
                <ul className="grid gap-x-12 sm:grid-cols-2">
                  {cat.skills.map((s) => {
                    const dim = filter !== "all" && s.source !== filter;
                    return (
                      <li
                        key={s.name}
                        className={cn(
                          "group flex items-baseline justify-between gap-6 border-b border-line/60 py-3 transition-opacity duration-500",
                          dim && "opacity-20",
                        )}
                      >
                        <span className="text-[16px] text-ink transition-colors duration-300 group-hover:text-blood-bright">{s.name}</span>
                        <span className="text-right font-mono text-[11px] leading-4 text-ink-3">{s.context}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {alsoUsed.length > 0 && (
            <p className="mt-8 max-w-3xl text-ink-3">
              <span className="meta mr-3 text-ink-2">Also used</span>
              {alsoUsed.join(" · ")}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
