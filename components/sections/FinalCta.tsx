"use client";

import Link from "next/link";
import { SITE, getConsultUrl } from "@/content/site";
import { getWhatsAppHref, trackEvent } from "@/lib/tracking";

export default function FinalCta() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        background: "var(--surface)",
        padding: "88px 24px 72px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
        <span className="section-label">GET STARTED</span>

        <h2
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "var(--text)",
            marginTop: "10px",
            marginBottom: "16px",
          }}
        >
          Tell us what you need. Get a fixed price today.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "1.08rem",
            lineHeight: 1.6,
            color: "var(--muted)",
            maxWidth: "600px",
            margin: "0 auto 36px",
          }}
        >
          Fast, mobile-friendly websites with guaranteed delivery. No sales pressure — just honest advice and a fixed quote in 24 hours.
        </p>

        {/* 3 Buttons: Book a free call · WhatsApp · Email */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "18px",
          }}
        >
          {/* 1. Book a free call */}
          <a
            href={getConsultUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("consult_click", "final_cta")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "8px",
              background: "var(--accent)",
              color: "var(--primary-btn-text)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1rem",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(245,158,11,0.25)",
              transition: "transform 0.15s ease",
            }}
          >
            <span>Book a free call</span>
            <span>↗</span>
          </a>

          {/* 2. WhatsApp */}
          <a
            href={getWhatsAppHref("Hi techiitfly, I'd like to discuss a website project.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", "final_cta")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 24px",
              borderRadius: "8px",
              background: "transparent",
              color: "var(--text)",
              border: "1.5px solid var(--border)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.98rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "border-color 0.15s ease",
            }}
          >
            <span>WhatsApp</span>
            <span>↗</span>
          </a>

          {/* 3. Email */}
          <a
            href={`mailto:${SITE.contactEmail}?subject=Website%20Project%20Enquiry`}
            onClick={() => trackEvent("email_click", "final_cta")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 24px",
              borderRadius: "8px",
              background: "transparent",
              color: "var(--text)",
              border: "1.5px solid var(--border)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.98rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "border-color 0.15s ease",
            }}
          >
            <span>Email</span>
            <span>✉</span>
          </a>
        </div>

        {/* Desktop helper: under WhatsApp button, show phone and email */}
        <div
          className="desktop-only"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.8rem",
            color: "var(--muted)",
            marginBottom: "36px",
          }}
        >
          Direct phone:{" "}
          <a href={`tel:${SITE.phoneRaw}`} style={{ color: "var(--text)", textDecoration: "underline" }}>
            {SITE.phone}
          </a>
          {" · "}
          <a href={`mailto:${SITE.contactEmail}`} style={{ color: "var(--text)", textDecoration: "underline" }}>
            {SITE.contactEmail}
          </a>
        </div>

        {/* Line under: "Also from techiitfly: Mathsy Meet, an online classroom for maths tutors →" */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            display: "inline-block",
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.95rem",
              color: "var(--muted)",
              margin: 0,
            }}
          >
            Also from techiitfly:{" "}
            <Link
              href="/mathsy-meet"
              style={{
                color: "var(--accent)",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Mathsy Meet, an online classroom for maths tutors →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
