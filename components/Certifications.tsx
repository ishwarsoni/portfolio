import { Section } from "./Section";
import { portfolioData } from "@/data/portfolio";

export const Certifications = () => {
    return (
        <Section id="certifications">
            <div className="space-y-12">
                <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-3">
                    <span className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full" />
                    Certifications
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolioData.certifications.map((cert, index) => (
                        <a
                            key={index}
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block p-6 rounded-lg border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900/50 hover:border-cyan-500/30 transition-all duration-300"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 -z-10" />

                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/50 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-zinc-500 group-hover:text-cyan-400 transition-colors"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                        />
                                    </svg>
                                </div>

                                <div className="space-y-1.5 flex-1 min-w-0">
                                    <h3 className="text-white font-semibold group-hover:text-cyan-100 transition-colors leading-snug">
                                        {cert.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm font-mono">
                                        <span className="text-cyan-500/80">{cert.issuer}</span>
                                        <span className="text-zinc-600">•</span>
                                        <span className="text-zinc-500">{cert.date}</span>
                                    </div>
                                </div>

                                {/* External link indicator */}
                                <svg
                                    className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                    />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </Section>
    );
};
