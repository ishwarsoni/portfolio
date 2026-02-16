import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { SectionDivider } from "@/components/SectionDivider";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
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

      <footer className="py-8 text-center text-zinc-600 text-xs font-mono border-t border-zinc-900 bg-zinc-950">
        <p>© {new Date().getFullYear()} Ishwar Soni. Built with Next.js & Tailwind.</p>
      </footer>
    </main>
  );
}
