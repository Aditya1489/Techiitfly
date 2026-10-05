"use client";

import Link from "next/link";
import { SITE } from "@/content/site";
import { hasFounderBio } from "@/content/about";
import { trackEvent } from "@/lib/tracking";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <div>
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
                fontSize: "1.1rem",
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
              fontSize: "0.85rem",
              color: "var(--muted)",
              marginTop: "4px",
            }}
          >
            Websites &amp; learning platforms. Delivered in days, not months.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <a
            href="/#work"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.85rem",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            Work
          </a>
          <a
            href="/#products-overview"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.85rem",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            Products
          </a>
          <Link
            href="/pricing"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.85rem",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            Pricing
          </Link>
          {hasFounderBio && (
            <a
              href="/#about"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.85rem",
                color: "var(--muted)",
                textDecoration: "none",
              }}
            >
              About
            </a>
          )}
          <a
            href="/#contact"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.85rem",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            Contact
          </a>
          {SITE.contactEmail && (
            <a
              href={`mailto:${SITE.contactEmail}`}
              onClick={() => trackEvent("email_click", "footer")}
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.85rem",
                color: "var(--muted)",
                textDecoration: "none",
              }}
            >
              {SITE.contactEmail}
            </a>
          )}
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", "footer")}
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.85rem",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            WhatsApp ({SITE.phone}) ↗
          </a>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1140px",
          margin: "32px auto 0",
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link
            href="/privacy"
            style={{ color: "var(--muted)", textDecoration: "none" }}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
