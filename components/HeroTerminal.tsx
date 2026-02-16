"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TERMINAL_LINES = [
    { text: "> initializing neural interface...", color: "text-zinc-400" },
    { text: "> loading modules [vision, nlp, rl]...", color: "text-zinc-400" },
    { text: "> connection established", color: "text-green-500" },
    { text: "> system ready", color: "text-cyan-400" },
    { text: "> _", color: "text-zinc-500 animate-pulse" },
];

export const HeroTerminal = () => {
    const [lineCount, setLineCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLineCount(prev => {
                if (prev < TERMINAL_LINES.length) {
                    return prev + 1;
                }
                clearInterval(interval);
                return prev;
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-lg mx-auto relative group"
        >
            {/* Glow backing */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

            {/* Terminal Window */}
            <div className="relative rounded-xl border border-white/10 bg-zinc-950/90 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="text-xs font-mono text-zinc-500">system_v2.0.sh</div>
                </div>

                {/* Content */}
                <div className="p-6 font-mono text-sm space-y-2 h-[200px] overflow-hidden">
                    {TERMINAL_LINES.slice(0, lineCount).map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${line.color}`}
                        >
                            {line.text}
                        </motion.div>
                    ))}
                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-20 pointer-events-none animate-scan" />
            </div>
        </motion.div>
    );
};
