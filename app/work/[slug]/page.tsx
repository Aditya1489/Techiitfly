import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PROJECTS, getProjectBySlug } from "@/content/projects";
import { SITE } from "@/content/site";
import TabbedScreenshotShowcase from "@/components/sections/TabbedScreenshotShowcase";
import StickyScrollShowcase from "@/components/sections/StickyScrollShowcase";
import MathsyMeetMediaSlot from "@/components/sections/MathsyMeetMediaSlot";
import MathsyCaseStudy from "@/components/work/MathsyCaseStudy";

// Generate static params for all case studies (static export required)
export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} Case Study | techiitfly`,
      description: project.summary,
      url: `${SITE.siteUrl}/work/${project.slug}`,
      images: project.featuredScreenshots.desktop
        ? [{ url: project.featuredScreenshots.desktop, width: 1200, height: 750, alt: project.title }]
        : [{ url: "/og/home.png", width: 1200, height: 630, alt: project.title }],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          paddingTop: "100px",
          paddingBottom: "80px",
        }}
      >
        <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "0 24px" }}>
          {/* Back button */}
          <Link
            href="/#work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.85rem",
              color: "var(--muted)",
              textDecoration: "none",
              marginBottom: "36px",
            }}
          >
            ← Back to studio work
          </Link>

          {project.slug === "mathsy" ? (
            <MathsyCaseStudy project={project} />
          ) : (
            <>
              {/* Hero details */}
              <div style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span className="section-label">{project.category}</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.72rem",
                  color: "#34d399",
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  padding: "2px 8px",
                  borderRadius: "999px",
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981" }} />
                Live
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "var(--text)",
                marginBottom: "18px",
              }}
            >
              {project.title}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.25rem",
                lineHeight: 1.5,
                color: "var(--muted)",
                maxWidth: "780px",
                marginBottom: "32px",
              }}
            >
              {project.tagline}
            </p>

            {/* Quick Meta Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px 28px",
                marginBottom: "36px",
              }}
            >
              {project.category !== "Our Product" && (
                <div>
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>
                    CLIENT
                  </span>
                  <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.95rem", color: "var(--text)", fontWeight: 500 }}>
                    {project.client}
                  </span>
                </div>
              )}

              <div>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>
                  ROLE
                </span>
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.95rem", color: "var(--text)", fontWeight: 500 }}>
                  {project.role}
                </span>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>
                  LIVE DEPLOYMENT
                </span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.95rem",
                    color: "var(--accent)",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {project.liveUrl.replace("https://", "")} ↗
                </a>
              </div>
            </div>
          </div>

          {/* Metrics summary if present */}
          {project.metrics && project.metrics.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
                marginBottom: "56px",
              }}
            >
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "20px",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--muted)" }}>
                    {m.label}
                  </span>
                  <div
                    style={{
                      fontFamily: "var(--font-instrument-serif)",
                      fontSize: "2rem",
                      color: "var(--accent)",
                      marginTop: "4px",
                      marginBottom: "4px",
                    }}
                  >
                    {m.value}
                  </div>
                  <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.8rem", color: "var(--muted)" }}>
                    {m.note}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 6-step Sticky Showcase for Mathsy, Tabbed for others */}
          {project.slug === "mathsy" && project.glorifiedScreenshots && project.glorifiedScreenshots.length > 0 ? (
            <StickyScrollShowcase
              items={project.glorifiedScreenshots}
              title="Production Platform Showcase"
              subtitle="Tour production interfaces across the student learning portal, test series engine, tutor evaluation queue, and practice modules."
            />
          ) : (
            project.glorifiedScreenshots && project.glorifiedScreenshots.length > 0 && (
              <TabbedScreenshotShowcase
                items={project.glorifiedScreenshots}
                title={`${project.title} Production Platform Suite`}
                subtitle="Production captures of the student telemetry, proctored exams, testing engine, and digital evaluation booklet."
              />
            )
          )}

          {/* Visual Evidence / Live Screenshots Gallery */}
          {project.featuredScreenshots?.desktop && (
            <div style={{ marginBottom: "64px" }}>
              <span className="section-label">LIVE DEPLOYMENT EVIDENCE</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "2.2rem",
                  color: "var(--text)",
                  marginTop: "8px",
                  marginBottom: "24px",
                }}
              >
                Production Interface Screenshots
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: project.featuredScreenshots?.mobile ? "1fr 280px" : "1fr",
                  gap: "24px",
                  alignItems: "start",
                }}
              >
                {/* Desktop Viewport Browser Frame */}
                <div
                  style={{
                    background: "#12100E",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.7)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 16px",
                      background: "#181512",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ef4444", opacity: 0.8 }} />
                        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#f59e0b", opacity: 0.8 }} />
                        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#10b981", opacity: 0.8 }} />
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: "0.75rem",
                          color: "var(--text)",
                          background: "rgba(0,0,0,0.35)",
                          padding: "3px 10px",
                          borderRadius: "4px",
                        }}
                      >
                        🔒 {project.liveUrl}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.72rem",
                        color: "#34d399",
                      }}
                    >
                      ● 1440x900 Desktop
                    </span>
                  </div>
                  <img
                    src={project.featuredScreenshots.desktop}
                    alt={`${project.title} live desktop interface`}
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

                {/* Mobile Viewport Phone Frame */}
                {project.featuredScreenshots.mobile && (
                  <div
                    style={{
                      background: "#12100E",
                      border: "1px solid var(--border)",
                      borderRadius: "24px",
                      overflow: "hidden",
                      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.7)",
                      maxWidth: "280px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 14px",
                        background: "#181512",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: "0.7rem",
                          color: "var(--muted)",
                        }}
                      >
                        390x844 Mobile
                      </span>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
                    </div>
                    <img
                      src={project.featuredScreenshots.mobile}
                      alt={`${project.title} live mobile interface`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        aspectRatio: "390 / 844",
                        objectFit: "cover",
                        objectPosition: "top",
                        display: "block",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Overview & Challenge & Solution */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px", marginBottom: "64px" }}>
            {/* Overview */}
            <section>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "1.8rem",
                  color: "var(--text)",
                  marginBottom: "12px",
                }}
              >
                Project Overview
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  color: "var(--muted)",
                }}
              >
                {project.summary}
              </p>
            </section>

            {/* Challenge */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "36px 32px",
              }}
            >
              <span className="section-label">THE CHALLENGE</span>
              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginTop: "8px",
                  marginBottom: "12px",
                }}
              >
                What needed solving
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.98rem",
                  lineHeight: 1.65,
                  color: "var(--muted)",
                }}
              >
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "36px 32px",
              }}
            >
              <span className="section-label">THE ARCHITECTURE & SOLUTION</span>
              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginTop: "8px",
                  marginBottom: "12px",
                }}
              >
                How we engineered it
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.98rem",
                  lineHeight: 1.65,
                  color: "var(--muted)",
                }}
              >
                {project.solution}
              </p>
            </div>
          </div>

          {/* Portals Breakdown (For Mathsy) */}
          {project.portals && project.portals.length > 0 && (
            <section style={{ marginBottom: "64px" }}>
              <div style={{ marginBottom: "28px" }}>
                <span className="section-label">SYSTEM ARCHITECTURE</span>
                <h2
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "2.2rem",
                    color: "var(--text)",
                    marginTop: "6px",
                  }}
                >
                  4 Synchronized Portals
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "20px",
                }}
              >
                {project.portals.map((portal) => (
                  <div
                    key={portal.title}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      padding: "26px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <h3 style={{ fontFamily: "var(--font-geist-sans)", fontSize: "1.15rem", fontWeight: 600, color: "var(--text)" }}>
                      {portal.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--muted)" }}>
                      {portal.description}
                    </p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
                      {portal.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            fontFamily: "var(--font-geist-sans)",
                            fontSize: "0.82rem",
                            color: "var(--text)",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                          }}
                        >
                          <span style={{ color: "var(--accent)" }}>✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Flagship Virtual Classroom module (Mathsy Meet) */}
          {project.flagshipModule && (
            <section
              style={{
                background: "linear-gradient(135deg, rgba(34,31,26,0.9) 0%, rgba(26,24,20,0.95) 100%)",
                border: "1px solid rgba(245,158,11,0.25)",
                borderRadius: "var(--radius-lg)",
                padding: "44px 36px",
                marginBottom: "64px",
              }}
            >
              <span className="section-label">FLAGSHIP SUB-PRODUCT</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "2.4rem",
                  color: "var(--text)",
                  marginTop: "6px",
                  marginBottom: "12px",
                }}
              >
                {project.flagshipModule.name}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  color: "var(--muted)",
                  maxWidth: "760px",
                  marginBottom: "28px",
                }}
              >
                {project.flagshipModule.description}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "14px",
                  marginBottom: "28px",
                }}
              >
                {project.flagshipModule.highlights.map((h) => (
                  <div
                    key={h}
                    style={{
                      background: "rgba(14,13,11,0.5)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      color: "var(--text)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <span style={{ color: "var(--accent)" }}>◆</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Mathsy Meet Real Screenshot / Video Slot */}
              <MathsyMeetMediaSlot />

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {project.flagshipModule.stack.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.75rem",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: "var(--surface)",
                      color: "var(--muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Key Features List */}
          <section style={{ marginBottom: "64px" }}>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "1.8rem",
                color: "var(--text)",
                marginBottom: "20px",
              }}
            >
              Key Deliverables & Implemented Features
            </h2>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "28px",
              }}
            >
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
                {project.keyFeatures.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.95rem",
                      color: "var(--text)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <span style={{ color: "var(--accent)", fontSize: "1.1rem", lineHeight: 1 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Full Tech Stack */}
          <section style={{ marginBottom: "72px" }}>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "1.8rem",
                color: "var(--text)",
                marginBottom: "16px",
              }}
            >
              Technology Stack
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {project.stack.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.85rem",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    background: "var(--surface)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Bottom CTA Card */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "48px 36px",
              textAlign: "center",
            }}
          >
            <span className="section-label">LET&apos;S TALK</span>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "var(--text)",
                marginTop: "10px",
                marginBottom: "14px",
              }}
            >
              Discuss a project like this
            </h2>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1rem",
                color: "var(--muted)",
                maxWidth: "580px",
                margin: "0 auto 28px",
              }}
            >
              Whether you need a full learning platform, virtual classroom tools, or a high-converting course site, we can build it.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  background: "var(--accent)",
                  color: "#0e0d0b",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Discuss on WhatsApp →
              </a>
              <Link
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "12px 22px",
                  borderRadius: "8px",
                  background: "transparent",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  textDecoration: "none",
                }}
              >
                Contact Form
              </Link>
            </div>
            {project.slug === "mathsy" && (
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  marginTop: "24px",
                  marginBottom: 0,
                }}
              >
                Looking for our live class and video platform?{" "}
                <Link
                  href="/mathsy-meet"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "underline",
                    fontWeight: 500,
                  }}
                >
                  Explore Mathsy Meet →
                </Link>
              </p>
            )}
          </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
