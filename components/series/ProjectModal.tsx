"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { projects, projectMeta, palettes } from "@/data/series";
import type { Project } from "@/data/projects";
import { useSmoothScroll } from "./hooks/smoothScroll";
import { EASE } from "./fx";

export default function ProjectModal({ project, onClose, onSwitch }: { project: Project; onClose: () => void; onSwitch: (p: Project) => void }) {
  const { lock, unlock } = useSmoothScroll();
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

  return (
    <motion.div
      className="fixed inset-0 z-[160] overflow-y-auto"
      style={{ background: `linear-gradient(165deg, ${p.from}, ${p.to} 60%, #06070b)` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      role="dialog"
      aria-label={project.title}
    >
      <div className="gutter sticky top-0 z-20 flex h-16 items-center justify-between backdrop-blur-md" style={{ background: `${p.to}cc` }}>
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: p.accent }}>
          {project.category}
        </span>
        <button
          type="button"
          onClick={onClose}
          data-cursor="link"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-bone transition hover:border-white/60"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* PROJECT-MODAL-BODY */}
      <div className="gutter mx-auto max-w-5xl pb-28 pt-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}>
          <h2 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.85] text-bone">{project.title}</h2>
          <p className="mt-3 max-w-2xl font-serif text-xl text-bone/80 sm:text-2xl">{project.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-sans text-xs tracking-wide text-bone/60">
            <span>{project.role}</span>
            <span>{project.period}</span>
          </div>
        </motion.div>

        {/* metrics */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="font-display text-3xl" style={{ color: p.accent }}>
                {m.value}
              </div>
              <div className="mt-1 font-sans text-[11px] uppercase tracking-wide text-bone/60">{m.label}</div>
              <div className="mt-1 font-sans text-[11px] leading-snug text-bone/45">{m.context}</div>
            </div>
          ))}
        </div>

        {/* challenge + strategy */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
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
        </div>

        {/* process */}
        <h3 className="mb-5 mt-14 font-display text-3xl text-bone">The Process</h3>
        <div className="flex flex-col gap-3">
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
        </div>

        {/* decisions */}
        <h3 className="mb-5 mt-14 font-display text-3xl text-bone">Key Decisions</h3>
        <div className="grid gap-3 sm:grid-cols-2">
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
        </div>

        {/* stack + links */}
        <h3 className="mb-4 mt-14 font-display text-3xl text-bone">The Stack</h3>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-white/14 px-3 py-1 font-sans text-xs text-bone/80">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" data-cursor="link" className="rounded-full bg-bone px-6 py-3 font-sans text-sm font-bold tracking-wide text-ink transition hover:bg-white">
              VIEW CODE ↗
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noreferrer" data-cursor="link" className="rounded-full border border-white/20 px-6 py-3 font-sans text-sm font-semibold tracking-wide text-bone transition hover:border-white/60">
              LIVE DEMO ↗
            </a>
          )}
          <button type="button" onClick={() => onSwitch(next)} data-cursor="link" className="ml-auto font-sans text-xs uppercase tracking-[0.2em] text-bone/60 transition hover:text-bone">
            Next original: {next.title} →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
