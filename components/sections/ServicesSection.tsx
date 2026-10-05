"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/content/site";
import { WEB_PLANS, APP_PLANS, IT_PLANS, PRICING_CONFIG, getWebPlans } from "@/content/pricing";
import { trackEvent } from "@/lib/tracking";

export default function ServicesSection() {
  const WHATSAPP = SITE.phoneRaw.replace(/[^0-9]/g, "");
  const currentPlans = getWebPlans();

  function getWaHref(planName: string) {
    const msg = `Hi techiitfly, I'm interested in: Website – ${planName}`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <section
      id="services"
      style={{
        background: "var(--bg)",
        padding: "80px 24px 90px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span className="section-label">OUR SERVICES</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "10px",
              marginBottom: "12px",
            }}
          >
            Everything your business needs online.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.06rem",
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: "620px",
              margin: "0 auto",
            }}
          >
            Fixed prices, fast turnaround, and zero surprises. Pick the right foundation for your business.
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
            marginBottom: "36px",
          }}
        >
          {currentPlans.map((plan) => {
            const bullets = plan.homeBullets || plan.features.slice(0, 4).map((f) => f.text);

            return (
              <div
                key={plan.name}
                style={{
                  background: "var(--surface)",
                  border: plan.popular ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: plan.popular
                    ? "0 12px 36px rgba(245,158,11,0.12)"
                    : "var(--card-shadow)",
                  position: "relative",
                }}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "24px",
                      background: "var(--accent)",
                      color: "var(--primary-btn-text)",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "3px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    Most Popular
                  </span>
                )}

                {/* Plan Header */}
                <div style={{ marginBottom: "16px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: "4px",
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      minHeight: "40px",
                      margin: 0,
                    }}
                  >
                    {plan.for}
                  </p>
                </div>

                {/* Price & Timeline */}
                <div
                  style={{
                    padding: "16px 0",
                    borderTop: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {plan.originalPrice ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-geist-mono)",
                            fontSize: "0.95rem",
                            color: "var(--muted)",
                            textDecoration: "line-through",
                          }}
                        >
                          {plan.originalPrice}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-geist-sans)",
                            fontSize: "1.8rem",
                            fontWeight: 800,
                            color: "var(--accent)",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {plan.price}
                        </span>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-geist-sans)",
                            fontSize: "0.82rem",
                            color: "var(--muted)",
                            fontWeight: 500,
                          }}
                        >
                          {plan.priceNote ? `${plan.priceNote} ` : "Starting at "}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-geist-sans)",
                            fontSize: "1.8rem",
                            fontWeight: 800,
                            color: "var(--text)",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {plan.price}
                        </span>
                      </div>
                    )}

                    {plan.launchOfferNotice && (
                      <span
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          color: "var(--accent)",
                        }}
                      >
                        {plan.launchOfferNotice}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.78rem",
                      color: "var(--accent)",
                      fontWeight: 600,
                      marginTop: "4px",
                    }}
                  >
                    {plan.timeline}
                  </div>
                </div>

                {/* 4 Key Bullets */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 28px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    flexGrow: 1,
                  }}
                >
                  {bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "0.88rem",
                        color: "var(--text)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        lineHeight: 1.45,
                      }}
                    >
                      <span style={{ color: "var(--accent)", fontWeight: 700, lineHeight: 1.2 }}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Link
                    href={`/checkout/${plan.name.toLowerCase()}`}
                    onClick={() => trackEvent("begin_checkout", `services_${plan.name.toLowerCase()}`)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "12px 18px",
                      borderRadius: "8px",
                      background: plan.popular ? "var(--accent)" : "var(--surface-2)",
                      color: plan.popular ? "#0e0d0b" : "var(--text)",
                      border: plan.popular ? "none" : "1px solid var(--border)",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      transition: "all 0.15s ease",
                      textAlign: "center",
                    }}
                  >
                    <span>Book &amp; pay advance</span>
                    <span>→</span>
                  </Link>
                  <a
                    href={getWaHref(plan.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", `services_quote_${plan.name.toLowerCase()}`)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "9px 14px",
                      borderRadius: "8px",
                      background: "transparent",
                      border: "1px solid var(--border)",
                      color: "var(--muted)",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.15s ease",
                      textAlign: "center",
                    }}
                  >
                    <span>Get a quote first</span>
                    <span>↗</span>
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

                {/* Desktop (≥1024px) direct phone and email link beneath CTA */}
                <div
                  className="desktop-only"
                  style={{
                    marginTop: "10px",
                    textAlign: "center",
                    fontSize: "0.74rem",
                    fontFamily: "var(--font-geist-mono)",
                    color: "var(--muted)",
                  }}
                >
                  or call{" "}
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    onClick={() => trackEvent("call_click", `services_${plan.name.toLowerCase()}`)}
                    style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: "2px" }}
                  >
                    {SITE.phone}
                  </a>
                  {" · "}
                  <a
                    href={`mailto:${SITE.contactEmail}`}
                    onClick={() => trackEvent("email_click", `services_${plan.name.toLowerCase()}`)}
                    style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: "2px" }}
                  >
                    email
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Mobile Apps Card */}
        {SITE.showAppServices && (
          <div
            style={{
              margin: "0 auto 36px",
              background: "var(--surface)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
              boxShadow: "var(--card-shadow)",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", maxWidth: "720px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--accent-dim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                  flexShrink: 0,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.18rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    Mobile apps — starting at ₹99,999
                  </h3>
                  <span
                    style={{
                      background: "var(--surface-2)",
                      color: "var(--accent)",
                      border: "1px solid var(--border)",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "999px",
                    }}
                  >
                    iOS &amp; Android
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.88rem",
                    color: "var(--muted)",
                    margin: "4px 0 0",
                    lineHeight: 1.45,
                  }}
                >
                  Cross-platform MVP ready in 4–6 weeks. Custom UI, store publishing, and scalable backend.
                </p>
              </div>
            </div>
            <Link
              href="/pricing#apps"
              onClick={() => trackEvent("consult_click", "home_compact_mobile_apps")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "11px 22px",
                borderRadius: "8px",
                background: "var(--accent)",
                color: "var(--primary-btn-text)",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.92rem",
                fontWeight: 700,
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s ease",
              }}
            >
              <span>View app packages</span>
              <span>→</span>
            </Link>
          </div>
        )}

        {/* Small comparison note */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.85rem",
            color: "var(--muted)",
            maxWidth: "680px",
            margin: "0 auto 28px",
            lineHeight: 1.5,
          }}
        >
          {PRICING_CONFIG.comparisonNote}
        </p>

        {/* Link to /pricing */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/pricing"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.98rem",
              fontWeight: 600,
              color: "var(--accent)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>See full pricing &amp; add-ons</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
