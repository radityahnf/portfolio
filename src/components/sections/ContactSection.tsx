"use client";

import { useState } from "react";
import { profile } from "@/content/profile";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, Check, Copy, Download, GitHub, LinkedIn, Mail } from "@/components/ui/Icons";

export function ContactSection() {
  const channels = [
    { id: "email", label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: <Mail />, external: false },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: `in/${profile.links.linkedin.handle}`,
      href: profile.links.linkedin.href,
      icon: <LinkedIn />,
      external: true,
    },
    {
      id: "github",
      label: "GitHub",
      value: `@${profile.links.github.handle}`,
      href: profile.links.github.href,
      icon: <GitHub />,
      external: true,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="meta mb-4">
              <span className="text-ink-2">05</span> <span className="mx-1 text-line-strong">/</span> Contact
            </p>
            <h2 id="contact-title" className="text-balance text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[48px]">
              Hiring for backend work? Let&apos;s talk
            </h2>
            <p className="mt-6 max-w-[36rem] text-pretty text-lg text-ink-2">
              I&apos;m open to backend and software engineering roles, and happy to talk through payment flows, queues or data
              pipelines. Email is the fastest way to reach me.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`mailto:${profile.email}`} icon={<ArrowUpRight />}>
                Email me
              </ButtonLink>
              <ButtonLink href={profile.cvPath} download variant="secondary" icon={<Download />}>
                Download CV
              </ButtonLink>
            </div>
          </div>

          <ul className="card divide-y divide-line">
            {channels.map((c) => (
              <li key={c.id} className="group relative flex items-center gap-4 px-6 py-4 transition-colors duration-fast hover:bg-raised/50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-raised text-ink-2">
                  {c.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="meta">{c.label}</p>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-1 block truncate text-ink after:absolute after:inset-0"
                  >
                    {c.value}
                  </a>
                </div>
                {c.id === "email" ? (
                  <CopyButton text={profile.email} />
                ) : (
                  <ArrowUpRight className="text-ink-3 transition-colors duration-fast group-hover:text-ink" />
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${text}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="relative z-10 inline-flex h-8 items-center gap-2 rounded-lg border border-line px-3 text-sm text-ink-2 transition-colors duration-fast hover:border-line-strong hover:text-ink"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? <Check className="text-positive" /> : <Copy />}
      <span className="hidden sm:inline" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
