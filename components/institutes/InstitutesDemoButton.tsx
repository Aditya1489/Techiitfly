"use client";

import { getConsultUrl } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

interface InstitutesDemoButtonProps {
  label?: string;
  location?: string;
  style?: React.CSSProperties;
}

export default function InstitutesDemoButton({
  label = "Book a free demo (30 min)",
  location = "institutes_page",
  style = {},
}: InstitutesDemoButtonProps) {
  return (
    <a
      href={getConsultUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("consult_click", location)}
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
        ...style,
      }}
    >
      <span>{label}</span>
      <span>→</span>
    </a>
  );
}
