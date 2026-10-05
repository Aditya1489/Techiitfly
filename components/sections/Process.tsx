"use client";

import { PROCESS_STEPS } from "@/content/process";

export default function Process() {
  return (
    <section
      id="process"
      style={{
        position: "relative",
        background: "var(--surface-2)",
        padding: "90px 24px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-label">7-DAY WEBSITE TIMELINE</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "10px",
              marginBottom: "12px",
            }}
          >
            From Content to Live Site in 7 Days
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            A streamlined, predictable timeline for websites up to 5 pages.
          </p>
        </div>

        {/* Short Timeline Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "18px",
            marginBottom: "36px",
          }}
        >
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.day}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "var(--card-shadow)",
              }}
            >
              {/* Day badge */}
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {step.day}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "8px",
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>

              {/* Single sentence */}
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                {step.sentence}
              </p>
            </div>
          ))}
        </div>

        {/* Platforms line below */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.85rem",
              color: "var(--accent)",
              background: "var(--accent-dim)",
              border: "1px solid var(--border)",
              display: "inline-block",
              padding: "8px 18px",
              borderRadius: "999px",
            }}
          >
            Platforms: first working demo on Day 7, then weekly releases.
          </p>
        </div>
      </div>
    </section>
  );
}
