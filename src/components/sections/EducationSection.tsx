import { certifications, education } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

export function EducationSection() {
  return (
    <section id="education" aria-labelledby="edu-title" className="pb-24 sm:pb-32">
      <div className="shell grid gap-4 md:grid-cols-[200px_1fr]">
        <h2 id="edu-title" className="text-xl font-medium text-ink md:pr-8 md:pt-6 md:text-right">
          Education
        </h2>
        <Reveal className="grid gap-4 md:ml-8">
          {education.map((e) => (
            <article key={e.institution} className="card flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <h3 className="text-lg font-medium text-ink">{e.degree}</h3>
                <p className="mt-1 text-ink-2">
                  {e.institution} <span className="text-ink-3">· {e.location}</span>
                </p>
                {e.notes.map((n) => (
                  <p key={n} className="mt-2 text-sm text-ink-2">
                    {n}
                  </p>
                ))}
              </div>
              <p className="font-mono text-sm tabular-nums text-ink-2">
                {e.start} – {e.end}
              </p>
            </article>
          ))}

          {certifications.length > 0 && (
            <ul className="grid gap-4 sm:grid-cols-2">
              {certifications.map((c) => (
                <li key={c.name} className="card p-6">
                  <p className="meta">
                    {c.issuer} · {c.year}
                  </p>
                  <p className="mt-2 text-ink">
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors duration-fast hover:text-accent">
                        {c.name} <ArrowUpRight />
                      </a>
                    ) : (
                      c.name
                    )}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
