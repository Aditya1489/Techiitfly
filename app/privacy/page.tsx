import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/content/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Plain-language privacy policy for techiitfly. Details on contact methods, analytics, cookies, and data protection.",
  openGraph: {
    title: "Privacy Policy | techiitfly",
    description: "Plain-language privacy policy for techiitfly. No sale of personal data.",
    url: `${SITE.siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
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

          <span className="section-label">TRANSPARENCY & DATA PROTECTION</span>
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 400,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "16px",
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.85rem",
              color: "var(--muted)",
              marginBottom: "40px",
            }}
          >
            Last updated: October 2026 · Plain language commitment
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "36px",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--text)",
            }}
          >
            <section
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "28px 28px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "12px",
                }}
              >
                1. Who We Are
              </h2>
              <p style={{ margin: 0, color: "var(--muted)" }}>
                techiitfly is an independent web engineering studio based in Pune, Maharashtra, India.
                We design and engineer high-performance websites and digital learning platforms. You can
                reach us at{" "}
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  style={{ color: "var(--accent)", textDecoration: "underline" }}
                >
                  {SITE.contactEmail}
                </a>{" "}
                or via phone/WhatsApp at{" "}
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  style={{ color: "var(--accent)", textDecoration: "underline" }}
                >
                  {SITE.phone}
                </a>
                .
              </p>
            </section>

            <section
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "28px 28px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "12px",
                }}
              >
                2. How We Receive Contact &amp; What We Collect
              </h2>
              <p style={{ color: "var(--muted)", marginBottom: "14px" }}>
                We operate a static website with no user accounts, database logins, or automated data harvesting. We only receive personal information that you intentionally share with us through:
              </p>
              <ul style={{ color: "var(--muted)", paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>
                  <strong style={{ color: "var(--text)" }}>WhatsApp:</strong> When you initiate a message with our business number, we receive your phone number and chat messages.
                </li>
                <li>
                  <strong style={{ color: "var(--text)" }}>Phone calls:</strong> When you call our contact number, we receive caller ID information necessary to return your inquiry.
                </li>
                <li>
                  <strong style={{ color: "var(--text)" }}>Email &amp; Contact Forms:</strong> When you write to{" "}
                  <a href={`mailto:${SITE.contactEmail}`} style={{ color: "var(--accent)" }}>
                    {SITE.contactEmail}
                  </a>
                  , we collect your email address, name, and project specifications.
                </li>
              </ul>
            </section>

            <section
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "28px 28px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "12px",
                }}
              >
                3. Online Payments &amp; Razorpay Processing
              </h2>
              <p style={{ color: "var(--muted)", margin: "0 0 10px" }}>
                Payments are processed by Razorpay; we receive only payment confirmation details (name, email, phone,
                amount, transaction ID).
              </p>
              <p style={{ color: "var(--muted)", margin: 0 }}>
                All sensitive financial data (such as credit/debit card numbers, CVVs, UPI credentials, and bank passwords)
                are processed securely on Razorpay&apos;s PCI-DSS compliant infrastructure. techiitfly never has access
                to, nor stores, your payment credentials.
              </p>
            </section>

            <section
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "28px 28px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "12px",
                }}
              >
                4. Analytics &amp; Advertising Cookies
              </h2>
              <p style={{ color: "var(--muted)", marginBottom: "12px" }}>
                To understand how visitors interact with our website and measure the performance of our advertising campaigns, we may load analytics scripts from Google (Google Analytics 4, Google Ads) and Meta (Meta Pixel).
              </p>
              <p style={{ color: "var(--muted)", margin: 0 }}>
                These tools use browser cookies or anonymous device identifiers to measure metrics such as page visits, referral sources, and button clicks (such as tapping WhatsApp or the call button). They do not collect passwords or sensitive private content. You can disable cookies at any time via your browser settings.
              </p>
            </section>

            <section
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "28px 28px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "12px",
                }}
              >
                5. No Sale of Personal Data
              </h2>
              <p style={{ margin: 0, color: "var(--muted)" }}>
                We do not sell, rent, license, or trade your contact information, phone numbers, email addresses, or client project scopes to any third-party marketing companies, broker networks, or list aggregators. Ever.
              </p>
            </section>

            <section
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "28px 28px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "12px",
                }}
              >
                6. Data Requests &amp; Contact
              </h2>
              <p style={{ color: "var(--muted)", marginBottom: "14px" }}>
                You have the right to request access to the communication history we hold about you, request corrections, or request complete deletion of your contact records from our systems.
              </p>
              <p style={{ color: "var(--muted)", margin: 0 }}>
                For all privacy inquiries and data requests, please write to:
                <br />
                <strong style={{ color: "var(--text)" }}>Email: </strong>
                <a
                  href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Data Privacy Request")}`}
                  style={{ color: "var(--accent)", textDecoration: "underline" }}
                >
                  {SITE.contactEmail}
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
