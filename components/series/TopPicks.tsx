"use client";

import { motion } from "framer-motion";
import { topPicks } from "@/data/series";
import { EASE, SectionHeading } from "./fx";

export default function TopPicks() {
  return (
    <div>
      <SectionHeading kicker="Highlights" title="Top Picks" />
      <div className="rail gutter flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6">
        {topPicks.map((pick, i) => (
          <motion.div
            key={pick.title}
            data-cursor="drag"
            className="relative flex w-[260px] shrink-0 snap-start items-end overflow-hidden rounded-2xl sm:w-[300px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
            style={{ background: `linear-gradient(160deg, ${pick.palette.via}, ${pick.palette.to})`, aspectRatio: "3 / 4" }}
          >
            {/* big rank numeral */}
            <span className="pointer-events-none absolute -left-3 -top-6 font-display text-[9rem] leading-none text-outline opacity-70">{i + 1}</span>
            <div className="relative z-10 w-full p-5">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: pick.palette.accent }}>
                {pick.label}
              </p>
              <h4 className="mt-1 font-display text-3xl leading-none text-bone">{pick.title}</h4>
              <p className="mt-2 font-sans text-xs leading-snug text-bone/70">{pick.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
