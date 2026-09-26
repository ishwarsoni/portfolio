"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { siteData } from "@/data/site";

const SESSION_KEY = "intro-seen";

/**
 * Premium first-load intro: a mono counter runs 00 → 100 while a hairline gold
 * rule fills, then the panel wipes up to reveal the page. Shows once per
 * session, is skippable (click / Esc), and is bypassed entirely under
 * prefers-reduced-motion. Renders identically on server and first client paint
 * (phase starts "active") to avoid a hydration mismatch; the effect then
 * decides whether to animate or dismiss immediately.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<"active" | "done">("active");
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = rootRef.current;

    const seen = (() => {
      try {
        return sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        return false;
      }
    })();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const markSeen = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* storage blocked — intro simply shows again next reload */
      }
    };

    // Returning this session, reduced motion, or nothing to animate → dismiss now.
    if (seen || reduce || !root) {
      markSeen();
      setPhase("done");
      return;
    }

    // Lock scroll while the panel is up.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const counter = { v: 0 };
    let finished = false;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        markSeen();
        setPhase("done");
      },
    });

    tl.set(labelRef.current, { opacity: 0, y: 12 })
      .to(labelRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0)
      .to(
        counter,
        {
          v: 100,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
            }
          },
        },
        0
      )
      .fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.out" }, 0)
      .to([labelRef.current, counterRef.current, barRef.current?.parentElement], {
        opacity: 0,
        y: -16,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(root, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "-=0.1");

    // Skip: fast-forward the remaining timeline to the wipe.
    const finish = () => {
      if (finished) return;
      finished = true;
      gsap.to(tl, { timeScale: 4, duration: 0.1 });
    };
    finishRef.current = finish;

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finishRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      ref={rootRef}
      className="intro-loader"
      aria-hidden="true"
      onClick={() => finishRef.current()}
    >
      <div className="intro-loader__inner">
        <div ref={labelRef} className="intro-loader__label">
          <span className="intro-loader__name">{siteData.name}</span>
          <span className="intro-loader__role">AI Engineer</span>
        </div>
        <div className="intro-loader__meter">
          <div className="intro-loader__track">
            <div ref={barRef} className="intro-loader__bar" />
          </div>
          <span ref={counterRef} className="intro-loader__count">
            00
          </span>
        </div>
      </div>
    </div>
  );
}

export default IntroLoader;
