"use client";

import { useState } from "react";
import Image from "next/image";
import { founderBio } from "@/content/about";
import { SITE } from "@/content/site";

export default function AboutFounder() {
  const [imgError, setImgError] = useState(false);

  // Hidden until founder text is provided in /content/about.ts
  if (!founderBio || founderBio.trim() === "") {
    return null;
  }

  return (
    <section
      id="about"
      style={{
        background: "var(--bg)",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "40px 36px",
            display: "flex",
            alignItems: "center",
            gap: "32px",
            flexWrap: "wrap",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {/* Photo slot (hidden if image missing/error) */}
          {!imgError && (
            <div
              style={{
                position: "relative",
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid var(--accent)",
                flexShrink: 0,
                background: "var(--surface-2)",
              }}
            >
              <Image
                src="/aditya.webp"
                alt="Aditya Chavhan, founder of techiitfly"
                fill
                style={{ objectFit: "cover" }}
                onError={() => setImgError(true)}
              />
            </div>
          )}

          {/* Details */}
          <div style={{ flex: 1, minWidth: "260px" }}>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                color: "var(--accent)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                display: "block",
                marginBottom: "6px",
              }}
            >
              ABOUT THE FOUNDER
            </span>
            <h3
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: "4px",
              }}
            >
              Aditya Chavhan, founder of techiitfly
            </h3>
            <p
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.78rem",
                color: "var(--muted)",
                marginBottom: "14px",
              }}
            >
              Pune, India
            </p>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "var(--text)",
                marginBottom: "18px",
              }}
            >
              {founderBio}
            </p>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "var(--accent)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Connect on WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
