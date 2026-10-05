"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE, getConsultUrl } from "@/content/site";
import { getWebPackageById, getWebPlans } from "@/content/pricing";
import { trackEvent } from "@/lib/tracking";
import PolicyModal from "@/components/legal/PolicyModal";
import RazorpayButtonLoader from "@/components/checkout/RazorpayButtonLoader";

interface CheckoutClientProps {
  packageSlug: "starter" | "business" | "premium";
}

export default function CheckoutClient({ packageSlug }: CheckoutClientProps) {
  const plan = getWebPackageById(packageSlug) || getWebPlans()[0];
  const paymentConfig =
    packageSlug === "starter"
      ? SITE.payments.starter
      : packageSlug === "business"
      ? SITE.payments.business
      : SITE.payments.premium;

  const [hasConsented, setHasConsented] = useState(false);
  const [activeModal, setActiveModal] = useState<"none" | "terms" | "refund">("none");

  // Fire begin_checkout once on mount
  useEffect(() => {
    trackEvent("begin_checkout", `checkout_${packageSlug}`, {
      value: plan.advance,
      currency: "INR",
      item_name: `Website – ${plan.name}`,
    });
  }, [packageSlug, plan.advance, plan.name]);

  function handleConsentChange(checked: boolean) {
    setHasConsented(checked);
    if (checked) {
      try {
        sessionStorage.setItem(
          "techiitfly_terms_consent",
          JSON.stringify({
            termsVersion: SITE.termsVersion,
            acceptedAt: new Date().toISOString(),
            page: `/checkout/${packageSlug}`,
          })
        );
      } catch {
        // Safe fallback
      }

      trackEvent("terms_accepted", `checkout_${packageSlug}`, {
        terms_version: SITE.termsVersion,
      });
    }
  }

  const advanceFormatted = plan.advanceFormatted;
  const whatsappUrl = `https://wa.me/${SITE.phoneRaw.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hi techiitfly, I'd like to book the ${plan.name} package and pay the advance of ${advanceFormatted}.`
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
          href="/pricing"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.82rem",
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          ← Back to Packages &amp; Pricing
        </Link>
      </div>

      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <span className="section-label">BOOKING &amp; CHECKOUT</span>
        <h1
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(2.3rem, 4.5vw, 3.4rem)",
            fontWeight: 400,
            color: "var(--text)",
            marginTop: "8px",
            marginBottom: "8px",
            lineHeight: 1.15,
          }}
        >
          Book Your {plan.name} Website
        </h1>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "1rem",
            color: "var(--muted)",
            margin: 0,
          }}
        >
          Lock in your kickoff slot with a fixed advance payment. Scope confirmed in writing before kickoff.
        </p>
      </div>

      {/* a) Package details & included features */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          padding: "24px 28px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--text)",
                margin: "0 0 4px",
              }}
            >
              {plan.name} Package
            </h2>
            <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
              {plan.for}
            </p>
          </div>
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.82rem",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              color: "var(--accent)",
              padding: "4px 10px",
              borderRadius: "999px",
            }}
          >
            {plan.timeline}
          </span>
        </div>

        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Included in this package:
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "10px",
            }}
          >
            {plan.features.map((f, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  color: f.included ? "var(--text)" : "var(--muted)",
                }}
              >
                <span style={{ color: f.included ? "var(--accent)" : "var(--muted)" }}>
                  {f.included ? "✓" : "–"}
                </span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* b) Price box */}
      <div
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          padding: "24px 28px",
          marginBottom: "28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
          <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.95rem", color: "var(--muted)" }}>
            Booking advance:
          </span>
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            {advanceFormatted}
          </span>
          {SITE.gstApplicable && (
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85rem", color: "var(--muted)" }}>
              + 18% GST
            </span>
          )}
        </div>
        <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.9rem", color: "var(--text)", margin: "4px 0" }}>
          Remaining 50% due on delivery, before launch.
        </p>
        <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.85rem", color: "var(--muted)", margin: "4px 0 0" }}>
          The advance is adjusted against your final invoice.
        </p>
      </div>

      {/* c) KEY TERMS SUMMARY box */}
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
          {packageSlug === "starter" ? (
            <li>The 7 days start when we receive your text, photos, logo and domain access.</li>
          ) : (
            <li>Delivery time is an estimate confirmed in your written quote.</li>
          )}
          <li>
            {packageSlug === "starter"
              ? "Includes one round of design changes."
              : "Includes two rounds of design changes."}
          </li>
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

      {/* d) CONSENT CHECKBOX */}
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

      {/* e) PAY BUTTON OR WHATSAPP OPTION */}
      <div
        style={{
          marginBottom: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          {paymentConfig.razorpayButtonId && paymentConfig.razorpayButtonId.trim() !== "" ? (
            hasConsented ? (
              <RazorpayButtonLoader buttonId={paymentConfig.razorpayButtonId} />
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
                Agree to Terms to Pay Advance
              </button>
            )
          ) : (
            // Fallback WhatsApp CTA when button ID is empty
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", `checkout_wa_${packageSlug}`)}
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
              <span>Book &amp; Pay Advance via WhatsApp ({advanceFormatted}) →</span>
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

        {(!paymentConfig.razorpayButtonId || paymentConfig.razorpayButtonId.trim() === "") && (
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.82rem",
              color: "var(--muted)",
              margin: 0,
            }}
          >
            Direct card/UPI checkout button is being activated. Message us on WhatsApp to receive a verified instant
            payment link and lock your slot.
          </p>
        )}
      </div>

      {/* f) Talk first / Consultation */}
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
            onClick={() => trackEvent("consult_click", `checkout_${packageSlug}`)}
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
            onClick={() => trackEvent("whatsapp_click", `checkout_${packageSlug}`)}
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

      {/* g) Trust line */}
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
          <p>
            By booking a project slot or paying an advance, you agree to these Terms. Key terms are summarized below:
          </p>
          <ul>
            <li>
              <strong>Scope &amp; Price:</strong> Agreed in writing before work begins. The advance is adjusted against
              your final invoice. If scope cannot be agreed, the advance is refunded in full.
            </li>
            <li>
              <strong>Kickoff Date:</strong> 7-day guarantee starts on the Kickoff Date when content, access, and advance
              are received.
            </li>
            <li>
              <strong>Payment:</strong> 50% advance to book, 50% on delivery before launch.
            </li>
            <li>
              <strong>Cancellation:</strong> Refunded minus ₹1,000 before kickoff; 50% refunded before design preview;
              non-refundable after design preview.
            </li>
          </ul>
          <p>Click &quot;Open full page ↗&quot; to review the complete 19-section legal text.</p>
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
