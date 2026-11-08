"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import { useIntro } from "@/components/layout/IntroSequence";
import { NexusCore } from "@/components/visuals/NexusCore";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Download } from "@/components/ui/Icons";
import { EASE } from "@/lib/motion";

export function HeroSection() {
  const { done } = useIntro();
  const parts = profile.name.split(" ");
  const last = parts.pop();

  // The only entrance on load: a short fade and rise with a small stagger.
  const item = (i: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: done ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
    transition: { duration: 0.4, delay: i * 0.05, ease: EASE },
  });

  return (
    <section id="home" aria-label="Introduction" className="flex min-h-[100svh] items-center pb-16 pt-24 lg:pb-12">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <div>
          <motion.p {...item(0)} className="meta mb-6">
            <span className="text-ink-2">{profile.focus}</span>
            <span className="mx-2 text-line-strong">/</span>
            {profile.location}
          </motion.p>

          <motion.h1
            {...item(1)}
            className="text-[44px] font-medium leading-[1.04] tracking-[-0.03em] text-ink sm:text-[56px] lg:text-[68px]"
          >
            {parts.join(" ")} <br className="hidden sm:block" />
            {last}
          </motion.h1>

          <motion.p {...item(2)} className="mt-6 max-w-[36rem] text-pretty text-lg leading-[1.6] text-ink-2 sm:text-xl sm:leading-[1.5]">
            {profile.intro}
          </motion.p>

          <motion.div {...item(3)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#experience" icon={<ArrowRight />}>
              See my work
            </ButtonLink>
            <ButtonLink href={profile.cvPath} download variant="secondary" icon={<Download />}>
              Download CV
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[540px]"
        >
          <NexusCore className="absolute inset-0 h-full w-full" />
        </motion.div>
      </div>
    </section>
  );
}
