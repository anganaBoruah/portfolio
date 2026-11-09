import { ArrowLink } from "@/components/ui/ArrowLink";
import { builds, workLabels } from "@/content/work";

export function BuildList() {
  return (
    <div className="mt-16 lg:mt-20">
      <h3 className="eyebrow">{workLabels.builds}</h3>
      <ol className="mt-6">
        {builds.map((build) => (
          <li
            key={build.id}
            className="group grid gap-4 border-t border-line py-6 last:border-b md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] md:items-baseline md:gap-10"
          >
            <div>
              <h4 className="heading text-title transition-colors group-hover:text-signal">
                {build.title}{" "}
                <span className="font-sans text-sm tracking-normal text-paper-dim">
                  {build.qualifier}
                </span>
              </h4>
              <p className="mt-3 max-w-prose">{build.purpose}</p>
            </div>
            <div className="text-sm text-paper-dim">
              <p>{build.note}</p>
              <p className="mt-3 text-paper/70">{build.stack.join(" · ")}</p>
            </div>
            <ul className="flex gap-2">
              {build.links.map((link) => (
                <li key={link.href}>
                  <ArrowLink href={link.href} arrow={link.arrow}>
                    {link.label}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
