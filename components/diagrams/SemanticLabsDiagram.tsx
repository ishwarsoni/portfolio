"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface SemanticLabsDiagramProps {
  className?: string;
  "aria-label"?: string;
}

export function SemanticLabsDiagram({
  className = "",
  "aria-label": ariaLabel = "Semantic Labs motion processing pipeline: BVH to SMPL-H reconstruction",
}: SemanticLabsDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".semantic-card");
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 15, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`w-full bg-[#0B0C0E]/90 border border-[#1A1A20] rounded-lg p-4 md:p-6 text-left font-mono select-none overflow-hidden ${className}`}
      aria-label={ariaLabel}
      role="img"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1A1A20] text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-[#22d3ee] font-semibold tracking-wider uppercase text-[11px]">
            SEMANTIC LABS NEURAL MOTION RECOVERY
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] bg-[#111317] border border-[#a855f7]/30 text-[#a855f7]">
            Python · SMPL-H
          </span>
        </div>
      </div>

      {/* Grid Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
        {/* Card 1: Raw Motion Stream */}
        <div className="semantic-card bg-[#07080A] border border-[#c6a15b]/40 rounded-md p-3.5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#c6a15b] tracking-wider uppercase">01. BVH MOTION INPUT</span>
              <span className="text-[9px] text-[#85858A]">Mocap Stream</span>
            </div>
            <div className="p-2 rounded bg-[#0D0E11] border border-[#1A1A20] mb-2 text-[10px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#85858A]">Source:</span>
                <span className="text-[#E8E1D2]">AMASS Datasets</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">Rotation:</span>
                <span className="text-[#c6a15b]">Euler Channel Indices</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">Parser:</span>
                <span className="text-[#E8E1D2]">Recursive Node Parse</span>
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] bg-[#14161A] text-[#85858A] border border-[#202228] block text-center">
            21 Joint Body Map
          </span>
        </div>

        {/* Card 2: Kinematic Transform Core */}
        <div className="semantic-card bg-[#07080A] border border-[#a51c30]/40 rounded-md p-3.5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#a51c30] tracking-wider uppercase">02. KINEMATIC CORE</span>
              <span className="text-[9px] text-[#a51c30]">Coordinate Alignment</span>
            </div>
            <div className="p-2 rounded bg-[#0D0E11] border border-[#a51c30]/30 mb-2 text-[10px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#85858A]">Matrix:</span>
                <span className="text-[#a51c30]">C_bvh2smpl</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">Inverse:</span>
                <span className="text-[#E8E1D2]">R_root = R_fix @ R_bvh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">Units:</span>
                <span className="text-[#E8E1D2]">Meters / Y-Up</span>
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] bg-[#a51c30]/10 text-[#a51c30] border border-[#a51c30]/30 block text-center">
            Frame-0 Auto Orientation
          </span>
        </div>

        {/* Card 3: SMPL-H Mesh Reconstruction */}
        <div className="semantic-card bg-[#07080A] border border-[#22c55e]/40 rounded-md p-3.5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#22c55e] tracking-wider uppercase">03. SMPL-H RECONSTRUCTION</span>
              <span className="text-[9px] text-[#22c55e]">✓ Verified</span>
            </div>
            <div className="p-2 rounded bg-[#0D0E11] border border-[#1A1A20] mb-2 text-[10px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#85858A]">Forward Kin:</span>
                <span className="text-[#22c55e]">FK Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">Grounding:</span>
                <span className="text-[#22c55e]">Floor Detection</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">Foot Lock:</span>
                <span className="text-[#22c55e]">Stabilized</span>
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 block text-center">
            NPZ · BVH · MP4 Render
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#1A1A20] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#85858A]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[#22d3ee] font-medium">STACK:</span>
          <span>Python</span>
          <span>·</span>
          <span>NumPy</span>
          <span>·</span>
          <span>SciPy</span>
          <span>·</span>
          <span>SMPL-H</span>
          <span>·</span>
          <span>AMASS</span>
        </div>
        <div className="text-[9.5px] text-[#e5e7eb] font-bold">
          LARGE-SCALE <span className="text-[#6b7280] font-normal">DATASETS</span>
        </div>
      </div>
    </div>
  );
}

export default SemanticLabsDiagram;