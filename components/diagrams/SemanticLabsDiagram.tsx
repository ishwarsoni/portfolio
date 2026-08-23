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

// BVH Mocap Kinematic Tree Joints (22 Joints + EndSites)
const BVH_JOINTS = [
  { id: "root", name: "ROOT_PELVIS", x: 0, y: 45, type: "root" },
  { id: "spine1", name: "SPINE1", x: 0, y: 15, type: "spine" },
  { id: "spine2", name: "SPINE2", x: 0, y: -15, type: "spine" },
  { id: "spine3", name: "SPINE3", x: 0, y: -45, type: "spine" },
  { id: "neck", name: "NECK", x: 0, y: -75, type: "neck" },
  { id: "head", name: "HEAD_END", x: 0, y: -110, type: "head" },

  // Left Arm Chain
  { id: "l_collar", name: "L_COLLAR", x: -22, y: -75, type: "arm" },
  { id: "l_shoulder", name: "L_SHOULDER", x: -55, y: -75, type: "arm" },
  { id: "l_elbow", name: "L_ELBOW", x: -88, y: -35, type: "arm" },
  { id: "l_wrist", name: "L_WRIST", x: -115, y: 5, type: "arm" },
  { id: "l_hand", name: "L_HAND_END", x: -130, y: 28, type: "arm" },

  // Right Arm Chain
  { id: "r_collar", name: "R_COLLAR", x: 22, y: -75, type: "arm" },
  { id: "r_shoulder", name: "R_SHOULDER", x: 55, y: -75, type: "arm" },
  { id: "r_elbow", name: "R_ELBOW", x: 88, y: -35, type: "arm" },
  { id: "r_wrist", name: "R_WRIST", x: 115, y: 5, type: "arm" },
  { id: "r_hand", name: "R_HAND_END", x: 130, y: 28, type: "arm" },

  // Left Leg Chain
  { id: "l_hip", name: "L_HIP", x: -28, y: 55, type: "leg" },
  { id: "l_knee", name: "L_KNEE", x: -50, y: 118, type: "leg" },
  { id: "l_ankle", name: "L_ANKLE", x: -68, y: 175, type: "leg" },
  { id: "l_toe", name: "L_TOE_END", x: -88, y: 192, type: "leg" },

  // Right Leg Chain
  { id: "r_hip", name: "R_HIP", x: 28, y: 55, type: "leg" },
  { id: "r_knee", name: "R_KNEE", x: 50, y: 118, type: "leg" },
  { id: "r_ankle", name: "R_ANKLE", x: 68, y: 175, type: "leg" },
  { id: "r_toe", name: "R_TOE_END", x: 88, y: 192, type: "leg" },
];

const BVH_BONES = [
  // Spine
  ["root", "spine1"],
  ["spine1", "spine2"],
  ["spine2", "spine3"],
  ["spine3", "neck"],
  ["neck", "head"],

  // Left Arm
  ["neck", "l_collar"],
  ["l_collar", "l_shoulder"],
  ["l_shoulder", "l_elbow"],
  ["l_elbow", "l_wrist"],
  ["l_wrist", "l_hand"],

  // Right Arm
  ["neck", "r_collar"],
  ["r_collar", "r_shoulder"],
  ["r_shoulder", "r_elbow"],
  ["r_elbow", "r_wrist"],
  ["r_wrist", "r_hand"],

  // Left Leg
  ["root", "l_hip"],
  ["l_hip", "l_knee"],
  ["l_knee", "l_ankle"],
  ["l_ankle", "l_toe"],

  // Right Leg
  ["root", "r_hip"],
  ["r_hip", "r_knee"],
  ["r_knee", "r_ankle"],
  ["r_ankle", "r_toe"],
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
        const targetX = 80 + i * 135;
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

  const jointMap = new Map(BVH_JOINTS.map((j) => [j.id, j]));

  return (
    <figure className={`w-full overflow-hidden ${className}`} aria-label={ariaLabel} role="img">
      <svg
        ref={containerRef}
        viewBox="0 0 980 500"
        preserveAspectRatio="xMidYMid meet"
        className="w-full max-w-[980px] mx-auto select-none"
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

        {/* Outer Frame */}
        <rect width="980" height="500" fill="url(#bg-grad)" rx="8" />
        <rect width="980" height="500" fill="url(#subtle-grid)" opacity="0.3" rx="8" />
        <rect width="980" height="500" fill="none" stroke="#1a1c20" strokeWidth="1" rx="8" />

        {/* Header Bar */}
        <g transform="translate(40, 25)">
          <circle cx="6" cy="6" r="4" fill="#C6A15B" filter="url(#soft-glow)" />
          <text x="18" y="9" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="#C6A15B" letterSpacing="0.08em">
            SEMANTIC LABS · BVH MOCAP SKELETON KINEMATIC PIPELINE (BVH ➔ SMPL-H)
          </text>
        </g>

        {/* Stepper Flow Line (y = 55) */}
        <g className="pipeline-flow">
          <path
            d="M 60 55 L 920 55"
            fill="none"
            stroke="#1a1c20"
            strokeWidth="2"
            strokeDasharray="8 6"
            opacity="0.5"
          />

          {PIPELINE_STAGES.map((label, i) => {
            const x = 80 + i * 135;
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

        {/* LEFT: BVH Mocap Kinematic Tree Skeleton (Center at X=190, Y=240) */}
        <g transform="translate(190, 240)" id="bvh-skeleton">
          <text x="0" y="-140" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">
            01. BVH KINEMATIC TREE
          </text>

          {/* Bone Links */}
          <g stroke="#C6A15B" strokeWidth="2" strokeLinecap="round" opacity="0.9" filter="url(#soft-glow)">
            {BVH_BONES.map(([fromId, toId], i) => {
              const from = jointMap.get(fromId)!;
              const to = jointMap.get(toId)!;
              return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />;
            })}
          </g>

          {/* Joint Nodes */}
          {BVH_JOINTS.map((joint) => (
            <g key={joint.id} transform={`translate(${joint.x}, ${joint.y})`}>
              <circle
                r={joint.type === "root" ? 6 : joint.type === "head" ? 7 : 4}
                fill={joint.type === "root" ? "#A51C30" : joint.type === "head" ? "#E8E1D2" : "#0d0e10"}
                stroke="#C6A15B"
                strokeWidth={1.8}
                filter="url(#soft-glow)"
              />
            </g>
          ))}

          {/* Key Joint Labels */}
          <g fontFamily="var(--font-mono)" fontSize="7.5" fill="#85858A">
            <text x="10" y="48" fill="#A51C30" fontWeight="600">ROOT (0,0,0)</text>
            <text x="10" y="-108" fill="#E8E1D2">HEAD_END</text>
            <text x="-140" y="30">L_HAND</text>
            <text x="135" y="30">R_HAND</text>
            <text x="-95" y="196">L_FOOT</text>
            <text x="95" y="196">R_FOOT</text>
          </g>

          <text x="0" y="218" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#5C4A2E">
            22-Joint BioVision Hierarchy (Euler Rot Channels)
          </text>
        </g>

        {/* CENTER: Coordinate Basis Transform Core (X=490, Y=240) */}
        <g transform="translate(490, 240)" id="matrix-display">
          <text x="0" y="-140" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#A51C30">
            02. BASIS XFORM & ROOT FIX
          </text>

          {/* 3D Basis Vectors */}
          <g strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#soft-glow)">
            <line x1="0" y1="-45" x2="48" y2="-45" stroke="#A51C30" />
            <line x1="0" y1="-45" x2="0" y2="-95" stroke="#22d3ee" />
            <line x1="0" y1="-45" x2="-38" y2="-7" stroke="#C6A15B" />
          </g>
          <text x="56" y="-41" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill="#A51C30">X (Right)</text>
          <text x="-4" y="-101" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill="#22d3ee">Y (Up)</text>
          <text x="-48" y="1" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill="#C6A15B">Z (Fwd)</text>

          {/* Matrix Display Box */}
          <g transform="translate(0, 15)">
            <rect x="-85" y="-6" width="170" height="85" rx="5" fill="#0d0e10" stroke="#1a1c20" strokeWidth="1" />
            <text x="0" y="14" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" fill="#C6A15B">
              C_bvh2smpl Matrix
            </text>

            <g fontFamily="var(--font-mono)" fontSize="11" fill="#e5e7eb" textAnchor="middle">
              <text x="-45" y="38" fill="#C6A15B" fontWeight="700">-1</text>
              <text x="0" y="38" fill="#6b7280">0</text>
              <text x="45" y="38" fill="#6b7280">0</text>

              <text x="-45" y="56" fill="#6b7280">0</text>
              <text x="0" y="56" fill="#6b7280">0</text>
              <text x="45" y="56" fill="#22d3ee" fontWeight="700">1</text>

              <text x="-45" y="74" fill="#6b7280">0</text>
              <text x="0" y="74" fill="#A51C30" fontWeight="700">1</text>
              <text x="45" y="74" fill="#6b7280">0</text>
            </g>
          </g>

          {/* Formula Card */}
          <g transform="translate(0, 120)">
            <rect x="-105" y="-6" width="210" height="32" rx="4" fill="#0d0e10" stroke="#A51C30" strokeWidth="1" />
            <text x="0" y="10" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="600" fill="#A51C30">
              R_root = R_fix @ R_bvh2smpl
            </text>
            <text x="0" y="22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="#85858A">
              Frame-0 Inverse Auto Orientation
            </text>
          </g>
        </g>

        {/* RIGHT: SMPL-H Reconstructed Joint Mesh Skeleton (Center at X=790, Y=240) */}
        <g transform="translate(790, 240)" id="smplh-skeleton">
          <text x="0" y="-140" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#10b981">
            03. SMPL-H RECONSTRUCTION
          </text>

          {/* Bone Links */}
          <g stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" filter="url(#soft-glow)">
            {BVH_BONES.map(([fromId, toId], i) => {
              const from = jointMap.get(fromId)!;
              const to = jointMap.get(toId)!;
              return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />;
            })}
          </g>

          {/* Joint Nodes */}
          {BVH_JOINTS.map((joint) => (
            <g key={joint.id} transform={`translate(${joint.x}, ${joint.y})`}>
              <circle
                r={joint.type === "root" ? 6 : joint.type === "head" ? 7 : 4}
                fill={joint.type === "root" ? "#10b981" : "#0d0e10"}
                stroke="#10b981"
                strokeWidth={1.8}
                filter="url(#soft-glow)"
              />
            </g>
          ))}

          {/* Validation Badges Overlay */}
          <g transform="translate(0, 115)">
            {VALIDATION_LABELS.map((label, i) => (
              <g key={label} className="val-badge" transform={`translate(0, ${i * 18 - 25})`} opacity={0}>
                <rect x="-65" y="-7" width="130" height="15" rx="3" fill="#0d0e10" stroke="#10b981" strokeWidth="0.8" opacity="0.9" />
                <text x="0" y="3" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fontWeight="600" fill="#10b981">
                  {label}
                </text>
              </g>
            ))}
          </g>

          <text x="0" y="218" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#10b981">
            ✓ Verified SMPL-H Body Kinematics
          </text>
        </g>

        {/* BOTTOM METRICS BAR (Y = 465) */}
        <g transform="translate(490, 468)" textAnchor="middle">
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