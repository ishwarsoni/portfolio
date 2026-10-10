"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sectionMeta, type SectionId } from "@/data/series";
import { useWatchProgress } from "./hooks/sectionProgress";
import { useSmoothScroll } from "./hooks/smoothScroll";
import { useFinePointer, useReducedMotionPref } from "./hooks/useMedia";
import { EASE } from "./fx";

export default function ContinueWatching({ order }: { order: SectionId[] }) {
  const progress = useWatchProgress();
  const { scrollTo } = useSmoothScroll();
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section aria-labelledby="continue-watching" className="relative py-10 sm:py-14">
      <div className="gutter mb-5 flex flex-wrap items-end justify-between gap-3">
        <p
          id="continue-watching"
          className="flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-mist"
        >
          <span className="h-px w-8 bg-cyan-2" /> Continue Watching
        </p>
        <span className="hidden font-sans text-[11px] text-smoke sm:block">Progress tracks how far you&apos;ve scrolled</span>
      </div>

      <div className="rail gutter flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 sm:gap-5">
        {order.map((id, i) => {
          const meta = sectionMeta[id];
          const raw = Math.min(1, Math.max(0, progress[id] ?? 0));
          const pct = Math.round(raw * 100);
          const isHovered = hovered === i;
          const dim = fine && hovered !== null && !isHovered;
          return (
            <motion.button
              key={id}
              type="button"
              data-cursor="play"
              onClick={() => scrollTo(`#${id}`)}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              aria-label={`${meta.card} — ${pct}% watched`}
              className="group relative w-[230px] shrink-0 snap-start overflow-hidden rounded-2xl text-left ring-1 ring-white/10 transition-shadow duration-500 hover:ring-white/25 sm:w-[270px]"
              initial={reduced ? false : { opacity: 0, x: 40 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px -5% 0px 0px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              animate={reduced ? undefined : { scale: isHovered ? 1.04 : 1, opacity: dim ? 0.6 : 1 }}
            >
              {/* thumbnail — palette gradient art */}
              <div
                className="relative flex aspect-[16/10] flex-col justify-end overflow-hidden p-4"
                style={{ background: `linear-gradient(150deg, ${meta.palette.from}, ${meta.palette.via} 60%, ${meta.palette.to})` }}
              >
                <div
                  aria-hidden
                  className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                  style={{ background: meta.palette.accent }}
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <span
                  aria-hidden
                  className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/40 text-[11px] text-bone backdrop-blur transition duration-500 group-hover:scale-110 group-hover:border-bone"
                >
                  &#9654;
                </span>

                <div className="relative z-10">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em]" style={{ color: meta.palette.accent }}>
                    {meta.nav}
                  </span>
                  <p className="mt-0.5 font-display text-2xl leading-none tracking-wide text-bone">{meta.card}</p>
                  <p className="mt-1 font-sans text-[11px] text-mist">{meta.meta}</p>
                </div>
              </div>

              {/* real progress bar from useWatchProgress */}
              <div className="relative flex items-center gap-2 bg-ink-2 px-4 py-2.5">
                <div className="h-[3px] flex-1 overflow-hidden rounded bg-white/10">
                  <motion.div
                    className="h-full origin-left rounded"
                    style={{ background: meta.palette.accent }}
                    initial={false}
                    animate={{ scaleX: Math.max(0.03, raw) }}
                    transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
                  />
                </div>
                <span className="font-mono text-[10px] tabular-nums text-smoke">{pct}%</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
