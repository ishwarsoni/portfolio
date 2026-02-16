"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const StickyContact = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling past hero (approx 800px)
            if (window.scrollY > 800) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed bottom-6 right-6 z-50"
                >
                    <Link
                        href="/hire-me"
                        className="group flex items-center gap-3 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-1"
                    >
                        <span>Available for Hire</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
