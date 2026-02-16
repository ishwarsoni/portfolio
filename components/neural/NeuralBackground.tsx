"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { NEURAL_CONFIG } from "./neuralConfig";

type PathData = {
    id: string;
    d: string;
    layer: 'raw' | 'processing' | 'output';
    duration: number;
    delay: number;
};

// Advanced path generation imitating data cleaning
const generatePath = (layer: 'raw' | 'processing' | 'output', index: number): PathData => {
    const startY = Math.random() * 100;
    const endY = Math.random() * 100;

    // Control points determine the "messiness" of the curve
    let c1x, c1y, c2x, c2y;

    if (layer === 'raw') {
        // Raw: Sweeping, organic curves (less chaotic now)
        c1x = 20 + Math.random() * 30;
        c1y = Math.random() * 100;
        c2x = 50 + Math.random() * 30;
        c2y = Math.random() * 100;
    } else if (layer === 'processing') {
        // Processing: Normalized flow
        c1x = 35 + Math.random() * 15;
        c1y = 30 + Math.random() * 40;
        c2x = 65 + Math.random() * 15;
        c2y = 30 + Math.random() * 40;
    } else {
        // Output: Optimised, almost straight but curved
        c1x = 40 + Math.random() * 10;
        c1y = startY + (endY - startY) * 0.4;
        c2x = 60 + Math.random() * 10;
        c2y = startY + (endY - startY) * 0.6;
    }

    const d = `M -10 ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, 110 ${endY}`;

    return {
        id: `${layer}-${index}`,
        d,
        layer,
        duration: NEURAL_CONFIG.animation.durationMin + Math.random() * (NEURAL_CONFIG.animation.durationMax - NEURAL_CONFIG.animation.durationMin),
        delay: Math.random() * -20
    };
};

export const NeuralBackground = () => {
    const prefersReducedMotion = useReducedMotion();
    const [paths, setPaths] = useState<PathData[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isLowPower, setIsLowPower] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isIdle, setIsIdle] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    // Interaction hooks
    const { scrollY } = useScroll();
    const yVelocity = useSpring(scrollY, { stiffness: 100, damping: 30 });
    const shift = useTransform(scrollY, [0, 5000], [0, 50]); // Parallax shift

    // Performance & Idle detection
    useEffect(() => {
        // Detect low-power devices
        if (typeof navigator !== 'undefined') {
            const concurrency = navigator.hardwareConcurrency || 4;
            if (concurrency <= 4) setIsLowPower(true);
        }

        // Visibility API to pause animations
        const handleVisibilityChange = () => {
            setIsVisible(document.visibilityState === 'visible');
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        const resetIdle = () => {
            setIsIdle(false);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setIsIdle(true), NEURAL_CONFIG.animation.idleTimeout);
        };

        window.addEventListener("mousemove", resetIdle);
        window.addEventListener("scroll", resetIdle);
        resetIdle();

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("mousemove", resetIdle);
            window.removeEventListener("scroll", resetIdle);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const shouldAnimate = !prefersReducedMotion && !isLowPower && isVisible;

    useEffect(() => {
        setIsMounted(true);
        const newPaths: PathData[] = [];

        // Generate distinct paths for each layer
        for (let i = 0; i < NEURAL_CONFIG.layers.raw.count; i++) newPaths.push(generatePath('raw', i));
        for (let i = 0; i < NEURAL_CONFIG.layers.processing.count; i++) newPaths.push(generatePath('processing', i));
        for (let i = 0; i < NEURAL_CONFIG.layers.output.count; i++) newPaths.push(generatePath('output', i));

        setPaths(newPaths);
    }, []);

    if (!isMounted) return null;

    if (!shouldAnimate) {
        return (
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
                {/* Fallback Static SVG */}
                <svg className="w-full h-full filter blur-[20px]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {paths.map(p => (
                        <path key={p.id} d={p.d} stroke={NEURAL_CONFIG.colors[p.layer]} fill="none" vectorEffect="non-scaling-stroke" strokeWidth="0.5" />
                    ))}
                </svg>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            {/* Base gradient for visual depth */}
            <div className="absolute inset-0 bg-[#050505] opacity-50 mix-blend-multiply" />

            <motion.svg
                className="w-full h-full opacity-60 filter blur-[30px] scale-110" // Reduced blur slightly for visibility
                style={{ y: shift }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {/* Layer 1: Raw Data (Glitchy, Messy) */}
                {paths.filter(p => p.layer === 'raw').map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={NEURAL_CONFIG.colors.raw}
                        strokeWidth={NEURAL_CONFIG.layers.raw.width}
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isIdle ? [0.05, 0.1, 0.05] : [0.1, 0.3, 0.1], // Dim when idle
                            pathOffset: isIdle ? [0, 0.2] : [0, 1], // Slow down when idle
                            x: Math.random() > 0.95 ? [0, 5, -5, 0] : 0 // Rare glitch
                        }}
                        transition={{
                            duration: isIdle ? path.duration * 2 : path.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: path.delay
                        }}
                    />
                ))}

                {/* Layer 2: Processing (Flowing, Dashed) */}
                {paths.filter(p => p.layer === 'processing').map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={NEURAL_CONFIG.colors.processing}
                        strokeWidth={NEURAL_CONFIG.layers.processing.width}
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        strokeDasharray="10 30"
                        animate={{
                            strokeDashoffset: [0, -1000],
                            opacity: isIdle ? 0.1 : 0.3
                        }}
                        transition={{
                            duration: isIdle ? path.duration * 1.5 : path.duration * 0.8,
                            repeat: Infinity,
                            ease: "linear",
                            delay: path.delay
                        }}
                    />
                ))}

                {/* Layer 3: Output (Stable, Pulsing) */}
                {paths.filter(p => p.layer === 'output').map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={NEURAL_CONFIG.colors.output}
                        strokeWidth={NEURAL_CONFIG.layers.output.width}
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        animate={{
                            pathOffset: [0, 1],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: path.duration * 0.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: path.delay,
                            repeatDelay: 2
                        }}
                    />
                ))}
            </motion.svg>
        </div>
    );
};
