import Link from "next/link";
import { PROJECTS } from "@/content/projects";

export default function SelectedWork() {
  const yogagarhi = PROJECTS.find((p) => p.slug === "yogagarhi");
  const yogicpath = PROJECTS.find((p) => p.slug === "yogicpath");

  const cards = [
    {
      project: yogagarhi,
      clientName: "YogaGarhi",
      outcome: "Turned website traffic into direct retreat bookings with an interactive Ayurvedic diagnostic quiz and instant WhatsApp booking.",
      bullets: [
        "Interactive Prakriti diagnostic quiz capturing qualified leads before booking.",
        "Retreat cohort countdown timers and student video testimonial reels.",
        "Pre-filled WhatsApp booking links directing students to specific retreat dates.",
      ],
      featuredImage: "/screenshots/yogagarhi-desktop.webp",
      alt: "YogaGarhi live retreat website interface",
    },
    {
      project: yogicpath,
      clientName: "Yogic Path",
      outcome: "Positioned the academy to rank globally and convert course inquiries with structured certification curriculum and gated syllabus downloads.",
      bullets: [
        "Gated syllabus brochure download capturing prospective student inquiries.",
        "200-Hour & 300-Hour interactive certification curriculum and schedule.",
        "Campus showcase pages covering Rishikesh, Kerala, and Bali locations.",
      ],
      featuredImage: "/screenshots/yogicpath-desktop.webp",
      alt: "Yogic Path teacher training platform interface",
    },
  ].filter((item) => item.project != null);

  return (
    <section
      id="work"
      style={{
        position: "relative",
        background: "var(--surface-2)",
        padding: "80px 24px 100px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <span className="section-label">SELECTED WORK</span>
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
            Client Websites Built for Real Businesses
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
            Clean design, fast load times, and built-in conversion paths that bring in enquiries from day one.
          </p>
        </div>

        {/* 2 Work Cards (YogaGarhi & Yogic Path) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            alignItems: "stretch",
          }}
        >
          {cards.map(({ project, clientName, outcome, bullets, featuredImage, alt }) => {
            if (!project) return null;

            return (
              <article
                key={project.slug}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "var(--card-shadow)",
                  position: "relative",
                }}
              >
                {/* Category & Status */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.72rem",
                      color: "var(--accent)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.7rem",
                      color: "#34d399",
                      background: "rgba(16,185,129,0.12)",
                      padding: "2px 8px",
                      borderRadius: "999px",
                    }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#10b981" }} />
                    Live Website
                  </span>
                </div>

                {/* Client Name / Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "2.1rem",
                    fontWeight: 400,
                    color: "var(--text)",
                    marginBottom: "8px",
                  }}
                >
                  {clientName}
                </h3>

                {/* Plain-Language Outcome Line */}
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.92rem",
                    lineHeight: 1.55,
                    color: "var(--muted)",
                    marginBottom: "20px",
                    minHeight: "44px",
                  }}
                >
                  {outcome}
                </p>

                {/* Screenshot Preview */}
                <div
                  style={{
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    background: "#12100E",
                    marginBottom: "20px",
                    boxShadow: "0 10px 24px -6px rgba(0,0,0,0.5)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px 12px",
                      background: "#181512",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", opacity: 0.7 }} />
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f59e0b", opacity: 0.7 }} />
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", opacity: 0.7 }} />
                      <span
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: "0.68rem",
                          color: "var(--muted)",
                          marginLeft: "4px",
                        }}
                      >
                        {project.liveUrl.replace("https://", "")}
                      </span>
                    </div>
                  </div>
                  <img
                    src={featuredImage}
                    alt={alt}
                    loading="lazy"
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 10",
                      objectFit: "cover",
                      objectPosition: "top",
                      display: "block",
                    }}
                  />
                </div>

                {/* 3 Bullets */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 24px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    flexGrow: 1,
                  }}
                >
                  {bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "0.88rem",
                        color: "var(--text)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        lineHeight: 1.45,
                      }}
                    >
                      <span style={{ color: "var(--accent)", lineHeight: 1.2, fontWeight: 700 }}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Actions (Read case study + Visit live site) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    paddingTop: "16px",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <Link
                    href={`/work/${project.slug}`}
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--accent)",
                      textDecoration: "none",
                    }}
                  >
                    Read case study →
                  </Link>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      textDecoration: "none",
                    }}
                  >
                    Visit live site ↗
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
