"use client";

import Link from "next/link";
import { CaseStudy } from "@/content/projects";
import { SITE, getConsultUrl } from "@/content/site";

interface MathsyCaseStudyProps {
  project: CaseStudy;
}

export default function MathsyCaseStudy({ project }: MathsyCaseStudyProps) {
  const screenshots = [
    {
      title: "Student Learning Dashboard",
      subtitle: "Study streaks, upcoming scheduled classes, and chapter completion metrics (demo data)",
      src: "/screenshots/mathsy-screens/student-dashboard.webp",
      alt: "Mathsy student portal learning dashboard interface preview",
    },
    {
      title: "Scheduled Examination & Test Catalog",
      subtitle: "Chapter tests, unit assessments, syllabus breakdown, and timer allocation (sample data)",
      src: "/screenshots/mathsy-screens/proctored-exams.webp",
      alt: "Mathsy test series and proctored examination catalog",
    },
    {
      title: "Proctored Exam Interface & Question Palette",
      subtitle: "Real-time question navigation palette, countdown clock, and mathematical notation rendering",
      src: "/screenshots/mathsy-screens/exam-engine.webp",
      alt: "Mathsy exam engine with math formula rendering",
    },
    {
      title: "Digital Answer-Sheet Evaluation Queue",
      subtitle: "Tutor booklet evaluation workflow for marking answers, recording scores, and writing feedback",
      src: "/screenshots/mathsy-screens/evaluation-scorecard.webp",
      alt: "Mathsy tutor digital booklet evaluation and grading queue",
    },
    {
      title: "Curriculum Resources & Chapter Library",
      subtitle: "Subject-wise NCERT curriculum browser, formula sheets, and practice question sets",
      src: "/screenshots/mathsy-screens/study-resources.webp",
      alt: "Mathsy study resources and NCERT chapter library",
    },
  ];

  return (
    <article style={{ maxWidth: "1040px", margin: "0 auto" }}>
      {/* ─── 1. The Client & Goal ─── */}
      <header style={{ marginBottom: "56px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
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
            Live Client Work
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "var(--text)",
            marginBottom: "16px",
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

        {/* Client Meta Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "24px 28px",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                color: "var(--muted)",
                display: "block",
                marginBottom: "4px",
              }}
            >
              CLIENT
            </span>
            <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.95rem", color: "var(--text)", fontWeight: 500 }}>
              {project.client}
            </span>
          </div>

          <div>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                color: "var(--muted)",
                display: "block",
                marginBottom: "4px",
              }}
            >
              ROLE
            </span>
            <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.95rem", color: "var(--text)", fontWeight: 500 }}>
              {project.role}
            </span>
          </div>

          <div>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                color: "var(--muted)",
                display: "block",
                marginBottom: "4px",
              }}
            >
              CLIENT WEBSITE
            </span>
            <a
              href="https://www.mathsy.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.95rem",
                color: "var(--accent)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              mathsy.in ↗
            </a>
          </div>
        </div>
      </header>

      {/* ─── 2. The Problem ─── */}
      <section style={{ marginBottom: "52px" }}>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "36px 32px",
          }}
        >
          <span className="section-label">THE PROBLEM</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "2rem",
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "14px",
            }}
          >
            What needed solving
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              lineHeight: 1.65,
              color: "var(--text)",
              margin: 0,
            }}
          >
            An online maths and science academy needed one platform for students, tutors, parents and admins — including live classes built for teaching maths.
          </p>
        </div>
      </section>

      {/* ─── 3. What We Built ─── */}
      <section style={{ marginBottom: "52px" }}>
        <div style={{ marginBottom: "24px" }}>
          <span className="section-label">WHAT WE BUILT</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "2.3rem",
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "12px",
            }}
          >
            A 4-portal learning platform with live classes and examination workflows
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "820px",
            }}
          >
            A 4-portal learning platform with live classes, proctored exams, digital answer-sheet evaluation, parent progress tracking and report cards.
          </p>
        </div>

        {/* 4 Synchronized Portals */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {project.portals?.map((portal) => (
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
              <h3 style={{ fontFamily: "var(--font-geist-sans)", fontSize: "1.18rem", fontWeight: 600, color: "var(--text)", margin: 0 }}>
                {portal.title}
              </h3>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.9rem", lineHeight: 1.5, color: "var(--muted)", margin: 0 }}>
                {portal.description}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "auto 0 0", display: "flex", flexDirection: "column", gap: "8px" }}>
                {portal.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      color: "var(--text)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. The Live Classroom ─── */}
      <section style={{ marginBottom: "56px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(34,31,26,0.85) 0%, rgba(26,24,20,0.95) 100%)",
            border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: "var(--radius-lg)",
            padding: "36px 32px",
          }}
        >
          <span className="section-label">THE LIVE CLASSROOM</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "2rem",
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "12px",
            }}
          >
            Purpose-built virtual classroom for math instruction
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              lineHeight: 1.65,
              color: "var(--text)",
              margin: 0,
            }}
          >
            For live classes we built a maths-focused classroom with geometry instruments, PDF slides and tablet pen input.
          </p>
          {SITE.showMathsyMeetOrigin && (
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.95rem",
                lineHeight: 1.5,
                color: "var(--accent)",
                marginTop: "14px",
                marginBottom: 0,
              }}
            >
              This classroom is now available to every tutor as{" "}
              <Link href="/mathsy-meet" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "underline" }}>
                Mathsy Meet →
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* ─── 5. Screenshots (Demo / Sample Data Only) ─── */}
      <section style={{ marginBottom: "64px" }}>
        <div style={{ marginBottom: "28px" }}>
          <span className="section-label">PLATFORM INTERFACES</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "2.3rem",
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            Production Interface Previews
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.95rem",
              color: "var(--muted)",
              margin: 0,
            }}
          >
            Sample portal views with synthetic demo data illustrating student and tutor workflows.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {screenshots.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--card-shadow)",
              }}
            >
              {/* Browser Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  background: "#16130F",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.72rem",
                      color: "var(--muted)",
                      marginLeft: "6px",
                    }}
                  >
                    mathsy.in · Sample Interface
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.7rem",
                    color: "var(--accent)",
                  }}
                >
                  Demo View
                </span>
              </div>

              {/* Screenshot Image */}
              <div style={{ position: "relative", width: "100%", background: "#0e0d0b" }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Caption */}
              <div style={{ padding: "18px 22px", background: "var(--surface)" }}>
                <h4
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    margin: "0 0 4px",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.88rem",
                    color: "var(--muted)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 6. Results: (Hidden until client provides them per spec) ─── */}

      {/* ─── 7. CTA ─── */}
      <section
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "52px 36px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <span className="section-label">CUSTOM WEB &amp; PLATFORM DEVELOPMENT</span>
        <h2
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 400,
            color: "var(--text)",
            marginTop: "10px",
            marginBottom: "14px",
          }}
        >
          Need a custom platform like this? Book a free call
        </h2>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "1.05rem",
            color: "var(--muted)",
            maxWidth: "600px",
            margin: "0 auto 32px",
            lineHeight: 1.55,
          }}
        >
          From multi-portal platforms and virtual classrooms to custom student dashboards, we design and build complete web applications with clean code and fixed delivery timelines.
        </p>

        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={getConsultUrl()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "8px",
              background: "var(--accent)",
              color: "var(--primary-btn-text)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Book a free 15-min call ↗
          </a>
          <a
            href={SITE.whatsappProjectUrl || SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 26px",
              borderRadius: "8px",
              background: "transparent",
              color: "var(--text)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.95rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Discuss on WhatsApp →
          </a>
        </div>
      </section>
    </article>
  );
}
