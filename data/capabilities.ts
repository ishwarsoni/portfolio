export interface CapabilityCategory {
  title: string;
  tags: string[];
}

export const capabilities: CapabilityCategory[] = [
  {
    title: "Motion Intelligence",
    tags: ["BVH Parsing", "SMPL-H", "AMASS", "Coordinate Systems", "Joint Mapping", "Forward Kinematics", "Grounding", "Foot-lock Stabilization", "Savitzky-Golay Smoothing"],
  },
  {
    title: "Applied AI & RAG",
    tags: ["NVIDIA NIM", "Nemotron-3 Ultra", "Pydantic v2", "ThreadPoolExecutor", "Schema Validation", "Value Normalization", "Multi-doc Harmonization", "Conflict Detection"],
  },
  {
    title: "ML & Data Engineering",
    tags: ["Pandas", "NumPy", "Scikit-learn", "Defensive Pipeline", "Target-Safe Cleaning", "Correlation Reduction", "Skewness Correction", "Outlier Handling", "Structured Reporting", "50-Dataset Validation"],
  },
  {
    title: "Computer Vision",
    tags: ["Motion Processing", "3D Skeleton Rendering", "Coordinate Transforms", "Orientation Correction", "Scale Normalization", "Batch Visualization"],
  },
  {
    title: "Languages",
    tags: ["Python", "C++"],
  },
  {
    title: "Tools & Fundamentals",
    tags: ["Git", "GitHub", "Jupyter", "Streamlit", "Matplotlib", "PyBullet", "Open3D/Trimesh", "DSA", "OOP"],
  },
];