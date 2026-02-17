import { Section } from "./Section";
import { portfolioData } from "@/data/portfolio";

export const Experience = () => {
    return (
        <Section id="experience">
            <div className="space-y-12">
                <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-3">
                    <span className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full" />
                    Experience
                </h2>

                <div className="border-l border-zinc-800/50 pl-8 space-y-12 relative ml-4">
                    {/* Gradient fade for timeline line */}
                    <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-cyan-500/50 via-zinc-800/50 to-transparent" />

                    {portfolioData.experience.map((job, index) => (
                        <div key={index} className="relative group">
                            {/* Timeline dot */}
                            <div className="absolute -left-[41px] top-2 w-5 h-5 rounded-full bg-zinc-950 border border-zinc-800 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-cyan-400 transition-colors" />
                            </div>

                            <div className="space-y-4 relative">
                                <div className="absolute -inset-4 bg-zinc-900/0 group-hover:bg-zinc-900/30 rounded-lg transition-colors duration-300 -z-10" />

                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors">{job.company}</h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-zinc-400 text-sm font-mono mt-1">
                                        <span className="text-cyan-500/80">{job.role}</span>
                                        <span className="hidden sm:inline text-zinc-600">•</span>
                                        <span>{job.location}</span>
                                    </div>
                                </div>

                                <p className="text-zinc-300 leading-relaxed max-w-3xl">{job.description}</p>

                                <ul className="space-y-2">
                                    {job.achievements.map((item, i) => (
                                        <li key={i} className="text-zinc-400 text-sm pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-zinc-700 group-hover:before:bg-cyan-500/50 transition-colors">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
