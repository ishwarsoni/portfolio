"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TechnicalDiagramProps {
  className?: string;
  "aria-label"?: string;
}

const SKELETON_BVH = [
  { from: [0, 0], to: [0, -45] },
  { from: [0, -45], to: [-30, -75] },
  { from: [0, -45], to: [30, -75] },
  { from: [-30, -75], to: [-45, -120] },
  { from: [30, -75], to: [45, -120] },
  { from: [-45, -120], to: [-55, -155] },
  { from: [45, -120], to: [55, -155] },
  { from: [0, 0], to: [0, 45] },
  { from: [0, 45], to: [-35, 80] },
  { from: [0, 45], to: [35, 80] },
  { from: [-35, 80], to: [-45, 115] },
  { from: [35, 80], to: [45, 115] },
];

const SKELETON_SMPLH = [
  { from: [0, 0], to: [0, -40] },
  { from: [0, -40], to: [-25, -70] },
  { from: [0, -40], to: [25, -70] },
  { from: [-25, -70], to: [-40, -110] },
  { from: [25, -70], to: [40, -110] },
  { from: [-40, -110], to: [-50, -145] },
  { from: [40, -110], to: [50, -145] },
  { from: [0, 0], to: [0, 40] },
  { from: [0, 40], to: [-30, 75] },
  { from: [0, 40], to: [30, 75] },
  { from: [-30, 75], to: [-40, 110] },
  { from: [30, 75], to: [40, 110] },
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

export function SemanticLabsDiagram({
  className = "",
  "aria-label": ariaLabel = "Semantic Labs motion processing pipeline: BVH to SMPL-H reconstruction",
}: TechnicalDiagramProps) {
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
          tl.to(signal, { x: cx }, "+=0.05")
            .to(ring, { r: 10, strokeWidth: 3, duration: isMobile ? 0.1 : 0.15 }, "<")
            .to(ring, { r: 7, strokeWidth: 2, duration: isMobile ? 0.15 : 0.2 }, "+=0.03");
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
    <figure className={`w-full overflow-hidden ${className}`} aria-label={ariaLabel} role="img">
      <svg
        ref={containerRef}
        viewBox="0 0 880 440"
        preserveAspectRatio="xMidYMid meet"
        className="w-full max-w-[880px] mx-auto select-none"
        aria-hidden="true"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <defs>
          <linearGradient id="bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#07080a" />
            <stop offset="100%" stopColor="#0b0c0e" />
          </linearGradient>
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c6a15b" />
            <stop offset="100%" stopColor="#80633a" />
          </linearGradient>
          <linearGradient id="signal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
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

        {/* Frame */}
        <rect width="880" height="440" fill="url(#bg-grad)" rx="8" />
        <rect width="880" height="440" fill="url(#subtle-grid)" opacity="0.3" rx="8" />
        <rect width="880" height="440" fill="none" stroke="#1a1c20" strokeWidth="1" rx="8" />

        {/* Pipeline flow line */}
        <g className="pipeline-flow">
          <path
            d="M 70 45 L 810 45"
            fill="none"
            stroke="#1a1c20"
            strokeWidth="2"
            strokeDasharray="8 6"
            opacity="0.4"
          />

          {PIPELINE_STAGES.map((label, i) => {
            const x = 90 + i * 110;
            return (
              <g key={label} className="pipe-stage" transform={`translate(${x}, 45)`}>
                <circle
                  className="stage-ring"
                  cx="0"
                  cy="0"
                  r="7"
                  fill="#0d0e10"
                  stroke="#2a2d34"
                  strokeWidth="2"
                  filter="url(#soft-glow)"
                />
                <text
                  x="0"
                  y="20"
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="8.5"
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
            <circle cx="90" cy="45" r="4" fill="url(#signal-grad)" filter="url(#strong-glow)" />
            <circle cx="90" cy="45" r="7" fill="none" stroke="url(#signal-grad)" strokeWidth="1.5" opacity="0.4" />
          </g>
        </g>

        {/* LEFT: BVH Skeleton */}
        <g transform="translate(130, 220)" id="bvh-skeleton">
          <text x="0" y="-130" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight={600} fill="#c6a15b">BVH INPUT SKELETON</text>

          {/* Main skeleton */}
          <g stroke="#c6a15b" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#soft-glow)">
            {SKELETON_BVH.map((bone, i) => (
              <line key={i} x1={bone.from[0]} y1={bone.from[1]} x2={bone.to[0]} y2={bone.to[1]} />
            ))}
          </g>

          <g fill="#c6a15b" filter="url(#soft-glow)">
            <circle cx="0" cy="0" r="4" />
            <circle cx="0" cy="-45" r="5" />
            <circle cx="-30" cy="-75" r="3.5" />
            <circle cx="30" cy="-75" r="3.5" />
            <circle cx="-45" cy="-120" r="2.5" />
            <circle cx="45" cy="-120" r="2.5" />
            <circle cx="0" cy="45" r="4" />
            <circle cx="-35" cy="80" r="3" />
            <circle cx="35" cy="80" r="3" />
          </g>

          <g fontFamily="var(--font-mono)" fontSize="7" fill="#6b7280">
            <text x="8" y="-47">PELVIS</text>
            <text x="8" y="43">ROOT</text>
          </g>
        </g>

        {/* CENTER: Coordinate Transform Core */}
        <g transform="translate(440, 220)">
          <text x="0" y="-130" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight={600} fill="#a51c30">COORD TRANSFORM CORE</text>

          {/* Coordinate Axes */}
          <g id="matrix-display" opacity={0}>
            <g strokeWidth="2" fill="none" strokeLinecap="round">
              <line x1="0" y1="-30" x2="45" y2="-30" stroke="#a51c30" />
              <line x1="0" y1="-30" x2="0" y2="-75" stroke="#22c55e" />
              <line x1="0" y1="-30" x2="-35" y2="5" stroke="#c6a15b" />
            </g>

            <text x="52" y="-27" fontFamily="var(--font-mono)" fontSize="8" fill="#a51c30">X</text>
            <text x="-4" y="-80" fontFamily="var(--font-mono)" fontSize="8" fill="#22c55e">Y</text>
            <text x="-42" y="10" fontFamily="var(--font-mono)" fontSize="8" fill="#c6a15b">Z</text>
          </g>

          {/* Matrix Display */}
          <g transform="translate(0, 10)" id="matrix-display">
            <rect x="-70" y="-8" width="140" height="75" rx="4" fill="#0d0e10" stroke="#1a1c20" strokeWidth="1" opacity="0.95" />
            <text x="0" y="-16" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight={600} fill="#c6a15b">C_bvh2smpl Matrix</text>

            <g fontFamily="var(--font-mono)" fontSize="10" fill="#e5e7eb" textAnchor="middle">
              {MATRIX_C_BVH2SMPL.map((row, ri) =>
                row.map((val, ci) => (
                  <text
                    key={`${ri}-${ci}`}
                    x={ci * 40 - 40}
                    y={ri * 18 + 10}
                    fill={val !== 0 ? "#c6a15b" : "#6b7280"}
                    fontWeight={val !== 0 ? 600 : 400}
                  >
                    {val === -1 ? "-1" : val === 1 ? "1" : "0"}
                  </text>
                ))
              )}
            </g>

            <text x="0" y="74" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#6b7280">[-1 0 0; 0 0 1; 0 1 0]</text>
          </g>

          {/* Root Fix Formula */}
          <g transform="translate(0, 105)" id="matrix-display" opacity={0.9}>
            <rect x="-95" y="-6" width="190" height="26" rx="4" fill="#0d0e10" stroke="#a51c30" strokeWidth="1" />
            <text x="0" y="6" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#a51c30">R_root = R_fix @ R_bvh2smpl</text>
            <text x="0" y="16" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#6b7280">Frame-0 inverse auto apply</text>
          </g>
        </g>

        {/* RIGHT: SMPL-H Skeleton */}
        <g transform="translate(750, 220)" id="smplh-skeleton">
          <text x="0" y="-130" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight={600} fill="#22c55e">SMPL-H OUTPUT</text>

          <g stroke="#22c55e" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#soft-glow)">
            {SKELETON_SMPLH.map((bone, i) => (
              <line key={i} x1={bone.from[0]} y1={bone.from[1]} x2={bone.to[0]} y2={bone.to[1]} />
            ))}
          </g>

          <g fill="#22c55e" filter="url(#soft-glow)">
            <circle cx="0" cy="0" r="4" />
            <circle cx="0" cy="-40" r="5" />
            <circle cx="-25" cy="-70" r="3.5" />
            <circle cx="25" cy="-70" r="3.5" />
            <circle cx="-40" cy="-110" r="2.5" />
            <circle cx="40" cy="-110" r="2.5" />
            <circle cx="0" cy="40" r="4" />
            <circle cx="-30" cy="75" r="3" />
            <circle cx="30" cy="75" r="3" />
          </g>

          <g fontFamily="var(--font-mono)" fontSize="7" fill="#6b7280">
            <text x="8" y="-42">PELVIS</text>
            <text x="8" y="38">ROOT</text>
          </g>

          {/* Validation badges */}
          <g transform="translate(0, 95)">
            {VALIDATION_LABELS.map((label, i) => (
              <g key={label} className="val-badge" transform={`translate(0, ${i * 18})`} opacity={0}>
                <rect x="-48" y="-6" width="96" height="15" rx="3" fill="#0d0e10" stroke="#1a1c20" strokeWidth="1" />
                <text x="0" y="3" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fontWeight={600} fill="#22c55e">{label}</text>
              </g>
            ))}
          </g>
        </g>

        {/* Bottom metrics */}
        <g transform="translate(440, 360)" textAnchor="middle">
          <text x="-180" y="0" fontFamily="var(--font-mono)" fontSize="15" fontWeight={700} fill="#e5e7eb">LARGE-SCALE</text>
          <text x="-180" y="14" fontFamily="var(--font-sans)" fontSize="7.5" fontWeight={500} fill="#6b7280" letterSpacing="0.08em">AMASS DATASETS</text>

          <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="15" fontWeight={700} fill="#e5e7eb">21 JOINTS</text>
          <text x="0" y="14" fontFamily="var(--font-sans)" fontSize="7.5" fontWeight={500} fill="#6b7280" letterSpacing="0.08em">BODY MAPPING</text>

          <text x="180" y="0" fontFamily="var(--font-mono)" fontSize="18" fontWeight={700} fill="#e5e7eb">3 EXPORTS</text>
          <text x="180" y="14" fontFamily="var(--font-sans)" fontSize="7.5" fontWeight={500} fill="#6b7280" letterSpacing="0.08em">NPZ · BVH · MP4</text>
        </g>

        <g transform="translate(440, 400)" textAnchor="middle">
          <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="7.5" fill="#3f3f46">Semantic Labs · Python · NumPy · SciPy · SMPL-H · BVH · AMASS</text>
        </g>
      </svg>
    </figure>
  );
}

export default SemanticLabsDiagram;