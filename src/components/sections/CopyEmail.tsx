"use client";

import { useEffect, useState } from "react";

import { contact } from "@/content/profile";

type CopyEmailProps = {
  email: string;
};

type CopyState = keyof typeof contact.copy;

const RESET_AFTER_MS = 2000;

export function CopyEmail({ email }: CopyEmailProps) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timeoutId = window.setTimeout(() => setState("idle"), RESET_AFTER_MS);
    return () => window.clearTimeout(timeoutId);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("done");
    } catch {
      setState("failed");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium transition-colors hover:border-paper"
    >
      <span
        aria-hidden="true"
        className={`size-2 rounded-full transition-colors ${state === "done" ? "bg-signal" : "bg-paper/30"}`}
      />
      <span aria-live="polite">{contact.copy[state]}</span>
    </button>
  );
}
