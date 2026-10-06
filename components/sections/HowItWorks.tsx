"use client";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Free call",
      description: "Tell us about your business. Get a fixed price within 24 hours.",
    },
    {
      number: "02",
      title: "Send your content",
      description: "Text, photos and logo. We handle the rest.",
    },
    {
      number: "03",
      title: "Go live",
      description: "Your website is live on your domain within 7 days.",
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        padding: "80px 24px",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-label">HOW IT WORKS</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "12px",
            }}
          >
            Your website in 3 simple steps
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: "580px",
              margin: "0 auto",
            }}
          >
            A clear, predictable roadmap from initial discussion to launch.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "28px",
          }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "36px 30px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                }}
              >
                {step.number}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "1.7rem",
                  fontWeight: 400,
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.95rem",
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
