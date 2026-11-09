import { ArrowLink } from "@/components/ui/ArrowLink";
import type { ProfileLink } from "@/content/profile";

type ProfileLinksProps = {
  links: ProfileLink[];
  className?: string;
};

export function ProfileLinks({ links, className = "" }: ProfileLinksProps) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-3 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <ArrowLink
            href={link.href}
            arrow={link.arrow}
            download={link.download}
          >
            {link.label}
          </ArrowLink>
        </li>
      ))}
    </ul>
  );
}
