import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { hero, profile } from "@/content/profile";
import { site } from "@/content/site";
import { palette } from "@/lib/palette";

export const alt = `${profile.name}, ${profile.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PADDING = 80;
const NAME_SIZE = 112;
const NAME_TRACKING = -4;
const NAME_LEADING = 1;
const TAGLINE_SIZE = 48;
const TAGLINE_GAP = 16;
const LABEL_SIZE = 24;
const DOT_SIZE = 14;
const DOT_GAP = 14;

const fontPath = (file: string) => join(process.cwd(), "assets", "fonts", file);

// Read synchronously at module load: async file reads count as uncached data under
// Cache Components and would turn this image into a request-time route.
const headingFont = readFileSync(fontPath("BricolageGrotesque-SemiBold.ttf"));
const bodyFont = readFileSync(fontPath("BricolageGrotesque-Medium.ttf"));

const label = {
  display: "flex",
  alignItems: "center",
  gap: DOT_GAP,
  fontFamily: "Bricolage",
  fontWeight: 500,
  fontSize: LABEL_SIZE,
  color: palette.paperDim,
};

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: palette.night,
        padding: PADDING,
      }}
    >
      <div style={label}>
        <span
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            borderRadius: DOT_SIZE,
            background: palette.signal,
          }}
        />
        <span>{hero.eyebrow}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "Bricolage",
          fontWeight: 600,
        }}
      >
        <span
          style={{
            fontSize: NAME_SIZE,
            lineHeight: NAME_LEADING,
            letterSpacing: NAME_TRACKING,
            color: palette.paper,
          }}
        >
          {profile.name}
        </span>
        <span
          style={{
            fontSize: TAGLINE_SIZE,
            marginTop: TAGLINE_GAP,
            color: palette.signal,
          }}
        >
          {hero.tagline}
        </span>
      </div>
      <div style={{ ...label, justifyContent: "space-between" }}>
        <span>{site.ogTagline}</span>
        <span>{`${profile.locality}, ${profile.country}`}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: headingFont, weight: 600, style: "normal" },
        { name: "Bricolage", data: bodyFont, weight: 500, style: "normal" },
      ],
    },
  );
}
