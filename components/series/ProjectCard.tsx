"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { projectMeta, palettes } from "@/data/series";
import { EASE } from "./fx";
import { useFinePointer } from "./hooks/useMedia";

/** Per-motif key-art pattern, tinted with the palette accent. Shared by the card and the modal hero so the layout morph stays seamless. */
export function Motif({ motif, accent }: { motif: "neural" | "flow" | "grid"; accent: string }) {
  if (motif === "neural") {
    return (
      <svg aria-hidden viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        {[30, 100, 170].map((x, c) =>
          [50, 100, 150].map((y, r) => <circle key={`${c}-${r}`} cx={x} cy={y} r={4} fill={accent} opacity={0.5} />),
        )}
        {[50, 100, 150].map((y1) =>
          [50, 100, 150].map((y2) => <line key={`${y1}-${y2}`} x1={30} y1={y1} x2={100} y2={y2} stroke={accent} strokeWidth={0.5} opacity={0.2} />),
        )}
        {[50, 100, 150].map((y1) =>
          [50, 100, 150].map((y2) => <line key={`b${y1}-${y2}`} x1={100} y1={y1} x2={170} y2={y2} stroke={accent} strokeWidth={0.5} opacity={0.2} />),
        )}
      </svg>
    );
  }
  if (motif === "flow") {
    return (
      <svg aria-hidden viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        {[40, 80, 120, 160].map((y, i) => (
          <path key={i} d={`M0 ${y} C 60 ${y - 30}, 140 ${y + 30}, 200 ${y}`} fill="none" stroke={accent} strokeWidth={1} opacity={0.3 - i * 0.03} />
        ))}
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 25} y1={0} x2={i * 25} y2={200} stroke={accent} strokeWidth={0.5} opacity={0.18} />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 25} x2={200} y2={i * 25} stroke={accent} strokeWidth={0.5} opacity={0.18} />
      ))}
    </svg>
  );
}

export default function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const meta = projectMeta[project.slug] ?? { palette: palettes.cyan, motif: "grid" as const };
  const p = meta.palette;
  const fine = useFinePointer();

  return (
    <motion.div
      className="relative aspect-[3/4] w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:aspect-auto lg:h-[66vh] lg:w-[30vw]"
      initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px -8% 0px 0px" }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: EASE }}
    >
      <button
        type="button"
        data-cursor="link"
        onClick={onOpen}
        aria-label={`Open ${project.title}`}
        className="group series-focus relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[1.4rem] border border-white/10 text-left"
      >
        {/* Shared key-art panel — morphs into the modal hero via layoutId. */}
        <motion.div layoutId={`original-${project.slug}`} className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(158deg, ${p.from}, ${p.via}, ${p.to})` }} />
          <div
            aria-hidden
            className={`absolute inset-0 opacity-60 transition-transform duration-[1.4s] ease-out ${fine ? "group-hover:scale-[1.08]" : ""}`}
          >
            <Motif motif={meta.motif} accent={p.accent} />
          </div>
          <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(to top, ${p.to} 6%, transparent 68%)` }} />
          <div aria-hidden className="absolute inset-x-0 top-0 h-24" style={{ background: `linear-gradient(to bottom, ${p.from}cc, transparent)` }} />
        </motion.div>

        {/* Key-art eyebrow + period */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-6">
          <span className="flex items-center gap-2">
            <span className="font-display text-lg leading-none" style={{ color: p.accent }}>
              IS
            </span>
            <span className="font-sans text-[10px] font-bold tracking-[0.34em] text-bone/80">ORIGINAL</span>
          </span>
          <span className="rounded border border-white/25 px-1.5 py-px font-mono text-[10px] font-semibold tracking-wide text-bone/85">{project.period}</span>
        </div>

        {/* Title block */}
        <div className="relative z-10 p-6">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: p.accent }}>
            {project.category}
          </span>
          <motion.h3 layoutId={`original-title-${project.slug}`} className="mt-2 font-display text-[clamp(2.3rem,4vw,3.2rem)] leading-[0.9] tracking-wide text-bone">
            {project.title}
          </motion.h3>
          <p className="mt-2 max-w-sm font-sans text-sm leading-snug text-bone/75">{project.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <span key={s} className="rounded-full border border-white/14 bg-black/25 px-2 py-0.5 font-sans text-[10px] text-bone/75 backdrop-blur-sm">
                {s}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.2em] text-bone transition-all duration-300 group-hover:gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: p.accent, color: "#06070b" }}>
              <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
            OPEN TITLE
          </span>
        </div>
      </button>
    </motion.div>
  );
}
