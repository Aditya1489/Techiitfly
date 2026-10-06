"use client";

import Image from "next/image";
import { founderName, founderPhoto, founderStory, hasFounderBlock } from "@/content/about";
import { SITE } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

export default function FounderSection() {
  if (!hasFounderBlock) {
    return null;
  }

  return (
    <section
      id="about"
      style={{
        padding: "80px 24px",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-label">FOUNDER</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "12px",
            }}
          >
            You work directly with me
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            No account managers. No handoffs. You talk to the person who builds your website.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "36px",
            alignItems: "center",
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "36px",
          }}
        >
          {founderPhoto && (
            <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", maxWidth: "260px", margin: "0 auto", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)" }}>
              <Image src={founderPhoto} alt={founderName} fill style={{ objectFit: "cover" }} />
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "1.8rem",
                fontWeight: 400,
                color: "var(--text)",
                margin: 0,
              }}
            >
              {founderName}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.98rem",
                lineHeight: 1.6,
                color: "var(--muted)",
                margin: 0,
              }}
            >
              {founderStory}
            </p>

            <div style={{ marginTop: "8px" }}>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", "founder_section")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 22px",
                  borderRadius: "8px",
                  background: "var(--accent)",
                  color: "var(--primary-btn-text)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <span>Chat with Aditya on WhatsApp</span>
                <span>↗</span>
              </a>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  marginTop: "10px",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                }}
              >
                <a href={`tel:${SITE.phoneRaw}`} style={{ color: "var(--muted)", textDecoration: "none" }}>
                  Call: {SITE.phone}
                </a>
                <span>·</span>
                <a href={`mailto:${SITE.contactEmail}`} style={{ color: "var(--muted)", textDecoration: "none" }}>
                  {SITE.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
