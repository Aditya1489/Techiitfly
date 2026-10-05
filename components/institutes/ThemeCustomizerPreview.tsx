"use client";

import { useState } from "react";
import Image from "next/image";

interface ThemeOption {
  id: string;
  name: string;
  primaryColor: string;
  filter: string;
  description: string;
}

const THEMES: ThemeOption[] = [
  {
    id: "amber",
    name: "Mathsy Amber (Default)",
    primaryColor: "#F59E0B",
    filter: "none",
    description: "Standard warm amber accent designed for focused evening study sessions.",
  },
  {
    id: "blue",
    name: "Royal Academy Blue",
    primaryColor: "#2563EB",
    filter: "hue-rotate(180deg) saturate(1.2)",
    description: "Prestigious deep blue theme tailored for collegiate and engineering academies.",
  },
  {
    id: "emerald",
    name: "Emerald Science Green",
    primaryColor: "#10B981",
    filter: "hue-rotate(95deg) saturate(1.15)",
    description: "Vibrant emerald green theme ideal for medical (NEET) and foundation coaching.",
  },
];

export default function ThemeCustomizerPreview() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(THEMES[0]);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "32px",
        marginTop: "32px",
      }}
    >
      {/* Theme selection bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "24px",
          paddingBottom: "20px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.74rem",
              color: "var(--accent)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "4px",
            }}
          >
            INTERACTIVE PALETTE SIMULATION
          </span>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.95rem",
              color: "var(--text)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Select a brand preset to preview how the dashboard adapts:
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {THEMES.map((theme) => {
            const isSelected = selectedTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  background: isSelected ? "var(--surface-2)" : "transparent",
                  border: isSelected ? `2px solid ${theme.primaryColor}` : "1px solid var(--border)",
                  color: isSelected ? "var(--text)" : "var(--muted)",
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.86rem",
                  fontWeight: isSelected ? 600 : 400,
                  transition: "all 0.15s ease",
                }}
              >
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: theme.primaryColor,
                    display: "inline-block",
                  }}
                />
                <span>{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Screen Frame with Filter Preview */}
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          background: "#080807",
          boxShadow: "0 20px 40px -20px rgba(0,0,0,0.7)",
        }}
      >
        {/* Top Browser Bar */}
        <div
          style={{
            height: "36px",
            background: "rgba(18, 17, 14, 0.95)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444", opacity: 0.6 }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b", opacity: 0.6 }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", opacity: 0.6 }} />
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.72rem",
              color: "var(--muted)",
              background: "rgba(243,238,230,0.06)",
              padding: "3px 14px",
              borderRadius: "4px",
            }}
          >
            https://portal.yourinstitute.com/admin/dashboard
          </div>
          <div style={{ width: "40px" }} />
        </div>

        {/* Dashboard Image with CSS Filter applied */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 10",
            overflow: "hidden",
            transition: "filter 0.3s ease",
            filter: selectedTheme.filter,
          }}
        >
          <Image
            src="/screenshots/mathsy/mathsy-tutor-dashboard-desktop.webp"
            alt="Customized institute portal dashboard preview"
            fill
            sizes="(max-width: 1200px) 100vw, 1100px"
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
        </div>
      </div>

      {/* Honest Disclosure Caption */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem",
            color: "var(--muted)",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          Preview only. Your portal uses your own logo, colours and domain.
        </p>
      </div>
    </div>
  );
}
