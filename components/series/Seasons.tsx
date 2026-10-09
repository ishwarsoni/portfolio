"use client";

import { motion } from "framer-motion";
import { seasons } from "@/data/series";
import { EASE, SectionHeading } from "./fx";
import EpisodeCard from "./EpisodeCard";

export default function Seasons() {
  return (
    <div>
      <SectionHeading kicker="My Journey" title="Seasons" />
      <div className="gutter flex flex-col gap-14">
        {seasons.map((s) => (
          <div key={s.number}>
            <motion.div
              className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="font-display text-4xl text-bone">Season {s.number}</span>
              <span className="font-display text-4xl text-cyan">{s.title}</span>
              <span className="font-sans text-xs tracking-[0.2em] text-smoke">{s.period}</span>
            </motion.div>
            <p className="mb-6 max-w-2xl font-sans text-sm leading-relaxed text-mist">{s.synopsis}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {s.episodes.map((ep, i) => (
                <EpisodeCard key={ep.code} episode={ep} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
