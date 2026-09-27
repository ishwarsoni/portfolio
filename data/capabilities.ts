export interface CapabilityCategory {
  title: string;
  tags: string[];
}

export const capabilities: CapabilityCategory[] = [
  {
    title: "Applied AI & LLM Systems",
    tags: ["RAG", "NVIDIA NIM", "Nemotron-3 Ultra", "Pydantic v2", "Schema Validation", "Semantic Search", "Multi-document Processing", "Value Normalization", "Multi-document Harmonization", "Conflict Detection", "ThreadPoolExecutor"],
  },
  {
    title: "ML & Data Engineering",
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Model Evaluation", "Data Preprocessing", "Defensive Pipelines", "Target-Safe Cleaning", "Correlation Reduction", "Skewness Correction", "Outlier Handling", "Structured Reporting"],
  },
  {
    title: "Computer Vision & Motion Processing",
    tags: ["SMPL", "SMPL-H", "AMASS", "BVH Parsing", "Motion Processing", "3D Skeleton Rendering", "Coordinate Transforms", "Orientation Correction", "Scale Normalization", "Batch Visualization", "Joint Mapping", "Forward Kinematics"],
  },
  {
    title: "Engineering & Tools",
    tags: ["Git", "GitHub", "Jupyter", "Streamlit", "Matplotlib", "PyBullet", "Open3D/Trimesh"],
  },
  {
    title: "Programming & Fundamentals",
    tags: ["Python", "C++", "DSA", "OOP"],
  },
];