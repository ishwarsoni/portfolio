"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer, useReducedMotionPref } from "./hooks/useMedia";

type CursorKind = "default" | "link" | "play" | "drag";

/**
 * A soft follower cursor shown only with a mouse/trackpad. Elements can set
 * `data-cursor="link|play|drag"` to change its shape/label on hover.
 */
export default function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const active = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const [kind, setKind] = useState<CursorKind>("default");
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!active) return;
    document.body.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor],a,button,[role='button']");
      const c = el?.getAttribute("data-cursor");
      if (c === "play" || c === "link" || c === "drag") setKind(c);
      else if (el) setKind("link");
      else setKind("default");
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", d);
    window.addEventListener("pointerup", u);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", d);
      window.removeEventListener("pointerup", u);
    };
  }, [active, x, y]);

  if (!active) return null;

  const size = kind === "play" ? 72 : kind === "drag" ? 64 : kind === "link" ? 44 : 18;
  const label = kind === "play" ? "▶" : kind === "drag" ? "⇆" : "";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-ink"
        style={{
          width: size,
          height: size,
          background: kind === "default" ? "rgba(111,233,242,0.9)" : "rgba(236,238,244,0.95)",
          mixBlendMode: kind === "default" ? "difference" : "normal",
        }}
        animate={{ scale: down ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {label && <span className="font-sans text-base font-bold">{label}</span>}
      </motion.div>
    </motion.div>
  );
}
