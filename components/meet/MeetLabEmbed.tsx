"use client";

import dynamic from "next/dynamic";

const WhiteboardCanvas = dynamic(() => import("@/components/lab/WhiteboardCanvas"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "500px",
        background: "var(--surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.85rem",
        color: "var(--muted)",
      }}
    >
      Initializing Mathsy Meet geometric canvas...
    </div>
  ),
});

export default function MeetLabEmbed() {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "16px",
          paddingBottom: "14px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.72rem",
              color: "var(--accent)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
            }}
          >
            INTERACTIVE WHITEBOARD CANVAS
          </span>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.9rem",
              color: "var(--muted)",
              margin: 0,
            }}
          >
            Select a tool from the bar below and click or drag on the canvas to draw:
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Compass (Arcs & Circles)", "Protractor (180° / 360°)", "Ruler (Linear Metric)", "Set-Square (30°/60°/90°)"].map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                color: "var(--text)",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <WhiteboardCanvas />
    </div>
  );
}
