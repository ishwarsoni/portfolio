export interface Experience {
  company: string;
  role: string;
  employmentType: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  domain: string[];
}

export const experiences: Experience[] = [
  {
    company: "Cosmos Consultant AI",
    role: "AI Engineer Intern",
    employmentType: "Internship",
    period: "May 2026 – November 2026",
    location: "Jaipur, Rajasthan, India · Hybrid",
    description:
      "Working as an AI Engineer Intern at Cosmos Consultant AI, contributing to the development and integration of AI-powered applications.",
    achievements: [
      "Integrating AI-powered features such as email drafting, rewriting, and context-aware reply generation into applications.",
      "Implementing and integrating REST API endpoints to connect frontend applications with existing backend services.",
      "Developing prompt engineering strategies and structured output handling to improve the reliability and consistency of LLM responses.",
      "Building robust API request/response handling with authentication, timeout management, and error handling.",
      "Implementing defensive AI response parsing and validation to handle inconsistent LLM outputs.",
      "Debugging, testing, and improving the reliability of AI-powered application features.",
      "Writing and maintaining automated tests for API integrations and AI-related functionality.",
    ],
    domain: [
      "LLM Integration",
      "Prompt Engineering",
      "Structured Outputs",
      "REST APIs",
      "API Integration",
      "Authentication",
      "Error Handling",
      "Response Validation",
      "Automated Testing",
    ],
  },
  {
    company: "Semantic Labs",
    role: "Computer Vision / Motion Processing Intern",
    employmentType: "Internship",
    period: "Nov 2025 – Jan 2026",
    location: "Remote",
    description:
      "Developed end-to-end BVH→SMPL-H motion processing pipeline for large-scale AMASS datasets. Implemented BVH parsing, joint hierarchy mapping, coordinate basis transformation, auto root orientation fixing, floor alignment, and post-processing (grounding, foot-lock stabilization, smoothing). Built visualization and debugging tools (MP4 rendering, frame inspection, skeleton inspection). Optimized batch processing workflows.",
    achievements: [
      "Built recursive BVH parser handling nested joints, full hands, End Sites, and 156-channel frame matrices",
      "Implemented BVH→SMPL-H joint mapping for 21 body joints with verified C_bvh2smpl basis transform matrix",
      "Designed auto root orientation fix using frame-0 inverse, eliminating orientation flips across datasets",
      "Developed percentile-based floor grounding (outlier-resistant) and translation-only foot-lock stabilization",
      "Created batch processing scripts (BVH→NPZ, NPZ→BVH) and MP4 visualization renderer with Matplotlib 3D",
      "Applied Savitzky-Golay smoothing (window=11, poly=3) to joint angle sequences for noise reduction",
    ],
    domain: [
      "BVH Parsing",
      "SMPL-H",
      "AMASS",
      "Coordinate Systems",
      "Joint Mapping",
      "Quaternion/Rotation",
      "Forward Kinematics",
      "Grounding",
      "Foot-lock Stabilization",
      "Savitzky-Golay Smoothing",
      "Batch Processing",
      "MP4 Visualization",
    ],
  },
];

/** Most recent experience — convenient single-entry accessor. */
export const experience = experiences[0];
