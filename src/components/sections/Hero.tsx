import { SignalField } from "@/components/diagrams/SignalField";
import { LocalTime } from "@/components/sections/LocalTime";
import { ProfileLinks } from "@/components/ui/ProfileLinks";
import { hero, profile, profileLinks } from "@/content/profile";

export function Hero() {
  return (
    <section
      id="intro"
      aria-labelledby="intro-title"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-(--gutter) pt-28 pb-16"
    >
      <div className="absolute inset-0 [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_80%,transparent),linear-gradient(to_right,rgb(0_0_0/0.35),black_60%)] lg:[mask-image:linear-gradient(to_bottom,transparent,black_30%,black_80%,transparent),linear-gradient(to_right,transparent_20%,black_55%)]">
        <SignalField />
      </div>
      <div className="content-width relative w-full">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="intro-title" className="heading mt-6 text-hero">
          {profile.nameLines.map((line) => (
            <span key={line} className="reveal-line">
              <span>{line} </span>
            </span>
          ))}
        </h1>
        <p className="heading reveal-line mt-3 text-title text-signal">
          <span>{hero.tagline}</span>
        </p>
        <div className="mt-8 grid max-w-xl gap-8">
          <div>
            <p className="text-lead">{hero.positioning}</p>
            <p className="mt-6 flex items-start gap-3 rounded-2xl border border-signal/30 bg-signal-soft px-4 py-3 text-sm">
              <span
                aria-hidden="true"
                className="mt-1.5 size-2 shrink-0 rounded-full bg-signal shadow-[0_0_0_4px_var(--color-signal-soft)]"
              />
              <span>
                <strong className="font-semibold text-signal">
                  {hero.seeking.status}.
                </strong>{" "}
                {hero.seeking.detail}
              </span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={hero.primaryCta.href}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 font-semibold text-night transition-transform hover:scale-[1.03]"
              >
                {hero.primaryCta.label}
                <span aria-hidden="true">↓</span>
              </a>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 font-medium transition-colors hover:border-paper"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6 border-t border-line pt-6">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm sm:grid-cols-3">
              {hero.meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-paper-dim">{item.label}</dt>
                  <dd className="mt-1">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="underline decoration-signal decoration-1 underline-offset-4 transition-colors hover:text-signal"
                      >
                        {item.value}
                        <span aria-hidden="true"> ↗</span>
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="text-paper-dim">{hero.clock.label}</dt>
                <dd className="mt-1">
                  <LocalTime
                    timeZone={hero.clock.timeZone}
                    zoneLabel={hero.clock.zoneLabel}
                  />
                </dd>
              </div>
            </dl>
            <ProfileLinks links={profileLinks} />
          </div>
        </div>
      </div>
    </section>
  );
}
