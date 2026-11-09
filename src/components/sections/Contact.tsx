import { LocationGlobe } from "@/components/diagrams/LocationGlobe";
import { CopyEmail } from "@/components/sections/CopyEmail";
import { LocalTime } from "@/components/sections/LocalTime";
import { ProfileLinks } from "@/components/ui/ProfileLinks";
import { Section } from "@/components/ui/Section";
import { contact, hero, profile } from "@/content/profile";

export function Contact() {
  return (
    <Section id="contact" className="relative overflow-hidden">
      <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div>
          <p className="text-paper-dim">{contact.emailLabel}</p>
          <a
            href={profile.mailto}
            className="heading mt-2 inline-block text-email break-all underline decoration-signal decoration-1 underline-offset-[0.18em] transition-colors hover:text-signal sm:break-normal"
          >
            {profile.email}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={contact.cta.href}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-signal px-6 font-semibold text-night transition-transform hover:scale-[1.03]"
            >
              {contact.cta.label}
              <span aria-hidden="true">→</span>
            </a>
            <CopyEmail email={profile.email} />
          </div>
          <p className="mt-6 text-paper-dim">{contact.note}</p>
          <ProfileLinks links={contact.links} className="mt-10" />
        </div>
        <figure className="mx-auto w-full max-w-md">
          <LocationGlobe
            latitude={profile.latitude}
            longitude={profile.longitude}
          />
          <figcaption className="mt-4 flex flex-wrap justify-center gap-x-3 text-sm text-paper-dim">
            <span className="text-paper">{contact.globeCaption}</span>
            <span>{profile.coordinates}</span>
            <LocalTime
              timeZone={hero.clock.timeZone}
              zoneLabel={hero.clock.zoneLabel}
            />
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
