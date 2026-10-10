"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { introSlides, seriesProfile } from "@/data/series";
import { useSmoothScroll } from "./hooks/smoothScroll";
import { useReducedMotionPref } from "./hooks/useMedia";
import { EASE } from "./fx";

const DURATION = 4600; // ms per slide
const ZOOM_MS = 1200; // cinematic "press play" push-in

type Phase = "zoom" | "reel";

export default function PlayIntro({ onClose }: { onClose: () => void }) {
  const { lock, unlock } = useSmoothScroll();
  const reduced = useReducedMotionPref();
  const [phase, setPhase] = useState<Phase>(reduced ? "reel" : "zoom");
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

  // Phase 1 -> Phase 2: dissolve the zoom into the reel after a beat.
  useEffect(() => {
    if (phase !== "zoom") return;
    const t = window.setTimeout(() => setPhase("reel"), ZOOM_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  // auto-advance clock (reel only)
  useEffect(() => {
    if (reduced || phase !== "reel") return;
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
  }, [index, paused, reduced, phase, go]);

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
  const zooming = phase === "zoom";

  return (
    <motion.div
      className="fixed inset-0 z-[170] flex flex-col overflow-hidden bg-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      role="dialog"
      aria-modal="true"
      aria-label="Intro highlight reel"
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_40%,rgba(56,207,232,0.14),transparent_70%),radial-gradient(50%_50%_at_80%_80%,rgba(139,124,246,0.12),transparent_70%)]" />

      {/* Phase 1: cinematic zoom-into-portrait */}
      <AnimatePresence>
        {zooming && (
          <motion.div
            key="zoom"
            className="absolute inset-0 z-[60] flex items-center justify-center overflow-hidden bg-ink"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(14px)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <motion.div
              aria-hidden
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.65] }}
              transition={{ duration: ZOOM_MS / 1000, ease: EASE, times: [0, 0.5, 1] }}
              style={{ background: "radial-gradient(55% 50% at 50% 38%, rgba(56,207,232,0.3), transparent 68%), radial-gradient(45% 45% at 72% 78%, rgba(139,124,246,0.26), transparent 70%)" }}
            />
            <motion.img
              src={seriesProfile.portrait.src}
              alt=""
              aria-hidden
              className="h-[86vh] w-auto max-w-none object-contain object-top [filter:contrast(1.07)_saturate(0.92)] [mask-image:linear-gradient(to_bottom,black_62%,transparent)]"
              initial={{ scale: 1.04, opacity: 0, filter: "blur(18px)" }}
              animate={{ scale: [1.06, 1.16, 1.52], opacity: [0, 1, 0], filter: ["blur(18px)", "blur(0px)", "blur(7px)"] }}
              transition={{ duration: ZOOM_MS / 1000, ease: [0.7, 0, 0.2, 1], times: [0, 0.5, 1] }}
              style={{ transformOrigin: "50% 32%" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* progress segments */}
      <motion.div
        className="relative z-20 flex gap-1.5 px-5 pt-5"
        initial={false}
        animate={{ opacity: zooming ? 0 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {introSlides.map((_, i) => (
          <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
            <div className="h-full bg-cyan" style={{ width: `${i < index ? 100 : i === index ? pct * 100 : 0}%`, transition: i === index ? "none" : "width 0.3s" }} />
          </div>
        ))}
      </motion.div>

      {/* top bar */}
      <motion.div
        className="relative z-20 flex items-center justify-between px-5 pt-4"
        initial={false}
        animate={{ opacity: zooming ? 0 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
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
      </motion.div>

      {/* tap zones */}
      {!zooming && (
        <>
          <button type="button" aria-label="Previous" onClick={() => go(-1)} className="absolute inset-y-0 left-0 z-10 w-1/3" />
          <button type="button" aria-label="Next" onClick={() => go(1)} className="absolute inset-y-0 right-0 z-10 w-1/3" />
        </>
      )}

      {/* slide */}
      <div className="relative z-[5] flex flex-1 items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {!zooming && (
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
                  <motion.p
                    key={i}
                    className="font-sans text-sm leading-relaxed text-mist sm:text-base"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.5, ease: EASE }}
                  >
                    {l}
                  </motion.p>
                ))}
              </div>
              {slide.chips && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {slide.chips.map((c, i) => (
                    <motion.span
                      key={c}
                      className="series-glass rounded-full px-3 py-1 font-sans text-[11px] text-bone/90"
                      initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.45 + i * 0.06, duration: 0.4, ease: EASE }}
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* hint */}
      <motion.p
        className="relative z-20 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] text-center font-sans text-[10px] uppercase tracking-[0.3em] text-smoke"
        initial={false}
        animate={{ opacity: zooming ? 0 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <span className="hidden sm:inline">Space pause</span>
        <span className="hidden sm:inline"> &middot; </span>
        &larr; &rarr; skip
        <span> &middot; </span>
        Esc close
      </motion.p>
    </motion.div>
  );
}
