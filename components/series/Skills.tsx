"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { skillCategories, skillEvidence, type Skill, type SkillCategory } from "@/data/series";
import { EASE, SectionHeading, Tilt } from "./fx";
import { useFinePointer, useReducedMotionPref } from "./hooks/useMedia";

export default function Skills() {
  return (
    <div>
      <SectionHeading
        kicker="The Stack"
        title="My Skills"
        aside={
          <p className="max-w-[22rem] font-sans text-sm leading-relaxed text-mist">
            A periodic table of the tools I build with. Hover or tap any element to trace where it shows up across the work.
          </p>
        }
      />
      <div className="gutter grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <CategoryBlock key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </div>
  );
}

function CategoryBlock({ category, index }: { category: SkillCategory; index: number }) {
  const reduced = useReducedMotionPref();
  const fine = useFinePointer();
  const [active, setActive] = useState<string | null>(null);
  const readoutId = useId();
  const accent = category.palette.accent;
  const activeEvidence = active ? skillEvidence[active] : undefined;

  const tileVariants: Variants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 12, scale: 0.92 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
      };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
      className="relative"
    >
      <Tilt max={5} className="series-glass relative flex h-full flex-col overflow-hidden rounded-2xl p-4 sm:p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{ background: `radial-gradient(130% 100% at 12% -10%, ${category.palette.via}44, transparent 58%)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />

        <div className="mb-4 flex items-start gap-3">
          <span aria-hidden className="mt-1 h-9 w-1 shrink-0 rounded-full" style={{ background: accent, boxShadow: `0 0 18px ${accent}aa` }} />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-2xl leading-none tracking-wide text-bone sm:text-[1.7rem]">{category.title}</h3>
            <p className="mt-1 font-sans text-xs text-smoke">{category.subtitle}</p>
          </div>
          <span className="font-mono text-[10px] tabular-nums" style={{ color: accent }}>
            {String(category.skills.length).padStart(2, "0")}
          </span>
        </div>

        <motion.div
          className="grid grid-cols-4 gap-2"
          variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.04 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
        >
          {category.skills.map((s) => (
            <SkillTile
              key={s.name}
              skill={s}
              accent={accent}
              fine={fine}
              variants={tileVariants}
              active={active === s.name}
              describedById={skillEvidence[s.name]?.length ? readoutId : undefined}
              onActivate={() => setActive(s.name)}
              onDeactivate={() => setActive((cur) => (cur === s.name ? null : cur))}
              onToggle={() => setActive((cur) => (cur === s.name ? null : s.name))}
            />
          ))}
        </motion.div>

        <div id={readoutId} className="mt-4 min-h-[2.5rem] border-t border-white/10 pt-3">
          <AnimatePresence mode="wait" initial={false}>
            {active && activeEvidence?.length ? (
              <motion.p
                key={active}
                initial={reduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-snug text-mist"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: accent }}>
                  Where it&apos;s used
                </span>
                <span className="text-bone/90">{activeEvidence.join(" · ")}</span>
              </motion.p>
            ) : (
              <motion.p
                key="idle"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="font-sans text-xs text-smoke"
              >
                {fine ? "Hover a tile to trace it across the work." : "Tap a tile to trace it across the work."}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </Tilt>
    </motion.div>
  );
}

function SkillTile({
  skill,
  accent,
  fine,
  variants,
  active,
  describedById,
  onActivate,
  onDeactivate,
  onToggle,
}: {
  skill: Skill;
  accent: string;
  fine: boolean;
  variants: Variants;
  active: boolean;
  describedById?: string;
  onActivate: () => void;
  onDeactivate: () => void;
  onToggle: () => void;
}) {
  return (
    <motion.div variants={variants} className="relative h-full">
      <button
        type="button"
        aria-describedby={active && describedById ? describedById : undefined}
        onMouseEnter={() => {
          if (fine) onActivate();
        }}
        onMouseLeave={() => {
          if (fine) onDeactivate();
        }}
        onFocus={onActivate}
        onBlur={onDeactivate}
        onClick={() => {
          if (!fine) onToggle();
        }}
        className="series-focus group relative flex h-full min-h-[4.75rem] w-full flex-col items-center justify-center gap-1 rounded-xl border p-1.5 text-center transition-colors duration-300"
        style={{
          borderColor: active ? accent : `${accent}2e`,
          background: active ? `${accent}1a` : "rgba(255,255,255,0.025)",
          boxShadow: active ? `inset 0 0 0 1px ${accent}, 0 12px 30px -14px ${accent}` : undefined,
        }}
      >
        <span aria-hidden className="font-display text-[1.6rem] leading-none tracking-wide sm:text-3xl" style={{ color: accent }}>
          {skill.mono}
        </span>
        <span className="font-sans text-[9px] leading-tight text-mist sm:text-[10px]">{skill.name}</span>
        {skill.note && (
          <span
            className="absolute right-1 top-1 rounded-[3px] px-1 py-px text-[7px] font-bold uppercase leading-none tracking-wide text-ink"
            style={{ background: accent }}
          >
            {skill.note}
          </span>
        )}
      </button>
    </motion.div>
  );
}
