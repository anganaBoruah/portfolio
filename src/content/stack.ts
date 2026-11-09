export type StackLayer = {
  id: string;
  index: string;
  name: string;
  tech: string;
  tools: string[];
};

export const stackLabels = {
  languages: "Languages",
  layersLabel: "Layers of the stack",
};

export const languages = ["TypeScript", "JavaScript", "Python", "SQL"];

// Listed top to bottom, in the order a request travels.
export const stackLayers: StackLayer[] = [
  {
    id: "client",
    index: "01",
    name: "Client",
    tech: "Next.js, React",
    tools: [
      "React",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "TanStack Query",
      "Recharts",
    ],
  },
  {
    id: "api",
    index: "02",
    name: "API & workers",
    tech: "Express, FastAPI",
    tools: ["Node.js", "Express", "FastAPI", "REST APIs", "JWT", "Zod"],
  },
  {
    id: "jobs",
    index: "03",
    name: "Jobs & cron",
    tech: "Schedulers, webhooks",
    tools: ["Cron jobs", "Razorpay webhooks", "MSG91"],
  },
  {
    id: "llm",
    index: "04",
    name: "LLM",
    tech: "Gemini",
    tools: [
      "Gemini API",
      "Structured output",
      "Prompt engineering",
      "Search grounding",
      "LangChain",
    ],
  },
  {
    id: "data",
    index: "05",
    name: "Data",
    tech: "PostgreSQL, Prisma",
    tools: [
      "PostgreSQL",
      "Prisma",
      "SQLAlchemy",
      "Alembic",
      "MongoDB",
      "Redis",
    ],
  },
  {
    id: "ops",
    index: "06",
    name: "Ops & quality",
    tech: "AWS, CI",
    tools: [
      "AWS EC2",
      "AWS S3",
      "Secrets Manager",
      "PM2",
      "Nginx",
      "Docker",
      "GitHub Actions",
      "Jest",
      "Vitest",
    ],
  },
];
