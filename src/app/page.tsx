import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Stack } from "@/components/sections/Stack";
import { Work } from "@/components/sections/Work";
import { education } from "@/content/about";
import { role } from "@/content/experience";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { languages, stackLayers } from "@/content/stack";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.jobTitle,
  url: site.url,
  email: profile.mailto,
  worksFor: { "@type": "Organization", name: role.company },
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.locality,
    addressRegion: profile.region,
    addressCountry: profile.countryCode,
  },
  alumniOf: education.items
    .filter((item) => item.kind === "degree")
    .map((item) => ({ "@type": "CollegeOrUniversity", name: item.place })),
  knowsAbout: [...languages, ...stackLayers.flatMap((layer) => layer.tools)],
  sameAs: [profile.github, profile.linkedin],
};

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <About />
        <Contact />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
