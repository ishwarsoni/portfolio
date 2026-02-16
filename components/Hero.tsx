"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { HeroTerminal } from "./HeroTerminal";
import { useRef, useState } from "react";
import { BootSequence } from "./BootSequence";
import { DataFlow } from "./DataFlow"; // Still keep this import if needed or remove if unused, but layout handles background now.

export const Hero = () => {
    const [isBooting, setIsBooting] = useState(true);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Boot Sequence Overlay */}
            <AnimatePresence>
                {isBooting && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-background"
                    >
                        <BootSequence onComplete={() => setIsBooting(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container relative z-10 max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {!isBooting && (
                    <motion.div
                        style={{ y, opacity }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            <span className="text-xs font-mono text-zinc-300 tracking-wider">
                                {portfolioData.location}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <p className="text-cyan-400 font-mono text-sm tracking-wide uppercase font-semibold">
                                {portfolioData.hero.positioningLine}
                            </p>
                            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.95] mix-blend-overlay">
                                {portfolioData.hero.headline.split(' ').map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </h1>
                        </div>

                        <p className="text-xl md:text-2xl text-zinc-400 max-w-lg leading-relaxed font-light">
                            {portfolioData.hero.subtext}
                        </p>

                        {/* Proof Metrics */}
                        <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6 mt-2 max-w-lg">
                            {portfolioData.hero.metrics?.map((metric, i) => (
                                <div key={i}>
                                    <div className="text-2xl md:text-3xl font-bold text-white">{metric.value}</div>
                                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-mono">{metric.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-5 pt-6">
                            <Link
                                href="#projects"
                                className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    View Work
                                    <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                            <Link
                                href="#contact"
                                className="px-8 py-4 text-zinc-300 font-medium rounded-full border border-zinc-800 hover:bg-zinc-900 hover:text-white transition-all duration-300 hover:border-cyan-500/30"
                            >
                                Contact Me
                            </Link>
                        </div>
                    </motion.div>
                )}

                {/* Right Column: Visual Anchor (simulated depth) */}
                <div className="hidden lg:block relative h-[600px] w-full">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-3xl blur-3xl" />
                    {!isBooting && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <HeroTerminal />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};
