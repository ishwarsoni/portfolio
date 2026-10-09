"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { seriesProfile } from "@/data/series";
import { useReducedMotionPref } from "./hooks/useMedia";
import { EASE, Magnetic, Particles } from "./fx";
import PortraitPoster from "./Poster";

export default function Hero({ onPlay, onResume }: { onPlay: () => void; onResume: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionPref();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const posterY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-16">
      {/* aurora backdrop */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_50%_at_72%_40%,rgba(56,207,232,0.14),transparent_70%),radial-gradient(45%_45%_at_15%_78%,rgba(139,124,246,0.12),transparent_70%)]" />
      {!reduced && <Particles count={38} className="z-0" />}
      {!reduced && (
        <>
          <span className="light-streak left-[6%] top-[28%] w-[34%]" />
          <span className="light-streak left-[50%] top-[66%] w-[28%]" style={{ animationDelay: "2.6s" }} />
        </>
      )}

      <div className="gutter relative z-10 grid w-full items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        {/* copy */}
        <motion.div style={{ y: textY, opacity: fade }} className="order-2 lg:order-1">
          <motion.div
            className="mb-4 flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.34em] text-cyan-2"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="h-px w-10 bg-cyan-2" />
            {seriesProfile.role}
          </motion.div>

          <motion.h1
            className="font-display leading-[0.84] text-bone"
            style={{ fontSize: "clamp(2.8rem, 8.5vw, 7rem)" }}
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: EASE }}
          >
            {seriesProfile.firstName} {seriesProfile.lastName}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl font-sans text-base leading-relaxed text-mist sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            {seriesProfile.intro}
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          >
            {seriesProfile.tagline.map((t) => (
              <span key={t} className="series-glass rounded-full px-3 py-1 font-sans text-[11px] font-medium tracking-wide text-bone/90">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            <Magnetic>
              <button
                type="button"
                data-cursor="play"
                onClick={onPlay}
                className="group flex items-center gap-3 rounded-full bg-bone px-7 py-3.5 font-sans text-sm font-bold tracking-wide text-ink shadow-[0_0_50px_rgba(56,207,232,0.4)] transition hover:bg-white"
              >
                <span className="text-base transition-transform group-hover:scale-125">▶</span> PLAY INTRO
              </button>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                data-cursor="link"
                onClick={onResume}
                className="rounded-full border border-white/20 px-7 py-3.5 font-sans text-sm font-semibold tracking-wide text-bone transition hover:border-cyan/70 hover:text-cyan-2"
              >
                VIEW RÉSUMÉ
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* portrait poster */}
        <motion.div
          style={{ y: posterY }}
          className="order-1 mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-2 lg:mx-0 lg:ml-auto lg:max-w-[440px]"
          initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
        >
          <PortraitPoster className="aspect-[4/5] w-full" />
        </motion.div>
      </div>

      <div aria-hidden className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-smoke sm:flex">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-cyan/50 to-transparent" />
      </div>
    </section>
  );
}
