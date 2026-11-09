import { Portrait } from "@/components/sections/Portrait";
import { Section } from "@/components/ui/Section";
import { about, education } from "@/content/about";
import { profile } from "@/content/profile";
import { languages } from "@/content/stack";

export function About() {
  const glance: { label: string; value: string; period?: string }[] = [
    about.card.now,
    ...education.items.map((item) => ({
      label: item.label,
      value: `${item.name}, ${item.place}`,
      period: item.period,
    })),
    { label: about.card.languagesLabel, value: languages.join(", ") },
  ];

  return (
    <Section id="about">
      <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
        <div className="max-w-xl">
          {about.paragraphs.map((paragraph, i) => (
            <p
              key={paragraph}
              className={
                i === 0
                  ? "text-lg leading-relaxed"
                  : "mt-5 leading-relaxed text-paper-dim"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
        <aside
          aria-label={about.card.glanceLabel}
          className="self-start rounded-(--radius-card) border border-line bg-night-2 p-7"
        >
          <div className="flex flex-wrap items-center gap-4">
            <Portrait />
            <div>
              <p className="heading text-lg">{profile.name}</p>
              <p className="text-sm text-paper-dim">{about.card.location}</p>
            </div>
          </div>
          <dl className="mt-7 grid gap-5 border-t border-line pt-6 text-sm">
            {glance.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[6.5rem_1fr] gap-3"
              >
                <dt className="text-paper-dim">{item.label}</dt>
                <dd>
                  {item.value}
                  {item.period && (
                    <span className="block text-paper-dim">{item.period}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}
