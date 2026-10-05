"use client";

import { useState } from "react";
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

import { SITE } from "@/content/site";

// ─── WhatsApp number ──────────────────────────────────────────────────────────
const WHATSAPP = SITE.phone.replace(/[^0-9]/g, "");
function waLink(plan: string) {
  const msg = `Hi techiitfly, I'm interested in: ${plan}`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
type FeatureItem = { text: string; included: boolean };
interface Plan {
  name: string;
  for: string;
  price: string;
  priceNote: string;
  timeline: string;
  popular?: boolean;
  features: FeatureItem[];
  cta: string;
  waLabel: string;
}

const WEB_PLANS: Plan[] = [
  {
    name: "Starter",
    for: "A clean online presence for a new or small business.",
    price: "₹9,999",
    priceNote: "starting from",
    timeline: "Live in 5–7 days",
    features: [
      { text: "Up to 5 pages", included: true },
      { text: "Template-based design", included: true },
      { text: "Mobile friendly", included: true },
      { text: "Contact form + WhatsApp button", included: true },
      { text: "Basic SEO setup", included: true },
      { text: "7 days free support", included: true },
    ],
    cta: "Get Starter",
    waLabel: "Website – Starter",
  },
  {
    name: "Business",
    for: "For companies that want to look premium and rank on Google.",
    price: "₹24,999",
    priceNote: "starting from",
    timeline: "Live in 7–10 days",
    popular: true,
    features: [
      { text: "Up to 10 pages", included: true },
      { text: "Custom design", included: true },
      { text: "Mobile friendly", included: true },
      { text: "Basic SEO setup", included: true },
      { text: "Admin panel to edit content", included: true },
      { text: "Google Analytics + Maps", included: true },
      { text: "30 days free support", included: true },
    ],
    cta: "Get Business",
    waLabel: "Website – Business",
  },
  {
    name: "Premium",
    for: "E-commerce, booking or fully custom web platforms.",
    price: "₹49,999",
    priceNote: "starting from",
    timeline: "Live in 14–21 days",
    features: [
      { text: "15+ pages or online store", included: true },
      { text: "Custom design + animations", included: true },
      { text: "Payment gateway / booking", included: true },
      { text: "Advanced SEO", included: true },
      { text: "Admin dashboard", included: true },
      { text: "Speed + security hardening", included: true },
      { text: "90 days free support", included: true },
    ],
    cta: "Get Premium",
    waLabel: "Website – Premium",
  },
];

const APP_PLANS: Plan[] = [
  {
    name: "MVP",
    for: "Test your idea fast with the core features only.",
    price: "₹49,999",
    priceNote: "starting from",
    timeline: "Ready in 2–3 weeks",
    features: [
      { text: "Android or iOS", included: true },
      { text: "3–5 core features", included: true },
      { text: "Login + basic backend", included: true },
      { text: "Play Store / App Store publishing", included: true },
      { text: "Admin panel", included: false },
      { text: "15 days free support", included: true },
    ],
    cta: "Get MVP",
    waLabel: "App – MVP",
  },
  {
    name: "Standard App",
    for: "One app for both platforms, ready for real customers.",
    price: "₹1,49,999",
    priceNote: "starting from",
    timeline: "Ready in 4–6 weeks",
    popular: true,
    features: [
      { text: "Android + iOS together", included: true },
      { text: "Login, payments, notifications", included: true },
      { text: "Custom UI design", included: true },
      { text: "Admin panel", included: true },
      { text: "Store publishing included", included: true },
      { text: "60 days free support", included: true },
    ],
    cta: "Get Standard",
    waLabel: "App – Standard",
  },
  {
    name: "Advanced",
    for: "Complex apps with custom backend and integrations.",
    price: "₹3,00,000+",
    priceNote: "custom quote",
    timeline: "8+ weeks",
    features: [
      { text: "Android + iOS + web dashboard", included: true },
      { text: "Custom backend + APIs", included: true },
      { text: "Third-party integrations", included: true },
      { text: "Analytics + reporting", included: true },
      { text: "Scalable cloud setup", included: true },
      { text: "90 days free support", included: true },
    ],
    cta: "Request a quote",
    waLabel: "App – Advanced",
  },
];

const IT_PLANS: Plan[] = [
  {
    name: "Essential",
    for: "Basic IT care for small offices.",
    price: "₹9,999",
    priceNote: "/ month",
    timeline: "Response within 24 hours",
    features: [
      { text: "Up to 10 devices", included: true },
      { text: "Remote helpdesk support", included: true },
      { text: "Email + antivirus setup", included: true },
      { text: "Monthly health check", included: true },
      { text: "On-site visits", included: false },
      { text: "Server management", included: false },
    ],
    cta: "Get Essential",
    waLabel: "IT Services – Essential",
  },
  {
    name: "Business Care",
    for: "We run your IT so your team can focus on work.",
    price: "₹24,999",
    priceNote: "/ month",
    timeline: "Response within 4 hours",
    popular: true,
    features: [
      { text: "Up to 30 devices", included: true },
      { text: "Remote + on-site support", included: true },
      { text: "Server + network management", included: true },
      { text: "Cloud backups", included: true },
      { text: "Security monitoring", included: true },
      { text: "Monthly report", included: true },
    ],
    cta: "Get Business Care",
    waLabel: "IT Services – Business Care",
  },
  {
    name: "Enterprise",
    for: "A dedicated IT team for larger companies.",
    price: "Custom",
    priceNote: "quote",
    timeline: "Response within 1 hour",
    features: [
      { text: "Unlimited devices", included: true },
      { text: "Dedicated IT engineer", included: true },
      { text: "24×7 monitoring", included: true },
      { text: "Compliance + audits", included: true },
      { text: "Cloud migration", included: true },
      { text: "Custom SLA", included: true },
    ],
    cta: "Request a quote",
    waLabel: "IT Services – Enterprise",
  },
];

const ADDONS = [
  { label: "Extra page", price: "₹1,500" },
  { label: "Logo design", price: "₹3,000" },
  { label: "Domain + hosting (1 year)", price: "₹4,000" },
  { label: "Monthly website maintenance", price: "₹2,500" },
  { label: "Express delivery", price: "+30%" },
  { label: "Content writing (per page)", price: "₹800" },
];

const STEPS = [
  { title: "Share your idea", desc: "Message us on WhatsApp or book a free 15-minute call." },
  { title: "Get a quote", desc: "Fixed price and timeline, shared the same day." },
  { title: "Pay 50% and we start", desc: "You see progress at every stage and can request changes." },
  { title: "Launch and support", desc: "Pay the rest on delivery. Free support is included." },
];

const FAQS = [
  {
    q: "Can you really deliver a website in one week?",
    a: "Yes — Starter websites (up to 5 pages) go live in 7 days once we receive your content. Business websites take 7–10 days.",
  },
  {
    q: "How many revisions are included?",
    a: "Starter package includes one round of design changes. Business and Premium packages include two rounds of revisions. Extra rounds are charged separately.",
  },
  {
    q: "How does payment work?",
    a: "50% advance to start, 50% on delivery. For monthly IT services, billing is monthly.",
  },
  {
    q: "Do I own the source code?",
    a: "Yes. After the final payment, the code and design files are yours.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Every package has free support for a set period. After that you can choose a monthly maintenance plan.",
  },
];

type Tab = "web" | "app" | "it";

const TABS: { id: Tab; label: string }[] = [
  { id: "web", label: "Websites" },
  ...(SITE.showAppServices ? [{ id: "app" as Tab, label: "Mobile Apps" }] : []),
  ...(SITE.showItServices ? [{ id: "it" as Tab, label: "Managed IT" }] : []),
];

const PLAN_MAP: Record<Tab, Plan[]> = {
  web: WEB_PLANS,
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
          fontSize: "2.2rem",
          fontWeight: 800,
          color: "var(--text)",
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
        }}
      >
        {plan.price}{" "}
        <span
          style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--muted)", letterSpacing: 0 }}
        >
          {plan.priceNote}
        </span>
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

      {/* CTA Button */}
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
        onMouseEnter={(e) => {
          if (!plan.popular) {
            e.currentTarget.style.background = "var(--surface-2)";
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          } else {
            e.currentTarget.style.opacity = "0.88";
          }
        }}
        onMouseLeave={(e) => {
          if (!plan.popular) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text)";
          } else {
            e.currentTarget.style.opacity = "1";
          }
        }}
      >
        {plan.cta}
      </a>
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
              maxWidth: "740px",
              margin: "0 auto",
              letterSpacing: "-0.02em",
            }}
          >
            Websites, apps &amp; IT support.{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              Delivered in days, not months.
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
              aria-label="Service type"
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
              {TABS.map((tab) => (
                <motion.button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: "999px",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                    background: activeTab === tab.id ? "var(--accent)" : "transparent",
                    color: activeTab === tab.id ? "var(--primary-btn-text)" : "var(--muted)",
                  }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* ── Plan cards ───────────────────────────────────────────────── */}
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

        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.8rem",
            color: "var(--muted)",
            marginTop: "20px",
          }}
        >
          Prices are starting prices in INR and exclude GST. Final quote depends on your requirements.
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
                <span
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.88rem",
                    color: "var(--text)",
                  }}
                >
                  {a.label}
                </span>
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
