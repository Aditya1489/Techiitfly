"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE, getMeetDemoUrl } from "@/content/site";
import { MEET_FEATURES } from "@/content/meetFeatures";
import MeetWalkthroughButton from "@/components/meet/MeetWalkthroughButton";
import { trackEvent } from "@/lib/tracking";

export default function MeetFeatureShowcase() {
  const totalFeatureCount = MEET_FEATURES.length;

  const showcaseBlocks = [
    {
      id: "maths-whiteboard",
      number: "01",
      title: "Whiteboard with compass, protractor, ruler and set-square",
      summary:
        "True geometric instruments that mimic physical classroom tools right on your digital whiteboard.",
      bullets: [
        "Compass with adjustable radius for constructing accurate circles and arcs",
        "180° protractor with rotating pointer and angle degree readouts",
        "Ruler with clear metric markings for drawing straight lines to scale",
        "30-60-90° and 45-45-90° set-squares for coordinate geometry and triangles",
      ],
      image: "/screenshots/meet/whiteboard-tools-v2.webp",
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
      image: "/screenshots/meet/screen-share-v2.webp",
      imageAlt: "Mathsy Meet screen sharing controls and classroom view",
    },
    {
      id: "live-polls",
      number: "03",
      title: "Live polls (single & multi-choice) with live results and leaderboard",
      summary:
        "Run quick polls during live class and track student comprehension with instant tally feedback.",
      bullets: [
        "Create quick polls with 2 to 6 custom answer choices and timed countdowns",
        "Real-time live vote counts and response percentages as students submit",
        "Instant leaderboard reveal to reward top student answers and review core concepts",
      ],
      image: "/screenshots/meet/poll-results-v2.webp",
      imageAlt: "Mathsy Meet live poll creation and real-time response tallies",
    },
    {
      id: "tablet-companion",
      number: "04",
      title: "Write with your tablet like paper",
      summary:
        "Pair your iPad, Android tablet, or drawing screen as a dedicated digital pen without audio feedback.",
      bullets: [
        "Pair in seconds using a 9-digit companion code generated in your classroom",
        "Draw naturally on the infinite whiteboard using your tablet stylus",
        "Zero audio echo: tablet runs silently while laptop handles camera and mic",
      ],
      image: "/screenshots/meet/tablet-pairing-v2.webp",
      imageAlt: "Mathsy Meet tablet companion pairing modal",
    },
    {
      id: "classroom-controls",
      number: "05",
      title: "Classroom controls that actually control the class",
      summary:
        "Tutor moderation tools designed specifically for teaching discipline and focused attention.",
      bullets: [
        "One-click 'Mute All' to eliminate student background noise immediately",
        "Lock chat for students during lectures to prevent distractions",
        "Lower all raised hands at once or lower individual questions",
        "Camera rules: ask students to keep cameras on with approval-gated exemptions",
        "Remove disruptive participants from class with no-rejoin protection",
      ],
      image: "/screenshots/meet/tutor-controls-v2.webp",
      imageAlt: "Mathsy Meet tutor classroom moderation controls and user panel",
    },
    {
      id: "video-classes",
      number: "06",
      title: "Video classes on our own media server",
      summary:
        "High-performance WebRTC video routing hosted on our dedicated media server for low-latency tutoring.",
      bullets: [
        "Grid and spotlight views with active participant pinning",
        "Visual 3-bar speaking indicator highlighting whoever is currently speaking",
        "Consistent video quality optimized for two-way tutoring interactions",
      ],
      image: "/screenshots/meet/grid-view-v2.webp",
      imageAlt: "Mathsy Meet responsive video grid layout",
    },
    {
      id: "lobby-and-access",
      number: "07",
      title: "Pre-join lobby and shareable class link",
      summary:
        "Frictionless browser-based onboarding for students with full pre-flight audio and camera testing.",
      bullets: [
        "Students join directly from a shared browser link with zero app downloads",
        "Pre-join lobby with live microphone volume meter and camera testing",
        "Clear tutor and student role selection upon entering the room",
        "Fast Google sign-in for secure educator authentication",
      ],
      image: "/screenshots/meet/lobby-v2.webp",
      imageAlt: "Mathsy Meet pre-join check-in lobby",
    },
    {
      id: "chat-and-reactions",
      number: "08",
      title: "Chat with a pinned message, raise hand and emoji reactions",
      summary:
        "Structured classroom participation tools designed to keep every student focused and engaged.",
      bullets: [
        "Classroom text chat with pinned messages for formulas, links, and homework notices",
        "Structured raise-hand queue so tutors can address questions systematically",
        "Emoji reactions for immediate pulse checks without interrupting audio",
      ],
      image: "/screenshots/meet/chat-pinned-v2.webp",
      imageAlt: "Mathsy Meet chat with pinned homework announcement",
    },
    {
      id: "recording-and-streaming",
      number: "09",
      title: "Local HD recording download and YouTube Live streaming",
      summary:
        "Preserve every class for revision and archive lectures or broadcast live sessions to YouTube.",
      bullets: [
        "Local HD recording download saved directly to your computer immediately after class",
        "YouTube Live streaming for public, private, or unlisted broadcasts",
        "Zero cloud storage fees or third-party download expirations",
      ],
      image: "/screenshots/meet/local-recording-v2.webp",
      imageAlt: "Mathsy Meet local HD recording options panel",
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
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span className="section-label">BUILT FOR MATHS INSTRUCTION</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "12px",
            }}
          >
            Features that actually help you teach maths
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
            Everything you need for engaging, interactive live classes with your students.
          </p>
        </div>

        {/* Feature Blocks Stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          {showcaseBlocks.map((block, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={block.id}
                id={`feature-${block.id}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "40px",
                  alignItems: "center",
                  padding: "36px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                {/* Content Side */}
                <div style={{ order: isReversed ? 2 : 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--accent)",
                      marginBottom: "12px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    FEATURE {block.number}
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-instrument-serif)",
                      fontSize: "clamp(1.7rem, 2.8vw, 2.2rem)",
                      fontWeight: 400,
                      lineHeight: 1.25,
                      color: "var(--text)",
                      marginBottom: "14px",
                    }}
                  >
                    {block.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.98rem",
                      lineHeight: 1.6,
                      color: "var(--muted)",
                      marginBottom: "20px",
                    }}
                  >
                    {block.summary}
                  </p>

                  {/* Bullet points */}
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 28px 0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {block.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "0.92rem",
                          lineHeight: 1.5,
                          color: "var(--text)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <span style={{ color: "var(--accent)", fontSize: "1.1rem", lineHeight: 1 }}>•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Feature action */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                    <MeetWalkthroughButton
                      label="See in a live walkthrough"
                      location={`showcase_${block.id}`}
                      style={{
                        padding: "10px 18px",
                        fontSize: "0.88rem",
                      }}
                    />

                    {SITE.meetDemoReady && (
                      <a
                        href={getMeetDemoUrl()}
                        onClick={() => handleDemoClick(block.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "transparent",
                          color: "var(--accent)",
                          border: "1px solid var(--accent)",
                          padding: "10px 18px",
                          borderRadius: "8px",
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "0.88rem",
                          fontWeight: 500,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          transition: "background 0.15s ease",
                        }}
                      >
                        <span>Try demo room</span>
                        <span>→</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Screenshot Side */}
                {block.image && (
                  <div
                    style={{
                      order: isReversed ? 1 : 2,
                      position: "relative",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      border: "1px solid var(--border)",
                      background: "#0e0d0b",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
                      aspectRatio: "16 / 10",
                    }}
                  >
                    <Image
                      src={block.image}
                      alt={block.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 540px"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Link down to complete catalogue */}
        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <Link
            href="#all-features"
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.92rem",
              color: "var(--accent)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "1px solid var(--accent)",
              background: "rgba(245, 158, 11, 0.08)",
            }}
          >
            <span>See every feature ({totalFeatureCount} total) in the complete catalogue</span>
            <span>↓</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
