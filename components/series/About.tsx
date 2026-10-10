"use client";

import { motion } from "framer-motion";
import { aboutData, seriesProfile } from "@/data/series";
import { EASE, SectionHeading, RevealText, Tilt } from "./fx";
import { useReducedMotionPref } from "./hooks/useMedia";

export default function About() {
  const reduced = useReducedMotionPref();

  // Reveal-on-scroll props — disabled entirely when the viewer prefers reduced motion.
  const rise = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-8% 0px" } as const,
          transition: { duration: 0.8, delay, ease: EASE },
        };

  // "A. B. C." → stacked editorial clauses for the pull-quote.
  const quoteLines = aboutData.quote
    .split(/\.\s+/)
    .map((s) => s.replace(/\.\s*$/, "").trim())
    .filter(Boolean);

  // "Headline — explanation" → structured card content.
  const principles = aboutData.principles.map((p) => {
    const [head, ...rest] = p.split(" — ");
    return { head, detail: rest.join(" — ") };
  });

  const focusRaw = aboutData.currentFocus.replace(/^currently focused on:\s*/i, "").trim();
  const focusText = focusRaw.charAt(0).toUpperCase() + focusRaw.slice(1);

  return (
    <div className="relative">
      <SectionHeading kicker="The Pilot" title="About Me" />

      <div className="gutter">
        {/* ACT 1 — opening spread: pull-quote + lead copy */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <figure className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-1 -top-10 select-none font-display text-[7rem] leading-none text-outline sm:-top-14 sm:text-[10rem]"
            >
              &ldquo;
            </span>
            <blockquote className="relative space-y-1">
              {quoteLines.map((line, i) => (
                <motion.p
                  key={i}
                  className="font-serif text-[clamp(1.7rem,4.2vw,3rem)] font-medium leading-[1.1] text-bone"
                  {...rise(0.08 * i)}
                >
                  {line}
                  <span className="text-cyan">.</span>
                </motion.p>
              ))}
            </blockquote>
            <motion.figcaption className="mt-7 flex items-center gap-3" {...rise(0.1)}>
              <span className="h-px w-10 bg-gradient-to-r from-cyan to-transparent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-mist">
                {seriesProfile.firstName} {seriesProfile.lastName} · {seriesProfile.role}
              </span>
            </motion.figcaption>
          </figure>

          <motion.div className="lg:pt-3" {...rise(0.15)}>
            <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-2">The lead</p>
            <p className="font-sans text-[15px] leading-[1.75] text-mist first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-5xl first-letter:leading-[0.7] first-letter:text-cyan sm:text-base">
              {aboutData.intro}
            </p>
          </motion.div>
        </div>

        {/* ACT 2 — operating principles */}
        <div className="mt-20 sm:mt-24">
          <div className="mb-8 flex items-end justify-between gap-4">
            <RevealText
              as="h3"
              text="Operating Principles"
              className="font-display text-[clamp(1.7rem,3.6vw,2.6rem)] leading-none tracking-wide text-bone"
            />
            <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.28em] text-smoke sm:block">
              {String(principles.length).padStart(2, "0")} rules of the room
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => {
              const num = String(i + 1).padStart(2, "0");
              const accent = i % 2 ? "text-violet" : "text-cyan";
              return (
                <Tilt key={i} max={4} glare={false} className="h-full rounded-xl">
                  <motion.article
                    className="series-glass group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl p-6"
                    {...rise(0.04 * i)}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-6xl leading-none text-bone/[0.06]"
                    >
                      {num}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs ${accent}`}>{num}</span>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>
                    <h4 className="font-sans text-[15px] font-semibold leading-snug text-bone">{p.head}</h4>
                    {p.detail && <p className="font-sans text-sm leading-relaxed text-mist">{p.detail}</p>}
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-cyan/60 via-violet/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </motion.article>
                </Tilt>
              );
            })}
          </div>
        </div>

        {/* ACT 3 — current focus callout */}
        <Tilt max={3} glare={false} className="mt-16 rounded-2xl sm:mt-20">
          <motion.div className="series-glass relative overflow-hidden rounded-2xl p-8 sm:p-10" {...rise(0.05)}>
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan/10 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-violet/10 blur-3xl" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
              <div className="flex shrink-0 items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan/70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-2">Now streaming</span>
              </div>
              <p className="font-serif text-lg leading-relaxed text-bone/90 sm:text-xl">{focusText}</p>
            </div>
          </motion.div>
        </Tilt>
      </div>
    </div>
  );
}
