"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy-load so it never affects home page LCP or initial bundle
const WhiteboardCanvas = dynamic(() => import("@/components/lab/WhiteboardCanvas"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "460px",
        background: "var(--surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-geist-sans)",
        fontSize: "0.95rem",
        color: "var(--muted)",
        textAlign: "center",
        padding: "20px",
      }}
    >
      The interactive tools need a desktop or tablet browser.
    </div>
  ),
});

export default function LiveLab() {
  return (
    <section
      id="lab"
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div>
            <span className="section-label">INTERACTIVE PROOF // LIVE LAB</span>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "var(--text)",
                marginTop: "10px",
                marginBottom: "8px",
              }}
            >
              Test the Mathsy Meet Geometric Tools
            </h2>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.98rem",
                color: "var(--muted)",
                maxWidth: "640px",
              }}
            >
              We engineered subject-specific math tools for tutors who couldn&apos;t teach geometry on standard video conferencing apps. Try the live canvas below.
            </p>
          </div>

          <Link
            href="/lab"
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.84rem",
              color: "var(--accent)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "6px",
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.3)",
            }}
          >
            Open fullscreen lab ↗
          </Link>
        </div>

        {/* Live Canvas */}
        <WhiteboardCanvas />
      </div>
    </section>
  );
}
