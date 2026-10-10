"use client";

import { motion } from "framer-motion";
import { certifications, momentHighlights } from "@/data/series";
import { EASE, SectionHeading, Tilt } from "./fx";
import { useFinePointer, useReducedMotionPref } from "./hooks/useMedia";

/** Per-certificate accents (design-token cyan / violet) applied via inline style. */
const CERT_ACCENTS = ["#38cfe8", "#8b7cf6"] as const;

/** Decorative laurel branch drawn inline so it can inherit the card accent via currentColor. */
function Laurel({ side }: { side: "l" | "r" }) {
  return (
    <svg viewBox="0 0 30 64" aria-hidden className={`h-12 w-auto ${side === "r" ? "-scale-x-100" : ""}`}>
      <path d="M26 62C10 52 4 36 8 4" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.9" />
      {[10, 18, 26, 34, 42, 50].map((y, i) => (
        <ellipse
          key={y}
          cx={8 + i * 1.4}
          cy={y}
          rx="4.4"
          ry="2"
          fill="currentColor"
          opacity="0.72"
          transform={`rotate(-40 ${8 + i * 1.4} ${y})`}
        />
      ))}
    </svg>
  );
}

export default function Moments() {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const canFloat = fine && !reduced;

  return (
    <div>
      <SectionHeading kicker="Moments" title="Certifications & Highlights" />

      {/* Award-poster certification cards */}
      <div className="gutter mb-14 grid gap-5 sm:grid-cols-2 [perspective:1400px]">
        {certifications.map((c, i) => {
          const accent = CERT_ACCENTS[i % CERT_ACCENTS.length];
          return (
            <motion.a
              key={c.title}
              href={c.verifyUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="group block"
              initial={{ opacity: 0, y: 40, rotateX: canFloat ? 14 : 0 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              <Tilt max={7} className="h-full rounded-2xl">
                <article
                  className="series-glass relative flex h-full min-h-[322px] flex-col items-center overflow-hidden rounded-2xl px-6 pb-6 pt-8 text-center"
                  style={{ boxShadow: `inset 0 0 0 1px ${accent}2e` }}
                >
                  {/* aurora glow + accent crown line */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full opacity-50 blur-3xl transition duration-700 group-hover:opacity-90"
                    style={{ background: `radial-gradient(circle, ${accent}40, transparent 70%)` }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-6 top-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}b3, transparent)` }}
                  />
                  {/* inset certificate frame */}
                  <div aria-hidden className="pointer-events-none absolute inset-3 rounded-xl border border-white/10" />

                  {/* laurels flanking the type badge */}
                  <div className="relative flex items-center gap-2" style={{ color: accent }}>
                    <Laurel side="l" />
                    <span
                      className="rounded-full border px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.22em]"
                      style={{ borderColor: `${accent}59`, color: accent }}
                    >
                      {c.type}
                    </span>
                    <Laurel side="r" />
                  </div>

                  <p
                    className="relative mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.28em]"
                    style={{ color: accent }}
                  >
                    {c.issuer}
                  </p>
                  <h4 className="relative mt-3 font-display text-[1.9rem] leading-[0.95] tracking-wide text-bone">
                    {c.title}
                  </h4>
                  {c.description && (
                    <p className="relative mt-4 max-w-sm font-sans text-[13px] leading-relaxed text-mist">
                      {c.description}
                    </p>
                  )}

                  <div className="relative mt-auto flex w-full items-center justify-between pt-6 font-mono text-[11px] text-smoke">
                    <span>{c.date}</span>
                    <span
                      className="inline-flex items-center gap-1 font-sans font-semibold tracking-wide transition-all group-hover:gap-2"
                      style={{ color: accent }}
                    >
                      Verify &#8599;
                    </span>
                  </div>
                </article>
              </Tilt>
            </motion.a>
          );
        })}
      </div>

      {/* Highlights rail — palette-driven cards with big outlined numerals */}
      <div className="gutter grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {momentHighlights.map((m, i) => {
          const numeral = m.title.match(/\d+\+?/)?.[0] ?? null;
          return (
            <motion.div
              key={m.title}
              className="relative flex min-h-[172px] flex-col overflow-hidden rounded-2xl p-5"
              style={{ background: `linear-gradient(150deg, ${m.palette.from}, ${m.palette.via} 55%, ${m.palette.to})` }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              {numeral && (
                <span
                  aria-hidden
                  className="text-outline pointer-events-none absolute -right-1 -top-4 select-none font-display text-[6.5rem] leading-none opacity-20"
                >
                  {numeral}
                </span>
              )}
              <div className="relative flex h-full flex-col">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em]" style={{ color: m.palette.accent }}>
                  {m.kicker}
                </p>
                <h4 className="mt-6 font-display text-3xl leading-[0.95] tracking-wide text-bone">{m.title}</h4>
                <p className="mt-3 font-sans text-[12px] leading-relaxed text-mist">{m.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
