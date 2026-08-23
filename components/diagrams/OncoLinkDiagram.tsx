"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TechnicalDiagramProps {
  className?: string;
  "aria-label"?: string;
}

const PIPELINE_STAGES = [
  { id: "input", label: "INPUT", x: 95, color: "#80633A" },
  { id: "extraction", label: "EXTRACTION", x: 255, color: "#2d9cdb" },
  { id: "validation", label: "VALIDATION", x: 415, color: "#a51c30" },
  { id: "normalize", label: "NORMALIZE", x: 575, color: "#c6a15b" },
  { id: "harmonize", label: "HARMONIZE", x: 735, color: "#10b981" },
  { id: "export", label: "EXPORT", x: 895, color: "#c6a15b" },
];

export function OncoLinkDiagram({ className, "aria-label": ariaLabel = "OncoLink AI Clinical Intelligence Platform architecture" }: TechnicalDiagramProps) {
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
      const stageGroups = PIPELINE_STAGES.map(s => svg.querySelector(`#stage-${s.id}`)).filter(Boolean) as SVGGElement[];
      const flowPath = svg.querySelector("#flow-path");
      const validationNode = svg.querySelector("#stage-validation");
      const perDocFlow = svg.querySelector("#per-doc-flow");
      const mergeStrategies = svg.querySelector("#merge-strategies");
      const conflictDetection = svg.querySelector("#conflict-detection");
      const clinicalSchema = svg.querySelector("#clinical-schema");
      const biomarkerStructure = svg.querySelector("#biomarker-structure");

      if (!stageGroups.length) return;

      // Initial states
      gsap.set(stageGroups, { opacity: 0, y: 15, scale: 0.96 });
      if (flowPath) gsap.set(flowPath, { strokeDashoffset: 800 });
      [perDocFlow, mergeStrategies, conflictDetection, clinicalSchema, biomarkerStructure].forEach(el => {
        if (el) gsap.set(el, { opacity: 0, y: 15 });
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: isMobile ? 0.4 : 0.6 } });

      // Stage boxes reveal sequentially
      stageGroups.forEach((stage, i) => {
        tl.to(stage, { opacity: 1, y: 0, scale: 1, duration: isMobile ? 0.25 : 0.4 }, i * (isMobile ? 0.08 : 0.1));
      });

      // Flow path draws
      if (flowPath) {
        tl.to(flowPath, { strokeDashoffset: 0, duration: isMobile ? 0.7 : 1.0, ease: "power2.inOut" }, "-=0.2");
      }

      // Validation node pulse
      if (validationNode) {
        const ring = validationNode.querySelector("rect");
        if (ring) {
          tl.to(ring, { strokeWidth: 3, filter: "url(#strong-glow)", duration: isMobile ? 0.15 : 0.2 }, "-=0.15")
            .to(ring, { strokeWidth: 2, filter: "url(#soft-glow)", duration: isMobile ? 0.25 : 0.4 }, "+=0.05");
        }
      }

      // Lower sections reveal
      tl.to([perDocFlow, mergeStrategies, conflictDetection].filter(Boolean), { opacity: 1, y: 0, duration: isMobile ? 0.3 : 0.45, stagger: isMobile ? 0.05 : 0.08 }, "-=0.3");
      tl.to([clinicalSchema, biomarkerStructure].filter(Boolean), { opacity: 1, y: 0, duration: isMobile ? 0.3 : 0.45, stagger: isMobile ? 0.05 : 0.08 }, "-=0.15");
    }, containerRef);

    return () => ctx.revert();
  }, [isVisible, isMobile]);

  return (
    <figure className={className} aria-label={ariaLabel} role="img">
      <svg
        ref={containerRef}
        viewBox="0 0 1000 520"
        preserveAspectRatio="xMidYMid meet"
        className="w-full max-w-[1000px] mx-auto"
        aria-hidden="true"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C6A15B" />
            <stop offset="100%" stopColor="#80633A" />
          </linearGradient>
          <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6E1725" />
            <stop offset="100%" stopColor="#A51C30" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a6b9e" />
            <stop offset="100%" stopColor="#2d9cdb" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L8,3 z" fill="#80633A" />
          </marker>
          <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L8,3 z" fill="#2d9cdb" />
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

        <rect width="1000" height="520" fill="url(#grid)" opacity="0.3" />

        {/* Pipeline flow arrows */}
        <g stroke="#80633A" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)">
          <path
            id="flow-path"
            d="M155 85 L195 85 M315 85 L355 85 M475 85 L515 85 M635 85 L675 85 M795 85 L835 85"
            strokeDasharray="800"
            strokeDashoffset="800"
          />
        </g>

        {/* Top Stage 1: Input */}
        <g id="stage-input" transform="translate(35, 35)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#0B0C0E" stroke="#80633A" strokeWidth="1.5" opacity="0.9" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#E8E1D2">01. INPUT</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">PDF · DOCX · TXT</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Unstructured Clinical</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Multi-file Batch</text>
        </g>

        {/* Top Stage 2: Extraction */}
        <g id="stage-extraction" transform="translate(195, 35)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#0B0C0E" stroke="url(#blueGrad)" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#2d9cdb">02. EXTRACTION</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Nemotron-3 Ultra</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">NVIDIA NIM API</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">JSON Output</text>
        </g>

        {/* Top Stage 3: Validation */}
        <g id="stage-validation" transform="translate(355, 35)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#0B0C0E" stroke="#A51C30" strokeWidth="2" filter="url(#soft-glow)" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#A51C30">03. VALIDATE</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Pydantic v2</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Schema Enforce</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Zero Hallucination</text>
        </g>

        {/* Top Stage 4: Normalization */}
        <g id="stage-normalize" transform="translate(515, 35)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#0B0C0E" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">04. NORMALIZE</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Abbr Expansion</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Term Standardize</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Deduplication</text>
        </g>

        {/* Top Stage 5: Harmonization */}
        <g id="stage-harmonize" transform="translate(675, 35)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#0B0C0E" stroke="#059669" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#10b981">05. HARMONIZE</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Multi-doc Merge</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Conflict Detect</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Unified Record</text>
        </g>

        {/* Top Stage 6: Export */}
        <g id="stage-export" transform="translate(835, 35)">
          <rect x="0" y="0" width="120" height="100" rx="4" fill="#0B0C0E" stroke="#C6A15B" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">06. EXPORT</text>
          <text x="60" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Patient Summary</text>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">Harmonized JSON</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">PDF / TXT</text>
        </g>

        {/* Row 2 - Left: Per-Document Flow */}
        <g id="per-doc-flow" transform="translate(35, 160)">
          <rect x="0" y="0" width="260" height="140" rx="4" fill="#0B0C0E" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">PARALLEL EXTRACTION</text>

          <g transform="translate(12, 36)">
            <rect x="0" y="0" width="236" height="32" rx="3" fill="#111317" stroke="#2d9cdb" strokeWidth="1" />
            <text x="118" y="20" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="#2d9cdb">Doc 1..N Pathology & Clinical Notes</text>
          </g>

          <g transform="translate(12, 78)">
            <rect x="0" y="0" width="112" height="32" rx="3" fill="#111317" stroke="#1A1A20" strokeWidth="1" />
            <text x="56" y="20" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">extract_each_doc()</text>
          </g>

          <g transform="translate(136, 78)">
            <rect x="0" y="0" width="112" height="32" rx="3" fill="#111317" stroke="#1A1A20" strokeWidth="1" />
            <text x="56" y="20" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">ThreadPoolExecutor</text>
          </g>
        </g>

        {/* Row 2 - Center: Harmonization Merge Strategies */}
        <g id="merge-strategies" transform="translate(315, 160)">
          <rect x="0" y="0" width="340" height="140" rx="4" fill="#0B0C0E" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">MERGE STRATEGIES</text>

          <g fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">
            <text x="12" y="42" fill="#E8E1D2" fontWeight="600">IDENTITY:</text>
            <text x="70" y="42">first_non_null (name, age, gender)</text>

            <text x="12" y="60" fill="#E8E1D2" fontWeight="600">TEXT:</text>
            <text x="70" y="60">prefer_longest_string (diagnosis, stage)</text>

            <text x="12" y="78" fill="#E8E1D2" fontWeight="600">LIST:</text>
            <text x="70" y="78">merge_biomarker_lists (dedupe by name)</text>

            <text x="12" y="96" fill="#E8E1D2" fontWeight="600">STRING:</text>
            <text x="70" y="96">merge_unique_strings (meds, treatments)</text>

            <text x="12" y="114" fill="#E8E1D2" fontWeight="600">SINGLE:</text>
            <text x="70" y="114">merge_numbers (ecog_score, lab_values)</text>
          </g>
        </g>

        {/* Row 2 - Right: Conflict Detection */}
        <g id="conflict-detection" transform="translate(675, 160)">
          <rect x="0" y="0" width="280" height="140" rx="4" fill="#0B0C0E" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">CONFLICT DETECTION</text>

          <g transform="translate(12, 34)">
            <rect x="0" y="0" width="256" height="28" rx="3" fill="#170A0C" stroke="#A51C30" strokeWidth="1" strokeDasharray="3 2" />
            <text x="12" y="18" fontFamily="var(--font-mono)" fontSize="8" fill="#A51C30" fontWeight="600">IDENTITY FIELDS</text>
            <text x="244" y="18" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="#A51C30">HIGH SEVERITY</text>
          </g>

          <g transform="translate(12, 68)">
            <rect x="0" y="0" width="256" height="28" rx="3" fill="#170A0C" stroke="#A51C30" strokeWidth="1" strokeDasharray="3 2" />
            <text x="12" y="18" fontFamily="var(--font-mono)" fontSize="8" fill="#A51C30" fontWeight="600">BIOMARKERS</text>
            <text x="244" y="18" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="#A51C30">HIGH SEVERITY</text>
          </g>

          <g transform="translate(12, 102)">
            <rect x="0" y="0" width="256" height="26" rx="3" fill="#111317" stroke="#1A1A20" strokeWidth="1" />
            <text x="12" y="17" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">OTHER FIELDS</text>
            <text x="244" y="17" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">MEDIUM SEVERITY</text>
          </g>
        </g>

        {/* Row 3 - Left: Clinical Fields Schema */}
        <g id="clinical-schema" transform="translate(35, 320)">
          <rect x="0" y="0" width="460" height="135" rx="4" fill="#0B0C0E" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">CLINICAL SCHEMA (Pydantic v2)</text>

          <g fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">
            <text x="12" y="42">patient_name: str | None</text>
            <text x="12" y="57">age: int | None</text>
            <text x="12" y="72">gender: str | None</text>
            <text x="12" y="87">diagnosis: str | None</text>
            <text x="12" y="102">cancer_type: str | None</text>
            <text x="12" y="117">cancer_stage: str | None</text>

            <text x="240" y="42">ecog_score: int | None</text>
            <text x="240" y="57">biomarkers: list[Biomarker]</text>
            <text x="240" y="72">current_medication: str | None</text>
            <text x="240" y="87">previous_treatment: str | None</text>
            <text x="240" y="102">adverse_events: str | None</text>
            <text x="240" y="117">follow_up_plan / next_steps</text>
          </g>
        </g>

        {/* Row 3 - Right: Biomarker Structure */}
        <g id="biomarker-structure" transform="translate(515, 320)">
          <rect x="0" y="0" width="440" height="135" rx="4" fill="#0B0C0E" stroke="#1A1A20" strokeWidth="1" />
          <text x="12" y="22" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="#C6A15B">BIOMARKER STRUCTURE</text>

          <g transform="translate(12, 34)">
            <rect x="0" y="0" width="200" height="88" rx="3" fill="#111317" stroke="#1A1A20" strokeWidth="1" />
            <text x="10" y="20" fontFamily="var(--font-mono)" fontSize="8" fill="#10b981">class Biomarker(BaseModel):</text>
            <text x="20" y="38" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">name: str</text>
            <text x="20" y="54" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">value: str</text>
            <text x="20" y="70" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">status: str # Pos/Neg/%</text>
          </g>

          <g transform="translate(224, 34)">
            <rect x="0" y="0" width="204" height="88" rx="3" fill="#111317" stroke="#1A1A20" strokeWidth="1" />
            <text x="10" y="18" fontFamily="var(--font-mono)" fontSize="8" fill="#E8E1D2" fontWeight="600">VALIDATED EXAMPLES:</text>
            <text x="10" y="34" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">EGFR: "Exon 19 del" (Positive)</text>
            <text x="10" y="50" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">ALK: "Rearranged" (Positive)</text>
            <text x="10" y="66" fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">PD-L1: "TPS 50%" (Percent)</text>
          </g>
        </g>

        {/* Bottom Row: Tech Stack & Note */}
        <g transform="translate(35, 475)">
          <text x="0" y="16" fontFamily="var(--font-mono)" fontSize="8.5" fill="#85858A">
            <tspan fill="#C6A15B" fontWeight="600">STACK: </tspan>
            Python 3.11+ · Streamlit · NVIDIA NIM (Nemotron-3 Ultra) · Pydantic v2 · PyMuPDF · python-docx · fpdf2
          </text>
          <text x="930" y="16" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="#5C4A2E">
            Demonstration AI pipeline for unstructured clinical documents.
          </text>
        </g>
      </svg>
    </figure>
  );
}

export default OncoLinkDiagram;