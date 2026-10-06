"use client";

export default function ComparisonTable() {
  const rows = [
    {
      feature: "Price",
      diy: "Monthly fees",
      freelancer: "Varies",
      agency: "High",
      techiitfly: "Fixed price, agreed upfront",
    },
    {
      feature: "Time to launch",
      diy: "Your own time",
      freelancer: "Unclear",
      agency: "4–12 weeks",
      techiitfly: "7 days, guaranteed",
    },
    {
      feature: "Done for you",
      diy: "No",
      freelancer: "Yes",
      agency: "Yes",
      techiitfly: "Yes",
    },
    {
      feature: "Delivery guarantee",
      diy: "No",
      freelancer: "Rarely",
      agency: "Rarely",
      techiitfly: "Yes",
    },
    {
      feature: "You own the code",
      diy: "Often no",
      freelancer: "Varies",
      agency: "Varies",
      techiitfly: "Yes",
    },
  ];

  return (
    <section
      id="comparison"
      style={{
        padding: "80px 24px",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-label">COMPARISON</span>
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
            Why businesses choose techiitfly
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
            Compare how we deliver compared to DIY builders, freelancers, and traditional agencies.
          </p>
        </div>

        {/* Comparison Table with Horizontal Scroll on Mobile */}
        <div
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "640px",
              borderCollapse: "collapse",
              textAlign: "left",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.92rem",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
                <th style={{ padding: "18px 20px", color: "var(--muted)", fontWeight: 600, width: "24%" }}>
                  Criteria
                </th>
                <th style={{ padding: "18px 16px", color: "var(--muted)", fontWeight: 500, width: "18%" }}>
                  DIY builder
                </th>
                <th style={{ padding: "18px 16px", color: "var(--muted)", fontWeight: 500, width: "18%" }}>
                  Freelancer
                </th>
                <th style={{ padding: "18px 16px", color: "var(--muted)", fontWeight: 500, width: "18%" }}>
                  Agency
                </th>
                <th
                  style={{
                    padding: "18px 20px",
                    color: "var(--accent)",
                    fontWeight: 700,
                    width: "22%",
                    background: "var(--accent-dim)",
                    borderLeft: "2px solid var(--accent)",
                  }}
                >
                  techiitfly ★
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr
                  key={r.feature}
                  style={{
                    borderBottom: idx === rows.length - 1 ? "none" : "1px solid var(--border)",
                  }}
                >
                  <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--text)" }}>
                    {r.feature}
                  </td>
                  <td style={{ padding: "16px 16px", color: "var(--muted)" }}>
                    {r.diy}
                  </td>
                  <td style={{ padding: "16px 16px", color: "var(--muted)" }}>
                    {r.freelancer}
                  </td>
                  <td style={{ padding: "16px 16px", color: "var(--muted)" }}>
                    {r.agency}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      color: "var(--accent)",
                      fontWeight: 600,
                      background: "var(--accent-dim)",
                      borderLeft: "2px solid var(--accent)",
                    }}
                  >
                    {r.techiitfly}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
