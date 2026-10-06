"use client";

export default function MeetBenefitsSection() {
  const benefits = [
    {
      title: "Flat monthly price",
      desc: "No per-minute fees. Transparent flat monthly rate with no surprise bandwidth bills or session limits.",
      badge: "Transparent",
    },
    {
      title: "Students join from a link",
      desc: "No app, no student accounts needed. Students click a secure link in their browser and enter instantly.",
      badge: "Zero Setup",
    },
    {
      title: "Built for maths teaching",
      desc: "Compass, protractor, ruler, set-squares built right into the whiteboard with true-arc snapping.",
      badge: "Math-First",
    },
    {
      title: "Write naturally with a tablet",
      desc: "Silent pen pairing with Apple Pencil, iPad, and Wacom graphics tablets while monitoring student video feeds on your laptop.",
      badge: "Hardware Agnostic",
    },
    {
      title: "Notes done for you",
      desc: "PDF after class packaged automatically with every stroke and geometric annotation the moment your lecture ends.",
      badge: "Automated",
    },
    {
      title: "Made for your needs",
      desc: "Request features; we build them. Need custom question tools or parent reports? We tailor the classroom to you.",
      badge: "Customizable",
    },
  ];

  return (
    <section
      style={{
        padding: "70px 24px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-label">BUILT FOR EDUCATORS</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
              fontWeight: 400,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "12px",
            }}
          >
            Why tutors choose Mathsy Meet.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1rem",
              color: "var(--muted)",
              maxWidth: "640px",
              margin: "0 auto",
              lineHeight: 1.55,
            }}
          >
            Built by engineers and educators to eliminate everything frustrating about generic video calling software.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "22px",
          }}
        >
          {benefits.map((b, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    background: "rgba(245, 158, 11, 0.1)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {b.badge}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                  }}
                >
                  0{idx + 1}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "10px",
                }}
              >
                {b.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  color: "var(--muted)",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
