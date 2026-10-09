"use client";

import { motion } from "framer-motion";
import { seriesProfile } from "@/data/series";
import { EASE, Magnetic, SectionHeading } from "./fx";

export default function ResumeViewer({ onView }: { onView: () => void }) {
  return (
    <div>
      <SectionHeading kicker="The Full Story" title="Resume" />
      <div className="gutter">
        <motion.div
          className="series-glass flex flex-col items-start gap-6 overflow-hidden rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="max-w-lg">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-2">{seriesProfile.role}</p>
            <h3 className="mt-2 font-display text-4xl leading-none text-bone">The complete résumé</h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-mist">
              Every episode of the series in one page — education, the Semantic Labs internship, the three Originals and certifications. View it inline or download the PDF.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Magnetic>
              <button
                type="button"
                data-cursor="play"
                onClick={onView}
                className="rounded-full bg-bone px-7 py-3.5 font-sans text-sm font-bold tracking-wide text-ink shadow-[0_0_50px_rgba(56,207,232,0.4)] transition hover:bg-white"
              >
                VIEW RÉSUMÉ
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={seriesProfile.resumePdf}
                download
                data-cursor="link"
                className="rounded-full border border-white/20 px-7 py-3.5 font-sans text-sm font-semibold tracking-wide text-bone transition hover:border-cyan/70 hover:text-cyan-2"
              >
                DOWNLOAD
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
