"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import { useClock } from "@/lib/hooks";
import { InkScene } from "@/components/visuals/InkScene";
import { Seal } from "@/components/visuals/Ink";
import { CtaLink } from "@/components/ui/Button";
import { ArrowDown, ArrowRight } from "@/components/ui/Icons";
import { EASE } from "@/lib/motion";

export function HeroSection() {
  const time = useClock(profile.timeZone);
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.pop()!;
  const middle = rest.join(" ");

  // Typography enters once: lines rise out of a mask, then the details fade in.
  const rise = (i: number) => ({
    initial: { y: "105%" },
    animate: { y: "0%" },
    transition: { duration: 1.3, delay: 0.15 + i * 0.12, ease: EASE },
  });
  const fade = (d: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1.2, delay: d, ease: EASE },
  });

  return (
    <section id="home" aria-label="Introduction" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div {...fade(0)} className="absolute inset-0">
        <InkScene className="absolute inset-0" />
        {/* Vignette keeps the type readable over the scene */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,rgba(9,9,9,0.65),transparent_60%)]" />
      </motion.div>

      {/* Vertical edge text */}
      <motion.p
        {...fade(1)}
        className="vertical meta absolute left-5 top-1/2 hidden -translate-y-1/2 rotate-180 lg:block"
        aria-hidden
      >
        Java · Spring Boot · AWS
      </motion.p>
      <motion.div
        {...fade(1.1)}
        className="absolute right-5 top-28 hidden flex-col items-center gap-5 sm:flex lg:right-10"
        aria-hidden
      >
        <span lang="ja" className="vertical font-serif text-sm tracking-[0.5em] text-ink-2">
          {profile.ja.role}
        </span>
        <Seal text={profile.ja.seal} className="h-11 w-11" />
      </motion.div>

      <div className="shell relative flex flex-1 flex-col justify-center pb-40 pt-32 lg:pb-36">
        <motion.p {...fade(0.2)} aria-hidden className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="meta text-ink-2">{first}</span>
          <span lang="ja" className="font-serif text-xs tracking-[0.25em] text-ink-3">
            {profile.ja.name}
          </span>
        </motion.p>
        <h1 className="display text-[clamp(5rem,19vw,17rem)] text-ink">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden className="block overflow-hidden pb-[0.03em]">
            <motion.span {...rise(0)} className="block">
              {middle}
            </motion.span>
          </span>
          <span aria-hidden className="block overflow-hidden pb-[0.03em]">
            <motion.span {...rise(1)} className="outline-text block">
              {last}
            </motion.span>
          </span>
        </h1>

        <motion.div {...fade(0.9)} className="mt-10 grid max-w-xl gap-8">
          <p className="font-serif text-lg leading-[1.75] text-ink-2 sm:text-xl">{profile.intro}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <CtaLink href="#experience" icon={<ArrowRight />}>
              See my work
            </CtaLink>
            <CtaLink href={profile.cvPath} download variant="text" icon={<ArrowDown />}>
              Download CV
            </CtaLink>
          </div>
        </motion.div>
      </div>

      {/* Corner metadata, like a film's location card */}
      <motion.div
        {...fade(1.2)}
        className="shell absolute inset-x-0 bottom-6 flex items-end justify-between gap-6"
      >
        <div className="meta">
          <p className="text-ink-2">
            {profile.city} · <span suppressHydrationWarning>{time ? time.slice(0, 5) : "--:--"}</span> {profile.timeZoneLabel}
          </p>
          <p className="mt-1">{profile.focus}</p>
        </div>
        <div className="meta text-right">
          <p>{profile.coordinates[0]}</p>
          <p className="mt-1">{profile.coordinates[1]}</p>
        </div>
      </motion.div>
    </section>
  );
}
