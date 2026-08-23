"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TechnicalDiagramProps {
  className?: string;
  "aria-label"?: string;
}

const PIPELINE_STAGES = [
  { id: "input", label: "01. INPUT", x: 100, color: "#80633A" },
  { id: "extraction", label: "02. EXTRACT", x: 260, color: "#2d9cdb" },
  { id: "validation", label: "03. VALIDATE", x: 420, color: "#a51c30" },
  { id: "normalize", label: "04. NORMALIZE", x: 580, color: "#c6a15b" },
  { id: "harmonize", label: "05. HARMONIZE", x: 740, color: "#10b981" },
  { id: "export", label: "06. EXPORT", x: 900, color: "#c6a15b" },
];

export function OncoLinkDiagram({
  className = "",
  "aria-label": ariaLabel = "OncoLink AI Clinical Intelligence Platform architecture blueprint",
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
      const stageGroups = PIPELINE_STAGES.map((s) =>
        svg.querySelector(`#stage-${s.id}`)
      ).filter(Boolean) as SVGGElement[];
      const flowPath = svg.querySelector("#flow-path");
      const validationNode = svg.querySelector("#stage-validation");
      const perDocFlow = svg.querySelector("#per-doc-flow");
      const mergeStrategies = svg.querySelector("#merge-strategies");
      const conflictDetection = svg.querySelector("#conflict-detection");
      const clinicalSchema = svg.querySelector("#clinical-schema");
      const biomarkerStructure = svg.querySelector("#biomarker-structure");

      if (!stageGroups.length) return;

      gsap.set(stageGroups, { opacity: 0 });
      if (flowPath) gsap.set(flowPath, { strokeDashoffset: 800 });
      [
        perDocFlow,
        mergeStrategies,
        conflictDetection,
        clinicalSchema,
        biomarkerStructure,
      ].forEach((el) => {
        if (el) gsap.set(el, { opacity: 0 });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: isMobile ? 0.4 : 0.6 },
      });

      stageGroups.forEach((stage, i) => {
        tl.to(
          stage,
          { opacity: 1, duration: isMobile ? 0.25 : 0.4 },
          i * (isMobile ? 0.08 : 0.1)
        );
      });

      if (flowPath) {
        tl.to(
          flowPath,
          { strokeDashoffset: 0, duration: isMobile ? 0.7 : 1.0, ease: "power2.inOut" },
          "-=0.2"
        );
      }

      if (validationNode) {
        const ring = validationNode.querySelector("rect");
        if (ring) {
          tl.to(
            ring,
            { strokeWidth: 3, filter: "url(#strong-glow)", duration: isMobile ? 0.15 : 0.2 },
            "-=0.15"
          ).to(
            ring,
            { strokeWidth: 2, filter: "url(#soft-glow)", duration: isMobile ? 0.25 : 0.4 },
            "+=0.05"
          );
        }
      }

      tl.to(
        [perDocFlow, mergeStrategies, conflictDetection].filter(Boolean),
        {
          opacity: 1,
          duration: isMobile ? 0.3 : 0.45,
          stagger: isMobile ? 0.05 : 0.08,
        },
        "-=0.3"
      );
      tl.to(
        [clinicalSchema, biomarkerStructure].filter(Boolean),
        {
          opacity: 1,
          duration: isMobile ? 0.3 : 0.45,
          stagger: isMobile ? 0.05 : 0.08,
        },
        "-=0.15"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isVisible, isMobile]);

  return (
    <figure className={`w-full overflow-hidden ${className}`} aria-label={ariaLabel} role="img">
      <svg
        ref={containerRef}
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        className="w-full max-w-[1000px] mx-auto select-none"
        aria-hidden="true"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C6A15B" />
            <stop offset="100%" stopColor="#80633A" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a6b9e" />
            <stop offset="100%" stopColor="#2d9cdb" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#80633A" />
          </marker>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A1A20" strokeWidth="0.5" />
          </pattern>
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Frame Background */}
        <rect width="1000" height="600" fill="#0B0C0E" rx="8" />
        <rect width="1000" height="600" fill="url(#grid)" opacity="0.35" rx="8" />
        <rect width="1000" height="600" fill="none" stroke="#1A1A20" strokeWidth="1" rx="8" />

        {/* Top Title Bar */}
        <g transform="translate(40, 25)">
          <circle cx="6" cy="6" r="4" fill="#10b981" filter="url(#soft-glow)" />
          <text x="18" y="9" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="#C6A15B" letterSpacing="0.08em">
            ONCOLINK ARCHITECTURE · RAG CLINICAL INTELLIGENCE PIPELINE
          </text>
        </g>

        {/* Pipeline flow arrows */}
        <g stroke="#80633A" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)">
          <path
            id="flow-path"
            d="M160 95 L200 95 M320 95 L360 95 M480 95 L520 95 M640 95 L680 95 M800 95 L840 95"
            strokeDasharray="800"
            strokeDashoffset="800"
          />
        </g>

        {/* Stage 1: Input */}
        <g id="stage-input" transform="translate(40, 45)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#07080A" stroke="#80633A" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#E8E1D2">01. INPUT</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">PDF · DOCX · TXT</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Unstructured</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Multi-file Batch</text>
        </g>

        {/* Stage 2: Extraction */}
        <g id="stage-extraction" transform="translate(200, 45)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#07080A" stroke="url(#blueGrad)" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#2d9cdb">02. EXTRACTION</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Nemotron-3 Ultra</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">NVIDIA NIM API</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">JSON Output</text>
        </g>

        {/* Stage 3: Validation */}
        <g id="stage-validation" transform="translate(360, 45)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#07080A" stroke="#A51C30" strokeWidth="2" filter="url(#soft-glow)" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#A51C30">03. VALIDATE</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Pydantic v2</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Schema Enforce</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Zero Hallucination</text>
        </g>

        {/* Stage 4: Normalization */}
        <g id="stage-normalize" transform="translate(520, 45)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#07080A" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">04. NORMALIZE</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Abbr Expansion</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Term Standardize</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Deduplication</text>
        </g>

        {/* Stage 5: Harmonization */}
        <g id="stage-harmonize" transform="translate(680, 45)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#07080A" stroke="#059669" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#10b981">05. HARMONIZE</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Multi-doc Merge</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Conflict Detect</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Unified Record</text>
        </g>

        {/* Stage 6: Export */}
        <g id="stage-export" transform="translate(840, 45)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#07080A" stroke="#C6A15B" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">06. EXPORT</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Patient Summary</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Harmonized JSON</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">PDF / TXT</text>
        </g>

        {/* Row 2 - Left: Per-Document Flow (y = 175) */}
        <g id="per-doc-flow" transform="translate(40, 175)">
          <rect x="0" y="0" width="260" height="160" rx="4" fill="#07080A" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">PARALLEL EXTRACTION</text>

          <g transform="translate(12, 36)">
            <rect x="0" y="0" width="236" height="34" rx="3" fill="#0D0E11" stroke="#2d9cdb" strokeWidth="1" />
            <text x="118" y="21" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#2d9cdb">Doc 1..N Pathology Notes</text>
          </g>

          <g transform="translate(12, 82)">
            <rect x="0" y="0" width="112" height="34" rx="3" fill="#0D0E11" stroke="#1A1A20" strokeWidth="1" />
            <text x="56" y="21" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">extract_each_doc()</text>
          </g>

          <g transform="translate(136, 82)">
            <rect x="0" y="0" width="112" height="34" rx="3" fill="#0D0E11" stroke="#1A1A20" strokeWidth="1" />
            <text x="56" y="21" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">ThreadPoolExecutor</text>
          </g>

          <text x="12" y="142" fontFamily="var(--font-mono)" fontSize="8" fill="#5C4A2E">Concurrent multi-file RAG processing</text>
        </g>

        {/* Row 2 - Center: Harmonization Merge Strategies (y = 175) */}
        <g id="merge-strategies" transform="translate(320, 175)">
          <rect x="0" y="0" width="330" height="160" rx="4" fill="#07080A" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">MERGE STRATEGIES</text>

          <g fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">
            <text x="12" y="42" fill="#E8E1D2" fontWeight="600">IDENTITY:</text>
            <text x="75" y="42">first_non_null (name, age, gender)</text>

            <text x="12" y="62" fill="#E8E1D2" fontWeight="600">TEXT:</text>
            <text x="75" y="62">prefer_longest_string (diagnosis, stage)</text>

            <text x="12" y="82" fill="#E8E1D2" fontWeight="600">LIST:</text>
            <text x="75" y="82">merge_biomarkers (unique by name)</text>

            <text x="12" y="102" fill="#E8E1D2" fontWeight="600">STRING:</text>
            <text x="75" y="102">merge_unique_strings (meds, AEs)</text>

            <text x="12" y="122" fill="#E8E1D2" fontWeight="600">SINGLE:</text>
            <text x="75" y="122">merge_numbers (ecog_score, labs)</text>
          </g>
        </g>

        {/* Row 2 - Right: Conflict Detection (y = 175) */}
        <g id="conflict-detection" transform="translate(670, 175)">
          <rect x="0" y="0" width="290" height="160" rx="4" fill="#07080A" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">CONFLICT DETECTION</text>

          <g transform="translate(12, 36)">
            <rect x="0" y="0" width="266" height="32" rx="3" fill="#170A0C" stroke="#A51C30" strokeWidth="1" strokeDasharray="3 2" />
            <text x="12" y="20" fontFamily="var(--font-mono)" fontSize="8" fill="#A51C30" fontWeight="600">IDENTITY FIELDS</text>
            <text x="254" y="20" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="#A51C30">HIGH SEVERITY</text>
          </g>

          <g transform="translate(12, 76)">
            <rect x="0" y="0" width="266" height="32" rx="3" fill="#170A0C" stroke="#A51C30" strokeWidth="1" strokeDasharray="3 2" />
            <text x="12" y="20" fontFamily="var(--font-mono)" fontSize="8" fill="#A51C30" fontWeight="600">BIOMARKERS</text>
            <text x="254" y="20" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="#A51C30">HIGH SEVERITY</text>
          </g>

          <g transform="translate(12, 116)">
            <rect x="0" y="0" width="266" height="30" rx="3" fill="#0D0E11" stroke="#1A1A20" strokeWidth="1" />
            <text x="12" y="19" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">OTHER FIELDS</text>
            <text x="254" y="19" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">MEDIUM SEVERITY</text>
          </g>
        </g>

        {/* Row 3 - Left: Clinical Schema (y = 365) */}
        <g id="clinical-schema" transform="translate(40, 365)">
          <rect x="0" y="0" width="460" height="165" rx="4" fill="#07080A" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">CLINICAL SCHEMA (Pydantic v2)</text>

          <g fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">
            <text x="12" y="42">patient_name: str | None</text>
            <text x="12" y="60">age: int | None</text>
            <text x="12" y="78">gender: str | None</text>
            <text x="12" y="96">diagnosis: str | None</text>
            <text x="12" y="114">cancer_type: str | None</text>
            <text x="12" y="132">cancer_stage: str | None</text>

            <text x="240" y="42">ecog_score: int | None</text>
            <text x="240" y="60">biomarkers: list[Biomarker]</text>
            <text x="240" y="78">current_medication: str | None</text>
            <text x="240" y="96">previous_treatment: str | None</text>
            <text x="240" y="114">adverse_events: str | None</text>
            <text x="240" y="132">follow_up_plan / next_steps</text>
          </g>
        </g>

        {/* Row 3 - Right: Biomarker Structure (y = 365) */}
        <g id="biomarker-structure" transform="translate(520, 365)">
          <rect x="0" y="0" width="440" height="165" rx="4" fill="#07080A" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">BIOMARKER STRUCTURE</text>

          <g transform="translate(12, 36)">
            <rect x="0" y="0" width="200" height="110" rx="3" fill="#0D0E11" stroke="#1A1A20" strokeWidth="1" />
            <text x="10" y="22" fontFamily="var(--font-mono)" fontSize="8" fill="#10b981">class Biomarker(BaseModel):</text>
            <text x="20" y="42" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">name: str</text>
            <text x="20" y="60" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">value: str</text>
            <text x="20" y="78" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">status: str # Pos/Neg/%</text>
          </g>

          <g transform="translate(224, 36)">
            <rect x="0" y="0" width="204" height="110" rx="3" fill="#0D0E11" stroke="#1A1A20" strokeWidth="1" />
            <text x="10" y="20" fontFamily="var(--font-mono)" fontSize="8" fill="#E8E1D2" fontWeight="600">VALIDATED EXAMPLES:</text>
            <text x="10" y="40" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">EGFR: "Exon 19 del" (Positive)</text>
            <text x="10" y="58" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">ALK: "Rearranged" (Positive)</text>
            <text x="10" y="76" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">PD-L1: "TPS 65%" (Percent)</text>
            <text x="10" y="94" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">Ki-67: "25%" (Percent)</text>
          </g>
        </g>

        {/* Row 4: Bottom Tech Stack & Note (y = 560) */}
        <g transform="translate(40, 560)">
          <text x="0" y="16" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">
            <tspan fill="#C6A15B" fontWeight="600">STACK: </tspan>
            Python 3.11+ · Streamlit · NVIDIA NIM (Nemotron-3 Ultra) · Pydantic v2 · PyMuPDF · python-docx · fpdf2
          </text>
          <text x="920" y="16" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="#5C4A2E">
            Demonstration AI clinical platform architecture.
          </text>
        </g>
      </svg>
    </figure>
  );
}

export default OncoLinkDiagram;