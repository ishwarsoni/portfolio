"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { projectMeta, palettes } from "@/data/series";
import { EASE } from "./fx";

function Motif({ motif, accent }: { motif: "neural" | "flow" | "grid"; accent: string }) {
  if (motif === "neural") {
    return (
      <svg aria-hidden viewBox="0 0 200 200" className="h-full w-full">
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
      <svg aria-hidden viewBox="0 0 200 200" className="h-full w-full">
        {[40, 80, 120, 160].map((y, i) => (
          <path key={i} d={`M0 ${y} C 60 ${y - 30}, 140 ${y + 30}, 200 ${y}`} fill="none" stroke={accent} strokeWidth={1} opacity={0.3 - i * 0.03} />
        ))}
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 200 200" className="h-full w-full">
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

  return (
    <motion.button
      type="button"
      data-cursor="link"
      onClick={onOpen}
      className="group relative flex aspect-[3/4] w-[78vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl border border-white/8 text-left sm:w-[46vw] lg:aspect-auto lg:h-[66vh] lg:w-[30vw]"
      style={{ background: `linear-gradient(160deg, ${p.from}, ${p.via}, ${p.to})` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
    >
      <div aria-hidden className="absolute inset-0 opacity-60">
        <Motif motif={meta.motif} accent={p.accent} />
      </div>
      <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(to top, ${p.to} 8%, transparent 70%)` }} />

      <div className="relative z-10 p-6">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: p.accent }}>
          {project.category}
        </span>
        <h3 className="mt-2 font-display text-4xl leading-none text-bone">{project.title}</h3>
        <p className="mt-2 font-sans text-sm leading-snug text-bone/75">{project.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="rounded-full border border-white/14 px-2 py-0.5 font-sans text-[10px] text-bone/70">
              {s}
            </span>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.2em] text-bone transition group-hover:gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: p.accent, color: "#06070b" }}>
            ▶
          </span>
          OPEN TITLE
        </span>
      </div>
    </motion.button>
  );
}
