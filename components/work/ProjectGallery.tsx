"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { CaseStudy, GalleryItem } from "@/content/projects";

interface ProjectGalleryProps {
  project: CaseStudy;
}

type ViewMode = "both" | "desktop" | "mobile";

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  const gallery = project.gallery || [];

  // Fallback if project has no gallery configured
  if (gallery.length === 0) {
    if (!project.featuredScreenshots?.desktop) return null;
    return (
      <div style={{ marginBottom: "64px" }}>
        <span className="section-label">LIVE DEPLOYMENT EVIDENCE</span>
        <h2
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "2.2rem",
            color: "var(--text)",
            marginTop: "8px",
            marginBottom: "24px",
          }}
        >
          Production interface
        </h2>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 18px",
              background: "var(--surface-2)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", opacity: 0.8 }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b", opacity: 0.8 }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", opacity: 0.8 }} />
            </div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.78rem",
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              {project.liveUrl.replace(/^https?:\/\//, "")} ↗
            </a>
          </div>
          <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", background: "#0e0d0b" }}>
            <Image
              src={project.featuredScreenshots.desktop}
              alt={`${project.title} production desktop interface`}
              fill
              sizes="(max-width: 1040px) 100vw, 1040px"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return <ActiveGallery project={project} gallery={gallery} />;
}

function ActiveGallery({
  project,
  gallery,
}: {
  project: CaseStudy;
  gallery: GalleryItem[];
}) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>("both");
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxDevice, setLightboxDevice] = useState<"desktop" | "mobile">("desktop");
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Tablist & Mobile swipe refs
  const tabListRef = useRef<HTMLDivElement>(null);
  const swipeContainerRef = useRef<HTMLDivElement>(null);

  // Screen size & prefers-reduced-motion listener
  useEffect(() => {
    const checkScreen = () => {
      const isMobile = window.innerWidth < 1024;
      setIsMobileScreen(isMobile);
      if (isMobile) {
        setViewMode((prev) => (prev === "both" ? "mobile" : prev));
      }
    };

    const mediaMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaMotion.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    mediaMotion.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", checkScreen);
      mediaMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Preload next tab's posters
  useEffect(() => {
    if (typeof window === "undefined") return;
    const nextIdx = (activeTab + 1) % gallery.length;
    const nextItem = gallery[nextIdx];
    if (nextItem) {
      const imgD = new window.Image();
      imgD.src = nextItem.desktopPoster;
      const imgM = new window.Image();
      imgM.src = nextItem.mobilePoster;
    }
  }, [activeTab, gallery]);

  // Tab change handler
  const handleSelectTab = useCallback(
    (index: number) => {
      setActiveTab(index);
      if (swipeContainerRef.current) {
        const slide = swipeContainerRef.current.children[index] as HTMLElement;
        if (slide) {
          slide.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      }
      // Scroll tab into view if needed in the pill row
      if (tabListRef.current) {
        const tabBtn = tabListRef.current.children[index] as HTMLElement;
        if (tabBtn) {
          tabBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      }
    },
    []
  );

  // Keyboard navigation for tablist
  const handleKeyDownTab = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (index + 1) % gallery.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = (index - 1 + gallery.length) % gallery.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = gallery.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      handleSelectTab(nextIndex);
      const targetBtn = tabListRef.current?.children[nextIndex] as HTMLButtonElement;
      targetBtn?.focus();
    }
  };

  // Open lightbox
  const openLightbox = (device: "desktop" | "mobile") => {
    setLightboxDevice(device);
    setLightboxIndex(activeTab);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Lightbox keyboard handler (Esc, Arrows)
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % gallery.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen, gallery.length]);

  const currentPage = gallery[activeTab];
  const domain = project.liveUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const livePageUrl = `${project.liveUrl.replace(/\/$/, "")}${currentPage.path.startsWith("/") ? "" : "/"}${currentPage.path}`;

  return (
    <section
      aria-label="Website Page Gallery"
      style={{
        marginBottom: "72px",
        marginTop: "16px",
      }}
    >
      {/* Header section */}
      <div style={{ marginBottom: "24px" }}>
        <span className="section-label">LIVE DEPLOYMENT EVIDENCE</span>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "8px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 400,
                color: "var(--text)",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Explore the website
            </h2>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1rem",
                color: "var(--muted)",
                marginTop: "6px",
                marginBottom: 0,
              }}
            >
              Tap a page to see it on desktop and mobile.
            </p>
          </div>

          {/* View switcher (Desktop: Both / Desktop / Mobile; Mobile screen: Mobile / Desktop) */}
          <div
            role="group"
            aria-label="Select device display mode"
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "999px",
              padding: "4px",
              gap: "4px",
            }}
          >
            {!isMobileScreen && (
              <button
                type="button"
                onClick={() => setViewMode("both")}
                aria-pressed={viewMode === "both"}
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.78rem",
                  padding: "5px 14px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  background: viewMode === "both" ? "var(--accent)" : "transparent",
                  color: viewMode === "both" ? "var(--primary-btn-text)" : "var(--muted)",
                  fontWeight: viewMode === "both" ? 600 : 400,
                  transition: "all 0.15s ease",
                }}
              >
                Both
              </button>
            )}
            <button
              type="button"
              onClick={() => setViewMode("desktop")}
              aria-pressed={viewMode === "desktop"}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.78rem",
                padding: "5px 14px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                background: viewMode === "desktop" ? "var(--accent)" : "transparent",
                color: viewMode === "desktop" ? "var(--primary-btn-text)" : "var(--muted)",
                fontWeight: viewMode === "desktop" ? 600 : 400,
                transition: "all 0.15s ease",
              }}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setViewMode("mobile")}
              aria-pressed={viewMode === "mobile"}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.78rem",
                padding: "5px 14px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                background: viewMode === "mobile" ? "var(--accent)" : "transparent",
                color: viewMode === "mobile" ? "var(--primary-btn-text)" : "var(--muted)",
                fontWeight: viewMode === "mobile" ? 600 : 400,
                transition: "all 0.15s ease",
              }}
            >
              Mobile
            </button>
          </div>
        </div>
      </div>

      {/* Page Tabs (Pills) */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-label={`${project.title} website pages`}
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "10px",
          marginBottom: "20px",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {gallery.map((page, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={page.id}
              role="tab"
              id={`tab-${page.id}`}
              aria-controls={`panel-${page.id}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelectTab(idx)}
              onKeyDown={(e) => handleKeyDownTab(e, idx)}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.82rem",
                padding: "8px 16px",
                borderRadius: "999px",
                whiteSpace: "nowrap",
                border: isActive ? "1px solid var(--accent)" : "1px solid var(--border)",
                background: isActive ? "var(--accent)" : "var(--surface)",
                color: isActive ? "var(--primary-btn-text)" : "var(--muted)",
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: isActive ? "0 4px 14px rgba(245, 158, 11, 0.25)" : "none",
                flexShrink: 0,
              }}
            >
              {page.label}
            </button>
          );
        })}
      </div>

      {/* Main Showcase Stage */}
      <div
        id={`panel-${currentPage.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${currentPage.id}`}
        style={{
          position: "relative",
          width: "100%",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: isMobileScreen ? "18px 14px 24px" : "32px 32px 28px",
          boxShadow: "var(--card-shadow)",
          overflow: "hidden",
          transition: reducedMotion ? "none" : "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Frame container: handles Both / Desktop / Mobile views */}
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: isMobileScreen ? "520px" : viewMode === "mobile" ? "620px" : "540px",
          }}
        >
          {/* VIEW: BOTH (Desktop screen only) */}
          {viewMode === "both" && !isMobileScreen && (
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "960px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Browser Frame (~72% width) */}
              <div
                style={{
                  width: "75%",
                  zIndex: 1,
                  position: "relative",
                }}
              >
                <BrowserFrame
                  projectTitle={project.title}
                  domain={domain}
                  page={currentPage}
                  reducedMotion={reducedMotion}
                  onOpenLightbox={() => openLightbox("desktop")}
                />
              </div>

              {/* Phone Frame (~30% width, overlapping bottom-right corner) */}
              <div
                style={{
                  position: "absolute",
                  right: "0px",
                  bottom: "-20px",
                  width: "28%",
                  maxWidth: "260px",
                  zIndex: 2,
                }}
              >
                <PhoneFrame
                  projectTitle={project.title}
                  page={currentPage}
                  reducedMotion={reducedMotion}
                  onOpenLightbox={() => openLightbox("mobile")}
                />
              </div>
            </div>
          )}

          {/* VIEW: DESKTOP ONLY */}
          {viewMode === "desktop" && (
            <div
              style={{
                width: "100%",
                maxWidth: "920px",
                margin: "0 auto",
              }}
            >
              <BrowserFrame
                projectTitle={project.title}
                domain={domain}
                page={currentPage}
                reducedMotion={reducedMotion}
                onOpenLightbox={() => openLightbox("desktop")}
              />
            </div>
          )}

          {/* VIEW: MOBILE ONLY */}
          {viewMode === "mobile" && (
            <div
              style={{
                width: "100%",
                maxWidth: isMobileScreen ? "320px" : "340px",
                margin: "0 auto",
              }}
            >
              <PhoneFrame
                projectTitle={project.title}
                page={currentPage}
                reducedMotion={reducedMotion}
                onOpenLightbox={() => openLightbox("mobile")}
              />
            </div>
          )}
        </div>

        {/* Caption & Live Page Link below the frames */}
        <div
          style={{
            marginTop: "24px",
            paddingTop: "18px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ flex: "1 1 300px" }}>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                display: "block",
                marginBottom: "4px",
              }}
            >
              {currentPage.label} · Page Overview
            </span>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.92rem",
                color: "var(--text)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {currentPage.caption}
            </p>
          </div>

          <a
            href={livePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.8rem",
              color: "var(--accent)",
              textDecoration: "none",
              background: "var(--surface-2)",
              padding: "7px 14px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              transition: "border-color 0.15s ease",
            }}
          >
            <span>Open this page</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Mobile Swipe Indicators / Pagination Dots (visible on mobile screens) */}
      {isMobileScreen && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          {gallery.map((page, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={`dot-${page.id}`}
                type="button"
                aria-label={`Go to ${page.label}`}
                onClick={() => handleSelectTab(idx)}
                style={{
                  width: isActive ? "22px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: isActive ? "var(--accent)" : "var(--border)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.25s ease",
                }}
              />
            );
          })}
        </div>
      )}

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} ${gallery[lightboxIndex].label} Full Page Lightbox`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(10, 9, 8, 0.96)",
            backdropFilter: "blur(14px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Lightbox Top Navigation Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 24px",
              background: "rgba(22, 19, 15, 0.9)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              zIndex: 10,
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {/* Title & Counter */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.85rem",
                  color: "var(--text)",
                  fontWeight: 600,
                }}
              >
                {project.title} · {gallery[lightboxIndex].label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  background: "rgba(255, 255, 255, 0.08)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                {lightboxIndex + 1} of {gallery.length}
              </span>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Device Toggle inside Lightbox */}
              <div
                style={{
                  display: "inline-flex",
                  background: "rgba(0, 0, 0, 0.4)",
                  borderRadius: "999px",
                  padding: "3px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setLightboxDevice("desktop")}
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.72rem",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    border: "none",
                    background: lightboxDevice === "desktop" ? "var(--accent)" : "transparent",
                    color: lightboxDevice === "desktop" ? "#0e0d0b" : "var(--muted)",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxDevice("mobile")}
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.72rem",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    border: "none",
                    background: lightboxDevice === "mobile" ? "var(--accent)" : "transparent",
                    color: lightboxDevice === "mobile" ? "#0e0d0b" : "var(--muted)",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Mobile
                </button>
              </div>

              {/* Prev / Next Page */}
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
                aria-label="Previous page"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "var(--text)",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                }}
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev + 1) % gallery.length)}
                aria-label="Next page"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "var(--text)",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                }}
              >
                Next →
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close lightbox"
                style={{
                  background: "var(--accent)",
                  border: "none",
                  color: "#0e0d0b",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginLeft: "6px",
                }}
              >
                Close (Esc)
              </button>
            </div>
          </div>

          {/* Lightbox Scrollable Container with full-page image */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "24px 16px 80px",
              display: "flex",
              justifyContent: "center",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: lightboxDevice === "desktop" ? "1240px" : "420px",
                background: "#100E0C",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                overflow: "hidden",
                boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                alignSelf: "flex-start",
              }}
            >
              <img
                src={
                  lightboxDevice === "desktop"
                    ? gallery[lightboxIndex].desktop
                    : gallery[lightboxIndex].mobile
                }
                alt={`${project.title} ${gallery[lightboxIndex].label} page on ${lightboxDevice}`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   BROWSER FRAME COMPONENT
   ───────────────────────────────────────────────────────────── */
function BrowserFrame({
  projectTitle,
  domain,
  page,
  reducedMotion,
  onOpenLightbox,
}: {
  projectTitle: string;
  domain: string;
  page: GalleryItem;
  reducedMotion: boolean;
  onOpenLightbox: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [loadFullImage, setLoadFullImage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(420);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, [page.id]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setLoadFullImage(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="force-dark"
      data-theme="dark"
      style={{
        borderRadius: "14px",
        background: "#100E0C",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        boxShadow: "0 20px 45px rgba(0, 0, 0, 0.55), 0 0 20px rgba(0, 0, 0, 0.4)",
        overflow: "hidden",
        position: "relative",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Browser Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "9px 14px",
          background: "#16130F",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginLeft: "10px",
              background: "rgba(255, 255, 255, 0.05)",
              padding: "2px 10px",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a39e94" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.68rem",
                color: "#e2ddd5",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "260px",
              }}
            >
              {domain}{page.path}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenLightbox}
          title="Click to expand full page"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.68rem",
            color: "var(--muted)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          Expand ⛶
        </button>
      </div>

      {/* Screen Area */}
      <div
        ref={containerRef}
        onClick={onOpenLightbox}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          background: "#0e0d0b",
          cursor: "pointer",
        }}
      >
        {/* Poster Image (shown first) */}
        <img
          src={page.desktopPoster}
          alt={`${projectTitle} ${page.label} page on desktop`}
          width={1440}
          height={900}
          loading="eager"
          decoding="async"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            opacity: loadFullImage ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Full-Page Image (loaded on hover/tap, smoothly scrolls top to bottom) */}
        {loadFullImage && (
          <img
            src={page.desktop}
            alt={`${projectTitle} ${page.label} page on desktop`}
            width={1440}
            height={6000}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "auto",
              display: "block",
              transform:
                !reducedMotion && isHovered
                  ? `translateY(calc(-100% + ${containerHeight}px))`
                  : "translateY(0px)",
              transition:
                !reducedMotion
                  ? isHovered
                    ? "transform 12s linear"
                    : "transform 0.4s ease-out"
                  : "none",
            }}
          />
        )}

        {/* Subtle hover hint badge */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            background: "rgba(16, 14, 12, 0.88)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#f3eee6",
            padding: "4px 10px",
            borderRadius: "999px",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.68rem",
            opacity: isHovered ? 0 : 0.88,
            pointerEvents: "none",
            transition: "opacity 0.25s ease",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span>Hover to scroll</span>
          <span>↓</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PHONE FRAME COMPONENT
   ───────────────────────────────────────────────────────────── */
function PhoneFrame({
  projectTitle,
  page,
  reducedMotion,
  onOpenLightbox,
}: {
  projectTitle: string;
  page: GalleryItem;
  reducedMotion: boolean;
  onOpenLightbox: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [loadFullImage, setLoadFullImage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(480);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, [page.id]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setLoadFullImage(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = () => {
    setIsHovered((prev) => !prev);
    setLoadFullImage(true);
  };

  return (
    <div
      className="force-dark"
      data-theme="dark"
      style={{
        borderRadius: "26px",
        background: "#100E0C",
        border: "2px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75), 0 0 25px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Phone Notch Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "7px 10px",
          background: "#16130F",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "4px",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.3)",
          }}
        />
      </div>

      {/* Screen Area */}
      <div
        ref={containerRef}
        onClick={onOpenLightbox}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "390 / 844",
          overflow: "hidden",
          background: "#0e0d0b",
          cursor: "pointer",
        }}
      >
        {/* Poster Image (shown first) */}
        <img
          src={page.mobilePoster}
          alt={`${projectTitle} ${page.label} page on mobile`}
          width={390}
          height={844}
          loading="eager"
          decoding="async"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            opacity: loadFullImage ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Full-Page Image (loaded on hover/tap, smoothly scrolls top to bottom) */}
        {loadFullImage && (
          <img
            src={page.mobile}
            alt={`${projectTitle} ${page.label} page on mobile`}
            width={780}
            height={5000}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "auto",
              display: "block",
              transform:
                !reducedMotion && isHovered
                  ? `translateY(calc(-100% + ${containerHeight}px))`
                  : "translateY(0px)",
              transition:
                !reducedMotion
                  ? isHovered
                    ? "transform 10s linear"
                    : "transform 0.4s ease-out"
                  : "none",
            }}
          />
        )}

        {/* Subtle hover/tap hint badge */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(16, 14, 12, 0.88)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#f3eee6",
            padding: "3px 9px",
            borderRadius: "999px",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.62rem",
            opacity: isHovered ? 0 : 0.88,
            pointerEvents: "none",
            transition: "opacity 0.25s ease",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>Tap/Hover to scroll</span>
          <span>↓</span>
        </div>
      </div>
    </div>
  );
}
