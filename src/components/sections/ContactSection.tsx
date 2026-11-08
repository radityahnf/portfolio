"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/content/profile";
import { RedSun, Seigaiha } from "@/components/visuals/Ink";
import { CtaLink } from "@/components/ui/Button";
import { ArrowDown, ArrowUpRight, Check, Copy } from "@/components/ui/Icons";
import { lineRise, reveal, stagger, VIEWPORT } from "@/lib/motion";

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // The sun sinks slowly behind the headline as you arrive.
  const sunY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-15%", "5%"]);

  const links = [
    { label: "LinkedIn", value: `in/${profile.links.linkedin.handle}`, href: profile.links.linkedin.href },
    { label: "GitHub", value: `@${profile.links.github.handle}`, href: profile.links.github.href },
  ];

  return (
    <section id="contact" ref={ref} aria-labelledby="contact-title" className="relative overflow-hidden pb-16 pt-28 sm:pt-40">
      {/* Setting sun and a faint wave band */}
      <motion.div aria-hidden style={{ y: sunY }} className="pointer-events-none absolute right-[-18vw] top-[12%] w-[70vw] max-w-[640px] sm:right-[-4vw] sm:top-[6%] sm:w-[38vw] sm:max-w-[520px]">
        <RedSun className="h-auto w-full" />
      </motion.div>
      <Seigaiha id="seigaiha-contact" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-[0.06]" />

      <div className="shell relative">
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={VIEWPORT}>
          <motion.div variants={reveal} className="flex items-baseline justify-between gap-6 pb-4">
            <p className="meta">
              <span className="text-ink">05</span>
              <span className="mx-3 text-ink-3/60">—</span>
              Contact
            </p>
            <p lang="ja" className="font-serif text-sm tracking-[0.3em] text-ink-3">
              連絡
            </p>
          </motion.div>
          <motion.div variants={reveal} className="rule" />

          <h2 id="contact-title" className="display mt-10 text-[clamp(2.75rem,8.5vw,8.5rem)] text-ink">
            <span className="block overflow-hidden pb-[0.03em]">
              <motion.span variants={lineRise} className="block">
                Open to
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.03em]">
              <motion.span variants={lineRise} className="outline-text block">
                backend roles
              </motion.span>
            </span>
          </h2>

          <motion.div variants={reveal} className="mt-14 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="font-serif text-xl leading-[1.8] text-ink-2">
                I&apos;m open to backend and software engineering roles, and happy to talk through payment flows, queues or data
                pipelines. Email is the fastest way to reach me.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                <CtaLink href={`mailto:${profile.email}`} icon={<ArrowUpRight />}>
                  Email me
                </CtaLink>
                <CtaLink href={profile.cvPath} download variant="text" icon={<ArrowDown />}>
                  Download CV
                </CtaLink>
              </div>
            </div>

            <dl className="border-t border-line-strong lg:col-span-5 lg:col-start-8">
              <div className="flex items-center justify-between gap-4 border-b border-line py-5">
                <div className="min-w-0">
                  <dt className="meta">Email</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${profile.email}`} className="ink-link break-all pb-1 font-serif text-xl text-ink sm:text-2xl">
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <CopyButton text={profile.email} />
              </div>
              {links.map((l) => (
                <div key={l.label} className="border-b border-line py-5">
                  <dt className="meta">{l.label}</dt>
                  <dd className="mt-2">
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-lg text-ink">
                      <span className="ink-link pb-1">{l.value}</span>
                      <ArrowUpRight className="text-ink-3 transition-colors duration-300 group-hover:text-blood-bright" />
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>
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
      className="inline-flex h-10 shrink-0 items-center gap-2 border border-line-strong px-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2 transition-colors duration-300 hover:border-ink hover:text-ink"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? <Check /> : <Copy />}
      <span className="hidden sm:inline" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
