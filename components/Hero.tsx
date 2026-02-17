"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />

            <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">

                {/* 1. Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center"
                >
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-zinc-300 tracking-wide">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Open to Work: AI & Computer Vision
                    </div>
                </motion.div>

                {/* 2. Name & Role - THE "PREMIUM" FONT LOOK */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="space-y-6"
                >
                    <h2 className="text-sm md:text-base font-mono font-semibold tracking-[0.3em] text-cyan-500 uppercase">
                        Portfolio of
                    </h2>

                    {/* Unique Font Style for Name */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500 drop-shadow-2xl">
                        ISHWAR SONI
                    </h1>

                    <h3 className="text-xl md:text-3xl text-zinc-300 font-light tracking-wide">
                        Computer Vision & <span className="text-white font-medium">Motion Processing</span> Engineer
                    </h3>
                </motion.div>

                {/* 3. Tech Stack from Resume */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-lg text-zinc-400 font-medium"
                >
                    <span className="hover:text-cyan-400 transition-colors">Python</span>
                    <span className="text-zinc-800">•</span>
                    <span className="hover:text-cyan-400 transition-colors">SMPL / SMPL-H</span>
                    <span className="text-zinc-800">•</span>
                    <span className="hover:text-cyan-400 transition-colors">Human Motion Analysis</span>
                    <span className="text-zinc-800">•</span>
                    <span className="hover:text-cyan-400 transition-colors">ML Pipelines</span>
                </motion.div>

                {/* 4. Bio Summary (Resume Based) */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed"
                >
                    Specializing in <span className="text-zinc-300">human motion synthesis</span> and processing large-scale datasets (AMASS).
                    I build robust preprocessing pipelines and intelligent systems that bridge research and production.
                </motion.p>

                {/* 5. Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8"
                >
                    <Link
                        href="#projects"
                        className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        View Projects
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                        href="/Ishwar_Soni_Resume.pdf"
                        download="Ishwar_Soni_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white font-medium rounded-full border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-95"
                    >
                        <Download size={18} />
                        Download CV
                    </a>
                </motion.div>

                {/* 6. Socials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="pt-16 flex items-center justify-center gap-10 text-zinc-600"
                >
                    <Link href="https://github.com/ishwarsoni" target="_blank" className="hover:text-white hover:scale-110 transition-all duration-300">
                        <Github size={24} />
                    </Link>
                    <Link href="https://linkedin.com/in/ishwar-soni-cs" target="_blank" className="hover:text-[#0077b5] hover:scale-110 transition-all duration-300">
                        <Linkedin size={24} />
                    </Link>
                    <Link href="mailto:ishwarsoni2917@gmail.com" className="hover:text-cyan-400 hover:scale-110 transition-all duration-300">
                        <Mail size={24} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};