"use client";

import { useState } from "react";
import Link from "next/link";
import { getLegalText } from "@/content/legal";

export default function TermsClient() {
  const { termsVersion, lastUpdated, intro, sections } = getLegalText();
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 24px 100px",
      }}
    >
      {/* Breadcrumb */}
      <div style={{ marginBottom: "24px" }}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.82rem",
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          ← Back to Overview
        </Link>
      </div>

      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <span className="section-label">LEGAL &amp; AGREEMENT</span>
        <h1
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 400,
            color: "var(--text)",
            marginTop: "8px",
            marginBottom: "12px",
            lineHeight: 1.15,
          }}
        >
          Terms &amp; Conditions
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.82rem",
            color: "var(--muted)",
            marginBottom: "20px",
          }}
        >
          <span>Version: {termsVersion}</span>
          <span>·</span>
          <span>Last updated: {lastUpdated}</span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "1.06rem",
            lineHeight: 1.6,
            color: "var(--text)",
            maxWidth: "760px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "20px 24px",
          }}
        >
          {intro}
        </p>
      </div>

      {/* Mobile Collapsible TOC */}
      <div
        className="mobile-toc"
        style={{
          display: "block",
          marginBottom: "36px",
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <button
          type="button"
          onClick={() => setMobileTocOpen(!mobileTocOpen)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "transparent",
            border: "none",
            color: "var(--text)",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <span>Table of Contents ({sections.length} sections)</span>
          <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
            {mobileTocOpen ? "▲ Hide" : "▼ Show"}
          </span>
        </button>

        {mobileTocOpen && (
          <div
            style={{
              marginTop: "16px",
              paddingTop: "14px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMobileTocOpen(false)}
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  textDecoration: "none",
                  padding: "4px 0",
                }}
              >
                {s.number}. {s.title}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Main Layout: Desktop Sidebar TOC + Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "48px",
        }}
      >
        <style>{`
          @media (min-width: 900px) {
            .mobile-toc { display: none !important; }
            .legal-layout {
              display: grid !important;
              gridTemplateColumns: 280px 1fr !important;
              gap: 56px !important;
              alignItems: start !important;
            }
          }
        `}</style>

        <div className="legal-layout">
          {/* Desktop Sticky Sidebar TOC */}
          <aside
            style={{
              position: "sticky",
              top: "100px",
              maxHeight: "calc(100vh - 120px)",
              overflowY: "auto",
              paddingRight: "16px",
              display: "none",
            }}
            className="desktop-toc"
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "14px",
              }}
            >
              Contents
            </span>
            <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.82rem",
                    color: "var(--muted)",
                    textDecoration: "none",
                    lineHeight: 1.4,
                    padding: "4px 8px",
                    borderRadius: "6px",
                    transition: "color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text)";
                    e.currentTarget.style.background = "var(--surface-2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--muted)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{ fontFamily: "var(--font-geist-mono)", marginRight: "6px", opacity: 0.7 }}>
                    {s.number}.
                  </span>
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Document Content */}
          <article style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                style={{
                  scrollMarginTop: "100px",
                  paddingBottom: "32px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "1.75rem",
                    fontWeight: 400,
                    color: "var(--text)",
                    marginBottom: "18px",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "1rem",
                      color: "var(--accent)",
                      fontWeight: 600,
                    }}
                  >
                    {s.number}.
                  </span>
                  {s.title}
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.95rem",
                    lineHeight: 1.65,
                    color: "var(--text)",
                  }}
                >
                  {s.paragraphs.map((p, idx) => {
                    if (s.id === "refunds" && p.startsWith("Table of Advance Refund Terms:")) {
                      return (
                        <div
                          key={idx}
                          style={{
                            margin: "12px 0",
                            overflowX: "auto",
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                            borderRadius: "10px",
                          }}
                        >
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                              textAlign: "left",
                              fontSize: "0.88rem",
                            }}
                          >
                            <thead>
                              <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
                                <th style={{ padding: "12px 16px", color: "var(--text)", fontWeight: 600 }}>
                                  When you cancel
                                </th>
                                <th style={{ padding: "12px 16px", color: "var(--text)", fontWeight: 600 }}>
                                  What happens to your advance
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                                <td style={{ padding: "12px 16px", color: "var(--text)" }}>Before the Kickoff Date</td>
                                <td style={{ padding: "12px 16px", color: "var(--muted)" }}>
                                  Refunded, minus ₹1,000 booking and planning fee
                                </td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                                <td style={{ padding: "12px 16px", color: "var(--text)" }}>
                                  After Kickoff, before the design preview
                                </td>
                                <td style={{ padding: "12px 16px", color: "var(--muted)" }}>50% of the advance refunded</td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                                <td style={{ padding: "12px 16px", color: "var(--text)" }}>After the design preview is shared</td>
                                <td style={{ padding: "12px 16px", color: "#f87171" }}>Advance not refundable</td>
                              </tr>
                              <tr>
                                <td style={{ padding: "12px 16px", color: "var(--text)" }}>After Launch or handover</td>
                                <td style={{ padding: "12px 16px", color: "var(--muted)" }}>No refund; the balance is due</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    if (s.id === "refunds" && p.startsWith("• ")) {
                      return null; // Handled cleanly in table above
                    }

                    return <p key={idx} style={{ margin: 0 }}>{p}</p>;
                  })}
                </div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}
