export type SectionId =
  "intro" | "work" | "stack" | "experience" | "about" | "contact";

type SectionMeta = {
  id: SectionId;
  index: string;
  navLabel: string;
  eyebrow: string;
  title?: { lead: string; highlight: string };
  intro?: string;
};

export const sections: Record<SectionId, SectionMeta> = {
  intro: { id: "intro", index: "00", navLabel: "Intro", eyebrow: "Index" },
  work: {
    id: "work",
    index: "01",
    navLabel: "Work",
    eyebrow: "Selected work",
    title: { lead: "Four numbers", highlight: "that were wrong." },
    intro:
      "Each of these started as something that looked fine. Each ended with a fix and a guard that keeps it fixed.",
  },
  experience: {
    id: "experience",
    index: "02",
    navLabel: "Experience",
    eyebrow: "Experience",
    title: { lead: "One role,", highlight: "a lot of ground." },
  },
  stack: {
    id: "stack",
    index: "03",
    navLabel: "Stack",
    eyebrow: "The stack",
    title: { lead: "Layer by", highlight: "layer." },
    intro:
      "The request path I work on, top to bottom, and the tools I use at each layer.",
  },
  about: {
    id: "about",
    index: "04",
    navLabel: "About",
    eyebrow: "About",
    title: { lead: "About", highlight: "me." },
  },
  contact: {
    id: "contact",
    index: "05",
    navLabel: "Contact",
    eyebrow: "Contact",
    title: { lead: "Let's build something", highlight: "useful." },
  },
};

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://anganaboruah.vercel.app",
  title: "Angana Boruah / Software Engineer, Full Stack & AI",
  description:
    "Software engineer in Jorhat, India. One of two engineers on a 35,000+ user AI evaluation platform: LLM pipelines, payments, analytics and the data underneath.",
  locale: "en_IN",
  ogTagline: "LLM pipelines / Payments / Data integrity",
  skipLink: "Skip to content",
  navLabel: "Sections",
  footer: { role: "Software Engineer / India", note: "Built with care" },
  notFound: {
    metaTitle: "Not found",
    code: "404",
    title: "Not on the map.",
    body: "This address doesn't point anywhere. The rest of the site still does.",
    back: "Back to the start",
  },
};
