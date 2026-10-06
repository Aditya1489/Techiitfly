"use client";

import Link from "next/link";
import { SITE, getConsultUrl } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

interface ServiceCard {
  id: string;
  name: string;
  badge?: string;
  description: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
  secondaryHref?: string;
  secondaryText?: string;
  isExternal?: boolean;
}

export default function ServicesSection() {
  const WHATSAPP = SITE.phoneRaw.replace(/[^0-9]/g, "");

  const services: ServiceCard[] = [
    {
      id: "websites",
      name: "Websites",
      badge: "MOST POPULAR",
      description: "Custom, mobile-friendly websites built for speed and conversions. Live on your domain in 7 days.",
      bullets: [
        "Up to 5–15+ pages tailored to your business",
        "Mobile-first, WhatsApp button & lead capture",
        "7-day delivery guarantee & full code ownership",
      ],
      ctaText: "Get a quote",
      ctaHref: getConsultUrl(),
      isExternal: true,
    },
    {
      id: "seo",
      name: "SEO & AI search visibility",
      description: "Get found on Google and by AI assistants like ChatGPT.",
      bullets: [
        "Google Business Profile",
        "AI-ready structured data",
        "Monthly progress reports",
      ],
      ctaText: "Get a quote",
      ctaHref: getConsultUrl(),
      secondaryHref: "/pricing#seo",
      secondaryText: "See plans →",
      isExternal: true,
    },
  ];

  if (SITE.showAppServices) {
    services.push({
      id: "apps",
      name: "Mobile Apps",
      description: "Cross-platform iOS and Android apps built for customer traction. From MVP prototypes to scale.",
      bullets: [
        "Single clean codebase for iOS and Android",
        "User authentication, payments & notifications",
        "App Store & Google Play publishing included",
      ],
      ctaText: "Get a quote",
      ctaHref: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        "Hi techiitfly, I'm interested in a mobile app project."
      )}`,
      isExternal: true,
    });
  }

  services.push({
    id: "maintenance",
    name: "Maintenance & Support",
    description: "Ongoing security updates, speed checks, and content edits so your digital presence never breaks.",
    bullets: [
      "Regular security patches, backups & speed checks",
      "Fast turnaround for design and text updates",
      "Technical support and domain/hosting care",
    ],
    ctaText: "Get a quote",
    ctaHref: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
      "Hi techiitfly, I'd like to discuss website maintenance & support."
    )}`,
    isExternal: true,
  });

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
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
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
            Fast turnaround, clean code, and zero surprises. Pick the right foundation for your business.
          </p>
        </div>

        {/* Services Cards Grid (No prices on home page) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
            gap: "24px",
            alignItems: "stretch",
            marginBottom: "32px",
          }}
        >
          {services.map((svc) => (
            <div
              key={svc.id}
              style={{
                background: "var(--surface)",
                border: svc.badge ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                boxShadow: svc.badge ? "0 12px 36px rgba(245,158,11,0.12)" : "var(--card-shadow)",
                position: "relative",
              }}
            >
              {svc.badge && (
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
                  {svc.badge}
                </span>
              )}

              <h3
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "1.75rem",
                  color: "var(--text)",
                  marginBottom: "8px",
                }}
              >
                {svc.name}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  color: "var(--muted)",
                  lineHeight: 1.55,
                  minHeight: "44px",
                  marginBottom: "20px",
                }}
              >
                {svc.description}
              </p>

              {/* 3 Bullets */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flex: 1,
                }}
              >
                {svc.bullets.map((b) => (
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
                    <span style={{ color: "var(--accent)", fontSize: "0.95rem", lineHeight: 1 }}>✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Get a quote button */}
              <a
                href={svc.ctaHref}
                target={svc.isExternal ? "_blank" : undefined}
                rel={svc.isExternal ? "noopener noreferrer" : undefined}
                onClick={() =>
                  trackEvent(
                    svc.id === "websites" || svc.id === "seo" ? "consult_click" : "whatsapp_click",
                    `services_${svc.id}`
                  )
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "12px 18px",
                  borderRadius: "8px",
                  background: svc.badge ? "var(--accent)" : "transparent",
                  color: svc.badge ? "var(--primary-btn-text)" : "var(--text)",
                  border: svc.badge ? "none" : "1px solid var(--border)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
              >
                <span>{svc.ctaText}</span>
                <span>→</span>
              </a>

              {svc.secondaryHref && (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <Link
                    href={svc.secondaryHref}
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.84rem",
                      fontWeight: 600,
                      color: "var(--accent)",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {svc.secondaryText || "See plans →"}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Small link under the cards: "See starting prices →" (/pricing) */}
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Link
            href="/pricing"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--accent)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            See starting prices →
          </Link>
        </div>
      </div>
    </section>
  );
}
