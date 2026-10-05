"use client";

import { useState } from "react";

interface MathsyMeetMediaSlotProps {
  screenshotPath?: string;
  videoPath?: string;
}

export default function MathsyMeetMediaSlot({
  screenshotPath = "/screenshots/mathsy-meet-desktop.webp",
  videoPath = "/video/mathsy-meet-demo.mp4",
}: MathsyMeetMediaSlotProps) {
  const [hasVideoError, setHasVideoError] = useState(true); // default to screenshot since demo video not yet provided
  const [hasImageError, setHasImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        border: "1px solid rgba(245,158,11,0.25)",
        background: "#0c0a08",
        marginBottom: "28px",
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8)",
      }}
    >
      {/* Slot Header Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          background: "#14110e",
          borderBottom: "1px solid rgba(245,158,11,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.75rem",
              color: "var(--text)",
              letterSpacing: "0.05em",
            }}
          >
            MATHSY MEET // BESPOKE VIRTUAL CLASSROOM
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.72rem",
            color: "var(--muted)",
          }}
        >
          Mediasoup SFU + TLDraw Math Tools
        </span>
      </div>

      {/* Video or Image Viewport */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          maxHeight: "560px",
          background: "#0E0D0B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {hasImageError ? (
          <div
            style={{
              padding: "48px 24px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1px dashed var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              ▶
            </div>
            <p
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.85rem",
                color: "var(--text)",
                margin: 0,
              }}
            >
              Mathsy Meet Virtual Classroom Slot
            </p>
          </div>
        ) : hasVideoError ? (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src={screenshotPath}
              alt="Mathsy Meet Live Virtual Classroom"
              loading="lazy"
              onError={() => setHasImageError(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Live Indicator Pill */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 10px",
                borderRadius: "999px",
                background: "rgba(10,9,8,0.75)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(16,185,129,0.3)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                color: "#34d399",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
              Live Lecture Session
            </div>
          </div>
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={screenshotPath}
            onError={() => setHasVideoError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source src={videoPath} type="video/mp4" onError={() => setHasVideoError(true)} />
            <img
              src={screenshotPath}
              alt="Mathsy Meet Virtual Classroom"
              loading="lazy"
              onError={() => setHasImageError(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </video>
        )}
      </div>
    </div>
  );
}
