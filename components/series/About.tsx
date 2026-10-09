"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/data/series";
import { EASE, SectionHeading } from "./fx";

export default function About() {
  return (
    <div>
      <SectionHeading kicker="The Pilot" title="About Me" />
      <div className="gutter grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.p
            className="font-serif text-xl leading-relaxed text-bone/90 sm:text-2xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {aboutData.intro}
          </motion.p>

          <motion.blockquote
            className="mt-8 border-l-2 border-cyan/50 pl-5 font-sans text-base italic leading-relaxed text-mist"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            {aboutData.quote}
          </motion.blockquote>
        </div>

        <div>
          <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-2">Operating principles</p>
          <ul className="flex flex-col gap-3">
            {aboutData.principles.map((p, i) => (
              <motion.li
                key={i}
                className="series-glass flex gap-3 rounded-lg px-4 py-3 font-sans text-sm leading-snug text-bone/85"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              >
                <span className="font-display text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
