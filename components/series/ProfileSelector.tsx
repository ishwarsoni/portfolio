"use client";

import { motion } from "framer-motion";
import { viewerProfiles, seriesProfile, type ProfileId } from "@/data/series";
import { EASE } from "./fx";

export default function ProfileSelector({ onPick }: { onPick: (id: ProfileId) => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center overflow-hidden bg-ink px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: EASE }}
      role="dialog"
      aria-label="Choose a viewing profile"
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(56,207,232,0.10),transparent_70%)]" />

      <motion.p
        className="relative mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-cyan-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        {seriesProfile.role}
      </motion.p>
      <motion.h2
        className="relative mb-12 text-center font-display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.9] text-bone"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
      >
        {"Who's watching?"}
      </motion.h2>

      <div className="relative flex flex-wrap items-start justify-center gap-6 sm:gap-10">
        {viewerProfiles.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            data-cursor="link"
            onClick={() => onPick(p.id)}
            className="group flex w-28 flex-col items-center gap-3 sm:w-36"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.08, ease: EASE }}
          >
            <span
              className="flex aspect-square w-full items-center justify-center rounded-2xl font-display text-4xl text-ink transition-all duration-300 group-hover:scale-105 sm:text-5xl"
              style={{ background: `linear-gradient(150deg, ${p.color}, ${p.color}bb)`, boxShadow: `0 18px 50px -18px ${p.color}` }}
            >
              {p.name[0]}
            </span>
            <span className="font-sans text-sm font-semibold text-mist transition-colors group-hover:text-bone">{p.name}</span>
            <span className="text-center font-sans text-[11px] leading-snug text-smoke">{p.blurb}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
