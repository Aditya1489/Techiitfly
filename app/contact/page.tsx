import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import { SITE, getConsultUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us | techiitfly",
  description:
    "Get in touch with techiitfly. Fixed-price website and mobile app development in Pune, India. Phone, WhatsApp, and email support.",
  openGraph: {
    title: "Contact Us | techiitfly",
    description:
      "Reach techiitfly for new website projects, consultation calls, or secure quote payments.",
    url: `${SITE.siteUrl}/contact`,
  },
};

export default function StandaloneContactPage() {
  const addressText = SITE.registeredAddress && SITE.registeredAddress.trim()
    ? `${SITE.registeredAddress.trim()}, Pune, Maharashtra, India`
    : "Pune, Maharashtra, India";

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", paddingTop: "80px", background: "var(--bg)" }}>
        {/* Contact Info Overview Banner */}
        <section
          style={{
            padding: "50px 24px 30px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
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
              ← Back to Home
            </Link>
          </div>

          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 40px" }}>
            <span className="section-label">GET IN TOUCH</span>
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
              Let&apos;s build something great.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.05rem",
                color: "var(--muted)",
                lineHeight: 1.55,
              }}
            >
              Have a question, need a custom estimate, or want to discuss a new project? Reach out directly or book a
              15-minute consultation.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "36px",
            }}
          >
            {/* Phone & WhatsApp */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "24px",
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
                Phone &amp; WhatsApp
              </span>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  margin: "8px 0 4px",
                }}
              >
                {SITE.phone}
              </p>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.85rem", color: "var(--muted)", margin: "0 0 14px" }}>
                {SITE.replyHours}
              </p>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  textDecoration: "none",
                }}
              >
                Chat on WhatsApp ↗
              </a>
            </div>

            {/* Email */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "24px",
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
                Direct Email
              </span>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  margin: "8px 0 4px",
                }}
              >
                {SITE.contactEmail}
              </p>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.85rem", color: "var(--muted)", margin: "0 0 14px" }}>
                For detailed scopes, RFPs, and formal inquiries.
              </p>
              <a
                href={`mailto:${SITE.contactEmail}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  textDecoration: "none",
                }}
              >
                Send an Email ↗
              </a>
            </div>

            {/* Location & Office */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "24px",
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
                Location &amp; Entity
              </span>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  margin: "8px 0 4px",
                }}
              >
                {SITE.name}
              </p>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.85rem", color: "var(--muted)", margin: "0 0 14px" }}>
                {addressText}
              </p>
              <a
                href={getConsultUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  textDecoration: "none",
                }}
              >
                Book 15-min Call ↗
              </a>
            </div>
          </div>

          {/* Already have a quote banner */}
          <div
            style={{
              background: "var(--surface-2)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              borderRadius: "14px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "30px",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                Already have a written quote?
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  margin: "4px 0 0",
                }}
              >
                Pay your custom advance securely with Razorpay to lock your kickoff date.
              </p>
            </div>
            <Link
              href="/pay"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 20px",
                borderRadius: "8px",
                background: "var(--accent)",
                color: "#0e0d0b",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.88rem",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Pay securely →
            </Link>
          </div>
        </section>

        {/* Embedded Contact Form Component */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
