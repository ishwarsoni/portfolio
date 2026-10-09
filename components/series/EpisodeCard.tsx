"use client";

import { motion } from "framer-motion";
import type { Episode } from "@/data/series";
import { EASE } from "./fx";

export default function EpisodeCard({ episode, index }: { episode: Episode; index: number }) {
  const p = episode.palette;
  return (
    <motion.article
      className="relative overflow-hidden rounded-xl border border-white/8"
      style={{ background: `linear-gradient(155deg, ${p.from}, ${p.to})` }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
    >
      <div aria-hidden className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(60% 60% at 85% 15%, ${p.accent}22, transparent 70%)` }} />
      <div className="relative flex flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-semibold tracking-[0.2em]" style={{ color: p.accent }}>
            {episode.code}
          </span>
          <span className="font-sans text-[11px] text-bone/50">{episode.runtime}</span>
        </div>
        <h4 className="font-display text-3xl leading-none text-bone">{episode.title}</h4>
        <p className="font-sans text-sm leading-relaxed text-bone/75">{episode.description}</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {episode.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/12 px-2 py-0.5 font-sans text-[10px] tracking-wide text-bone/70">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
