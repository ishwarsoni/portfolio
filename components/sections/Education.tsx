"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import { Card, CardContent } from "@/components/ui/Card";

gsap.registerPlugin(ScrollTrigger);

export function Education() {
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
            start: "top 85%",
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
      id="education"
      className="py-16 md:py-32 scroll-mt-20 md:scroll-mt-24"
      aria-labelledby="education-heading"
    >
      <Container size="narrow">
        <header className="text-center max-w-3xl mx-auto mb-10 md:mb-16 section-header">
          <Typography variant="eyebrow" className="mb-4">
            Education
          </Typography>
          <Typography variant="h1" className="mb-4 uppercase tracking-[0.05em]" id="education-heading">
            Academic Background
          </Typography>
          <Divider variant="gold" className="mx-auto mt-6 md:mt-8 max-w-xs" />
        </header>

        <Card ref={cardRef} className="max-w-xl mx-auto">
          <CardContent className="p-8 text-center space-y-4">
            <Typography variant="h3" className="text-ivory">
              {education.institution}
            </Typography>
            
            <Divider variant="bronze" className="mx-auto" />
            
            <Typography variant="body-lg" className="text-ivory-dim">
              {education.degree} in {education.field}
            </Typography>
            
            <Typography variant="body" className="text-ash">
              {education.period} · {education.location}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}