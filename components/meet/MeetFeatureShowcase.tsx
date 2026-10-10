"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE, getMeetDemoUrl } from "@/content/site";
import { MEET_FEATURES } from "@/content/meetFeatures";
import MeetWalkthroughButton from "@/components/meet/MeetWalkthroughButton";
import { trackEvent } from "@/lib/tracking";

export default function MeetFeatureShowcase() {
  const totalFeatureCount = MEET_FEATURES.length;

  // Main showcase blocks from live features
  const showcaseBlocks = [
    {
      id: "maths-whiteboard",
      number: "01",
      title: "Whiteboard with compass, protractor, ruler and set-square",
      summary:
        "True geometric instruments that mimic physical classroom tools right on your whiteboard canvas.",
      note: "Tutors show the board to students by sharing their screen; live board sync is coming soon.",
      bullets: [
        "Compass with adjustable radius for constructing accurate circles and arcs",
        "180° protractor with rotating pointer and angle degree readouts",
        "Ruler with clear metric markings for drawing straight lines to scale",
        "30-60-90° and 45-45-90° set-squares for coordinate geometry and triangles",
      ],
      image: "/screenshots/mathsy-meet-instruments.webp",
      imageAlt: "Mathsy Meet geometry instruments on whiteboard canvas",
    },
    {
      id: "screen-sharing",
      number: "02",
      title: "Screen sharing & fullscreen mode",
      summary:
        "Seamless display sharing for interactive simulations, software demos, and problem walkthroughs.",
      bullets: [
        "Tutors and students can share their screen in one click",
        "Share entire monitor, a single software window, or a specific browser tab",
        "Full-bleed fullscreen display maximizing canvas and video visibility",
      ],
      image: "/screenshots/mathsy-meet-desktop.webp",
      imageAlt: "Mathsy Meet screen sharing controls and classroom view",
    },
    {
      id: "live-polls",
      number: "03",
      title: "Live polls (up to 6 options) with live results",
      summary:
        "Run multiple-choice polls during live class and track student comprehension with instant tally feedback.",
      bullets: [
        "Create quick polls with 2 to 6 custom answer choices",
        "Real-time live vote counts and response percentages as students submit",
        "Instant answer reveal to discuss solutions and review core concepts together",
      ],
      image: "/screenshots/mathsy-meet-polls.webp",
      imageAlt: "Mathsy Meet live poll creation and real-time response tallies",
    },
    {
      id: "video-classes",
      number: "04",
      title: "Video classes on our own media server",
      summary:
        "High-performance WebRTC video routing hosted on our dedicated media server for low-latency tutoring.",
      bullets: [
        "Grid and spotlight views with active participant pinning",
        "Visual speaking indicator highlighting whoever is currently speaking",
        "Consistent video quality optimized for two-way tutoring interactions",
      ],
    },
    {
      id: "lobby-and-access",
      number: "05",
      title: "Pre-join lobby and shareable class link",
      summary:
        "Frictionless browser-based onboarding for students with full pre-flight audio and camera testing.",
      bullets: [
        "Students join directly from a shared browser link with zero app downloads",
        "Pre-join lobby with live microphone and camera testing before entering",
        "Clear tutor and student role selection upon entering the room",
        "Fast Google sign-in for secure educator authentication",
      ],
    },
    {
      id: "chat-and-reactions",
      number: "06",
      title: "Chat with a pinned message, raise hand and emoji reactions",
      summary:
        "Structured classroom participation tools designed to keep every student focused and engaged.",
      bullets: [
        "Classroom text chat with pinned messages for formulas, links, and homework notices",
        "Structured raise-hand queue so tutors can address questions systematically",
        "Emoji reactions for immediate pulse checks without interrupting audio",
      ],
    },
    {
      id: "recording-and-streaming",
      number: "07",
      title: "Local HD recording download and YouTube Live streaming",
      summary:
        "Preserve every class for revision and archive lectures or broadcast live sessions to YouTube.",
      bullets: [
        "Local HD recording download saved directly to your computer immediately after class",
        "YouTube Live streaming for public, private, or unlisted broadcasts",
        "Zero cloud storage fees or third-party download expirations",
      ],
    },
  ];

  const handleDemoClick = (featureId: string) => {
    trackEvent("meet_demo_click", `feature_${featureId}`);
  };

  return (
    <section
      id="features"
      style={{
        padding: "80px 24px 85px",
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
            Live features built for online maths classes.
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
            Purpose-built tools that work directly in the app today: real geometry instruments, screen sharing, live polls, and local HD recording.
          </p>
        </div>

        {/* Live Feature Showcase Blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {showcaseBlocks.map((f, idx) => {
            const hasImage = Boolean(f.image && f.imageAlt);
            const isEven = idx % 2 === 1;

            return (
              <div
                key={f.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: hasImage ? "repeat(auto-fit, minmax(310px, 1fr))" : "1fr",
                  gap: "44px",
                  alignItems: "center",
                  maxWidth: hasImage ? "100%" : "780px",
                  margin: hasImage ? "0" : "0 auto",
                }}
              >
                {/* Content Block */}
                <div style={{ order: hasImage && isEven ? 2 : 1 }}>
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
                    FEATURE {f.number} · LIVE IN APP
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
                      margin: "0 0 20px",
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
                        fontSize: "0.8rem",
                        color: "var(--accent)",
                        marginBottom: "20px",
                        lineHeight: 1.5,
                      }}
                    >
                      Note: {f.note}
                    </div>
                  )}

                  {/* Primary Action Button */}
                  {SITE.meetDemoReady ? (
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
                  ) : (
                    <MeetWalkthroughButton
                      label="Book a free walkthrough"
                      location={`meet_feature_${f.id}`}
                      style={{
                        padding: "11px 20px",
                        fontSize: "0.92rem",
                      }}
                    />
                  )}
                </div>

                {/* Screenshot Frame Block (Only rendered if image exists) */}
                {hasImage && f.image && f.imageAlt && (
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
                )}
              </div>
            );
          })}
        </div>

        {/* ─── Link to All Features Catalogue ─── */}
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <Link
            href="#all-features"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "8px",
              background: "var(--surface)",
              color: "var(--accent)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              transition: "all 0.15s ease",
            }}
          >
            <span>See all {totalFeatureCount} features</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
