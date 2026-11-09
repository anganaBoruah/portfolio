"use client";

import { useEffect, useState } from "react";

import { nav, profile } from "@/content/profile";
import { sections, site, type SectionId } from "@/content/site";

const sectionList = Object.values(sections);
const linkedSections = sectionList.filter((section) => section.id !== "intro");

// A one-percent band at 40% of the viewport height: whichever section crosses it is current.
const ACTIVE_BAND = "-40% 0px -59% 0px";

export function SiteNav() {
  const [activeId, setActiveId] = useState<SectionId>("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const match = sectionList.find(
            (section) => section.id === entry.target.id,
          );
          if (entry.isIntersecting && match) setActiveId(match.id);
        }
      },
      { rootMargin: ACTIVE_BAND },
    );
    for (const section of sectionList) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label={site.navLabel}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5"
    >
      <div className="flex items-center gap-1 rounded-full border border-line bg-night-2/90 p-1.5 shadow-[0_1rem_3rem_-1rem_rgb(0_0_0/0.7)]">
        <a
          href="#intro"
          className="heading hidden size-9 items-center justify-center rounded-full bg-paper text-lg text-night sm:flex"
        >
          {profile.monogram}
          <span className="sr-only">{sections.intro.navLabel}</span>
        </a>
        <ol className="flex">
          {linkedSections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex h-9 items-center rounded-full px-2.5 text-eyebrow font-medium transition-colors duration-300 sm:px-3.5 ${
                    isActive
                      ? "bg-night-3 text-signal"
                      : "text-paper-dim hover:text-paper"
                  }`}
                >
                  {section.navLabel}
                </a>
              </li>
            );
          })}
        </ol>
        <a
          href={nav.resume.href}
          download
          className="hidden h-9 items-center rounded-full bg-signal px-4 text-eyebrow font-semibold text-night transition-transform hover:scale-[1.03] md:flex"
        >
          {nav.resume.label}
        </a>
      </div>
    </nav>
  );
}
