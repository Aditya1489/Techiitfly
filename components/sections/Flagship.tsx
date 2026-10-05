"use client";

import Link from "next/link";
import { getProjectBySlug } from "@/content/projects";
import StickyScrollShowcase from "@/components/sections/StickyScrollShowcase";
import MathsyMeetMediaSlot from "@/components/sections/MathsyMeetMediaSlot";

export default function Flagship() {
  const mathsy = getProjectBySlug("mathsy");
  if (!mathsy) return null;

  return (
    <section
      id="flagship"
      style={{
        position: "relative",
        background: "var(--surface-2)",
        padding: "100px 24px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ marginBottom: "52px" }}>
          <span className="section-label">FLAGSHIP PLATFORM // EDTECH</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "12px",
              marginBottom: "16px",
            }}
          >
            Mathsy
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "800px",
            }}
          >
            4-portal learning platform with its own live classroom, Mathsy Meet.
          </p>
        </div>

        {/* Flagship Sticky Scroll Showcase */}
        {mathsy.glorifiedScreenshots && (
          <StickyScrollShowcase
            items={mathsy.glorifiedScreenshots}
            title="Production Platform Showcase"
            subtitle="Tour verified production interfaces across the student learning portal, test series engine, tutor evaluation queue, and practice modules."
          />
        )}

        {/* 4 Portals Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {mathsy.portals?.map((portal, idx) => (
            <div
              key={portal.title}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    letterSpacing: "0.1em",
                  }}
                >
                  PORTAL 0{idx + 1}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "var(--text)",
                }}
              >
                {portal.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  color: "var(--muted)",
                }}
              >
                {portal.description}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
                {portal.features.map((feat) => (
                  <li
                    key={feat}
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.82rem",
                      color: "var(--text)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "var(--accent)", lineHeight: 1.2 }}>✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mathsy Meet Feature Highlight Box */}
        {mathsy.flagshipModule && (
          <div
            className="force-dark"
            data-theme="dark"
            style={{
              background: "linear-gradient(135deg, rgba(34,31,26,0.9) 0%, rgba(26,24,20,0.95) 100%)",
              border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: "var(--radius-lg)",
              padding: "40px 32px",
              marginBottom: "48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  BESPOKE VIRTUAL CLASSROOM
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                    fontWeight: 400,
                    color: "var(--text)",
                    marginTop: "4px",
                  }}
                >
                  {mathsy.flagshipModule.name}
                </h3>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                }}
              >
                Self-Hosted Mediasoup SFU
              </span>
            </div>

            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1rem",
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: "760px",
                marginBottom: "24px",
              }}
            >
              {mathsy.flagshipModule.description}
            </p>

            {/* Highlights Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "14px",
                marginBottom: "28px",
              }}
            >
              {mathsy.flagshipModule.highlights.map((item) => (
                <div
                  key={item}
                  style={{
                    background: "rgba(14,13,11,0.5)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.85rem",
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: "var(--accent)" }}>◆</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Mathsy Meet Real Screenshot / Video Slot */}
            <MathsyMeetMediaSlot />

            {/* Stack badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {mathsy.flagshipModule.stack.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.75rem",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "var(--surface)",
                    color: "var(--muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link
              href="/work/mathsy"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "8px",
                background: "var(--accent)",
                color: "#0e0d0b",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Read Full Mathsy Case Study →
            </Link>

            <a
              href="https://mathsy.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "12px 20px",
                borderRadius: "8px",
                background: "transparent",
                color: "var(--text)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              Visit Live Site (mathsy.in) ↗
            </a>
          </div>

          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.8rem",
              color: "var(--muted)",
            }}
          >
            Production Deployment · React 18 · Supabase · KaTeX
          </span>
        </div>
      </div>
    </section>
  );
}
