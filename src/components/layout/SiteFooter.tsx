import { cacheLife } from "next/cache";

import { profile } from "@/content/profile";
import { site } from "@/content/site";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="px-(--gutter) pb-8">
      <div className="content-width flex flex-col gap-2 border-t border-line pt-6 text-sm text-paper-dim sm:flex-row sm:justify-between">
        <p>
          {profile.name} © <CopyrightYear />
        </p>
        <p>{site.footer.role}</p>
        <p>{site.footer.note}</p>
      </div>
    </footer>
  );
}
