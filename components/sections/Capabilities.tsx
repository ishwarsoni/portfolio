"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities } from "@/data/capabilities";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import { Card, CardContent } from "@/components/ui/Card";

gsap.registerPlugin(ScrollTrigger);

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerEl = sectionRef.current?.querySelector(".section-header");
      if (headerEl) {
        gsap.from(headerEl, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const cards = sectionRef.current?.querySelectorAll(".capability-card");
      if (cards && cards.length > 0) {
        gsap.from(Array.from(cards), {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="py-20 md:py-32"
      aria-labelledby="capabilities-heading"
    >
      <Container size="standard">
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16 section-header">
          <Typography variant="eyebrow" className="mb-4">
            Capabilities
          </Typography>
          <Typography variant="h1" className="mb-4 uppercase tracking-[0.05em]">
            Systems & Domains
          </Typography>
          <Typography variant="body-lg" className="text-ash">
            Organized by outcome, not language. Each domain represents a class of problems I solve.
          </Typography>
          <Divider variant="gold" className="mx-auto mt-8 max-w-xs" />
        </header>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Capability domains"
        >
          {capabilities.map((category, index) => (
            <article
              key={category.title}
              className="card-base capability-card group p-6"
              role="listitem"
            >
              <Typography variant="h3" className="mb-4 group-hover:text-antique-gold transition-colors duration-300">
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