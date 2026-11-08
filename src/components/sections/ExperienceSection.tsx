import { experience } from "@/content/profile";
import type { Experience } from "@/content/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="04"
          label="Experience"
          titleId="exp-title"
          title="From QA automation to backend engineering"
          description="Four roles since 2024. Each one added a layer to how I build and support systems."
        />

        <ol className="relative">
          <span aria-hidden className="absolute bottom-0 left-[3px] top-2 w-px bg-line md:left-[203px]" />
          {experience.map((job) => (
            <Entry key={job.id} job={job} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Entry({ job }: { job: Experience }) {
  const current = job.end === null;
  return (
    <li className="relative grid gap-3 pb-8 pl-8 last:pb-0 md:grid-cols-[200px_1fr] md:gap-0 md:pl-0">
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-2 h-[7px] w-[7px] rounded-full md:left-[200px] md:top-8",
          current ? "bg-accent" : "border border-ink-3 bg-page",
        )}
      />
      <div className="md:pr-8 md:pt-6 md:text-right">
        <p className="font-mono text-sm tabular-nums text-ink">
          {job.start} – {job.end ?? "Present"}
        </p>
        <p className="meta mt-1">{job.type}</p>
      </div>

      <Reveal className="md:ml-8">
        <article className="card p-6 sm:p-8">
          <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-xl font-medium text-ink">{job.role}</h3>
            {current && <span className="meta text-ink-2">Current role</span>}
          </header>
          <p className="mt-1 text-ink-2">
            {job.company} <span className="text-ink-3">· {job.location}</span>
          </p>

          {job.impact && (
            <p className="mt-6 flex items-baseline gap-3 border-l-2 border-accent pl-4">
              <span className="text-[32px] font-medium leading-none tabular-nums text-accent">{job.impact.value}</span>
              <span className="text-sm text-ink-2">{job.impact.label}</span>
            </p>
          )}

          <ul className="mt-6 space-y-3">
            {job.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-pretty text-ink-2">
                <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink-3" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          {job.stack.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
              {job.stack.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </article>
      </Reveal>
    </li>
  );
}
