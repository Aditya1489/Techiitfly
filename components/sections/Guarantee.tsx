"use client";

import Link from "next/link";
import { nextStartDate, isStartDateValid } from "@/content/availability";

export default function Guarantee() {
  const showCapacity = isStartDateValid();

  const timelineSteps = [
    { day: "Day 1", title: "Kickoff & content check", desc: "Align on goals, confirm scope, text & domain access." },
    { day: "Day 3", title: "Design preview", desc: "Review initial design layout & give your feedback." },
    { day: "Day 5", title: "Full interactive preview", desc: "Click and test all working pages on a private staging link." },
    { day: "Day 6", title: "Testing & refinements", desc: "Mobile responsiveness, contact forms, speed & basic SEO." },
    { day: "Day 7", title: "Live on your domain", desc: "Connect DNS, configure SSL certificate, and launch publicly." },
  ];

  return (
    <section
      id="guarantee"
      style={{
        position: "relative",
        background: "var(--bg)",
        padding: "80px 24px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "48px 36px",
            boxShadow: "var(--card-shadow)",
            textAlign: "center",
          }}
        >
          <span className="section-label">GUARANTEED DELIVERY</span>

          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "10px",
              marginBottom: "14px",
            }}
          >
            Live in 7 days. Guaranteed.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.12rem",
              lineHeight: 1.6,
              color: "var(--text)",
              fontWeight: 500,
              maxWidth: "760px",
              margin: "0 auto 20px",
            }}
          >
            Up to 5 pages, counted from the day we receive your content. If we miss the date, your first 3 months of maintenance are free.
          </p>

          {/* Capacity Line from availability.ts */}
          {showCapacity && (
            <p
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.85rem",
                color: "var(--accent)",
                letterSpacing: "0.04em",
                marginBottom: "36px",
              }}
            >
              2 project slots per week · Next start: {nextStartDate}
            </p>
          )}

          {/* Compact Day 1 → 3 → 5 → 6 → 7 timeline */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "14px",
              textAlign: "left",
              marginBottom: "32px",
            }}
          >
            {timelineSteps.map((step) => (
              <div
                key={step.day}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "16px 14px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.78rem",
                    color: "var(--accent)",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  {step.day}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "4px",
                  }}
                >
                  {step.title}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    lineHeight: 1.45,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Link to full guarantee terms */}
          <div>
            <Link
              href="/terms#delivery-guarantee"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--accent)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              See full guarantee terms →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

