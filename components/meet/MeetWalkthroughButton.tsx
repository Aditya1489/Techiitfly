"use client";

import { getConsultUrl } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

interface MeetWalkthroughButtonProps {
  label?: string;
  location?: string;
  style?: React.CSSProperties;
}

export default function MeetWalkthroughButton({
  label = "Book a free walkthrough",
  location = "meet_page",
  style = {},
}: MeetWalkthroughButtonProps) {
  return (
    <a
      href={getConsultUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackEvent("consult_click", location);
        trackEvent("meet_walkthrough_click", location);
      }}
      style={{
        background: "var(--accent-dim)",
        color: "var(--accent)",
        border: "1.5px solid var(--accent)",
        padding: "14px 26px",
        borderRadius: "8px",
        fontFamily: "var(--font-geist-sans)",
        fontSize: "1rem",
        fontWeight: 600,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.15s ease",
        ...style,
      }}
    >
      <span>{label}</span>
      <span>↗</span>
    </a>
  );
}
