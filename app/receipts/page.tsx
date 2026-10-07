import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReceiptsClient from "@/components/receipts/ReceiptsClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Live Receipts — Automated Core Web Vitals & Audits",
  description:
    "Daily automated PageSpeed and Core Web Vitals audit receipts for live production platforms engineered by techiitfly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReceiptsPage() {
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
          <div style={{ marginBottom: "32px" }}>
            <span className="section-label">CONTINUOUS VERIFICATION // LIVE RECEIPTS</span>
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
              Automated Production Audits
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
              We don&apos;t just promise performance at handover — our automated GitHub Action queries Google&apos;s PageSpeed Insights API daily to audit our client deployments in the real world.
            </p>
          </div>

          {/* Receipts grid */}
          <ReceiptsClient />
        </div>
      </main>
      <Footer />
    </>
  );
}
