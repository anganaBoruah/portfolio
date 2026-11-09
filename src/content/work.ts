import type { ProfileLink } from "@/content/profile";

export type CaseProof =
  | { kind: "ratio"; total: number; flagged: number; label: string }
  | { kind: "checks"; issues: number; label: string }
  | { kind: "counter"; value: number; label: string }
  | {
      kind: "spend";
      baseline: number;
      observed: number;
      baselineLabel: string;
      observedLabel: string;
    };

export type CaseStudy = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  body: string;
  shipped: string;
  metric: { value: string; caption: string };
  stack: string[];
  proof: CaseProof;
};

type Build = {
  id: string;
  title: string;
  qualifier: string;
  purpose: string;
  note: string;
  stack: string[];
  links: ProfileLink[];
};

export const workLabels = {
  shipped: "What I shipped",
  builds: "Built on my own",
};

export const caseStudies: CaseStudy[] = [
  {
    id: "payments",
    index: "01",
    kicker: "Payments",
    title: "The webhook that had been off for six months",
    body: "About 1 in 9 paid purchases weren't getting access on time. Grants leaned on the browser's verify call and one daily job, so some buyers waited up to 23 hours.",
    shipped:
      "Row-locked, idempotent completion. Webhook back on. Reconciliation every 5 minutes plus hourly, a 24-hour expiry, and an alert whenever a grant fails.",
    metric: {
      value: "1 in 9",
      caption: "paid purchases granted late or by hand",
    },
    stack: ["Razorpay webhooks", "PostgreSQL row locks", "Cron"],
    proof: { kind: "ratio", total: 9, flagged: 1, label: "About 1 of every 9" },
  },
  {
    id: "analytics",
    index: "02",
    kicker: "Analytics",
    title: "Auditing the numbers the business ran on",
    body: "Superadmin analytics double-counted through joins, booked free grants as revenue and summed failed transactions.",
    shipped:
      "Shared real-user and paid filters, IST period boundaries and net-of-GST MRR, checked against an independent model on seeded data.",
    metric: { value: "215/215", caption: "numeric checks passing" },
    stack: ["PostgreSQL", "Express", "React"],
    proof: {
      kind: "checks",
      issues: 26,
      label: "26 issues audited and closed",
    },
  },
  {
    id: "classification",
    index: "03",
    kicker: "LLM pipeline",
    title: "Classifying a 6,505-conversation backlog",
    body: "AI Mentor conversations had no subject attached. I built an LLM classifier across 11 subjects with a resumable backfill.",
    shipped:
      "A production pilot of 200 conversations: 200 classified, 0 failures. Then the backlog run.",
    metric: { value: "0", caption: "failures on the 200-conversation pilot" },
    stack: ["Gemini API", "Structured output", "Prisma"],
    proof: {
      kind: "counter",
      value: 6505,
      label: "Conversations in the backlog",
    },
  },
  {
    id: "incident",
    index: "04",
    kicker: "Incident",
    title: "A bill nine times the usual",
    body: "Gemini spend jumped to about 9× a normal day and evaluations went down. The working theory was a model change. The logs disagreed.",
    shipped:
      "Traced it through EC2 logs and Google AI Studio to a leaked key spending on a model we never use. Rotated keys via AWS Secrets Manager, restarted the backend on EC2, revoked the old keys.",
    metric: { value: "~9×", caption: "a normal day's Gemini spend" },
    stack: ["EC2 logs", "Google AI Studio", "AWS Secrets Manager"],
    proof: {
      kind: "spend",
      baseline: 1,
      observed: 9,
      baselineLabel: "Normal day",
      observedLabel: "That day",
    },
  },
];

export const builds: Build[] = [
  {
    id: "smart-contract-auditor",
    title: "Smart Contract Auditor",
    qualifier: "Web + CLI",
    purpose:
      "A backend service, CLI and web interface that generate structured Solidity audit reports.",
    note: "Deterministic validation runs alongside Gemini analysis to keep the LLM output structured.",
    stack: ["Node.js", "TypeScript", "Next.js", "Gemini AI"],
    links: [
      {
        label: "Live demo",
        href: "https://smart-audit-lime.vercel.app/",
        arrow: "up-right",
      },
    ],
  },
  {
    id: "resume-builder",
    title: "AI Resume Builder",
    qualifier: "SaaS",
    purpose: "Full-stack SaaS with Gemini summaries and PDF export.",
    note: "JWT and Google OAuth for sign-in, Razorpay for subscriptions.",
    stack: ["React", "Express", "MongoDB", "Gemini AI", "Razorpay"],
    links: [
      {
        label: "Live demo",
        href: "https://resume-builder-angana.vercel.app/",
        arrow: "up-right",
      },
    ],
  },
  {
    id: "fastapi-backend",
    title: "FastAPI Backend",
    qualifier: "Auth, media upload & feed API",
    purpose:
      "REST API with JWT auth, media upload and feed endpoints, and schema validation.",
    note: "Moved SQLite to PostgreSQL with Alembic migrations. Containerized with Docker Compose.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Alembic", "Docker Compose"],
    links: [
      {
        label: "Code",
        href: "https://github.com/anganaBoruah/fastapi-backend-project",
        arrow: "up-right",
      },
    ],
  },
];
