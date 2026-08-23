"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { homeProjects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { OncoLinkDiagram, DatacleanrDiagram } from "@/components/diagrams";

gsap.registerPlugin(ScrollTrigger);

interface ProjectShowcaseProps {
  project: typeof homeProjects[0];
  index: number;
  diagram: React.ComponentType<{ className?: string }>;
}

function ProjectShowcase({ project, index, diagram: Diagram }: ProjectShowcaseProps) {
  const cardRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: isMobile ? 20 : 40,
        duration: isMobile ? 0.5 : 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <article
      ref={cardRef}
      className="card-base group"
    >
      <div className="grid lg:grid-cols-2 gap-0 items-center">
        <div
          className="relative bg-obsidian/50 flex items-center justify-center p-6 md:p-8 lg:p-10"
          aria-hidden="true"
        >
          <div className="w-full max-h-[420px]">
            <Diagram className="w-full h-auto" />
          </div>
        </div>

        <CardContent className="flex flex-col p-6 md:p-8 lg:p-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xl md:text-2xl text-ash/50 group-hover:text-antique-gold transition-colors duration-300">
                {String(index + 1).padStart(2, "0")}.
              </span>
              <Badge variant="flagship">
                {project.category.split(" / ")[0]}
              </Badge>
            </div>

            <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-normal text-ivory leading-snug mb-3 group-hover:text-antique-gold transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-ash font-sans leading-relaxed text-sm md:text-base mb-4">
              {project.subtitle}
            </p>

            <p className="text-ash-dim font-sans leading-relaxed text-sm mb-4">
              {project.challenge}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.slice(0, 6).map((tech, i) => (
                <span key={i} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-charcoal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-ash-dim">
              <span>{project.period}</span>
              <span className="text-border-default">·</span>
              <span>{project.role}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ash hover:text-antique-gold transition-colors duration-300 font-mono text-xs tracking-wider uppercase text-center sm:text-left"
                  aria-label={`${project.title} on GitHub`}
                >
                  GitHub →
                </a>
              )}
              <Button asChild className="btn-primary px-4 py-2 text-xs tracking-[0.2em] uppercase w-full sm:w-auto">
                <a href={`/work/${project.slug}`}>
                  CASE STUDY
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </article>
  );
}

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
            <ProjectShowcase
              key={project.slug}
              project={project}
              index={index}
              diagram={
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