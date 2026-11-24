export interface SkillCategory {
  id: "frontend" | "backend" | "ai-ml" | "database";
  label: string;
  accent: "amber" | "sage" | "mauve" | "cream";
  items: readonly string[];
  description: string;
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend Engineering",
    accent: "amber",
    description:
      "Designing responsive interfaces, component systems, and smooth interactive web experiences.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    label: "Backend Engineering",
    accent: "sage",
    description:
      "Structuring REST APIs, authentication flows, server-side business logic, and reliable data layers.",
    items: [
      "REST APIs",
      "Node.js",
      "Authentication",
      "Server-Side Logic",
      "API Architecture",
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML & Analytics",
    accent: "mauve",
    description:
      "Experimenting with machine learning pipelines, exploratory data analysis, and model evaluation.",
    items: [
      "Python",
      "Machine Learning",
      "Artificial Intelligence",
      "Data Analytics",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Scikit-learn",
    ],
  },
  {
    id: "database",
    label: "Databases & Data Engineering",
    accent: "cream",
    description:
      "Modeling relational schemas, transforming tabular datasets, and writing structured SQL queries.",
    items: [
      "SQL",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Python",
      "Pandas",
    ],
  },
];

export type SkillCategoryId =
  | "languages"
  | "frontend"
  | "backend"
  | "database"
  | "ai-data"
  | "tools";

export type KeyRole = "main" | "special" | "function";

export interface SkillDefinition {
  id: string;
  name: string;
  abbreviation: string;
  category: string;
  categoryId: SkillCategoryId;
  row: number;
  widthUnits: number;
  keyRole: KeyRole;
  description: string;
  purpose: string;
  usage: string;
  familiarity: string;
  relatedProjects: readonly string[];
  logo: {
    glyph: string;
    shape: "code" | "layers" | "server" | "database" | "sparkles" | "terminal";
  };
}

export const KEYBOARD_ROWS = [
  { row: 0, label: "Languages" },
  { row: 1, label: "Frontend" },
  { row: 2, label: "Backend & Databases" },
  { row: 3, label: "AI & Data" },
  { row: 4, label: "Developer Tools" },
] as const;

export const TECHNICAL_SKILLS: readonly SkillDefinition[] = [
  // Row 0: Programming Languages (sum = 9.60u)
  {
    id: "java",
    name: "Java",
    abbreviation: "JAVA",
    category: "Programming Languages",
    categoryId: "languages",
    row: 0,
    widthUnits: 2.1,
    keyRole: "function",
    description:
      "A strongly typed, object-oriented language known for predictable memory management, platform independence, and structured backend engineering.",
    purpose:
      "Building object-oriented software architectures, backend microservices, and practicing data structures and algorithms.",
    usage:
      "Editable workspace note — update with specific Java / OOP projects and Spring Boot coursework highlights.",
    familiarity: "Core Coursework & Backend Foundations (Editable)",
    relatedProjects: ["TradeCore (Planned / Placeholder Architecture)"],
    logo: { glyph: "JV", shape: "code" },
  },
  {
    id: "python",
    name: "Python",
    abbreviation: "PYTHON",
    category: "Programming Languages",
    categoryId: "languages",
    row: 0,
    widthUnits: 2.25,
    keyRole: "special",
    description:
      "An expressive, readable general-purpose programming language prized across artificial intelligence, data science, scripting, and backend APIs.",
    purpose:
      "Training machine learning models, transforming tabular datasets, automating utilities, and prototyping intelligent applications.",
    usage:
      "Used across machine learning experimentation pipelines, data cleaning scripts, and exploratory analytics notebooks.",
    familiarity: "Active Daily Stack (Editable)",
    relatedProjects: ["FraudShield AI", "CyberPredict"],
    logo: { glyph: "PY", shape: "code" },
  },
  {
    id: "javascript",
    name: "JavaScript",
    abbreviation: "JAVASCRIPT",
    category: "Programming Languages",
    categoryId: "languages",
    row: 0,
    widthUnits: 2.65,
    keyRole: "function",
    description:
      "The native scripting language of the web platform that powers interactive user interfaces, asynchronous network flows, and full-stack tooling.",
    purpose:
      "Implementing client-side interactivity, asynchronous fetch workflows, DOM animation hooks, and server routes.",
    usage:
      "Core runtime foundation underneath full-stack web projects and interactive frontend components.",
    familiarity: "Active Web Stack (Editable)",
    relatedProjects: ["TripEase", "Bluestock MF"],
    logo: { glyph: "JS", shape: "code" },
  },
  {
    id: "typescript",
    name: "TypeScript",
    abbreviation: "TYPESCRIPT",
    category: "Programming Languages",
    categoryId: "languages",
    row: 0,
    widthUnits: 2.6,
    keyRole: "function",
    description:
      "A statically typed superset of JavaScript that verifies component contracts, API payloads, and data shapes before code reaches the browser.",
    purpose:
      "Writing maintainable UI components, strongly typed API schemas, and modular frontend engineering systems.",
    usage:
      "Used throughout Next.js application modules, 3D scene controllers, and strongly typed portfolio state.",
    familiarity: "Primary Frontend Language (Editable)",
    relatedProjects: ["TradeCore", "RASHMI.SPACE"],
    logo: { glyph: "TS", shape: "code" },
  },

  // Row 1: Frontend Development (sum = 9.60u)
  {
    id: "html",
    name: "HTML5",
    abbreviation: "HTML",
    category: "Frontend Development",
    categoryId: "frontend",
    row: 1,
    widthUnits: 1.6,
    keyRole: "main",
    description:
      "The semantic document structure of the web, defining landmarks, accessible forms, media containers, and meaningful heading hierarchies.",
    purpose:
      "Structuring accessible web interfaces with clean landmark regions, keyboard navigation order, and ARIA metadata.",
    usage:
      "Foundation for every web project and interactive component layout, prioritizing clean semantics and accessibility.",
    familiarity: "Foundational Web Literacy (Editable)",
    relatedProjects: ["TripEase", "Bluestock MF", "RASHMI.SPACE"],
    logo: { glyph: "<>", shape: "layers" },
  },
  {
    id: "css",
    name: "CSS3",
    abbreviation: "CSS",
    category: "Frontend Development",
    categoryId: "frontend",
    row: 1,
    widthUnits: 1.55,
    keyRole: "main",
    description:
      "The visual styling engine for responsive grid/flex architecture, typographic rhythm, layered studio atmospheres, and hardware-accelerated transitions.",
    purpose:
      "Crafting balanced layouts, custom color tokens, focus rings, and smooth keyframe transitions without visual clutter.",
    usage:
      "Used alongside modern utility CSS for editorial layouts, reduced-motion media rules, and micro-interactions.",
    familiarity: "Foundational Styling & Layout (Editable)",
    relatedProjects: ["TripEase", "Bluestock MF", "RASHMI.SPACE"],
    logo: { glyph: "#", shape: "layers" },
  },
  {
    id: "react",
    name: "React",
    abbreviation: "REACT",
    category: "Frontend Development",
    categoryId: "frontend",
    row: 1,
    widthUnits: 1.85,
    keyRole: "special",
    description:
      "A declarative component library for building stateful user interfaces out of focused, reusable building blocks.",
    purpose:
      "Managing interactive UI state, composable view hierarchies, custom hooks, and dynamic modal/panel workflows.",
    usage:
      "Core library used to architect modular dashboards, portfolio scenes, and declarative 3D scenes via React Three Fiber.",
    familiarity: "Active UI Engineering (Editable)",
    relatedProjects: ["TradeCore", "TripEase", "Bluestock MF"],
    logo: { glyph: "Rx", shape: "layers" },
  },
  {
    id: "nextjs",
    name: "Next.js",
    abbreviation: "NEXT.JS",
    category: "Frontend Development",
    categoryId: "frontend",
    row: 1,
    widthUnits: 2.15,
    keyRole: "special",
    description:
      "A full-stack React framework uniting server/client rendering, app routing, font/asset optimization, and production bundling.",
    purpose:
      "Shipping fast, structured React web applications with clean routing, optimization, and API endpoints.",
    usage:
      "Powers structured web applications including full-stack travel/FinTech interfaces and this portfolio studio.",
    familiarity: "Primary Web Framework (Editable)",
    relatedProjects: ["TripEase", "RASHMI.SPACE"],
    logo: { glyph: "NX", shape: "layers" },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    abbreviation: "TAILWIND",
    category: "Frontend Development",
    categoryId: "frontend",
    row: 1,
    widthUnits: 2.45,
    keyRole: "main",
    description:
      "A utility-first styling workflow powered by design tokens for spacing, typography, color harmony, and responsive breakpoints.",
    purpose:
      "Rapidly prototyping cohesive design systems with consistent visual spacing across mobile, tablet, and desktop.",
    usage:
      "Applied across modern UI builds to enforce strict spacing scales, editorial typography, and warm palette consistency.",
    familiarity: "Active Styling Workflow (Editable)",
    relatedProjects: ["Bluestock MF", "RASHMI.SPACE"],
    logo: { glyph: "TW", shape: "layers" },
  },

  // Row 2: Backend Development (3) + Database Technologies (4) (sum = 9.60u)
  {
    id: "nodejs",
    name: "Node.js",
    abbreviation: "NODE.JS",
    category: "Backend Development",
    categoryId: "backend",
    row: 2,
    widthUnits: 1.35,
    keyRole: "main",
    description:
      "An event-driven JavaScript runtime for executing server applications, build pipelines, REST API services, and backend workers outside the browser.",
    purpose:
      "Running lightweight HTTP APIs, handling asynchronous I/O requests, and orchestrating backend development tooling.",
    usage:
      "Used to serve full-stack web application endpoints, run tooling pipelines, and bridge database queries.",
    familiarity: "Working Backend Runtime (Editable)",
    relatedProjects: ["TripEase"],
    logo: { glyph: "ND", shape: "server" },
  },
  {
    id: "springboot",
    name: "Spring Boot",
    abbreviation: "SPRING BOOT",
    category: "Backend Development",
    categoryId: "backend",
    row: 2,
    widthUnits: 1.75,
    keyRole: "special",
    description:
      "An opinionated Java application framework built for structured REST controllers, dependency injection, validation, and production backend services.",
    purpose:
      "Designing layered Java backends with clean service boundaries, domain models, and relational persistence.",
    usage:
      "Editable studio note — document verified Spring Boot API endpoints, JPA entities, or coursework builds here.",
    familiarity: "Backend Architecture Exploration (Editable)",
    relatedProjects: ["Editable Project Slot (Spring Boot Service)"],
    logo: { glyph: "SB", shape: "server" },
  },
  {
    id: "restapi",
    name: "REST APIs",
    abbreviation: "REST API",
    category: "Backend Development",
    categoryId: "backend",
    row: 2,
    widthUnits: 1.4,
    keyRole: "main",
    description:
      "Resource-oriented HTTP architecture using deterministic endpoints, status semantics, JSON contracts, and predictable request/response cycles.",
    purpose:
      "Connecting frontend clients cleanly to backend business logic, ML inference endpoints, and persistent storage.",
    usage:
      "Applied across full-stack apps to structure clean CRUD operations, validation flows, and data fetching.",
    familiarity: "Core API Design Pattern (Editable)",
    relatedProjects: ["TradeCore", "TripEase"],
    logo: { glyph: "API", shape: "server" },
  },
  {
    id: "sql",
    name: "SQL",
    abbreviation: "SQL",
    category: "Database Technologies",
    categoryId: "database",
    row: 2,
    widthUnits: 1.1,
    keyRole: "main",
    description:
      "Declarative relational query language for defining schemas, joining normalized tables, filtering transactions, and computing aggregations.",
    purpose:
      "Modeling reliable relational schemas and answering analytical questions cleanly over structured records.",
    usage:
      "Used to design normalized entities, write analytical SELECT/JOIN/GROUP BY queries, and inspect data integrity.",
    familiarity: "Core Query Language (Editable)",
    relatedProjects: ["TradeCore"],
    logo: { glyph: "SQL", shape: "database" },
  },
  {
    id: "sqlite",
    name: "SQLite",
    abbreviation: "SQLITE",
    category: "Database Technologies",
    categoryId: "database",
    row: 2,
    widthUnits: 1.2,
    keyRole: "main",
    description:
      "An embedded, serverless, transactional SQL engine stored cleanly in a single portable file—ideal for local apps and fast prototyping.",
    purpose:
      "Developing offline-friendly application storage, testing relational migrations locally, and storing lightweight datasets.",
    usage:
      "Editable workspace note — used for fast local relational prototyping and schema verification without heavyweight setup.",
    familiarity: "Local & Embedded Storage (Editable)",
    relatedProjects: ["Editable Project Slot (Local Data Prototype)"],
    logo: { glyph: "SL", shape: "database" },
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    abbreviation: "POSTGRESQL",
    category: "Database Technologies",
    categoryId: "database",
    row: 2,
    widthUnits: 1.6,
    keyRole: "main",
    description:
      "An advanced open-source object-relational database engineered for ACID transactional guarantees, rich indexing, and analytical scale.",
    purpose:
      "Backing financial and multi-entity applications where strict data integrity, foreign keys, and complex queries matter.",
    usage:
      "Used as the relational foundation for financial domain models, indexing practice, and structured backend persistence.",
    familiarity: "Relational Backend Exploration (Editable)",
    relatedProjects: ["TradeCore"],
    logo: { glyph: "PG", shape: "database" },
  },
  {
    id: "mysql",
    name: "MySQL",
    abbreviation: "MYSQL",
    category: "Database Technologies",
    categoryId: "database",
    row: 2,
    widthUnits: 1.2,
    keyRole: "main",
    description:
      "A widely adopted open-source relational database management system balancing straightforward operations, relational joins, and transactional storage.",
    purpose:
      "Learning relational database administration, normalization forms, stored query debugging, and backend storage setup.",
    usage:
      "Practiced across database management labs and structured web data persistence coursework.",
    familiarity: "Academic & Application SQL (Editable)",
    relatedProjects: ["Editable Project Slot (DBMS Labs)"],
    logo: { glyph: "MY", shape: "database" },
  },

  // Row 3: AI & Data Science (sum = 9.60u)
  {
    id: "ai",
    name: "Artificial Intelligence",
    abbreviation: "AI",
    category: "AI & Data Science",
    categoryId: "ai-data",
    row: 3,
    widthUnits: 1.5,
    keyRole: "special",
    description:
      "Systems designed to reason over signals, classify risk, recognize patterns, and augment human software workflows intelligently.",
    purpose:
      "Exploring applied intelligent applications that bridge software engineering concepts with predictive security and insights.",
    usage:
      "Studied through applied pattern classification, anomaly/fraud detection ideas, and interactive decision tooling.",
    familiarity: "Core Domain Interest (Editable)",
    relatedProjects: ["FraudShield AI", "CyberPredict"],
    logo: { glyph: "AI", shape: "sparkles" },
  },
  {
    id: "ml",
    name: "Machine Learning",
    abbreviation: "ML",
    category: "AI & Data Science",
    categoryId: "ai-data",
    row: 3,
    widthUnits: 1.5,
    keyRole: "special",
    description:
      "Supervised and unsupervised statistical modeling methods that learn patterns from empirical features rather than brittle hard-coded rules.",
    purpose:
      "Building end-to-end feature preprocessing, baseline model comparison, risk scoring, and validation pipelines.",
    usage:
      "Applied in classification and security prediction explorations using clean train/test evaluation workflows.",
    familiarity: "Applied Modeling & Labs (Editable)",
    relatedProjects: ["FraudShield AI", "CyberPredict"],
    logo: { glyph: "ML", shape: "sparkles" },
  },
  {
    id: "numpy",
    name: "NumPy",
    abbreviation: "NUMPY",
    category: "AI & Data Science",
    categoryId: "ai-data",
    row: 3,
    widthUnits: 1.95,
    keyRole: "main",
    description:
      "Foundational scientific computing package in Python delivering vectorized multi-dimensional arrays and fast numerical linear algebra operations.",
    purpose:
      "Representing numerical feature matrices, performing fast matrix math, and feeding machine learning pipelines cleanly.",
    usage:
      "Used beneath data transformation notebooks and numerical computations in AI/ML workflows.",
    familiarity: "Numerical Python Foundation (Editable)",
    relatedProjects: ["FraudShield AI", "CyberPredict"],
    logo: { glyph: "NP", shape: "sparkles" },
  },
  {
    id: "pandas",
    name: "Pandas",
    abbreviation: "PANDAS",
    category: "AI & Data Science",
    categoryId: "ai-data",
    row: 3,
    widthUnits: 2.1,
    keyRole: "main",
    description:
      "Tabular data analysis toolkit built around DataFrames for cleaning, joining, resampling, missing-value auditing, and feature engineering.",
    purpose:
      "Cleaning messy CSV/transaction datasets, inspecting feature correlations, and engineering ML inputs.",
    usage:
      "Primary workbench library for exploratory data analysis and preparing features prior to model training.",
    familiarity: "Active Data Analysis Toolkit (Editable)",
    relatedProjects: ["FraudShield AI", "Bluestock MF", "CyberPredict"],
    logo: { glyph: "PD", shape: "sparkles" },
  },
  {
    id: "matplotlib",
    name: "Matplotlib",
    abbreviation: "MATPLOTLIB",
    category: "AI & Data Science",
    categoryId: "ai-data",
    row: 3,
    widthUnits: 2.55,
    keyRole: "main",
    description:
      "Configurable Python visualization library for plotting distributions, training metrics, confusion trends, and comparative visual insights.",
    purpose:
      "Making dataset patterns, outliers, and evaluation curves visually inspectable during model experimentation.",
    usage:
      "Used alongside Pandas notebooks to inspect feature histograms and model comparison plots.",
    familiarity: "Exploratory Visualization (Editable)",
    relatedProjects: ["FraudShield AI", "CyberPredict"],
    logo: { glyph: "MP", shape: "sparkles" },
  },

  // Row 4: Developer Tools (sum = 9.60u)
  {
    id: "git",
    name: "Git",
    abbreviation: "GIT",
    category: "Developer Tools",
    categoryId: "tools",
    row: 4,
    widthUnits: 1.95,
    keyRole: "function",
    description:
      "Distributed version control system that tracks source snapshots, clean commits, isolated feature branches, and safe code history.",
    purpose:
      "Managing incremental experimentation, isolating features in branches, and reviewing clean repository diffs.",
    usage:
      "Used daily across every engineering project to keep experiments structured and reversible.",
    familiarity: "Daily Version Control (Editable)",
    relatedProjects: ["All Portfolio Repositories"],
    logo: { glyph: "GT", shape: "terminal" },
  },
  {
    id: "github",
    name: "GitHub",
    abbreviation: "GITHUB",
    category: "Developer Tools",
    categoryId: "tools",
    row: 4,
    widthUnits: 2.45,
    keyRole: "function",
    description:
      "Collaborative code hosting platform organizing repositories, issue tracking, pull requests, and public engineering documentation.",
    purpose:
      "Hosting source code repositories, documenting technical architectures in READMEs, and sharing live projects.",
    usage:
      "Home to Rashmi Pathak's public repositories at github.com/Rashmi-Pathak.",
    familiarity: "Active Code Hosting & Portfolio Hub (Editable)",
    relatedProjects: ["github.com/Rashmi-Pathak"],
    logo: { glyph: "GH", shape: "terminal" },
  },
  {
    id: "vscode",
    name: "VS Code",
    abbreviation: "VS CODE",
    category: "Developer Tools",
    categoryId: "tools",
    row: 4,
    widthUnits: 2.75,
    keyRole: "function",
    description:
      "Extensible code editor integrating TypeScript language diagnostics, Git diff views, integrated terminal sessions, and Python notebooks.",
    purpose:
      "Authoring, debugging, refactoring, and linting full-stack web apps and Python ML notebooks inside one workspace.",
    usage:
      "Primary editor environment configured for TypeScript, ESLint, Tailwind, and Python experimentation.",
    familiarity: "Daily Development Environment (Editable)",
    relatedProjects: ["All Portfolio Projects"],
    logo: { glyph: "VS", shape: "terminal" },
  },
  {
    id: "docker",
    name: "Docker",
    abbreviation: "DOCKER",
    category: "Developer Tools",
    categoryId: "tools",
    row: 4,
    widthUnits: 2.45,
    keyRole: "function",
    description:
      "Containerization platform that packages application code, runtime dependencies, and environment configuration into reproducible isolated images.",
    purpose:
      "Standardizing local database containers (PostgreSQL/MySQL), isolating backend services, and learning reproducible deployments.",
    usage:
      "Editable workspace note — update with containerized database setups or service Compose specs as added.",
    familiarity: "Containerization & Local Service Environments (Editable)",
    relatedProjects: ["Editable Project Slot (Containerized Backend)"],
    logo: { glyph: "DK", shape: "terminal" },
  },
];
