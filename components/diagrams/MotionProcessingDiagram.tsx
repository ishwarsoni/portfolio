"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface MotionProcessingDiagramProps {
  className?: string;
  "aria-label"?: string;
}

export function MotionProcessingDiagram({
  className = "",
  "aria-label": ariaLabel = "BVH to SMPL-H motion processing pipeline visualization",
}: MotionProcessingDiagramProps) {
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
      const cards = containerRef.current?.querySelectorAll(".motion-card");
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
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A15B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6A15B]"></span>
          </span>
          <span className="text-[#C6A15B] font-semibold tracking-wider uppercase text-[11px]">
            BVH ➔ SMPL-H KINEMATIC RECONSTRUCTION
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] bg-[#111317] border border-[#C6A15B]/30 text-[#C6A15B]">
            AMASS Dataset
          </span>
        </div>
      </div>

      {/* Grid Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
        {/* Card 1: BVH Input */}
        <div className="motion-card bg-[#07080A] border border-[#80633A]/40 rounded-md p-3.5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#80633A] tracking-wider uppercase">01. BVH HIERARCHY</span>
              <span className="text-[9px] text-[#85858A]">22 Joints</span>
            </div>
            <div className="p-2 rounded bg-[#0D0E11] border border-[#1A1A20] mb-2 text-[10px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#85858A]">Format:</span>
                <span className="text-[#E8E1D2]">Right-Handed, CM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">Channels:</span>
                <span className="text-[#E8E1D2]">6D Rotations</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">Joint Tree:</span>
                <span className="text-[#C6A15B]">Pelvis ➔ Spine ➔ Hips</span>
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] bg-[#14161A] text-[#85858A] border border-[#202228] block text-center">
            Recursive Skeleton Loader
          </span>
        </div>

        {/* Card 2: Transform Core */}
        <div className="motion-card bg-[#07080A] border border-[#A51C30]/40 rounded-md p-3.5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#A51C30] tracking-wider uppercase">02. COORD TRANSFORM</span>
              <span className="text-[9px] text-[#A51C30]">Y-Up Aligned</span>
            </div>
            <div className="p-2 rounded bg-[#0D0E11] border border-[#A51C30]/30 mb-2 text-[10px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#85858A]">Matrix:</span>
                <span className="text-[#A51C30]">C_bvh2smpl</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">Root Fix:</span>
                <span className="text-[#E8E1D2]">Frame 0 Inverse</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">Unit Scale:</span>
                <span className="text-[#E8E1D2]">CM ➔ Meters</span>
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] bg-[#A51C30]/10 text-[#A51C30] border border-[#A51C30]/30 block text-center">
            Quaternion Orientation Fix
          </span>
        </div>

        {/* Card 3: SMPL-H Mesh Output */}
        <div className="motion-card bg-[#07080A] border border-[#2D7D46]/50 rounded-md p-3.5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#2D7D46] tracking-wider uppercase">03. SMPL-H MESH</span>
              <span className="text-[9px] text-[#2D7D46]">✓ Stabilized</span>
            </div>
            <div className="p-2 rounded bg-[#0D0E11] border border-[#1A1A20] mb-2 text-[10px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#85858A]">Grounding:</span>
                <span className="text-[#2D7D46]">Floor Percentile</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">Foot Lock:</span>
                <span className="text-[#2D7D46]">Translation Lock</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">Filter:</span>
                <span className="text-[#E8E1D2]">Savitzky-Golay</span>
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] bg-[#2D7D46]/10 text-[#2D7D46] border border-[#2D7D46]/30 block text-center">
            NPZ / BVH / MP4 Export
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#1A1A20] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#85858A]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[#C6A15B] font-medium">STACK:</span>
          <span>Python</span>
          <span>·</span>
          <span>NumPy</span>
          <span>·</span>
          <span>SciPy</span>
          <span>·</span>
          <span>SMPL-H</span>
          <span>·</span>
          <span>Open3D</span>
        </div>
        <div className="text-[9.5px] text-[#e5e7eb] font-bold">
          21 <span className="text-[#6b7280] font-normal">BODY JOINTS</span>
        </div>
      </div>
    </div>
  );
}

export default MotionProcessingDiagram;