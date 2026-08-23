export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  role: string;
  challenge: string;
  strategy: string;
  process: ProcessStep[];
  decisions: Decision[];
  stack: string[];
  links: {
    github?: string;
    demo?: string;
  };
  metrics: Metric[];
  heroVisual: string;
  gallery: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  detail: string;
  visual: string;
}

export interface Decision {
  decision: string;
  context: string;
  options: string[];
  chosen: string;
  rationale: string;
}

export interface Metric {
  label: string;
  value: string;
  context: string;
}

export const projects: Project[] = [
  {
    slug: "oncolink",
    title: "OncoLink",
    subtitle: "AI Clinical Intelligence Platform",
    category: "Applied AI / RAG",
    period: "2025",
    role: "Lead Developer",
    challenge: "Extract structured oncology data from unstructured clinical documents (PDF, DOCX, TXT). Prevent hallucination. Validate outputs against clinical schema. Enable multi-format export.",
    strategy: "Multi-document ingestion → Text extraction → NVIDIA Nemotron-3 Ultra structured extraction → JSON cleaning & parsing → Pydantic v2 schema validation → Value normalization → Multi-document harmonization with merge strategies → Conflict detection → Patient summary generation → PDF/TXT export.",
    process: [
      {
        step: 1,
        title: "Document Ingestion",
        detail: "Route PDF/DOCX/TXT to appropriate reader (PyMuPDF, python-docx, text). Extract raw text with structure preservation. Support multi-file upload via Streamlit.",
        visual: "document-parse"
      },
      {
        step: 2,
        title: "AI Structured Extraction",
        detail: "Build clinical extraction prompt with schema context. Call NVIDIA Nemotron-3 Ultra via NIM API (OpenAI-compatible). Parse and clean LLM JSON output with robust error recovery.",
        visual: "extraction-prompt"
      },
      {
        step: 3,
        title: "Schema Validation",
        detail: "Validate extracted data against Pydantic v2 ClinicalData schema. Enforce field types, required fields, biomarker structure. Report validation errors with field-level detail.",
        visual: "validation-gates"
      },
      {
        step: 4,
        title: "Value Normalization",
        detail: "Standardize abbreviations (EGFR→EGFR), capitalization, terminology. Expand clinical abbreviations. Deduplicate biomarker entries. Apply per-field normalization rules.",
        visual: "normalization"
      },
      {
        step: 5,
        title: "Multi-Document Harmonization",
        detail: "Run per-document extraction in parallel (ThreadPoolExecutor). Merge using field-specific strategies: identity (first_non_null), text (prefer_longest), biomarkers (merge unique by name), medications (merge_unique_strings), conflicts tracked with source attribution.",
        visual: "harmonization"
      },
      {
        step: 6,
        title: "Conflict Detection",
        detail: "Compare values across documents per field. Identity fields (name, age, gender, ECOG): HIGH severity. Biomarkers: per-biomarker value comparison, HIGH severity. Other fields: MEDIUM severity. Report sources and differing values.",
        visual: "conflict-detection"
      },
      {
        step: 7,
        title: "Summary Generation & Export",
        detail: "Generate structured patient summary with conflicts, biomarkers, medications, adverse events. Export as PDF (fpdf2) or TXT. Provide harmonized JSON download.",
        visual: "export-formats"
      },
    ],
    decisions: [
      {
        decision: "NVIDIA Nemotron-3 Ultra for extraction",
        context: "Required strong reasoning for clinical schema compliance with 12+ fields",
        options: ["GPT-4", "Claude-3", "Nemotron-3 Ultra", "Local LLMs"],
        chosen: "Nemotron-3 Ultra",
        rationale: "Superior instruction following for structured output; NVIDIA NIM deployment path; free tier available at build.nvidia.com"
      },
      {
        decision: "Pydantic v2 for validation",
        context: "Clinical data requires strict schema enforcement with field-level error reporting",
        options: ["Custom validation", "Pydantic v1", "Pydantic v2", "JSON Schema"],
        chosen: "Pydantic v2",
        rationale: "Better performance, improved error messages, native support for complex nested models (Biomarker list), field validators"
      },
      {
        decision: "Field-specific merge strategies",
        context: "Different clinical fields require different harmonization logic",
        options: ["Single strategy for all", "Field-specific strategies", "Manual review only"],
        chosen: "Field-specific strategies (identity/text/list/string/single/plan)",
        rationale: "Identity fields should agree; diagnosis needs detail; biomarkers are additive; medications combine; conflicts must be tracked with source attribution"
      },
      {
        decision: "ThreadPoolExecutor for parallel extraction",
        context: "Multiple documents need independent extraction before harmonization",
        options: ["Sequential", "ThreadPoolExecutor", "asyncio", "multiprocessing"],
        chosen: "ThreadPoolExecutor (max_workers=5)",
        rationale: "I/O-bound LLM API calls benefit from threading; simple integration; avoids GIL issues with async; configurable concurrency"
      },
    ],
    stack: ["Python", "Streamlit", "NVIDIA NIM", "Nemotron-3 Ultra", "Pydantic v2", "PyMuPDF", "python-docx", "fpdf2", "ThreadPoolExecutor"],
    links: {
      github: "https://github.com/ishwarsoni/oncolink",
      demo: undefined,
    },
    metrics: [
      { label: "Document Formats", value: "PDF, DOCX, TXT", context: "Multi-format ingestion" },
      { label: "Clinical Fields", value: "12+", context: "Diagnosis, biomarkers, medications, ECOG, etc." },
      { label: "Merge Strategies", value: "6 types", context: "Identity, text, list, string, single, plan" },
      { label: "Conflict Severity", value: "HIGH/MEDIUM", context: "Identity & biomarkers = HIGH" },
    ],
    heroVisual: "/work/oncolink/hero.avif",
    gallery: [
      "/work/oncolink/architecture.avif",
      "/work/oncolink/extraction.avif",
      "/work/oncolink/validation.avif",
    ],
  },
  {
    slug: "datacleanr",
    title: "Datacleanr",
    subtitle: "ML Data Cleaning Framework",
    category: "ML Engineering / Data Quality",
    period: "2024–2025",
    role: "Solo Developer",
    challenge: "Real-world ML datasets contain missing values, outliers, skewed distributions, redundant features, and dirty placeholders. Manual preprocessing is inconsistent, time-consuming, and risks data leakage and target corruption.",
    strategy: "Defensive orchestrated pipeline: Analyze → Missing values (drop >40%, median/mode fill) → Text standardization (dirty placeholders → NA) → Duplicate removal → Datatype conversion (₹, %, commas) → Correlation reduction (|r|>0.9, no cascade) → Column selection (constants, high-cardinality, high-missing) → Outliers (IQR cap/remove) → Skewness (signed log/sqrt, only if improves) → Integrity guards → Structured report. Target column NEVER modified in clean(); separate handle_target().",
    process: [
      {
        step: 1,
        title: "Analyze",
        detail: "Read-only dataset profiling: missing percentages, unique ratios, column kinds (numeric/text/categorical), correlation candidates, high-cardinality detection, constant columns, ID column detection.",
        visual: "profiling-report"
      },
      {
        step: 2,
        title: "Missing Values",
        detail: "Normalize dirty placeholders (n/a, na, -, ??) → NA. Drop columns >40% missing (target excluded). Numeric: median fill. Categorical: robust mode fill. Target column: NEVER modified.",
        visual: "missing-strategies"
      },
      {
        step: 3,
        title: "Text Standardization",
        detail: "Replace dirty strings (n/a, na, -, '', unknown, ??) with pd.NA. Target column excluded from standardization.",
        visual: "text-standardization"
      },
      {
        step: 4,
        title: "Duplicates",
        detail: "Remove exact duplicate rows. Target column excluded from duplicate detection. Safety guard: rollback if >30% row loss.",
        visual: "duplicates"
      },
      {
        step: 5,
        title: "Datatypes",
        detail: "Smart conversion: currency (₹), percentages, comma-separated numbers. Coerce errors to NA. Target column excluded. Track converted columns.",
        visual: "datatypes"
      },
      {
        step: 6,
        title: "Correlation Reduction",
        detail: "Pearson |r| > 0.9 on numeric columns. Drop one per pair (target excluded). No cascade deletion. Max 25% column loss at clean stage enforced.",
        visual: "correlation-reduction"
      },
      {
        step: 7,
        title: "Column Selection",
        detail: "Drop constant columns, high-cardinality ID columns (>90% unique), high-missing (>40%). Conservative: max 25% column loss at this stage. Target excluded.",
        visual: "column-selection"
      },
      {
        step: 8,
        title: "Outliers",
        detail: "IQR method (Q1-1.5IQR, Q3+1.5IQR). Strategy: cap (clip) or remove rows. Warn if >20% values capped per column. Target excluded. Fallback to cap if remove fails.",
        visual: "outlier-methods"
      },
      {
        step: 9,
        title: "Skewness",
        detail: "Threshold |skew| > 1.0. Signed log1p or sqrt (handles negatives). Only apply if transformation improves skew. Target: NEVER. Skip if non-finite generated or skew not improved.",
        visual: "skew-transforms"
      },
      {
        step: 10,
        title: "Integrity Guards & Report",
        detail: "Hard guards: target column present, ≥1 column, unique names, target dtype/values unchanged, index unique, column order. Safety mode: rollback if >30% row/col loss per step. Structured JSON report with per-step metadata.",
        visual: "pipeline-report"
      },
    ],
    decisions: [
      {
        decision: "Target column NEVER modified in clean()",
        context: "Filling or modifying target values introduces bias and label corruption in ML workflows",
        options: ["Auto-handle target in clean()", "Separate handle_target()", "User handles manually"],
        chosen: "Separate handle_target() function",
        rationale: "Ensures full user control over label processing; clean() remains pure feature engineering; explicit target handling prevents silent label corruption"
      },
      {
        decision: "Signed log1p for skewness",
        context: "Real-world features contain negative values; standard log fails",
        options: ["Log (positive only)", "Box-Cox", "Yeo-Johnson", "Signed log1p / sqrt"],
        chosen: "Signed log1p (np.sign * log1p(|x|)) or signed sqrt",
        rationale: "Handles positive, negative, and mixed values safely; no parameter tuning; deterministic; improves skew for heavy-tailed distributions"
      },
      {
        decision: "Correlation reduction without cascade deletion",
        context: "Aggressive correlation removal can delete useful features in chains",
        options: ["Cascade deletion", "Single-pass pair removal", "VIF-based", "PCA"],
        chosen: "Single-pass pair removal (|r|>0.9, drop one per pair)",
        rationale: "Prevents cascade feature loss; conservative; validated 0 datasets above 25% clean-stage column loss; keeps interpretability"
      },
      {
        decision: "Safety mode with per-step rollback",
        context: "Aggressive cleaning steps can silently destroy data",
        options: ["No guards", "Global threshold", "Per-step rollback with warning", "User confirmation per step"],
        chosen: "Per-step rollback: if row/col loss >30%, revert step and warn",
        rationale: "Prevents silent data destruction; non-blocking (continues with original); visible warnings; safe_mode toggle for expert users"
      },
    ],
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Jupyter", "YAML"],
    links: {
      github: "https://github.com/ishwarsoni/datacleaner",
      demo: undefined,
    },
    metrics: [
      { label: "Datasets Validated", value: "50", context: "Ames Housing, Iris, Breast Cancer, synthetic, edge cases" },
      { label: "Failures", value: "0", context: "0 target corruption across all scenarios" },
      { label: "Pipeline Stages", value: "10", context: "Analyze → Missing → Text → Dupes → Types → Corr → ColSel → Outliers → Skew → Guard" },
      { label: "Safety", value: "Per-step rollback", context: "30% row/col loss threshold with warnings" },
    ],
    heroVisual: "/work/datacleanr/hero.avif",
    gallery: [
      "/work/datacleanr/pipeline.avif",
      "/work/datacleanr/profiling.avif",
      "/work/datacleanr/validation.avif",
    ],
  },
  {
    slug: "motion-processing",
    title: "Motion Processing Pipeline",
    subtitle: "SMPL/SMPL-H Reconstruction from AMASS/BVH",
    category: "Computer Vision / Motion Systems",
    period: "Nov 2025 – Jan 2026",
    role: "CV / Motion Processing Intern — Semantic Labs",
    challenge: "AMASS/BVH motion data contains coordinate system inconsistencies, orientation flips, scaling errors, and joint hierarchy mismatches that break SMPL/SMPL-H reconstruction. Need reliable pipeline for large-scale motion datasets.",
    strategy: "BVH parsing → Joint hierarchy flattening → Channel indexing → BVH→SMPL-H joint mapping (21 body joints) → Coordinate basis transform (C_bvh2smpl) → Auto root fix (frame 0 inverse) → Translation cm→m → Floor alignment (Y-up) → Forward kinematics (22 joints) → Grounding (percentile floor) → Foot-lock stabilization (translation-only) → Savitzky-Golay smoothing → Export NPZ/BVH/MP4.",
    process: [
      {
        step: 1,
        title: "BVH Parsing",
        detail: "Recursive parser for HIERARCHY: ROOT/JOINT/End Site blocks. Extract OFFSET, CHANNELS (Zrotation/Xrotation/Yrotation order), frame matrix. Handle nested joints, full hands, 156-channel files. Flatten to joint_names, parents, offsets, channel_index.",
        visual: "bvh-parse"
      },
      {
        step: 2,
        title: "Joint Mapping (BVH→SMPL-H)",
        detail: "Map 21 SMPL body joints: Hips→global_orient, LeftUpLeg→left_hip, RightUpLeg→right_hip, Spine/Spine1/Spine2→spine1/2/3, LeftLeg/RightLeg→knee, LeftFoot/RightFoot→ankle, LeftToeBase/RightToeBase→foot, Neck/Head→neck/head, LeftShoulder/RightShoulder→collar, LeftArm/RightArm→shoulder, LeftForeArm/RightForeArm→elbow, LeftHand/RightHand→wrist. Missing BVH joints skipped.",
        visual: "joint-mapping"
      },
      {
        step: 3,
        title: "Coordinate Basis Transform",
        detail: "C_bvh2smpl = [[-1,0,0],[0,0,1],[0,1,0]] converts BVH (X-right, Y-up, Z-forward) to SMPL-H (X-left, Y-up, Z-forward). Applied to rotations (R_bvh2smpl @ R_bvh @ R_smpl2bvh) and translations. Translation scaled cm→m (×0.01).",
        visual: "coord-transform"
      },
      {
        step: 4,
        title: "Auto Root Fix & Orientation",
        detail: "Frame 0 Hips rotation → rotation matrix R0 → root_fix = R0.inv(). Applied to all frames: R_root = root_fix @ R_bvh2smpl. Global orient as rotvec. Body joints: same root_fix applied. Ensures consistent canonical orientation.",
        visual: "root-fix"
      },
      {
        step: 5,
        title: "Floor Alignment",
        detail: "After FK (smpl_fk.py): compute joint positions. min_y = minimum Y across all frames/joints. transl[:,1] -= min_y. Grounds character at Y=0.",
        visual: "floor-align"
      },
      {
        step: 6,
        title: "Post-Processing",
        detail: "Grounding: percentile-based floor detection (ground_robust.py) resistant to outliers. Foot-lock: translation-only deterministic stabilization (postprocess_foot_lock.py). Smoothing: Savitzky-Golay filter (window=11, poly=3) on joint angles. Export: NPZ (poses, transl, joint_names, mocap_framerate), BVH (template-based), MP4 (Matplotlib 3D skeleton + ground grid).",
        visual: "post-process"
      },
    ],
decisions: [
      {
        decision: "C_bvh2smpl Basis Matrix",
        context: "BVH and SMPL-H use different coordinate conventions",
        options: ["Manual per-joint fix", "Global basis transform", "Per-dataset calibration"],
        chosen: "Global basis transform",
        rationale: "A single verified matrix provides consistent coordinate conversion across joints."
      },
      {
        decision: "Automatic Root Fix",
        context: "BVH root orientation varies between sequences",
        options: ["Fixed 90° X rotation", "Frame 0 inverse", "Per-sequence calibration", "No root fix"],
        chosen: "Frame-0 inverse root rotation",
        rationale: "Adapts to the initial orientation without manual per-sequence correction."
      },
      {
        decision: "Percentile-Based Grounding",
        context: "Simple minimum-height grounding can be affected by outliers",
        options: ["Min Y", "Percentile (e.g., 5th)", "Physics simulation (PyBullet)", "Contact detection"],
        chosen: "Percentile-based floor detection",
        rationale: "More robust to jumps and outliers while remaining deterministic."
      },
      {
        decision: "Translation-Only Foot Lock",
        context: "Foot sliding is visible, but changing joint rotations can reduce pose fidelity",
        options: ["Full pose correction", "Translation-only foot lock", "IK-based", "Contact-aware"],
        chosen: "Translation-only deterministic stabilization",
        rationale: "Stabilizes root translation while preserving joint rotations."
      },
    ],
    metrics: [
      { label: "BODY JOINTS", value: "21", context: "→ SMPL-H" },
      { label: "POST-PROCESSING STAGES", value: "3", context: "Grounding · Foot Lock · Smoothing" },
      { label: "EXPORT FORMATS", value: "3", context: "NPZ · BVH · MP4" },
      { label: "AMASS", value: "Multi-subject / multi-action", context: "BVH processing" },
      { label: "COORDINATE TRANSFORM", value: "Verified", context: "Global basis conversion + root correction" },
    ],
    stack: ["Python", "NumPy", "SciPy", "SMPL-H", "BVH", "AMASS", "Open3D/Trimesh", "Matplotlib", "PyBullet (optional)"],
    links: {
      github: "https://github.com/ishwarsoni",
      demo: undefined,
    },
    heroVisual: "/work/motion-processing/hero.avif",
    gallery: [
      "/work/motion-processing/coord-frames.avif",
      "/work/motion-processing/joint-mapping.avif",
      "/work/motion-processing/reconstruction.avif",
    ],
  },
];

export const homeProjects = projects.slice(0, 2); // OncoLink and Datacleanr for homepage