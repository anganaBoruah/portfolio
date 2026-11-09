import type { ReactNode } from "react";

import type { LinkArrow } from "@/content/profile";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  arrow?: LinkArrow;
  download?: boolean;
  className?: string;
};

const ARROW_GLYPHS: Record<LinkArrow, string> = {
  "up-right": "↗",
  right: "→",
  down: "↓",
};

const ARROW_NUDGE: Record<LinkArrow, string> = {
  "up-right":
    "group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5",
  right: "group-hover/link:translate-x-1",
  down: "group-hover/link:translate-y-0.5",
};

export function ArrowLink({
  href,
  children,
  arrow = "right",
  download = false,
  className = "",
}: ArrowLinkProps) {
  return (
    <a
      href={href}
      download={download || undefined}
      className={`group/link inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-signal hover:text-signal ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`transition-transform duration-300 ease-(--ease-soft) motion-reduce:transition-none ${ARROW_NUDGE[arrow]}`}
      >
        {ARROW_GLYPHS[arrow]}
      </span>
    </a>
  );
}
