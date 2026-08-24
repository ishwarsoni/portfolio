"use client";

import { capabilities } from "@/data/capabilities";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="py-12 md:py-32 scroll-mt-20 md:scroll-mt-24"
      aria-labelledby="capabilities-heading"
    >
      <Container size="standard">
        <header className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <Typography variant="eyebrow" className="mb-4">
            Skills & Capabilities
          </Typography>
          <Typography variant="h1" className="mb-4 uppercase tracking-[0.05em]" id="capabilities-heading">
            Technical Skills & Domains
          </Typography>
          <Typography variant="body-lg" className="text-ash">
            Organized by outcome, not language. Each domain represents a class of problems I solve.
          </Typography>
          <Divider variant="gold" className="mx-auto mt-6 md:mt-8 max-w-xs" />
        </header>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          role="list"
          aria-label="Skill categories"
        >
          {capabilities.map((category) => (
            <article
              key={category.title}
              className="card-base capability-card group p-6 border border-[#1A1A20] hover:border-[#C6A15B]/50 transition-all duration-300 bg-[#0B0C0E]"
              role="listitem"
            >
              <Typography variant="h3" className="mb-4 group-hover:text-antique-gold transition-colors duration-300 text-[#E8E1D2]">
                {category.title}
              </Typography>
              <Divider variant="bronze" className="mb-4 group-hover:w-full transition-all duration-300" style={{ width: "40%" }} />
              <ul className="space-y-2" role="list">
                {category.tags.map((tag, i) => (
                  <li key={i} className="tech-tag group-hover:text-ivory group-hover:border-burnished-bronze/40 transition-all duration-200">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Capabilities;