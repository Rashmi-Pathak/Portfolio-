export interface PortfolioLink {
  id: "github" | "linkedin" | "email" | "resume";
  label: string;
  href: string | null;
  isExternal: boolean;
  isPlaceholder: boolean;
  placeholderHint?: string;
}

export interface ProfileData {
  name: string;
  firstName: string;
  siteTitle: string;
  roles: readonly string[];
  headline: {
    prefix: string;
    primary: string;
  };
  bio: string;
  education: {
    degree: string;
    graduationLabel: string;
    years: string;
  };
  interests: readonly string[];
  links: readonly PortfolioLink[];
}

export const PROFILE: ProfileData = {
  name: "Rashmi Pathak",
  firstName: "Rashmi",
  siteTitle: "RASHMI — THE DEVELOPER SPACE",
  roles: ["Software Developer", "AI/ML Enthusiast", "Web Developer"],
  headline: {
    prefix: "HELLO, I'M",
    primary: "RASHMI PATHAK.",
  },
  bio: "I'm an Information Technology engineering student passionate about building intelligent applications, designing software systems, and exploring the intersection of AI and technology.",
  education: {
    degree: "B.Tech Information Technology",
    graduationLabel: "Class of 2028",
    years: "2024–2028",
  },
  interests: [
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Full-Stack Development",
    "Data Analytics",
    "Backend Engineering",
    "Financial Technology",
    "Interactive Web Experiences",
  ],
  links: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/Rashmi-Pathak",
      isExternal: true,
      isPlaceholder: false,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rashmi-pathak-3a1a77240/",
      isExternal: true,
      isPlaceholder: false,
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:rashmipathak2006@gmail.com",
      isExternal: false,
      isPlaceholder: false,
    },
    {
      id: "resume",
      label: "Resume",
      href: "/resume/Rashmi_Pathak_Resume.pdf",
      isExternal: true,
      isPlaceholder: false,
    },
  ],
};

export interface MilestonePreviewItem {
  number: string;
  title: string;
  subtitle: string;
  milestone: string;
}

export const UPCOMING_SCENES: readonly MilestonePreviewItem[] = [
  {
    number: "04–05",
    title: "About & Interactive Bookshelf",
    subtitle: "Editorial biography & 5 tactile portfolio volumes",
    milestone: "Milestone 2",
  },
  {
    number: "06",
    title: "3D Laptop Entrance",
    subtitle: "Programmatic hinge rig & aligned React screen overlay",
    milestone: "Milestone 3",
  },
  {
    number: "07–10",
    title: "The Technical World",
    subtitle: "Frontend, Backend, AI/ML Lab & Data Engineering visualizations",
    milestone: "Milestone 5",
  },
  {
    number: "11–13",
    title: "Projects, Journey & Farewell",
    subtitle: "Case studies, B.Tech 2024–2028 timeline & outro workspace",
    milestone: "Milestone 6",
  },
];
