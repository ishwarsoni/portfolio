/**
 * Presentation-layer data for the cinematic "Series" experience.
 * This file invents NO facts — it imports the real content from the other
 * data/*.ts files and only adds display metadata (palettes, order, labels).
 */
import { siteData } from "./site";
import { projects } from "./projects";
import { experience } from "./experience";
import { certifications } from "./certifications";
import { capabilities } from "./capabilities";
import { aboutData } from "./about";
import { education } from "./education";

export type Palette = { from: string; via: string; to: string; accent: string };

export const palettes = {
  cyan: { from: "#04121f", via: "#0f5f72", to: "#05080d", accent: "#38cfe8" },
  violet: { from: "#120822", via: "#3d1a6e", to: "#07060c", accent: "#8b7cf6" },
  emerald: { from: "#03150f", via: "#0d5a40", to: "#050a08", accent: "#46e3a8" },
  amber: { from: "#1c1003", via: "#6b3c06", to: "#0a0806", accent: "#ffb547" },
  blue: { from: "#040c1f", via: "#123a7a", to: "#05070d", accent: "#5aa6ff" },
} satisfies Record<string, Palette>;

export const seriesProfile = {
  firstName: "ISHWAR",
  lastName: "SONI",
  seriesTag: "THE SERIES",
  originalLabel: "AN ISHWAR SONI ORIGINAL",
  role: siteData.title, // "AI Engineer"
  tagline: ["AI Engineer", "Applied AI", "LLMs · RAG", "Machine Learning"],
  intro: siteData.heroStatement,
  subtext: siteData.heroSubtext,
  location: siteData.location,
  email: siteData.email,
  links: { github: siteData.github, linkedin: siteData.linkedin },
  resumePdf: siteData.resumeUrl,
  portrait: { src: "/portrait.png", alt: "Portrait of Ishwar Soni" },
};

/** Per-project display metadata keyed by the existing project slug. */
export type Motif = "neural" | "flow" | "grid";
export const projectMeta: Record<string, { palette: Palette; motif: Motif }> = {
  oncolink: { palette: palettes.cyan, motif: "neural" },
  datacleanr: { palette: palettes.emerald, motif: "flow" },
  "motion-processing": { palette: palettes.violet, motif: "grid" },
};

export { projects, certifications, capabilities, aboutData, experience, education };

// SERIES-DATA-MARKER

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};
export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

export const seasons: Season[] = [
  {
    number: 1,
    title: "Foundations",
    period: "2023 – 2027",
    synopsis: `${education.degree} in ${education.field} at ${education.institution}, ${education.location ?? ""}.`,
    episodes: [
      {
        code: "S01 E01",
        title: "The Student",
        description: `${education.degree}, ${education.field} — ${education.institution}.`,
        tags: ["B.Tech", "Computer Science", "DSA", "OOP"],
        runtime: education.period,
        palette: palettes.blue,
      },
    ],
  },
  {
    number: 2,
    title: "Learning to Build",
    period: "2024 – 2025",
    synopsis: "A defensive ML data-cleaning framework — the groundwork for reliable AI systems.",
    episodes: [
      {
        code: "S02 E01",
        title: "The Pipeline",
        description: "Datacleanr — a 10-stage, target-safe ML preprocessing framework with per-step rollback.",
        tags: ["Python", "Pandas", "Scikit-learn", "Data Quality"],
        runtime: "2024 – 2025",
        palette: palettes.emerald,
      },
    ],
  },
  {
    number: 3,
    title: "Applied AI",
    period: "2025 – 2026",
    synopsis: "Building production-oriented AI around LLMs, RAG and schema-validated extraction.",
    episodes: [
      {
        code: "S03 E01",
        title: "The AI Builder",
        description: "OncoLink — LLM extraction + Pydantic validation + multi-document harmonization for clinical data.",
        tags: ["RAG", "NVIDIA NIM", "Pydantic v2", "LLM"],
        runtime: "2025",
        palette: palettes.cyan,
      },
      {
        code: "S03 E02",
        title: "The Certified",
        description: "Building RAG Agents with LLMs (NVIDIA) and Generative AI apps with Azure OpenAI + Semantic Kernel (Microsoft).",
        tags: ["NVIDIA", "Microsoft", "RAG", "GenAI"],
        runtime: "2025 – 2026",
        palette: palettes.violet,
      },
    ],
  },
  {
    number: 4,
    title: "The Internship",
    period: experience.period,
    synopsis: `${experience.role} at ${experience.company} — ${experience.location}.`,
    episodes: [
      {
        code: "S04 E01",
        title: "The CV Intern",
        description: "End-to-end BVH→SMPL-H motion pipeline for large-scale AMASS datasets — parsing, coordinate transforms, grounding and smoothing.",
        tags: ["SMPL-H", "AMASS", "BVH", "Computer Vision"],
        runtime: experience.period,
        palette: palettes.violet,
      },
    ],
  },
  {
    number: 5,
    title: "What's Next",
    period: "Now streaming",
    synopsis: aboutData.currentFocus,
    episodes: [
      {
        code: "S05 E01",
        title: "The Next Chapter",
        description: "Building, debugging, optimizing and deploying practical AI systems with LLMs and RAG.",
        tags: ["LLMs", "RAG", "ML Reliability", "Deployment"],
        runtime: "In production",
        palette: palettes.cyan,
      },
    ],
  },
];

// SERIES-DATA-MARKER-2

export type TopPick = { label: string; title: string; detail: string; palette: Palette };
export const topPicks: TopPick[] = [
  { label: "The role", title: "AI Engineer", detail: "Applied AI · LLMs · RAG · ML", palette: palettes.cyan },
  { label: "The AI Original", title: "OncoLink", detail: "LLM extraction · 12+ clinical fields · Pydantic validation", palette: palettes.violet },
  { label: "The internship", title: "Semantic Labs", detail: "Computer Vision / Motion Processing", palette: palettes.blue },
  { label: "The framework", title: "Datacleanr", detail: "50 datasets · 0 target corruption", palette: palettes.emerald },
  { label: "Certified", title: "NVIDIA RAG Agents", detail: "Building RAG Agents with LLMs", palette: palettes.cyan },
  { label: "Certified", title: "Azure GenAI", detail: "Azure OpenAI + Semantic Kernel", palette: palettes.violet },
  { label: "Motion systems", title: "BVH → SMPL-H", detail: "21 body joints · 3 export formats", palette: palettes.blue },
  { label: "Primary language", title: "Python", detail: "Pandas · NumPy · Scikit-learn · PyTorch-adjacent CV", palette: palettes.amber },
  { label: "Education", title: "B.Tech CSE", detail: "Techno India NJR · 2023 – 2027", palette: palettes.emerald },
  { label: "Current mission", title: "Production AI", detail: "Reliable LLM & RAG systems", palette: palettes.cyan },
];

export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };
export const introSlides: IntroSlide[] = [
  {
    kicker: "The Role",
    title: "AI Engineer",
    lines: [siteData.heroStatement],
    chips: ["Applied AI", "LLMs", "RAG", "Machine Learning"],
  },
  {
    kicker: "Applied AI & LLMs",
    title: "RAG, validated.",
    lines: ["NVIDIA NIM · Nemotron · Pydantic v2 schema validation", "Multi-document harmonization · conflict detection"],
    chips: ["RAG", "NVIDIA NIM", "Pydantic v2", "Semantic Search"],
  },
  {
    kicker: "ML & Data Engineering",
    title: "The pipeline is the product.",
    lines: ["Defensive, target-safe preprocessing", "Python · Pandas · NumPy · Scikit-learn"],
    chips: ["Python", "Pandas", "NumPy", "Scikit-learn"],
  },
  {
    kicker: "The Originals",
    title: "Three builds",
    lines: ["OncoLink — AI clinical intelligence (RAG)", "Datacleanr — defensive ML data cleaning", "Motion Processing — BVH→SMPL-H reconstruction"],
  },
  {
    kicker: "The Internship",
    title: "Computer Vision",
    lines: [`${experience.role}`, `${experience.company} · ${experience.period}`],
    chips: ["SMPL-H", "AMASS", "BVH", "Forward Kinematics"],
  },
  {
    kicker: "Certified",
    title: "RAG & GenAI",
    lines: ["NVIDIA — Building RAG Agents with LLMs", "Microsoft — Azure OpenAI + Semantic Kernel"],
  },
  {
    kicker: "Current mission",
    title: "Now shipping",
    lines: ["Production AI systems with LLMs and RAG", "Reliable ML data pipelines"],
  },
];

export type ProfileId = "ishwar" | "recruiter" | "developer" | "researcher";
export type SectionId = "about" | "journey" | "originals" | "picks" | "skills" | "moments" | "story";

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  { id: "ishwar", name: "Ishwar", blurb: "The full series, in order", color: "#38cfe8", order: ["about", "journey", "originals", "picks", "skills", "moments", "story"] },
  { id: "recruiter", name: "Recruiter", blurb: "Resume, moments & skills first", color: "#8b7cf6", order: ["story", "moments", "skills", "originals", "about", "journey", "picks"] },
  { id: "developer", name: "Developer", blurb: "Projects, stack & GitHub first", color: "#46e3a8", order: ["originals", "skills", "journey", "moments", "about", "picks", "story"] },
  { id: "researcher", name: "Researcher", blurb: "The story arc & highlights first", color: "#5aa6ff", order: ["journey", "picks", "originals", "moments", "about", "skills", "story"] },
];

const totalEpisodes = seasons.reduce((n, s) => n + s.episodes.length, 0);
export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: "About", card: "About Me", meta: "The Pilot • Who & how", palette: palettes.violet },
  journey: { nav: "Journey", card: "My Journey", meta: `${seasons.length} Seasons • ${totalEpisodes} Episodes`, palette: palettes.blue },
  originals: { nav: "Originals", card: "My Projects", meta: `${projects.length} Originals`, palette: palettes.cyan },
  picks: { nav: "Top Picks", card: "Top Picks", meta: "Highlights", palette: palettes.emerald },
  skills: { nav: "Skills", card: "My Skills", meta: `${capabilities.length} Categories`, palette: palettes.cyan },
  moments: { nav: "Moments", card: "Certifications", meta: `${certifications.length} Certifications`, palette: palettes.violet },
  story: { nav: "Resume", card: "The Full Story", meta: "Resume • View & download", palette: palettes.amber },
};


