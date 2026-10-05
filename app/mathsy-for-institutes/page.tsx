import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeCustomizerPreview from "@/components/institutes/ThemeCustomizerPreview";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Mathsy for Institutes — Coaching Institute Management Software & LMS | techiitfly",
  description:
    "White-label 4-portal LMS for coaching institutes, test-prep academies (NEET/JEE), and tutoring centres in India. Run student, tutor, parent, and admin portals under your own brand.",
  keywords: [
    "coaching institute management software",
    "LMS for coaching classes India",
    "white label LMS for coaching",
    "JEE NEET coaching platform software",
    "institute student portal tutor portal",
  ],
};

// 4 Portals with confirmed screenshots & confirmed 3 features
const PORTALS = [
  {
    role: "Student Portal",
    badge: "LEARNER EXPERIENCE",
    screenshot: "/screenshots/mathsy/mathsy-student-dashboard-desktop.webp",
    alt: "Mathsy Student Portal Dashboard with streak counter, attempt metrics, and curriculum topics",
    features: [
      "Streak counter, attempt metrics, and topic-wise mastery overview.",
      "Proctored and practice test-series catalog with timed exam submissions.",
      "Interactive practice portal with accuracy statistics and recent study sessions.",
    ],
  },
  {
    role: "Tutor Portal",
    badge: "FACULTY COCKPIT",
    screenshot: "/screenshots/mathsy/mathsy-tutor-dashboard-desktop.webp",
    alt: "Mathsy Tutor Mentorship Hub dashboard with student cohorts and quick actions",
    features: [
      "Tutor Mentorship Hub with cohort management and quick action deck.",
      "Live class interactive poll bank repository with pre-set poll launch.",
      "Subjective booklet evaluation queue with proctored exam setup controls.",
    ],
  },
  {
    role: "Admin Portal",
    badge: "INSTITUTE OPERATIONS",
    screenshot: "/screenshots/mathsy/mathsy-tutor-exam-setup-desktop.webp",
    alt: "Mathsy Admin portal exam setup and control deck",
    features: [
      "Institute-wide cohort management and batch scheduling.",
      "Test series creation, scheduling, and exam control deck.",
      "Student enrollment roster, attendance logs, and performance oversight.",
    ],
  },
  {
    role: "Parent Portal",
    badge: "GUARDIAN VISIBILITY",
    isFallback: true,
    alt: "Parent Portal visibility deck",
    features: [
      "Real-time attendance logs and lecture participation overview.",
      "Test score transcripts, attempt history, and accuracy trends.",
      "Direct institute announcements and progress report access.",
    ],
  },
];

export default function MathsyForInstitutesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mathsy for Institutes",
    operatingSystem: "Web",
    applicationCategory: "EducationalApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      description: "Pricing depends on student count and customisation — request a quote",
    },
    description:
      "White-label 4-portal learning management system (Student, Tutor, Parent, Admin) custom-branded for coaching institutes and test-prep academies.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "80px" }}>
        {/* ─── a) Hero Section ────────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            padding: "80px 24px 70px",
            borderBottom: "1px solid var(--border)",
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245, 158, 11, 0.12), transparent)",
          }}
        >
          <div style={{ maxWidth: "1080px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ marginBottom: "20px" }}>
              <span className="section-label">MATHSY FOR INSTITUTES · WHITE-LABEL LMS</span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.5rem, 5.8vw, 4.8rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                marginBottom: "20px",
              }}
            >
              Run your whole institute on{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>one branded platform.</em>
            </h1>

            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: "760px",
                margin: "0 auto 36px",
              }}
            >
              Replace disconnected tools with a custom-branded 4-portal learning management system engineered for coaching institutes and competitive test-prep academies.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a
                href={SITE.whatsappInstituteUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "var(--accent)",
                  color: "var(--primary-btn-text)",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 0 24px rgba(245,158,11,0.25)",
                }}
              >
                <span>Book a Demo on WhatsApp</span>
                <span>→</span>
              </a>

              <a
                href="#who-it-is-for"
                style={{
                  background: "var(--surface)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  padding: "14px 24px",
                  borderRadius: "8px",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                See How It Works ↓
              </a>
            </div>
          </div>
        </section>

        {/* ─── b) Who It's For ────────────────────────────────────────────── */}
        <section
          id="who-it-is-for"
          style={{
            padding: "80px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span className="section-label">AUDIENCE FIT</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginTop: "8px",
                }}
              >
                Built specifically for coaching institutes & test-prep academies.
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              <div
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px 26px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    marginBottom: "8px",
                  }}
                >
                  CATEGORY 01
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "12px",
                  }}
                >
                  Competitive Test-Prep Academies (NEET / JEE)
                </h3>
                <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.6 }}>
                  Run comprehensive test series, simulate real exam conditions, assess subjective answer booklets, and track chapter-level mastery for high-stakes entrance exams.
                </p>
              </div>

              <div
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px 26px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    marginBottom: "8px",
                  }}
                >
                  CATEGORY 02
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "12px",
                  }}
                >
                  Board & Foundation Coaching Institutes
                </h3>
                <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.6 }}>
                  Organize grades 8–12 batches, distribute syllabus notes, monitor class attendance, and keep parents updated without endless WhatsApp group chaos.
                </p>
              </div>

              <div
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px 26px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    marginBottom: "8px",
                  }}
                >
                  CATEGORY 03
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "12px",
                  }}
                >
                  Multi-Branch Tutoring Centres
                </h3>
                <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.6 }}>
                  Maintain central control across faculty rosters, schedule branch timetables, assign student cohorts, and standardize exam evaluations under one flagship brand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── c) What's Included: 4 Portals ──────────────────────────────── */}
        <section
          id="portals"
          style={{
            padding: "90px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span className="section-label">COMPLETE 4-PORTAL ARCHITECTURE</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginTop: "8px",
                }}
              >
                Four purpose-built portals. Zero clutter.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.05rem",
                  color: "var(--muted)",
                  maxWidth: "650px",
                  margin: "12px auto 0",
                }}
              >
                Every user gets a tailored interface with role-based access. Every feature below is proven in active production.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
              {PORTALS.map((portal, idx) => (
                <div
                  key={portal.role}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "40px",
                    alignItems: "center",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "36px",
                  }}
                >
                  {/* Left: Content */}
                  <div style={{ order: idx % 2 === 1 ? 2 : 1 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.75rem",
                        color: "var(--accent)",
                        letterSpacing: "0.1em",
                        display: "block",
                        marginBottom: "10px",
                      }}
                    >
                      {portal.badge}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-instrument-serif)",
                        fontSize: "2.4rem",
                        fontWeight: 400,
                        color: "var(--text)",
                        marginBottom: "20px",
                        lineHeight: 1.15,
                      }}
                    >
                      {portal.role}
                    </h3>

                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 0 24px 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {portal.features.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          style={{
                            fontFamily: "var(--font-geist-sans)",
                            fontSize: "0.95rem",
                            color: "var(--text)",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            lineHeight: 1.5,
                          }}
                        >
                          <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Screenshot or Fallback */}
                  <div style={{ order: idx % 2 === 1 ? 1 : 2 }}>
                    {portal.screenshot ? (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "16 / 10",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "1px solid var(--border)",
                          background: "#0e0d0b",
                          boxShadow: "0 14px 28px -10px rgba(0,0,0,0.6)",
                        }}
                      >
                        <Image
                          src={portal.screenshot}
                          alt={portal.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 550px"
                          style={{ objectFit: "cover", objectPosition: "top center" }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "16 / 10",
                          borderRadius: "8px",
                          border: "1px dashed var(--border)",
                          background: "var(--surface-2)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "24px",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-geist-mono)",
                            fontSize: "0.72rem",
                            color: "var(--accent)",
                            background: "rgba(245,158,11,0.1)",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            marginBottom: "12px",
                          }}
                        >
                          [DEMO ACCOUNT SCREENSHOT PENDING — SAMPLE DATA ACCESS TO BE PROVIDED]
                        </span>
                        <p
                          style={{
                            fontFamily: "var(--font-geist-sans)",
                            fontSize: "0.9rem",
                            color: "var(--muted)",
                            maxWidth: "340px",
                            lineHeight: 1.4,
                          }}
                        >
                          {portal.role} demo view with sample student data will be captured once demo institute access is provided.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── d) Live Classes with Mathsy Meet Built In ──────────────────── */}
        <section
          style={{
            padding: "80px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <div
            style={{
              maxWidth: "1140px",
              margin: "0 auto",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "40px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "36px",
              alignItems: "center",
            }}
          >
            <div>
              <span className="section-label">SEAMLESS INTEGRATION</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(2rem, 3.8vw, 3rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginTop: "8px",
                  marginBottom: "14px",
                  lineHeight: 1.2,
                }}
              >
                Live classes with Mathsy Meet built in.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.98rem",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                }}
              >
                No third-party meeting links or Zoom passwords required. Your tutors start live sessions directly from their institute timetable with built-in compass, protractor, and instant student polls.
              </p>
              <Link
                href="/mathsy-meet"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--accent)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <span>Explore Mathsy Meet Classroom Tools</span>
                <span>→</span>
              </Link>
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 10",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid var(--border)",
              }}
            >
              <Image
                src="/screenshots/mathsy-meet-desktop.webp"
                alt="Mathsy Meet live math classroom preview"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>
        </section>

        {/* ─── e) "Made for your institute" (Customisation) ───────────────── */}
        <section
          id="customisation"
          style={{
            padding: "90px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span className="section-label">WHITE-LABEL BRANDING</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginTop: "8px",
                }}
              >
                Made for your institute. Your brand, your domain.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.05rem",
                  color: "var(--muted)",
                  maxWidth: "680px",
                  margin: "12px auto 0",
                  lineHeight: 1.55,
                }}
              >
                Students and parents see your academy name everywhere. What you can customize:
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
                marginBottom: "36px",
              }}
            >
              {[
                { title: "Custom Domain", desc: "portal.yourinstitute.com with dedicated SSL" },
                { title: "Institute Logo & Favicon", desc: "Branded login screens and navigation bar" },
                { title: "Brand Colour Palette", desc: "Tailored primary and accent tokens across all 4 portals" },
                { title: "Custom Courses & Batches", desc: "Configured to your syllabus structure and board exams" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "20px 18px",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.02rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: "6px",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Visual theme simulation */}
            <ThemeCustomizerPreview />
          </div>
        </section>

        {/* ─── f) How Setup Works ─────────────────────────────────────────── */}
        <section
          id="setup"
          style={{
            padding: "90px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <span className="section-label">DEPLOYMENT ROADMAP</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginTop: "8px",
                }}
              >
                How setup works.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.95rem",
                  color: "var(--muted)",
                  marginTop: "8px",
                }}
              >
                A structured onboarding process from first demo to full institute rollout.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
              }}
            >
              {[
                { step: "01", name: "Demo", desc: "Live walkthrough of the 4 portals and whiteboard tools." },
                { step: "02", name: "Requirements", desc: "Map your batches, student count, test formats, and faculty roster." },
                { step: "03", name: "Branding & Setup", desc: "Configure your sub-domain, theme colors, logos, and course decks." },
                { step: "04", name: "Training", desc: "Dedicated orientation sessions for tutors, admins, and faculty." },
                { step: "05", name: "Launch & Support", desc: "Go live with student onboarding and direct founder-led technical support." },
              ].map((s) => (
                <div
                  key={s.step}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "26px 20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "var(--accent)",
                      marginBottom: "12px",
                    }}
                  >
                    {s.step}
                  </span>
                  <h4
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: "8px",
                    }}
                  >
                    {s.name}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "32px",
                textAlign: "center",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.78rem",
                color: "var(--muted)",
              }}
            >
              [Official step timelines and SLA options to be confirmed in LAUNCH_CHECKLIST.md]
            </div>
          </div>
        </section>

        {/* ─── g) Pricing ─────────────────────────────────────────────────── */}
        <section
          id="pricing"
          style={{
            padding: "80px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "center",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "48px 32px",
            }}
          >
            <span className="section-label">TRANSPARENT LICENSING</span>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.1rem, 4vw, 3.2rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginTop: "8px",
                marginBottom: "16px",
              }}
            >
              Pricing depends on student count and customisation.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.05rem",
                color: "var(--muted)",
                lineHeight: 1.6,
                maxWidth: "600px",
                margin: "0 auto 28px",
              }}
            >
              Whether you are an independent test-prep academy with 100 students or a multi-branch institute with 2,000+ learners, we structure licensing to your exact volume.
            </p>

            <a
              href={SITE.whatsappInstituteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--accent)",
                color: "var(--primary-btn-text)",
                padding: "14px 28px",
                borderRadius: "8px",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Request a Quote on WhatsApp</span>
              <span>→</span>
            </a>

            <p
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginTop: "20px",
                marginBottom: 0,
              }}
            >
              [Specific pricing tiers & annual licensing models to be confirmed in LAUNCH_CHECKLIST.md]
            </p>
          </div>
        </section>

        {/* ─── h) FAQ ─────────────────────────────────────────────────────── */}
        <section
          id="faq"
          style={{
            padding: "90px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span className="section-label">QUESTIONS & SPECIFICATIONS</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginTop: "8px",
                }}
              >
                Frequently asked questions.
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  q: "Who owns our institute's student data?",
                  status: "[TODO: Confirm detailed data ownership contract terms in LAUNCH_CHECKLIST.md]",
                },
                {
                  q: "How and where is the platform hosted?",
                  status: "[TODO: Confirm production cloud infrastructure & hosting provider in LAUNCH_CHECKLIST.md]",
                },
                {
                  q: "Is there a limit on the number of students or concurrent batches?",
                  status: "[TODO: Confirm scaling caps & tier thresholds in LAUNCH_CHECKLIST.md]",
                },
                {
                  q: "Can students and tutors access the platform smoothly on mobile devices?",
                  status: "[TODO: Confirm supported mobile browser matrix in LAUNCH_CHECKLIST.md]",
                },
                {
                  q: "What training and technical support do you provide post-launch?",
                  status: "[TODO: Confirm support SLA and direct assistance channels in LAUNCH_CHECKLIST.md]",
                },
                {
                  q: "How do we migrate our existing student rosters and question banks?",
                  status: "[TODO: Confirm CSV / data import procedures in LAUNCH_CHECKLIST.md]",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "24px 22px",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.08rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: "10px",
                    }}
                  >
                    {faq.q}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.9rem",
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    Official answers for these questions will be confirmed shortly. In the interim, please contact Aditya directly on WhatsApp for full technical details.
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.72rem",
                      color: "var(--accent)",
                      background: "rgba(245,158,11,0.08)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {faq.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── i) Proof ───────────────────────────────────────────────────── */}
        <section
          style={{
            padding: "70px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span className="section-label">AUTHENTIC ARCHITECTURE PROOF</span>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginTop: "8px",
                marginBottom: "16px",
              }}
            >
              Running in production at mathsy.in
            </h2>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1rem",
                color: "var(--muted)",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              Mathsy is not a mockup or prototype. It is a live learning platform supporting real students and teachers across daily lectures, proctored test series, and mentorship evaluations.
            </p>
            <a
              href="https://www.mathsy.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.92rem",
                color: "var(--accent)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Visit live production platform: https://mathsy.in ↗
            </a>
          </div>
        </section>

        {/* ─── j) Final CTA ───────────────────────────────────────────────── */}
        <section
          style={{
            padding: "90px 24px 110px",
            background: "var(--surface)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginBottom: "16px",
              }}
            >
              Ready to upgrade your institute?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.08rem",
                color: "var(--muted)",
                lineHeight: 1.55,
                marginBottom: "32px",
              }}
            >
              Schedule a live demonstration with founder Aditya Chavhan. We will walk you through the 4 portals and discuss your institute&apos;s custom deployment.
            </p>
            <a
              href={SITE.whatsappInstituteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--accent)",
                color: "var(--primary-btn-text)",
                padding: "16px 32px",
                borderRadius: "8px",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.05rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 0 32px rgba(245,158,11,0.3)",
              }}
            >
              <span>Book a Demo on WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
