import Link from "next/link";
import { PROJECTS } from "@/content/projects";

export default function SelectedWork() {
  const mathsy = PROJECTS.find((p) => p.slug === "mathsy");
  const yogagarhi = PROJECTS.find((p) => p.slug === "yogagarhi");
  const yogicpath = PROJECTS.find((p) => p.slug === "yogicpath");

  const cards = [
    {
      project: mathsy,
      bullets: [
        "4 synchronized portals for students, tutors, parents, and admin.",
        "Mathsy Meet live classroom with built-in geometry tools.",
        "Proctored exam engine with digital booklet evaluation.",
      ],
      featuredImage: "/screenshots/mathsy/mathsy-student-dashboard-desktop.webp",
      alt: "Mathsy platform student portal interface",
      isFlagship: true,
    },
    {
      project: yogagarhi,
      bullets: [
        "Interactive Ayurveda Prakriti diagnostic quiz capturing qualified leads.",
        "Retreat cohort countdown timers and student video testimonials.",
        "WhatsApp booking CTAs pre-filling the selected retreat course.",
      ],
      featuredImage: "/screenshots/yogagarhi-desktop.webp",
      alt: "YogaGarhi live website interface",
      isFlagship: false,
    },
    {
      project: yogicpath,
      bullets: [
        "Gated syllabus brochure download capturing student inquiries.",
        "200-Hour and 300-Hour interactive certification curriculum.",
        "Campus landing pages across Rishikesh, Kerala, and Bali.",
      ],
      featuredImage: "/screenshots/yogicpath-desktop.webp",
      alt: "Yogic Path teacher training platform interface",
      isFlagship: false,
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
            Production Platforms &amp; Client Websites
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
            High-converting digital presence and full-stack software engineered for education and wellness businesses.
          </p>
        </div>

        {/* 3 Work Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            alignItems: "stretch",
          }}
        >
          {cards.map(({ project, bullets, featuredImage, alt, isFlagship }) => {
            if (!project) return null;

            return (
              <article
                key={project.slug}
                style={{
                  background: "var(--surface)",
                  border: isFlagship ? "1px solid var(--accent)" : "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: isFlagship
                    ? "0 12px 36px rgba(245,158,11,0.12)"
                    : "var(--card-shadow)",
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
                    Live
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "2rem",
                    fontWeight: 400,
                    color: "var(--text)",
                    marginBottom: "6px",
                  }}
                >
                  {project.title}
                </h3>

                {/* One-line subtitle */}
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.9rem",
                    lineHeight: 1.5,
                    color: "var(--muted)",
                    marginBottom: "18px",
                    minHeight: "40px",
                  }}
                >
                  {project.tagline}
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
                    margin: "0 0 20px 0",
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
                        fontSize: "0.86rem",
                        color: "var(--text)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        lineHeight: 1.4,
                      }}
                    >
                      <span style={{ color: "var(--accent)", lineHeight: 1.2, fontWeight: 700 }}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack in small mono text */}
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    paddingBottom: "16px",
                    marginBottom: "16px",
                    borderBottom: "1px solid var(--border)",
                    lineHeight: 1.4,
                  }}
                >
                  {project.stack.slice(0, 5).join(" · ")}
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <Link
                    href={`/work/${project.slug}`}
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.88rem",
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
                      fontSize: "0.82rem",
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
