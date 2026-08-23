"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface DatacleanrDiagramProps {
  className?: string;
  "aria-label"?: string;
}

export function DatacleanrDiagram({
  className = "",
  "aria-label": ariaLabel = "Datacleanr ML data cleaning pipeline visualization",
}: DatacleanrDiagramProps) {
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
      const cards = containerRef.current?.querySelectorAll(".datacleanr-card");
      const enginePills = containerRef.current?.querySelectorAll(".datacleanr-pill");

      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 15, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" }
        );
      }

      if (enginePills && enginePills.length) {
        gsap.fromTo(
          enginePills,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.35, stagger: 0.08, delay: 0.4, ease: "back.out(1.4)" }
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
            DATACLEANR ENGINE v1.2
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] bg-[#111317] border border-[#a855f7]/30 text-[#a855f7]">
            Automated Pipeline
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-[#111317] border border-[#22d3ee]/30 text-[#22d3ee] hidden sm:inline-block">
            0% Leakage
          </span>
        </div>
      </div>

      {/* Main Split Grid: Input vs Engine vs Output */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
        {/* Card 1: Dirty Raw Input */}
        <div className="datacleanr-card bg-[#07080A] border border-[#f87171]/40 rounded-md p-3.5 flex flex-col justify-between shadow-lg shadow-[#f87171]/5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#f87171] tracking-wider uppercase">01. UNCLEANED INPUT</span>
              <span className="text-[9px] text-[#f87171]">3 Issues Detected</span>
            </div>
            
            {/* Raw DataFrame Mini Table */}
            <div className="overflow-hidden rounded border border-[#1A1A20] bg-[#0D0E11] text-[9.5px] mb-2">
              <div className="grid grid-cols-3 bg-[#14161A] p-1.5 font-bold text-[#a855f7] border-b border-[#1A1A20]">
                <span>age</span>
                <span>income</span>
                <span>target</span>
              </div>
              <div className="grid grid-cols-3 p-1.5 border-b border-[#1A1A20]/50 text-[#9ca3af]">
                <span>25</span>
                <span>$45,000</span>
                <span className="text-emerald-400">1</span>
              </div>
              <div className="grid grid-cols-3 p-1.5 border-b border-[#1A1A20]/50 bg-[#371d1d]/30 text-[#f87171]">
                <span className="font-semibold">NULL ⚠️</span>
                <span>$52,000</span>
                <span>0</span>
              </div>
              <div className="grid grid-cols-3 p-1.5 bg-[#371d1d]/30 text-[#f87171]">
                <span>42</span>
                <span className="font-semibold">NULL ⚠️</span>
                <span>1</span>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <span className="px-2 py-0.5 rounded text-[9px] bg-[#f87171]/10 text-[#f87171] border border-[#f87171]/30 block text-center">
              Missing Values & Outlier Skew
            </span>
          </div>
        </div>

        {/* Card 2: Cleaning Engine Modules */}
        <div className="datacleanr-card bg-[#07080A] border border-[#22d3ee]/40 rounded-md p-3.5 flex flex-col justify-between shadow-lg shadow-[#22d3ee]/5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#22d3ee] tracking-wider uppercase">02. CLEANING ENGINE</span>
              <span className="text-[9px] text-[#22d3ee]">Active</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <div className="datacleanr-pill p-1.5 rounded bg-[#0D0E11] border border-[#22d3ee]/30 text-[9.5px]">
                <p className="text-[#e5e7eb] font-sans font-medium">Imputation</p>
                <p className="text-[8px] text-[#6b7280]">Median / Mode</p>
              </div>
              <div className="datacleanr-pill p-1.5 rounded bg-[#0D0E11] border border-[#22d3ee]/30 text-[9.5px]">
                <p className="text-[#e5e7eb] font-sans font-medium">Outlier Clip</p>
                <p className="text-[8px] text-[#6b7280]">IQR Bounds</p>
              </div>
              <div className="datacleanr-pill p-1.5 rounded bg-[#0D0E11] border border-[#22d3ee]/30 text-[9.5px]">
                <p className="text-[#e5e7eb] font-sans font-medium">Skew Correct</p>
                <p className="text-[8px] text-[#6b7280]">Yeo-Johnson</p>
              </div>
              <div className="datacleanr-pill p-1.5 rounded bg-[#0D0E11] border border-[#22d3ee]/30 text-[9.5px]">
                <p className="text-[#e5e7eb] font-sans font-medium">Features</p>
                <p className="text-[8px] text-[#6b7280]">Variance Threshold</p>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <span className="px-2 py-0.5 rounded text-[9px] bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/30 block text-center">
              Deterministic & Reproducible
            </span>
          </div>
        </div>

        {/* Card 3: Clean Validated Output */}
        <div className="datacleanr-card bg-[#07080A] border border-[#10b981]/40 rounded-md p-3.5 flex flex-col justify-between shadow-lg shadow-[#10b981]/5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#10b981] tracking-wider uppercase">03. CLEAN OUTPUT</span>
              <span className="text-[9px] text-[#10b981]">✓ Verified</span>
            </div>

            {/* Clean DataFrame Mini Table */}
            <div className="overflow-hidden rounded border border-[#1A1A20] bg-[#0D0E11] text-[9.5px] mb-2">
              <div className="grid grid-cols-3 bg-[#14161A] p-1.5 font-bold text-[#a855f7] border-b border-[#1A1A20]">
                <span>age</span>
                <span>income</span>
                <span>target</span>
              </div>
              <div className="grid grid-cols-3 p-1.5 border-b border-[#1A1A20]/50 text-[#9ca3af]">
                <span>25</span>
                <span>$45,000</span>
                <span className="text-emerald-400">1</span>
              </div>
              <div className="grid grid-cols-3 p-1.5 border-b border-[#1A1A20]/50 text-[#9ca3af]">
                <span className="text-emerald-400 font-medium">31 (Imp)</span>
                <span>$52,000</span>
                <span className="text-emerald-400">0</span>
              </div>
              <div className="grid grid-cols-3 p-1.5 text-[#9ca3af]">
                <span>42</span>
                <span className="text-emerald-400 font-medium">$41k (Imp)</span>
                <span className="text-emerald-400">1</span>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <span className="px-2 py-0.5 rounded text-[9px] bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 block text-center">
              Target Integrity & Schema Preserved
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Performance Metrics & Tech Footer */}
      <div className="pt-3 border-t border-[#1A1A20] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#85858A]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[#22d3ee] font-medium">STACK:</span>
          <span>Python</span>
          <span>·</span>
          <span>Pandas</span>
          <span>·</span>
          <span>NumPy</span>
          <span>·</span>
          <span>Scikit-learn</span>
          <span>·</span>
          <span>Jupyter</span>
        </div>

        <div className="flex items-center gap-3 text-[9.5px]">
          <span className="text-[#e5e7eb] font-bold">50 <span className="text-[#6b7280] font-normal">DATASETS</span></span>
          <span className="text-[#e5e7eb] font-bold">0 <span className="text-[#6b7280] font-normal">FAILURES</span></span>
        </div>
      </div>
    </div>
  );
}

export default DatacleanrDiagram;