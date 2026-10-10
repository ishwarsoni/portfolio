"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { projects, projectMeta, palettes } from "@/data/series";
import type { Project } from "@/data/projects";
import { useSmoothScroll } from "./hooks/smoothScroll";
import { EASE } from "./fx";
import { Motif } from "./ProjectCard";

const block = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};

export default function ProjectModal({ project, onClose, onSwitch }: { project: Project; onClose: () => void; onSwitch: (p: Project) => void }) {
  const { lock, unlock } = useSmoothScroll();
  const scroller = useRef<HTMLDivElement>(null);
  const meta = projectMeta[project.slug] ?? { palette: palettes.cyan, motif: "grid" as const };
  const p = meta.palette;

  const idx = projects.findIndex((x) => x.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

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

  // Reset scroll to the top when switching to the next original.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [project.slug]);

  return (
    <motion.div className="fixed inset-0 z-[160]" role="dialog" aria-modal="true" aria-label={project.title}>
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `linear-gradient(165deg, ${p.from}, ${p.to} 58%, #06070b)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />

      <div ref={scroller} data-lenis-prevent className="absolute inset-0 overflow-y-auto overscroll-contain">
        {/* HERO — morphs out of the clicked poster card */}
        <div className="relative h-[56vh] min-h-[360px] w-full overflow-hidden">
          <motion.div layoutId={`original-${project.slug}`} className="absolute inset-0 overflow-hidden">
            <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(158deg, ${p.from}, ${p.via}, ${p.to})` }} />
            <div aria-hidden className="absolute inset-0 opacity-55">
              <Motif motif={meta.motif} accent={p.accent} />
            </div>
            <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(to top, ${p.to} 4%, transparent 72%)` }} />
          </motion.div>

          <button
            type="button"
            onClick={onClose}
            data-cursor="link"
            aria-label="Close"
            className="series-focus absolute right-[max(1rem,4vw)] top-[max(1rem,env(safe-area-inset-top))] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-bone backdrop-blur transition hover:border-white/70 hover:bg-black/60"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </button>

          <div className="gutter absolute inset-x-0 bottom-0 z-10 mx-auto max-w-5xl pb-8">
            <motion.span
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: p.accent }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {project.category}
            </motion.span>
            <motion.h2
              layoutId={`original-title-${project.slug}`}
              className="mt-2 font-display text-[clamp(3rem,9vw,7rem)] leading-[0.85] tracking-wide text-bone"
            >
              {project.title}
            </motion.h2>
          </div>
        </div>

        {/* PROJECT-MODAL-BODY */}
        <motion.div
          className="gutter relative z-10 mx-auto max-w-5xl pb-28 pt-8"
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: 24, transition: { duration: 0.25 } }}
          transition={{ staggerChildren: 0.07, delayChildren: 0.15 }}
        >
          <motion.div variants={block}>
            <p className="max-w-2xl font-serif text-xl text-bone/80 sm:text-2xl">{project.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-sans text-xs tracking-wide text-bone/60">
              <span>{project.role}</span>
              <span>{project.period}</span>
            </div>
          </motion.div>

          {/* metrics */}
          <motion.div variants={block} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="font-display text-3xl" style={{ color: p.accent }}>
                  {m.value}
                </div>
                <div className="mt-1 font-sans text-[11px] uppercase tracking-wide text-bone/60">{m.label}</div>
                <div className="mt-1 font-sans text-[11px] leading-snug text-bone/45">{m.context}</div>
              </div>
            ))}
          </motion.div>

          {/* challenge + strategy */}
          <motion.div variants={block} className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: p.accent }}>
                The Challenge
              </h3>
              <p className="font-sans text-sm leading-relaxed text-bone/80">{project.challenge}</p>
            </div>
            <div>
              <h3 className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: p.accent }}>
                The Strategy
              </h3>
              <p className="font-sans text-sm leading-relaxed text-bone/80">{project.strategy}</p>
            </div>
          </motion.div>

          {/* process */}
          <motion.h3 variants={block} className="mb-5 mt-14 font-display text-3xl text-bone">
            The Process
          </motion.h3>
          <motion.div variants={block} className="flex flex-col gap-3">
            {project.process.map((step) => (
              <div key={step.step} className="flex gap-4 rounded-xl border border-white/8 bg-black/15 p-5">
                <span className="font-display text-3xl leading-none" style={{ color: p.accent }}>
                  {String(step.step).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-bone">{step.title}</h4>
                  <p className="mt-1 font-sans text-xs leading-relaxed text-bone/65">{step.detail}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* decisions */}
          <motion.h3 variants={block} className="mb-5 mt-14 font-display text-3xl text-bone">
            Key Decisions
          </motion.h3>
          <motion.div variants={block} className="grid gap-3 sm:grid-cols-2">
            {project.decisions.map((d) => (
              <div key={d.decision} className="rounded-xl border border-white/8 bg-black/15 p-5">
                <h4 className="font-sans text-sm font-semibold text-bone">{d.decision}</h4>
                <p className="mt-2 font-sans text-xs leading-relaxed text-bone/60">{d.context}</p>
                <p className="mt-3 font-sans text-xs text-bone/80">
                  <span style={{ color: p.accent }}>Chosen:</span> {d.chosen}
                </p>
                <p className="mt-1 font-sans text-xs leading-relaxed text-bone/55">{d.rationale}</p>
              </div>
            ))}
          </motion.div>

          {/* stack */}
          <motion.h3 variants={block} className="mb-4 mt-14 font-display text-3xl text-bone">
            The Stack
          </motion.h3>
          <motion.div variants={block} className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full border border-white/14 px-3 py-1 font-sans text-xs text-bone/80">
                {s}
              </span>
            ))}
          </motion.div>

          {/* links + next */}
          <motion.div variants={block} className="mt-10 flex flex-wrap items-center gap-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="rounded-full bg-bone px-6 py-3 font-sans text-sm font-bold tracking-wide text-ink transition hover:bg-white"
              >
                VIEW CODE ↗
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="rounded-full border border-white/20 px-6 py-3 font-sans text-sm font-semibold tracking-wide text-bone transition hover:border-white/60"
              >
                LIVE DEMO ↗
              </a>
            )}
            <button
              type="button"
              onClick={() => onSwitch(next)}
              data-cursor="link"
              className="ml-auto font-sans text-xs uppercase tracking-[0.2em] text-bone/60 transition hover:text-bone"
            >
              Next original: {next.title} →
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
