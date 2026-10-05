"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SITE } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const amountStr = searchParams.get("amount");
  const amount = amountStr ? parseFloat(amountStr) : undefined;
  const paymentId = searchParams.get("razorpay_payment_id") || searchParams.get("payment_id");

  useEffect(() => {
    trackEvent("purchase", "payment_success_page", {
      value: amount || 0,
      currency: "INR",
      transaction_id: paymentId || `TXN_${Date.now()}`,
      item_name: "Website Booking Advance",
    });
  }, [amount, paymentId]);

  const whatsappMessage = "Hi techiitfly, I've paid the booking advance. Sending my content now.";
  const whatsappUrl = `https://wa.me/${SITE.phoneRaw.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "60px 24px 100px",
      }}
    >
      {/* Success Badge */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.35)",
            color: "#10b981",
            fontSize: "2rem",
            marginBottom: "20px",
          }}
        >
          ✓
        </div>

        <span className="section-label" style={{ color: "#10b981" }}>
          BOOKING CONFIRMED
        </span>
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
          Payment received. Your slot is booked.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "1.05rem",
            color: "var(--muted)",
            maxWidth: "540px",
            margin: "0 auto",
          }}
        >
          Thank you for trusting techiitfly. We have received your advance payment and your project is scheduled for
          kickoff.
        </p>
      </div>

      {/* What happens next box */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "36px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--text)",
            margin: "0 0 24px",
          }}
        >
          What happens next:
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Step 1 */}
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "var(--accent)",
                flexShrink: 0,
              }}
            >
              1
            </span>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  margin: "0 0 4px",
                }}
              >
                We&apos;ll confirm your kickoff date on WhatsApp within 1 working day.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                Our lead engineer will connect with you directly to confirm the scope details and answer any questions.
              </p>
            </div>
          </div>

          {/* Step 2 (Checklist) */}
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "var(--accent)",
                flexShrink: 0,
              }}
            >
              2
            </span>
            <div style={{ width: "100%" }}>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  margin: "0 0 8px",
                }}
              >
                Send us your content:
              </p>

              <div
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--accent)" }}>☐</span>
                  <span style={{ color: "var(--text)" }}>Text &amp; headings for each page</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--accent)" }}>☐</span>
                  <span style={{ color: "var(--text)" }}>High-resolution photos &amp; product imagery</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--accent)" }}>☐</span>
                  <span style={{ color: "var(--text)" }}>Logo files (PNG, SVG, or high-res vector)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--accent)" }}>☐</span>
                  <span style={{ color: "var(--text)" }}>Domain login or DNS access to publish live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "var(--accent)",
                flexShrink: 0,
              }}
            >
              3
            </span>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  margin: "0 0 4px",
                }}
              >
                Your 7 days start once we&apos;ve received everything.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                Once all items above are in hand, the delivery clock begins. We build fast, share regular staging
                previews, and launch guaranteed on time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "36px",
        }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", "success_send_content")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 28px",
            borderRadius: "8px",
            background: "var(--accent)",
            color: "#0e0d0b",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.95rem",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(245, 158, 11, 0.25)",
          }}
        >
          <span>Send content on WhatsApp →</span>
        </a>

        <a
          href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(
            "Project Content Submission — Booking Advance Paid"
          )}`}
          onClick={() => trackEvent("email_click", "success_email_content")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 28px",
            borderRadius: "8px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.95rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <span>Email us</span>
        </a>
      </div>

      {/* Return home */}
      <div style={{ textAlign: "center" }}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.82rem",
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          ← Return to techiitfly Home
        </Link>
      </div>
    </div>
  );
}
