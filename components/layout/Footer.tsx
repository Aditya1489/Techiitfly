"use client";

import Link from "next/link";
import { SITE, getConsultUrl } from "@/content/site";
import { trackEvent } from "@/lib/tracking";
import { STARTER_PRICE_FORMATTED } from "@/content/pricing";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "60px 24px 36px",
      }}
    >
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "40px",
          alignItems: "start",
        }}
      >
        {/* Brand & Tagline */}
        <div style={{ maxWidth: "320px" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            {/* techiitfly logo icon */}
            <svg width="26" height="26" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs>
                <linearGradient id="ftr-box" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#1D4ED8" />
                  <stop offset="1" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <rect width="150" height="150" rx="40" fill="url(#ftr-box)" />
              <g transform="translate(16,24) scale(0.78)">
                <path d="M20,140 C44,140 70,128 92,106 C86,132 60,148 20,140 Z" fill="#fff" opacity="0.55" />
                <path d="M18,118 C46,116 84,100 118,64 C110,98 78,126 18,118 Z" fill="#fff" opacity="0.78" />
                <path d="M18,96 C50,92 100,70 142,18 C132,64 90,104 18,96 Z" fill="#fff" />
                <circle cx="148" cy="12" r="10" fill="#fff" opacity="0.6" />
                <circle cx="148" cy="12" r="6" fill="#fff" />
              </g>
            </svg>
            <span
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "var(--text)",
                letterSpacing: "-0.03em",
              }}
            >
              techiit<span style={{ color: "var(--accent)" }}>fly</span>
            </span>
          </Link>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.88rem",
              lineHeight: 1.5,
              color: "var(--muted)",
              marginTop: "12px",
            }}
          >
            Websites that bring you customers. Delivered in 7 days.
          </p>
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.75rem",
              color: "var(--muted)",
              marginTop: "10px",
            }}
          >
            Fixed prices from {STARTER_PRICE_FORMATTED} · Pune, India
          </p>
        </div>

        {/* Services Column (Services links first) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "var(--accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Services
          </span>
          <a
            href="/#services"
            style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", color: "var(--text)", textDecoration: "none" }}
          >
            Website Packages
          </a>
          <a
            href="/#work"
            style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", color: "var(--muted)", textDecoration: "none" }}
          >
            Selected Work
          </a>
          <Link
            href="/pricing"
            style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", color: "var(--muted)", textDecoration: "none" }}
          >
            Pricing &amp; Add-ons
          </Link>
          <a
            href={getConsultUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("consult_click", "footer")}
            style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", color: "var(--muted)", textDecoration: "none" }}
          >
            Free 15-min Consultation
          </a>
          <a
            href="/#contact"
            style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", color: "var(--muted)", textDecoration: "none" }}
          >
            Contact &amp; Quotes
          </a>
        </div>

        {/* Products Column (Separate small Products column) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "var(--accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Products
          </span>
          <Link
            href="/mathsy-meet"
            style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", color: "var(--text)", textDecoration: "none" }}
          >
            Mathsy Meet
          </Link>
          <Link
            href="/mathsy-for-institutes"
            style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", color: "var(--text)", textDecoration: "none" }}
          >
            Mathsy for Institutes
          </Link>
          <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.78rem", color: "var(--muted)", marginTop: "4px" }}>
            Software we build and run ourselves.
          </span>
        </div>

        {/* Contact Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "var(--accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Connect
          </span>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", "footer")}
            style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", color: "var(--accent)", textDecoration: "none" }}
          >
            WhatsApp ({SITE.phone}) ↗
          </a>
          <a
            href={`tel:${SITE.phoneRaw}`}
            onClick={() => trackEvent("call_click", "footer")}
            style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", color: "var(--muted)", textDecoration: "none" }}
          >
            Call: {SITE.phone}
          </a>
          {SITE.contactEmail && (
            <a
              href={`mailto:${SITE.contactEmail}`}
              onClick={() => trackEvent("email_click", "footer")}
              style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", color: "var(--muted)", textDecoration: "none" }}
            >
              {SITE.contactEmail}
            </a>
          )}
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.74rem", color: "var(--muted)", marginTop: "4px" }}>
            ● Mon–Sat, 10am–8pm IST
          </span>
        </div>
      </div>

      {/* Copyright & Legal */}
      <div
        style={{
          maxWidth: "1140px",
          margin: "40px auto 0",
          paddingTop: "24px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.75rem",
          color: "var(--muted)",
        }}
      >
        <span>© 2026 techiitfly · Pune, India</span>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <Link
            href="/terms"
            style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.15s" }}
          >
            Terms &amp; Conditions
          </Link>
          <span>·</span>
          <Link
            href="/privacy"
            style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.15s" }}
          >
            Privacy Policy
          </Link>
          <span>·</span>
          <Link
            href="/refund-policy"
            style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.15s" }}
          >
            Refund &amp; Cancellation Policy
          </Link>
          <span>·</span>
          <Link
            href="/delivery-policy"
            style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.15s" }}
          >
            Service Delivery Policy
          </Link>
          <span>·</span>
          <Link
            href="/contact"
            style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.15s" }}
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
