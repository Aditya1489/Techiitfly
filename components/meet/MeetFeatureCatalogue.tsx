"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  MEET_FEATURES,
  AVAILABLE_FEATURES,
  COMING_SOON_FEATURES,
  ROADMAP_FEATURES,
  FEATURE_GROUPS,
  MeetFeature,
  MeetFeatureStatus,
  FeatureGroup,
} from "@/content/meetFeatures";
import { SITE, getMeetDemoUrl, getWhatsAppUrl } from "@/content/site";
import MeetWalkthroughButton from "@/components/meet/MeetWalkthroughButton";
import { trackEvent } from "@/lib/tracking";

type FilterTab = "all" | MeetFeatureStatus;

export default function MeetFeatureCatalogue() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [lightboxItem, setLightboxItem] = useState<{
    src: string;
    alt: string;
    title: string;
    description: string;
  } | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    // Default all open
    const initial: Record<string, boolean> = {};
    FEATURE_GROUPS.forEach((g) => {
      initial[g] = true;
    });
    return initial;
  });

  // On mobile (<768px), open first 2 groups and collapse the rest by default
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const mobileState: Record<string, boolean> = {};
      FEATURE_GROUPS.forEach((g, idx) => {
        mobileState[g] = idx < 2;
      });
      setExpandedGroups(mobileState);
    }
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxItem(null);
      }
    };
    if (lightboxItem) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [lightboxItem]);

  const toggleGroup = (group: FeatureGroup) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const handlePrint = () => {
    trackEvent("meet_walkthrough_click", "all_features_print");
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const availableCount = AVAILABLE_FEATURES.length;
  const comingSoonCount = COMING_SOON_FEATURES.length;
  const roadmapCount = ROADMAP_FEATURES.length;

  const filterTabs: { id: FilterTab; label: string; count: number }[] = [
    { id: "all", label: "All", count: MEET_FEATURES.length },
    { id: "available", label: "Available now", count: availableCount },
    { id: "coming-soon", label: "Coming soon", count: comingSoonCount },
    { id: "roadmap", label: "On the roadmap", count: roadmapCount },
  ];

  const requestFeatureUrl = getWhatsAppUrl(
    "Hi techiitfly, I have a feature request for Mathsy Meet."
  );

  return (
    <section
      id="all-features"
      style={{
        padding: "85px 24px 95px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      {/* ─── Print Stylesheet ─── */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #all-features, #all-features * {
            visibility: visible !important;
          }
          #all-features {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            background: #ffffff !important;
            color: #111827 !important;
            padding: 24px !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
          .print-header {
            display: block !important;
            margin-bottom: 24px !important;
            padding-bottom: 16px !important;
            border-bottom: 2px solid #e5e7eb !important;
          }
          .catalogue-group-body {
            display: block !important;
          }
          .catalogue-table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
          .catalogue-table th, .catalogue-table td {
            color: #111827 !important;
            border-bottom: 1px solid #e5e7eb !important;
            background: transparent !important;
          }
          .badge-available, .badge-coming-soon, .badge-roadmap {
            border: 1px solid #9ca3af !important;
            color: #111827 !important;
            background: #f3f4f6 !important;
          }
        }
        @media screen {
          .print-header {
            display: none;
          }
        }
      `}</style>

      {/* ─── Header shown only in Print Mode ─── */}
      <div className="print-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", margin: 0, color: "#111827" }}>
              techiitfly · Mathsy Meet
            </h1>
            <p style={{ margin: "4px 0 0", color: "#4b5563", fontSize: "0.95rem" }}>
              Complete Feature Catalogue &amp; Roadmap
            </p>
          </div>
          <div style={{ textAlign: "right", fontSize: "0.85rem", color: "#6b7280" }}>
            Published October 2026 · techiitfly.com/mathsy-meet
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* ─── Section Header ─── */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-label">COMPLETE FEATURE CATALOGUE</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.3rem, 4.8vw, 3.8rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "12px",
            }}
          >
            Every Mathsy Meet feature
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "680px",
              margin: "0 auto 16px",
            }}
          >
            Full transparency: here&apos;s everything in Mathsy Meet, what works today and what&apos;s coming next.
          </p>

          {/* Dynamic Summary Line from data */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "8px 18px",
              borderRadius: "999px",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.85rem",
              color: "var(--text)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <span style={{ color: "#10b981", fontWeight: 700 }}>● {availableCount} available now</span>
            <span style={{ color: "var(--border)" }}>·</span>
            <span style={{ color: "#f59e0b", fontWeight: 700 }}>● {comingSoonCount} coming soon</span>
            <span style={{ color: "var(--border)" }}>·</span>
            <span style={{ color: "var(--muted)", fontWeight: 600 }}>● {roadmapCount} on the roadmap</span>
          </div>
        </div>

        {/* ─── Filter Pills (Keyboard accessible) ─── */}
        <div
          className="no-print"
          role="tablist"
          aria-label="Filter features by release status"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "36px",
          }}
        >
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  background: isSelected ? "var(--accent)" : "var(--surface)",
                  color: isSelected ? "var(--primary-btn-text)" : "var(--muted)",
                  border: isSelected ? "1px solid var(--accent)" : "1px solid var(--border)",
                  padding: "8px 18px",
                  borderRadius: "999px",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  fontWeight: isSelected ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.75rem",
                    padding: "2px 6px",
                    borderRadius: "999px",
                    background: isSelected ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.06)",
                    color: "inherit",
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ─── Grouped Feature List ─── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {FEATURE_GROUPS.map((group) => {
            const groupFeatures = MEET_FEATURES.filter((f) => {
              if (f.group !== group) return false;
              if (activeFilter === "all") return true;
              return f.status === activeFilter;
            });

            if (groupFeatures.length === 0) return null;

            const isOpen = Boolean(expandedGroups[group]);

            return (
              <div
                key={group}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "var(--card-shadow)",
                  transition: "border-color 0.15s ease",
                }}
              >
                {/* Collapsible Group Header */}
                <button
                  type="button"
                  onClick={() => toggleGroup(group)}
                  aria-expanded={isOpen}
                  className="no-print"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 24px",
                    background: "var(--surface-2)",
                    border: "none",
                    borderBottom: isOpen ? "1px solid var(--border)" : "none",
                    color: "var(--text)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--text)",
                        margin: 0,
                      }}
                    >
                      {group}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.74rem",
                        color: "var(--muted)",
                        background: "var(--bg)",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {groupFeatures.length} {groupFeatures.length === 1 ? "feature" : "features"}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "1rem",
                      color: "var(--muted)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      display: "inline-block",
                    }}
                  >
                    ▼
                  </span>
                </button>

                {/* Print-only group title */}
                <div
                  className="print-header"
                  style={{
                    padding: "12px 16px",
                    background: "#f9fafb",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {group} ({groupFeatures.length})
                </div>

                {/* Collapsible Group Body */}
                <div
                  className="catalogue-group-body"
                  style={{ display: isOpen ? "block" : "none" }}
                >
                  {/* Desktop Table View (>= 768px) */}
                  <div
                    className="catalogue-desktop-view"
                    style={{
                      display: "block",
                      overflowX: "auto",
                    }}
                  >
                    <table
                      className="catalogue-table"
                      style={{
                        width: "100%",
                        borderCollapse: "separate",
                        borderSpacing: 0,
                        textAlign: "left",
                        fontSize: "0.9rem",
                      }}
                    >
                      <thead>
                        <tr style={{ background: "rgba(0,0,0,0.15)" }}>
                          <th
                            style={{
                              padding: "12px 20px",
                              fontFamily: "var(--font-geist-mono)",
                              fontSize: "0.74rem",
                              color: "var(--muted)",
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                              width: "48%",
                              borderBottom: "1px solid var(--border)",
                            }}
                          >
                            Feature
                          </th>
                          <th
                            style={{
                              padding: "12px 16px",
                              fontFamily: "var(--font-geist-mono)",
                              fontSize: "0.74rem",
                              color: "var(--muted)",
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                              width: "22%",
                              borderBottom: "1px solid var(--border)",
                            }}
                          >
                            Status
                          </th>
                          <th
                            style={{
                              padding: "12px 12px",
                              fontFamily: "var(--font-geist-mono)",
                              fontSize: "0.74rem",
                              color: "var(--muted)",
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                              textAlign: "center",
                              width: "10%",
                              borderBottom: "1px solid var(--border)",
                            }}
                          >
                            Solo
                          </th>
                          <th
                            style={{
                              padding: "12px 12px",
                              fontFamily: "var(--font-geist-mono)",
                              fontSize: "0.74rem",
                              color: "var(--muted)",
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                              textAlign: "center",
                              width: "10%",
                              borderBottom: "1px solid var(--border)",
                            }}
                          >
                            Pro
                          </th>
                          <th
                            style={{
                              padding: "12px 12px",
                              fontFamily: "var(--font-geist-mono)",
                              fontSize: "0.74rem",
                              color: "var(--muted)",
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                              textAlign: "center",
                              width: "10%",
                              borderBottom: "1px solid var(--border)",
                            }}
                          >
                            Academy
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupFeatures.map((f, idx) => {
                          const isLast = idx === groupFeatures.length - 1;
                          const hasSolo = f.plans.includes("solo");
                          const hasPro = f.plans.includes("pro");
                          const hasAcademy = f.plans.includes("academy");

                          return (
                            <tr
                              key={f.id}
                              style={{
                                background: idx % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent",
                              }}
                            >
                              {/* Feature Name & Description */}
                              <td
                                style={{
                                  padding: "14px 20px",
                                  borderBottom: isLast ? "none" : "1px solid var(--border)",
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                                  {f.status === "available" && (f.screenshots?.[0] || f.screenshot) && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const shot = f.screenshots?.[0];
                                        setLightboxItem({
                                          src: shot?.src || f.screenshot!,
                                          alt: shot?.alt || f.screenshotAlt || f.title,
                                          title: f.title,
                                          description: f.description,
                                        });
                                      }}
                                      title={`View screenshot: ${f.title}`}
                                      aria-label={`View screenshot for ${f.title}`}
                                      className="no-print"
                                      style={{
                                        position: "relative",
                                        flexShrink: 0,
                                        width: "60px",
                                        height: "38px",
                                        borderRadius: "6px",
                                        overflow: "hidden",
                                        border: "1px solid var(--border)",
                                        background: "var(--surface-2)",
                                        cursor: "pointer",
                                        padding: 0,
                                        transition: "transform 0.15s ease, border-color 0.15s ease",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "scale(1.06)";
                                        e.currentTarget.style.borderColor = "var(--accent)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "scale(1)";
                                        e.currentTarget.style.borderColor = "var(--border)";
                                      }}
                                    >
                                      <Image
                                        src={f.screenshots?.[0]?.thumb || f.screenshots?.[0]?.src || f.screenshot!}
                                        alt={f.title}
                                        fill
                                        sizes="60px"
                                        style={{ objectFit: "cover" }}
                                      />
                                      <span
                                        style={{
                                          position: "absolute",
                                          bottom: "2px",
                                          right: "2px",
                                          background: "rgba(0,0,0,0.75)",
                                          borderRadius: "3px",
                                          fontSize: "9px",
                                          color: "#fff",
                                          padding: "1px 3px",
                                          lineHeight: 1,
                                        }}
                                      >
                                        🔍
                                      </span>
                                    </button>
                                  )}
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div
                                      style={{
                                        fontFamily: "var(--font-geist-sans)",
                                        fontWeight: 600,
                                        color: "var(--text)",
                                        fontSize: "0.93rem",
                                        marginBottom: "4px",
                                      }}
                                    >
                                      {f.title}
                                    </div>
                                    <div
                                      style={{
                                        fontFamily: "var(--font-geist-sans)",
                                        fontSize: "0.82rem",
                                        color: "var(--muted)",
                                        lineHeight: 1.45,
                                      }}
                                    >
                                      {f.description}
                                    </div>
                                    {f.note && (
                                      <div
                                        style={{
                                          fontFamily: "var(--font-geist-mono)",
                                          fontSize: "0.76rem",
                                          color: "var(--accent)",
                                          marginTop: "4px",
                                        }}
                                      >
                                        Note: {f.note}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Status Badge */}
                              <td
                                style={{
                                  padding: "14px 16px",
                                  borderBottom: isLast ? "none" : "1px solid var(--border)",
                                  verticalAlign: "middle",
                                }}
                              >
                                <StatusBadge status={f.status} />
                              </td>

                              {/* Solo */}
                              <td
                                style={{
                                  padding: "14px 12px",
                                  textAlign: "center",
                                  borderBottom: isLast ? "none" : "1px solid var(--border)",
                                  fontFamily: "var(--font-geist-mono)",
                                  fontSize: "0.95rem",
                                  color: hasSolo ? "#10b981" : "var(--muted)",
                                  fontWeight: hasSolo ? 700 : 400,
                                }}
                              >
                                {hasSolo ? "✓" : "—"}
                              </td>

                              {/* Pro */}
                              <td
                                style={{
                                  padding: "14px 12px",
                                  textAlign: "center",
                                  borderBottom: isLast ? "none" : "1px solid var(--border)",
                                  fontFamily: "var(--font-geist-mono)",
                                  fontSize: "0.95rem",
                                  color: hasPro ? "#10b981" : "var(--muted)",
                                  fontWeight: hasPro ? 700 : 400,
                                }}
                              >
                                {hasPro ? "✓" : "—"}
                              </td>

                              {/* Academy */}
                              <td
                                style={{
                                  padding: "14px 12px",
                                  textAlign: "center",
                                  borderBottom: isLast ? "none" : "1px solid var(--border)",
                                  fontFamily: "var(--font-geist-mono)",
                                  fontSize: "0.95rem",
                                  color: hasAcademy ? "#10b981" : "var(--muted)",
                                  fontWeight: hasAcademy ? 700 : 400,
                                }}
                              >
                                {hasAcademy ? "✓" : "—"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Legend Under List ─── */}
        <div
          style={{
            marginTop: "32px",
            padding: "20px 24px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "4px",
            }}
          >
            STATUS DEFINITIONS
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", fontSize: "0.86rem", color: "var(--text)" }}>
            <span style={{ color: "#10b981", fontWeight: 700 }}>● Available now:</span>
            <span style={{ color: "var(--muted)" }}>Works in Mathsy Meet today.</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", fontSize: "0.86rem", color: "var(--text)" }}>
            <span style={{ color: "#f59e0b", fontWeight: 700 }}>● Coming soon:</span>
            <span style={{ color: "var(--muted)" }}>Being completed in the app.</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", fontSize: "0.86rem", color: "var(--text)" }}>
            <span style={{ color: "var(--muted)", fontWeight: 700 }}>● On the roadmap:</span>
            <span style={{ color: "var(--muted)" }}>Planned — no fixed date yet.</span>
          </div>
        </div>

        {/* ─── Action Button Row at End ─── */}
        <div
          className="no-print"
          style={{
            marginTop: "40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {SITE.meetDemoReady ? (
            <a
              href={getMeetDemoUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("meet_demo_click", "feature_catalogue")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 26px",
                borderRadius: "8px",
                background: "var(--accent)",
                color: "var(--primary-btn-text)",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.25)",
              }}
            >
              <span>Try a free demo class</span>
              <span>→</span>
            </a>
          ) : (
            <MeetWalkthroughButton
              label="Book a free walkthrough"
              location="feature_catalogue"
              style={{
                background: "var(--accent)",
                color: "var(--primary-btn-text)",
                border: "none",
                padding: "13px 26px",
                fontSize: "0.95rem",
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.25)",
              }}
            />
          )}

          <a
            href={requestFeatureUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("feature_request", "feature_catalogue")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 24px",
              borderRadius: "8px",
              background: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.95rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <span>Request a feature</span>
            <span>↗</span>
          </a>

          <button
            type="button"
            onClick={handlePrint}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 22px",
              borderRadius: "8px",
              background: "transparent",
              color: "var(--muted)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.92rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <span>Download feature list</span>
            <span>🖨</span>
          </button>
        </div>
      </div>

      {/* ─── Lightbox Modal ─── */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={() => setLightboxItem(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "1080px",
              width: "100%",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid var(--border)",
                background: "var(--surface-2)",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {lightboxItem.title}
                </h3>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                  }}
                >
                  {lightboxItem.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--muted)",
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  lineHeight: 1,
                  transition: "all 0.15s ease",
                }}
                aria-label="Close screenshot preview"
              >
                ✕
              </button>
            </div>

            {/* Modal Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 10",
                maxHeight: "75vh",
                background: "#0a0a0a",
              }}
            >
              <Image
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                fill
                sizes="(max-width: 1080px) 100vw, 1080px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function StatusBadge({ status }: { status: MeetFeatureStatus }) {
  if (status === "available") {
    return (
      <span
        className="badge-available"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(16, 185, 129, 0.12)",
          color: "#10b981",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          padding: "3px 9px",
          borderRadius: "999px",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.74rem",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: "0.6rem" }}>●</span>
        <span>Available now</span>
      </span>
    );
  }

  if (status === "coming-soon") {
    return (
      <span
        className="badge-coming-soon"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(245, 158, 11, 0.12)",
          color: "#f59e0b",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          padding: "3px 9px",
          borderRadius: "999px",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.74rem",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: "0.6rem" }}>●</span>
        <span>Coming soon</span>
      </span>
    );
  }

  return (
    <span
      className="badge-roadmap"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: "rgba(255, 255, 255, 0.05)",
        color: "var(--muted)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        padding: "3px 9px",
        borderRadius: "999px",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.74rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: "0.6rem" }}>●</span>
      <span>On the roadmap</span>
    </span>
  );
}
