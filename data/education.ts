export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  location?: string;
}

export const education: Education = {
  institution: "Techno India NJR Institute of Technology",
  degree: "Bachelor of Technology (B.Tech)",
  field: "Computer Science",
  period: "2023 – 2027",
  location: "Udaipur, India",
};