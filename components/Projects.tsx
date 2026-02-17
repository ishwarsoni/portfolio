"use client";

import { Section } from "./Section";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight, Github, GitMerge, Layers, Terminal } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Projects = () => {
    return (
        <Section id="projects" className="relative">
            <div className="space-y-16">
                {/* Professional Header */}
                <div className="space-y-6 md:text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-xs font-medium"
                    >
                        <Terminal size={12} />
                        Engineering Portfolio
                    </motion.div>

                    {/* 👇 Updated Title Here */}
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Featured <span className="text-cyan-400">Projects</span>
                    </h2>

                    <p className="text-zinc-400 text-lg leading-relaxed">
                        A collection of technical case studies focusing on system architecture, data pipelines, and scalable infrastructure.
                    </p>
                </div>

                {/* Projects List - Technical Report Style */}
                <div className="grid grid-cols-1 gap-8">
                    {portfolioData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row gap-8 p-8">

                                {/* Left Column: Project Identity & Stack */}
                                <div className="md:w-1/3 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-zinc-800 pb-6 md:pb-0 md:pr-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-4xl font-mono font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors">
                                            0{index + 1}
                                        </span>
                                        {project.isFlagship && (
                                            <span className="px-2 py-1 bg-cyan-900/20 text-cyan-400 text-xs font-medium border border-cyan-900/30 rounded uppercase tracking-wider">
                                                Core Architecture
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-4 mt-4">
                                            {project.links.github && (
                                                <Link href={project.links.github} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                                                    <Github size={16} /> Source Code
                                                </Link>
                                            )}
                                            {project.links.demo && (
                                                <Link href={project.links.demo} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                                                    <ArrowUpRight size={16} /> Live Deployment
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 md:pt-0">
                                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.stack.map((tech, i) => (
                                                <span key={i} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded border border-zinc-700 font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Engineering Context */}
                                <div className="md:w-2/3 space-y-6">
                                    <p className="text-zinc-300 text-lg leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-zinc-950/50 p-5 rounded-xl border border-zinc-800/50">
                                            <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-200 mb-2">
                                                <Layers size={16} className="text-zinc-500" />
                                                The Challenge
                                            </h4>
                                            <p className="text-sm text-zinc-400 leading-relaxed">
                                                {project.problem}
                                            </p>
                                        </div>
                                        <div className="bg-zinc-950/50 p-5 rounded-xl border border-zinc-800/50">
                                            <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-200 mb-2">
                                                <GitMerge size={16} className="text-cyan-500" />
                                                The Solution
                                            </h4>
                                            <p className="text-sm text-zinc-400 leading-relaxed">
                                                {project.solution}
                                            </p>
                                        </div>
                                    </div>

                                    {project.whyThisMatters && (
                                        <div className="pt-4 border-t border-zinc-800">
                                            <p className="text-sm text-zinc-500">
                                                <span className="text-cyan-500 font-medium">Project Impact: </span>
                                                {project.whyThisMatters}
                                            </p>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};