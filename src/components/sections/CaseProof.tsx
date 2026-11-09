import type { CaseProof as CaseProofData } from "@/content/work";

type CaseProofProps = {
  proof: CaseProofData;
};

const COUNTER_LOCALE = "en-US";

export function CaseProof({ proof }: CaseProofProps) {
  if (proof.kind === "ratio") {
    return (
      <figure>
        <div role="img" aria-label={proof.label} className="flex gap-2">
          {Array.from({ length: proof.total }, (_, i) => (
            <span
              key={i}
              className={`size-3.5 rounded-full ${
                i < proof.flagged
                  ? "bg-signal shadow-[0_0_0_4px_var(--color-signal-soft)]"
                  : "bg-paper/40"
              }`}
            />
          ))}
        </div>
        <figcaption className="mt-3 text-sm text-paper-dim">
          {proof.label}
        </figcaption>
      </figure>
    );
  }

  if (proof.kind === "checks") {
    return (
      <figure>
        <div
          role="img"
          aria-label={proof.label}
          className="grid h-3.5 gap-1"
          style={{ gridTemplateColumns: `repeat(${proof.issues}, 1fr)` }}
        >
          {Array.from({ length: proof.issues }, (_, i) => (
            <span key={i} className="rounded-full bg-signal" />
          ))}
        </div>
        <figcaption className="mt-3 text-sm text-paper-dim">
          {proof.label}
        </figcaption>
      </figure>
    );
  }

  if (proof.kind === "counter") {
    const digits = proof.value.toLocaleString(COUNTER_LOCALE);
    return (
      <figure>
        <div role="img" aria-label={digits} className="flex items-end gap-1.5">
          {digits.split("").map((character, i) =>
            character === "," ? (
              <span key={i} className="heading text-2xl text-paper-dim">
                ,
              </span>
            ) : (
              <span
                key={i}
                className="heading grid h-12 w-10 place-items-center rounded-xl bg-night text-2xl ring-1 ring-line-strong"
              >
                {character}
              </span>
            ),
          )}
        </div>
        <figcaption className="mt-3 text-sm text-paper-dim">
          {proof.label}
        </figcaption>
      </figure>
    );
  }

  const bars = [
    { label: proof.baselineLabel, units: proof.baseline, fill: "bg-paper/40" },
    { label: proof.observedLabel, units: proof.observed, fill: "bg-signal" },
  ];
  return (
    <dl className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 text-sm">
      {bars.map((bar) => (
        <div key={bar.label} className="contents">
          <dt className="text-paper-dim">
            {bar.label} <span className="text-paper">{bar.units}×</span>
          </dt>
          <dd className="h-2.5 rounded-full bg-night">
            <span
              className={`block h-full rounded-full ${bar.fill}`}
              style={{ width: `${(bar.units / proof.observed) * 100}%` }}
            />
          </dd>
        </div>
      ))}
    </dl>
  );
}
