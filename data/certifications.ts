export interface Certification {
  title: string;
  issuer: string;
  date: string;
  type: string;
  verifyUrl: string;
  description?: string;
}

export const certifications: Certification[] = [
  {
    title: "Building RAG Agents with LLMs",
    issuer: "NVIDIA",
    date: "Nov 2025",
    type: "Certification",
    verifyUrl: "https://learn.nvidia.com/certificates?id=u8dJRK5IQEe0CjntZD-S0g",
    description: "Developing production RAG architectures using NVIDIA NIM and LLM frameworks.",
  },
  {
    title: "Develop Generative AI Apps with Azure OpenAI and Semantic Kernel",
    issuer: "Microsoft",
    date: "Feb 2026",
    type: "Applied Skills",
    verifyUrl: "https://learn.microsoft.com/en-in/users/ishwarsoni-6131/credentials/84da87053a16814a",
    description: "Building generative AI applications with Azure OpenAI Service and Semantic Kernel orchestration.",
  },
];