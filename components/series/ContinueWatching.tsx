"use client";

import { motion } from "framer-motion";
import { sectionMeta, type SectionId } from "@/data/series";
import { useWatchProgress } from "./hooks/sectionProgress";
import { useSmoothScroll } from "./hooks/smoothScroll";
import { EASE } from "./fx";

export default function ContinueWatching({ order }: { order: SectionId[] }) {
  const progress = useWatchProgress();
  const { scrollTo } = useSmoothScroll();

  return (
    <section className="relative py-10 sm:py-14">
      <p className="gutter mb-5 flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-mist">
        <span className="h-px w-8 bg-cyan-2" /> Continue Watching
      </p>
      <div className="rail gutter flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {order.map((id, i) => {
          const meta = sectionMeta[id];
          const pct = Math.round((progress[id] ?? 0) * 100);
          return (
            <motion.button
              key={id}
              type="button"
              data-cursor="link"
              onClick={() => scrollTo(`#${id}`)}
              className="group relative w-[220px] shrink-0 snap-start overflow-hidden rounded-xl text-left sm:w-[260px]"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            >
              <div
                className="flex aspect-[16/10] flex-col justify-end p-4"
                style={{ background: `linear-gradient(150deg, ${meta.palette.via}, ${meta.palette.to})` }}
              >
                <span className="font-display text-2xl leading-none text-bone">{meta.card}</span>
                <span className="mt-1 font-sans text-[11px] text-bone/70">{meta.meta}</span>
              </div>
              <div className="h-[3px] w-full bg-white/10">
                <div className="h-full" style={{ width: `${pct}%`, background: meta.palette.accent }} />
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
