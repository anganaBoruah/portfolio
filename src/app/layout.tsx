import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";

import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { palette } from "@/lib/palette";

import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s / ${profile.name}` },
  description: site.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: palette.night,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={bricolage.variable}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only z-[70] rounded-full bg-signal px-5 py-3 font-semibold text-night focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {site.skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
