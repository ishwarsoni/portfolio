"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/series";
import { EASE, SectionHeading, Tilt } from "./fx";

// Factual highlights drawn from the project metrics in data/projects.ts
const laurels = [
  { value: "0", label: "target-corruption failures across 50 validated datasets" },
  { value: "12+", label: "clinical fields extracted & schema-validated in OncoLink" },
  { value: "21", label: "body joints reconstructed BVH → SMPL-H" },
  { value: "10", label: "defensive stages in the Datacleanr pipeline" },
];

export default function Moments() {
  return (
    <div>
      <SectionHeading kicker="Moments" title="Certifications" />

      <div className="gutter mb-10 grid gap-4 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <motion.a
            key={c.title}
            href={c.verifyUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
          >
            <Tilt className="series-glass flex h-full flex-col justify-between gap-6 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-2">{c.issuer}</span>
                <span className="rounded-full border border-white/12 px-2 py-0.5 font-sans text-[10px] text-bone/60">{c.type}</span>
              </div>
              <h4 className="font-display text-2xl leading-tight text-bone">{c.title}</h4>
              {c.description && <p className="font-sans text-xs leading-relaxed text-mist">{c.description}</p>}
              <div className="flex items-center justify-between font-sans text-[11px] text-smoke">
                <span>{c.date}</span>
                <span className="text-cyan-2">Verify ↗</span>
              </div>
            </Tilt>
          </motion.a>
        ))}
      </div>

      <div className="gutter grid grid-cols-2 gap-4 lg:grid-cols-4">
        {laurels.map((l, i) => (
          <motion.div
            key={l.label}
            className="rounded-xl border border-white/8 bg-ink-2 p-5 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
          >
            <div className="font-display text-5xl text-cyan">{l.value}</div>
            <p className="mt-2 font-sans text-[11px] leading-snug text-mist">{l.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
