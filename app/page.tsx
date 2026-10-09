import { Metadata } from "next";
import SeriesExperience from "@/components/series/SeriesExperience";

export const metadata: Metadata = {
  title: "Ishwar Soni — AI Engineer | The Series",
  description:
    "Ishwar Soni, AI Engineer — a cinematic, streaming-style portfolio. Applied AI, LLMs, RAG and machine learning, with experience in computer vision and motion processing.",
};

export default function Home() {
  return <SeriesExperience />;
}
