import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/content/site";
import { getLegalText } from "@/content/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Plain-language refund and cancellation policy for techiitfly project advances, milestone approvals, and payments.",
  openGraph: {
    title: "Refund & Cancellation Policy | techiitfly",
    description:
      "Details on how advance refunds and cancellations are handled before and after project kickoff at techiitfly.",
    url: `${SITE.siteUrl}/refund-policy`,
  },
};

export default function RefundPolicyPage() {
  const { lastUpdated, refundPolicy } = getLegalText();

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

          <span className="section-label">PAYMENT TRANSPARENCY</span>
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
            Refund &amp; Cancellation Policy
          </h1>

          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.82rem",
              color: "var(--muted)",
              marginBottom: "28px",
            }}
          >
            Last updated: {lastUpdated} · Extracted from Section 9 of our{" "}
            <Link href="/terms#refunds" style={{ color: "var(--accent)", textDecoration: "underline" }}>
              Terms &amp; Conditions
            </Link>
          </p>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "24px",
              marginBottom: "32px",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--text)",
            }}
          >
            <p style={{ margin: "0 0 16px" }}>
              We believe in total transparency. If we cannot agree on the scope of your project before work begins, your
              advance is refunded in full. If you need to cancel later, refunds are calculated based on the progress
              completed up to that point:
            </p>

            {/* Refund Table */}
            <div
              style={{
                overflowX: "auto",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                background: "var(--surface-2)",
                margin: "20px 0",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  fontSize: "0.9rem",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                    <th style={{ padding: "14px 18px", color: "var(--text)", fontWeight: 600 }}>
                      When you cancel
                    </th>
                    <th style={{ padding: "14px 18px", color: "var(--text)", fontWeight: 600 }}>
                      What happens to your advance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {refundPolicy.table.map((row, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: idx < refundPolicy.table.length - 1 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <td style={{ padding: "14px 18px", color: "var(--text)", fontWeight: 500 }}>
                        {row.when}
                      </td>
                      <td
                        style={{
                          padding: "14px 18px",
                          color: row.outcome.includes("not refundable") ? "#f87171" : "var(--muted)",
                        }}
                      >
                        {row.outcome}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "20px",
                fontSize: "0.92rem",
                color: "var(--text)",
              }}
            >
              {refundPolicy.notes.map((note, idx) => (
                <p key={idx} style={{ margin: 0 }}>
                  {note}
                </p>
              ))}
            </div>
          </div>

          {/* Refund Method & Timeline Note */}
          <div
            style={{
              background: "var(--surface-2)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              borderRadius: "12px",
              padding: "20px 24px",
              marginBottom: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Payment Method &amp; Processing Time
            </span>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--text)",
                margin: 0,
              }}
            >
              Refunds are made to the original payment method within 14 working days.
            </p>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.85rem",
                color: "var(--muted)",
                margin: 0,
              }}
            >
              Processed directly back through Razorpay to the card, UPI ID, or netbanking account used at checkout.
            </p>
          </div>

          {/* Contact Line */}
          <div
            style={{
              paddingTop: "24px",
              borderTop: "1px solid var(--border)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.92rem",
              color: "var(--muted)",
            }}
          >
            Questions about a refund? Contact us directly at{" "}
            <a href={`mailto:${SITE.contactEmail}`} style={{ color: "var(--accent)", textDecoration: "underline" }}>
              {SITE.contactEmail}
            </a>{" "}
            or call/WhatsApp{" "}
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
