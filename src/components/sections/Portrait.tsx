import { existsSync } from "node:fs";
import { join } from "node:path";

import Image from "next/image";

import { TiltCard } from "@/components/ui/TiltCard";
import { about } from "@/content/about";
import { profile } from "@/content/profile";

// Checked at build time: the photo appears as soon as public/portrait.jpg exists,
// and until then the card shows a small initials avatar instead of an empty frame.
const hasPortrait = existsSync(
  join(process.cwd(), "public", about.portrait.src),
);

export function Portrait() {
  if (!hasPortrait) {
    return (
      <span
        role="img"
        aria-label={about.portrait.alt}
        className="heading grid size-16 shrink-0 place-items-center rounded-full bg-signal text-xl text-night"
      >
        {profile.monogram}
      </span>
    );
  }

  return (
    <div className="w-full">
      <TiltCard className="aspect-4/5 overflow-hidden rounded-2xl">
        <Image
          src={about.portrait.src}
          alt={about.portrait.alt}
          fill
          sizes="(min-width: 1024px) 24rem, 90vw"
          className="object-cover"
        />
      </TiltCard>
    </div>
  );
}
