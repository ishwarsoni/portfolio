"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { topPicks } from "@/data/series";
import { EASE, SectionHeading } from "./fx";
import { useReducedMotionPref } from "./hooks/useMedia";

export default function TopPicks() {
  const reduced = useReducedMotionPref();
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <SectionHeading kicker="Top 10" title="Top Picks" />
      <div className="rail gutter flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 sm:gap-8">
        {topPicks.map((pick, i) => {
          const isActive = active === i;
          return (
            <motion.article
              key={pick.title}
              data-cursor="drag"
              className="group relative flex shrink-0 snap-start items-end"
              initial={reduced ? false : { opacity: 0, x: 48 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px -5% 0px 0px" }}
              transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.05, ease: EASE }}
              onHoverStart={() => setActive(i)}
              onHoverEnd={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              {/* giant outlined rank numeral overlapping the card's left edge */}
              <span
                aria-hidden
                className="text-outline pointer-events-none -mr-7 select-none font-display leading-[0.74] transition duration-500 sm:-mr-10"
                style={{
                  fontSize: i === 9 ? "clamp(8rem,20vw,13rem)" : "clamp(10rem,24vw,17rem)",
                  letterSpacing: i === 9 ? "-0.06em" : undefined,
                  WebkitTextStrokeColor: isActive ? pick.palette.accent : undefined,
                }}
              >
                {i + 1}
              </span>

              {/* poster card — palette gradient art */}
              <div
                className="relative z-10 h-[280px] w-[172px] overflow-hidden rounded-2xl shadow-[-16px_0_40px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition duration-500 group-hover:-translate-y-2 group-hover:ring-white/25 sm:h-[320px] sm:w-[200px]"
                style={{ background: `linear-gradient(160deg, ${pick.palette.from}, ${pick.palette.via} 55%, ${pick.palette.to})` }}
              >
                <div aria-hidden className="absolute inset-0">
                  <div
                    className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-55 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                    style={{ background: pick.palette.accent }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em]" style={{ color: pick.palette.accent }}>
                      {pick.label}
                    </p>
                    <span className="font-mono text-[10px] font-semibold text-bone/55">#{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-display text-[1.9rem] leading-[0.92] tracking-wide text-bone">{pick.title}</h4>
                    <p className="mt-1.5 font-sans text-[11px] leading-snug text-mist">{pick.detail}</p>
                    <span
                      className="mt-3 block h-[2px] w-7 origin-left rounded transition-all duration-500 group-hover:w-14"
                      style={{ background: pick.palette.accent }}
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
