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
            description: "Computer vision and motion processing pipeline for BVH to SMPL-H human motion reconstruction.",
            problem: "BVH motion files contained coordinate-system inconsistencies, orientation flips, scaling errors, and schema mismatches that produced unstable SMPL-H reconstructions.",
            solution: "Designed transformation and preprocessing pipelines to resolve coordinate alignment issues, improve motion stability, and validate reconstruction quality through visualization workflows.",
            whyThisMatters: "Demonstrates expertise in human motion modeling, motion processing, skeletal transformations, and large-scale computer vision data pipelines.",
            stack: ["Python", "NumPy", "SciPy", "SMPL-H", "BVH"],
            isFlagship: true,
            links: {
                github: "https://github.com/ishwarsoni",
                demo: "",
            },
        },
        {
            title: "VisionFX – Real-Time AR/VFX Engine",
            description: "Interactive Computer Vision system for real-time gesture-controlled visual effects.",
            problem: "Creating stable and responsive AR effects that accurately follow hand movements in real time while maintaining smooth visual rendering and low latency.",
            solution: "Implemented MediaPipe-based hand tracking and a modular rendering pipeline to generate gesture-controlled visual effects synchronized with user movements.",
            whyThisMatters: "Demonstrates real-time computer vision, gesture recognition, and AR/VFX engineering through an interactive hand-tracking experience.",
            stack: ["Python", "OpenCV", "MediaPipe", "NumPy", "ModernGL"],
            links: {
                github: "https://github.com/ishwarsoni/VisionFX",
            },
        },
        {
            title: "Datacleanr – ML Data Cleaning Framework",
            description: "Automated machine learning data preprocessing framework for robust and consistent dataset preparation.",
            problem: "Real-world datasets often contain missing values, outliers, skewed distributions, and redundant features, making manual preprocessing time-consuming and error-prone.",
            solution: "Developed a scalable data cleaning framework that automates preprocessing workflows, applies safety checks against data leakage, and handles common data quality issues across diverse datasets.",
            whyThisMatters: "Validated on 50+ datasets, demonstrating reliable preprocessing across diverse data distributions while reducing repetitive manual cleaning tasks.",
            stack: ["Python", "Pandas", "NumPy", "Scikit-learn"],
            links: {
                github: "https://github.com/ishwarsoni/datacleaner",
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
                "Data Engineering",
            ]
        },
        {
            category: "Backend & Systems",
            items: [
                "Python",
                "FastAPI",
                "Docker",
            ]
        },
        {
            category: "Tools & Workflow",
            items: [
                "Git",
                "GitHub",
                "Jupyter Notebook",
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
