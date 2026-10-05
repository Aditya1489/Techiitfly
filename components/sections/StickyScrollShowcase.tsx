"use client";

import { useEffect, useRef, useState } from "react";
import { GlorifiedScreenshot } from "@/content/projects";

interface StickyScrollShowcaseProps {
  items: GlorifiedScreenshot[];
  title?: string;
  subtitle?: string;
}

export default function StickyScrollShowcase({
  items,
  title = "Production Platform Showcase",
  subtitle = "Scroll through production interfaces across the student learning portal, test series engine, tutor evaluation queue, and practice modules.",
}: StickyScrollShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [activeModalItem, setActiveModalItem] = useState<GlorifiedScreenshot | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Preload next and all images so crossfades never show a blank frame
  useEffect(() => {
    if (!items || items.length === 0) return;
    const nextIdx = (activeIndex + 1) % items.length;
    if (items[nextIdx]?.src) {
      const img = new Image();
      img.src = items[nextIdx].src;
    }
    // Also preload all images progressively
    items.forEach((item) => {
      const preloadImg = new Image();
      preloadImg.src = item.src;
    });
  }, [activeIndex, items]);

  // Desktop IntersectionObserver for native sticky scrolling
  useEffect(() => {
    if (typeof window === "undefined" || !items || items.length === 0) return;

    // We observe each step element. When it crosses the vertical center of the viewport,
    // we activate its index.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxStr = entry.target.getAttribute("data-step-index");
            if (idxStr !== null) {
              const idx = parseInt(idxStr, 10);
              if (!isNaN(idx)) {
                setActiveIndex(idx);
              }
            }
          }
        });
      },
      {
        root: null,
        // Trigger as each step crosses the middle band of the viewport
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  // Mobile scroll synchronization for dot indicators
  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.clientWidth * 0.88 + 16; // 88% width + gap
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

  return (
    <section className="sticky-scroll-showcase" style={{ marginBottom: "80px" }}>
      {/* Inline styles for responsive views and reduced motion */}
      <style>{`
        .sticky-scroll-showcase {
          position: relative;
        }

        /* Desktop Sticky Scroll View: >=1024px */
        .showcase-desktop {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 48px;
          align-items: start;
          position: relative;
        }

        .showcase-mobile {
          display: none;
        }

        .showcase-reduced-motion {
          display: none;
        }

        /* Mobile View: <1024px */
        @media (max-width: 1023px) {
          .showcase-desktop {
            display: none !important;
          }
          .showcase-mobile {
            display: block !important;
          }
        }

        /* Reduced Motion: no crossfades, no pinning, static vertical stack */
        @media (prefers-reduced-motion: reduce) {
          .showcase-desktop {
            display: none !important;
          }
          .showcase-mobile {
            display: none !important;
          }
          .showcase-reduced-motion {
            display: flex !important;
            flex-direction: column;
            gap: 40px;
          }
        }
      `}</style>

      {/* Section Header */}
      <div style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)" }} />
          <span className="section-label" style={{ margin: 0 }}>
            LIVE PLATFORM SCREENS // STICKY SHOWCASE
          </span>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "var(--text)",
            marginTop: "6px",
            marginBottom: "10px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "1rem",
            color: "var(--muted)",
            maxWidth: "720px",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. DESKTOP VIEW (≥1024px): Two Columns (Left Steps, Right Sticky Frame)
          ───────────────────────────────────────────────────────────── */}
      <div className="showcase-desktop">
        {/* Left Column: 4–5 steps */}
        <div style={{ position: "relative" }}>
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                data-step-index={idx}
                style={{
                  minHeight: "72vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "40px 0 40px 24px",
                  borderLeft: isActive ? "2px solid var(--accent)" : "2px solid rgba(255,255,255,0.07)",
                  opacity: isActive ? 1 : 0.4,
                  transition: "opacity 300ms ease, border-color 300ms ease",
                }}
              >
                {/* Eyebrow Label */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.74rem",
                      fontWeight: 600,
                      color: isActive ? "var(--accent)" : "var(--muted)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.eyebrow || item.tag || `STEP 0${idx + 1}`}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.7rem",
                      color: "var(--muted)",
                    }}
                  >
                    // 0{idx + 1}
                  </span>
                </div>

                {/* Title (max 6 words) */}
                <h4
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "clamp(1.75rem, 2.4vw, 2.3rem)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    color: "var(--text)",
                    margin: "0 0 12px 0",
                  }}
                >
                  {item.title}
                </h4>

                {/* Sentence (max 20 words) */}
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    maxWidth: "460px",
                    margin: "0 0 20px 0",
                  }}
                >
                  {item.description}
                </p>

                {/* Interaction & URL Badges */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.75rem",
                      color: isActive ? "var(--accent)" : "var(--muted)",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>Full clarity 2880×1800</span>
                    <span>↗</span>
                  </button>

                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.75rem",
                        color: "var(--muted)",
                        textDecoration: "none",
                      }}
                    >
                      {item.url.replace("https://", "")} ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Sticky Browser-Frame Screenshot (Vertically Centered) */}
        <div
          style={{
            position: "sticky",
            top: "max(90px, calc(50vh - 230px))",
            height: "fit-content",
          }}
        >
          <div
            className="force-dark"
            data-theme="dark"
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
                padding: "10px 14px",
                background: "#16130F",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* 3 macOS dots */}
                <div style={{ display: "flex", gap: "5px" }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ef4444", opacity: 0.85 }} />
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#f59e0b", opacity: 0.85 }} />
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#10b981", opacity: 0.85 }} />
                </div>

                {/* URL Capsule */}
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
                  <span>{items[activeIndex]?.url ? items[activeIndex].url.replace("https://", "") : "mathsy.in"}</span>
                </div>
              </div>

              {/* Status pill */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.68rem",
                    color: "var(--accent)",
                    background: "rgba(245,158,11,0.12)",
                    border: "1px solid rgba(245,158,11,0.25)",
                    padding: "2px 7px",
                    borderRadius: "4px",
                  }}
                >
                  {items[activeIndex]?.badge || "Production Screen"}
                </span>
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

            {/* Screenshot Area: 300ms Crossfade (Opacity + Slight Scale 0.98 -> 1) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 10",
                background: "#0a0908",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => setActiveModalItem(items[activeIndex])}
            >
              {items.map((item, idx) => {
                const isActive = idx === activeIndex;
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
                      loading={idx <= 1 ? "eager" : "lazy"}
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

              {/* Click to inspect badge overlay */}
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
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MOBILE VIEW (<1024px): Horizontal Swipe Carousel (CSS Scroll-Snap)
          ───────────────────────────────────────────────────────────── */}
      <div className="showcase-mobile">
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
              key={`mobile-${item.id}`}
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
      <div className="showcase-reduced-motion">
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
                  Step 0{idx + 1}: {item.title}
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", color: "var(--accent)" }}>
                {item.eyebrow || item.tag}
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
    </section>
  );
}
