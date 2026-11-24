export interface EducationMilestone {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  details: string;
  isPlaceholder: boolean;
}

export const EDUCATION_MILESTONES: readonly EducationMilestone[] = [
  {
    id: "btech-it",
    period: "2024 – 2028",
    title: "Bachelor of Technology in Information Technology",
    subtitle: "Undergraduate Engineering Degree · Class of 2028",
    details:
      "Focusing on software engineering fundamentals, full-stack web architecture, data analytics, relational databases, and applied artificial intelligence & machine learning.",
    isPlaceholder: false,
  },
  {
    id: "institution-slot",
    period: "Institution Details",
    title: "University / College Name (Editable Placeholder)",
    subtitle: "Add verified institution name and location in src/data/education.ts",
    details:
      "Kept intentionally blank rather than inventing an institution name. Update this entry with your official college name and key coursework.",
    isPlaceholder: true,
  },
  {
    id: "certifications-slot",
    period: "Certifications & Milestones",
    title: "Verified Certifications & Achievements (Editable Placeholder)",
    subtitle: "Add official certificates, hackathons, or academic honors",
    details:
      "Placeholder slot reserved exclusively for verified accomplishments, technical workshops, or hackathon recognitions supplied by Rashmi.",
    isPlaceholder: true,
  },
];
