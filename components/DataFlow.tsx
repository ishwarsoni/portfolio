"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Node = {
    id: number;
    x: number;
    y: number;
    r: number;
};

type Connection = {
    from: Node;
    to: Node;
    dist: number;
};

export const DataFlow = () => {
    const [connections, setConnections] = useState<Connection[]>([]);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Procedural generation of nodes for a "neural network" look
        // We generate this in useEffect to ensure consistent client-side rendering
        const generatedNodes = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            r: Math.random() * 2 + 1,
        }));

        const generatedConnections = generatedNodes.flatMap((node, i) =>
            generatedNodes.slice(i + 1).map(other => {
                const dist = Math.hypot(node.x - other.x, node.y - other.y);
                return dist < 30 ? { from: node, to: other, dist } : null;
            })
        ).filter(Boolean) as Connection[];

        setNodes(generatedNodes);
        setConnections(generatedConnections);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 select-none">
            <svg className="w-full h-full">
                {connections.map((conn, i) => (
                    <motion.line
                        key={i}
                        x1={`${conn.from.x}%`}
                        y1={`${conn.from.y}%`}
                        x2={`${conn.to.x}%`}
                        y2={`${conn.to.y}%`}
                        stroke="url(#gradient-line)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 1],
                            opacity: [0, 0.4, 0],
                            strokeDashoffset: [0, -100]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2
                        }}
                    />
                ))}
                <defs>
                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                        <stop offset="50%" stopColor="rgba(6, 182, 212, 0.5)" />
                        <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Floating Data Particles */}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={`p-${i}`}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[1px]"
                    initial={{
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                        opacity: 0
                    }}
                    animate={{
                        y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                        x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1.5, 0]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};
