"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const MotionBackground = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // Abstract bezier curves representing "motion paths" or "skeleton trajectories"
    const paths = [
        "M0 50 C 30 20, 70 80, 100 50",
        "M0 30 C 20 80, 80 20, 100 70",
        "M0 70 C 40 10, 60 90, 100 30",
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <svg className="w-full h-full opacity-10 filter blur-[40px]">
                {paths.map((path, i) => (
                    <motion.path
                        key={i}
                        d={path}
                        stroke="url(#gradient-motion)"
                        strokeWidth="2"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 1],
                            opacity: [0, 0.5, 0],
                            pathOffset: [0, 0, 1]
                        }}
                        transition={{
                            duration: 20 + i * 5, // Slow, 20-30s
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 2
                        }}
                    />
                ))}
                <defs>
                    <linearGradient id="gradient-motion" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                        <stop offset="50%" stopColor="rgba(6, 182, 212, 0.8)" />
                        <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Soft ambient drift */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-900/10 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{
                    rotate: [360, 0],
                    scale: [1, 1.5, 1]
                }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[100px]"
            />
        </div>
    );
};
