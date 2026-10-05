import Link from "next/link";

export default function TryItYourself() {
  const tools = [
    {
      id: "xray",
      title: "Test your website free",
      desc: "Run a free performance & mobile audit on your existing site.",
      badge: "Free Audit",
      cta: "Run free test →",
      href: "/xray",
    },
    {
      id: "lab",
      title: "Try the geometry tools",
      desc: "Test our interactive compass, protractor & ruler in the browser.",
      badge: "Interactive Lab",
      cta: "Launch whiteboard →",
      href: "/lab",
    },
    {
      id: "receipts",
      title: "See live performance receipts",
      desc: "Daily automated Google PageSpeed scores across our client sites.",
      badge: "Daily Proof",
      cta: "View audit logs →",
      href: "/receipts",
    },
  ];

  return (
    <section
      id="try-it-yourself"
      style={{
        background: "var(--bg)",
        padding: "70px 24px",
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-label">INTERACTIVE PROOF</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "10px",
            }}
          >
            Try It Yourself
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1rem",
              lineHeight: 1.5,
              color: "var(--muted)",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Explore live tools, run diagnostics, and inspect verified performance benchmarks.
          </p>
        </div>

        {/* 3 Compact Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                transition: "border-color 0.2s ease, transform 0.2s ease",
                boxShadow: "var(--card-shadow)",
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
                    fontSize: "0.7rem",
                    color: "var(--accent)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {tool.badge}
                </span>
                <span style={{ color: "var(--accent)", fontSize: "1rem" }}>→</span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "6px",
                }}
              >
                {tool.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.86rem",
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  margin: "0 0 16px 0",
                  flexGrow: 1,
                }}
              >
                {tool.desc}
              </p>

              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  marginTop: "auto",
                }}
              >
                {tool.cta}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
