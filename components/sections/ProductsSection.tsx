"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProductCardProps {
  badge: string;
  title: string;
  tagline: string;
  points: string[];
  imageSrc: string;
  imageAlt: string;
  href: string;
  ctaText: string;
}

function ProductCard({
  badge,
  title,
  tagline,
  points,
  imageSrc,
  imageAlt,
  href,
  ctaText,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Badge Header Row (ABOVE screenshot) */}
      <div
        style={{
          padding: "16px 24px 12px",
          background: "var(--surface-2)",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "var(--accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: "var(--accent-dim)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "3px 8px",
          }}
        >
          {badge}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.68rem",
            color: "#34d399",
          }}
        >
          ● Live Platform
        </span>
      </div>

      {/* Visual Screenshot Preview (clean without badge overlay) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          background: "#080807",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "2rem",
            fontWeight: 400,
            color: "var(--text)",
            marginBottom: "8px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.98rem",
            color: "var(--muted)",
            lineHeight: 1.55,
            marginBottom: "20px",
          }}
        >
          {tagline}
        </p>

        {/* 3 Key Points */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 28px 0",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flexGrow: 1,
          }}
        >
          {points.map((pt, i) => (
            <li
              key={i}
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
              <span
                style={{
                  color: "var(--accent)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  lineHeight: 1,
                }}
              >
                ✓
              </span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <Link
          href={href}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            borderRadius: "6px",
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.92rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text)";
          }}
        >
          <span>{ctaText}</span>
          <span style={{ fontSize: "1.1rem" }}>→</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  return (
    <section
      id="products-overview"
      style={{
        position: "relative",
        background: "var(--bg)",
        padding: "80px 24px 100px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        {/* Header with mandatory Bridge Line */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            className="section-label"
            style={{
              marginBottom: "12px",
              display: "inline-block",
            }}
          >
            STANDALONE PRODUCTS & PLATFORM LICENSING
          </p>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginBottom: "14px",
            }}
          >
            The platform we built is now available for your institute.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.06rem",
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Choose between licensing our complete 4-portal institute system or equipping your tutors with our standalone live geometry classroom.
          </p>
        </div>

        {/* 2 Product Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          <ProductCard
            badge="For Coaching Institutes"
            title="Mathsy for Institutes"
            tagline="Run your entire coaching academy on one unified, custom-branded platform."
            points={[
              "4 synchronized portals for students, tutors, parents, and administration.",
              "Schedule batches, track student attendance, and evaluate test series.",
              "Custom branded to your academy with your own domain and logo.",
            ]}
            imageSrc="/screenshots/mathsy/mathsy-tutor-dashboard-desktop.webp"
            imageAlt="Mathsy for Institutes administrative and tutor dashboard"
            href="/mathsy-for-institutes"
            ctaText="Explore Mathsy for Institutes"
          />

          <ProductCard
            badge="For Individual Tutors"
            title="Mathsy Meet"
            tagline="Live online classroom engineered with precision math and geometry tools."
            points={[
              "Live classes with built-in math tools: compass, protractor, and ruler.",
              "Interactive question polls, student hand-raising, and stylus drawing support.",
              "Runs directly in the browser with instant post-class notes export.",
            ]}
            imageSrc="/screenshots/mathsy-meet-desktop.webp"
            imageAlt="Mathsy Meet live math classroom with interactive tools"
            href="/mathsy-meet"
            ctaText="Explore Mathsy Meet"
          />
        </div>
      </div>
    </section>
  );
}
