import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/content/site";
import { getLegalText } from "@/content/legal";

export const metadata: Metadata = {
  title: "Service Delivery Policy",
  description:
    "Plain-language Service Delivery Policy for techiitfly. We provide digital website and app services with fixed-timeline delivery.",
  openGraph: {
    title: "Service Delivery Policy | techiitfly",
    description:
      "Digital delivery timelines, kickoff requirements, and handover processes for techiitfly projects.",
    url: `${SITE.siteUrl}/delivery-policy`,
  },
};

export default function DeliveryPolicyPage() {
  const { lastUpdated, deliveryPolicy } = getLegalText();

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "90px",
          paddingBottom: "80px",
          background: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
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

          <span className="section-label">FULFILLMENT &amp; TIMELINES</span>
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
              fontWeight: 400,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "12px",
              lineHeight: 1.15,
            }}
          >
            Service Delivery Policy
          </h1>

          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.82rem",
              color: "var(--muted)",
              marginBottom: "28px",
            }}
          >
            Last updated: {lastUpdated} · Extracted from Sections 4 &amp; 5 of our{" "}
            <Link href="/terms" style={{ color: "var(--accent)", textDecoration: "underline" }}>
              Terms &amp; Conditions
            </Link>
          </p>

          {/* Digital Services Clarification Box */}
          <div
            style={{
              background: "var(--surface-2)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              borderRadius: "12px",
              padding: "20px 24px",
              marginBottom: "36px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text)",
                margin: "0 0 8px",
              }}
            >
              Digital Services Only — No Physical Shipping
            </h3>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.92rem",
                lineHeight: 1.6,
                color: "var(--muted)",
                margin: 0,
              }}
            >
              techiitfly provides digital software design, website development, and cloud deployment services. We do
              not manufacture, sell, or ship physical goods. Delivery is completed digitally either by launching the
              project directly on your verified domain name, deploying to your cloud host, or handing over source code
              and digital credentials.
            </p>
          </div>

          {/* Policy Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            {deliveryPolicy.sections.map((sec) => (
              <div
                key={sec.id}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "24px 28px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "1.6rem",
                    fontWeight: 400,
                    color: "var(--text)",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.95rem",
                      color: "var(--accent)",
                      fontWeight: 600,
                    }}
                  >
                    {sec.number}.
                  </span>
                  {sec.title}
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.92rem",
                    lineHeight: 1.65,
                    color: "var(--text)",
                  }}
                >
                  {sec.paragraphs.map((p, idx) => (
                    <p key={idx} style={{ margin: 0 }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Inquiries */}
          <div
            style={{
              marginTop: "40px",
              paddingTop: "24px",
              borderTop: "1px solid var(--border)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.92rem",
              color: "var(--muted)",
            }}
          >
            Have questions about a project timeline or delivery handover? Contact us at{" "}
            <a href={`mailto:${SITE.contactEmail}`} style={{ color: "var(--accent)", textDecoration: "underline" }}>
              {SITE.contactEmail}
            </a>{" "}
            or message our team on WhatsApp at{" "}
            <a href={`tel:${SITE.phoneRaw}`} style={{ color: "var(--text)", textDecoration: "underline" }}>
              {SITE.phone}
            </a>
            .
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
