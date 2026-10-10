"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer, useReducedMotionPref } from "./hooks/useMedia";

type CursorKind = "default" | "link" | "play" | "drag";

/** Visual recipe per state. Fills use rgba of cyan (#38cfe8) / violet (#8b7cf6). */
const RING: Record<
  CursorKind,
  { size: number; border: string; fill: string; glyph: string }
> = {
  default: { size: 36, border: "rgba(56,207,232,0.45)", fill: "rgba(56,207,232,0)", glyph: "" },
  link: { size: 58, border: "rgba(56,207,232,0.85)", fill: "rgba(56,207,232,0.10)", glyph: "" },
  play: { size: 78, border: "rgba(139,124,246,0.90)", fill: "rgba(139,124,246,0.16)", glyph: "▶" },
  drag: { size: 66, border: "rgba(56,207,232,0.90)", fill: "rgba(56,207,232,0.14)", glyph: "⇆" },
};

/**
 * Premium follower cursor for fine-pointer, non-reduced-motion devices: a crisp
 * dot that tracks the pointer and a larger ring that trails with a soft spring.
 * Elements can set `data-cursor="link|play|drag"` (or simply be a/button/[role=button])
 * to reshape the ring and surface a glyph on hover.
 */
export default function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const active = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Dot: snappy, sits right on the real pointer.
  const dotX = useSpring(x, { stiffness: 1300, damping: 55, mass: 0.22 });
  const dotY = useSpring(y, { stiffness: 1300, damping: 55, mass: 0.22 });
  // Ring: softer, lags behind for the trailing feel.
  const ringX = useSpring(x, { stiffness: 240, damping: 24, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 240, damping: 24, mass: 0.55 });

  const [kind, setKind] = useState<CursorKind>("default");
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    document.body.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor],a,button,[role='button']",
      );
      const c = el?.getAttribute("data-cursor");
      if (c === "play" || c === "link" || c === "drag") setKind(c);
      else if (el) setKind("link");
      else setKind("default");
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [active, x, y]);

  if (!active) return null;

  const ring = RING[kind];
  const dotSize = kind === "default" ? 7 : 5;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200]"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: down ? 0.82 : 1, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-sans text-sm font-bold text-bone"
          animate={{
            width: ring.size,
            height: ring.size,
            borderColor: ring.border,
            backgroundColor: ring.fill,
          }}
          transition={{ type: "spring", stiffness: 360, damping: 30 }}
        >
          <AnimatePresence mode="wait">
            {ring.glyph && (
              <motion.span
                key={ring.glyph}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.14 }}
              >
                {ring.glyph}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200]"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: down ? 0.65 : 1, opacity: visible ? (kind === "default" ? 1 : 0.5) : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: "rgba(56,207,232,0.95)", mixBlendMode: "difference" }}
          animate={{ width: dotSize, height: dotSize }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      </motion.div>
    </>
  );
}
