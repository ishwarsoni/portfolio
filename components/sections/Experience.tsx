"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { experiences } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { SemanticLabsDiagram } from "@/components/diagrams";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

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

      const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".experience-card");
      if (cards && cards.length > 0) {
        gsap.from(Array.from(cards), {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="experience"
      className="py-16 md:py-32 scroll-mt-20 md:scroll-mt-24"
      aria-labelledby="experience-heading"
    >
      <Container size="wide">
        <header className="text-center max-w-3xl mx-auto mb-10 md:mb-16 section-header">
          <Typography variant="h1" className="mb-4" id="experience-heading">
            Experience
          </Typography>
          <Typography variant="body-lg" className="text-ash">
            AI Engineering · Applied AI · Computer Vision
          </Typography>
          <Divider variant="gold" className="mx-auto mt-6 md:mt-8 max-w-xs" />
        </header>

        <div className="space-y-8" ref={cardsRef}>
          {experiences.map((item) => (
            <div key={`${item.company}-${item.role}`} className="space-y-8">
              {/* Experience Card */}
              <Card className="experience-card group w-full motion-safe:hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-32px_rgba(198,161,91,0.45)]">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <Typography variant="h3" className="mb-2">
                        {item.role}
                      </Typography>
                      <Typography variant="body" className="text-ash">
                        {item.company}
                        <span className="text-ash-dim"> · {item.employmentType}</span>
                      </Typography>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                      <span className="inline-flex items-center rounded-sm border border-burnished-bronze/30 bg-burnished-bronze/5 px-2.5 py-1 font-mono text-[11px] tracking-[0.12em] text-antique-gold">
                        {item.period}
                      </span>
                      <Typography variant="micro" className="text-ash-dim sm:text-right">
                        {item.location}
                      </Typography>
                    </div>
                  </div>

                  <Divider variant="bronze" />

                  <Typography variant="body" className="text-ash-dim leading-relaxed">
                    {item.description}
                  </Typography>

                  <ul className="space-y-3 pt-2">
                    {item.achievements.map((achievement, i) => (
                      <li
                        key={`${item.company}-${i}`}
                        className="flex items-start gap-3 text-sm text-ash font-sans leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-burnished-bronze transition-colors duration-300 group-hover:bg-antique-gold"
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <Divider variant="bronze" />

                  <div className="flex flex-wrap gap-2">
                    {item.domain.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Full-width Motion Processing Diagram — Semantic Labs only */}
              {item.company === "Semantic Labs" && (
                <div className="w-full overflow-hidden rounded-lg border border-charcoal bg-obsidian/80 p-2 md:p-4">
                  <SemanticLabsDiagram className="w-full h-auto" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Button asChild>
            <Link href="/work/motion-processing" className="btn-primary px-6 py-3 text-sm tracking-[0.2em] uppercase">
              VIEW TECHNICAL CASE STUDY
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Experience;
