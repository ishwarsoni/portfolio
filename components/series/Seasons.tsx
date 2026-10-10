"use client";

import { motion } from "framer-motion";
import { seasons } from "@/data/series";
import { EASE, SectionHeading, RevealText } from "./fx";
import { useReducedMotionPref } from "./hooks/useMedia";
import EpisodeCard from "./EpisodeCard";

const totalEpisodes = seasons.reduce((n, s) => n + s.episodes.length, 0);

export default function Seasons() {
  const reduced = useReducedMotionPref();

  return (
    <div>
      <SectionHeading
        kicker="My Journey"
        title="Seasons"
        aside={
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-smoke">
            {seasons.length} Seasons &middot; {totalEpisodes} Episodes
          </p>
        }
      />

      <div className="flex flex-col gap-16 md:gap-24">
        {seasons.map((s) => {
          const accent = s.episodes[0]?.palette.accent ?? "#38cfe8";
          return (
            <motion.section
              key={s.number}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {/* aurora wash — static under reduced motion */}
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-16 left-[4%] h-64 w-64 rounded-full blur-[90px] sm:h-80 sm:w-80"
                  style={{ background: accent, opacity: 0.12 }}
                  animate={reduced ? undefined : { x: [0, 26, 0], y: [0, 14, 0] }}
                  transition={reduced ? undefined : { duration: 16, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <div className="gutter relative">
                {/* bold season header */}
                <div className="relative mb-7 overflow-hidden">
                  <span
                    aria-hidden
                    className="text-outline pointer-events-none absolute -top-10 right-0 hidden select-none font-display leading-none opacity-50 text-[clamp(5rem,15vw,12rem)] md:block"
                  >
                    {String(s.number).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.3em]">
                      <span style={{ color: accent }}>Season {String(s.number).padStart(2, "0")}</span>
                      <span aria-hidden className="hidden h-px w-10 sm:block" style={{ background: accent }} />
                      <span className="text-smoke">{s.period}</span>
                      <span className="text-smoke">
                        {s.episodes.length} {s.episodes.length === 1 ? "Episode" : "Episodes"}
                      </span>
                    </div>
                    <RevealText
                      as="h3"
                      text={s.title}
                      className="font-display tracking-wide text-bone text-[clamp(2rem,5vw,3.75rem)] leading-[0.95]"
                    />
                    <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-mist md:text-[15px]">{s.synopsis}</p>
                  </div>
                </div>

                {/* episode cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {s.episodes.map((ep, i) => (
                    <EpisodeCard key={ep.code} episode={ep} index={i} />
                  ))}
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
