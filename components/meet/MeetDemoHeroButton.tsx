"use client";

import { getMeetDemoUrl } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

export default function MeetDemoHeroButton() {
  const handleClick = () => {
    trackEvent("meet_demo_click", "meet_hero");
  };

  return (
    <a
      href={getMeetDemoUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      style={{
        background: "var(--accent)",
        color: "var(--primary-btn-text)",
        padding: "14px 28px",
        borderRadius: "8px",
        fontFamily: "var(--font-geist-sans)",
        fontSize: "1rem",
        fontWeight: 600,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 0 24px rgba(245,158,11,0.25)",
      }}
    >
      <span>Try a free demo class</span>
      <span>→</span>
    </a>
  );
}
