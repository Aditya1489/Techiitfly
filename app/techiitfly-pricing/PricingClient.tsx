"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ─── Techiitfly Brand Logo ────────────────────────────────────────────────────
function TechiitflyLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="techiitfly logo"
    >
      <defs>
        <linearGradient id="tf-box" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1D4ED8" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect width="150" height="150" rx="40" fill="url(#tf-box)" />
      <g transform="translate(16,24) scale(0.78)">
        <path d="M20,140 C44,140 70,128 92,106 C86,132 60,148 20,140 Z" fill="#fff" opacity="0.55" />
        <path d="M18,118 C46,116 84,100 118,64 C110,98 78,126 18,118 Z" fill="#fff" opacity="0.78" />
        <path d="M18,96 C50,92 100,70 142,18 C132,64 90,104 18,96 Z" fill="#fff" />
        <circle cx="148" cy="12" r="10" fill="#fff" opacity="0.6" />
        <circle cx="148" cy="12" r="6" fill="#fff" />
      </g>
    </svg>
  );
}

import { SITE, getConsultUrl } from "@/content/site";
import {
  Plan,
  APP_PLANS,
  IT_PLANS,
  ADDONS,
  PRICING_CONFIG,
  PRICING_FAQS,
  getWebPlans,
} from "@/content/pricing";
import { trackEvent } from "@/lib/tracking";

// ─── WhatsApp number ──────────────────────────────────────────────────────────
const WHATSAPP = SITE.phone.replace(/[^0-9]/g, "");
function waLink(plan: string) {
  const msg = `Hi techiitfly, I'm interested in: ${plan}`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

const STEPS: { title: string; desc: React.ReactNode }[] = [
  {
    title: "Share your idea",
    desc: (
      <>
        Message us on WhatsApp or{" "}
        <a
          href={getConsultUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("consult_click", "pricing_step_1")}
          style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" }}
        >
          book a free 15-minute call
        </a>
        .
      </>
    ),
  },
  { title: "Get a quote", desc: "Fixed price and timeline, shared the same day." },
  { title: "Pay 50% and we start", desc: "You see progress at every stage and can request changes." },
  { title: "Launch and support", desc: "Pay the rest on delivery. Free support is included." },
];

const FAQS = PRICING_FAQS;

type Tab = "web" | "app" | "it";

const TABS: { id: Tab; label: string }[] = [
  { id: "web", label: "Websites" },
  ...(SITE.showAppServices ? [{ id: "app" as Tab, label: "Mobile Apps" }] : []),
  ...(SITE.showItServices ? [{ id: "it" as Tab, label: "Managed IT" }] : []),
];

const PLAN_MAP: Record<Tab, Plan[]> = {
  web: getWebPlans(),
  app: APP_PLANS,
  it: IT_PLANS,
};

// ─── Plan Card ────────────────────────────────────────────────────────────────
function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        background: plan.popular ? "var(--surface)" : "var(--bg)",
        border: plan.popular ? "1.5px solid var(--accent)" : "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "30px 26px",
        display: "flex",
        flexDirection: "column",
        boxShadow: plan.popular ? "var(--card-hover-shadow)" : "var(--card-shadow)",
        transform: plan.popular ? "translateY(-6px)" : "none",
        transition: "box-shadow 0.25s, border-color 0.25s",
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <span
          style={{
            position: "absolute",
            top: "-13px",
            left: "22px",
            background: "var(--accent)",
            color: "var(--primary-btn-text)",
            fontSize: "11px",
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: "999px",
            fontFamily: "var(--font-geist-mono)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Most Popular
        </span>
      )}

      {/* Plan header */}
      <h3
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "1.2rem",
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
          fontSize: "0.84rem",
          color: "var(--muted)",
          minHeight: "42px",
          lineHeight: 1.5,
          marginBottom: "18px",
        }}
      >
        {plan.for}
      </p>

      {/* Price */}
      <div
        style={{
          fontFamily: "var(--font-geist-sans)",
          color: "var(--text)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}
      >
        {plan.originalPrice ? (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "1rem",
                  color: "var(--muted)",
                  textDecoration: "line-through",
                }}
              >
                {plan.originalPrice}
              </span>
              <span
                style={{
                  fontSize: "1.9rem",
                  fontWeight: 800,
                  color: "var(--accent)",
                }}
              >
                {plan.price}
              </span>
            </div>
            {plan.launchOfferNotice && (
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  display: "block",
                  marginTop: "4px",
                }}
              >
                {plan.launchOfferNotice}
              </span>
            )}
          </div>
        ) : plan.price.startsWith("From") ? (
          <div style={{ fontSize: "1.9rem", fontWeight: 800, display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
            <span>{plan.price}</span>
            {plan.priceNote && (
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--muted)",
                  fontFamily: "var(--font-geist-mono)",
                  letterSpacing: 0,
                }}
              >
                · {plan.priceNote}
              </span>
            )}
          </div>
        ) : plan.priceNote ? (
          <div style={{ fontSize: "1.9rem", fontWeight: 800 }}>
            <span
              style={{
                fontSize: "0.92rem",
                fontWeight: 600,
                color: "var(--muted)",
                marginRight: "6px",
                letterSpacing: 0,
              }}
            >
              {plan.priceNote}
            </span>
            {plan.price}
          </div>
        ) : (
          <div style={{ fontSize: "1.9rem", fontWeight: 800 }}>
            {plan.price}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "var(--accent)",
          marginTop: "6px",
          paddingBottom: "18px",
          borderBottom: "1px solid var(--border)",
          letterSpacing: "0.02em",
        }}
      >
        {plan.timeline}
      </div>

      {plan.note && (
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.76rem",
            color: "var(--muted)",
            lineHeight: 1.4,
            margin: "10px 0 0",
          }}
        >
          {plan.note}
        </p>
      )}

      {/* Feature list */}
      <ul
        style={{
          listStyle: "none",
          margin: "18px 0 24px",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: 1,
        }}
      >
        {plan.features.map((f) => (
          <li
            key={f.text}
            style={{
              display: "flex",
              gap: "10px",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.88rem",
              color: f.included ? "var(--text)" : "var(--muted)",
              opacity: f.included ? 1 : 0.6,
            }}
          >
            <span
              style={{
                color: f.included ? "var(--accent)" : "var(--muted)",
                fontWeight: 800,
                lineHeight: 1.3,
                flexShrink: 0,
              }}
            >
              {f.included ? "✓" : "–"}
            </span>
            <span>{f.text}</span>
          </li>
        ))}
      </ul>

      {/* CTA Buttons */}
      {["Starter", "Business", "Premium"].includes(plan.name) ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link
            href={`/checkout/${plan.name.toLowerCase()}`}
            onClick={() => trackEvent("begin_checkout", `pricing_${plan.name.toLowerCase()}`)}
            style={{
              display: "block",
              textAlign: "center",
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 700,
              fontSize: "0.92rem",
              textDecoration: "none",
              padding: "12px 16px",
              borderRadius: "10px",
              background: plan.popular ? "var(--accent)" : "var(--surface-2)",
              border: plan.popular ? "none" : "1.5px solid var(--border)",
              color: plan.popular ? "var(--primary-btn-text)" : "var(--text)",
              transition: "all 0.2s ease",
            }}
          >
            Book &amp; pay advance →
          </Link>
          <a
            href={waLink(plan.waLabel)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", `pricing_quote_${plan.name.toLowerCase()}`)}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--muted)";
              e.currentTarget.style.borderColor = "var(--border)";
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
      ) : plan.id.startsWith("app") || ["MVP", "Standard App", "Advanced"].includes(plan.name) ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
              `Hi techiitfly, I'm interested in a mobile app — ${plan.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", `pricing_app_${plan.name.toLowerCase().replace(/\s+/g, "_")}`)}
            style={{
              display: "block",
              textAlign: "center",
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 700,
              fontSize: "0.92rem",
              textDecoration: "none",
              padding: "13px 18px",
              borderRadius: "10px",
              background: plan.popular ? "var(--accent)" : "var(--surface-2)",
              border: plan.popular ? "none" : "1.5px solid var(--border)",
              color: plan.popular ? "var(--primary-btn-text)" : "var(--text)",
              transition: "all 0.2s ease",
            }}
          >
            Get a quote →
          </a>
          <a
            href={getConsultUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("consult_click", `pricing_app_consult_${plan.name.toLowerCase().replace(/\s+/g, "_")}`)}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--muted)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            Book a free consultation ↗
          </a>
        </div>
      ) : (
        <a
          href={waLink(plan.waLabel)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            textAlign: "center",
            fontFamily: "var(--font-geist-sans)",
            fontWeight: 700,
            fontSize: "0.92rem",
            textDecoration: "none",
            padding: "13px 16px",
            borderRadius: "10px",
            background: plan.popular ? "var(--accent)" : "transparent",
            border: plan.popular ? "none" : "1.5px solid var(--border)",
            color: plan.popular ? "var(--primary-btn-text)" : "var(--text)",
            transition: "background 0.2s, color 0.2s, border-color 0.2s, opacity 0.2s",
          }}
          onClick={() => trackEvent("whatsapp_click", `pricing_${plan.name.toLowerCase()}`)}
        >
          {plan.cta}
        </a>
      )}

      {/* Desktop (>=1024px) phone and email links */}
      <div
        className="desktop-only"
        style={{
          marginTop: "10px",
          textAlign: "center",
          fontSize: "0.72rem",
          fontFamily: "var(--font-geist-mono)",
          color: "var(--muted)",
        }}
      >
        or call{" "}
        <a
          href={`tel:${SITE.phoneRaw}`}
          onClick={() => trackEvent("call_click", `pricing_${plan.name.toLowerCase()}`)}
          style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: "2px" }}
        >
          {SITE.phone}
        </a>
        {" · "}
        <a
          href={`mailto:${SITE.contactEmail}`}
          onClick={() => trackEvent("email_click", `pricing_${plan.name.toLowerCase()}`)}
          style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: "2px" }}
        >
          email
        </a>
      </div>
    </motion.article>
  );
}

// ─── Animated FAQ ─────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "var(--surface)",
        border: `1px solid ${open ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--radius)",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%",
          textAlign: "left",
          background: "transparent",
          border: "none",
          padding: "18px 20px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          fontFamily: "var(--font-geist-sans)",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "var(--text)",
        }}
      >
        <span>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            color: "var(--accent)",
            fontSize: "1.3rem",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.9rem",
                color: "var(--muted)",
                lineHeight: 1.65,
                padding: "0 20px 18px",
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────
export default function PricingClient() {
  const [activeTab, setActiveTab] = useState<Tab>("web");

  useEffect(() => {
    function handleHash() {
      if (typeof window === "undefined") return;
      const h = window.location.hash.toLowerCase();
      if (h === "#apps" || h === "#app" || h === "#mobile-apps") {
        setActiveTab("app");
      } else if (h === "#web" || h === "#websites") {
        setActiveTab("web");
      }
    }
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleTabChange = (tabId: Tab) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      const targetHash = tabId === "app" ? "#apps" : "";
      if (window.location.hash !== targetHash) {
        if (targetHash) {
          window.history.replaceState(null, "", targetHash);
        } else {
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % TABS.length;
      handleTabChange(TABS[nextIndex].id);
      document.getElementById(`tab-${TABS[nextIndex].id}`)?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + TABS.length) % TABS.length;
      handleTabChange(TABS[prevIndex].id);
      document.getElementById(`tab-${TABS[prevIndex].id}`)?.focus();
    }
  };

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <header
          style={{
            padding: "60px 0 36px",
            textAlign: "center",
          }}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "32px",
              padding: "10px 20px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "999px",
            }}
          >
            <TechiitflyLogo size={34} />
            <span
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.3rem",
                fontWeight: 800,
                color: "var(--text)",
                letterSpacing: "-0.03em",
              }}
            >
              techiit
              <span style={{ color: "var(--accent)" }}>fly</span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                borderLeft: "1px solid var(--border)",
                paddingLeft: "14px",
              }}
            >
              Pricing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--text)",
              maxWidth: "760px",
              margin: "0 auto",
              letterSpacing: "-0.02em",
            }}
          >
            Websites &amp; mobile apps.{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              Delivered on time, at fixed prices.
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              color: "var(--muted)",
              maxWidth: "540px",
              margin: "18px auto 0",
              lineHeight: 1.6,
            }}
          >
            {SITE.showIitClaim
              ? "An IIT-alumni team building for growing businesses. Pick a package, or tell us what you need — we'll quote it the same day."
              : "A Pune studio building for growing businesses. Pick a package, or tell us what you need — we'll quote it the same day."}
          </motion.p>

          {/* Trust signals */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px 24px",
              marginTop: "22px",
              listStyle: "none",
              padding: 0,
            }}
          >
            {["3 live projects", "Fixed prices, no surprise bills", "Websites live in 7 days"].map(
              (t) => (
                <li
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.84rem",
                    fontWeight: 600,
                    color: "var(--text)",
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "var(--accent-dim)",
                      color: "var(--accent)",
                      fontSize: "11px",
                      fontWeight: 800,
                    }}
                  >
                    ✓
                  </span>
                  {t}
                </li>
              )
            )}
          </motion.ul>
        </header>

        {/* ── Tabs (hidden if only Websites available) ───────────────── */}
        {TABS.length > 1 && (
          <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 36px" }}>
            <div
              role="tablist"
              aria-label="Service packages"
              style={{
                display: "inline-flex",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "999px",
                padding: "5px",
                gap: "4px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {TABS.map((tab, idx) => {
                const isSelected = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => handleTabChange(tab.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontWeight: 600,
                      fontSize: "0.92rem",
                      border: "none",
                      padding: "10px 24px",
                      borderRadius: "999px",
                      cursor: "pointer",
                      transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                      background: isSelected ? "var(--accent)" : "transparent",
                      color: isSelected ? "var(--primary-btn-text)" : "var(--muted)",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 0 2px var(--accent)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Plan cards ───────────────────────────────────────────────── */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          style={{ outline: "none" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                  alignItems: "stretch",
                }}
                className="pricing-grid"
              >
                {PLAN_MAP[activeTab].map((plan, i) => (
                  <PlanCard key={plan.name} plan={plan} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Small text under app packages */}
          {activeTab === "app" && (
            <p
              style={{
                textAlign: "center",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.85rem",
                color: "var(--muted)",
                maxWidth: "680px",
                margin: "24px auto 0",
                lineHeight: 1.5,
              }}
            >
              Final price depends on features and integrations. You get a fixed quote and timeline after a free consultation.
            </p>
          )}
        </div>

        {/* Highlighted Consultation Card below packages */}
        <div
          style={{
            marginTop: "32px",
            background: "var(--surface)",
            border: "1.5px solid var(--accent)",
            borderRadius: "var(--radius-lg)",
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "18px",
            boxShadow: "0 8px 30px rgba(245,158,11,0.1)",
          }}
        >
          <div style={{ maxWidth: "620px" }}>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                color: "var(--accent)",
                letterSpacing: "0.08em",
                fontWeight: 700,
                textTransform: "uppercase",
                display: "block",
                marginBottom: "4px",
              }}
            >
              FREE · 15 MINUTES · NO OBLIGATION
            </span>
            <h3
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "var(--text)",
                margin: "0 0 4px 0",
              }}
            >
              Not sure which package fits?
            </h3>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.9rem",
                color: "var(--muted)",
                margin: 0,
              }}
            >
              Book a free 15-minute consultation and get a fixed quote.
            </p>
          </div>

          <a
            href={getConsultUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("consult_click", "pricing_highlight_card")}
            style={{
              padding: "12px 22px",
              borderRadius: "8px",
              background: "var(--accent)",
              color: "var(--primary-btn-text)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.92rem",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              whiteSpace: "nowrap",
            }}
          >
            <span>Book free consultation</span>
            <span>→</span>
          </a>
        </div>

        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.85rem",
            color: "var(--muted)",
            marginTop: "20px",
            lineHeight: 1.5,
          }}
        >
          {PRICING_CONFIG.comparisonNote}
        </p>

        {/* ── Add-ons ──────────────────────────────────────────────────── */}
        <section style={{ padding: "60px 0 0" }}>
          <span className="section-label">OPTIONAL EXTRAS</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 400,
              color: "var(--text)",
              marginTop: "10px",
              marginBottom: "6px",
            }}
          >
            Add-ons
          </h2>
          <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.9rem", color: "var(--muted)" }}>
            Add only what you need.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "12px",
              marginTop: "24px",
            }}
          >
            {ADDONS.map((a) => (
              <motion.div
                key={a.label}
                whileHover={{ y: -2, borderColor: "var(--accent)" }}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  transition: "border-color 0.2s",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.88rem",
                      color: "var(--text)",
                    }}
                  >
                    {a.label}
                  </span>
                  {a.note && (
                    <span
                      style={{
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "0.75rem",
                        color: "var(--muted)",
                        lineHeight: 1.35,
                      }}
                    >
                      {a.note}
                    </span>
                  )}
                </div>
                <strong
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.9rem",
                    color: "var(--accent)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {a.price}
                </strong>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────────────── */}
        <section style={{ padding: "60px 0 0" }}>
          <span className="section-label">PROCESS</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 400,
              color: "var(--text)",
              marginTop: "10px",
              marginBottom: "6px",
            }}
          >
            How it works
          </h2>
          <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.9rem", color: "var(--muted)" }}>
            Simple, clear and fast.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              marginTop: "28px",
            }}
            className="steps-grid"
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "22px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    color: "var(--primary-btn-text)",
                    fontFamily: "var(--font-geist-mono)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    marginBottom: "12px",
                  }}
                >
                  {i + 1}
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.98rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "6px",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.84rem",
                    color: "var(--muted)",
                    lineHeight: 1.55,
                  }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section style={{ padding: "60px 0 0" }}>
          <span className="section-label">FAQS</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 400,
              color: "var(--text)",
              marginTop: "10px",
              marginBottom: "6px",
            }}
          >
            Questions
          </h2>
          <div
            style={{
              maxWidth: "760px",
              margin: "24px auto 0",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            margin: "64px 0 40px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "52px 28px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow blob */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "400px",
              height: "200px",
              background: "var(--accent-glow)",
              borderRadius: "50%",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "18px",
              }}
            >
              <TechiitflyLogo size={28} />
              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  color: "var(--text)",
                }}
              >
                techiit<span style={{ color: "var(--accent)" }}>fly</span>
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginBottom: "10px",
              }}
            >
              Not sure which package fits?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1rem",
                color: "var(--muted)",
                maxWidth: "460px",
                margin: "0 auto 28px",
                lineHeight: 1.6,
              }}
            >
              Tell us what you want to build. We&apos;ll reply with a clear quote the same day.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", alignItems: "center" }}>
              <motion.a
                href={waLink("General enquiry")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-geist-sans)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  padding: "14px 32px",
                  borderRadius: "10px",
                  background: "var(--accent)",
                  color: "var(--primary-btn-text)",
                }}
              >
                {/* WhatsApp icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </motion.a>
              {SITE.contactEmail && (
                <a
                  href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Project enquiry — techiitfly")}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    padding: "14px 24px",
                    borderRadius: "10px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                >
                  Prefer email? {SITE.contactEmail}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
            max-width: 460px;
            margin-left: auto;
            margin-right: auto;
          }
          .steps-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 520px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
