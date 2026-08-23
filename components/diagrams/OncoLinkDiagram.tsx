"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TechnicalDiagramProps {
  className?: string;
  "aria-label"?: string;
}

const PIPELINE_STAGES = [
  { id: "input", label: "INPUT", x: 60, color: "#80633A", icon: "📄" },
  { id: "extraction", label: "EXTRACTION", x: 220, color: "#2d9cdb", icon: "🤖" },
  { id: "validation", label: "VALIDATION", x: 380, color: "#a51c30", icon: "✓" },
  { id: "normalize", label: "NORMALIZE", x: 540, color: "#c6a15b", icon: "🔧" },
  { id: "harmonize", label: "HARMONIZE", x: 700, color: "#10b981", icon: "🔀" },
  { id: "export", label: "EXPORT", x: 860, color: "#c6a15b", icon: "📤" },
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
      gsap.set(stageGroups, { opacity: 0, y: 20, scale: 0.95 });
      if (flowPath) gsap.set(flowPath, { strokeDashoffset: 800 });
      [perDocFlow, mergeStrategies, conflictDetection, clinicalSchema, biomarkerStructure].forEach(el => {
        if (el) gsap.set(el, { opacity: 0, y: 15 });
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: isMobile ? 0.5 : 0.7 } });

      // Stage boxes reveal sequentially
      stageGroups.forEach((stage, i) => {
        tl.to(stage, { opacity: 1, y: 0, scale: 1, duration: isMobile ? 0.3 : 0.5 }, i * (isMobile ? 0.08 : 0.12));
      });

      // Flow path draws
      if (flowPath) {
        tl.to(flowPath, { strokeDashoffset: 0, duration: isMobile ? 0.8 : 1.2, ease: "power2.inOut" }, "-=0.2");
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
      tl.to([perDocFlow, mergeStrategies, conflictDetection].filter(Boolean), { opacity: 1, y: 0, duration: isMobile ? 0.3 : 0.5, stagger: isMobile ? 0.05 : 0.1 }, "-=0.3");
      tl.to([clinicalSchema, biomarkerStructure].filter(Boolean), { opacity: 1, y: 0, duration: isMobile ? 0.3 : 0.5, stagger: isMobile ? 0.05 : 0.1 }, "-=0.15");
    }, containerRef);

    return () => ctx.revert();
  }, [isVisible, isMobile]);

  return (
    <figure className={className} aria-label={ariaLabel} role="img">
      <svg
        ref={containerRef}
        viewBox="0 0 1000 430"
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
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#80633A" />
          </marker>
          <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#2d9cdb" />
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
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1000" height="580" fill="url(#grid)" opacity="0.3" />

        {/* Stage headers */}
        <g fontFamily="var(--font-mono)" fontSize="11" fill="#5C4A2E">
          {PIPELINE_STAGES.map(s => (
            <text key={s.id} x={s.x} y="550" textAnchor="middle">{s.label}</text>
          ))}
        </g>

        {/* Pipeline flow arrows - animated path */}
        <g stroke="#80633A" strokeWidth="2" fill="none" markerEnd="url(#arrow)">
          <path
            id="flow-path"
            d="M150 200 L200 200 M310 200 L360 200 M470 200 L520 200 M630 200 L680 200 M790 200 L840 200"
            strokeDasharray="800"
            strokeDashoffset="800"
          />
        </g>

        {/* Stage 1: Input */}
        <g id="stage-input" transform="translate(40, 80)">
          <rect x="0" y="0" width="120" height="110" rx="4" fill="#0B0C0E" stroke="#80633A" strokeWidth="1.5" opacity="0.8" />
          <text x="60" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#E8E1D2">DOCUMENTS</text>
          <text x="60" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">PDF</text>
          <text x="60" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">DOCX</text>
          <text x="60" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">TXT</text>
          <text x="60" y="95" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Multi-file</text>
        </g>

        {/* Stage 2: Extraction */}
        <g id="stage-extraction" transform="translate(200, 80)">
          <rect x="0" y="0" width="120" height="110" rx="4" fill="#0B0C0E" stroke="url(#blueGrad)" strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#2d9cdb">AI EXTRACT</text>
          <text x="60" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Nemotron-3 Ultra</text>
          <text x="60" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">NVIDIA NIM</text>
          <text x="60" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Structured Prompt</text>
          <text x="60" y="95" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">JSON Output</text>
        </g>

        {/* Stage 3: Validation */}
        <g id="stage-validation" transform="translate(360, 80)">
          <rect x="0" y="0" width="120" height="110" rx="4" fill="#0B0C0E" stroke="#A51C30" strokeWidth="2" filter="url(#soft-glow)" />
          <text x="60" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#A51C30">VALIDATE</text>
          <text x="60" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Pydantic v2</text>
          <text x="60" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Schema Enforce</text>
          <text x="60" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Field Errors</text>
          <text x="60" y="95" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Type Coerce</text>
        </g>

        {/* Stage 4: Normalization */}
        <g id="stage-normalize" transform="translate(520, 80)">
          <rect x="0" y="0" width="120" height="110" rx="4" fill="#0B0C0E" stroke="url(#goldGrad)" strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#C6A15B">NORMALIZE</text>
          <text x="60" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Abbr Expansion</text>
          <text x="60" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Capitalize</text>
          <text x="60" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Term Std</text>
          <text x="60" y="95" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Dedupe</text>
        </g>

        {/* Stage 5: Harmonization */}
        <g id="stage-harmonize" transform="translate(680, 80)">
          <rect x="0" y="0" width="120" height="110" rx="4" fill="#0B0C0E" stroke="#059669" strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#10b981">HARMONIZE</text>
          <text x="60" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Merge Strategy</text>
          <text x="60" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Field Sources</text>
          <text x="60" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Conflict Det</text>
          <text x="60" y="95" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Unified Record</text>
        </g>

        {/* Stage 6: Export */}
        <g id="stage-export" transform="translate(840, 80)">
          <rect x="0" y="0" width="120" height="110" rx="4" fill="#0B0C0E" stroke="#C6A15B" strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#C6A15B">EXPORT</text>
          <text x="60" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Patient Summary</text>
          <text x="60" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">Harmonized JSON</text>
          <text x="60" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">PDF (fpdf2)</text>
          <text x="60" y="95" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">TXT</text>
        </g>

        {/* Per-Document Flow */}
        <g id="per-doc-flow" transform="translate(60, 260)">
          <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="11" fill="#C6A15B">PER-DOCUMENT EXTRACTION (PARALLEL)</text>
          
          <g stroke="#2d9cdb" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)">
            <path d="M100 40 L100 80" />
            <path d="M100 80 L40 120" />
            <path d="M100 80 L160 120" />
          </g>

          <g transform="translate(0, 40)">
            <rect x="0" y="0" width="180" height="40" rx="4" fill="#0B0C0E" stroke="#2d9cdb" strokeWidth="1.5" />
            <text x="90" y="25" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#2d9cdb">Doc 1: Pathology</text>
          </g>
          <g transform="translate(-30, 80)">
            <rect x="0" y="0" width="180" height="40" rx="4" fill="#0B0C0E" stroke="#2d9cdb" strokeWidth="1.5" opacity="0.6" />
            <text x="90" y="25" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">extract_each_document()</text>
          </g>
          <g transform="translate(170, 80)">
            <rect x="0" y="0" width="180" height="40" rx="4" fill="#0B0C0E" stroke="#2d9cdb" strokeWidth="1.5" opacity="0.6" />
            <text x="90" y="25" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">ThreadPoolExecutor</text>
          </g>
        </g>

        {/* Harmonization Merge Strategies */}
        <g id="merge-strategies" transform="translate(300, 260)">
          <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="11" fill="#C6A15B">MERGE STRATEGIES</text>
          
          <g fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">
            <text x="0" y="25">IDENTITY: first_non_null</text>
            <text x="0" y="40">patient_name, age, gender</text>
            <text x="0" y="60">TEXT: prefer_longest_string</text>
            <text x="0" y="75">diagnosis, cancer_type, stage</text>
            <text x="0" y="95">LIST: merge_biomarker_lists</text>
            <text x="0" y="110">biomarkers (unique by name)</text>
            <text x="0" y="130">STRING: merge_unique_strings</text>
            <text x="0" y="145">medications, treatments, AEs</text>
            <text x="0" y="165">SINGLE: merge_numbers</text>
            <text x="0" y="180">ecog_score</text>
            <text x="0" y="200">PLAN: merge_unique_strings</text>
            <text x="0" y="215">follow_up, next_steps</text>
          </g>
        </g>

        {/* Conflict Detection */}
        <g id="conflict-detection" transform="translate(580, 260)">
          <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="11" fill="#C6A15B">CONFLICT DETECTION</text>
          
          <g stroke="#A51C30" strokeWidth="1.5" fill="none">
            <rect x="0" y="25" width="200" height="80" rx="4" strokeDasharray="4 2" />
          </g>
          
          <g fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">
            <text x="100" y="40" textAnchor="middle" fill="#A51C30">IDENTITY FIELDS</text>
            <text x="100" y="55" textAnchor="middle">patient_name, age, gender</text>
            <text x="100" y="70" textAnchor="middle">ecog_score</text>
            <text x="100" y="85" textAnchor="middle">severity: HIGH</text>
            <text x="100" y="105" textAnchor="middle" fill="#A51C30">BIOMARKERS</text>
            <text x="100" y="120" textAnchor="middle">per-biomarker value check</text>
            <text x="100" y="135" textAnchor="middle">severity: HIGH</text>
            <text x="100" y="150" textAnchor="middle" fill="#85858A">OTHER FIELDS</text>
            <text x="100" y="165" textAnchor="middle">severity: MEDIUM</text>
          </g>
        </g>

        {/* Clinical Fields Schema */}
        <g id="clinical-schema" transform="translate(60, 400)">
          <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="11" fill="#C6A15B">CLINICAL SCHEMA (Pydantic v2)</text>
          
          <g fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">
            <text x="0" y="25">patient_name: str | None</text>
            <text x="0" y="40">age: int | None</text>
            <text x="0" y="55">gender: str | None</text>
            <text x="0" y="75">diagnosis: str | None</text>
            <text x="0" y="90">cancer_type: str | None</text>
            <text x="0" y="105">cancer_stage: str | None</text>
            <text x="0" y="120">ecog_score: int | None</text>
            <text x="0" y="140">biomarkers: list[Biomarker]</text>
            <text x="0" y="155">current_medication: str | None</text>
            <text x="0" y="170">previous_treatment: str | None</text>
            <text x="0" y="185">adverse_events: str | None</text>
            <text x="0" y="200">follow_up_plan: str | None</text>
            <text x="0" y="215">next_steps: str | None</text>
          </g>
        </g>

        {/* Biomarker Structure */}
        <g id="biomarker-structure" transform="translate(300, 400)">
          <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="11" fill="#C6A15B">BIOMARKER STRUCTURE</text>
          
          <g stroke="#80633A" strokeWidth="1" fill="none">
            <rect x="0" y="20" width="300" height="160" rx="4" />
          </g>
          
          <g fontFamily="var(--font-mono)" fontSize="8" fill="#85858A">
            <text x="10" y="40">class Biomarker(BaseModel):</text>
            <text x="20" y="55">name: str</text>
            <text x="20" y="70">value: str</text>
            <text x="20" y="85">status: str  # Positive/Negative/Percent</text>
          </g>

          <g fontFamily="var(--font-mono)" fontSize="8" fill="#E8E1D2">
            <text x="10" y="120">EXAMPLES:</text>
            <text x="20" y="135">EGFR: "Exon 19 del" (Positive)</text>
            <text x="20" y="150">ALK: "Rearranged" (Positive)</text>
            <text x="20" y="165">PD-L1: "TPS 50%" (Percent)</text>
            <text x="20" y="180">Ki-67: "25%" (Percent)</text>
          </g>
        </g>

        {/* Tech Stack */}
        <g transform="translate(60, 430)">
          <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="11" fill="#C6A15B">TECH STACK</text>
          <g fontFamily="var(--font-mono)" fontSize="9" fill="#85858A">
            <text x="0" y="20">Python 3.11+  Streamlit  NVIDIA NIM (Nemotron-3 Ultra)</text>
            <text x="0" y="35">OpenAI SDK  Pydantic v2  PyMuPDF  python-docx  fpdf2</text>
            <text x="0" y="50">ThreadPoolExecutor  python-dotenv  logging</text>
          </g>
        </g>

        <g fontFamily="var(--font-mono)" fontSize="8" fill="#5C4A2E">
          <text x="500" y="470" textAnchor="middle" fill="#5C4A2E">Note: Not a clinical decision system. Educational / demonstration purposes only.</text>
        </g>
      </svg>
    </figure>
  );
}

export default OncoLinkDiagram;