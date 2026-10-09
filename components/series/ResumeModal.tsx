"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { seriesProfile } from "@/data/series";
import { useSmoothScroll } from "./hooks/smoothScroll";
import { EASE } from "./fx";

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  const { lock, unlock } = useSmoothScroll();

  useEffect(() => {
    lock();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
    };
  }, [lock, unlock, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[160] flex flex-col bg-ink/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      role="dialog"
      aria-label="Résumé"
    >
      <div className="gutter flex h-16 shrink-0 items-center justify-between">
        <span className="font-display text-2xl text-bone">
          Résumé <span className="text-cyan">/ {seriesProfile.firstName}</span>
        </span>
        <div className="flex items-center gap-3">
          <a
            href={seriesProfile.resumePdf}
            download
            data-cursor="link"
            className="rounded-full border border-white/20 px-5 py-2 font-sans text-xs font-semibold tracking-wide text-bone transition hover:border-cyan/70 hover:text-cyan-2"
          >
            DOWNLOAD
          </a>
          <button
            type="button"
            onClick={onClose}
            data-cursor="link"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-bone transition hover:border-white/60"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-4xl flex-1 overflow-hidden px-4 pb-6">
        <iframe title="Résumé PDF" src={seriesProfile.resumePdf} className="h-full w-full rounded-xl border border-white/10 bg-white" />
      </div>
    </motion.div>
  );
}
