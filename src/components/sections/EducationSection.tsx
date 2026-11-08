import { certifications, education } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

export function EducationSection() {
  return (
    <section id="education" aria-labelledby="edu-title" className="relative pb-8 sm:pb-12">
      <div className="shell">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 pb-4">
            <h2 id="edu-title" className="meta">
              <span className="text-ink">04.1</span>
              <span className="mx-3 text-ink-3/60">—</span>
              Education
            </h2>
            <p lang="ja" className="font-serif text-sm tracking-[0.3em] text-ink-3">
              学歴
            </p>
          </div>
          <div className="rule" />
          {education.map((e) => (
            <div key={e.institution} className="grid gap-4 border-b border-line py-10 md:grid-cols-[220px_1fr] md:gap-12">
              <p className="font-mono text-sm uppercase tracking-[0.12em] text-ink tabular-nums">
                {e.start} — {e.end}
              </p>
              <div>
                <p className="display text-4xl text-ink sm:text-5xl">{e.degree}</p>
                <p className="mt-3 font-serif text-xl text-ink-2">
                  {e.institution}
                  <span className="ml-3 font-sans text-sm text-ink-3">{e.location}</span>
                </p>
                {e.notes.map((n) => (
                  <p key={n} className="mt-3 text-ink-2">
                    {n}
                  </p>
                ))}
              </div>
            </div>
          ))}
          {certifications.map((c) => (
            <div key={c.name} className="grid gap-4 border-b border-line py-8 md:grid-cols-[220px_1fr] md:gap-12">
              <p className="meta">
                {c.issuer} · {c.year}
              </p>
              <p className="font-serif text-xl text-ink">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="ink-link pb-1">
                    {c.name} <ArrowUpRight className="inline" />
                  </a>
                ) : (
                  c.name
                )}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
