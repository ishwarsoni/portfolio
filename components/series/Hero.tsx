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
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* aurora backdrop */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_50%_at_30%_35%,rgba(56,207,232,0.14),transparent_70%),radial-gradient(45%_45%_at_85%_75%,rgba(139,124,246,0.14),transparent_70%)]" />
      {!reduced && <Particles count={36} className="z-0" />}
      {!reduced && (
        <>
          <span className="light-streak left-[6%] top-[26%] w-[32%]" />
          <span className="light-streak left-[44%] top-[70%] w-[26%]" style={{ animationDelay: "2.6s" }} />
        </>
      )}

      {/* cinematic portrait billboard — bleeds from the right into the ink */}
      <motion.div style={{ y: reduced ? 0 : portraitY }} className="absolute inset-y-0 right-0 z-0 w-full sm:w-[74%] lg:w-[58%]">
        <PortraitPoster edges="bottom" className="h-full w-full" />
        {/* fade toward the text column */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent sm:via-ink/55 lg:via-ink/25" />
      </motion.div>
      {/* overall legibility scrim (stronger on mobile) */}
      <div aria-hidden className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30 sm:via-transparent sm:to-transparent" />

      {/* copy */}
      <div className="gutter relative z-10 w-full">
        <motion.div style={{ y: reduced ? 0 : textY, opacity: reduced ? 1 : fade }} className="max-w-xl pt-24 sm:pt-16">
          <motion.div
            className="mb-4 flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.34em] text-cyan-2"
            initial={reduced ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="h-px w-10 bg-cyan-2" />
            {seriesProfile.role}
          </motion.div>

          <motion.h1
            className="font-display leading-[0.84] text-bone [text-shadow:0_6px_40px_rgba(3,4,7,0.7)]"
            style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
            initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: EASE }}
          >
            {seriesProfile.firstName} {seriesProfile.lastName}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md font-sans text-base leading-relaxed text-mist [text-shadow:0_2px_20px_rgba(3,4,7,0.8)] sm:text-lg"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            {seriesProfile.intro}
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap gap-2"
            initial={reduced ? false : { opacity: 0, y: 12 }}
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
            initial={reduced ? false : { opacity: 0, y: 12 }}
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
                className="rounded-full border border-white/25 bg-ink/30 px-7 py-3.5 font-sans text-sm font-semibold tracking-wide text-bone backdrop-blur-sm transition hover:border-cyan/70 hover:text-cyan-2"
              >
                VIEW RÉSUMÉ
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      <div aria-hidden className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-smoke sm:flex">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-cyan/50 to-transparent" />
      </div>
    </section>
  );
}
