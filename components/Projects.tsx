"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";

export const Projects = () => {
    return (
        <Section id="projects">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
            >
                <h2 className="text-2xl font-bold text-white">Featured Projects</h2>

                <div className="grid grid-cols-1 gap-8">
                    {portfolioData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group glass-card p-6 md:p-8 rounded-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-9xl font-bold text-cyan-500 font-mono leading-none -mt-8 -mr-8 block">
                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                </span>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-3">
                                        {project.title}
                                    </h3>
                                    <p className="text-zinc-400 mt-2 max-w-xl text-lg">{project.description}</p>
                                </div>

                                <div className="flex gap-3">
                                    {project.links.github && (
                                        <Link href={project.links.github} className="p-2 bg-zinc-800/50 rounded-full text-zinc-400 hover:text-white hover:bg-cyan-500/20 transition-all">
                                            <Github size={20} />
                                        </Link>
                                    )}
                                    {project.links.demo && (
                                        <Link href={project.links.demo} className="p-2 bg-zinc-800/50 rounded-full text-zinc-400 hover:text-white hover:bg-cyan-500/20 transition-all">
                                            <ArrowUpRight size={20} />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6 mb-8 relative z-10">
                                {project.whyThisMatters && (
                                    <div className="bg-cyan-950/30 rounded-lg p-4 border border-cyan-500/20">
                                        <h4 className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                            Why This Matters
                                        </h4>
                                        <p className="text-cyan-100/80 text-sm leading-relaxed">
                                            {project.whyThisMatters}
                                        </p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                                    <div className="bg-zinc-900/30 p-4 rounded-lg border border-white/5">
                                        <h4 className="font-mono text-zinc-500 mb-2 uppercase text-xs tracking-wider font-semibold">The Challenge</h4>
                                        <p className="text-zinc-300 leading-relaxed">{project.problem}</p>
                                    </div>
                                    <div className="bg-zinc-900/30 p-4 rounded-lg border border-white/5">
                                        <h4 className="font-mono text-emerald-500/80 mb-2 uppercase text-xs tracking-wider font-semibold">The Solution</h4>
                                        <p className="text-zinc-300 leading-relaxed">{project.solution}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                {project.stack.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs font-mono rounded-full border border-cyan-500/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
};
