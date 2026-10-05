"use client";

import Link from "next/link";
import { PRICING_CONFIG } from "@/content/pricing";

export default function CompactProducts() {
  const products = [
    {
      title: "Mathsy for Institutes",
      tagline: "White-label 4-portal LMS with proctored tests for coaching academies.",
      href: "/mathsy-for-institutes",
      cta: "Explore Mathsy for Institutes →",
      badge: "For Coaching Classes",
      priceLine: PRICING_CONFIG.institutes.cardPriceLine,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth={2}>
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
    },
    {
      title: "Mathsy Meet",
      tagline: "Live online classroom with built-in geometry tools for math tutors.",
      href: "/mathsy-meet",
      cta: "Explore Mathsy Meet →",
      badge: "For Tutors",
      priceLine: PRICING_CONFIG.meet.cardPriceLine,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth={2}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
  ];

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
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span className="section-label">OUR PRODUCTS</span>
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
            Software we build and run ourselves
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
            Proven platforms powering active coaching institutes and private educators.
          </p>
        </div>

        {/* 2 Focused Product Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {products.map((prod) => (
            <div
              key={prod.title}
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
                  {prod.icon}
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
                  {prod.badge}
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
                {prod.title}
              </h3>

              {/* Tagline */}
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  marginBottom: "20px",
                  flexGrow: 1,
                }}
              >
                {prod.tagline}
              </p>

              {/* Price Line under product card */}
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  marginBottom: "16px",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {prod.priceLine}
              </div>

              {/* CTA Link */}
              <Link
                href={prod.href}
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
                <span>{prod.cta}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
