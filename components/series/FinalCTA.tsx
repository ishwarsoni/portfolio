"use client";

import { motion } from "framer-motion";
import { seriesProfile } from "@/data/series";
import { EASE, Magnetic } from "./fx";

export default function FinalCTA({ onReplay }: { onReplay: () => void }) {
  const links = [
    { label: "Email", href: `mailto:${seriesProfile.email}` },
    { label: "GitHub", href: seriesProfile.links.github },
    { label: "LinkedIn", href: seriesProfile.links.linkedin },
  ];

  return (
    <footer className="relative overflow-hidden py-28 text-center sm:py-36">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_50%,rgba(56,207,232,0.12),transparent_70%)]" />
      <div className="gutter relative">
        <motion.p
          className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.4em] text-cyan-2"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          To be continued…
        </motion.p>
        <motion.h2
          className="mx-auto max-w-4xl font-display text-[clamp(2.6rem,8vw,6rem)] leading-[0.9] text-bone"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Let&apos;s build the next episode.
        </motion.h2>

        <motion.a
          href={`mailto:${seriesProfile.email}`}
          data-cursor="link"
          className="mt-6 inline-block font-serif text-xl text-bone underline-offset-8 transition hover:text-cyan-2 hover:underline sm:text-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {seriesProfile.email}
        </motion.a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {links.map((l) => (
            <Magnetic key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                data-cursor="link"
                className="rounded-full border border-white/20 px-6 py-3 font-sans text-sm font-semibold tracking-wide text-bone transition hover:border-cyan/70 hover:text-cyan-2"
              >
                {l.label}
              </a>
            </Magnetic>
          ))}
        </div>

        <button
          type="button"
          onClick={onReplay}
          data-cursor="link"
          className="mt-12 font-sans text-[11px] uppercase tracking-[0.3em] text-smoke transition hover:text-bone"
        >
          ↺ Replay from the opening
        </button>

        <p className="mt-10 font-sans text-[11px] text-smoke">
          {seriesProfile.firstName} {seriesProfile.lastName} — {seriesProfile.location}
        </p>
      </div>
    </footer>
  );
}
