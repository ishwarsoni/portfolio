"use client";

import { motion } from "framer-motion";
import type { Episode } from "@/data/series";
import { EASE, Tilt } from "./fx";
import { useReducedMotionPref } from "./hooks/useMedia";

export default function EpisodeCard({ episode, index }: { episode: Episode; index: number }) {
  const p = episode.palette;
  const reduced = useReducedMotionPref();
  const epNo = (episode.code.split(" ")[1] ?? episode.code).replace("E", "");

  return (
    <motion.article
      className="h-full"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: reduced ? 0 : index * 0.06, ease: EASE }}
    >
      <Tilt max={6} className="group h-full rounded-2xl">
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8"
          style={{ background: `linear-gradient(155deg, ${p.from}, ${p.to})` }}
        >
          {/* palette accent rail */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-[3px]"
            style={{ background: `linear-gradient(180deg, ${p.accent}, ${p.via})` }}
          />
          {/* corner glow, brightens on hover */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-80"
            style={{ background: `radial-gradient(70% 60% at 88% 10%, ${p.accent}26, transparent 70%)` }}
          />
          {/* ghost episode number */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-5 right-2 select-none font-display leading-none text-bone/[0.06] text-[6.5rem]"
          >
            {epNo}
          </span>

          <div className="relative flex flex-1 flex-col gap-3 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.22em]"
                style={{ borderColor: `${p.accent}59`, color: p.accent, background: `${p.accent}12` }}
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                {episode.code}
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-bone/50">{episode.runtime}</span>
            </div>

            <h4 className="font-display tracking-wide text-bone text-3xl leading-none [transform:translateZ(28px)] sm:text-[2.1rem]">
              {episode.title}
            </h4>

            <p className="font-sans text-sm leading-relaxed text-bone/75">{episode.description}</p>

            <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
              {episode.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-0.5 font-sans text-[10px] tracking-wide text-bone/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
}
