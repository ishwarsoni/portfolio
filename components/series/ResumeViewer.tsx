"use client";

import { motion } from "framer-motion";
import {
  seriesProfile,
  aboutData,
  education,
  experience,
  projects,
  capabilities,
  certifications,
} from "@/data/series";
import { EASE, Magnetic, SectionHeading } from "./fx";

/** Trimmed, resume-length summary (first two sentences of the About intro). */
const summary = `${aboutData.intro.split(". ").slice(0, 2).join(". ")}.`;

/** Small ruled section label used throughout the sheet. */
function Rule({ children }: { children: string }) {
  return (
    <h4 className="mb-3 mt-7 border-b border-white/10 pb-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-2 first:mt-0">
      {children}
    </h4>
  );
}

export default function ResumeViewer({ onView }: { onView: () => void }) {
  return (
    <div>
      <SectionHeading kicker="The Full Story" title="Résumé" />
      <div className="gutter grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <motion.article
          className="relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#0c1118,#070a0f)] p-6 ring-1 ring-white/10 sm:p-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet/10 blur-3xl" />

          <header className="relative mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.34em] text-smoke">Starring</p>
              <h3 className="mt-1 font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[0.9] tracking-wide text-bone">
                {seriesProfile.firstName} {seriesProfile.lastName}
              </h3>
              <p className="mt-1 font-sans text-sm font-semibold tracking-wide text-cyan-2">{seriesProfile.role}</p>
            </div>
            <div className="font-sans text-xs leading-relaxed text-mist sm:text-right">
              <a href={`mailto:${seriesProfile.email}`} className="block transition hover:text-bone">
                {seriesProfile.email}
              </a>
              <p className="mt-0.5">{seriesProfile.location}</p>
              <p className="mt-0.5">
                <a href={seriesProfile.links.github} target="_blank" rel="noreferrer" className="transition hover:text-bone">
                  GitHub
                </a>
                <span className="text-smoke"> · </span>
                <a href={seriesProfile.links.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-bone">
                  LinkedIn
                </a>
              </p>
            </div>
          </header>

          <p className="relative font-sans text-sm leading-relaxed text-mist">{summary}</p>

          <div className="relative grid gap-x-10 md:grid-cols-[1.35fr_1fr]">
            <div>
              <Rule>Experience</Rule>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="font-sans text-sm font-semibold text-bone">
                  {experience.company} — {experience.role}
                </p>
                <p className="font-mono text-[11px] text-smoke">{experience.period}</p>
              </div>
              <p className="mt-0.5 font-mono text-[11px] text-smoke">{experience.location}</p>
              <ul className="mt-2.5 space-y-1.5">
                {experience.achievements.slice(0, 4).map((a) => (
                  <li key={a} className="flex gap-2 font-sans text-xs leading-relaxed text-mist">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                    {a}
                  </li>
                ))}
              </ul>

              <Rule>Selected Projects</Rule>
              <div className="space-y-4">
                {projects.map((p) => (
                  <div key={p.slug}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <p className="font-sans text-sm font-semibold text-bone">{p.title}</p>
                      <p className="font-mono text-[11px] text-smoke">{p.category}</p>
                    </div>
                    <p className="mt-0.5 font-sans text-xs leading-relaxed text-mist">{p.subtitle}</p>
                    <p className="mt-1 font-mono text-[11px] text-cyan-2/80">{p.stack.slice(0, 4).join(" · ")}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Rule>Skills</Rule>
              <div className="space-y-3">
                {capabilities.map((c) => (
                  <div key={c.title}>
                    <p className="font-sans text-[11px] font-semibold text-bone">{c.title}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {c.tags.slice(0, 7).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-mist"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Rule>Education</Rule>
              <p className="font-sans text-sm font-semibold text-bone">{education.institution}</p>
              <p className="mt-0.5 font-sans text-xs text-mist">
                {education.degree} · {education.field}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-smoke">
                {education.period}
                {education.location ? ` · ${education.location}` : ""}
              </p>

              <Rule>Certifications</Rule>
              <ul className="space-y-2.5">
                {certifications.map((c) => (
                  <li key={c.title}>
                    <p className="font-sans text-xs font-semibold leading-snug text-bone">{c.title}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-smoke">
                      {c.issuer} · {c.date}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.article>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-display text-3xl leading-none text-bone">Every episode, on one page.</p>
          <p className="mt-3 font-sans text-sm leading-relaxed text-mist">
            The internship, the three Originals, skills and {certifications.length} certifications — read it inline or take a copy with you.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Magnetic className="w-full">
              <button
                type="button"
                data-cursor="play"
                onClick={onView}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-bone px-6 font-sans text-sm font-bold tracking-wide text-ink shadow-[0_0_50px_rgba(56,207,232,0.35)] transition hover:bg-white"
              >
                View full PDF
              </button>
            </Magnetic>
            <Magnetic className="w-full">
              <a
                href={seriesProfile.resumePdf}
                download
                data-cursor="link"
                className="series-glass flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 font-sans text-sm font-semibold tracking-wide text-bone transition hover:border-cyan/70 hover:text-cyan-2"
              >
                Download PDF
              </a>
            </Magnetic>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10 text-center">
            {[
              { v: String(projects.length), k: "Originals" },
              { v: String(capabilities.length), k: "Skill sets" },
              { v: String(certifications.length), k: "Certs" },
            ].map((s) => (
              <div key={s.k} className="bg-ink-2 px-2 py-4">
                <dd className="font-display text-3xl leading-none text-bone">{s.v}</dd>
                <dt className="mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">{s.k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
