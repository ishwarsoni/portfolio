"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { introSlides, seriesProfile } from "@/data/series";
import { useSmoothScroll } from "./hooks/smoothScroll";
import { useReducedMotionPref } from "./hooks/useMedia";
import { EASE } from "./fx";

const DURATION = 4600; // ms per slide

export default function PlayIntro({ onClose }: { onClose: () => void }) {
  const { lock, unlock } = useSmoothScroll();
  const reduced = useReducedMotionPref();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const elapsed = useRef(0);
  const raf = useRef(0);
  const last = useRef(0);

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => {
        const n = i + dir;
        if (n < 0) return 0;
        if (n >= introSlides.length) {
          onClose();
          return i;
        }
        return n;
      });
      elapsed.current = 0;
      setProgress(0);
    },
    [onClose],
  );

  // auto-advance clock
  useEffect(() => {
    if (reduced) return;
    const tick = (now: number) => {
      if (!last.current) last.current = now;
      const dt = now - last.current;
      last.current = now;
      if (!paused) {
        elapsed.current += dt;
        const pr = Math.min(1, elapsed.current / DURATION);
        setProgress(pr);
        if (pr >= 1) {
          last.current = 0;
          go(1);
          return;
        }
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      last.current = 0;
    };
  }, [index, paused, reduced, go]);

  // scroll lock + keyboard
  useEffect(() => {
    lock();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === " ") {
        e.preventDefault();
        setPaused((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
    };
  }, [lock, unlock, onClose, go]);

  const slide = introSlides[index];
  const pct = reduced ? 1 : progress;

  return (
    <motion.div
      className="fixed inset-0 z-[170] flex flex-col overflow-hidden bg-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      role="dialog"
      aria-label="Intro highlight reel"
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_40%,rgba(56,207,232,0.14),transparent_70%),radial-gradient(50%_50%_at_80%_80%,rgba(139,124,246,0.12),transparent_70%)]" />

      {/* progress segments */}
      <div className="relative z-20 flex gap-1.5 px-5 pt-5">
        {introSlides.map((_, i) => (
          <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
            <div className="h-full bg-cyan" style={{ width: `${i < index ? 100 : i === index ? pct * 100 : 0}%`, transition: i === index ? "none" : "width 0.3s" }} />
          </div>
        ))}
      </div>

      {/* top bar */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-4">
        <span className="font-display text-xl tracking-wide text-bone">
          {seriesProfile.firstName} <span className="text-cyan">INTRO</span>
        </span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPaused((v) => !v)} aria-label={paused ? "Play" : "Pause"} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-bone transition hover:border-white/60">
            {paused ? "▶" : "❚❚"}
          </button>
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-bone transition hover:border-white/60">
            ✕
          </button>
        </div>
      </div>

      {/* tap zones */}
      <button type="button" aria-label="Previous" onClick={() => go(-1)} className="absolute inset-y-0 left-0 z-10 w-1/3" />
      <button type="button" aria-label="Next" onClick={() => go(1)} className="absolute inset-y-0 right-0 z-10 w-1/3" />

      {/* slide */}
      <div className="relative z-[5] flex flex-1 items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="max-w-3xl text-center"
            initial={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-cyan-2">{slide.kicker}</p>
            <h2 className="font-display text-[clamp(2.6rem,9vw,6rem)] leading-[0.9] text-bone">{slide.title}</h2>
            <div className="mt-6 flex flex-col gap-1.5">
              {slide.lines.map((l, i) => (
                <p key={i} className="font-sans text-sm leading-relaxed text-mist sm:text-base">
                  {l}
                </p>
              ))}
            </div>
            {slide.chips && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {slide.chips.map((c) => (
                  <span key={c} className="series-glass rounded-full px-3 py-1 font-sans text-[11px] text-bone/90">
                    {c}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
