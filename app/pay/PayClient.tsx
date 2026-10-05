"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE, getConsultUrl } from "@/content/site";
import { trackEvent } from "@/lib/tracking";
import PolicyModal from "@/components/legal/PolicyModal";

export default function PayClient() {
  const [hasConsented, setHasConsented] = useState(false);
  const [activeModal, setActiveModal] = useState<"none" | "terms" | "refund">("none");

  useEffect(() => {
    trackEvent("begin_checkout", "pay_quote_page", {
      item_name: "Custom Quote Payment",
    });
  }, []);

  function handleConsentChange(checked: boolean) {
    setHasConsented(checked);
    if (checked) {
      try {
        sessionStorage.setItem(
          "techiitfly_terms_consent",
          JSON.stringify({
            termsVersion: SITE.termsVersion,
            acceptedAt: new Date().toISOString(),
            page: "/pay",
          })
        );
      } catch {
        // Safe fallback
      }

      trackEvent("terms_accepted", "pay_quote_page", {
        terms_version: SITE.termsVersion,
      });
    }
  }

  const payQuoteUrl = SITE.payments.payQuoteUrl;
  const whatsappUrl = `https://wa.me/${SITE.phoneRaw.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hi techiitfly, I have received my quote and would like to pay my project advance."
  )}`;

  return (
    <div
      style={{
        maxWidth: "860px",
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
      <div style={{ marginBottom: "36px" }}>
        <span className="section-label">CUSTOM QUOTE PAYMENT</span>
        <h1
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(2.3rem, 4.5vw, 3.4rem)",
            fontWeight: 400,
            color: "var(--text)",
            marginTop: "8px",
            marginBottom: "12px",
            lineHeight: 1.15,
          }}
        >
          Pay your quote
        </h1>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "1.05rem",
            color: "var(--muted)",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          Use this page after you&apos;ve received a written quote from us. Enter the amount and your quote reference on
          the next screen.
        </p>
      </div>

      {/* KEY TERMS SUMMARY box */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          padding: "24px 28px",
          marginBottom: "28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
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
            Key Terms Summary
          </span>
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.72rem",
              color: "var(--muted)",
            }}
          >
            (Plain language)
          </span>
        </div>

        <ul
          style={{
            margin: "0 0 20px",
            paddingLeft: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.9rem",
            lineHeight: 1.55,
            color: "var(--text)",
          }}
        >
          <li>Delivery time is an estimate confirmed in your written quote.</li>
          <li>Includes two rounds of design changes unless specified in your written quote.</li>
          <li>
            Scope and final price are confirmed in writing before we start. If we can&apos;t agree the scope, your
            advance is refunded in full.
          </li>
        </ul>

        {/* Compact Refund Table */}
        <div
          style={{
            overflowX: "auto",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            background: "var(--surface-2)",
            marginBottom: "18px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "0.85rem",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                <th style={{ padding: "10px 14px", color: "var(--text)", fontWeight: 600 }}>When you cancel</th>
                <th style={{ padding: "10px 14px", color: "var(--text)", fontWeight: 600 }}>What happens to your advance</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px 14px", color: "var(--text)" }}>Before kickoff</td>
                <td style={{ padding: "10px 14px", color: "var(--muted)" }}>Refunded minus ₹1,000</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px 14px", color: "var(--text)" }}>After kickoff, before design preview</td>
                <td style={{ padding: "10px 14px", color: "var(--muted)" }}>50% refunded</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 14px", color: "var(--text)" }}>After design preview</td>
                <td style={{ padding: "10px 14px", color: "#f87171" }}>Not refundable</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Links to open modal */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.85rem",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveModal("terms")}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--accent)",
              cursor: "pointer",
              padding: 0,
              textDecoration: "underline",
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
          >
            Read full Terms &amp; Conditions
          </button>
          <span style={{ color: "var(--border)" }}>·</span>
          <button
            type="button"
            onClick={() => setActiveModal("refund")}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--accent)",
              cursor: "pointer",
              padding: 0,
              textDecoration: "underline",
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
          >
            Refund &amp; Cancellation Policy
          </button>
        </div>
      </div>

      {/* CONSENT CHECKBOX */}
      <div
        style={{
          background: hasConsented ? "rgba(245, 158, 11, 0.08)" : "var(--surface)",
          border: hasConsented ? "1px solid var(--accent)" : "1px solid var(--border)",
          borderRadius: "12px",
          padding: "18px 22px",
          marginBottom: "28px",
          transition: "all 0.2s ease",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            cursor: "pointer",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.95rem",
            color: "var(--text)",
            lineHeight: 1.5,
          }}
        >
          <input
            type="checkbox"
            checked={hasConsented}
            onChange={(e) => handleConsentChange(e.target.checked)}
            style={{
              marginTop: "4px",
              width: "18px",
              height: "18px",
              accentColor: "var(--accent)",
              cursor: "pointer",
            }}
          />
          <span>
            I have read and agree to the{" "}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveModal("terms");
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--accent)",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
                fontFamily: "inherit",
                fontSize: "inherit",
              }}
            >
              Terms &amp; Conditions
            </button>{" "}
            and{" "}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveModal("refund");
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--accent)",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
                fontFamily: "inherit",
                fontSize: "inherit",
              }}
            >
              Refund &amp; Cancellation Policy
            </button>
            .
          </span>
        </label>
      </div>

      {/* PAY BUTTON OR WHATSAPP CTA */}
      <div
        style={{
          marginBottom: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          {payQuoteUrl && payQuoteUrl.trim() !== "" ? (
            hasConsented ? (
              <a
                href={payQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("consult_click", "pay_quote_link")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  background: "var(--accent)",
                  color: "#0e0d0b",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(245,158,11,0.25)",
                }}
              >
                <span>Continue to secure payment →</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                style={{
                  padding: "14px 28px",
                  borderRadius: "8px",
                  background: "var(--surface-2)",
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "not-allowed",
                  opacity: 0.6,
                }}
              >
                Agree to Terms to Continue
              </button>
            )
          ) : (
            // Fallback WhatsApp CTA when payQuoteUrl is empty
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", "pay_quote_wa")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "8px",
                background: "var(--accent)",
                color: "#0e0d0b",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(245,158,11,0.25)",
              }}
            >
              <span>Pay Quote via WhatsApp Link →</span>
            </a>
          )}

          {/* Consent confirmation label */}
          {hasConsented && (
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.78rem",
                color: "var(--muted)",
              }}
            >
              ✓ You accepted Terms version {SITE.termsVersion}
            </span>
          )}
        </div>

        {(!payQuoteUrl || payQuoteUrl.trim() === "") && (
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.82rem",
              color: "var(--muted)",
              margin: 0,
            }}
          >
            Direct Razorpay payment page link will be provided in your quote email or WhatsApp chat.
          </p>
        )}
      </div>

      {/* Talk first / Consultation */}
      <div
        style={{
          padding: "20px 24px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          marginBottom: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.92rem", color: "var(--text)" }}>
          Prefer to talk first?
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href={getConsultUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("consult_click", "pay_quote_consult")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--surface-2)",
              color: "var(--text)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Book a free 15-min consultation
          </a>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", "pay_quote_wa_talk")}
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            Chat on WhatsApp ↗
          </a>
        </div>
      </div>

      {/* Trust line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontFamily: "var(--font-geist-sans)",
          fontSize: "0.82rem",
          color: "var(--muted)",
        }}
      >
        <span style={{ color: "var(--accent)", fontSize: "1rem" }}>🔒</span>
        <span>Payments are processed securely by Razorpay. We never see your card, UPI or bank details.</span>
      </div>

      {/* Policy Modals */}
      <PolicyModal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal("none")}
        title="Terms & Conditions"
        fullPageHref="/terms"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p>
            <strong>Version {SITE.termsVersion}</strong> · Last updated 5 October 2026.
          </p>
          <p>Key terms for written quotes and custom projects:</p>
          <ul>
            <li>
              <strong>Scope &amp; Price:</strong> Governed by your written quote. If we cannot agree on scope, your
              advance is refunded in full.
            </li>
            <li>
              <strong>Payment:</strong> 50% advance to start, 50% on delivery before launch or handover.
            </li>
            <li>
              <strong>Cancellation:</strong> Refunded minus ₹1,000 before kickoff; 50% refunded before design preview;
              advance not refundable after preview is shared.
            </li>
          </ul>
          <p>Click &quot;Open full page ↗&quot; to review the complete Terms.</p>
        </div>
      </PolicyModal>

      <PolicyModal
        isOpen={activeModal === "refund"}
        onClose={() => setActiveModal("none")}
        title="Refund & Cancellation Policy"
        fullPageHref="/refund-policy"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p>
            <strong>Section 9: Cancellation and Refunds</strong>
          </p>
          <div
            style={{
              overflowX: "auto",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              background: "var(--surface-2)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                  <th style={{ padding: "10px 14px", fontWeight: 600 }}>When you cancel</th>
                  <th style={{ padding: "10px 14px", fontWeight: 600 }}>What happens to your advance</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 14px" }}>Before the Kickoff Date</td>
                  <td style={{ padding: "10px 14px" }}>Refunded, minus ₹1,000 booking and planning fee</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 14px" }}>After Kickoff, before design preview</td>
                  <td style={{ padding: "10px 14px" }}>50% of the advance refunded</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 14px" }}>After design preview is shared</td>
                  <td style={{ padding: "10px 14px", color: "#f87171" }}>Advance not refundable</td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 14px" }}>After Launch or handover</td>
                  <td style={{ padding: "10px 14px" }}>No refund; the balance is due</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Refund Processing:</strong> Refunds are made to the original payment method within 14 working days.
          </p>
        </div>
      </PolicyModal>
    </div>
  );
}
