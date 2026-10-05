import Link from "next/link";
import { SITE } from "@/content/site";

export default function OffersSection() {
  const offers = [
    {
      id: "websites",
      title: "Websites",
      target: "For growing businesses & academies",
      badge: "7-Day Delivery",
      bullets: [
        "Mobile-friendly design launched live on your domain.",
        "WhatsApp booking button and lead capture contact form.",
        "Search engine setup with Google Maps integration.",
      ],
      price: "Starting at ₹9,999 · live in 7 days",
      cta: "View website packages →",
      href: "/pricing",
      primary: true,
    },
    {
      id: "institutes",
      title: "Mathsy for Institutes",
      target: "For coaching classes & schools",
      badge: "Platform Licensing",
      bullets: [
        "4 dedicated portals for students, tutors, parents, and admin.",
        "Class scheduling, attendance tracking, and test evaluation.",
        "Custom branding with your institute logo and domain.",
      ],
      price: SITE.mathsyInstitutesPrice || null,
      cta: "Book an institute demo →",
      href: "/mathsy-for-institutes",
      primary: false,
    },
    {
      id: "tutors",
      title: "Mathsy Meet for Tutors",
      target: "For individual tutors & teachers",
      badge: "Live Classroom Tool",
      bullets: [
        "Live classroom with virtual compass, protractor, and ruler tools.",
        "Interactive polls, live hand-raise queue, and stylus support.",
        "Instant class notes exported to student PDFs automatically.",
      ],
      price: SITE.mathsyMeetPrice || null,
      cta: "Get tutor access →",
      href: "/mathsy-meet",
      primary: false,
    },
  ];

  return (
    <section
      id="offers"
      style={{
        background: "var(--bg)",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-label">WHAT WE OFFER</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "10px",
              marginBottom: "12px",
            }}
          >
            Fixed-Scope Packages &amp; Products
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
            Transparent pricing, clear timelines, and zero surprises. Pick the right foundation for your business.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {offers.map((offer) => (
            <div
              key={offer.id}
              style={{
                background: "var(--surface)",
                border: offer.primary ? "1px solid var(--accent)" : "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                boxShadow: offer.primary
                  ? "0 10px 30px rgba(245,158,11,0.12)"
                  : "var(--card-shadow)",
                position: "relative",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.7rem",
                    color: "var(--accent)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {offer.badge}
                </span>
              </div>

              {/* Title & Target */}
              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "4px",
                }}
              >
                {offer.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  marginBottom: "22px",
                }}
              >
                {offer.target}
              </p>

              {/* 3 Bullets */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 24px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flexGrow: 1,
                }}
              >
                {offer.bullets.map((b) => (
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

              {/* Price Line (only shown if price string exists) */}
              {offer.price && (
                <div
                  style={{
                    paddingTop: "16px",
                    borderTop: "1px solid var(--border)",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.85rem",
                      color: "var(--accent)",
                      fontWeight: 600,
                    }}
                  >
                    {offer.price}
                  </span>
                </div>
              )}

              {/* CTA Link */}
              <Link
                href={offer.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  background: offer.primary ? "var(--accent)" : "var(--surface-2)",
                  color: offer.primary ? "#0e0d0b" : "var(--text)",
                  border: offer.primary ? "none" : "1px solid var(--border)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  textAlign: "center",
                  marginTop: offer.price ? "0" : "auto",
                }}
              >
                <span>{offer.cta}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
