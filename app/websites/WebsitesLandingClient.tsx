"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE, getConsultUrl } from "@/content/site";
import { trackEvent, getWhatsAppHref } from "@/lib/tracking";
import Testimonials from "@/components/sections/Testimonials";
import { getWebPlans, PRICING_FAQS, STARTER_PRICE_FORMATTED } from "@/content/pricing";

// Minimal Logo
function MinimalLogo() {
  return (
    <Link
      href="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
      }}
    >
      <svg
        width={32}
        height={32}
        viewBox="0 0 150 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="techiitfly logo"
      >
        <defs>
          <linearGradient id="tf-min-box" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1D4ED8" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect width="150" height="150" rx="40" fill="url(#tf-min-box)" />
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
          fontSize: "1.2rem",
          fontWeight: 800,
          color: "var(--text)",
          letterSpacing: "-0.03em",
        }}
      >
        techiit<span style={{ color: "var(--accent)" }}>fly</span>
      </span>
    </Link>
  );
}

const PACKAGES = getWebPlans().map((p) => ({
  ...p,
  features: p.features.map((f) => f.text),
}));

const PROOF_CARDS = [
  {
    name: "Mathsy",
    category: "EdTech Platform",
    url: "https://www.mathsy.in",
    displayUrl: "mathsy.in",
    screenshot: "/screenshots/mathsy-desktop.webp",
    note: "4-portal learning platform with real-time proctored testing.",
  },
  {
    name: "YogaGarhi",
    category: "Retreat & Wellness",
    url: "https://www.yogagarhi.com",
    displayUrl: "yogagarhi.com",
    screenshot: "/screenshots/yogagarhi-desktop.webp",
    note: "Modern booking and retreat presentation site.",
  },
  {
    name: "Yogic Path",
    category: "Teacher Training Academy",
    url: "https://yogicpathytt.com",
    displayUrl: "yogicpathytt.com",
    screenshot: "/screenshots/yogicpath-desktop.webp",
    note: "Curriculum showcase and student lead generation portal.",
  },
];

const FAQS = PRICING_FAQS;

export default function WebsitesLandingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroWaUrl = getWhatsAppHref(
    "Hi techiitfly, I want to get a free quote for a website."
  );

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      {/* ── Minimal Header ─────────────────────────────────────────── */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MinimalLogo />
          <a
            href={heroWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", "websites_header")}
            style={{
              background: "var(--accent)",
              color: "var(--primary-btn-text)",
              padding: "10px 20px",
              borderRadius: "8px",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.88rem",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            WhatsApp us
          </a>
        </div>
      </header>

      {/* ── Section (a) Hero ───────────────────────────────────────── */}
      <section
        style={{
          padding: "70px 24px 60px",
          textAlign: "center",
          background: "radial-gradient(circle at 50% 20%, var(--accent-glow) 0%, transparent 65%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <span className="section-label">SPEED &amp; GUARANTEED DELIVERY</span>
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.6rem, 6vw, 4.4rem)",
              fontWeight: 400,
              lineHeight: 1.08,
              color: "var(--text)",
              marginTop: "12px",
              marginBottom: "18px",
              letterSpacing: "-0.02em",
            }}
          >
            Your website live in 7 days. Guaranteed.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(1.05rem, 2.5vw, 1.25rem)",
              color: "var(--muted)",
              lineHeight: 1.55,
              maxWidth: "640px",
              margin: "0 auto 32px",
            }}
          >
            Fixed prices from {STARTER_PRICE_FORMATTED}. Mobile-friendly, WhatsApp-ready, launched on your domain.
          </p>

          {/* Primary Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <a
              href={heroWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", "websites_hero")}
              style={{
                background: "var(--accent)",
                color: "var(--primary-btn-text)",
                padding: "16px 32px",
                borderRadius: "10px",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.05rem",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 0 24px rgba(245,158,11,0.25)",
              }}
            >
              <span>Get a free quote on WhatsApp</span>
              <span>→</span>
            </a>

            <a
              href={getConsultUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("consult_click", "websites_hero")}
              style={{
                background: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                padding: "16px 26px",
                borderRadius: "10px",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.02rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Book a free consultation</span>
              <span style={{ color: "var(--accent)" }}>↗</span>
            </a>
          </div>

          {/* Email CTA below buttons */}
          {SITE.contactEmail && (
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.9rem",
                color: "var(--muted)",
                margin: 0,
              }}
            >
              Prefer email?{" "}
              <a
                href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Website enquiry — techiitfly")}`}
                onClick={() => trackEvent("email_click", "websites_hero")}
                style={{
                  color: "var(--accent)",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                {SITE.contactEmail}
              </a>
            </p>
          )}
        </div>
      </section>

      {/* ── Section (b) Proof: 3 Live Project Cards ────────────────── */}
      <section
        style={{
          padding: "70px 24px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="section-label">REAL PRODUCTION PROOF</span>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginTop: "8px",
              }}
            >
              Live projects built and launched.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: "24px",
            }}
          >
            {PROOF_CARDS.map((p) => (
              <div
                key={p.name}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "200px", background: "var(--surface-2)" }}>
                  <Image
                    src={p.screenshot}
                    alt={`${p.name} live capture`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "#22c55e",
                      color: "#fff",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-geist-mono)",
                      padding: "3px 9px",
                      borderRadius: "999px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    ● LIVE
                  </span>
                </div>
                <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: "var(--text)",
                        margin: 0,
                      }}
                    >
                      {p.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.72rem",
                        color: "var(--muted)",
                      }}
                    >
                      {p.category}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.88rem",
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      marginBottom: "16px",
                      flex: 1,
                    }}
                  >
                    {p.note}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.82rem",
                      color: "var(--accent)",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    Visit {p.displayUrl} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section (c) Testimonials (hidden if empty) ─────────────── */}
      <Testimonials />

      {/* ── Section (d) Website packages ───────────────────────────── */}
      <section
        style={{
          padding: "70px 24px",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="section-label">CLEAR FIXED PRICING</span>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginTop: "8px",
              }}
            >
              Choose your website package.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.95rem",
                color: "var(--muted)",
                marginTop: "8px",
              }}
            >
              Transparent rates in INR. No hidden maintenance locks.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: "24px",
              alignItems: "stretch",
            }}
          >
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                style={{
                  position: "relative",
                  background: pkg.popular ? "var(--surface)" : "var(--surface-2)",
                  border: pkg.popular ? "2px solid var(--accent)" : "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px 26px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {pkg.popular && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-13px",
                      left: "24px",
                      background: "var(--accent)",
                      color: "var(--primary-btn-text)",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontFamily: "var(--font-geist-mono)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Most Popular
                  </span>
                )}

                <h3
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "4px",
                  }}
                >
                  {pkg.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    lineHeight: 1.5,
                    marginBottom: "16px",
                    minHeight: "40px",
                  }}
                >
                  {pkg.for}
                </p>

                <div
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "var(--text)",
                    lineHeight: 1.1,
                  }}
                >
                  {pkg.originalPrice ? (
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: "1.1rem",
                          color: "var(--muted)",
                          textDecoration: "line-through",
                        }}
                      >
                        {pkg.originalPrice}
                      </span>
                      <span style={{ color: "var(--accent)" }}>{pkg.price}</span>
                    </div>
                  ) : (
                    <>
                      <span
                        style={{
                          fontSize: "0.92rem",
                          fontWeight: 600,
                          color: "var(--muted)",
                          marginRight: "6px",
                        }}
                      >
                        Starting at
                      </span>
                      {pkg.price}
                    </>
                  )}
                  {pkg.launchOfferNotice && (
                    <div
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--accent)",
                        marginTop: "4px",
                      }}
                    >
                      {pkg.launchOfferNotice}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "var(--accent)",
                    marginTop: "6px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {pkg.timeline}
                </div>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "18px 0 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    flex: 1,
                  }}
                >
                  {pkg.features.map((feat) => (
                    <li
                      key={feat}
                      style={{
                        display: "flex",
                        gap: "10px",
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "0.88rem",
                        color: "var(--text)",
                      }}
                    >
                      <span style={{ color: "var(--accent)", fontWeight: 800 }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Link
                    href={`/checkout/${pkg.name.toLowerCase()}`}
                    onClick={() => trackEvent("begin_checkout", `websites_landing_${pkg.name.toLowerCase()}`)}
                    style={{
                      display: "block",
                      textAlign: "center",
                      fontFamily: "var(--font-geist-sans)",
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      textDecoration: "none",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      background: pkg.popular ? "var(--accent)" : "var(--surface)",
                      border: pkg.popular ? "none" : "1.5px solid var(--border)",
                      color: pkg.popular ? "var(--primary-btn-text)" : "var(--text)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Book &amp; pay advance →
                  </Link>
                  <a
                    href={getWhatsAppHref(`Hi techiitfly, I'm interested in the ${pkg.waLabel}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", `websites_package_quote_${pkg.name.toLowerCase()}`)}
                    style={{
                      display: "block",
                      textAlign: "center",
                      fontFamily: "var(--font-geist-sans)",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      padding: "9px 14px",
                      borderRadius: "8px",
                      background: "transparent",
                      border: "1px solid var(--border)",
                      color: "var(--muted)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Get a quote first ↗
                  </a>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.7rem",
                      color: "var(--muted)",
                      margin: "2px 0 0",
                      textAlign: "center",
                    }}
                  >
                    By booking, you agree to our{" "}
                    <Link href="/terms" style={{ color: "var(--muted)", textDecoration: "underline" }}>
                      Terms
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section (e) 7-day guarantee block ───────────────────────── */}
      <section
        style={{
          padding: "70px 24px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "36px 32px",
            background: "var(--bg)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(34,197,94,0.12)",
              color: "#22c55e",
              border: "1px solid rgba(34,197,94,0.3)",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: "999px",
              marginBottom: "14px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Guaranteed On-Time Delivery
          </div>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--text)",
              marginBottom: "12px",
            }}
          >
            The 7-Day Launch Guarantee
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              color: "var(--muted)",
              lineHeight: 1.6,
              marginBottom: "18px",
            }}
          >
            If your Starter website is not live on your domain within 7 business days of receiving your complete content and 50% deposit, we waive 50% of the final payment. No excuses, no delays.
          </p>
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.75rem",
              color: "var(--muted)",
              margin: 0,
            }}
          >
            *Fine print: Requires timely submission of text, logo, and images. Domain DNS access must be granted within 48 hours of request.
          </p>
        </div>
      </section>

      {/* ── Section (f) FAQ ────────────────────────────────────────── */}
      <section
        style={{
          padding: "70px 24px",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span className="section-label">COMMON QUESTIONS</span>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginTop: "8px",
              }}
            >
              Frequently asked questions.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  style={{
                    background: "var(--surface)",
                    border: `1px solid ${isOpen ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "transparent",
                      border: "none",
                      padding: "18px 22px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.96rem",
                      fontWeight: 600,
                      color: "var(--text)",
                    }}
                  >
                    <span>{faq.q}</span>
                    <span
                      style={{
                        color: "var(--accent)",
                        fontSize: "1.3rem",
                        lineHeight: 1,
                        transform: isOpen ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p
                      style={{
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "0.92rem",
                        color: "var(--muted)",
                        lineHeight: 1.65,
                        padding: "0 22px 18px",
                        margin: 0,
                      }}
                    >
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section (g) Final CTA ──────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px 90px",
          background: "var(--surface)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.3rem, 5vw, 3.8rem)",
              fontWeight: 400,
              color: "var(--text)",
              marginBottom: "12px",
            }}
          >
            Ready to get your site live?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              color: "var(--muted)",
              lineHeight: 1.55,
              marginBottom: "28px",
            }}
          >
            Message us on WhatsApp, call directly, or send an email. We will confirm your scope and deliver your quote the same day.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <a
              href={heroWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", "websites_final_cta")}
              style={{
                background: "var(--accent)",
                color: "var(--primary-btn-text)",
                padding: "15px 30px",
                borderRadius: "10px",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1rem",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Start on WhatsApp →
            </a>

            <a
              href={`tel:${SITE.phoneRaw}`}
              onClick={() => trackEvent("call_click", "websites_final_cta")}
              style={{
                background: "var(--surface-2)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                padding: "15px 24px",
                borderRadius: "10px",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.98rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Call {SITE.phone}
            </a>

            {SITE.contactEmail && (
              <a
                href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Website enquiry — techiitfly")}`}
                onClick={() => trackEvent("email_click", "websites_final_cta")}
                style={{
                  background: "transparent",
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                  padding: "15px 22px",
                  borderRadius: "10px",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Email {SITE.contactEmail}
              </a>
            )}
          </div>

          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.92rem",
              color: "var(--muted)",
              marginTop: "24px",
              marginBottom: 0,
            }}
          >
            Already have a website?{" "}
            <Link
              href="/pricing#seo"
              style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 600 }}
            >
              Our SEO &amp; AI search plans help you get found →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Minimal Footer: privacy link + email only ──────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--bg)",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.85rem",
            color: "var(--muted)",
          }}
        >
          <div>
            © 2026 techiitfly · Pune, India
          </div>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link
              href="/privacy"
              style={{ color: "var(--muted)", textDecoration: "underline" }}
            >
              Privacy Policy
            </Link>
            {SITE.contactEmail && (
              <a
                href={`mailto:${SITE.contactEmail}`}
                style={{ color: "var(--accent)", textDecoration: "underline" }}
              >
                {SITE.contactEmail}
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
