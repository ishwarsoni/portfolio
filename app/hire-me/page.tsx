import { ArrowRight, Download, Mail, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/Section";

export default function HireMe() {
    return (
        <div className="min-h-screen pt-24 pb-12">
            <Section id="hire-me-content">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                            Ready to Build Systems <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                That Actually Work?
                            </span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            I specialize in turning research code into reliable production pipelines.
                            If you need an engineer who cares about data integrity, stability, and shipping, let's talk.
                        </p>
                    </div>

                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="grid md:grid-cols-2 gap-12 relative z-10">
                            <div className="space-y-8">
                                <h3 className="text-2xl font-bold text-white">What I Bring to the Team</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Production-grade ML pipelines (no spaghetti notebooks)",
                                        "Deep expertise in human motion & coordinate systems",
                                        "Reliable deployment (Docker, FastAPI, Cloud)",
                                        "Clear communication & documentation",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-zinc-300">
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-4">
                                    <a
                                        href="/Ishwar_Soni_Resume.pdf"
                                        download="Ishwar_Soni_Resume.pdf"
                                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors border-b border-zinc-700 hover:border-white pb-1"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Resume
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-8 border-l border-zinc-800 pl-0 md:pl-12">
                                <h3 className="text-2xl font-bold text-white">Let&apos;s Connect</h3>
                                <p className="text-zinc-400">
                                    Currently open to: <br />
                                    <span className="text-white font-medium">Full-time roles in Applied ML / Computer Vision</span>
                                </p>

                                <div className="space-y-4">
                                    <a
                                        href="mailto:ishwarsoni2917@gmail.com"
                                        className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors"
                                    >
                                        <Mail className="w-5 h-5" />
                                        Email Me Directly
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/ishwar-soni-cs"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-700"
                                    >
                                        Connect on LinkedIn
                                        <ArrowRight className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
