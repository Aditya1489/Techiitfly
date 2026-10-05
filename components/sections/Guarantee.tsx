"use client";

import Link from "next/link";
import { nextStartDate, isStartDateValid } from "@/content/availability";
import { SITE } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

export default function Guarantee() {
  const showCapacity = isStartDateValid();

  const timelineSteps = [
    { day: "Day 1", title: "Kickoff & content check", desc: "Align on goals, confirm scope, text & domain access." },
    { day: "Day 3", title: "Design preview", desc: "Review the design preview for your round of changes." },
    { day: "Day 5", title: "Full site on preview link", desc: "Click and test all working pages on private preview." },
    { day: "Day 6", title: "Testing & fixes", desc: "Check mobile responsiveness, contact forms & basic SEO." },
    { day: "Day 7", title: "Live on your domain", desc: "Connect DNS, configure SSL, and launch publicly." },
  ];

  return (
    <section
      id="guarantee"
      style={{
        position: "relative",
        background: "var(--bg)",
        padding: "80px 24px 100px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Container Card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "48px 36px",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span className="section-label">GUARANTEED DELIVERY</span>
            
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "var(--text)",
                marginTop: "10px",
                marginBottom: "12px",
              }}
            >
              Live in 7 days. Guaranteed.
            </h2>

            {/* Capacity Line (hidden if date is in the past) */}
            {showCapacity && (
              <p
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.84rem",
                  color: "var(--accent)",
                  letterSpacing: "0.04em",
                  margin: 0,
                }}
              >
                2 project slots per week · Next start: {nextStartDate}
              </p>
            )}
          </div>

          {/* Websites & Platforms 2 Commitment Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              marginBottom: "36px",
            }}
          >
            {/* Websites Card */}
            <div
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.72rem",
                  color: "var(--accent)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                WEBSITES
              </span>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.55,
                  color: "var(--text)",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                Your website live in 7 days — up to 5 pages, counted from the day we receive your content.
              </p>
            </div>

            {/* Platforms & Custom Apps Card */}
            <div
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.72rem",
                  color: "var(--accent)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                PLATFORMS &amp; CUSTOM APPS
              </span>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.55,
                  color: "var(--text)",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                Your first working demo in 7 days, then weekly progress you can click and test.
              </p>
            </div>
          </div>

          {/* Remedy Commitment Box */}
          <div
            style={{
              background: "var(--accent-dim)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "18px 24px",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                color: "var(--accent)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "4px",
                fontWeight: 600,
              }}
            >
              OUR REMEDY COMMITMENT
            </span>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.04rem",
                fontWeight: 600,
                color: "var(--text)",
                margin: 0,
              }}
            >
              Miss the date and your first 3 months of maintenance are free.
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div style={{ marginBottom: "40px" }}>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.74rem",
                color: "var(--muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "18px",
              }}
            >
              7-DAY DELIVERY TIMELINE
            </span>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "14px",
              }}
            >
              {timelineSteps.map((step, idx) => (
                <div
                  key={step.day}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "16px 14px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.75rem",
                      color: "var(--accent)",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    {step.day}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.9rem",
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

            <p
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.78rem",
                color: "var(--muted)",
                marginTop: "14px",
                textAlign: "right",
              }}
            >
              Platforms: first working demo on Day 7, then weekly releases.
            </p>
          </div>

          {/* Included vs Quoted Separately */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginBottom: "36px",
            }}
          >
            {/* What's Included */}
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.98rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "14px",
                }}
              >
                What&apos;s Included in the 7-Day Package
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px", padding: 0, margin: 0 }}>
                {[
                  "mobile-friendly design",
                  "up to 5 pages",
                  "WhatsApp & contact buttons",
                  "enquiry form",
                  "basic SEO",
                  "Google Maps",
                  "launch on your domain",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.86rem",
                      color: "var(--text)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quoted Separately */}
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.98rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "14px",
                }}
              >
                Quoted Separately
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px", padding: 0, margin: 0 }}>
                {[
                  "extra pages",
                  "blog system",
                  "online payments",
                  "login areas",
                  "custom tools",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.86rem",
                      color: "var(--muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ color: "var(--muted)", fontWeight: 700 }}>+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Checkout CTA Button */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Link
              href="/checkout/starter"
              onClick={() => trackEvent("begin_checkout", "guarantee_starter")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 30px",
                borderRadius: "8px",
                background: "var(--accent)",
                color: "#0e0d0b",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(245,158,11,0.3)",
              }}
            >
              <span>Book a 7-day project →</span>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                color: "var(--muted)",
                margin: "8px 0 0",
              }}
            >
              By booking, you agree to our{" "}
              <Link href="/terms" style={{ color: "var(--muted)", textDecoration: "underline" }}>
                Terms
              </Link>
            </p>
          </div>

          {/* Fine Print */}
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.78rem",
              lineHeight: 1.55,
              color: "var(--muted)",
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            The 7 days start when we receive your text, photos, logo and domain access. Includes one round of design changes. Days spent waiting for your feedback or content are not counted. Scope is agreed in writing before we begin.
          </p>
        </div>
      </div>
    </section>
  );
}
