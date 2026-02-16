"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { portfolioData } from "@/data/portfolio";
import { Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export const Contact = () => {
    return (
        <Section id="contact" className="py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto text-center space-y-8"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Ready to Ship?</h2>
                <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                    I&apos;m currently looking for early-stage AI startups and strong ML engineering teams.
                    If you need someone who can handle messy data and production systems, let&apos;s talk.
                </p>

                <div className="flex flex-wrap justify-center gap-6 pt-8">
                    <Link
                        href={`mailto:${portfolioData.contact.email}`}
                        className="flex items-center gap-2 text-zinc-300 bg-zinc-900/50 border border-zinc-800 px-6 py-3 rounded-md hover:text-white hover:border-cyan-500/30 hover:bg-zinc-800/50 transition-all duration-300"
                    >
                        <Mail size={20} className="text-cyan-500" />
                        <span>Email Me</span>
                    </Link>
                    <Link
                        href={portfolioData.contact.github}
                        className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors px-4 py-3"
                    >
                        <Github size={20} />
                        <span>GitHub</span>
                    </Link>
                    <Link
                        href={portfolioData.contact.linkedin}
                        className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors px-4 py-3"
                    >
                        <Linkedin size={20} />
                        <span>LinkedIn</span>
                    </Link>
                </div>
            </motion.div>
        </Section>
    );
};
