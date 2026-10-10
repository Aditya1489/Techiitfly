"use client";

import { useState } from "react";
import { SITE } from "@/content/site";
import { PRICING_CONFIG, MeetPlanItem } from "@/content/pricing";
import { trackEvent } from "@/lib/tracking";

interface MeetPlanCardsProps {
  location?: string;
  showHeader?: boolean;
}

export default function MeetPlanCards({
  location = "meet_pricing",
  showHeader = true,
}: MeetPlanCardsProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const meetConfig = PRICING_CONFIG.meet;
  const { plans, offers, customFeatureFrom } = meetConfig;
  const phone = SITE.phoneRaw.replace(/[^0-9]/g, "");

  const customFeatureText = customFeatureFrom
    ? `Custom features: available as a paid add-on (from ₹${customFeatureFrom.toLocaleString("en-IN")}, quoted per request)`
    : "Custom features: available as a paid add-on (quoted per request)";

  const academyCustomFeatureText = `Custom features included — planned with you during onboarding (fair use: up to ${
    plans.academy.includedDevHoursPerMonth || 10
  } hours/month; larger requests quoted separately)`;

  const getWaHref = (plan: MeetPlanItem) => {
    let msg = "";
    if (offers.freeTrialDays > 0) {
      msg = `Hi techiitfly, I'd like to start the ${offers.freeTrialDays}-day free trial for Mathsy Meet (${plan.name}).`;
    } else if (plan.id === "academy") {
      msg = `Hi techiitfly, I'd like to discuss the Mathsy Meet Academy plan for my coaching institute.`;
    } else {
      msg = `Hi techiitfly, I'd like to get started with Mathsy Meet ${plan.name} (${billing} billing).`;
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const handlePlanClick = (plan: MeetPlanItem) => {
    trackEvent("meet_plan_click", location, {
      plan: plan.id,
      billing,
      item_name: `Mathsy Meet – ${plan.name}`,
    });
  };

  const primaryCtaLabel =
    offers.freeTrialDays > 0
      ? `Start ${offers.freeTrialDays}-day free trial`
      : "Get started on WhatsApp";

  return (
    <div style={{ width: "100%", maxWidth: "1160px", margin: "0 auto" }}>
      {showHeader && (
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span className="section-label">MATHSY MEET PLANS</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
              fontWeight: 400,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "12px",
            }}
          >
            Simple, transparent pricing for tutors.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1rem",
              color: "var(--muted)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.55,
            }}
          >
            No per-minute penalties. Everything you need to teach math with precision.
          </p>
        </div>
      )}

      {/* ─── Billing Toggle (Yearly shows 2 months free) ─── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "36px",
        }}
      >
        <div
          role="group"
          aria-label="Billing cycle selector"
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "999px",
            padding: "4px",
            gap: "4px",
          }}
        >
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              border: "none",
              background: billing === "monthly" ? "var(--accent)" : "transparent",
              color: billing === "monthly" ? "var(--primary-btn-text)" : "var(--muted)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.88rem",
              fontWeight: billing === "monthly" ? 600 : 500,
              cursor: "pointer",
              transition: "all 0.18s ease",
            }}
          >
            Monthly
          </button>

          <button
            type="button"
            onClick={() => setBilling("yearly")}
            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              border: "none",
              background: billing === "yearly" ? "var(--accent)" : "transparent",
              color: billing === "yearly" ? "var(--primary-btn-text)" : "var(--muted)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.88rem",
              fontWeight: billing === "yearly" ? 600 : 500,
              cursor: "pointer",
              transition: "all 0.18s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>Yearly</span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                fontWeight: 700,
                background: billing === "yearly" ? "rgba(0,0,0,0.2)" : "rgba(245, 158, 11, 0.15)",
                color: billing === "yearly" ? "inherit" : "var(--accent)",
                padding: "2px 8px",
                borderRadius: "999px",
                letterSpacing: "0.02em",
              }}
            >
              2 months free
            </span>
          </button>
        </div>
      </div>

      {/* ─── Cards Grid ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        {/* ─── 1. Solo Tutor ─── */}
        <div
          style={{
            position: "relative",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {offers.foundingPrice.enabled && (
            <div
              style={{
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                fontSize: "0.74rem",
                fontFamily: "var(--font-geist-mono)",
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: "6px",
                marginBottom: "14px",
                display: "inline-block",
                alignSelf: "flex-start",
              }}
            >
              Founding tutor price — locked for life · {offers.foundingPrice.seatsLeft} of{" "}
              {offers.foundingPrice.seats} spots left
            </div>
          )}

          <h3
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: "6px",
            }}
          >
            {plans.solo.name}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.88rem",
              color: "var(--muted)",
              lineHeight: 1.5,
              marginBottom: "20px",
            }}
          >
            For individual tutors teaching private or small-group batches.
          </p>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "2.5rem",
                fontWeight: 400,
                color: "var(--text)",
                lineHeight: 1,
              }}
            >
              {billing === "monthly" ? "₹999" : "₹9,990"}
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  marginLeft: "6px",
                }}
              >
                {billing === "monthly" ? "/ month" : "/ year"}
              </span>
            </div>
            {billing === "yearly" && (
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.76rem",
                  color: "var(--accent)",
                  marginTop: "4px",
                }}
              >
                ₹832.50 / month (2 months free included)
              </div>
            )}
          </div>

          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.8rem",
              color: "var(--accent)",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--border)",
              marginBottom: "20px",
            }}
          >
            Up to {plans.solo.maxStudents} concurrent students
          </div>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 24px",
              display: "flex",
              flexDirection: "column",
              gap: "11px",
              flex: 1,
            }}
          >
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>All math tools: compass, protractor, ruler &amp; set-square</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>Video classes on dedicated media server</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>Screen sharing &amp; fullscreen board</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>Live polls (up to 6 options) with live results</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>Chat with pinned message, raise hand &amp; emoji reactions</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>Local HD recording saved directly to your computer</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
                background: "var(--surface-2)",
                padding: "8px 10px",
                borderRadius: "6px",
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>+</span>
              <span style={{ color: "var(--text-secondary, var(--text))" }}>
                {customFeatureText}
              </span>
            </li>
          </ul>

          {offers.moneyBack.enabled && (
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.75rem",
                color: "var(--muted)",
                textAlign: "center",
                marginBottom: "12px",
              }}
            >
              Not happy in your first {offers.moneyBack.days} days? Full refund.
            </div>
          )}

          <a
            href={getWaHref(plans.solo)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handlePlanClick(plans.solo)}
            style={{
              display: "block",
              textAlign: "center",
              padding: "13px 20px",
              borderRadius: "8px",
              background: "var(--surface-2)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.92rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.15s ease",
            }}
          >
            <span>{primaryCtaLabel}</span>
            <span aria-hidden="true" style={{ marginLeft: "6px" }}>→</span>
          </a>

          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <a
              href="#all-features"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.8rem",
                color: "var(--muted)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>Compare all features</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* ─── 2. Pro Tutor (Popular) ─── */}
        <div
          style={{
            position: "relative",
            background: "var(--surface)",
            border: "1.5px solid var(--accent)",
            borderRadius: "var(--radius-lg)",
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 0 28px rgba(245, 158, 11, 0.15)",
            transform: "translateY(-4px)",
          }}
        >
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
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Most Popular
          </span>

          {offers.foundingPrice.enabled && (
            <div
              style={{
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                fontSize: "0.74rem",
                fontFamily: "var(--font-geist-mono)",
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: "6px",
                marginBottom: "14px",
                display: "inline-block",
                alignSelf: "flex-start",
              }}
            >
              Founding tutor price — locked for life · {offers.foundingPrice.seatsLeft} of{" "}
              {offers.foundingPrice.seats} spots left
            </div>
          )}

          <h3
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: "6px",
            }}
          >
            {plans.pro.name}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.88rem",
              color: "var(--muted)",
              lineHeight: 1.5,
              marginBottom: "20px",
            }}
          >
            For growing educators, test-prep instructors &amp; multi-batch academies.
          </p>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "2.5rem",
                fontWeight: 400,
                color: "var(--accent)",
                lineHeight: 1,
              }}
            >
              {billing === "monthly" ? "₹1,999" : "₹19,990"}
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  marginLeft: "6px",
                }}
              >
                {billing === "monthly" ? "/ month" : "/ year"}
              </span>
            </div>
            {billing === "yearly" && (
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.76rem",
                  color: "var(--accent)",
                  marginTop: "4px",
                }}
              >
                ₹1,665.80 / month (2 months free included)
              </div>
            )}
          </div>

          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.8rem",
              color: "var(--accent)",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--border)",
              marginBottom: "20px",
            }}
          >
            Up to {plans.pro.maxStudents} concurrent students
          </div>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 24px",
              display: "flex",
              flexDirection: "column",
              gap: "11px",
              flex: 1,
            }}
          >
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>Everything in Solo Tutor</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>YouTube Live streaming</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>Larger classes (up to 100 students)</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>Priority WhatsApp support with founder Aditya Chavhan</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
                background: "var(--surface-2)",
                padding: "8px 10px",
                borderRadius: "6px",
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>+</span>
              <span style={{ color: "var(--text-secondary, var(--text))" }}>
                {customFeatureText}
              </span>
            </li>
          </ul>

          {offers.moneyBack.enabled && (
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.75rem",
                color: "var(--muted)",
                textAlign: "center",
                marginBottom: "12px",
              }}
            >
              Not happy in your first {offers.moneyBack.days} days? Full refund.
            </div>
          )}

          <a
            href={getWaHref(plans.pro)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handlePlanClick(plans.pro)}
            style={{
              display: "block",
              textAlign: "center",
              padding: "13px 20px",
              borderRadius: "8px",
              background: "var(--accent)",
              color: "var(--primary-btn-text)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.92rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.15s ease",
            }}
          >
            <span>{primaryCtaLabel}</span>
            <span aria-hidden="true" style={{ marginLeft: "6px" }}>→</span>
          </a>

          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <a
              href="#all-features"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.8rem",
                color: "var(--muted)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>Compare all features</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* ─── 3. Academy ─── */}
        <div
          style={{
            position: "relative",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: "6px",
            }}
          >
            {plans.academy.name}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.88rem",
              color: "var(--muted)",
              lineHeight: 1.5,
              marginBottom: "20px",
            }}
          >
            For coaching centres, schools &amp; teaching institutes with multiple faculty.
          </p>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "2.5rem",
                fontWeight: 400,
                color: "var(--text)",
                lineHeight: 1,
              }}
            >
              Custom Quote
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.78rem",
                color: "var(--muted)",
                marginTop: "4px",
              }}
            >
              Tailored to faculty count and student volume
            </div>
          </div>

          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.8rem",
              color: "var(--accent)",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--border)",
              marginBottom: "20px",
            }}
          >
            Unlimited faculty rooms &amp; students
          </div>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 24px",
              display: "flex",
              flexDirection: "column",
              gap: "11px",
              flex: 1,
            }}
          >
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>Branded institute domain &amp; custom colours</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>Central admin dashboard to manage all tutor rooms</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
              <span>Dedicated onboarding &amp; teacher training session</span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "0.88rem",
                color: "var(--text)",
                lineHeight: 1.45,
                background: "rgba(245, 158, 11, 0.08)",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                padding: "8px 10px",
                borderRadius: "6px",
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>★</span>
              <span style={{ color: "var(--text)" }}>
                {academyCustomFeatureText}
              </span>
            </li>
          </ul>

          <a
            href={getWaHref(plans.academy)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handlePlanClick(plans.academy)}
            style={{
              display: "block",
              textAlign: "center",
              padding: "13px 20px",
              borderRadius: "8px",
              background: "var(--surface-2)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.92rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.15s ease",
            }}
          >
            <span>Talk to Founder Aditya Chavhan</span>
            <span aria-hidden="true" style={{ marginLeft: "6px" }}>→</span>
          </a>

          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <a
              href="#all-features"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.8rem",
                color: "var(--muted)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>Compare all features</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
