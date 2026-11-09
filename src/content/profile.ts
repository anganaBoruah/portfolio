export type LinkArrow = "up-right" | "right" | "down";

export type ProfileLink = {
  label: string;
  href: string;
  arrow: LinkArrow;
  download?: boolean;
};

const email = "anganaboruah2000@gmail.com";
const mailto = `mailto:${email}`;

export const profile = {
  name: "Angana Boruah",
  monogram: "AB",
  nameLines: ["Angana", "Boruah"],
  jobTitle: "Software Engineer (Full Stack & AI)",
  employer: "Answerwriting AI",
  employerUrl: "https://answerwriting.com",
  locality: "Jorhat",
  region: "Assam",
  country: "India",
  countryCode: "IN",
  coordinates: "26.75° N, 94.20° E",
  latitude: 26.75,
  longitude: 94.2,
  email,
  mailto,
  github: "https://github.com/anganaBoruah",
  linkedin: "https://www.linkedin.com/in/angana-boruah/",
  resume: "/Angana_Boruah_Resume.pdf",
};

export const profileLinks: ProfileLink[] = [
  { label: "GitHub", href: profile.github, arrow: "up-right" },
  { label: "LinkedIn", href: profile.linkedin, arrow: "up-right" },
  { label: "Resume", href: profile.resume, arrow: "down", download: true },
];

type HeroMetaItem = { label: string; value: string; href?: string };

const heroMeta: HeroMetaItem[] = [
  {
    label: "Currently",
    value: "Answerwriting AI, one of two engineers",
    href: profile.employerUrl,
  },
  { label: "Based in", value: "Jorhat, Assam, India" },
];

export const hero = {
  eyebrow: "Software Engineer, Full Stack & AI",
  tagline: "finds the number that's wrong.",
  positioning:
    "I build full-stack products with LLMs inside them, and the payments, queues and data underneath that keep them honest.",
  seeking: {
    status: "Open to opportunities",
    detail: "Full-stack or AI engineering roles, remote or on-site.",
  },
  primaryCta: { label: "See the work", href: "#work" },
  secondaryCta: { label: "Email me", href: mailto },
  meta: heroMeta,
  clock: { label: "Local time", timeZone: "Asia/Kolkata", zoneLabel: "IST" },
};

export const nav = {
  resume: { label: "Resume", href: profile.resume },
};

export const contact = {
  emailLabel: "Write to me",
  note: "Tell me what you're building and where it breaks.",
  links: [
    { label: "GitHub", href: profile.github, arrow: "up-right" },
    { label: "LinkedIn", href: profile.linkedin, arrow: "up-right" },
    {
      label: "Download Resume",
      href: profile.resume,
      arrow: "down",
      download: true,
    },
  ] satisfies ProfileLink[],
  cta: {
    label: "Start a conversation",
    href: `${mailto}?subject=${encodeURIComponent("Let's build something useful")}`,
  },
  copy: { idle: "Copy email", done: "Copied", failed: "Couldn't copy" },
  globeCaption: "Jorhat, Assam",
};
