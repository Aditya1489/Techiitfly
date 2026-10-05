"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/content/site";
import { WEB_PLANS, APP_PLANS, IT_PLANS } from "@/content/pricing";
import { trackEvent } from "@/lib/tracking";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"web" | "app" | "it">("web");
  const WHATSAPP = SITE.phoneRaw.replace(/[^0-9]/g, "");

  const currentPlans =
    activeTab === "web" ? WEB_PLANS : activeTab === "app" ? APP_PLANS : IT_PLANS;
  const currentCategory =
    activeTab === "web" ? "Website" : activeTab === "app" ? "App" : "IT Services";

  function getWaHref(planName: string) {
    const msg = `Hi techiitfly, I'm interested in: ${currentCategory} – ${planName}`;
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

        {/* Service Switcher Tabs */}
        {(SITE.showAppServices || SITE.showItServices) && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "999px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("web")}
                style={{
                  padding: "8px 18px",
                  borderRadius: "999px",
                  border: "none",
                  background: activeTab === "web" ? "var(--surface-2)" : "transparent",
                  color: activeTab === "web" ? "var(--text)" : "var(--muted)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  fontWeight: activeTab === "web" ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: activeTab === "web" ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                }}
              >
                Websites (7 Days)
              </button>
              {SITE.showAppServices && (
                <button
                  type="button"
                  onClick={() => setActiveTab("app")}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "999px",
                    border: "none",
                    background: activeTab === "app" ? "var(--surface-2)" : "transparent",
                    color: activeTab === "app" ? "var(--text)" : "var(--muted)",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.88rem",
                    fontWeight: activeTab === "app" ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: activeTab === "app" ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                  }}
                >
                  Mobile Apps
                </button>
              )}
              {SITE.showItServices && (
                <button
                  type="button"
                  onClick={() => setActiveTab("it")}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "999px",
                    border: "none",
                    background: activeTab === "it" ? "var(--surface-2)" : "transparent",
                    color: activeTab === "it" ? "var(--text)" : "var(--muted)",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.88rem",
                    fontWeight: activeTab === "it" ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: activeTab === "it" ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                  }}
                >
                  IT Support
                </button>
              )}
            </div>
          </div>
        )}

        {/* 3 Packages Grid */}
        <div
          key={activeTab}
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
                {activeTab === "web" ? (
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
                ) : (
                  <a
                    href={getWaHref(plan.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", `services_${activeTab}_${plan.name.toLowerCase()}`)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "13px 20px",
                      borderRadius: "8px",
                      background: plan.popular ? "var(--accent)" : "var(--surface-2)",
                      color: plan.popular ? "#0e0d0b" : "var(--text)",
                      border: plan.popular ? "none" : "1px solid var(--border)",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.15s ease",
                      textAlign: "center",
                    }}
                  >
                    <span>Choose {plan.name} on WhatsApp</span>
                    <span>→</span>
                  </a>
                )}

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
                    onClick={() => trackEvent("call_click", `services_${activeTab}_${plan.name.toLowerCase()}`)}
                    style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: "2px" }}
                  >
                    {SITE.phone}
                  </a>
                  {" · "}
                  <a
                    href={`mailto:${SITE.contactEmail}`}
                    onClick={() => trackEvent("email_click", `services_${activeTab}_${plan.name.toLowerCase()}`)}
                    style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: "2px" }}
                  >
                    email
                  </a>
                </div>
              </div>
            );
          })}
        </div>


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
