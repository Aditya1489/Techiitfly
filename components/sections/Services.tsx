"use client";

import { SERVICES } from "@/content/services";

export default function Services() {
  return (
    <section
      id="services"
      style={{
        position: "relative",
        background: "var(--surface)",
        padding: "80px 24px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <span className="section-label">STUDIO CAPABILITIES</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "12px",
              marginBottom: "12px",
            }}
          >
            What We Build for Education & Wellness Brands
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "700px",
            }}
          >
            Specialized engineering for founders who need custom interactive tools, multi-portal platforms, or high-converting booking funnels.
          </p>
        </div>

        {/* Services Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  marginBottom: "12px",
                }}
              >
                {srv.number}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "8px",
                  lineHeight: 1.3,
                }}
              >
                {srv.title}
              </h3>

              {/* One-line summary */}
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.9rem",
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  marginBottom: "20px",
                }}
              >
                {srv.tagline}
              </p>

              {/* 3 Deliverables */}
              <div style={{ marginTop: "auto", marginBottom: "20px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  KEY DELIVERABLES
                </span>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", padding: 0, margin: 0 }}>
                  {srv.deliverables.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "0.84rem",
                        color: "var(--text)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                      }}
                    >
                      <span style={{ color: "var(--accent)", lineHeight: 1.2 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best for */}
              <div
                style={{
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                }}
              >
                <strong style={{ color: "var(--text)" }}>Best for: </strong>
                {srv.bestFor}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
