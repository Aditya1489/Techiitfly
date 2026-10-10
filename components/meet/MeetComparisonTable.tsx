"use client";

import { getActiveComparisonRows, MeetComparisonRow } from "@/content/meetFeatures";

export default function MeetComparisonTable() {
  const rows: MeetComparisonRow[] = getActiveComparisonRows();

  return (
    <section
      id="comparison"
      style={{
        padding: "85px 24px 95px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-label">PLATFORM COMPARISON</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "12px",
            }}
          >
            Mathsy Meet vs Google Meet vs Zoom
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Google Meet and Zoom are great for meetings. Mathsy Meet is built for teaching maths.
          </p>
        </div>

        {/* Responsive Table Container with Horizontal Scroll & Sticky First Column */}
        <div
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            background: "var(--bg)",
            boxShadow: "var(--card-shadow)",
            marginBottom: "24px",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "720px",
              borderCollapse: "separate",
              borderSpacing: 0,
              textAlign: "left",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.92rem",
            }}
          >
            <thead>
              <tr style={{ background: "var(--surface-2)" }}>
                <th
                  style={{
                    padding: "18px 20px",
                    fontWeight: 600,
                    color: "var(--muted)",
                    fontSize: "0.82rem",
                    fontFamily: "var(--font-geist-mono)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    width: "28%",
                    borderBottom: "1px solid var(--border)",
                    position: "sticky",
                    left: 0,
                    background: "var(--surface-2)",
                    zIndex: 2,
                  }}
                >
                  Feature
                </th>
                <th
                  style={{
                    padding: "18px 18px",
                    fontWeight: 600,
                    color: "var(--text)",
                    fontSize: "0.95rem",
                    width: "24%",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  Google Meet
                </th>
                <th
                  style={{
                    padding: "18px 18px",
                    fontWeight: 600,
                    color: "var(--text)",
                    fontSize: "0.95rem",
                    width: "24%",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  Zoom
                </th>
                <th
                  style={{
                    padding: "18px 20px",
                    fontWeight: 700,
                    color: "var(--accent)",
                    fontSize: "1.05rem",
                    width: "24%",
                    background: "rgba(245, 158, 11, 0.08)",
                    borderBottom: "2px solid var(--accent)",
                    borderLeft: "1px solid rgba(245, 158, 11, 0.25)",
                    borderRight: "1px solid rgba(245, 158, 11, 0.25)",
                  }}
                >
                  Mathsy Meet ★
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                const isEven = idx % 2 === 0;
                const rowBg = isEven ? "transparent" : "var(--surface)";

                return (
                  <tr key={row.feature} style={{ background: rowBg }}>
                    {/* Sticky Feature Column */}
                    <td
                      style={{
                        padding: "15px 20px",
                        fontWeight: 600,
                        color: "var(--text)",
                        borderBottom: "1px solid var(--border)",
                        position: "sticky",
                        left: 0,
                        background: isEven ? "var(--bg)" : "var(--surface)",
                        zIndex: 1,
                      }}
                    >
                      {row.feature}
                    </td>

                    {/* Google Meet */}
                    <td
                      style={{
                        padding: "15px 18px",
                        color: "var(--muted)",
                        lineHeight: 1.45,
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {row.googleMeet}
                    </td>

                    {/* Zoom */}
                    <td
                      style={{
                        padding: "15px 18px",
                        color: "var(--muted)",
                        lineHeight: 1.45,
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {row.zoom}
                    </td>

                    {/* Mathsy Meet (Highlighted Column) */}
                    <td
                      style={{
                        padding: "15px 20px",
                        fontWeight: 600,
                        color: "var(--text)",
                        lineHeight: 1.45,
                        background: "rgba(245, 158, 11, 0.06)",
                        borderBottom: "1px solid var(--border)",
                        borderLeft: "1px solid rgba(245, 158, 11, 0.2)",
                        borderRight: "1px solid rgba(245, 158, 11, 0.2)",
                      }}
                    >
                      {row.mathsyMeet}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Small Notes Under Table */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "0 6px" }}>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.8rem",
              color: "var(--muted)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Comparison based on publicly available information as of October 2026. Google Meet and Zoom features vary by plan.
          </p>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.8rem",
              color: "var(--muted)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Google Meet and Zoom are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </section>
  );
}
