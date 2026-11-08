"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "@/content/profile";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRight, Check, Copy, Download, GitHub, LinkedIn, Mail } from "@/components/ui/Icons";
import { StatusDot } from "@/components/ui/StatusDot";
import { fadeUp, stagger, VIEWPORT, EASE } from "@/lib/motion";

const HANDSHAKE = [
  "resolve channel.email",
  "resolve channel.linkedin",
  "resolve channel.github",
  "connection ready",
];

export function ContactSection() {
  const channels = [
    {
      id: "email",
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: <Mail width={18} height={18} />,
      external: false,
    },
    {
      id: "linkedin",
      label: profile.links.linkedin.label,
      value: `in/${profile.links.linkedin.handle}`,
      href: profile.links.linkedin.href,
      icon: <LinkedIn width={18} height={18} />,
      external: true,
    },
    {
      id: "github",
      label: profile.links.github.label,
      value: `@${profile.links.github.handle}`,
      href: profile.links.github.href,
      icon: <GitHub width={18} height={18} />,
      external: true,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-50 mask-radial" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/10 blur-[140px]" />
      </div>

      <div className="shell relative">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={VIEWPORT} className="text-center">
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-3">
            <span className="font-mono text-2xs text-cyan">[05]</span>
            <span className="label">Establish connection</span>
          </motion.div>
          <motion.h2
            id="contact-title"
            variants={fadeUp}
            className="mx-auto max-w-4xl text-balance font-display text-[2.6rem] font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-ink sm:text-7xl lg:text-[5.5rem]"
          >
            Ready to build <span className="grad-text">something?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-pretty text-ink-muted sm:text-lg">
            Open to backend and software engineering opportunities, and always happy to talk about systems. Email is the fastest way to reach me.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={`mailto:${profile.email}`} icon={<ArrowUpRight />}>
              Send an email
            </ButtonLink>
            <ButtonLink href={profile.cvPath} download variant="secondary" icon={<Download />}>
              Download CV
            </ButtonLink>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="panel brackets mx-auto mt-16 grid max-w-4xl overflow-hidden md:grid-cols-[1fr_1.35fr]"
        >
          <Handshake />
          <ul className="divide-y divide-line">
            {channels.map((c) => (
              <li key={c.id} className="group relative flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate/50 sm:px-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line-strong text-ink-muted transition-colors group-hover:border-cyan/50 group-hover:text-cyan">
                  {c.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="label">{c.label}</p>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-0.5 block truncate font-medium text-ink after:absolute after:inset-0 hover:text-cyan"
                  >
                    {c.value}
                  </a>
                </div>
                {c.id === "email" ? <CopyButton text={profile.email} /> : <ArrowUpRight className="text-ink-faint transition-colors group-hover:text-cyan" />}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function Handshake() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(HANDSHAKE.length);
      return;
    }
    let i = 0;
    const t = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= HANDSHAKE.length) window.clearInterval(t);
    }, 380);
    return () => window.clearInterval(t);
  }, [inView]);

  const ready = count >= HANDSHAKE.length;
  return (
    <div ref={ref} className="flex flex-col border-b border-line bg-void/50 p-5 font-mono text-xs sm:p-6 md:border-b-0 md:border-r">
      <div className="mb-4 flex items-center gap-1.5" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="ml-3 text-[10px] uppercase tracking-[0.14em] text-ink-faint">uplink.sh</span>
      </div>
      <ul className="min-h-[92px] space-y-1.5 text-ink-muted" aria-hidden>
        {HANDSHAKE.slice(0, count).map((l, i) => (
          <motion.li key={l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: EASE }} className="flex justify-between gap-3">
            <span>
              <span className="text-blue">›</span> {l}
            </span>
            {i < HANDSHAKE.length - 1 && <span className="text-ok">ok</span>}
          </motion.li>
        ))}
        {!ready && <li className="inline-block h-3.5 w-2 animate-blink bg-cyan" />}
      </ul>
      <div className="mt-auto flex items-center gap-2 pt-6 text-[10px] uppercase tracking-[0.14em]">
        <StatusDot color={ready ? "#5BE3A6" : "#F5C46B"} />
        <span className={ready ? "text-ok" : "text-ink-faint"}>{ready ? "Channels open" : "Connecting"}</span>
      </div>
    </div>
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
      className="relative z-10 inline-flex h-9 items-center gap-1.5 rounded-md border border-line-strong px-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-cyan/50 hover:text-ink"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? <Check className="text-ok" /> : <Copy />}
      <span className="hidden sm:inline" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
