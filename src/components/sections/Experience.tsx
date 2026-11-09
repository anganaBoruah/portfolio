import { Workstreams } from "@/components/sections/Workstreams";
import { Section } from "@/components/ui/Section";
import { role } from "@/content/experience";

export function Experience() {
  return (
    <Section id="experience">
      <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <p className="text-sm text-paper-dim">
            <time dateTime={role.startDate}>{role.period}</time>
          </p>
          <h3 className="heading mt-3 text-display">
            <a href={role.url} className="transition-colors hover:text-signal">
              {role.company}
              <span aria-hidden="true" className="ml-2 text-title text-signal">
                ↗
              </span>
            </a>
          </h3>
          <p className="mt-3 text-lg">{role.title}</p>
        </div>
        <div>
          <p className="max-w-xl text-paper-dim">{role.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {role.facts.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-line px-4 py-1.5 text-sm"
              >
                {fact}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm">
            <span className="text-paper-dim">{role.stackLabel}: </span>
            {role.stack.join(" · ")}
          </p>
        </div>
      </div>
      <Workstreams />
    </Section>
  );
}
