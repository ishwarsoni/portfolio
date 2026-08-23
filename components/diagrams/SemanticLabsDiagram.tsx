"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TechnicalDiagramProps {
  className?: string;
  "aria-label"?: string;
}

const PIPELINE_STAGES = [
  "BVH INPUT",
  "PARSE",
  "JOINT MAP",
  "COORD XFORM",
  "ROOT FIX",
  "SMPL-H",
  "VALIDATE",
];

const VALIDATION_LABELS = [
  "✓ FK VERIFICATION",
  "✓ FLOOR GROUNDING",
  "✓ FOOT-LOCK STABILITY",
  "✓ SAVITZKY-GOLAY SMOOTH",
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
      const matrixDisplay = svg.querySelector("#matrix-display");

      if (!signal || !stages.length) return;

      gsap.set(signal, { opacity: 0, scale: 0.5 });
      if (bvhSkeleton) gsap.set(bvhSkeleton, { opacity: 0.4 });
      if (smplhSkeleton) gsap.set(smplhSkeleton, { opacity: 0 });
      if (matrixDisplay) gsap.set(matrixDisplay, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: isMobile ? 0.4 : 0.5 } });

      tl.to(signal, { opacity: 1, scale: 1, duration: isMobile ? 0.2 : 0.3 });

      stages.forEach((stageEl, i) => {
        const targetX = 80 + i * 120;
        const ring = stageEl.querySelector(".stage-ring");

        if (ring) {
          tl.to(signal, { x: targetX - 80 }, "+=0.04")
            .to(ring, { r: 10, strokeWidth: 3, duration: isMobile ? 0.1 : 0.15 }, "<")
            .to(ring, { r: 7, strokeWidth: 2, duration: isMobile ? 0.15 : 0.2 }, "+=0.02");
        }

        if (i === 3 && matrixDisplay) {
          tl.to(matrixDisplay, { opacity: 1, duration: isMobile ? 0.25 : 0.35 }, "<");
        }
        if (i === 5) {
          if (bvhSkeleton) tl.to(bvhSkeleton, { opacity: 0.25, duration: isMobile ? 0.2 : 0.3 }, "<");
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
        viewBox="0 0 920 480"
        preserveAspectRatio="xMidYMid meet"
        className="w-full max-w-[920px] mx-auto select-none"
        aria-hidden="true"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <defs>
          <linearGradient id="bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#07080a" />
            <stop offset="100%" stopColor="#0b0c0e" />
          </linearGradient>
          <linearGradient id="signal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
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
        <rect width="920" height="480" fill="url(#bg-grad)" rx="8" />
        <rect width="920" height="480" fill="url(#subtle-grid)" opacity="0.3" rx="8" />
        <rect width="920" height="480" fill="none" stroke="#1a1c20" strokeWidth="1" rx="8" />

        {/* Header Title */}
        <g transform="translate(40, 25)">
          <circle cx="6" cy="6" r="4" fill="#22d3ee" filter="url(#soft-glow)" />
          <text x="18" y="9" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="#22d3ee" letterSpacing="0.08em">
            SEMANTIC LABS · NEURAL MOTION RECOVERY (BVH ➔ SMPL-H)
          </text>
        </g>

        {/* Pipeline Flow Stepper Line (y = 55) */}
        <g className="pipeline-flow">
          <path
            d="M 60 55 L 860 55"
            fill="none"
            stroke="#1a1c20"
            strokeWidth="2"
            strokeDasharray="8 6"
            opacity="0.5"
          />

          {PIPELINE_STAGES.map((label, i) => {
            const x = 80 + i * 120;
            return (
              <g key={label} className="pipe-stage" transform={`translate(${x}, 55)`}>
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
            <circle cx="80" cy="55" r="4" fill="url(#signal-grad)" filter="url(#strong-glow)" />
            <circle cx="80" cy="55" r="7" fill="none" stroke="url(#signal-grad)" strokeWidth="1.5" opacity="0.4" />
          </g>
        </g>

        {/* LEFT: Realistic Anatomical BVH Skeleton (Center at X=170, Y=265) */}
        <g transform="translate(170, 265)" id="bvh-skeleton">
          <text x="0" y="-170" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#c6a15b">
            01. BVH HIERARCHY SKELETON
          </text>

          {/* Anatomical Skull */}
          <ellipse cx="0" cy="-168" rx="14" ry="16" fill="none" stroke="#c6a15b" strokeWidth="1.5" filter="url(#soft-glow)" />
          <path d="M -9 -155 L -5 -144 L 5 -144 L 9 -155 Z" fill="none" stroke="#c6a15b" strokeWidth="1.2" />
          <circle cx="-5" cy="-168" r="2.5" fill="#c6a15b" opacity="0.6" />
          <circle cx="5" cy="-168" r="2.5" fill="#c6a15b" opacity="0.6" />

          {/* Cervical & Thoracic Spine */}
          <line x1="0" y1="-144" x2="0" y2="-130" stroke="#c6a15b" strokeWidth="2" />
          <line x1="0" y1="-130" x2="0" y2="-78" stroke="#c6a15b" strokeWidth="2.5" />

          {/* Sternum & Clavicles */}
          <path d="M 0 -130 L 0 -85" stroke="#e8e1d2" strokeWidth="2.5" />
          <path d="M 0 -130 Q -18 -134, -36 -126" fill="none" stroke="#c6a15b" strokeWidth="1.8" />
          <path d="M 0 -130 Q 18 -134, 36 -126" fill="none" stroke="#c6a15b" strokeWidth="1.8" />

          {/* Anatomical Ribcage (Curved Ribs) */}
          <g stroke="#c6a15b" strokeWidth="1.2" fill="none" opacity="0.85">
            <path d="M 0 -124 Q -18 -128, -26 -120 Q -18 -114, 0 -118" />
            <path d="M 0 -124 Q 18 -128, 26 -120 Q 18 -114, 0 -118" />
            <path d="M 0 -116 Q -22 -120, -30 -110 Q -20 -104, 0 -108" />
            <path d="M 0 -116 Q 22 -120, 30 -110 Q 20 -104, 0 -108" />
            <path d="M 0 -108 Q -24 -110, -32 -98 Q -22 -92, 0 -98" />
            <path d="M 0 -108 Q 24 -110, 32 -98 Q 22 -92, 0 -98" />
            <path d="M 0 -100 Q -22 -100, -28 -88 Q -18 -84, 0 -88" />
            <path d="M 0 -100 Q 22 -100, 28 -88 Q 18 -84, 0 -88" />
          </g>

          {/* Pelvic Bowl Girdle */}
          <path
            d="M -30 -42 C -38 -65, -12 -70, 0 -58 C 12 -70, 38 -65, 30 -42 C 22 -24, 12 -25, 0 -30 C -12 -25, -22 -24, -30 -42 Z"
            fill="none"
            stroke="#c6a15b"
            strokeWidth="1.6"
            filter="url(#soft-glow)"
          />
          <path d="M -14 -32 L 0 -42 L 14 -32" fill="none" stroke="#c6a15b" strokeWidth="1.2" />

          {/* Left Arm (Humerus, Radius/Ulna, Hand) */}
          <path d="M -36 -126 L -54 -74" stroke="#c6a15b" strokeWidth="2.2" />
          <path d="M -54 -74 L -70 -22" stroke="#c6a15b" strokeWidth="1.8" />
          <path d="M -52 -74 L -67 -22" stroke="#c6a15b" strokeWidth="1.2" opacity="0.7" />
          {/* Hand Fingers */}
          <path d="M -70 -22 L -78 -10 M -70 -22 L -74 -6 M -70 -22 L -68 -6" stroke="#c6a15b" strokeWidth="1" />

          {/* Right Arm (Humerus, Radius/Ulna, Hand) */}
          <path d="M 36 -126 L 54 -74" stroke="#c6a15b" strokeWidth="2.2" />
          <path d="M 54 -74 L 70 -22" stroke="#c6a15b" strokeWidth="1.8" />
          <path d="M 52 -74 L 67 -22" stroke="#c6a15b" strokeWidth="1.2" opacity="0.7" />
          {/* Hand Fingers */}
          <path d="M 70 -22 L 78 -10 M 70 -22 L 74 -6 M 70 -22 L 68 -6" stroke="#c6a15b" strokeWidth="1" />

          {/* Left Leg (Femur, Patella, Tibia/Fibula, Foot) */}
          <path d="M -22 -35 L -34 45" stroke="#c6a15b" strokeWidth="2.6" />
          <circle cx="-34" cy="45" r="4" fill="#0d0e10" stroke="#c6a15b" strokeWidth="1.5" />
          <path d="M -34 45 L -42 122" stroke="#c6a15b" strokeWidth="2" />
          <path d="M -38 45 L -46 122" stroke="#c6a15b" strokeWidth="1.2" opacity="0.7" />
          <path d="M -42 122 L -58 132 L -34 135 Z" fill="none" stroke="#c6a15b" strokeWidth="1.5" />

          {/* Right Leg (Femur, Patella, Tibia/Fibula, Foot) */}
          <path d="M 22 -35 L 34 45" stroke="#c6a15b" strokeWidth="2.6" />
          <circle cx="34" cy="45" r="4" fill="#0d0e10" stroke="#c6a15b" strokeWidth="1.5" />
          <path d="M 34 45 L 42 122" stroke="#c6a15b" strokeWidth="2" />
          <path d="M 38 45 L 46 122" stroke="#c6a15b" strokeWidth="1.2" opacity="0.7" />
          <path d="M 42 122 L 58 132 L 34 135 Z" fill="none" stroke="#c6a15b" strokeWidth="1.5" />

          {/* 21 SMPL-H Glowing Joint Nodes */}
          <g fill="#c6a15b" filter="url(#soft-glow)">
            <circle cx="0" cy="-45" r="4" />
            <circle cx="-22" cy="-35" r="3.5" />
            <circle cx="22" cy="-35" r="3.5" />
            <circle cx="0" cy="-78" r="3.5" />
            <circle cx="0" cy="-110" r="3.5" />
            <circle cx="0" cy="-130" r="3.5" />
            <circle cx="0" cy="-144" r="3.5" />
            <circle cx="0" cy="-168" r="4" fill="#e8e1d2" />
            <circle cx="-36" cy="-126" r="3.5" />
            <circle cx="36" cy="-126" r="3.5" />
            <circle cx="-54" cy="-74" r="3.5" />
            <circle cx="54" cy="-74" r="3.5" />
            <circle cx="-70" cy="-22" r="3" />
            <circle cx="70" cy="-22" r="3" />
            <circle cx="-34" cy="45" r="3" />
            <circle cx="34" cy="45" r="3" />
            <circle cx="-42" cy="122" r="3" />
            <circle cx="42" cy="122" r="3" />
            <circle cx="-54" cy="132" r="2.5" />
            <circle cx="54" cy="132" r="2.5" />
          </g>

          <text x="0" y="152" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">
            22 Joint Channels (CM)
          </text>
        </g>

        {/* CENTER: Coordinate Basis Transform Core (X=460, Y=265) */}
        <g transform="translate(460, 265)" id="matrix-display">
          <text x="0" y="-170" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#a51c30">
            02. COORD BASIS TRANSFORM CORE
          </text>

          {/* 3D Basis Vectors */}
          <g strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#soft-glow)">
            <line x1="0" y1="-70" x2="48" y2="-70" stroke="#a51c30" />
            <line x1="0" y1="-70" x2="0" y2="-120" stroke="#22c55e" />
            <line x1="0" y1="-70" x2="-38" y2="-32" stroke="#c6a15b" />
          </g>
          <text x="56" y="-66" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill="#a51c30">X (Right)</text>
          <text x="-4" y="-126" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill="#22c55e">Y (Up)</text>
          <text x="-48" y="-24" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill="#c6a15b">Z (Fwd)</text>

          {/* Matrix Display Box */}
          <g transform="translate(0, -10)">
            <rect x="-85" y="-6" width="170" height="85" rx="5" fill="#0d0e10" stroke="#1a1c20" strokeWidth="1" />
            <text x="0" y="14" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" fill="#c6a15b">
              C_bvh2smpl Matrix
            </text>

            <g fontFamily="var(--font-mono)" fontSize="11" fill="#e5e7eb" textAnchor="middle">
              <text x="-45" y="38" fill="#c6a15b" fontWeight="700">-1</text>
              <text x="0" y="38" fill="#6b7280">0</text>
              <text x="45" y="38" fill="#6b7280">0</text>

              <text x="-45" y="56" fill="#6b7280">0</text>
              <text x="0" y="56" fill="#6b7280">0</text>
              <text x="45" y="56" fill="#22c55e" fontWeight="700">1</text>

              <text x="-45" y="74" fill="#6b7280">0</text>
              <text x="0" y="74" fill="#a51c30" fontWeight="700">1</text>
              <text x="45" y="74" fill="#6b7280">0</text>
            </g>
          </g>

          {/* Formula Card */}
          <g transform="translate(0, 95)">
            <rect x="-105" y="-6" width="210" height="32" rx="4" fill="#0d0e10" stroke="#a51c30" strokeWidth="1" />
            <text x="0" y="10" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="600" fill="#a51c30">
              R_root = R_fix @ R_bvh2smpl
            </text>
            <text x="0" y="22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="#85858A">
              Frame-0 Inverse Auto Orientation
            </text>
          </g>
        </g>

        {/* RIGHT: Realistic Anatomical SMPL-H Mesh Skeleton (Center at X=750, Y=265) */}
        <g transform="translate(750, 265)" id="smplh-skeleton">
          <text x="0" y="-170" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#22c55e">
            03. SMPL-H KINEMATIC MESH
          </text>

          {/* Anatomical Skull */}
          <ellipse cx="0" cy="-168" rx="14" ry="16" fill="none" stroke="#22c55e" strokeWidth="1.5" filter="url(#soft-glow)" />
          <path d="M -9 -155 L -5 -144 L 5 -144 L 9 -155 Z" fill="none" stroke="#22c55e" strokeWidth="1.2" />
          <circle cx="-5" cy="-168" r="2.5" fill="#22c55e" opacity="0.6" />
          <circle cx="5" cy="-168" r="2.5" fill="#22c55e" opacity="0.6" />

          {/* Cervical & Thoracic Spine */}
          <line x1="0" y1="-144" x2="0" y2="-130" stroke="#22c55e" strokeWidth="2" />
          <line x1="0" y1="-130" x2="0" y2="-78" stroke="#22c55e" strokeWidth="2.5" />

          {/* Sternum & Clavicles */}
          <path d="M 0 -130 L 0 -85" stroke="#e8e1d2" strokeWidth="2.5" />
          <path d="M 0 -130 Q -18 -134, -36 -126" fill="none" stroke="#22c55e" strokeWidth="1.8" />
          <path d="M 0 -130 Q 18 -134, 36 -126" fill="none" stroke="#22c55e" strokeWidth="1.8" />

          {/* Anatomical Ribcage */}
          <g stroke="#22c55e" strokeWidth="1.2" fill="none" opacity="0.85">
            <path d="M 0 -124 Q -18 -128, -26 -120 Q -18 -114, 0 -118" />
            <path d="M 0 -124 Q 18 -128, 26 -120 Q 18 -114, 0 -118" />
            <path d="M 0 -116 Q -22 -120, -30 -110 Q -20 -104, 0 -108" />
            <path d="M 0 -116 Q 22 -120, 30 -110 Q 20 -104, 0 -108" />
            <path d="M 0 -108 Q -24 -110, -32 -98 Q -22 -92, 0 -98" />
            <path d="M 0 -108 Q 24 -110, 32 -98 Q 22 -92, 0 -98" />
            <path d="M 0 -100 Q -22 -100, -28 -88 Q -18 -84, 0 -88" />
            <path d="M 0 -100 Q 22 -100, 28 -88 Q 18 -84, 0 -88" />
          </g>

          {/* Pelvic Bowl Girdle */}
          <path
            d="M -30 -42 C -38 -65, -12 -70, 0 -58 C 12 -70, 38 -65, 30 -42 C 22 -24, 12 -25, 0 -30 C -12 -25, -22 -24, -30 -42 Z"
            fill="none"
            stroke="#22c55e"
            strokeWidth="1.6"
            filter="url(#soft-glow)"
          />
          <path d="M -14 -32 L 0 -42 L 14 -32" fill="none" stroke="#22c55e" strokeWidth="1.2" />

          {/* Left Arm */}
          <path d="M -36 -126 L -54 -74" stroke="#22c55e" strokeWidth="2.2" />
          <path d="M -54 -74 L -70 -22" stroke="#22c55e" strokeWidth="1.8" />
          <path d="M -52 -74 L -67 -22" stroke="#22c55e" strokeWidth="1.2" opacity="0.7" />
          <path d="M -70 -22 L -78 -10 M -70 -22 L -74 -6 M -70 -22 L -68 -6" stroke="#22c55e" strokeWidth="1" />

          {/* Right Arm */}
          <path d="M 36 -126 L 54 -74" stroke="#22c55e" strokeWidth="2.2" />
          <path d="M 54 -74 L 70 -22" stroke="#22c55e" strokeWidth="1.8" />
          <path d="M 52 -74 L 67 -22" stroke="#22c55e" strokeWidth="1.2" opacity="0.7" />
          <path d="M 70 -22 L 78 -10 M 70 -22 L 74 -6 M 70 -22 L 68 -6" stroke="#22c55e" strokeWidth="1" />

          {/* Left Leg */}
          <path d="M -22 -35 L -34 45" stroke="#22c55e" strokeWidth="2.6" />
          <circle cx="-34" cy="45" r="4" fill="#0d0e10" stroke="#22c55e" strokeWidth="1.5" />
          <path d="M -34 45 L -42 122" stroke="#22c55e" strokeWidth="2" />
          <path d="M -38 45 L -46 122" stroke="#22c55e" strokeWidth="1.2" opacity="0.7" />
          <path d="M -42 122 L -58 132 L -34 135 Z" fill="none" stroke="#22c55e" strokeWidth="1.5" />

          {/* Right Leg */}
          <path d="M 22 -35 L 34 45" stroke="#22c55e" strokeWidth="2.6" />
          <circle cx="34" cy="45" r="4" fill="#0d0e10" stroke="#22c55e" strokeWidth="1.5" />
          <path d="M 34 45 L 42 122" stroke="#22c55e" strokeWidth="2" />
          <path d="M 38 45 L 46 122" stroke="#22c55e" strokeWidth="1.2" opacity="0.7" />
          <path d="M 42 122 L 58 132 L 34 135 Z" fill="none" stroke="#22c55e" strokeWidth="1.5" />

          {/* 21 SMPL-H Glowing Joint Nodes */}
          <g fill="#22c55e" filter="url(#soft-glow)">
            <circle cx="0" cy="-45" r="4" />
            <circle cx="-22" cy="-35" r="3.5" />
            <circle cx="22" cy="-35" r="3.5" />
            <circle cx="0" cy="-78" r="3.5" />
            <circle cx="0" cy="-110" r="3.5" />
            <circle cx="0" cy="-130" r="3.5" />
            <circle cx="0" cy="-144" r="3.5" />
            <circle cx="0" cy="-168" r="4" fill="#e8e1d2" />
            <circle cx="-36" cy="-126" r="3.5" />
            <circle cx="36" cy="-126" r="3.5" />
            <circle cx="-54" cy="-74" r="3.5" />
            <circle cx="54" cy="-74" r="3.5" />
            <circle cx="-70" cy="-22" r="3" />
            <circle cx="70" cy="-22" r="3" />
            <circle cx="-34" cy="45" r="3" />
            <circle cx="34" cy="45" r="3" />
            <circle cx="-42" cy="122" r="3" />
            <circle cx="42" cy="122" r="3" />
            <circle cx="-54" cy="132" r="2.5" />
            <circle cx="54" cy="132" r="2.5" />
          </g>

          {/* Validation Badges Overlay */}
          <g transform="translate(0, 142)">
            {VALIDATION_LABELS.map((label, i) => (
              <g key={label} className="val-badge" transform={`translate(0, ${i * 18 - 25})`} opacity={0}>
                <rect x="-65" y="-7" width="130" height="15" rx="3" fill="#0d0e10" stroke="#22c55e" strokeWidth="0.8" opacity="0.9" />
                <text x="0" y="3" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fontWeight="600" fill="#22c55e">
                  {label}
                </text>
              </g>
            ))}
          </g>
        </g>

        {/* BOTTOM METRICS BAR (Y = 445) */}
        <g transform="translate(460, 445)" textAnchor="middle">
          <text x="-260" y="0" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="#e5e7eb">LARGE-SCALE</text>
          <text x="-260" y="13" fontFamily="var(--font-sans)" fontSize="7.5" fontWeight="500" fill="#85858A" letterSpacing="0.08em">AMASS DATASETS</text>

          <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="#e5e7eb">21 JOINTS</text>
          <text x="0" y="13" fontFamily="var(--font-sans)" fontSize="7.5" fontWeight="500" fill="#85858A" letterSpacing="0.08em">BODY KINEMATIC MAPPING</text>

          <text x="260" y="0" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="#e5e7eb">3 EXPORT FORMATS</text>
          <text x="260" y="13" fontFamily="var(--font-sans)" fontSize="7.5" fontWeight="500" fill="#85858A" letterSpacing="0.08em">NPZ · BVH · MP4</text>
        </g>
      </svg>
    </figure>
  );
}

export default SemanticLabsDiagram;