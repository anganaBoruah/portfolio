import { workstreams } from "@/content/experience";

export function Workstreams() {
  return (
    <ol className="mt-12 grid border-t border-line md:grid-cols-2 md:gap-x-12 lg:mt-16">
      {workstreams.map((stream) => (
        <li key={stream.index} className="border-b border-line py-7">
          <div className="flex items-baseline justify-between gap-6">
            <h4 className="heading text-title">
              <span className="mr-3 text-base text-paper-dim">
                {stream.index}
              </span>
              {stream.title}
            </h4>
            <p className="shrink-0 text-right">
              <span className="heading block text-2xl text-signal">
                {stream.figure.value}
              </span>
              <span className="block max-w-[12ch] text-xs text-paper-dim">
                {stream.figure.caption}
              </span>
            </p>
          </div>
          <p className="mt-2 max-w-prose">{stream.summary}</p>
          <ul className="mt-4 grid gap-2 text-sm text-paper-dim">
            {stream.notes.map((note) => (
              <li key={note} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-signal"
                />
                {note}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
