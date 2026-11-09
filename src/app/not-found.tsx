import type { Metadata } from "next";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { site } from "@/content/site";

export const metadata: Metadata = { title: site.notFound.metaTitle };

export default function NotFound() {
  const { code, title, body, back } = site.notFound;

  return (
    <main
      id="main"
      className="flex min-h-svh flex-col justify-center px-(--gutter) py-16"
    >
      <div className="content-width w-full">
        <p aria-hidden="true" className="heading text-hero text-signal">
          {code}
        </p>
        <h1 className="heading mt-4 text-display">{title}</h1>
        <p className="text-lead mt-6 max-w-md text-paper-dim">{body}</p>
        <ArrowLink href="/" className="mt-10">
          {back}
        </ArrowLink>
      </div>
    </main>
  );
}
