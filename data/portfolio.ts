export const portfolioData = {
    name: "Ishwar Soni",
    title: "AI Engineer | Computer Vision & Motion Systems",
    location: "Udaipur, India",
    summary: "AI engineer specializing in human motion processing, SMPL/SMPL-H pipelines, and applied ML systems. I focus on debugging broken data pipelines, fixing coordinate and scaling issues, and shipping reliable ML systems rather than building shiny demos.",

    hero: {
        headline: "Building AI Systems That Work in the Real World",
        subtext: "AI Engineer specializing in motion processing, ML pipelines, and production systems.",
        positioningLine: "Bridging the gap between research code and production reliability.",
        metrics: [
            { label: "Data Processed", value: "10TB+" },
            { label: "Pipeline Efficiency", value: "40% Faster" },
            { label: "Production Models", value: "3+" },
        ]
    },

    about: {
        description: "I enjoy solving confusing technical problems more than building demo projects. My work revolves around making messy systems reliable, whether it's normalizing AMASS motion datasets or deploying prediction models to production.",
        points: [
            "Engineering mindset: I prioritize reliability and reproducibility.",
            "Debugging complex systems: I dive deep into coordinate transforms and data inconsistencies.",
            "Working with messy data: I build robust pipelines to handle real-world edge cases.",
            "Shipping over showing off: I value deployed, working systems over theoretical perfection.",
        ],
    },

    experience: [
        {
            company: "Semantic Labs",
            location: "Remote — Dubai",
            role: "Computer Vision / Motion Processing Intern",
            period: "Recent",
            description: "Worked on large-scale AMASS motion datasets and BVH ↔ SMPL-H preprocessing pipelines.",
            achievements: [
                "Built and optimized BVH ↔ SMPL-H preprocessing pipelines for large-scale datasets.",
                "Fixed critical coordinate system normalization issues affecting downstream models.",
                "Resolved orientation flips and scaling bugs in motion data.",
                "Implemented motion stabilization and smoothing algorithms.",
                "Optimized data pipeline performance for faster processing.",
            ],
        },
    ],

    projects: [
        {
            title: "BVH-to-SMPLH Motion Processing Pipeline",
            description: "End-to-end pipeline to convert and clean motion capture data (BVH → SMPL-H) with correct orientation, grounding, and batch processing.",
            problem: "Raw BVH motion capture data suffers from orientation mismatches, floating/sliding feet, jitter artifacts, and lacks compatibility with SMPL-H based ML workflows.",
            approach: "Built a multi-stage conversion pipeline: BVH parsing → skeleton remapping → SMPL-H parameterization, followed by stabilization and postprocessing passes.",
            challenges: "Correcting global orientation and grounding without distorting local joint rotations, eliminating foot sliding artifacts while preserving natural motion dynamics, and handling heterogeneous BVH skeleton hierarchies across datasets.",
            solution: "Implemented Savitzky-Golay smoothing for jitter reduction, FK-based grounding to fix floating characters, and foot-lock postprocessing to eliminate sliding artifacts. Built batch processing tools for large-scale datasets and reverse export (NPZ → BVH) for Blender/Unity-compatible workflows. Created MP4 preview generation and skeleton/frame inspector utilities for rapid validation.",
            results: "Processed large-scale motion datasets with consistent quality, producing clean SMPL-H parameterized data ready for downstream ML training and Blender/Unity integration.",
            whyThisMatters: "High-quality motion data is the bottleneck for training human motion generation models. This pipeline automates weeks of manual cleanup and enables reliable, reproducible dataset preparation at scale.",
            stack: ["Python", "NumPy", "SciPy", "SMPL-H"],
            isFlagship: true,
            links: {
                github: "",
                demo: "",
            },
        },
        {
            title: "Bengaluru House Price Predictor",
            description: "End-to-end ML production system for real estate price prediction.",
            problem: "Existing models lacked a production-ready interface and deployment strategy.",
            approach: "Built a full stack solution: XGBoost model, FastAPI backend, and Dockerized deployment.",
            challenges: "Ensuring low-latency inference and handling missing data in real-time requests.",
            solution: "Optimized model serialization and implemented robust input validation in FastAPI.",
            results: "Deployed a scalable prediction API with consistent accuracy.",
            whyThisMatters: "Demonstrates full-stack ML engineering capability, from EDA to Dockerized deployment.",
            stack: ["XGBoost", "FastAPI", "Docker", "AWS"],
            links: {
                github: "https://github.com/ishwarsoni/bengaluru-house-price-predictor",
                demo: "",
            },
        },
        {
            title: "Modular ML Pipeline (Titanic)",
            description: "A reusable, modular machine learning pipeline architecture.",
            problem: "Spaghetti code in notebooks leading to data leakage and reproducibility issues.",
            approach: "Designed a ColumnTransformer-based architecture with strict separation of concerns.",
            challenges: "Automating preprocessing without leaking test set statistics into training data.",
            solution: "Implemented custom Scikit-learn transformers and pipelines.",
            results: "Achieved improved accuracy and zero data leakage, serving as a template for future projects.",
            whyThisMatters: "Proves ability to write clean, maintainable, and leak-proof ML code.",
            stack: ["Scikit-learn", "Pandas", "Python"],
            links: {
                github: "https://github.com/ishwarsoni/ml-preprocessing-pipelines",
            },
        },
        {
            title: "Data Scraping System",
            description: "High-volume corporate data extraction and structuring system.",
            problem: "Need to aggregate data for 10,000+ companies from diverse sources.",
            approach: "Built a concurrent scraping engine with BeautifulSoup and requests.",
            challenges: "Handling rate limits, dynamic content, and inconsistent HTML structures.",
            solution: "Implemented retry logic, rotation, and robust parsing strategies.",
            results: "Generated a structured, clean dataset of over 10,000 companies for analysis.",
            whyThisMatters: "Shows capability in data engineering and handling unstructured data at scale.",
            stack: ["Python", "BeautifulSoup", "Pandas", "Requests"],
            links: {
                github: "https://github.com/ishwarsoni/python-company-scraper",
            },
        },
    ],

    skills: [
        {
            category: "Computer Vision & Motion",
            items: [
                "Human Motion Analysis",
                "Pose Estimation",
                "SMPL",
                "SMPL-H",
                "BVH",
            ]
        },
        {
            category: "Machine Learning & Data",
            items: [
                "NumPy",
                "Pandas",
                "Scikit-learn",
                "Model Evaluation",
                "Data Engineering"
            ]
        },
        {
            category: "Programming & Tools",
            items: [
                "Python",
                "Git",
                "GitHub",
                "Jupyter Notebook",
                "Docker",
                "FastAPI"
            ]
        },
    ],

    certifications: [
        {
            title: "Building RAG Agents with LLMs",
            issuer: "NVIDIA",
            date: "Nov 2025",
            link: "https://learn.nvidia.com/certificates?id=u8dJRK5IQEe0CjntZD-S0g#",
        },
        {
            title: "Develop Generative AI Apps with Azure OpenAI and Semantic Kernel",
            issuer: "Microsoft Applied Skills",
            date: "Feb 2026",
            link: "https://learn.microsoft.com/en-in/users/ishwarsoni-6131/credentials/84da87053a16814a?ref=https%3A%2F%2Fwww.linkedin.com%2F",
        },
    ],

    contact: {
        email: "ishwarsoni2917@gmail.com",
        github: "https://github.com/ishwarsoni",
        linkedin: "https://linkedin.com/in/ishwar-soni-cs",
    },
};
