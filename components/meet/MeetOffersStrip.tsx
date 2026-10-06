"use client";

import { PRICING_CONFIG } from "@/content/pricing";

export default function MeetOffersStrip() {
  const { offers } = PRICING_CONFIG.meet;

  const items: { label: string; tag: string }[] = [];

  if (offers.freeSetupCall?.enabled) {
    items.push({
      label: "Free setup call",
      tag: "Live Walkthrough",
    });
  }

  if (offers.referral?.enabled) {
    items.push({
      label: `Refer a tutor, get ${offers.referral.reward}`,
      tag: "Referral Bonus",
    });
  }

  if (offers.foundingPrice?.enabled) {
    items.push({
      label: `First ${offers.foundingPrice.seats} tutors keep their price for life`,
      tag: "Founding Offer",
    });
  }

  if (offers.moneyBack?.enabled) {
    items.push({
      label: `${offers.moneyBack.days}-day money-back promise`,
      tag: "Guaranteed",
    });
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto 36px",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1px dashed var(--accent)",
          borderRadius: "var(--radius)",
          padding: "16px 20px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px 28px",
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.88rem",
              fontWeight: 500,
              color: "var(--text)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "var(--accent)",
                background: "rgba(245, 158, 11, 0.12)",
                padding: "2px 7px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              {item.tag}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
