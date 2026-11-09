import { BuildList } from "@/components/sections/BuildList";
import { CaseCard } from "@/components/sections/CaseCard";
import { Section } from "@/components/ui/Section";
import { caseStudies } from "@/content/work";

// Alternating wide and narrow cards so the grid reads as a rhythm, not a wall of tiles.
const CARD_SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

export function Work() {
  return (
    <Section id="work">
      <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-12">
        {caseStudies.map((study, i) => (
          <CaseCard key={study.id} study={study} className={CARD_SPANS[i]} />
        ))}
      </div>
      <BuildList />
    </Section>
  );
}
