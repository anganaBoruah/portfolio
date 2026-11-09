import { ArchitectureStack } from "@/components/diagrams/ArchitectureStack";
import { Section } from "@/components/ui/Section";
import { languages, stackLabels } from "@/content/stack";

export function Stack() {
  return (
    <Section id="stack" className="bg-night-2/40">
      <ArchitectureStack />
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <h3 className="eyebrow mr-2">{stackLabels.languages}</h3>
        <ul className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <li
              key={language}
              className="rounded-full border border-line px-4 py-1.5 text-sm"
            >
              {language}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
