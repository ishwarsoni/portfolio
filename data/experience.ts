export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  domain: string[];
}

export const experience: Experience = {
  company: "Semantic Labs",
  role: "Computer Vision / Motion Processing Intern",
  period: "Nov 2025 – Jan 2026",
  location: "Remote",
  description: "Developed end-to-end BVH→SMPL-H motion processing pipeline for large-scale AMASS datasets. Implemented BVH parsing, joint hierarchy mapping, coordinate basis transformation, auto root orientation fixing, floor alignment, and post-processing (grounding, foot-lock stabilization, smoothing). Built visualization and debugging tools (MP4 rendering, frame inspection, skeleton inspection). Optimized batch processing workflows.",
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
};