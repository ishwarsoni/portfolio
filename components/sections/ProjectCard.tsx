"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    period: string;
    role: string;
    challenge: string;
    stack: string[];
    links: { github?: string; demo?: string };
  };
  index: number;
  Diagram: React.ComponentType<{ className?: string }>;
}

export function ProjectCard({ project, index, Diagram }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
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

  const categoryLabel = project.category.split(" / ")[0];

  return (
    <article
      ref={cardRef}
      className="project-card"
    >
      <div className="project-card__grid">
        <div className="project-card__visual" aria-hidden="true">
          <div className="project-card__visual-inner">
            <Diagram className="project-card__diagram" />
          </div>
        </div>

        <div className="project-card__info">
          <div className="project-card__content">
            <div className="project-card__meta">
              <span className="project-card__number">
                {String(index + 1).padStart(2, "0")}.
              </span>
              <Badge variant="flagship" className="project-card__badge">
                {categoryLabel}
              </Badge>
            </div>

            <h3 className="project-card__title">
              {project.title}
            </h3>

            <p className="project-card__subtitle">
              {project.subtitle}
            </p>

            <p className="project-card__description">
              {project.challenge}
            </p>

            <div className="project-card__stack">
              {project.stack.slice(0, 6).map((tech, i) => (
                <span key={i} className="project-card__tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <footer className="project-card__footer">
            <div className="project-card__meta-info">
              <span>{project.period}</span>
              <span className="project-card__separator">·</span>
              <span>{project.role}</span>
            </div>
            <div className="project-card__actions flex-wrap gap-3">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link text-antique-gold hover:text-ivory"
                  aria-label={`${project.title} Live Demo`}
                >
                  LIVE DEMO →
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                  aria-label={`${project.title} on GitHub`}
                >
                  GITHUB →
                </a>
              )}
              <Button asChild className="project-card__cta">
                <a href={`/work/${project.slug}`}>
                  CASE STUDY
                </a>
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}