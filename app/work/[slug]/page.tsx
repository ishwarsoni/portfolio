import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { CaseStudyPage } from "@/components/work/CaseStudyPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    return { title: "Not Found" };
  }

  return {
    title: `${project.title} — Ishwar Soni | AI Engineer`,
    description: project.challenge,
    openGraph: {
      title: `${project.title} — Ishwar Soni`,
      description: project.challenge,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyRoute({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyPage project={project} />;
}