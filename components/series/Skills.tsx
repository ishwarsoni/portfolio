"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/data/series";
import { EASE, SectionHeading, Tilt } from "./fx";

const ACCENTS = ["#38cfe8", "#8b7cf6", "#46e3a8", "#5aa6ff", "#ffb547"];

export default function Skills() {
  return (
    <div>
      <SectionHeading kicker="Genres" title="My Skills" />
      <div className="gutter grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cat, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            >
              <Tilt className="series-glass h-full rounded-xl p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-8 w-1 rounded-full" style={{ background: accent }} />
                  <h4 className="font-display text-2xl leading-none text-bone">{cat.title}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.tags.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-sans text-[11px] text-bone/80">
                      {t}
                    </span>
                  ))}
                </div>
              </Tilt>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
