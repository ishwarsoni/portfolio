import { Section } from "./Section";
import { portfolioData } from "@/data/portfolio";

export const Skills = () => {
    return (
        <Section id="skills">
            <div className="space-y-12">
                <h2 className="text-2xl font-bold text-white">Technical Skills</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {portfolioData.skills.map((skillGroup, index) => (
                        <div key={index} className="space-y-4 p-5 rounded-lg border border-zinc-900/50 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors">
                            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                                {skillGroup.category}
                            </h3>
                            <ul className="space-y-2">
                                {skillGroup.items.map((skill, i) => (
                                    <li key={i} className="text-zinc-400 hover:text-white transition-colors cursor-default flex items-center gap-2">
                                        <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
