"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile, experience } from "@/content/profile";
import { useIntro } from "@/components/layout/IntroSequence";
import { NexusCore } from "@/components/visuals/NexusCore";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Download, Mail } from "@/components/ui/Icons";
import { StatusDot } from "@/components/ui/StatusDot";
import { EASE } from "@/lib/motion";

// Labels for the orbiting nodes — taken from the CV's core skills.
const CORE_LABELS = ["Java", "Spring Boot", "AWS", "RabbitMQ", "Redis", "PostgreSQL"];

export function HeroSection() {
  const { done } = useIntro();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const current = experience.find((e) => e.end === null);
  const nameParts = profile.name.split(" ");
  const last = nameParts.pop();

  const state = done ? "show" : "hidden";
  const item = (i: number) => ({
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, delay: 0.1 + i * 0.09, ease: EASE } },
  });

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pb-20 lg:pt-32"
    >
      {/* Hero-specific lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-blue/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-1/3 h-[480px] w-[480px] rounded-full bg-violet/10 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
      </div>

      <div className="shell relative grid items-center gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-6">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10">
          <motion.div initial="hidden" animate={state} variants={item(0)} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-line bg-navy/60 px-3 py-1.5 backdrop-blur">
              <StatusDot />
              <span className="label text-ink">NEXUS / Personal profile</span>
            </span>
            <span className="label hidden sm:inline">ID · {profile.initials}-01</span>
          </motion.div>

          <motion.p
            initial="hidden"
            animate={state}
            variants={item(1)}
            className="mb-5 flex flex-wrap gap-x-3 gap-y-1 font-display text-[15px] font-medium text-ink-muted sm:text-lg"
          >
            {profile.headline.map((h, i) => (
              <span key={h} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rotate-45" style={{ background: ["#4D8DFF", "#69E3FF", "#9B7BFF"][i % 3] }} />
                {h}
              </span>
            ))}
          </motion.p>

          <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.045em] text-ink">
            <motion.span
              initial="hidden"
              animate={state}
              variants={item(2)}
              className="block text-[clamp(2.75rem,9.5vw,6.25rem)]"
            >
              {nameParts.join(" ")}
            </motion.span>
            <motion.span
              initial="hidden"
              animate={state}
              variants={item(3)}
              className="grad-text block pb-2 text-[clamp(2.75rem,9.5vw,6.25rem)]"
            >
              {last}
            </motion.span>
          </h1>

          <motion.div initial="hidden" animate={state} variants={item(4)} className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-display text-xl font-medium text-ink sm:text-2xl">{profile.title}</span>
            <span className="h-px w-8 bg-line-strong" />
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-cyan">{profile.focus}</span>
          </motion.div>

          <motion.p
            initial="hidden"
            animate={state}
            variants={item(5)}
            className="mt-6 max-w-[34rem] text-pretty text-base leading-relaxed text-ink-muted sm:text-[17px]"
          >
            {profile.intro}
          </motion.p>

          <motion.div initial="hidden" animate={state} variants={item(6)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="#projects" icon={<ArrowRight />}>
              Explore projects
            </ButtonLink>
            <ButtonLink href={profile.cvPath} download variant="secondary" icon={<Download />}>
              Download CV
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost" icon={<Mail />} className="sm:px-3">
              Contact me
            </ButtonLink>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate={state}
            variants={item(7)}
            className="mt-12 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line font-mono text-[11px] uppercase tracking-[0.08em]"
          >
            {current && (
              <div className="bg-void/80 px-4 py-3">
                <dt className="text-ink-faint">Currently</dt>
                <dd className="mt-1 truncate text-ink">
                  {current.role.replace("Software ", "")} @ {current.company}
                </dd>
              </div>
            )}
            <div className="bg-void/80 px-4 py-3">
              <dt className="text-ink-faint">Based in</dt>
              <dd className="mt-1 text-ink">{profile.location}</dd>
            </div>
          </motion.dl>
        </motion.div>

        <motion.div
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={done ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          className="relative mx-auto aspect-square w-full max-w-[min(100%,620px)] lg:-mr-6"
        >
          <CoreFrame />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-ink md:flex"
        aria-label="Scroll to About"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scan bg-gradient-to-b from-transparent via-cyan to-transparent" />
        </span>
      </motion.a>
    </section>
  );
}

/** HUD frame around the 3D core. Readouts describe the visual itself — nothing fake. */
function CoreFrame() {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const onRotation = useCallback((x: number, y: number) => setRot({ x, y }), []);

  return (
    <div className="relative h-full w-full">
      <div aria-hidden className="absolute inset-[6%] rounded-full border border-line" />
      <div aria-hidden className="absolute inset-[18%] rounded-full border border-dashed border-line/70" />
      <div aria-hidden className="absolute inset-0 bg-grid-fine mask-radial opacity-60" />
      {/* crosshair */}
      <div aria-hidden className="absolute left-1/2 top-[3%] h-[6%] w-px bg-gradient-to-b from-transparent to-cyan/50" />
      <div aria-hidden className="absolute bottom-[3%] left-1/2 h-[6%] w-px bg-gradient-to-t from-transparent to-cyan/50" />
      <div aria-hidden className="absolute left-[3%] top-1/2 h-px w-[6%] bg-gradient-to-r from-transparent to-cyan/50" />
      <div aria-hidden className="absolute right-[3%] top-1/2 h-px w-[6%] bg-gradient-to-l from-transparent to-cyan/50" />

      <NexusCore labels={CORE_LABELS} onRotation={onRotation} className="absolute inset-0 h-full w-full" />

      <div aria-hidden className="pointer-events-none absolute inset-0 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
        <div className="absolute left-0 top-2 sm:top-4">
          <p className="text-ink-muted">core.view</p>
          <p>geodesic · f2</p>
        </div>
        <div className="absolute right-0 top-2 text-right tabular-nums sm:top-4">
          <p>
            rot.x <span className="text-cyan">{rot.x.toFixed(1).padStart(5, "0")}°</span>
          </p>
          <p>
            rot.y <span className="text-cyan">{rot.y.toFixed(1).padStart(5, "0")}°</span>
          </p>
        </div>
        <div className="absolute bottom-2 left-0 sm:bottom-4">
          <p>nodes 42 · edges 120</p>
        </div>
        <div className="absolute bottom-2 right-0 hidden text-right sm:bottom-4 sm:block">
          <p className="text-ink-muted">stack.link</p>
          <p>6 core modules</p>
        </div>
      </div>
    </div>
  );
}
