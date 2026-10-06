"use client";

import Link from "next/link";
import { SITE, getConsultUrl } from "@/content/site";
import { getWhatsAppHref, trackEvent } from "@/lib/tracking";

export default function ConsultationBand() {
  const points = [
    "Tell us about your business",
    "Get honest advice",
    "Leave with a fixed-price quote",
  ];

  return (
    <section
      id="consultation"
      className="consultation-band-section"
      style={{
        position: "relative",
        padding: "72px 24px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <div
          className="consultation-band-card"
          style={{
            borderRadius: "var(--radius-lg)",
            padding: "44px 36px",
            boxShadow: "0 14px 40px rgba(0,0,0,0.15)",
          }}
        >
          {/* Eyebrow */}
          <div style={{ textAlign: "center", marginBottom: "12px" }}>
            <span
              className="consultation-eyebrow"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "inline-block",
              }}
            >
              FREE · 15 MINUTES · NO OBLIGATION
            </span>
          </div>

          {/* Headline */}
          <h2
            className="consultation-headline"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              textAlign: "center",
              margin: "0 auto 30px",
              maxWidth: "760px",
            }}
          >
            Not sure what you need? Let&apos;s figure it out together.
          </h2>

          {/* 3 Points */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
              marginBottom: "36px",
            }}
          >
            {points.map((pt, i) => (
              <div
                key={i}
                className="consultation-point-item"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "16px 18px",
                  borderRadius: "8px",
                }}
              >
                <span
                  className="consultation-check"
                  style={{
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    lineHeight: 1.2,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span
                  className="consultation-pt-text"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.95rem",
                    lineHeight: 1.45,
                    fontWeight: 500,
                  }}
                >
                  {pt}
                </span>
              </div>
            ))}
          </div>

          {/* Actions: Button "Book my free call" + text link "/xray" */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
              <a
                href={getConsultUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("consult_click", "consultation_band")}
                className="consultation-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "15px 32px",
                  borderRadius: "8px",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                <span>Book my free call</span>
                <span>→</span>
              </a>

              <Link
                href="/xray"
                className="consultation-wa-link"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Or get a free audit of your current website →
              </Link>
            </div>

            {/* Desktop (≥1024px) Phone & Email note */}
            <div
              className="desktop-only"
              style={{
                fontSize: "0.8rem",
                fontFamily: "var(--font-geist-mono)",
                marginTop: "6px",
                opacity: 0.85,
              }}
            >
              Direct phone:{" "}
              <a href={`tel:${SITE.phoneRaw}`} style={{ textDecoration: "underline", color: "inherit" }}>
                {SITE.phone}
              </a>
              {" · "}
              <a href={`mailto:${SITE.contactEmail}`} style={{ textDecoration: "underline", color: "inherit" }}>
                {SITE.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Light mode default */
        .consultation-band-section {
          background: #FDF3E3;
        }
        .consultation-band-card {
          background: rgba(255, 255, 255, 0.7);
          border: 1.5px solid #F6D8A8;
        }
        .consultation-eyebrow {
          color: #B45309;
        }
        .consultation-headline {
          color: #1C1917;
        }
        .consultation-point-item {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid #EED4A6;
        }
        .consultation-check {
          color: #B45309;
        }
        .consultation-pt-text {
          color: #292524;
        }
        .consultation-btn {
          background: #B45309;
          color: #FFFFFF;
        }
        .consultation-btn:hover {
          background: #92400E;
        }
        .consultation-wa-link {
          color: #B45309;
        }
        .consultation-wa-link:hover {
          color: #78350F;
        }

        /* Dark mode overrides (WCAG AA compliant) */
        :global([data-theme="dark"]) .consultation-band-section {
          background: #1F1A12;
        }
        :global([data-theme="dark"]) .consultation-band-card {
          background: #17130D;
          border: 1px solid rgba(245, 158, 11, 0.35);
        }
        :global([data-theme="dark"]) .consultation-eyebrow {
          color: #F59E0B;
        }
        :global([data-theme="dark"]) .consultation-headline {
          color: #F5F5F4;
        }
        :global([data-theme="dark"]) .consultation-point-item {
          background: #241E15;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }
        :global([data-theme="dark"]) .consultation-check {
          color: #F59E0B;
        }
        :global([data-theme="dark"]) .consultation-pt-text {
          color: #E7E5E4;
        }
        :global([data-theme="dark"]) .consultation-btn {
          background: #F59E0B;
          color: #0E0D0B;
        }
        :global([data-theme="dark"]) .consultation-btn:hover {
          background: #D97706;
        }
        :global([data-theme="dark"]) .consultation-wa-link {
          color: #F59E0B;
        }
        :global([data-theme="dark"]) .consultation-wa-link:hover {
          color: #FBBF24;
        }
      `}</style>
    </section>
  );
}
