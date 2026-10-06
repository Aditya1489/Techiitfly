"use client";

import Image from "next/image";
import { SITE, getMeetDemoUrl } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

interface FeatureBlock {
  id: string;
  number: string;
  title: string;
  summary: string;
  bullets: string[];
  note?: string;
  image: string;
  imageAlt: string;
}

export default function MeetFeatureShowcase() {
  const allFeatures: FeatureBlock[] = [
    {
      id: "pdf-ncert-slides",
      number: "01",
      title: "Teach straight from your PDFs and NCERT chapters",
      summary: "Import textbooks and question sheets directly into your live board as presentation slides.",
      bullets: [
        "Load PDFs as slides with visual page thumbnails",
        "Write on each page — your notes and annotations stay permanently on that page",
        "Add another PDF or worksheet mid-class without losing your work",
        "Laser pointer for highlighting terms and diagrams",
        "Dark, light, and high-contrast blackboard modes",
        "One-click fullscreen board",
      ],
      image: "/screenshots/mathsy-screens/study-resources.webp",
      imageAlt: "Mathsy Meet PDF slide deck and whiteboard notes preview",
    },
    {
      id: "maths-instruments",
      number: "02",
      title: "Real maths instruments on the board",
      summary: "True geometric instruments that mimic physical classroom tools on your screen.",
      bullets: [
        "Compass with adjustable radius for constructing accurate circles and arcs",
        "180° protractor with rotating pointer and angle readouts",
        "Ruler with clear mm and cm markings for drawing to scale",
        "30-60-90° and 45-45-90° set-squares for coordinate geometry and triangles",
      ],
      image: "/screenshots/mathsy-meet-desktop.webp",
      imageAlt: "Mathsy Meet geometry instruments on whiteboard canvas",
    },
    {
      id: "screen-sharing",
      number: "03",
      title: "Share your screen",
      summary: "Seamless display sharing for interactive simulations, software demos, and problem walkthroughs.",
      bullets: [
        "Tutors and students can share their screen in one click",
        "Share entire monitor, a single software window, or a specific browser tab",
        "Smooth audio pass-through for video walkthroughs and physics simulations",
      ],
      image: "/screenshots/mathsy-meet-desktop.webp",
      imageAlt: "Mathsy Meet screen sharing interface",
    },
    {
      id: "tablet-paper-writing",
      number: "04",
      title: "Write with your tablet like paper",
      summary: "Turn an iPad, Android tablet, or drawing pad into a natural pen without extra software.",
      bullets: [
        "Pair a secondary tablet with a simple short code in seconds",
        "Works as a silent pen on the whiteboard with zero lag",
        "No audio feedback or echo between your laptop and tablet",
      ],
      image: "/screenshots/mathsy-screens/exam-engine.webp",
      imageAlt: "Tablet writing paired with whiteboard canvas",
    },
    {
      id: "student-involvement",
      number: "05",
      title: "Keep every student involved",
      summary: "Interactive checks and structured participation tools to ensure active understanding.",
      bullets: [
        "Live polls: MCQ, multi-correct, true/false and written answers",
        "Timers, real-time live results, and instant answer reveal",
        "Reusable question bank organized by subject, chapter, and difficulty",
        "Structured raise-hand queue to answer student questions one by one",
        "Emoji reactions and chat lock controls for focused discussion",
      ],
      image: "/screenshots/mathsy/mathsy-tutor-poll-bank-desktop.webp",
      imageAlt: "Mathsy Meet live poll question bank and timer controls",
    },
    ...(SITE.showMeetAiFeatures
      ? [
          {
            id: "ai-teaching-helpers",
            number: "06",
            title: "AI teaching helpers",
            summary: "Accelerate lesson preparation and classroom polling with assistive generation tools.",
            bullets: [
              "Turn a question on your slide into a live interactive poll in one step",
              "Generate practice questions on demand from your class topic",
            ],
            note: "Always review AI-generated questions before sharing.",
            image: "/screenshots/mathsy-screens/student-dashboard.webp",
            imageAlt: "AI teaching helpers question generator preview",
          },
        ]
      : []),
    {
      id: "record-upload-live",
      number: SITE.showMeetAiFeatures ? "07" : "06",
      title: "Record, upload and go live",
      summary: "Preserve every lecture for revision, batch replays, or public YouTube masterclasses.",
      bullets: [
        "Reliable recording that saves continuously as you teach",
        "Cloud upload that automatically resumes even after a dropped connection",
        "Publish directly to YouTube (public, unlisted, or private)",
      ],
      image: "/screenshots/mathsy-screens/proctored-exams.webp",
      imageAlt: "Mathsy Meet recording and YouTube live broadcast controls",
    },
    {
      id: "popout-whiteboard",
      number: SITE.showMeetAiFeatures ? "08" : "07",
      title: "Pop-out whiteboard",
      summary: "Detachable board view designed for high-productivity multi-display workstation setups.",
      bullets: [
        "Open the whiteboard canvas in its own dedicated browser window",
        "Place the board on a second monitor or pen display while keeping student videos on your laptop",
        "Clean full-bleed view ideal for OBS recording or virtual camera feeds",
      ],
      image: "/screenshots/mathsy-meet-desktop.webp",
      imageAlt: "Pop-out whiteboard in independent window",
    },
  ];

  const handleDemoClick = (featureId: string) => {
    trackEvent("meet_demo_click", `feature_${featureId}`);
  };

  return (
    <section
      id="features"
      style={{
        padding: "80px 24px 100px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-label">BUILT FOR MATHS EDUCATORS</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.3rem, 4.8vw, 3.8rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "14px",
            }}
          >
            Everything you need to teach math live.
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
            Purpose-built tools for mathematical drawings, slide annotations, interactive polling, and stylus writing.
          </p>
        </div>

        {/* Alternating Feature Showcase Blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {allFeatures.map((f, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={f.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
                  gap: "44px",
                  alignItems: "center",
                }}
              >
                {/* Content Block */}
                <div style={{ order: isEven ? 2 : 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--accent)",
                      letterSpacing: "0.08em",
                      marginBottom: "10px",
                    }}
                  >
                    FEATURE {f.number}
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-instrument-serif)",
                      fontSize: "clamp(1.9rem, 3vw, 2.5rem)",
                      fontWeight: 400,
                      lineHeight: 1.2,
                      color: "var(--text)",
                      marginBottom: "14px",
                    }}
                  >
                    {f.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      color: "var(--muted)",
                      marginBottom: "20px",
                    }}
                  >
                    {f.summary}
                  </p>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {f.bullets.map((b, bIdx) => (
                      <li
                        key={bIdx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "0.92rem",
                          lineHeight: 1.5,
                          color: "var(--text)",
                        }}
                      >
                        <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {f.note && (
                    <div
                      style={{
                        padding: "10px 14px",
                        background: "rgba(245, 158, 11, 0.08)",
                        border: "1px solid rgba(245, 158, 11, 0.25)",
                        borderRadius: "6px",
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.78rem",
                        color: "var(--accent)",
                        marginBottom: "24px",
                      }}
                    >
                      Note: {f.note}
                    </div>
                  )}

                  {/* Each block ends with 'Try it in the demo class →' */}
                  <a
                    href={getMeetDemoUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDemoClick(f.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "11px 20px",
                      borderRadius: "8px",
                      background: "var(--surface)",
                      color: "var(--accent)",
                      border: "1px solid var(--border)",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span>Try it in the demo class</span>
                    <span>→</span>
                  </a>
                </div>

                {/* Screenshot Frame Block */}
                <div
                  style={{
                    order: isEven ? 1 : 2,
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
                      padding: "10px 14px",
                      background: "#16130F",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                      <span
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: "0.7rem",
                          color: "var(--muted)",
                          marginLeft: "6px",
                        }}
                      >
                        Mathsy Meet Classroom
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.68rem",
                        color: "var(--accent)",
                      }}
                    >
                      Live Room
                    </span>
                  </div>

                  {/* Image View */}
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", background: "#0e0d0b" }}>
                    <Image
                      src={f.image}
                      alt={f.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 540px"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
