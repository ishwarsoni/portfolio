"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Project } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { OncoLinkDiagram, DatacleanrDiagram, MotionProcessingDiagram } from "@/components/diagrams";

gsap.registerPlugin(ScrollTrigger);

interface DecisionItem {
  number: string;
  title: string;
  context: string;
  chosen: string;
  reason: string;
  matrix?: string;
  formula?: string;
}

interface MotionResultItem {
  smallLabel?: string;
  mainValue: string;
  title: string;
  description: string;
}

const MOTION_DECISIONS: DecisionItem[] = [
  {
    number: "01",
    title: "C_bvh2smpl Basis Matrix",
    context: "BVH and SMPL-H use different coordinate conventions.",
    chosen: "Global basis transform",
    reason: "A single verified matrix provides consistent coordinate conversion across joints.",
    matrix: "[-1, 0, 0]\n[ 0, 0, 1]\n[ 0, 1, 0]",
  },
  {
    number: "02",
    title: "Automatic Root Fix",
    context: "BVH root orientation varies between sequences.",
    chosen: "Frame-0 inverse root rotation",
    reason: "Adapts to the initial orientation without manual per-sequence correction.",
    formula: "R_root = R_fix @ R_bvh2smpl",
  },
  {
    number: "03",
    title: "Percentile-Based Grounding",
    context: "Simple minimum-height grounding can be affected by outliers.",
    chosen: "Percentile-based floor detection",
    reason: "More robust to jumps and outliers while remaining deterministic.",
  },
  {
    number: "04",
    title: "Translation-Only Foot Lock",
    context: "Foot sliding is visible, but changing joint rotations can reduce pose fidelity.",
    chosen: "Translation-only deterministic stabilization",
    reason: "Stabilizes root translation while preserving joint rotations.",
  },
];

interface MotionResultItem {
  smallLabel?: string;
  mainValue: string;
  title: string;
  description: string;
  isMetric?: boolean;
}

const MOTION_RESULTS: MotionResultItem[] = [
  { mainValue: "21", title: "BODY JOINTS", description: "→ SMPL-H", isMetric: true },
  { mainValue: "3", title: "POST-PROCESSING STAGES", description: "Grounding · Foot Lock · Smoothing", isMetric: true },
  { mainValue: "3", title: "EXPORT FORMATS", description: "NPZ · BVH · MP4", isMetric: true },
  { smallLabel: "AMASS", mainValue: "MULTI-SUBJECT / MULTI-ACTION", title: "BVH processing", description: "Large-scale motion datasets", isMetric: false },
  { smallLabel: "VERIFIED", mainValue: "COORDINATE TRANSFORM", title: "Global basis conversion + root correction", description: "Pipeline integrity verified", isMetric: false },
];

function MotionProcessingDecisions() {
  return (
    <div className="space-y-6">
      {MOTION_DECISIONS.map((decision, index) => (
        <Card key={index} className="decision-card relative overflow-hidden border-border-subtle">
          <div className="absolute inset-0 bg-gradient-to-r from-antique-gold/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <div className="relative p-6 md:p-8">
            <div className="grid md:grid-cols-[140px_1fr] gap-8 md:gap-12 items-start">
              <div className="flex-shrink-0 w-full md:w-[140px] flex flex-col items-center md:items-end justify-center text-center md:text-right pt-2 md:pt-0">
                <Typography variant="eyebrow" className="text-antique-gold mb-1 whitespace-nowrap">
                  Decision
                </Typography>
                <Typography variant="display" className="text-ivory font-mono tracking-tight whitespace-nowrap">
                  {decision.number}
                </Typography>
              </div>
              <div className="flex-1 min-w-0">
                <Typography variant="h3" className="text-ivory mb-3">
                  {decision.title}
                </Typography>
                <Typography variant="body" className="text-ash-dim mb-4 leading-relaxed">
                  {decision.context}
                </Typography>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-crimson shrink-0">Chosen:</span>
                    <Typography variant="body" className="text-ivory font-medium leading-relaxed">
                      {decision.chosen}
                    </Typography>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-antique-gold shrink-0">Reason:</span>
                    <Typography variant="small" className="text-ash leading-relaxed">
                      {decision.reason}
                    </Typography>
                  </div>
                </div>
                {decision.matrix && (
                  <div className="font-mono text-sm text-antique-gold bg-obsidian/50 p-3 rounded-sm border border-charcoal mt-3">
                    {decision.matrix.split('\n').map((line: string, i: number) => (
                      <div key={i} className="whitespace-pre">{line}</div>
                    ))}
                  </div>
                )}
                {decision.formula && (
                  <div className="font-mono text-sm text-antique-gold bg-obsidian/50 p-3 rounded-sm border border-charcoal mt-3">
                    {decision.formula}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function MotionProcessingResults() {
  const cardStyle: React.CSSProperties = {
    minHeight: '260px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  const metricValueStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'clamp(3.5rem, 6vw, 4.5rem)',
    fontWeight: 700,
    color: '#C6A15B',
    lineHeight: 1,
    marginBottom: '16px',
  };

  const metricTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
    fontWeight: 400,
    color: '#E8E1D2',
    lineHeight: 1.2,
    marginBottom: '16px',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
    fontWeight: 600,
    color: '#C6A15B',
    lineHeight: 1.1,
    marginBottom: '16px',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
    fontWeight: 400,
    color: '#E8E1D2',
    lineHeight: 1.3,
    marginBottom: '16px',
  };

  const descriptionStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.875rem',
    color: '#85858A',
    lineHeight: 1.6,
  };

  const eyebrowStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: '#C6A15B',
    marginBottom: '16px',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOTION_RESULTS.slice(0, 3).map((result, index) => (
          <Card
            key={index}
            className="metric-card relative border-border-subtle bg-obsidian/50"
            style={cardStyle}
          >
            <div style={metricValueStyle}>{result.mainValue}</div>
            <div style={metricTitleStyle}>{result.title}</div>
            <div style={descriptionStyle}>{result.description}</div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[700px] mx-auto">
        {MOTION_RESULTS.slice(3).map((result, index) => (
          <Card
            key={index + 3}
            className="metric-card relative border-border-subtle bg-obsidian/50"
            style={cardStyle}
          >
            {result.smallLabel && <div style={eyebrowStyle}>{result.smallLabel}</div>}
            <div style={labelStyle}>{result.mainValue}</div>
            <div style={cardTitleStyle}>{result.title}</div>
            <div style={descriptionStyle}>{result.description}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface CaseStudyPageProps {
  project: Project;
}

function getDiagramComponent(slug: string) {
  switch (slug) {
    case "oncolink":
      return OncoLinkDiagram;
    case "datacleanr":
      return DatacleanrDiagram;
    case "motion-processing":
      return MotionProcessingDiagram;
    default:
      return OncoLinkDiagram;
  }
}

function getDiagramAriaLabel(slug: string) {
  switch (slug) {
    case "oncolink":
      return "OncoLink RAG pipeline architecture diagram";
    case "datacleanr":
      return "Datacleanr ML data cleaning pipeline diagram";
    case "motion-processing":
      return "SMPL-H motion processing pipeline diagram";
    default:
      return "Technical architecture diagram";
  }
}

export function CaseStudyPage({ project }: CaseStudyPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const DiagramComponent = getDiagramComponent(project.slug);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.2,
          ease: "power3.out",
        });
      }

      const sections = sectionsRef.current?.querySelectorAll(".case-study-section");
      if (sections && sections.length > 0) {
        gsap.from(Array.from(sections), {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            onEnter: () => {},
            onLeaveBack: () => {},
          },
        });
      }

      const decisionCards = sectionsRef.current?.querySelectorAll(".decision-card");
      if (decisionCards && decisionCards.length > 0) {
        // Ensure visible by default, animate in
        gsap.set(decisionCards, { opacity: 1, x: 0 });
        gsap.from(Array.from(decisionCards), {
          opacity: 0,
          x: -30,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: decisionCards[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      const metricCards = sectionsRef.current?.querySelectorAll(".metric-card");
      if (metricCards && metricCards.length > 0) {
        // Ensure visible by default, animate in
        gsap.set(metricCards, { opacity: 1, scale: 1 });
        gsap.from(Array.from(metricCards), {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: metricCards[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <article className="min-h-screen">
      <header
        ref={heroRef}
        className="relative min-h-[60vh] w-full flex items-center overflow-hidden"
        aria-labelledby="case-study-title"
      >
        <div className="absolute inset-0 bg-vignette z-0" aria-hidden="true" />
        
        <Container size="wide" className="relative z-10 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-2xl text-ash/50">
                {project.category.split(" / ")[0].toUpperCase()}
              </span>
              <Badge variant="flagship">
                {project.category.split(" / ")[1] || project.category}
              </Badge>
            </div>

            <h1 id="case-study-title" className="mb-4">
              <Typography variant="display" className="uppercase tracking-[0.04em] text-ivory">
                {project.title}
              </Typography>
            </h1>

            <Typography variant="body-lg" className="text-ash mb-8 max-w-2xl">
              {project.subtitle}
            </Typography>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-ash">
                <span className="font-mono text-ash-dim">Role:</span>
                <span className="text-ivory">{project.role}</span>
              </div>
              <div className="flex items-center gap-2 text-ash">
                <span className="font-mono text-ash-dim">Period:</span>
                <span className="text-ivory">{project.period}</span>
              </div>
              <div className="flex items-center gap-2 text-ash">
                <span className="font-mono text-ash-dim">Stack:</span>
                <span className="text-ivory">{project.stack.slice(0, 4).join(" · ")}</span>
              </div>
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-4 py-1.5 text-xs tracking-[0.2em] uppercase font-mono"
                >
                  LIVE DEMO →
                </a>
              )}
            </div>
          </div>

          <div className="mt-12 relative h-[300px] md:h-[400px] overflow-hidden rounded-sm border border-border-subtle">
            <DiagramComponent 
              className="w-full h-full" 
              aria-label={getDiagramAriaLabel(project.slug)}
            />
          </div>
        </Container>
      </header>

      <div ref={sectionsRef} className="relative z-10 bg-void">
        <Container size="wide" className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto space-y-16">
            <section className="case-study-section" aria-labelledby="challenge-heading">
              <div className="flex items-center gap-3 mb-6">
                <Divider variant="gold" className="flex-1" />
                <Typography variant="eyebrow" className="text-antique-gold">
                  Challenge
                </Typography>
                <Divider variant="gold" className="flex-1" />
              </div>
              <Typography variant="body-lg" className="text-ivory-dim leading-relaxed">
                {project.challenge}
              </Typography>
            </section>

            <section className="case-study-section" aria-labelledby="strategy-heading">
              <div className="flex items-center gap-3 mb-6">
                <Divider variant="gold" className="flex-1" />
                <Typography variant="eyebrow" className="text-antique-gold">
                  Strategy
                </Typography>
                <Divider variant="gold" className="flex-1" />
              </div>
              <Typography variant="body-lg" className="text-ivory-dim leading-relaxed">
                {project.strategy}
              </Typography>
            </section>

            <section className="case-study-section" aria-labelledby="process-heading">
              <div className="flex items-center gap-3 mb-8">
                <Divider variant="gold" className="flex-1" />
                <Typography variant="eyebrow" className="text-antique-gold">
                  Process
                </Typography>
                <Divider variant="gold" className="flex-1" />
              </div>

              <div className="space-y-8">
                {project.process.map((step) => (
                  <div key={step.step} className="flex gap-6">
                    <div className="flex-shrink-0 w-16 text-right pt-1">
                      <Typography variant="eyebrow" className="text-antique-gold">
                        {String(step.step).padStart(2, "0")}
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-4 mb-2">
                        <Typography variant="h3" className="text-ivory">
                          {step.title}
                        </Typography>
                        <Typography variant="micro" className="text-ash-dim uppercase tracking-wider">
                          {step.visual}
                        </Typography>
                      </div>
                      <Typography variant="body" className="text-ash leading-relaxed">
                        {step.detail}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="case-study-section" aria-labelledby="decisions-heading">
              <div className="flex items-center gap-3 mb-8">
                <Divider variant="gold" className="flex-1" />
                <Typography variant="eyebrow" className="text-antique-gold">
                  Key Decisions
                </Typography>
                <Divider variant="gold" className="flex-1" />
              </div>

              {project.slug === "motion-processing" ? (
                <div className="space-y-6">
                  <MotionProcessingDecisions />
                </div>
              ) : (
                <div className="space-y-6">
                  {project.decisions.map((decision, index) => (
                    <Card key={index} className="decision-card p-6">
                      <div className="grid md:grid-cols-5 gap-4">
                        <div className="md:col-span-1">
                          <Typography variant="eyebrow" className="text-antique-gold mb-2">
                            Decision
                          </Typography>
                          <Typography variant="h3" className="text-ivory">
                            {decision.decision}
                          </Typography>
                        </div>
                        <div className="md:col-span-1">
                          <Typography variant="eyebrow" className="text-ash mb-2">
                            Context
                          </Typography>
                          <Typography variant="small" className="text-ash-dim">
                            {decision.context}
                          </Typography>
                        </div>
                        <div className="md:col-span-1">
                          <Typography variant="eyebrow" className="text-ash mb-2">
                            Options
                          </Typography>
                          <ul className="space-y-1">
                            {decision.options.map((opt, i) => (
                              <li key={i} className="text-sm text-ash-dim font-mono">
                                {opt}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:col-span-1">
                          <Typography variant="eyebrow" className="text-crimson mb-2">
                            Chosen
                          </Typography>
                          <Typography variant="body" className="text-ivory font-medium">
                            {decision.chosen}
                          </Typography>
                        </div>
                        <div className="md:col-span-1">
                          <Typography variant="eyebrow" className="text-ash mb-2">
                            Rationale
                          </Typography>
                          <Typography variant="small" className="text-ash-dim leading-relaxed">
                            {decision.rationale}
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            <section className="case-study-section" aria-labelledby="results-heading">
              <div className="flex items-center gap-3 mb-8">
                <Divider variant="gold" className="flex-1" />
                <Typography variant="eyebrow" className="text-antique-gold">
                  Results
                </Typography>
                <Divider variant="gold" className="flex-1" />
              </div>

              {project.slug === "motion-processing" ? (
                <MotionProcessingResults />
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {project.metrics.map((metric, index) => (
                    <Card key={index} className="metric-card p-6 text-center">
                      <Typography variant="display" className="text-antique-gold font-mono mb-2">
                        {metric.value}
                      </Typography>
                      <Typography variant="h3" className="text-ivory mb-1">
                        {metric.label}
                      </Typography>
                      <Typography variant="micro" className="text-ash-dim uppercase tracking-wider">
                        {metric.context}
                      </Typography>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            <Divider variant="gold" className="my-8" />

            <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border-subtle">
              <div className="flex items-center gap-4">
                {project.links.github && (
                  <Link
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost px-4 py-2 text-xs tracking-[0.2em] uppercase font-mono"
                    aria-label={`${project.title} on GitHub`}
                  >
                    GITHUB
                  </Link>
                )}
                {project.links.demo && (
                  <Link
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-4 py-2 text-xs tracking-[0.2em] uppercase"
                  >
                    LIVE DEMO
                  </Link>
                )}
              </div>
              <Link href="/#work" className="btn-ghost px-4 py-2 text-xs tracking-[0.2em] uppercase font-mono">
                ← BACK TO WORK
              </Link>
            </footer>
          </div>
        </Container>
      </div>
    </article>
  );
}