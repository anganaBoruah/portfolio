import { profile } from "@/content/profile";

type Workstream = {
  index: string;
  title: string;
  summary: string;
  figure: { value: string; caption: string };
  notes: string[];
};

export const role = {
  company: "Answerwriting AI",
  url: profile.employerUrl,
  title: "Software Engineer, Full Stack & AI",
  period: "Oct 2025 – Present",
  startDate: "2025-10",
  description:
    "An AI answer-evaluation platform for civil-services candidates preparing for UPSC, UPPCS and BPSC. Sold to students directly and white-labeled to coaching institutes.",
  facts: ["35,000+ users", "One of two engineers", "Multi-tenant, B2B + B2C"],
  stackLabel: "Stack",
  stack: [
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "Express",
    "FastAPI",
    "PostgreSQL",
    "Prisma",
    "Gemini API",
    "AWS",
  ],
};

export const workstreams: Workstream[] = [
  {
    index: "01",
    title: "Payments & billing",
    summary:
      "Fixed paid-but-no-access purchases and GST invoices that stored tax 100× too small.",
    figure: { value: "5 min", caption: "reconciliation interval" },
    notes: [
      "Invoice unit fixes, whole-rupee rounding, and backfill scripts that regenerate the PDFs.",
      "Referral wallet: idempotent release cron, two race conditions fixed, self-referral blocked at every checkout path.",
    ],
  },
  {
    index: "02",
    title: "Analytics audit",
    summary:
      "Audited superadmin analytics across retention, MRR, revenue and referrals.",
    figure: { value: "26", caption: "issues audited" },
    notes: [
      "One of my own changes showed negative MRR on production. Found it and bounded the formula the same day.",
    ],
  },
  {
    index: "03",
    title: "LLM evaluation",
    summary:
      "Exam-specific Gemini prompts for UPSC GS papers, essay, 11 optional subjects, BPSC and UPPCS.",
    figure: { value: "22", caption: "evaluation prompts" },
    notes: [
      "Hindi and grammar evaluators that score section by section: vocabulary, comprehension, letter writing.",
      "12 evaluator locales, 12 MCQ languages and 9 Current Affairs languages, translated lazily from a queue.",
    ],
  },
  {
    index: "04",
    title: "AI Mentor & usage analytics",
    summary:
      "Subject classification for AI Mentor, and usage analytics across 11 product tools.",
    figure: { value: "11", caption: "product tools tracked" },
    notes: [
      "Per-tool browsing and transcripts, with 20 migrations using concurrent index creation.",
      "Google Search grounding so Mentor answers use current facts, not model memory alone.",
    ],
  },
  {
    index: "05",
    title: "Store, PYQ & bookmarks",
    summary:
      "Built the digital store end to end, a previous-year-question module, and saved collections.",
    figure: { value: "70", caption: "API routes across the three" },
    notes: [
      "Store: 26 routes, 6 Prisma models, Razorpay checkout, entitlements, library and admin.",
      "PYQ: 28 routes, a bulk import wizard with history, translations and public SEO pages.",
    ],
  },
  {
    index: "06",
    title: "Reliability & data integrity",
    summary:
      "Closed a cross-user data leak and stopped bulk jobs from hanging forever.",
    figure: { value: "30 min", caption: "before a stuck job fails" },
    notes: [
      "Question-paper cache keyed per user after a second uploader got the first user's draft.",
      "AbortController timeouts on LLM calls, and a 5-minute sweep for orphaned jobs.",
    ],
  },
  {
    index: "07",
    title: "Growth & white-label",
    summary:
      "Marketing email, signup tracking and white-label deployments for coaching institutes.",
    figure: { value: "3+", caption: "white-label clients" },
    notes: [
      "Signup source (Android, iOS or web) on all 9 account-creation paths.",
      "Tenant configuration, onboarding and branding on generated PDFs.",
    ],
  },
  {
    index: "08",
    title: "Testing",
    summary: "Wrote most of the superadmin console's test suite.",
    figure: { value: "1,281", caption: "Vitest cases" },
    notes: [
      "1,281 of the console's 1,519 test cases, across 99 files: about 84%.",
      "Another 764 backend and 273 web test cases in files I started.",
    ],
  },
];
