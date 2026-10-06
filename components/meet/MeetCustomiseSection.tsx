"use client";

import { SITE } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

export default function MeetCustomiseSection() {
  const phone = SITE.phoneRaw.replace(/[^0-9]/g, "");
  const waHref = `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hi techiitfly, I'd like a custom feature in Mathsy Meet: "
  )}`;

  const examples = [
    "Your logo and colours",
    "Subject-specific tools",
    "Custom quiz formats",
    "Class reports for parents",
    "Integrations with your existing tools",
  ];

  const steps = [
    { num: "01", title: "Tell us your idea", desc: "Share your classroom workflow or the specific tool your students need." },
    { num: "02", title: "Get a clear quote and timeline", desc: "We provide an upfront cost and fixed delivery date—no guesswork." },
    { num: "03", title: "We build it into your classroom", desc: "Engineered and deployed directly into your live teaching environment." },
  ];

  const handleRequestClick = () => {
    trackEvent("feature_request", "meet_customise_section", {
      item_name: "Mathsy Meet Custom Feature Request",
    });
  };

  return (
    <section
      id="customise"
      style={{
        padding: "85px 24px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-label">CLASSROOM CUSTOMIZATION</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
              fontWeight: 400,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "14px",
            }}
          >
            Shape Mathsy Meet to your teaching.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              color: "var(--muted)",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Every tutor teaches differently. Tell us what your classes need and we&apos;ll build it into your classroom.
          </p>
        </div>

        {/* Examples of what you can request */}
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.78rem",
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "16px",
            }}
          >
            Examples of what you can request
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              maxWidth: "840px",
              margin: "0 auto",
            }}
          >
            {examples.map((item, idx) => (
              <span
                key={idx}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "999px",
                  padding: "8px 18px",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  color: "var(--text)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                ✦ {item}
              </span>
            ))}
          </div>
        </div>

        {/* Mini flow: Tell us idea -> quote -> build */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          {steps.map((st, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "26px 22px",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: "var(--accent)",
                  marginBottom: "8px",
                }}
              >
                {st.num}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "8px",
                }}
              >
                {st.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.86rem",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Note and CTA */}
        <div
          style={{
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            borderRadius: "var(--radius)",
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.95rem",
                color: "var(--text)",
                margin: "0 0 4px",
                fontWeight: 600,
              }}
            >
              Free on the Academy plan. Quoted separately on Solo and Pro.
            </p>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.85rem",
                color: "var(--muted)",
                margin: 0,
              }}
            >
              Have a custom tool idea? Message us directly on WhatsApp to explore how quickly we can build it.
            </p>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleRequestClick}
            style={{
              background: "var(--accent)",
              color: "var(--primary-btn-text)",
              padding: "13px 26px",
              borderRadius: "8px",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
            }}
          >
            <span>Request a feature</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
