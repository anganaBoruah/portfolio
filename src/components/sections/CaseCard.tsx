import { CaseProof } from "@/components/sections/CaseProof";
import { TiltCard } from "@/components/ui/TiltCard";
import { workLabels, type CaseStudy } from "@/content/work";

type CaseCardProps = {
  study: CaseStudy;
  className?: string;
};

export function CaseCard({ study, className = "" }: CaseCardProps) {
  return (
    <article aria-labelledby={`case-${study.id}`} className={className}>
      <TiltCard className="flex flex-col gap-6 rounded-(--radius-card) border border-line bg-night-2 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4 [transform:translateZ(20px)]">
          <span className="eyebrow">{study.kicker}</span>
          <span className="heading text-xl text-paper-dim">{study.index}</span>
        </div>
        <div className="[transform:translateZ(30px)]">
          <h3
            id={`case-${study.id}`}
            className="heading text-title text-balance"
          >
            {study.title}
          </h3>
          <p className="mt-4 max-w-prose text-paper-dim">{study.body}</p>
        </div>
        <div className="my-auto flex flex-wrap items-end justify-between gap-6 [transform:translateZ(60px)]">
          <div>
            <p className="heading text-stat text-signal">
              {study.metric.value}
            </p>
            <p className="mt-2 max-w-[22ch] text-sm text-paper-dim">
              {study.metric.caption}
            </p>
          </div>
          <div className="hidden min-w-[min(100%,15rem)] flex-1 sm:block">
            <CaseProof proof={study.proof} />
          </div>
        </div>
        <div className="border-t border-line pt-5 [transform:translateZ(20px)]">
          <h4 className="text-sm font-semibold">{workLabels.shipped}</h4>
          <p className="mt-2 text-sm leading-relaxed text-paper-dim">
            {study.shipped}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <li
                key={item}
                className="rounded-full bg-night-3 px-3 py-1 text-xs text-paper-dim"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </TiltCard>
    </article>
  );
}
