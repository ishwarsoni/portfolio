import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { Capabilities } from "@/components/sections/Capabilities";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Ishwar Soni — AI Engineer | Computer Vision · Motion Systems · Applied AI",
  description: "AI Engineer specializing in human motion processing (SMPL/SMPL-H), computer vision, and applied AI systems. Building reliable ML pipelines and RAG architectures.",
};

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Hero />
      <SelectedWork />
      <Experience />
      <Capabilities />
      <About />
      <Certifications />
      <Education />
      <Contact />
    </main>
  );
}