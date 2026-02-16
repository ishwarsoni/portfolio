"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const SEQUENCE = [
    { text: "> initializing neural_pipeline_v2...", delay: 50 },
    { text: "> loading amass_dataset [15.2GB]...", delay: 800 },
    { text: "> normalizing skeleton_hierarchy...", delay: 1600 },
    { text: "> optimizing motion_graph...", delay: 2400 },
    { text: "> system stable.", delay: 3200 },
];

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [lines, setLines] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex >= SEQUENCE.length) {
            const timeout = setTimeout(onComplete, 800); // Short pause after stable before reveal
            return () => clearTimeout(timeout);
        }

        const currentItem = SEQUENCE[currentIndex];
        const timeout = setTimeout(() => {
            setLines((prev) => [...prev, currentItem.text]);
            setCurrentIndex((prev) => prev + 1);
        }, currentItem.delay - (currentIndex > 0 ? SEQUENCE[currentIndex - 1].delay : 0));

        return () => clearTimeout(timeout);
    }, [currentIndex, onComplete]);

    return (
        <div className="font-mono text-sm md:text-base text-cyan-500/80 leading-relaxed tracking-wide h-[200px] flex flex-col justify-end pb-8">
            <AnimatePresence>
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {line}
                    </motion.div>
                ))}
            </AnimatePresence>
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2.5 h-4 bg-cyan-500 ml-1 translate-y-0.5"
            />
        </div>
    );
};
