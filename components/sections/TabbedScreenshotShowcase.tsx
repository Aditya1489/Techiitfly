"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { GlorifiedScreenshot } from "@/content/projects";

interface TabbedScreenshotShowcaseProps {
  items: GlorifiedScreenshot[];
  title?: string;
  subtitle?: string;
}

export default function TabbedScreenshotShowcase({
  items,
  title = "Production Platform Showcase",
  subtitle = "Interactive tabbed tour of verified production interfaces, featuring exam engines, live evaluation, and student telemetry.",
}: TabbedScreenshotShowcaseProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isPermanentlyPaused, setIsPermanentlyPaused] = useState(false);
  const [isOffScreen, setIsOffScreen] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [activeModalItem, setActiveModalItem] = useState<GlorifiedScreenshot | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Permanently pause on any user interaction
  const triggerPermanentPause = useCallback(() => {
    setIsPermanentlyPaused(true);
  }, []);

  // Preload next image and all images for instant 300ms crossfade with zero blank frames
  useEffect(() => {
    if (!items || items.length === 0) return;
    const nextIdx = (activeTab + 1) % items.length;
    if (items[nextIdx]?.src) {
      const img = new Image();
      img.src = items[nextIdx].src;
    }
    items.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, [activeTab, items]);

  // Pause when document is hidden (user switched tabs or minimized window)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleVisibilityChange = () => {
      setIsDocumentHidden(document.visibilityState === "hidden");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Pause when off-screen via IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsOffScreen(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance every 5 seconds if not paused
  useEffect(() => {
    if (!items || items.length <= 1) return;
    if (isPermanentlyPaused || isOffScreen || isDocumentHidden) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [items, isPermanentlyPaused, isOffScreen, isDocumentHidden]);

  // Keyboard navigation for role="tablist"
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!items || items.length === 0) return;

    let targetIndex = activeTab;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      targetIndex = (activeTab + 1) % items.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      targetIndex = (activeTab - 1 + items.length) % items.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      targetIndex = items.length - 1;
    } else {
      return;
    }

    triggerPermanentPause();
    setActiveTab(targetIndex);
    tabsRef.current[targetIndex]?.focus();
  };

  // Mobile scroll synchronization for dot indicators
  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.clientWidth * 0.88 + 16;
    const index = Math.round(scrollLeft / cardWidth);
    setMobileIndex(Math.min(items.length - 1, Math.max(0, index)));
  };

  const scrollToMobileSlide = (idx: number) => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * 0.88 + 16;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
    setMobileIndex(idx);
  };

  if (!items || items.length === 0) return null;

  const isAutoAdvancing = !isPermanentlyPaused && !isOffScreen && !isDocumentHidden;

  return (
    <div
      ref={containerRef}
      className="tabbed-showcase-container"
      onMouseEnter={triggerPermanentPause}
      onClick={triggerPermanentPause}
      onTouchStart={triggerPermanentPause}
      onFocusCapture={triggerPermanentPause}
      style={{ marginBottom: "72px" }}
    >
      <style>{`
        .tabbed-showcase-container {
          position: relative;
        }

        @keyframes tabProgressAnim {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .tab-progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: var(--accent);
          border-radius: 0 0 8px 8px;
          animation: tabProgressAnim 5s linear forwards;
        }

        /* Desktop View: >=1024px */
        .tabbed-desktop-view {
          display: block;
        }

        .tabbed-mobile-view {
          display: none;
        }

        .tabbed-reduced-motion-view {
          display: none;
        }

        /* Mobile View: <1024px */
        @media (max-width: 1023px) {
          .tabbed-desktop-view {
            display: none !important;
          }
          .tabbed-mobile-view {
            display: block !important;
          }
        }

        /* Reduced Motion: no crossfades, no autoplay, static vertical stack */
        @media (prefers-reduced-motion: reduce) {
          .tabbed-desktop-view {
            display: none !important;
          }
          .tabbed-mobile-view {
            display: none !important;
          }
          .tabbed-reduced-motion-view {
            display: flex !important;
            flex-direction: column;
            gap: 36px;
          }
        }
      `}</style>

      {/* Section Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)" }} />
          <span className="section-label" style={{ margin: 0 }}>
            VERIFIED PLATFORM SCREENS // INTERACTIVE SUITE
          </span>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 400,
            color: "var(--text)",
            marginTop: "6px",
            marginBottom: "8px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.95rem",
            color: "var(--muted)",
            maxWidth: "700px",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. DESKTOP VIEW (≥1024px): Tab Row + Browser Frame
          ───────────────────────────────────────────────────────────── */}
      <div className="tabbed-desktop-view">
        {/* Tab Row (Pill Buttons) */}
        <div
          role="tablist"
          aria-label="Platform feature screenshots"
          onKeyDown={handleKeyDown}
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {items.map((item, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabsRef.current[idx] = el;
                }}
                role="tab"
                id={`tab-${item.id}`}
                aria-controls={`panel-${item.id}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => {
                  triggerPermanentPause();
                  setActiveTab(idx);
                }}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "9px 16px 11px",
                  borderRadius: "8px",
                  background: isActive ? "var(--surface)" : "rgba(255,255,255,0.03)",
                  border: isActive ? "1px solid var(--accent)" : "1px solid var(--border)",
                  color: isActive ? "var(--text)" : "var(--muted)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease, background 0.2s ease, color 0.2s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.72rem",
                    color: isActive ? "var(--accent)" : "var(--muted)",
                  }}
                >
                  0{idx + 1}
                </span>
                <span>{item.badge || item.title}</span>

                {/* Thin amber progress bar inside active tab if auto-advancing */}
                {isActive && isAutoAdvancing && <div key={`progress-${activeTab}`} className="tab-progress-bar" />}
              </button>
            );
          })}

          {/* Autoplay status hint */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                color: isPermanentlyPaused ? "var(--muted)" : "var(--accent)",
              }}
            >
              {isPermanentlyPaused ? "Manual control" : "Auto-advancing (5s)"}
            </span>
          </div>
        </div>

        {/* Large Screenshot in Browser Frame */}
        <div
          className="force-dark"
          data-theme="dark"
          role="tabpanel"
          id={`panel-${items[activeTab]?.id}`}
          aria-labelledby={`tab-${items[activeTab]?.id}`}
          style={{
            background: "#100E0C",
            border: "1px solid rgba(245,158,11,0.24)",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 24px 60px -10px rgba(0,0,0,0.85)",
          }}
        >
          {/* Browser Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              background: "#16130F",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ display: "flex", gap: "5px" }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ef4444", opacity: 0.85 }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#f59e0b", opacity: 0.85 }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#10b981", opacity: 0.85 }} />
              </div>

              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.72rem",
                  color: "var(--text)",
                  background: "rgba(0,0,0,0.45)",
                  padding: "3px 10px",
                  borderRadius: "5px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ color: "#10b981", fontSize: "0.65rem" }}>🔒</span>
                <span>{items[activeTab]?.url ? items[activeTab].url.replace("https://", "") : "mathsy.in"}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.68rem",
                  color: "#34d399",
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  padding: "2px 7px",
                  borderRadius: "999px",
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981" }} />
                Live
              </span>
            </div>
          </div>

          {/* Screenshot Area: 300ms Crossfade between images */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 10",
              background: "#0a0908",
              overflow: "hidden",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              cursor: "pointer",
            }}
            onClick={() => setActiveModalItem(items[activeTab])}
          >
            {items.map((item, idx) => {
              const isActive = idx === activeTab;
              return (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "scale(1)" : "scale(0.98)",
                    transition: "opacity 300ms ease, transform 300ms ease",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      display: "block",
                    }}
                  />
                </div>
              );
            })}

            <div
              style={{
                position: "absolute",
                bottom: "8px",
                right: "10px",
                background: "rgba(10,9,8,0.8)",
                backdropFilter: "blur(4px)",
                padding: "3px 8px",
                borderRadius: "4px",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.68rem",
                color: "var(--accent)",
                border: "1px solid rgba(245,158,11,0.2)",
                pointerEvents: "none",
              }}
            >
              Click to inspect 2880×1800 ↗
            </div>
          </div>

          {/* Short Caption Under Image */}
          <div
            style={{
              padding: "14px 20px",
              background: "#14110E",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginRight: "10px",
                }}
              >
                {items[activeTab]?.title}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  color: "var(--muted)",
                }}
              >
                — {items[activeTab]?.description}
              </span>
            </div>

            {items[activeTab]?.url && (
              <a
                href={items[activeTab].url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  textDecoration: "none",
                }}
              >
                Visit live portal ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MOBILE VIEW (<1024px): Horizontal Swipe Carousel (CSS Scroll-Snap)
          ───────────────────────────────────────────────────────────── */}
      <div className="tabbed-mobile-view">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            padding: "8px 4px 16px 4px",
          }}
        >
          {items.map((item, idx) => (
            <article
              key={`tabbed-mob-${item.id}`}
              style={{
                flex: "0 0 88%",
                minWidth: "88%",
                maxWidth: "88%",
                scrollSnapAlign: "center",
                background: "#100E0C",
                border: "1px solid rgba(245,158,11,0.22)",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 14px 30px -10px rgba(0,0,0,0.75)",
              }}
            >
              {/* Window Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
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
                      fontSize: "0.68rem",
                      color: "var(--muted)",
                      marginLeft: "6px",
                    }}
                  >
                    {item.url ? item.url.replace("https://", "") : "mathsy.in"}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.65rem",
                    color: "var(--accent)",
                  }}
                >
                  0{idx + 1}/0{items.length}
                </span>
              </div>

              {/* Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  background: "#0a0908",
                  overflow: "hidden",
                }}
                onClick={() => setActiveModalItem(item)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                  }}
                />
              </div>

              {/* Caption Underneath Image */}
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.68rem",
                      color: "var(--accent)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.eyebrow || item.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.65rem",
                      color: "var(--muted)",
                      background: "rgba(255,255,255,0.05)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                <h4
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "1.45rem",
                    fontWeight: 400,
                    color: "var(--text)",
                    margin: "0 0 8px 0",
                  }}
                >
                  {item.title}
                </h4>

                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.88rem",
                    lineHeight: 1.5,
                    color: "var(--muted)",
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Dot Indicators */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "14px",
          }}
        >
          {items.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              type="button"
              onClick={() => scrollToMobileSlide(idx)}
              aria-label={`Jump to slide ${idx + 1}`}
              style={{
                width: mobileIndex === idx ? "26px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: mobileIndex === idx ? "var(--accent)" : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. REDUCED MOTION VIEW: Static Stack with Captions
          ───────────────────────────────────────────────────────────── */}
      <div className="tabbed-reduced-motion-view">
        {items.map((item, idx) => (
          <article
            key={`reduced-${item.id}`}
            style={{
              background: "#100E0C",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                background: "#16130F",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--text)" }}>
                  0{idx + 1}: {item.title}
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", color: "var(--accent)" }}>
                {item.badge}
              </span>
            </div>

            <div style={{ width: "100%", aspectRatio: "16 / 10", background: "#0a0908" }}>
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>

            <div style={{ padding: "16px 20px" }}>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.95rem", color: "var(--muted)", margin: 0 }}>
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Lightbox Modal for High-Resolution Pixel Clarity
          ───────────────────────────────────────────────────────────── */}
      {activeModalItem && (
        <div
          onClick={() => setActiveModalItem(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(5,4,3,0.88)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            className="force-dark"
            data-theme="dark"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "1100px",
              width: "100%",
              maxHeight: "92vh",
              background: "#100E0C",
              border: "1px solid var(--accent)",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.9)",
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
                padding: "14px 20px",
                background: "#16130F",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                <h3
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  {activeModalItem.title}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.72rem",
                    color: "var(--accent)",
                    background: "rgba(245,158,11,0.12)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {activeModalItem.badge}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => setIsZoomed((prev) => !prev)}
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.72rem",
                    color: isZoomed ? "var(--accent)" : "var(--muted)",
                    background: isZoomed ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.05)",
                    border: isZoomed ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.12)",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <span>{isZoomed ? "Fit to Window" : "🔍 Zoom 100% (2880×1800)"}</span>
                </button>

                <a
                  href={activeModalItem.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.72rem",
                    color: "var(--accent)",
                    background: "rgba(245,158,11,0.08)",
                    border: "1px solid rgba(245,158,11,0.22)",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
                >
                  Full Res ↗
                </a>

                <button
                  onClick={() => {
                    setActiveModalItem(null);
                    setIsZoomed(false);
                  }}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "none",
                    color: "var(--text)",
                    width: "30px",
                    height: "30px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Image View */}
            <div
              style={{
                overflow: "auto",
                padding: "16px",
                background: "#080706",
                maxHeight: "75vh",
              }}
            >
              <img
                src={activeModalItem.src}
                alt={activeModalItem.title}
                onClick={() => setIsZoomed((prev) => !prev)}
                style={{
                  width: isZoomed ? "auto" : "100%",
                  maxWidth: isZoomed ? "none" : "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  cursor: isZoomed ? "zoom-out" : "zoom-in",
                }}
              />
            </div>

            {/* Modal Description */}
            <div style={{ padding: "14px 20px", background: "#14110E", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
                {activeModalItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
