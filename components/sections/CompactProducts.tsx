"use client";

import Link from "next/link";

export default function CompactProducts() {
  const products = [
    {
      title: "Mathsy Meet",
      tagline: "Live online classroom with built-in geometry tools for tutors.",
      href: "/mathsy-meet",
      cta: "Explore Mathsy Meet →",
      badge: "For Tutors",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth={2}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      title: "Mathsy for Institutes",
      tagline: "Branded learning platform for coaching classes.",
      href: "/mathsy-for-institutes",
      cta: "Explore Mathsy for Institutes →",
      badge: "For Coaching Classes",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth={2}>
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
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
          <span className="section-label">ALSO FROM TECHIITFLY</span>
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
            Our products
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

        {/* 2 Small Side-by-Side Cards (no large screenshots; small icon only) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((prod) => (
            <div
              key={prod.title}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px 22px",
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
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "38px",
                    height: "38px",
                    borderRadius: "8px",
                    background: "var(--accent-dim)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {prod.icon}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.7rem",
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
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "6px",
                }}
              >
                {prod.title}
              </h3>

              {/* One short line */}
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  marginBottom: "20px",
                  flexGrow: 1,
                }}
              >
                {prod.tagline}
              </p>

              {/* CTA Link */}
              <Link
                href={prod.href}
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  marginTop: "auto",
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
