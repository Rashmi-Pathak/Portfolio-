export type JourneyCategoryType =
  | "experience"
  | "achievement"
  | "certification";

export type JourneyFilterId = "all" | JourneyCategoryType;

export type JourneyIllustrationType =
  | "laptop"
  | "trophy"
  | "medal"
  | "certificate";

export interface JourneyFilterOption {
  id: JourneyFilterId;
  label: string;
  iconKey: "layers" | "briefcase-business" | "trophy" | "award";
}

export interface JourneyMilestone {
  id: string;
  type: JourneyCategoryType;
  badgeLabel: string;
  title: string;
  organization: string;
  dateLabel?: string;
  shortSummary: string;
  fullDescription: string;
  highlights: readonly string[];
  tags: readonly string[];
  side: "left" | "right";
  illustration: JourneyIllustrationType;
}

export const JOURNEY_FILTERS: readonly JourneyFilterOption[] = [
  { id: "all", label: "All", iconKey: "layers" },
  { id: "experience", label: "Experience", iconKey: "briefcase-business" },
  { id: "achievement", label: "Achievements", iconKey: "trophy" },
  { id: "certification", label: "Certifications", iconKey: "award" },
];

export const JOURNEY_MILESTONES: readonly JourneyMilestone[] = [
  {
    id: "bluestock-data-analyst-intern",
    type: "experience",
    badgeLabel: "EXPERIENCE",
    title: "DATA ANALYST INTERN — BLUESTOCK",
    organization: "Bluestock",
    dateLabel: "MAY 2026 — JULY 2026",
    shortSummary:
      "Two-month internship focused on data analysis fundamentals and real-world datasets. Data cleaning, analysis and visualization under mentor guidance; mutual fund analytics capstone using NAV, AUM and SIP data.",
    fullDescription:
      "Completed a two-month Data Analyst Internship at Bluestock focused on data analysis fundamentals and real-world financial datasets, culminating in a mutual fund analytics capstone using NAV, AUM, and SIP data.",
    highlights: [
      "Practiced data cleaning, exploratory analysis, and visual reporting on real-world datasets under mentor guidance.",
      "Built a mutual fund analytics capstone analyzing NAV, AUM, and SIP performance metrics.",
    ],
    tags: ["Data Analytics", "Financial Data", "Python", "SQL", "Power BI"],
    side: "left",
    illustration: "laptop",
  },
  {
    id: "code-a-thon-winner",
    type: "achievement",
    badgeLabel: "ACHIEVEMENT",
    title: "WINNER — CODE-A-THON HACKATHON",
    organization: "Code-a-thon Hackathon",
    shortSummary: "Winner — Code-a-thon Hackathon.",
    fullDescription: "Winner — Code-a-thon Hackathon.",
    highlights: [
      "Awarded Winner distinction at the Code-a-thon Hackathon.",
    ],
    tags: ["Hackathon", "Winner"],
    side: "right",
    illustration: "trophy",
  },
  {
    id: "algorithmx-finalist",
    type: "achievement",
    badgeLabel: "ACHIEVEMENT",
    title: "FINALIST — ALGORITHMX HACKATHON",
    organization: "AlgorithmX Hackathon",
    shortSummary: "Finalist — AlgorithmX Hackathon.",
    fullDescription: "Finalist — AlgorithmX Hackathon.",
    highlights: [
      "Selected as a Finalist at the AlgorithmX Hackathon.",
    ],
    tags: ["Hackathon", "Finalist"],
    side: "left",
    illustration: "medal",
  },
  {
    id: "ethical-hacking-cyber-defense",
    type: "certification",
    badgeLabel: "CERTIFICATION",
    title: "ETHICAL HACKING & CYBER DEFENSE",
    organization: "Cybersecurity Training",
    shortSummary:
      "Training in vulnerability assessment, network sniffing and penetration testing using Kali Linux.",
    fullDescription:
      "Completed training in ethical hacking and cyber defense covering vulnerability assessment, network sniffing, and penetration testing using Kali Linux.",
    highlights: [
      "Practiced vulnerability assessment and network sniffing techniques.",
      "Conducted penetration testing exercises using Kali Linux.",
    ],
    tags: [
      "Cybersecurity",
      "Kali Linux",
      "Penetration Testing",
      "Network Sniffing",
    ],
    side: "right",
    illustration: "certificate",
  },
];

export function getJourneyCategoryCount(filterId: JourneyFilterId): number {
  if (filterId === "all") {
    return JOURNEY_MILESTONES.length;
  }
  return JOURNEY_MILESTONES.filter((item) => item.type === filterId).length;
}
