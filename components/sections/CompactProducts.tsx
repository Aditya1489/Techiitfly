"use client";

import Link from "next/link";
import { PRICING_CONFIG } from "@/content/pricing";

export default function CompactProducts() {
  return (
    <section
      id="products"
      style={{
        position: "relative",
        background: "var(--bg)",
        padding: "64px 24px 72px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span className="section-label">OUR PRODUCT</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            Our product
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1rem",
              lineHeight: 1.5,
              color: "var(--muted)",
              margin: 0,
            }}
          >
            Software we build and run ourselves.
          </p>
        </div>

        {/* Single Centered Product Card */}
        <div style={{ maxWidth: "540px", margin: "0 auto" }}>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "var(--card-shadow)",
              transition: "border-color 0.2s ease, transform 0.2s ease",
            }}
          >
            {/* Badge + Icon Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--border)",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth={2}>
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                For Tutors
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: "8px",
              }}
            >
              Mathsy Meet
            </h3>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.92rem",
                lineHeight: 1.55,
                color: "var(--muted)",
                marginBottom: "20px",
              }}
            >
              Live online classroom with built-in geometry tools for math tutors.
            </p>

            {/* CTA Link */}
            <Link
              href="/mathsy-meet"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.92rem",
                fontWeight: 600,
                color: "var(--accent)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Explore Mathsy Meet →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
