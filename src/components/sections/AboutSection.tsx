"use client";

import { about, profile } from "@/content/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="01"
          label="About"
          titleId="about-title"
          title="Backend work that holds up in production"
        />

        <Reveal className="grid gap-4 lg:grid-cols-[5fr_7fr] lg:items-start">
          {/* Profile */}
          <article className="card p-6 sm:p-8">
            <h3 className="text-xl font-medium text-ink">{profile.shortName}</h3>
            <p className="mt-4 text-pretty text-ink-2">{about.summary}</p>

            <dl className="mt-8 border-t border-line">
              {about.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <dt className="meta">{f.label}</dt>
                  <dd className="text-right text-sm text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>

            {about.interests.length > 0 && (
              <>
                <p className="meta mt-8">Interests</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {about.interests.map((i) => (
                    <li key={i} className="tag">
                      {i}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>

          {/* How I think: reasoning, not a second copy of the CV */}
          <article className="card divide-y divide-line">
            {about.panels.map((p) => (
              <div key={p.id} className="grid gap-2 p-6 sm:grid-cols-[160px_1fr] sm:gap-6 sm:p-8">
                <p className="meta pt-1">{p.label}</p>
                <div>
                  {p.title && <h3 className="mb-2 text-lg font-medium text-ink">{p.title}</h3>}
                  <p className="text-pretty text-ink">{p.body}</p>
                </div>
              </div>
            ))}
          </article>
        </Reveal>
      </div>
    </section>
  );
}
