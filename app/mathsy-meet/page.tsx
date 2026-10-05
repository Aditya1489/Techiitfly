import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MeetLabEmbed from "@/components/meet/MeetLabEmbed";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Mathsy Meet — Online Live Math Classroom & Whiteboard for Tutors | techiitfly",
  description:
    "Live online math classroom for educators with built-in digital compass, protractor, ruler, set-square, slide-to-poll interactivity, and tablet pairing. Teach live without screen-sharing friction.",
  keywords: [
    "online whiteboard for math teaching",
    "online class platform for tutors India",
    "math teaching whiteboard compass protractor",
    "virtual math classroom software",
    "live teaching tools for educators",
  ],
};

const TUTOR_FEATURES = [
  {
    title: "Slide-to-Poll Interactivity",
    desc: "Launch multiple-choice and conceptual polls directly onto student screens with real-time response counters.",
  },
  {
    title: "Real-Time Hand-Raise Queue",
    desc: "Organized question queue so tutors can address student doubts one-by-one without classroom interruptions.",
  },
  {
    title: "Automatic Post-Class PDF Notes",
    desc: "Every stroke and geometric annotation is bundled into a clean, downloadable PDF immediately when class concludes.",
  },
  {
    title: "Tablet & Stylus Pairing",
    desc: "Pair an iPad, Apple Pencil, or Wacom drawing tablet seamlessly while managing student video feeds on your laptop.",
  },
  {
    title: "Session Recording",
    desc: "Capture the complete lecture stream, shared whiteboard canvas, and tutor audio for student revision.",
  },
  {
    title: "YouTube Live Broadcast",
    desc: "Stream live lectures directly to YouTube for public webinars, open doubt sessions, and masterclasses.",
  },
];

export default function MathsyMeetPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mathsy Meet",
    operatingSystem: "Web",
    applicationCategory: "EducationalApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      description: "Custom tutor plans and institutional licensing — contact via WhatsApp",
    },
    description:
      "Interactive online classroom for math educators with built-in digital compass, protractor, ruler, slide polls, and tablet pairing.",
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
          <div style={{ maxWidth: "1040px", margin: "0 auto", textAlign: "center" }}>
            <span className="section-label">LIVE MATH CLASSROOM & DIGITAL WHITEBOARD</span>

            <h1
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.5rem, 5.8vw, 4.8rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                marginTop: "16px",
                marginBottom: "20px",
              }}
            >
              Teach maths live with{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>real geometry tools.</em>
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
              No clunky third-party screen-sharing. Draw circles with a true digital compass, measure degrees with an on-screen protractor, and poll students in real time.
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
                href="#tools"
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
                Try the Tools Below ↓
              </a>

              <a
                href={SITE.whatsappTutorUrl}
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
                <span>Get Access on WhatsApp</span>
                <span>→</span>
              </a>
            </div>

            <div
              style={{
                marginTop: "20px",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.74rem",
                color: "var(--muted)",
              }}
            >
              [Demo room URL: In development. Test the interactive geometry canvas directly below]
            </div>
          </div>
        </section>

        {/* ─── b) The Math Tools (Interactive Live Lab Embed) ─────────────── */}
        <section
          id="tools"
          style={{
            padding: "80px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span className="section-label">INTERACTIVE HARDWARE SIMULATION</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginTop: "8px",
                }}
              >
                The math tools: compass, protractor, ruler, and set-square.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  color: "var(--muted)",
                  maxWidth: "680px",
                  margin: "8px auto 0",
                }}
              >
                Try the digital geometry suite below right inside your browser. No installation or registration needed.
              </p>
            </div>

            {/* Embedded Live Lab Whiteboard */}
            <MeetLabEmbed />
          </div>
        </section>

        {/* ─── c) Features for Tutors ─────────────────────────────────────── */}
        <section
          id="features"
          style={{
            padding: "90px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <span className="section-label">ENGINEERED FOR LIVE TEACHING</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginTop: "8px",
                }}
              >
                Confirmed tutor features. Built for classroom flow.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  color: "var(--muted)",
                  maxWidth: "600px",
                  margin: "8px auto 0",
                }}
              >
                Every feature below is implemented and active in the Mathsy teaching stack.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {TUTOR_FEATURES.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "28px 24px",
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
                    FEATURE 0{idx + 1}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: "10px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.9rem",
                      color: "var(--muted)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── d) Demo Video Slot ─────────────────────────────────────────── */}
        <section
          id="demo-video"
          style={{
            padding: "80px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
            <span className="section-label">CLASSROOM WALKTHROUGH</span>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.1rem, 4vw, 3.2rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginTop: "8px",
                marginBottom: "20px",
              }}
            >
              Watch Mathsy Meet in action.
            </h2>

            {/* Video Slot Frame */}
            <div
              style={{
                position: "relative",
                width: "100%",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                background: "#080807",
                aspectRatio: "16 / 9",
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.8)",
              }}
            >
              <video
                src="/video/mathsy-meet-demo.mp4"
                poster="/screenshots/mathsy-meet-desktop.webp"
                controls
                muted
                playsInline
                preload="none"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <p
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginTop: "16px",
              }}
            >
              Video slot: /public/video/mathsy-meet-demo.mp4 (Awaiting final upload from Aditya Chavhan)
            </p>
          </div>
        </section>

        {/* ─── e) Plans & Pricing ─────────────────────────────────────────── */}
        <section
          id="plans"
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
            <span className="section-label">ACCESS & PLANS</span>
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
              Get access for your teaching practice.
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
              Tutor subscription tiers and room licensing are available for solo math tutors, coaching pairs, and private academies.
            </p>

            <a
              href={SITE.whatsappTutorUrl}
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
              <span>Get Access on WhatsApp</span>
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
              [Specific subscription tiers & per-tutor plans to be confirmed in LAUNCH_CHECKLIST.md]
            </p>
          </div>
        </section>

        {/* ─── f) FAQ ─────────────────────────────────────────────────────── */}
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
              <span className="section-label">TUTOR FAQ</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginTop: "8px",
                }}
              >
                Questions from educators.
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  q: "What device and browser requirements are needed?",
                  status: "[TODO: Confirm exact supported browser versions and hardware in LAUNCH_CHECKLIST.md]",
                },
                {
                  q: "How many students can join a single live math class?",
                  status: "[TODO: Confirm maximum student cohort capacity per room in LAUNCH_CHECKLIST.md]",
                },
                {
                  q: "How are class recordings stored and accessed?",
                  status: "[TODO: Confirm cloud storage allocation & download retention in LAUNCH_CHECKLIST.md]",
                },
                {
                  q: "Does Mathsy Meet support drawing tablets, iPads, and digital pens?",
                  status: "[TODO: Confirm stylus pressure & tablet pairing requirements in LAUNCH_CHECKLIST.md]",
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
                    Confirmed specifications for this question are listed in LAUNCH_CHECKLIST.md. Inquire directly on WhatsApp for preliminary answers.
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

        {/* ─── g) Final CTA ───────────────────────────────────────────────── */}
        <section
          style={{
            padding: "90px 24px 110px",
            background: "var(--bg)",
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
              Elevate your live math sessions.
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
              Contact founder Aditya Chavhan to request access or schedule a 1-on-1 walkthrough of the geometry tools.
            </p>
            <a
              href={SITE.whatsappTutorUrl}
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
              <span>Get Access on WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
