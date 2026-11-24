export interface BookVolume {
  id: string;
  number: string;
  title: string;
  spineColor: string;
  accentColor: string;
  subtitle: string;
  leftPage: {
    heading: string;
    paragraphs: readonly string[];
    highlightsLabel: string;
    highlights: readonly string[];
  };
  rightPage: {
    heading: string;
    entries: readonly {
      label: string;
      detail: string;
    }[];
    footnote: string;
  };
}

export const BOOK_VOLUMES: readonly BookVolume[] = [
  {
    id: "the-developer",
    number: "01",
    title: "The Developer",
    spineColor: "#3F6049",
    accentColor: "#91A58D",
    subtitle: "About Me & Profile",
    leftPage: {
      heading: "Rashmi Pathak",
      paragraphs: [
        "Information Technology engineering student (Class of 2028) building practical software systems, intelligent applications, and expressive web interfaces.",
        "Drawn equally to clean system architecture and visual craft—understanding both how models and APIs reason under the hood and how interfaces feel in the hand.",
      ],
      highlightsLabel: "Core Focus Areas",
      highlights: [
        "Software Engineering & Full-Stack Web",
        "Artificial Intelligence & Machine Learning",
        "Backend APIs & Data Analytics",
        "Financial Technology & Interactive UI",
      ],
    },
    rightPage: {
      heading: "Working Philosophy",
      entries: [
        {
          label: "Build",
          detail: "Turn ideas into working software end-to-end—from schema to pixel.",
        },
        {
          label: "Learn",
          detail: "Dig into fundamentals: algorithms, data pipelines, and system design.",
        },
        {
          label: "Experiment",
          detail: "Prototype ML workflows, feature engineering, and interactive graphics.",
        },
        {
          label: "Iterate",
          detail: "Refine clarity, accessibility, and performance with every revision.",
        },
      ],
      footnote: "GitHub: github.com/Rashmi-Pathak",
    },
  },
  {
    id: "the-arsenal",
    number: "02",
    title: "The Arsenal",
    spineColor: "#1F364D",
    accentColor: "#91A58D",
    subtitle: "Technical Skills & Stack",
    leftPage: {
      heading: "Web & Systems Stack",
      paragraphs: [
        "A practical toolkit spanning modern React/Next.js frontends, typed TypeScript architecture, RESTful backends, and Python-powered data workflows.",
      ],
      highlightsLabel: "Frontend & Backend",
      highlights: [
        "React · Next.js · TypeScript · JavaScript",
        "HTML · CSS · Tailwind CSS · GSAP",
        "REST APIs · Node.js · Authentication",
      ],
    },
    rightPage: {
      heading: "Data & Intelligence Stack",
      entries: [
        {
          label: "AI / ML",
          detail: "Python, Machine Learning, Artificial Intelligence, Scikit-learn",
        },
        {
          label: "Data Analytics",
          detail: "NumPy, Pandas, Matplotlib, Exploratory Analysis",
        },
        {
          label: "Databases",
          detail: "SQL, PostgreSQL, MySQL, SQLite",
        },
        {
          label: "Engineering",
          detail: "Modular UI architecture, Git workflows, Data modeling",
        },
      ],
      footnote: "Only verified portfolio technologies are listed.",
    },
  },
  {
    id: "the-experiments",
    number: "03",
    title: "The Experiments",
    spineColor: "#5E232D",
    accentColor: "#D6A15B",
    subtitle: "AI/ML & Data Projects",
    leftPage: {
      heading: "Intelligence & Analytics",
      paragraphs: [
        "Explorations in machine learning, risk classification, and predictive modeling—bridging Python notebooks with practical application interfaces.",
      ],
      highlightsLabel: "Featured AI/ML Titles",
      highlights: [
        "FraudShield AI — Financial Anomaly & Risk Detection",
        "CyberPredict — Predictive Security Modeling",
        "Data Cleaning & Feature Engineering Workflows",
      ],
    },
    rightPage: {
      heading: "Experimentation Loop",
      entries: [
        {
          label: "01. Prepare",
          detail: "Inspect distributions, handle missing records, and normalize features.",
        },
        {
          label: "02. Model",
          detail: "Train and compare baselines cleanly without overfitting.",
        },
        {
          label: "03. Visualize",
          detail: "Plot trends and prediction behavior with Matplotlib & interactive UI.",
        },
        {
          label: "Note",
          detail: "Repository links & verified metrics can be expanded in src/data/projects.ts.",
        },
      ],
      footnote: "Explore interactive visualizations in Scene 09 (AI/ML Lab).",
    },
  },
  {
    id: "the-engineering-lab",
    number: "04",
    title: "The Engineering Lab",
    spineColor: "#25292B",
    accentColor: "#C5A66D",
    subtitle: "Software Development Projects",
    leftPage: {
      heading: "Full-Stack & FinTech Builds",
      paragraphs: [
        "Applications focused on structured software design, clean user workflows, and domain-specific interfaces across FinTech and consumer web.",
      ],
      highlightsLabel: "Featured Software Titles",
      highlights: [
        "TradeCore — Financial Technology Platform",
        "TripEase — Travel Planning Web Application",
        "Bluestock MF — Mutual Fund Exploration Interface",
      ],
    },
    rightPage: {
      heading: "Architecture Habits",
      entries: [
        {
          label: "Separation",
          detail: "Clear boundaries between presentation UI, API routes, and storage.",
        },
        {
          label: "Type Safety",
          detail: "Strict TypeScript contracts across data models and components.",
        },
        {
          label: "Usability",
          detail: "Accessible controls, responsive grids, and clear feedback states.",
        },
        {
          label: "Case Studies",
          detail: "Select any project in Scene 11 to inspect details & placeholders.",
        },
      ],
      footnote: "All 5 projects are indexed in Scene 11.",
    },
  },
  {
    id: "the-journey",
    number: "05",
    title: "The Journey",
    spineColor: "#9A7432",
    accentColor: "#F0E7D9",
    subtitle: "Education, Milestones & Resume",
    leftPage: {
      heading: "Academic Foundation",
      paragraphs: [
        "Pursuing a Bachelor of Technology in Information Technology (2024–2028), building steadily from core programming toward full-stack systems and AI.",
      ],
      highlightsLabel: "Verified Timeline",
      highlights: [
        "2024 — Started B.Tech in Information Technology",
        "Ongoing — Full-Stack, FinTech & AI/ML Builds",
        "2028 — Expected Graduation (Class of 2028)",
      ],
    },
    rightPage: {
      heading: "Credentials & Links",
      entries: [
        {
          label: "Degree",
          detail: "B.Tech Information Technology (2024–2028)",
        },
        {
          label: "GitHub",
          detail: "github.com/Rashmi-Pathak",
        },
        {
          label: "Resume PDF",
          detail: "Editable placeholder — attach resume file in src/data/profile.ts",
        },
        {
          label: "Achievements",
          detail: "Editable slots reserved in Scene 12 for verified honors.",
        },
      ],
      footnote: "Scroll to Scene 12 for the interactive timeline.",
    },
  },
];
