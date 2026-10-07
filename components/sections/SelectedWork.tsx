"use client";

import Link from "next/link";
import Image from "next/image";
import { WORK_PROJECTS, WorkProject } from "@/content/work";

export default function SelectedWork() {
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
          <span className="section-label">OUR WORK</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "12px",
            }}
          >
            Websites that are working for real businesses
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Clean design, fast load times, and built-in conversion paths that bring in enquiries from day one.
          </p>
        </div>

        {/* 3 Work Cards: YogaGarhi, Yogic Path, Mathsy (all client work) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            alignItems: "stretch",
          }}
        >
          {WORK_PROJECTS.map((project: WorkProject) => {
            const screenshotUrl = project.screenshots.desktop || "/screenshots/yogagarhi-desktop.webp";

            return (
              <article
                key={project.slug}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "var(--card-shadow)",
                  position: "relative",
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                }}
              >
                {/* Screenshot Container */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 10",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    marginBottom: "20px",
                    background: "var(--bg)",
                  }}
                >
                  <Image
                    src={screenshotUrl}
                    alt={`${project.title} live interface preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>

                {/* Client Name & Title */}
                <div style={{ marginBottom: "16px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {project.client}
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
                    {project.title}
                  </h3>
                </div>

                {/* Problem & What we built & Result */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px", flex: 1 }}>
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--accent)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "3px",
                      }}
                    >
                      Problem
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "0.88rem",
                        lineHeight: 1.5,
                        color: "var(--muted)",
                        margin: 0,
                      }}
                    >
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--accent)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "3px",
                      }}
                    >
                      What we built
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "0.88rem",
                        lineHeight: 1.5,
                        color: "var(--muted)",
                        margin: 0,
                      }}
                    >
                      {project.built}
                    </p>
                  </div>

                  {project.result && project.result.trim().length > 0 && (
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "var(--accent)",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "3px",
                        }}
                      >
                        Result
                      </span>
                      <p
                        style={{
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "0.88rem",
                          lineHeight: 1.5,
                          color: "var(--muted)",
                          margin: 0,
                        }}
                      >
                        {project.result}
                      </p>
                    </div>
                  )}
                </div>

                {/* CTAs: See live site and Read the story */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "16px",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--accent)",
                      textDecoration: "none",
                    }}
                  >
                    See live site ↗
                  </a>
                  <Link
                    href={`/work/${project.slug}`}
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "var(--text)",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    Read the story →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
