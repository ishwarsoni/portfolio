"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface OncoLinkDiagramProps {
  className?: string;
  "aria-label"?: string;
}

export function OncoLinkDiagram({
  className = "",
  "aria-label": ariaLabel = "OncoLink AI Clinical Intelligence Platform architecture",
}: OncoLinkDiagramProps) {
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
      const cards = containerRef.current?.querySelectorAll(".oncolink-card");
      const pulseLine = containerRef.current?.querySelector(".oncolink-pulse");
      const badges = containerRef.current?.querySelectorAll(".oncolink-badge");

      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 15, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" }
        );
      }

      if (pulseLine) {
        gsap.fromTo(
          pulseLine,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut", delay: 0.3 }
        );
      }

      if (badges && badges.length) {
        gsap.fromTo(
          badges,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, delay: 0.6, ease: "back.out(1.4)" }
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
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[#C6A15B] font-semibold tracking-wider uppercase text-[11px]">
            ONCOLINK RAG ENGINE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] bg-[#111317] border border-[#2d9cdb]/30 text-[#2d9cdb]">
            Nemotron-3 Ultra
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-[#111317] border border-[#C6A15B]/30 text-[#C6A15B] hidden sm:inline-block">
            NVIDIA NIM
          </span>
        </div>
      </div>

      {/* Main 3-Step Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative mb-4">
        {/* Connector line overlay for desktop */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-[#80633A]/20 via-[#2d9cdb]/40 to-[#10b981]/20 -translate-y-1/2 z-0 pointer-events-none oncolink-pulse" />

        {/* Card 1: Input Stream */}
        <div className="oncolink-card relative z-10 bg-[#07080A] border border-[#80633A]/40 rounded-md p-3.5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#80633A] tracking-wider uppercase">01. INPUT STREAM</span>
              <span className="text-[9px] text-ash-dim">PDF/DOCX</span>
            </div>
            <div className="p-2 rounded bg-[#0D0E11] border border-[#1A1A20] mb-2 flex items-center gap-2">
              <span className="text-sm">📄</span>
              <div className="overflow-hidden">
                <p className="text-[11px] text-[#E8E1D2] truncate font-sans font-medium">Pathology_Report_Pt8924.pdf</p>
                <p className="text-[9px] text-[#85858A]">Multi-page Clinical Note</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="oncolink-badge px-1.5 py-0.5 rounded text-[9px] bg-[#14161A] text-[#85858A] border border-[#202228]">
              Unstructured
            </span>
            <span className="oncolink-badge px-1.5 py-0.5 rounded text-[9px] bg-[#14161A] text-[#85858A] border border-[#202228]">
              ThreadPoolExecutor
            </span>
          </div>
        </div>

        {/* Card 2: Extraction & Validation Core */}
        <div className="oncolink-card relative z-10 bg-[#07080A] border border-[#2d9cdb]/50 rounded-md p-3.5 flex flex-col justify-between shadow-lg shadow-[#2d9cdb]/5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#2d9cdb] tracking-wider uppercase">02. AI VALIDATION</span>
              <span className="text-[9px] text-[#A51C30] font-semibold">0% Hallucination</span>
            </div>
            <div className="space-y-1.5 mb-2">
              <div className="flex items-center justify-between p-1.5 rounded bg-[#0D0E11] border border-[#1A1A20] text-[10px]">
                <span className="text-[#85858A]">LLM Extraction</span>
                <span className="text-[#2d9cdb]">Structured JSON</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-[#0D0E11] border border-[#A51C30]/40 text-[10px]">
                <span className="text-[#85858A]">Pydantic v2</span>
                <span className="text-[#A51C30]">Schema Enforced</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-[#0D0E11] border border-[#1A1A20] text-[10px]">
                <span className="text-[#85858A]">Harmonization</span>
                <span className="text-[#C6A15B]">Conflict Resolve</span>
              </div>
            </div>
          </div>
          <div className="pt-1">
            <span className="oncolink-badge block text-center px-2 py-0.5 rounded text-[9px] bg-[#2d9cdb]/10 text-[#2d9cdb] border border-[#2d9cdb]/30">
              Identity & Biomarker Severity Check
            </span>
          </div>
        </div>

        {/* Card 3: Harmonized Export Output */}
        <div className="oncolink-card relative z-10 bg-[#07080A] border border-[#10b981]/50 rounded-md p-3.5 flex flex-col justify-between shadow-lg shadow-[#10b981]/5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#10b981] tracking-wider uppercase">03. HARMONIZED RECORD</span>
              <span className="text-[9px] text-[#10b981]">✓ Verified</span>
            </div>
            <div className="p-2 rounded bg-[#0D0E11] border border-[#1A1A20] mb-2 text-[10px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#85858A]">Diagnosis:</span>
                <span className="text-[#E8E1D2] font-sans font-medium">NSCLC (Stage IIIa)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">EGFR:</span>
                <span className="text-[#10b981]">Exon 19 del (Positive)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85858A]">PD-L1:</span>
                <span className="text-[#C6A15B]">TPS 65% (High)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 text-[9.5px]">
            <span className="oncolink-badge px-2 py-0.5 rounded bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30">
              Export PDF / JSON
            </span>
            <span className="text-[#85858A]">fpdf2</span>
          </div>
        </div>
      </div>

      {/* Bottom Tech Stack Footer */}
      <div className="pt-3 border-t border-[#1A1A20] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#85858A]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[#C6A15B] font-medium">STACK:</span>
          <span>Python 3.11+</span>
          <span>·</span>
          <span>Streamlit</span>
          <span>·</span>
          <span>NVIDIA NIM</span>
          <span>·</span>
          <span>Pydantic v2</span>
          <span>·</span>
          <span>PyMuPDF</span>
        </div>
        <div className="text-[9px] text-[#5C4A2E] hidden md:block">
          AI Clinical Intelligence Platform
        </div>
      </div>
    </div>
  );
}

export default OncoLinkDiagram;