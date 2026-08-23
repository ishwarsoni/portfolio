"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface DatacleanrDiagramProps {
  className?: string;
  "aria-label"?: string;
}

const STAGE_LABELS = ["RAW DATA", "AUTO PROFILE", "CLEANING ENGINE", "VALIDATE", "CLEAN DATA"];

const CLEANING_STAGES = [
  { label: "Missing Values", icon: "M4 4h16M4 12h16M4 20h16" },
  { label: "Outliers", icon: "M12 4v16M4 12h16M20 12H12" },
  { label: "Skew Correction", icon: "M4 20l4-8 4 8 4-8 4 8" },
  { label: "Feature Selection", icon: "M4 4h6v6H4V4zm8 0h6v6H12V4zm-8 8h6v6H4v-6zm8 0h6v6H12v-6z" },
];

const METRICS = [
  { label: "DATASETS", value: "50" },
  { label: "FAILURES", value: "0" },
  { label: "TARGET CORRUPTION", value: "0" },
];

const RAW_PREVIEW = [
  ["age", "income", "education", "target"],
  [25, 45000, "bachelor", 1],
  [null, 52000, "master", 0],
  [42, null, "phd", 1],
  [31, 38000, "bachelor", 1],
  [28, 41000, null, 0],
];

const CLEAN_PREVIEW = [
  ["age", "income", "education", "target"],
  [25, 45000, "bachelor", 1],
  [31, 52000, "master", 0],
  [42, 38000, "phd", 1],
  [31, 38000, "bachelor", 1],
  [28, 41000, "bachelor", 0],
];

const TECH_STACK = ["Python", "Pandas", "NumPy", "Scikit-learn", "Jupyter", "YAML"];

export function DatacleanrDiagram({ className, "aria-label": ariaLabel = "Datacleanr ML data cleaning pipeline visualization" }: DatacleanrDiagramProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const signal = containerRef.current?.querySelector("#data-signal");
      const stageNodes = containerRef.current?.querySelectorAll(".stage-node");
      const stages = stageNodes ? Array.from(stageNodes) as SVGGElement[] : [];

      if (!signal || !stages.length) return;

      gsap.set(signal, { opacity: 0, x: -20 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: isMobile ? 0.4 : 0.6 } });

      tl.to(signal, { opacity: 1, x: 0, duration: isMobile ? 0.2 : 0.3 });

      stages.forEach((stageEl, i) => {
        const rect = stageEl.getBoundingClientRect();
        const containerRect = (containerRef.current as SVGSVGElement).getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - containerRect.left;

        tl.to(signal, { x: cx - 100, duration: isMobile ? 0.3 : 0.5 }, "+=0.1")
          .to(stageEl.querySelector(".stage-ring"), { r: 14, strokeWidth: 3, duration: isMobile ? 0.1 : 0.2 }, "<")
          .to(stageEl.querySelector(".stage-ring"), { r: 10, strokeWidth: 2, duration: isMobile ? 0.2 : 0.3 }, "+=0.05");
      });

      // Animate cleaning engine stages
      const engineStages = containerRef.current?.querySelectorAll(".engine-stage");
      if (engineStages && engineStages.length) {
        engineStages.forEach((stage, i) => {
          tl.fromTo(stage, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, `-=0.3`);
        });
      }

      tl.to(signal, { opacity: 0, duration: isMobile ? 0.15 : 0.3 });
    }, containerRef);

    return () => ctx.revert();
  }, [isVisible, isMobile]);

  return (
    <figure className={className} aria-label={ariaLabel} role="img">
      <svg
        ref={containerRef}
        viewBox="0 0 720 380"
        preserveAspectRatio="xMidYMid meet"
        className="w-full max-w-[720px] mx-auto"
        aria-hidden="true"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <defs>
          <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d0e10" />
            <stop offset="100%" stopColor="#08090b" />
          </linearGradient>
          <linearGradient id="signal-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="stage-active" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="engine-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d0e10" />
            <stop offset="100%" stopColor="#111317" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="grid-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#1a1c20" strokeWidth="0.5" />
          </pattern>
        </defs>

        <rect width="720" height="520" fill="url(#bg-gradient)" rx="8" />
        <rect width="720" height="520" fill="url(#grid-pattern)" opacity="0.3" rx="8" />

        {/* TOP: Pipeline Flow */}
        <g className="pipeline-flow">
          <path
            d="M 80 50 L 640 50"
            fill="none"
            stroke="#1a1c20"
            strokeWidth="2"
            strokeDasharray="10 8"
            opacity="0.4"
          />

          {STAGE_LABELS.map((label, i) => {
            const x = 100 + i * 145;
            return (
              <g key={label} className="stage-node" transform={`translate(${x}, 50)`}>
                <circle
                  className="stage-ring"
                  cx="0"
                  cy="0"
                  r="10"
                  fill="#0d0e10"
                  stroke="#2a2d34"
                  strokeWidth="2"
                  filter="url(#glow)"
                />
                <text
                  x="0"
                  y="28"
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="9"
                  fontWeight={500}
                  fill="#6b7280"
                  letterSpacing="0.04em"
                >
                  {label}
                </text>
              </g>
            );
          })}

          <g id="data-signal">
            <circle cx="100" cy="50" r="6" fill="url(#signal-gradient)" filter="url(#glow)" />
            <circle cx="100" cy="50" r="10" fill="none" stroke="url(#signal-gradient)" strokeWidth="1.5" opacity="0.4" />
          </g>
        </g>

        {/* LEFT: Raw DataFrame Preview */}
        <g transform="translate(60, 90)">
          <rect x="0" y="0" width="280" height="140" fill="#0d0e10" stroke="#1a1c20" strokeWidth="1" rx="6" />
          <rect x="0" y="0" width="280" height="28" fill="#111317" stroke="#1a1c20" strokeWidth="1" rx="6" />
          <text x="12" y="19" fontFamily="var(--font-mono)" fontSize="11" fontWeight={600} fill="#e5e7eb">RAW DATAFRAME</text>
          <text x="268" y="19" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="#6b7280">5 × 4</text>

          <g transform="translate(8, 36)">
            {RAW_PREVIEW.map((row, ri) =>
              row.map((cell, ci) => (
                <g key={`${ri}-${ci}`} transform={`translate(${ci * 68}, ${ri * 22})`}>
                  <rect
                    x="0"
                    y="0"
                    width="64"
                    height="18"
                    fill={ri === 0 ? "#1a1c20" : cell === null ? "#371d1d" : "#0d0e10"}
                    stroke="#1a1c20"
                    strokeWidth={0.5}
                  />
                  <text
                    x="32"
                    y="12"
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize={ri === 0 ? "9" : "8"}
                    fontWeight={ri === 0 ? 600 : 400}
                    fill={ri === 0 ? "#a855f7" : cell === null ? "#f87171" : "#9ca3af"}
                  >
                    {cell === null ? "NULL" : String(cell)}
                  </text>
                </g>
              ))
            )}
          </g>

          <g transform="translate(8, 120)" opacity={0.6}>
            <rect x="0" y="0" width="40" height="6" fill="#f87171" rx="3" opacity={0.3} />
            <text x="48" y="11" fontFamily="var(--font-mono)" fontSize="8" fill="#6b7280">missingness →</text>
          </g>
        </g>

        {/* CENTER: Cleaning Engine - 2x2 Grid */}
        <g transform="translate(360, 90)">
          <rect x="0" y="0" width="300" height="280" fill="url(#engine-bg)" stroke="#22d3ee" strokeWidth="1" rx="8" filter="url(#soft-glow)" />
          <rect x="0" y="0" width="300" height="36" fill="#111317" stroke="#22d3ee" strokeWidth="1" rx="8" />
          <text x="150" y="23" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight={600} fill="#22d3ee">CLEANING ENGINE</text>

          <g transform="translate(15, 50)">
            {CLEANING_STAGES.map((stage, i) => {
              const col = i % 2;
              const row = Math.floor(i / 2);
              const x = col * 135;
              const y = row * 115;
              return (
                <g key={stage.label} className="engine-stage" transform={`translate(${x}, ${y})`} opacity={0}>
                  <rect x="0" y="0" width="120" height="100" fill="#0d0e10" stroke="#1a1c20" strokeWidth="1" rx="6" />
                  <rect x="0" y="0" width="120" height="24" fill="#111317" stroke="#1a1c20" strokeWidth="1" rx="6" />
                  <svg x="8" y="4" width="16" height="16" viewBox="0 0 24 24">
                    <path d={stage.icon} fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <text x="30" y="15" fontFamily="var(--font-sans)" fontSize="9" fontWeight={500} fill="#e5e7eb">{stage.label}</text>
                  <text x="60" y="55" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#6b7280">stage {i + 1}</text>
                </g>
              );
            })}
          </g>
        </g>

        {/* RIGHT: Clean DataFrame Preview */}
        <g transform="translate(60, 250)">
          <rect x="0" y="0" width="600" height="120" fill="#0d0e10" stroke="#1a1c20" strokeWidth="1" rx="6" />
          <rect x="0" y="0" width="600" height="28" fill="#111317" stroke="#1a1c20" strokeWidth="1" rx="6" />
          <text x="12" y="19" fontFamily="var(--font-mono)" fontSize="11" fontWeight={600} fill="#22d3ee">VALIDATION & OUTPUT</text>

          <g transform="translate(12, 40)">
            <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="9" fill="#22d3ee">✓</text>
            <text x="16" y="0" fontFamily="var(--font-sans)" fontSize="9" fill="#9ca3af">Target dtype preserved</text>
            <text x="0" y="20" fontFamily="var(--font-mono)" fontSize="9" fill="#22d3ee">✓</text>
            <text x="16" y="20" fontFamily="var(--font-sans)" fontSize="9" fill="#9ca3af">Target values unchanged</text>
            <text x="280" y="0" fontFamily="var(--font-mono)" fontSize="9" fill="#22d3ee">✓</text>
            <text x="296" y="0" fontFamily="var(--font-sans)" fontSize="9" fill="#9ca3af">Col order maintained</text>
            <text x="280" y="20" fontFamily="var(--font-mono)" fontSize="9" fill="#22d3ee">✓</text>
            <text x="296" y="20" fontFamily="var(--font-sans)" fontSize="9" fill="#9ca3af">No all-NaN columns</text>
          </g>

          <g transform="translate(12, 70)">
            <rect x="0" y="0" width="576" height="1" fill="#1a1c20" opacity="0.3" />
          </g>

          <g transform="translate(8, 80)">
            {CLEAN_PREVIEW[0].map((cell, ci) => (
              <text
                key={ci}
                x={ci * 140 + 70}
                y="0"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="8"
                fontWeight={600}
                fill="#a855f7"
              >
                {cell}
              </text>
            ))}
            {CLEAN_PREVIEW.slice(1).map((row, ri) =>
              row.map((cell, ci) => (
                <text
                  key={`${ri}-${ci}`}
                  x={ci * 140 + 70}
                  y={ri * 18 + 12}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="8"
                  fill="#9ca3af"
                >
                  {String(cell)}
                </text>
              ))
            )}
          </g>
        </g>

        {/* BOTTOM: Tech Stack */}
        <g transform="translate(60, 350)">
          <rect x="0" y="0" width="600" height="1" fill="#1a1c20" opacity="0.2" />
        </g>

        <g transform="translate(60, 370)">
          <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="9" fontWeight={500} fill="#6b7280" letterSpacing="0.08em">STACK</text>
          <g transform="translate(0, 20)">
            {TECH_STACK.map((tech, i) => (
              <g key={tech} transform={`translate(${i * 100}, 0)`}>
                <rect x="0" y="-14" width="90" height="24" rx="4" fill="#111317" stroke="#2a2d34" strokeWidth="1" />
                <text x="45" y="2" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#9ca3af">{tech}</text>
              </g>
            ))}
          </g>
        </g>

        {/* Metrics at bottom */}
        <g transform="translate(60, 410)">
          {METRICS.map((metric, i) => (
            <g key={metric.label} transform={`translate(${i * 200}, 0)`}>
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="20"
                fontWeight={700}
                fill="#e5e7eb"
              >
                {metric.value}
              </text>
              <text
                x="0"
                y="18"
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                fontSize="9"
                fontWeight={500}
                fill="#6b7280"
                letterSpacing="0.1em"
              >
                {metric.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </figure>
  );
}

export default DatacleanrDiagram;