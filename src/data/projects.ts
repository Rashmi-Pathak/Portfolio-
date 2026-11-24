export type ProjectCategoryId =
  | "all"
  | "ai-ml"
  | "fintech"
  | "cybersecurity"
  | "full-stack"
  | "creative";

export type ProjectCategoryName =
  | "AI / ML"
  | "FinTech & Finance"
  | "Cybersecurity"
  | "Full Stack"
  | "Creative";

export interface ProjectCategoryMeta {
  id: ProjectCategoryId;
  label: string;
  matchCategory: ProjectCategoryName | null;
  iconName:
    | "layers"
    | "brain-circuit"
    | "chart-no-axes-combined"
    | "shield-check"
    | "code"
    | "gamepad-2";
}

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: readonly ProjectCategoryName[];
  technologies: readonly string[];
  features: readonly string[];
  githubUrl: string;
  liveUrl: string | null;
  apiUrl?: string | null;
  screenshots: readonly string[];
  featured: boolean;
  featuredLabel?: string;
  contributionNote?: string;
  visualTheme:
    | "aegis"
    | "investra"
    | "obsidian"
    | "fraudshield"
    | "veridex"
    | "neuramesh"
    | "ntro"
    | "buddy"
    | "veda"
    | "flowgrid"
    | "attendlink"
    | "supportdesk"
    | "edusphere"
    | "bluestock"
    | "gharkataste"
    | "keyboardbreaker";
}

export const PROJECT_CATEGORIES: readonly ProjectCategoryMeta[] = [
  { id: "all", label: "All Projects", matchCategory: null, iconName: "layers" },
  {
    id: "ai-ml",
    label: "AI / ML",
    matchCategory: "AI / ML",
    iconName: "brain-circuit",
  },
  {
    id: "fintech",
    label: "FinTech & Finance",
    matchCategory: "FinTech & Finance",
    iconName: "chart-no-axes-combined",
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    matchCategory: "Cybersecurity",
    iconName: "shield-check",
  },
  {
    id: "full-stack",
    label: "Full Stack",
    matchCategory: "Full Stack",
    iconName: "code",
  },
  {
    id: "creative",
    label: "Creative",
    matchCategory: "Creative",
    iconName: "gamepad-2",
  },
];

export const PROJECTS: readonly ProjectItem[] = [
  {
    id: "aegis",
    number: "001",
    name: "Aegis",
    shortDescription: "AI Business Risk & Decision Intelligence Platform.",
    fullDescription:
      "A Python-first enterprise intelligence platform that unifies operational business data and converts it into anomaly detection, predictive forecasts, risk quantification, causal business digital twins, and decision-support recommendations.",
    category: ["AI / ML", "FinTech & Finance"],
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Vite",
      "Pandas",
      "Polars",
      "NumPy",
      "Scikit-learn",
      "LightGBM",
      "XGBoost",
      "SARIMAX",
      "NetworkX",
      "SQLAlchemy",
      "SQLite/PostgreSQL",
    ],
    features: [
      "Executive command centre",
      "Enterprise forecasting (SARIMAX, LightGBM, XGBoost)",
      "Anomaly detection across operational metrics",
      "Bayesian risk quantification",
      "Business digital twin graphs",
      "What-if simulation studio",
      "Decision-support workflows",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/Aegis",
    liveUrl: "https://aegis-xi-coral.vercel.app/",
    screenshots: ["/assets/projects/aegis/aegis-home.jpg"],
    featured: true,
    featuredLabel: "FEATURED",
    visualTheme: "aegis",
  },
  {
    id: "investra",
    number: "002",
    name: "Investra",
    shortDescription: "Next-Generation Stock Market Learning OS.",
    fullDescription:
      "An interactive stock-market learning and simulation platform designed to teach disciplined investing using realistic salary-based investment scenarios, broker-style trading environments, and financial learning laboratories.",
    category: ["FinTech & Finance"],
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Highcharts",
      "Zustand",
      "Turborepo",
      "Web Speech API",
    ],
    features: [
      "Real-life salary and SIP simulation",
      "Multiple broker terminal environments",
      "Interactive financial learning labs",
      "AI mentor",
      "Pre-trade risk checks",
      "Historical market crash replay",
      "Interactive market charts",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/Investra",
    liveUrl: "https://investra-ruby.vercel.app/",
    screenshots: ["/assets/projects/investra/investra-home.jpg"],
    featured: true,
    visualTheme: "investra",
  },
  {
    id: "obsidian",
    number: "003",
    name: "OBSIDIAN",
    shortDescription: "Real-Time Technology Intelligence Observatory.",
    fullDescription:
      "A technology intelligence platform that aggregates and analyses live signals across technology news, research, security vulnerabilities, open-source activity, software releases, and technology job markets.",
    category: ["AI / ML", "Cybersecurity"],
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
      "GSAP",
      "Lenis",
      "Groq",
      "Deepgram",
      "Ollama",
    ],
    features: [
      "15 technology clusters",
      "16 API data pipelines",
      "CISA KEV and NIST NVD intelligence",
      "arXiv and research signals",
      "GitHub and software-release tracking",
      "AI analyst & voice interaction",
      "Interactive data visualisation",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/obsidian-",
    liveUrl: "https://obsidian-lilac-mu.vercel.app",
    screenshots: [
      "/assets/projects/obsidian/obsidian-home.jpg",
      "/assets/projects/obsidian/obsidian-hero-overview.png",
      "/assets/projects/obsidian/obsidian-threat-signal.png",
      "/assets/projects/obsidian/obsidian-cubes-matrix.png",
    ],
    featured: true,
    visualTheme: "obsidian",
  },
  {
    id: "fraudshield-ai",
    number: "004",
    name: "FraudShield AI",
    shortDescription: "Real-Time Transaction Monitoring & Fraud Detection.",
    fullDescription:
      "A financial fraud detection platform that combines machine-learning models, deterministic rules, and real-time transaction streaming to identify suspicious financial activity.",
    category: ["FinTech & Finance", "Cybersecurity"],
    technologies: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "SQLite",
      "Pandas",
      "Scikit-learn",
      "XGBoost",
      "SHAP",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "WebSockets",
    ],
    features: [
      "Real-time transaction simulation",
      "WebSocket-based streaming",
      "Ensemble ML predictions with SHAP explainability",
      "Fraud probability scoring",
      "Deterministic rule engine",
      "Feature engineering",
      "Investigation dashboard & alert management",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/Fraud-Shield-",
    liveUrl: "https://fraud-shield-beta.vercel.app",
    screenshots: ["/assets/projects/fraudshield/fraudshield-home.jpg"],
    featured: true,
    visualTheme: "fraudshield",
  },
  {
    id: "veridex",
    number: "005",
    name: "Veridex",
    shortDescription: "C2PA Media Provenance & Authenticity Recovery.",
    fullDescription:
      "An open-source C2PA Soft Binding Resolution (SBR) and media provenance recovery platform (originating from StephenSook/veridex, Apache-2.0) designed to recover stripped C2PA provenance using invisible watermark or perceptual-hash matching, signed manifests, and tamper-evident transparency proofs.",
    contributionNote:
      "Fork contributions (117 commits) across Next.js web interface, FastAPI SBR API deployment, and provenance workflow integration.",
    category: ["AI / ML", "Cybersecurity"],
    technologies: [
      "Python 3.11+",
      "FastAPI",
      "Next.js 15",
      "TypeScript",
      "C2PA SBR 2.4",
      "Perceptual Hashing",
      "Merkle Transparency Logs",
      "Browser Extension",
    ],
    features: [
      "Media provenance recovery",
      "C2PA soft binding resolution",
      "Invisible watermark matching",
      "Perceptual hash matching",
      "Signed manifest recovery",
      "Merkle transparency proofs",
      "Web interface, CLI, MCP & FastAPI server",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/Veridex",
    liveUrl: "https://veridex-ruddy-xi.vercel.app/",
    apiUrl: "https://veridex-api-ubvc.onrender.com",
    screenshots: ["/assets/projects/veridex/veridex-home.jpg"],
    featured: true,
    visualTheme: "veridex",
  },
  {
    id: "neuramesh-ai",
    number: "006",
    name: "NeuraMesh AI",
    shortDescription: "Multi-Agent AI Research Studio.",
    fullDescription:
      "An AI research environment that uses specialised agents working together to analyse complex topics, brainstorm ideas, and interact with documents.",
    category: ["AI / ML"],
    technologies: ["React 18", "TypeScript", "Tailwind CSS", "Groq API", "Radix UI"],
    features: [
      "Multi-agent research collaboration",
      "Document question answering",
      "Research synthesis",
      "AI-assisted analysis",
      "Fact-checking & bias-checking workflows",
      "Persistent research context",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/NeuraMesh-AI",
    liveUrl: null,
    screenshots: ["/assets/projects/neuramesh/neuramesh-home.jpg"],
    featured: true,
    visualTheme: "neuramesh",
  },
  {
    id: "ntro-ai-cyber-forecast",
    number: "007",
    name: "NTRO AI Cyber Forecast",
    shortDescription:
      "AI-Based Network Attack Forecasting & Decision Support Platform.",
    fullDescription:
      "A cybersecurity threat forecasting and decision-support platform built around predicting and analysing possible network attack stages.",
    category: ["Cybersecurity"],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Recharts",
      "FastAPI",
      "Pandas",
      "Scikit-learn",
      "NetworkX",
    ],
    features: [
      "Cyber threat forecasting",
      "Attack progression analysis",
      "Threat intelligence dashboard",
      "Security decision support",
      "Predictive threat analysis",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/NTRO_AI_CYBER_FORCAST",
    liveUrl: "https://ntro-ai-cyber-forcast.vercel.app",
    screenshots: [
      "/assets/projects/ntro/ntro-home.jpg",
      "/assets/projects/ntro/media_1788613721804.png",
      "/assets/projects/ntro/media_1788613908926.png",
    ],
    featured: false,
    visualTheme: "ntro",
  },
  {
    id: "buddy-ai",
    number: "008",
    name: "Buddy AI",
    shortDescription: "AI Coding & Learning Companion.",
    fullDescription:
      "An AI-assisted learning workspace that helps learners understand concepts, ask questions, visualise algorithms, code, practise, debug, and build projects.",
    category: ["AI / ML"],
    technologies: [
      "React",
      "TypeScript",
      "Monaco Editor",
      "React Flow",
      "D3.js",
      "Three.js",
      "Express",
      "Prisma",
      "Groq SDK",
      "Gemini API",
      "Deepgram",
    ],
    features: [
      "Personalised learning roadmaps",
      "Context-aware AI assistance",
      "Hint-first support",
      "Visual algorithm explanations",
      "Integrated Monaco coding workspace",
      "Practice problems & debugging support",
      "Learning progress and memory",
    ],
    githubUrl:
      "https://github.com/Rashmi-Pathak/BUDDY-AI-Coding-Learning-Companion",
    liveUrl: null,
    screenshots: ["/assets/projects/buddy-ai/buddy.jpg"],
    featured: false,
    visualTheme: "buddy",
  },
  {
    id: "veda",
    number: "009",
    name: "Veda",
    shortDescription: "Ancient Wisdom, in Conversation.",
    fullDescription:
      "A modern, research-oriented Ayurveda knowledge platform powered by AI retrieval and conversational exploration.",
    category: ["AI / ML"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "pgvector",
      "Gemini API",
      "Framer Motion",
    ],
    features: [
      "Ayurveda knowledge discovery",
      "Research-oriented information access",
      "AI-powered conversation",
      "Vector retrieval and knowledge exploration",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/Veda",
    liveUrl: "https://veda-drab.vercel.app",
    screenshots: [
      "/assets/projects/veda/veda-home.jpg",
      "/assets/projects/veda/hero-mountains.png",
      "/assets/projects/veda/ayurveda-manuscripts.png",
    ],
    featured: false,
    visualTheme: "veda",
  },
  {
    id: "flowgrid",
    number: "010",
    name: "FlowGrid",
    shortDescription: "Real-Time Project Management & Collaboration Platform.",
    fullDescription:
      "A project management application with workspace collaboration, drag-and-drop task management, and real-time updates.",
    category: ["Full Stack"],
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "TanStack Query",
      "dnd-kit",
      "Radix UI",
      "Tailwind CSS",
    ],
    features: [
      "Authentication",
      "Multi-tenant workspaces",
      "Project management & drag-and-drop Kanban boards",
      "Task assignments, priority & due-date tracking",
      "Workspace chat & real-time updates",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/FlowGrid",
    liveUrl: "https://flowgrid-gules.vercel.app",
    screenshots: [
      "/assets/projects/flowgrid/FlowGrid.png",
      "/assets/projects/flowgrid/FlowFoundry.png",
    ],
    featured: false,
    visualTheme: "flowgrid",
  },
  {
    id: "attendlink",
    number: "011",
    name: "AttendLink",
    shortDescription: "Smart Wireless & Location-Aware Attendance System.",
    fullDescription:
      "A digital attendance verification platform that uses location-aware geofencing and session verification to help confirm physical presence in designated lecture halls and classrooms.",
    category: ["Cybersecurity", "Full Stack"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "Geolib",
      "Recharts",
      "jsPDF",
      "Tailwind CSS",
    ],
    features: [
      "Location-aware attendance",
      "Geofencing & perimeter checks",
      "Session-based verification",
      "Physical-presence checks",
      "Attendance analytics & PDF/CSV reporting",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/AttendLink",
    liveUrl: "https://attendlink.vercel.app",
    screenshots: ["/assets/projects/attendlink/attendlink-home.jpg"],
    featured: false,
    visualTheme: "attendlink",
  },
  {
    id: "supportdesk",
    number: "012",
    name: "SupportDesk CRM",
    shortDescription:
      "Enterprise Customer Support & Order Management System.",
    fullDescription:
      "A customer-support CRM with ticket management, order management, agent workflows, and AI-assisted support.",
    category: ["AI / ML", "Full Stack"],
    technologies: [
      "Next.js 16",
      "React",
      "TypeScript",
      "Google Apps Script",
      "Google Sheets",
      "LLaMA 3.3",
      "REST APIs",
      "Recharts",
    ],
    features: [
      "Ticket & order management",
      "Role-based access & round-robin agent assignment",
      "AI copilot & sentiment analysis",
      "Agent analytics & command palette",
      "Customer and staff workflows",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/SupportDesk",
    liveUrl: "https://support-desk-beta.vercel.app",
    screenshots: ["/assets/projects/supportdesk/supportdesk-home.jpg"],
    featured: false,
    visualTheme: "supportdesk",
  },
  {
    id: "edusphere",
    number: "013",
    name: "EduSphere",
    shortDescription: "School Management & Assessment System.",
    fullDescription:
      "A centralised school-management application for administrators, teachers, students, and parents.",
    category: ["AI / ML", "Full Stack"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "Gemini API",
      "Cloudinary",
      "Recharts",
    ],
    features: [
      "Role-based portals",
      "Student and teacher management",
      "Online examinations & assignments",
      "Attendance & academic performance analytics",
      "AI-assisted evaluation & parent progress monitoring",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/EduSphere",
    liveUrl: null,
    screenshots: [
      "/assets/projects/edusphere/edusphere-home.jpg",
      "/assets/projects/edusphere/hero-dashboard.png",
      "/assets/projects/edusphere/admin-dashboard.png",
      "/assets/projects/edusphere/ai-evaluation.jpeg",
      "/assets/projects/edusphere/student-dashboard.png",
    ],
    featured: false,
    visualTheme: "edusphere",
  },
  {
    id: "bluestock-mf-capstone",
    number: "014",
    name: "Bluestock MF Capstone",
    shortDescription:
      "Mutual Fund Analytics & Data Engineering Pipeline.",
    fullDescription:
      "An end-to-end data engineering and analytics project that processes mutual-fund data, builds a SQLite star-schema warehouse, and produces advanced financial analytics and an interactive Power BI dashboard.",
    category: ["FinTech & Finance"],
    technologies: [
      "Python",
      "SQLite",
      "Pandas",
      "NumPy",
      "SciPy",
      "Matplotlib",
      "Jupyter Notebook",
      "Power BI",
    ],
    features: [
      "Automated ETL pipeline",
      "NAV, AUM, SIP & transaction analytics",
      "SQLite star-schema warehouse",
      "VaR, CVaR & Rolling Sharpe ratio",
      "Sector HHI concentration analysis",
      "Five-page Power BI dashboard",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/bluestock_mf_capstone",
    liveUrl: null,
    screenshots: [
      "/assets/projects/bluestock/efficient_frontier.png",
      "/assets/projects/bluestock/aum_growth.png",
      "/assets/projects/bluestock/category_sharpe.png",
    ],
    featured: false,
    visualTheme: "bluestock",
  },
  {
    id: "ghar-ka-taste",
    number: "015",
    name: "Ghar Ka Taste",
    shortDescription: "Food Delivery Platform with Chef Profiles.",
    fullDescription:
      "A full-stack food-delivery application centred around home-cooked meal discovery, chef profiles, order handling, and email notifications.",
    category: ["Full Stack"],
    technologies: [
      "React",
      "Vite",
      "React Router DOM",
      "Framer Motion",
      "Express",
      "LibSQL",
      "JWT Auth",
      "Axios",
    ],
    features: [
      "Home chef profiles & menu browsing",
      "Cart & order checkout flow",
      "Express backend API with LibSQL storage",
      "Authentication & email notifications",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/ghar-ka-taste",
    liveUrl: "https://ghar-ka-taste-sooty.vercel.app",
    screenshots: [
      "/assets/projects/ghar-ka-taste/gharkataste-home.jpg",
      "/assets/projects/ghar-ka-taste/hero.png",
    ],
    featured: false,
    visualTheme: "gharkataste",
  },
  {
    id: "keyboard-breaker",
    number: "016",
    name: "Keyboard Breaker",
    shortDescription: "13 Mini-Games. One Browser Arcade.",
    fullDescription:
      "A browser-based arcade containing a collection of 13 mini-games covering action, typing, reflex challenges, brain puzzles, and classic arcade games.",
    category: ["Creative"],
    technologies: [
      "React 18",
      "Vite 5",
      "Tailwind CSS",
      "React Router DOM",
      "Lucide React",
    ],
    features: [
      "13 playable mini-games",
      "Typing games & reflex challenges",
      "Brain puzzles & classic arcade modes",
      "3D carousel interface",
      "Custom animation and physics loops",
    ],
    githubUrl: "https://github.com/Rashmi-Pathak/Keyboard_Breaker",
    liveUrl: "https://keyboardbreaker.vercel.app",
    screenshots: [
      "/assets/projects/keyboard-breaker/keyboardbreaker-home.jpg",
      "/assets/projects/keyboard-breaker/bg-arcade.jpg",
      "/assets/projects/keyboard-breaker/bg-goodgames.png",
    ],
    featured: false,
    visualTheme: "keyboardbreaker",
  },
];

export function getCategoryCount(category: ProjectCategoryMeta): number {
  if (!category.matchCategory) return PROJECTS.length;
  return PROJECTS.filter((project) =>
    project.category.includes(category.matchCategory!)
  ).length;
}
