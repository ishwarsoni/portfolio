"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TechnicalDiagramProps {
  className?: string;
  "aria-label"?: string;
}

const SKELETON_BVH = [
  { from: [0, 0], to: [0, -60] },
  { from: [0, -60], to: [-40, -100] },
  { from: [0, -60], to: [40, -100] },
  { from: [-40, -100], to: [-60, -160] },
  { from: [40, -100], to: [60, -160] },
  { from: [-60, -160], to: [-70, -210] },
  { from: [60, -160], to: [70, -210] },
  { from: [0, 0], to: [0, 60] },
  { from: [0, 60], to: [-45, 110] },
  { from: [0, 60], to: [45, 110] },
  { from: [-45, 110], to: [-60, 160] },
  { from: [45, 110], to: [60, 160] },
];

const SKELETON_SMPLH = [
  { from: [0, 0], to: [0, -55] },
  { from: [0, -55], to: [-35, -95] },
  { from: [0, -55], to: [35, -95] },
  { from: [-35, -95], to: [-55, -150] },
  { from: [35, -95], to: [55, -150] },
  { from: [-55, -150], to: [-65, -195] },
  { from: [55, -150], to: [65, -195] },
  { from: [0, 0], to: [0, 55] },
  { from: [0, 55], to: [-40, 100] },
  { from: [0, 55], to: [40, 100] },
  { from: [-40, 100], to: [-55, 145] },
  { from: [40, 100], to: [55, 145] },
];

const MATRIX_C_BVH2SMPL = [
  [-1, 0, 0],
  [0, 0, 1],
  [0, 1, 0],
];

const VALIDATION_LABELS = ["FK VERIFY", "GROUNDING", "FOOT LOCK", "SMOOTHING"];

const PIPELINE_STAGES = [
  "BVH INPUT",
  "PARSE",
  "JOINT MAP",
  "COORD TRANSFORM",
  "ROOT FIX",
  "SMPL-H",
  "VALIDATE",
];

export function SemanticLabsDiagram({ className, "aria-label": ariaLabel = "Semantic Labs motion processing pipeline: BVH to SMPL-H reconstruction" }: TechnicalDiagramProps) {
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
      { threshold: 0.25 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const svg = containerRef.current as SVGSVGElement;
      const signal = svg.querySelector("#pipeline-signal");
      const stageNodes = svg.querySelectorAll(".pipe-stage");
      const stages = Array.from(stageNodes) as SVGGElement[];
      const bvhSkeleton = svg.querySelector("#bvh-skeleton");
      const smplhSkeleton = svg.querySelector("#smplh-skeleton");
      const matrixGroups = svg.querySelectorAll("#matrix-display");

      if (!signal || !stages.length) return;

      gsap.set(signal, { opacity: 0, scale: 0.5 });
      if (bvhSkeleton) gsap.set(bvhSkeleton, { opacity: 0.3 });
      if (smplhSkeleton) gsap.set(smplhSkeleton, { opacity: 0 });
      matrixGroups.forEach((g) => gsap.set(g, { opacity: 0 }));

      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: isMobile ? 0.4 : 0.5 } });

      tl.to(signal, { opacity: 1, scale: 1, duration: isMobile ? 0.2 : 0.3 });

      stages.forEach((stageEl, i) => {
        const rect = stageEl.getBoundingClientRect();
        const containerRect = svg.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - containerRect.left;

        const ring = stageEl.querySelector(".stage-ring");
        if (ring) {
          tl.to(signal, { x: cx, duration: isMobile ? 0.3 : 0.45 }, "+=0.05")
            .to(ring, { r: 12, strokeWidth: 3, duration: isMobile ? 0.1 : 0.15 }, "<")
            .to(ring, { r: 8, strokeWidth: 2, duration: isMobile ? 0.15 : 0.2 }, "+=0.03");
        }

        if (i === 2 && matrixGroups[0]) {
          tl.to(matrixGroups[0], { opacity: 1, duration: isMobile ? 0.2 : 0.3 }, "<");
        }
        if (i === 3 && matrixGroups[1]) {
          tl.to(matrixGroups[1], { opacity: 1, duration: isMobile ? 0.2 : 0.3 }, "<");
        }
        if (i === 4 && matrixGroups[2]) {
          tl.to(matrixGroups[2], { opacity: 1, duration: isMobile ? 0.2 : 0.3 }, "<");
        }
        if (i === 5) {
          if (bvhSkeleton) tl.to(bvhSkeleton, { opacity: 0.15, duration: isMobile ? 0.2 : 0.3 }, "<");
          if (smplhSkeleton) tl.to(smplhSkeleton, { opacity: 1, duration: isMobile ? 0.3 : 0.4 }, "<");
        }
        if (i === 6) {
          const validations = svg.querySelectorAll(".val-badge");
          validations.forEach((v, vi) => {
            tl.fromTo(v, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: isMobile ? 0.15 : 0.2 }, `+=${vi * 0.05}`);
          });
        }
      });

      tl.to(signal, { opacity: 0, duration: isMobile ? 0.1 : 0.2 });
    }, containerRef);

    return () => ctx.revert();
  }, [isVisible, isMobile]);

  return (
    <figure className={className} aria-label={ariaLabel} role="img">
      <svg
        ref={containerRef}
        viewBox="0 0 880 420"
        preserveAspectRatio="xMidYMid meet"
        className="w-full max-w-[880px] mx-auto"
        aria-hidden="true"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <defs>
          <linearGradient id="bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d0e10" />
            <stop offset="100%" stopColor="#08090b" />
          </linearGradient>
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c6a15b" />
            <stop offset="100%" stopColor="#80633a" />
          </linearGradient>
          <linearGradient id="crimson-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6e1725" />
            <stop offset="100%" stopColor="#a51c30" />
          </linearGradient>
          <linearGradient id="signal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="subtle-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#14161a" strokeWidth="0.5" />
          </pattern>
        </defs>

        <rect width="880" height="420" fill="url(#bg-grad)" rx="10" />
        <rect width="880" height="420" fill="url(#subtle-grid)" opacity="0.3" rx="10" />

        {/* Pipeline flow line */}
        <g className="pipeline-flow">
          <path
            d="M 80 60 L 800 60"
            fill="none"
            stroke="#1a1c20"
            strokeWidth="2"
            strokeDasharray="10 8"
            opacity="0.35"
          />

          {PIPELINE_STAGES.map((label, i) => {
            const x = 100 + i * 108;
            return (
              <g key={label} className="pipe-stage" transform={`translate(${x}, 60)`}>
                <circle
                  className="stage-ring"
                  cx="0"
                  cy="0"
                  r="8"
                  fill="#0d0e10"
                  stroke="#2a2d34"
                  strokeWidth="2"
                  filter="url(#soft-glow)"
                />
                <text
                  x="0"
                  y="24"
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

          <g id="pipeline-signal">
            <circle cx="100" cy="60" r="5" fill="url(#signal-grad)" filter="url(#strong-glow)" />
            <circle cx="100" cy="60" r="9" fill="none" stroke="url(#signal-grad)" strokeWidth="1.5" opacity="0.4" />
          </g>
        </g>

        {/* LEFT: BVH Skeleton with subtle motion trail */}
        <g transform="translate(120, 200)" id="bvh-skeleton">
          <text x="0" y="-180" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight={600} fill="#c6a15b">BVH INPUT</text>

          <defs>
            <filter id="motion-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Motion trail */}
          <g stroke="#c6a15b" strokeWidth="1.5" fill="none" opacity="0.15" filter="url(#motion-blur)">
            {SKELETON_BVH.map((bone, i) => (
              <line
                key={`trail-${i}`}
                x1={bone.from[0]}
                y1={bone.from[1]}
                x2={bone.to[0]}
                y2={bone.to[1]}
              >
                <animate
                  attributeName="stroke-opacity"
                  values="0.15;0.02;0.15"
                  dur="2s"
                  repeatCount="indefinite"
                  begin={`${i * 0.1}s`}
                />
              </line>
            ))}
          </g>

          {/* Main skeleton */}
          <g stroke="#c6a15b" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#soft-glow)">
            {SKELETON_BVH.map((bone, i) => (
              <line key={i} x1={bone.from[0]} y1={bone.from[1]} x2={bone.to[0]} y2={bone.to[1]} />
            ))}
          </g>

          <g fill="#c6a15b" filter="url(#soft-glow)">
            <circle cx="0" cy="0" r="5" />
            <circle cx="0" cy="-60" r="6" />
            <circle cx="-40" cy="-100" r="4" />
            <circle cx="40" cy="-100" r="4" />
            <circle cx="-60" cy="-160" r="3" />
            <circle cx="60" cy="-160" r="3" />
            <circle cx="-70" cy="-210" r="2.5" />
            <circle cx="70" cy="-210" r="2.5" />
            <circle cx="0" cy="60" r="5" />
            <circle cx="-45" cy="110" r="3.5" />
            <circle cx="45" cy="110" r="3.5" />
            <circle cx="-60" cy="160" r="3" />
            <circle cx="60" cy="160" r="3" />
          </g>

          <g fontFamily="var(--font-mono)" fontSize="7" fill="#6b7280">
            <text x="8" y="-62">PELVIS</text>
            <text x="8" y="58">ROOT</text>
          </g>
        </g>

        {/* CENTER: Coordinate Transform Core */}
        <g transform="translate(440, 200)">
          <text x="0" y="-180" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight={600} fill="#a51c30">COORD TRANSFORM</text>

          {/* Coordinate Axes */}
          <g id="matrix-display" opacity={0}>
            <g strokeWidth="2.5" fill="none" strokeLinecap="round">
              <line x1="0" y1="0" x2="70" y2="0" stroke="#a51c30" markerEnd="url(#arrow)" />
              <line x1="0" y1="0" x2="0" y2="-70" stroke="#22c55e" markerEnd="url(#arrow)" />
              <line x1="0" y1="0" x2="-50" y2="50" stroke="#c6a15b" markerEnd="url(#arrow)" />
            </g>

            <text x="78" y="4" fontFamily="var(--font-mono)" fontSize="8" fill="#a51c30">X</text>
            <text x="-6" y="-76" fontFamily="var(--font-mono)" fontSize="8" fill="#22c55e">Y</text>
            <text x="-58" y="56" fontFamily="var(--font-mono)" fontSize="8" fill="#c6a15b">Z</text>

            <text x="0" y="90" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#6b7280">BVH → SMPL-H</text>
            <text x="0" y="104" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#6b7280">Y-Up • Meters</text>
          </g>

          {/* Matrix Display */}
          <g transform="translate(0, 30)" id="matrix-display">
            <rect x="-75" y="-10" width="150" height="85" rx="6" fill="#0d0e10" stroke="#1a1c20" strokeWidth="1" opacity="0.9" />
            <text x="0" y="-22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight={600} fill="#c6a15b">C_bvh2smpl</text>

            <g fontFamily="var(--font-mono)" fontSize="11" fill="#e5e7eb" textAnchor="middle">
              {MATRIX_C_BVH2SMPL.map((row, ri) =>
                row.map((val, ci) => (
                  <text
                    key={`${ri}-${ci}`}
                    x={ci * 45 - 45}
                    y={ri * 22 + 8}
                    fill={val !== 0 ? "#c6a15b" : "#6b7280"}
                    fontWeight={val !== 0 ? 600 : 400}
                  >
                    {val === -1 ? "-1" : val === 1 ? "1" : "0"}
                  </text>
                ))
              )}
            </g>

            <text x="0" y="78" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#6b7280">[-1 0 0; 0 0 1; 0 1 0]</text>
          </g>

          {/* Root Fix Formula */}
          <g transform="translate(0, 135)" id="matrix-display" opacity={0.8}>
            <rect x="-100" y="-8" width="200" height="30" rx="4" fill="#0d0e10" stroke="#a51c30" strokeWidth="1" opacity="0.7" />
            <text x="0" y="6" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#a51c30">R_root = R_fix @ R_bvh2smpl</text>
            <text x="0" y="20" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#6b7280">Frame-0 inverse applied to all frames</text>
          </g>
        </g>

        {/* RIGHT: SMPL-H Skeleton */}
        <g transform="translate(760, 200)" id="smplh-skeleton">
          <text x="0" y="-180" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight={600} fill="#22c55e">SMPL-H OUTPUT</text>

          <g stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#soft-glow)">
            {SKELETON_SMPLH.map((bone, i) => (
              <line key={i} x1={bone.from[0]} y1={bone.from[1]} x2={bone.to[0]} y2={bone.to[1]} />
            ))}
          </g>

          <g fill="#22c55e" filter="url(#soft-glow)">
            <circle cx="0" cy="0" r="5" />
            <circle cx="0" cy="-55" r="6" />
            <circle cx="-35" cy="-95" r="4" />
            <circle cx="35" cy="-95" r="4" />
            <circle cx="-55" cy="-150" r="3" />
            <circle cx="55" cy="-150" r="3" />
            <circle cx="-65" cy="-195" r="2.5" />
            <circle cx="65" cy="-195" r="2.5" />
            <circle cx="0" cy="55" r="5" />
            <circle cx="-40" cy="100" r="3.5" />
            <circle cx="40" cy="100" r="3.5" />
            <circle cx="-55" cy="145" r="3" />
            <circle cx="55" cy="145" r="3" />
          </g>

          <g fontFamily="var(--font-mono)" fontSize="7" fill="#6b7280">
            <text x="8" y="-57">PELVIS</text>
            <text x="8" y="53">ROOT</text>
          </g>

          {/* Validation badges */}
          <g transform="translate(0, 120)">
            {VALIDATION_LABELS.map((label, i) => (
              <g key={label} className="val-badge" transform={`translate(0, ${i * 22})`} opacity={0}>
                <rect x="-55" y="-8" width="110" height="18" rx="3" fill="#0d0e10" stroke="#1a1c20" strokeWidth="1" />
                <text x="0" y="3" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fontWeight={600} fill="#22c55e">{label}</text>
              </g>
            ))}
          </g>
        </g>

        {/* Bottom metrics */}
        <g transform="translate(440, 370)" textAnchor="middle">
          <text x="-180" y="0" fontFamily="var(--font-mono)" fontSize="18" fontWeight={700} fill="#e5e7eb">LARGE-SCALE</text>
          <text x="-180" y="18" fontFamily="var(--font-sans)" fontSize="8" fontWeight={500} fill="#6b7280" letterSpacing="0.08em">AMASS DATASETS</text>

          <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="18" fontWeight={700} fill="#e5e7eb">21 JOINTS</text>
          <text x="0" y="18" fontFamily="var(--font-sans)" fontSize="8" fontWeight={500} fill="#6b7280" letterSpacing="0.08em">BODY MAPPING</text>

          <text x="180" y="0" fontFamily="var(--font-mono)" fontSize="18" fontWeight={700} fill="#e5e7eb">3 EXPORTS</text>
          <text x="180" y="18" fontFamily="var(--font-sans)" fontSize="8" fontWeight={500} fill="#6b7280" letterSpacing="0.08em">NPZ · BVH · MP4</text>
        </g>

        <g transform="translate(440, 405)" textAnchor="middle">
          <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="7" fill="#3f3f46">Semantic Labs · Nov 2025 – Jan 2026 · Python · NumPy · SciPy · SMPL-H · BVH · AMASS</text>
        </g>
      </svg>
    </figure>
  );
}

export default SemanticLabsDiagram;