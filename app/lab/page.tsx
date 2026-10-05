import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhiteboardCanvas from "@/components/lab/WhiteboardCanvas";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Live Lab — Mathsy Meet Virtual Classroom Tools",
  description:
    "Interactive testbed for custom geometry and math tools built for Mathsy Meet: compass, protractor, ruler, and set-square.",
};

export default function LabPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "60px", background: "var(--bg)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb */}
          <div style={{ marginBottom: "20px" }}>
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

          {/* Heading */}
          <div style={{ marginBottom: "28px" }}>
            <span className="section-label">INTERACTIVE PROOF // LIVE LAB</span>
            <h1
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginTop: "10px",
                marginBottom: "8px",
              }}
            >
              Mathsy Meet Interactive Whiteboard
            </h1>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.05rem",
                color: "var(--muted)",
                maxWidth: "720px",
                lineHeight: 1.55,
              }}
            >
              Full-featured interactive canvas demonstrating the custom geometric instrumentation built for the Mathsy Meet virtual classroom. Select a tool below to measure angles, draw calibrated circles, or plot right-angled triangles.
            </p>
          </div>

          {/* Whiteboard */}
          <WhiteboardCanvas />

          {/* Pedagogy note */}
          <div
            style={{
              marginTop: "32px",
              padding: "24px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h4 style={{ fontFamily: "var(--font-geist-sans)", color: "var(--text)", marginBottom: "4px" }}>
                Need custom interactive instrumentation for your platform?
              </h4>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.9rem", color: "var(--muted)" }}>
                We engineer subject-specific educational tools tailored to your pedagogy, with zero recurring per-user SaaS license fees.
              </p>
            </div>
            <Link
              href="/#contact"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.88rem",
                fontWeight: 500,
                padding: "10px 18px",
                borderRadius: "6px",
                background: "var(--accent)",
                color: "#0e0d0b",
                textDecoration: "none",
              }}
            >
              Discuss your project →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
