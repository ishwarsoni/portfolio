"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { experience } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { SemanticLabsDiagram } from "@/components/diagrams";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<any>(null);
  const cardRef = useRef<any>(null);

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

      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
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
          <Typography variant="eyebrow" className="mb-4">
            Technical Experience
          </Typography>
          <Typography variant="h1" className="mb-4 uppercase tracking-[0.05em]" id="experience-heading">
            Semantic Labs
          </Typography>
          <Typography variant="body-lg" className="text-ash">
            Computer Vision / Motion Processing Intern — Remote
          </Typography>
          <Divider variant="gold" className="mx-auto mt-6 md:mt-8 max-w-xs" />
        </header>

        <div className="space-y-8" ref={cardRef}>
          {/* Main Experience Overview Card */}
          <Card className="w-full">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <Typography variant="h3" className="mb-2">
                    {experience.role}
                  </Typography>
                  <Typography variant="body" className="text-ash">
                    {experience.company} · {experience.period} · {experience.location}
                  </Typography>
                </div>
              </div>

              <Divider variant="bronze" />

              <Typography variant="body" className="text-ash-dim leading-relaxed">
                {experience.description}
              </Typography>

              <div className="space-y-3 pt-2">
                {experience.achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm text-ash font-sans leading-relaxed"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-burnished-bronze shrink-0" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>

              <Divider variant="bronze" />

              <div className="flex flex-wrap gap-2">
                {experience.domain.map((tag, i) => (
                  <Badge key={i} variant="default">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Full-width Motion Processing Diagram */}
          <div className="w-full overflow-hidden rounded-lg border border-[#1A1A20] bg-[#0B0C0E]/80 p-2 md:p-4">
            <SemanticLabsDiagram className="w-full h-auto" />
          </div>
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Button asChild>
            <a href="/work/motion-processing" className="btn-primary px-6 py-3 text-sm tracking-[0.2em] uppercase">
              VIEW TECHNICAL CASE STUDY
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Experience;