"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { homeProjects } from "@/data/projects";
import { OncoLinkDiagram, DatacleanrDiagram } from "@/components/diagrams";
import { ProjectCard } from "@/components/sections/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export function SelectedWork() {
  const sectionRef = useRef<any>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-20 md:py-32"
      aria-labelledby="work-heading"
    >
      <Container size="wide">
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16 section-header">
          <Typography variant="eyebrow" className="mb-4">
            Selected Work
          </Typography>
          <Typography variant="h1" className="mb-4 uppercase tracking-[0.05em]">
            Artifacts
          </Typography>
          <Typography variant="body-lg" className="text-ash">
            Production systems engineered for motion processing, computer vision, and applied AI.
          </Typography>
          <Divider variant="gold" className="mx-auto mt-8 max-w-xs" />
        </header>

        <div className="space-y-8 md:space-y-12">
          {homeProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              Diagram={
                project.slug === "oncolink"
                  ? OncoLinkDiagram
                  : DatacleanrDiagram
              }
            />
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Button asChild variant="ghost">
            <a href="/work/motion-processing" className="btn-ghost px-6 py-3 text-sm tracking-[0.2em] uppercase font-mono">
              Motion Processing Case Study →
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}