export const personalInfo = {
  name: "Satwik Mishra",
  shortName: "SM",
  tagline: "Full-Stack Developer × AI Engineer × Creative Technologist",
  description:
    "Final-year Computer Science student building full-stack products, AI-powered applications and experimental interfaces.",
  location: "Prayagraj, India",
  year: "2026",
  focus: "Building: Full-Stack / AI / Agentic Systems",
  availability: "Available for opportunities",
  email: "satwikmishra2217@gmail.com",
  phone: "+91 9118876566",
  introStatement: "I build intelligent software and interactive digital experiences.",
  introBody:
    "Full-stack developer exploring the intersection of AI, web technologies, and creative coding.",
  aboutTitle: "About Satwik",
  aboutBody:
    "I'm a B.Tech Computer Science student building full-stack applications and experimenting with AI/ML, agentic systems, interactive experiences, and automation. I enjoy turning ideas into working products.",
  interests: [
    "AI Engineering",
    "Full-Stack Development",
    "Generative AI",
    "RAG Systems",
    "Agentic AI",
    "Creative Coding",
    "Developer Tools",
    "Automation",
  ],
  ctaTitle: "Have an idea?",
  ctaSubtitle: "Let's build something.",
  ctaRoles: [
    "Software Engineering Internships",
    "AI/ML Internships",
    "Full-Stack Development Roles",
  ],
};

export const socialLinks = {
  github: "https://github.com/Satwik2217",
  linkedin: "https://www.linkedin.com/in/satwik---mishra/",
  leetcode: "https://leetcode.com/u/Satwik_2217/",
  geeksforgeeks: "https://www.geeksforgeeks.org/profile/satwikmishra2217",
  hackerrank: "https://www.hackerrank.com/profile/satwikmishra2217",
};

export const resumePath = "/Satwik_Mishra_Off_Campus.pdf";

export const heroRoles = [
  "Computer Science Student",
  "Full Stack Developer",
  "AI Enthusiast",
];

export const careerGoals = [
  "AI / ML Engineering",
  "Full-Stack Development",
  "Agentic Systems",
  "Building Products That Matter",
];

export const specialAbilities = [
  {
    name: "Problem Solving",
    description: "DSA-driven thinking, competitive coding on LeetCode & HackerRank.",
    icon: "code",
  },
  {
    name: "System Design",
    description: "Designing scalable architectures for full-stack and AI products.",
    icon: "network",
  },
  {
    name: "AI",
    description: "RAG pipelines, Reinforcement Learning, Gemini API, agentic AI.",
    icon: "brain",
  },
  {
    name: "Web Development",
    description: "React, Next.js, Node.js, Express, FastAPI and beyond.",
    icon: "globe",
  },
  {
    name: "Cloud Computing",
    description: "Deploying and shipping on Vercel, Dockerized backends, AWS-ready.",
    icon: "cloud",
  },
];

export type SkillNode = {
  name: string;
  category: string;
  years: string;
  projects: string[];
  level: number;
};

export const skillGraph: SkillNode[] = [
  { name: "Java", category: "Languages", years: "3+ yrs", projects: ["Java Internship", "Core CS"], level: 3 },
  { name: "Python", category: "Languages", years: "3+ yrs", projects: ["Carbon Optimizer", "RAG pipelines"], level: 3 },
  { name: "JavaScript", category: "Languages", years: "2+ yrs", projects: ["Contract Guard AI", "Event Horizon"], level: 2 },
  { name: "React", category: "Web & Frameworks", years: "2+ yrs", projects: ["Contract Guard AI"], level: 2 },
  { name: "Node.js", category: "Web & Frameworks", years: "1+ yr", projects: ["Weather app", "REST APIs"], level: 2 },
  { name: "Express.js", category: "Web & Frameworks", years: "1+ yr", projects: ["Weather app"], level: 2 },
  { name: "FastAPI", category: "Web & Frameworks", years: "1+ yr", projects: ["Contract Guard AI", "Carbon Optimizer"], level: 2 },
  { name: "RAG Pipelines", category: "AI / ML", years: "1+ yr", projects: ["Contract Guard AI"], level: 2 },
  { name: "Reinforcement Learning", category: "AI / ML", years: "1+ yr", projects: ["Carbon Optimizer"], level: 2 },
  { name: "Gemini API", category: "AI / ML", years: "1+ yr", projects: ["Contract Guard AI"], level: 2 },
  { name: "MediaPipe", category: "AI / ML", years: "1+ yr", projects: ["Event Horizon"], level: 2 },
  { name: "Docker", category: "Tools", years: "1+ yr", projects: ["Deployed backends"], level: 2 },
  { name: "Git", category: "Tools", years: "3+ yrs", projects: ["All projects"], level: 3 },
  { name: "MongoDB", category: "Tools", years: "1+ yr", projects: ["Full-stack apps"], level: 2 },
  { name: "n8n", category: "Tools", years: "1+ yr", projects: ["Automation workflows"], level: 2 },
  { name: "Three.js", category: "Tools", years: "1+ yr", projects: ["Event Horizon"], level: 2 },
  { name: "DSA", category: "Core CS", years: "2+ yrs", projects: ["LeetCode", "Code Aarambh"], level: 3 },
  { name: "DBMS", category: "Core CS", years: "2+ yrs", projects: ["Course work"], level: 2 },
  { name: "Operating Systems", category: "Core CS", years: "2+ yrs", projects: ["Course work"], level: 2 },
  { name: "Computer Networks", category: "Core CS", years: "2+ yrs", projects: ["Course work"], level: 2 },
];

export const codingProfiles = [
  {
    name: "GitHub",
    handle: "Satwik2217",
    url: socialLinks.github,
    statLabel: "Repositories",
    statValue: 30,
    isPlaceholder: true,
  },
  {
    name: "LeetCode",
    handle: "Satwik_2217",
    url: socialLinks.leetcode,
    statLabel: "Problems Solved",
    statValue: 120,
    isPlaceholder: true,
  },
  {
    name: "HackerRank",
    handle: "satwikmishra2217",
    url: socialLinks.hackerrank,
    statLabel: "Badges",
    statValue: 6,
    isPlaceholder: true,
  },
  {
    name: "GeeksforGeeks",
    handle: "satwikmishra2217",
    url: socialLinks.geeksforgeeks,
    statLabel: "Problems Solved",
    statValue: 40,
    isPlaceholder: true,
  },
  {
    name: "Codeforces",
    handle: "coming soon",
    url: "#",
    statLabel: "Rating",
    statValue: 0,
    isPlaceholder: true,
  },
];

export const certifications = [
  {
    title: "Web Development Intern — MERN Stack",
    issuer: "Udemy Training Programme",
    year: "2025",
  },
  {
    title: "Java Intern",
    issuer: "United Institute of Technology",
    year: "2024",
  },
  {
    title: "3-Star Java & 2-Star Python",
    issuer: "HackerRank",
    year: "2024",
  },
];

export const blogPosts = [
  {
    number: "001",
    title: "Weaving RAG Into Production",
    excerpt:
      "A behind-the-scenes look at how Contract Guard AI turns legal documents into searchable intelligence.",
    tag: "AI / Engineering",
    date: "COMING SOON",
    isPlaceholder: true,
  },
  {
    number: "002",
    title: "The Web Slinger's Stack",
    excerpt:
      "Why I choose React, Node and FastAPI — and how I decide when a tool earns its place on the web.",
    tag: "Full Stack",
    date: "COMING SOON",
    isPlaceholder: true,
  },
  {
    number: "003",
    title: "Swinging Into Creative Coding",
    excerpt:
      "Three.js, MediaPipe and the joy of building interfaces that move like they're alive.",
    tag: "Creative Coding",
    date: "COMING SOON",
    isPlaceholder: true,
  },
];

export const footerQuote =
  "Every line of code is a thread in the web of what's possible.";

export const projects = [
  {
    id: 1,
    number: "01",
    title: "Contract Guard AI",
    category: "AI / RAG / Full Stack",
    tagline: "AI-powered contract intelligence",
    description:
      "AI-powered contract analyzer using Retrieval-Augmented Generation.",
    technologies: ["React", "FastAPI", "Gemini LLM", "pgvector", "RAG"],
    year: "2025",
    details: [
      "Gemini LLM integration with pgvector for semantic search",
      "Built an interactive React frontend for contract analysis",
      "Designed a retrieval-based RAG pipeline for contract insights",
    ],
    github: "https://github.com/Satwik2217/contract-guard-ai",
    live: null,
    visual: "contract-guard",
  },
  {
    id: 2,
    number: "02",
    title: "Carbon Optimizer",
    category: "AI / Reinforcement Learning",
    tagline: "RL-powered carbon optimization",
    description:
      "Reinforcement-learning environment designed for carbon optimization with real-time backend communication.",
    technologies: ["Python", "FastAPI", "Reinforcement Learning", "WebSockets"],
    year: "2025",
    details: [
      "RL environment for carbon optimization with reward shaping",
      "FastAPI backend with real-time WebSocket communication",
      "Optimized convergence through advanced reward shaping techniques",
    ],
    github: "https://github.com/Satwik2217/carbon-optimizer",
    live: null,
    visual: "carbon-optimizer",
  },
  {
    id: 3,
    number: "03",
    title: "Event Horizon",
    category: "Creative Coding / Computer Vision / 3D",
    tagline: "AI Gesture Visualization",
    description:
      "Gesture-controlled 3D particle simulation running directly in the browser.",
    technologies: ["Three.js", "MediaPipe", "JavaScript"],
    year: "2025",
    details: [
      "MediaPipe Hands integration for real-time gesture control",
      "Three.js particle system with mouse and webcam interaction",
      "Optimized rendering with smooth browser performance",
    ],
    github: "https://github.com/Satwik2217/event-horizon",
    live: null,
    visual: "event-horizon",
  },
];

export const experience = [
  {
    year: "2025",
    title: "Freelance Web Developer",
    organization: "Fiverr — Remote",
    details: [
      "Built and deployed websites for coaching businesses featuring automated inquiry workflows",
      "Integrated n8n workflow automation and WhatsApp Business API",
    ],
  },
  {
    year: "2025",
    title: "Web Development Intern — MERN Stack",
    organization: "Udemy Training Programme — Remote",
    details: [
      "Developed a full-stack weather application",
      "Implemented RESTful backend services using Node.js and Express.js",
    ],
  },
  {
    year: "2024",
    title: "Java Intern",
    organization: "Summer Training Programme — United Institute of Technology, Prayagraj",
    details: [
      "Strengthened Java fundamentals including OOP, Collections, Exception Handling",
      "Built small-scale Java applications",
    ],
  },
];

export const education = [
  {
    institution: "United Institute of Technology, Prayagraj",
    degree: "B.Tech — Computer Science Engineering",
    period: "2023 — 2027",
    cgpa: "6.78",
  },
  {
    institution: "Class XII",
    degree: "Intermediate",
    period: "2022",
    score: "70%",
  },
  {
    institution: "Class X",
    degree: "High School",
    period: "2020",
    score: "92%",
  },
];

export const achievements = [
  { number: "01", title: "1st Prize — Code Aarambh", description: "Coding Competition — 2024" },
  { number: "02", title: "2nd Position — JAM", description: "JAM Competition" },
  { number: "03", title: "3-Star Java", description: "HackerRank" },
  { number: "04", title: "2-Star Python", description: "HackerRank" },
];

export const skills = {
  Languages: ["Java", "Python", "JavaScript", "HTML", "CSS"],
  "Web & Frameworks": ["React", "Node.js", "Express.js", "FastAPI", "REST APIs"],
  "AI / ML": ["RAG Pipelines", "Reinforcement Learning", "Gemini API", "MediaPipe", "pgvector"],
  Tools: ["Docker", "Git", "MongoDB", "n8n", "WebSockets", "Three.js", "Vercel"],
  "Core CS": ["DSA", "DBMS", "Operating Systems", "Computer Networks"],
};

export const exploring = [
  "Agentic AI",
  "LangGraph",
  "LangChain",
  "AI Agents",
  "RAG Systems",
  "Generative AI",
  "System Design",
  "MLOps",
];

export const experiments = [
  "AI Agents",
  "3D Web",
  "Generative UI",
  "Voice AI",
  "RAG",
  "Real-Time Systems",
];

export const techStack = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "FastAPI",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Three.js",
  "LangChain",
  "LangGraph",
  "Gemini",
];

export const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Secret Identity", theme: "Identity" },
  { id: "education", label: "Origin Story", theme: "Origin" },
  { id: "skills", label: "Spider Powers", theme: "Powers" },
  { id: "work", label: "Completed Missions", theme: "Missions" },
  { id: "experience", label: "Hero Log", theme: "Hero Log" },
  { id: "achievements", label: "Hall of Heroes", theme: "Heroes" },
  { id: "blog", label: "Daily Bugle", theme: "Bugle" },
  { id: "contact", label: "Call the Hero", theme: "Contact" },
];
