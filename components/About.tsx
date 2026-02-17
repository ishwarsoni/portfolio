import { Section } from "./Section";
import { portfolioData } from "@/data/portfolio";

export const About = () => {
    return (
        <Section id="about">
            <div className="space-y-12 pb-12">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <span className="w-1 h-8 bg-cyan-500 rounded-full" />
                            Engineering Mindset
                        </h2>
                        <p className="text-zinc-400 leading-relaxed text-lg">
                            {portfolioData.about.description}
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {portfolioData.about.points.map((point, index) => (
                            <div
                                key={index}
                                className="p-5 glass-card rounded-md hover:-translate-y-1 group transition-transform"
                            >
                                <p className="text-zinc-300 text-sm font-mono flex items-start gap-3">
                                    <span className="text-cyan-500 mt-1">/</span>
                                    <span className="group-hover:text-white transition-colors">{point}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};
