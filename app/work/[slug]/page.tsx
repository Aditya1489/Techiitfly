import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectGallery from "@/components/work/ProjectGallery";
import { PROJECTS, getProjectBySlug } from "@/content/projects";
import { SITE, getConsultUrl } from "@/content/site";

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
    twitter: {
      card: "summary_large_image",
      title: `${project.title} Case Study | techiitfly`,
      description: project.summary,
      images: project.featuredScreenshots.desktop
        ? [project.featuredScreenshots.desktop]
        : ["/og/home.png"],
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
              <div>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--muted)", display: "block", marginBottom: "4px" }}>
                  CLIENT
                </span>
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.95rem", fontWeight: 500, color: "var(--text)" }}>
                  {project.client}
                </span>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--muted)", display: "block", marginBottom: "4px" }}>
                  ROLE
                </span>
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.95rem", fontWeight: 500, color: "var(--text)" }}>
                  {project.role}
                </span>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--muted)", display: "block", marginBottom: "4px" }}>
                  LIVE URL
                </span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "var(--accent)",
                    textDecoration: "underline",
                  }}
                >
                  {project.liveUrl.replace(/^https?:\/\//, "")} ↗
                </a>
              </div>
            </div>
          </div>

          {/* Problem & Solution Split Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
              marginBottom: "48px",
            }}
          >
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "32px",
              }}
            >
              <span className="section-label" style={{ color: "#f87171" }}>
                THE CHALLENGE
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "1.8rem",
                  color: "var(--text)",
                  marginTop: "8px",
                  marginBottom: "12px",
                }}
              >
                What needed fixing
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                {project.challenge}
              </p>
            </div>

            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "32px",
              }}
            >
              <span className="section-label" style={{ color: "#34d399" }}>
                THE SOLUTION
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "1.8rem",
                  color: "var(--text)",
                  marginTop: "8px",
                  marginBottom: "12px",
                }}
              >
                What we engineered
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Metrics / Highlights */}
          {project.metrics && project.metrics.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                marginBottom: "64px",
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

          {/* Multi-Page Screenshot Gallery */}
          <ProjectGallery project={project} />

          {/* Key Deliverables & Implemented Features */}
          <section style={{ marginBottom: "64px" }}>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "1.8rem",
                color: "var(--text)",
                marginBottom: "20px",
              }}
            >
              Key Deliverables &amp; Implemented Features
            </h2>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "28px",
              }}
            >
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", padding: 0, margin: 0 }}>
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

          {/* Technology Stack */}
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
              Want a website like this? Get a fixed price within 24 hours.
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
                  color: "var(--primary-btn-text)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Discuss on WhatsApp →
              </a>
              <a
                href={getConsultUrl()}
                target="_blank"
                rel="noopener noreferrer"
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
                Book a free call ↗
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
