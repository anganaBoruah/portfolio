import type { ReactNode } from "react";

import { sections, type SectionId } from "@/content/site";

type SectionProps = {
  id: SectionId;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className = "" }: SectionProps) {
  const section = sections[id];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`px-(--gutter) py-16 sm:py-20 lg:py-28 ${className}`}
    >
      <div className="content-width">
        <header className="max-w-3xl">
          <p className="eyebrow">
            <span className="text-paper">{section.index}</span>
            {section.eyebrow}
          </p>
          {section.title && (
            <h2
              id={`${id}-title`}
              className="heading mt-5 text-display text-balance"
            >
              {section.title.lead}{" "}
              <span className="text-signal">{section.title.highlight}</span>
            </h2>
          )}
          {section.intro && (
            <p className="text-lead mt-6 max-w-xl text-paper-dim">
              {section.intro}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
