import { Hero } from "@/components/Hero";
import dynamic from "next/dynamic";
import { SectionDivider } from "@/components/SectionDivider";

const About = dynamic(() => import("@/components/About").then(mod => mod.About));
const Experience = dynamic(() => import("@/components/Experience").then(mod => mod.Experience));
const Projects = dynamic(() => import("@/components/Projects").then(mod => mod.Projects));
const Skills = dynamic(() => import("@/components/Skills").then(mod => mod.Skills));
const Contact = dynamic(() => import("@/components/Contact").then(mod => mod.Contact));

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="relative z-10">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Contact />

        <footer className="py-8 text-center text-zinc-600 text-xs font-mono border-t border-zinc-900">
          <p>© {new Date().getFullYear()} Ishwar Soni. Built with Next.js & Tailwind.</p>
        </footer>
      </div>
    </main>
  );
}