"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FEATURE_GROUPS, MEET_FEATURES, FeatureGroup, MeetScreenshot } from "@/content/meetFeatures";

interface TourItem {
  id: string;
  title: string;
  description: string;
  group: FeatureGroup;
  screenshot: MeetScreenshot;
}

export default function MeetFeatureTour() {
  // Collect all items with valid screenshots
  const allTourItems: TourItem[] = [];
  for (const feat of MEET_FEATURES) {
    if (feat.screenshots && feat.screenshots.length > 0) {
      for (const s of feat.screenshots) {
        allTourItems.push({
          id: feat.id,
          title: feat.title,
          description: feat.description,
          group: feat.group,
          screenshot: s,
        });
      }
    }
  }

  // Active groups that actually contain screenshots
  const availableGroups = FEATURE_GROUPS.filter((group) =>
    allTourItems.some((item) => item.group === group)
  );

  const [activeGroup, setActiveGroup] = useState<FeatureGroup>(availableGroups[0] || "Maths whiteboard");
  const itemsInActiveGroup = allTourItems.filter((item) => item.group === activeGroup);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Touch swipe handling
  const touchStartXRef = useRef<number | null>(null);

  const currentItem = itemsInActiveGroup[activeIndex] || itemsInActiveGroup[0] || allTourItems[0];

  const handleGroupSelect = (group: FeatureGroup) => {
    setActiveGroup(group);
    setActiveIndex(0);
    setActiveHotspot(null);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % itemsInActiveGroup.length);
      setActiveHotspot(null);
      setIsTransitioning(false);
    }, 150);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + itemsInActiveGroup.length) % itemsInActiveGroup.length);
      setActiveHotspot(null);
      setIsTransitioning(false);
    }, 150);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === "Escape") setIsLightboxOpen(false);
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        return;
      }
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, itemsInActiveGroup.length]);

  if (!currentItem) return null;

  return (
    <section
      id="tour"
      style={{
        padding: "85px 24px 95px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-label">INTERACTIVE PRODUCT TOUR</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.3rem, 4.5vw, 3.8rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "10px",
            }}
          >
            Take the tour
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.05rem",
              lineHeight: 1.5,
              color: "var(--muted)",
              margin: 0,
            }}
          >
            Real screens from Mathsy Meet.
          </p>
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.78rem",
              color: "var(--muted)",
              opacity: 0.8,
              marginTop: "6px",
              marginBottom: 0,
            }}
          >
            Demo participant shown for illustration.
          </p>
        </div>

        {/* Group Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center",
            marginBottom: "36px",
          }}
        >
          {availableGroups.map((group) => {
            const isActive = group === activeGroup;
            return (
              <button
                key={group}
                onClick={() => handleGroupSelect(group)}
                style={{
                  padding: "9px 18px",
                  borderRadius: "9999px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-geist-sans)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: isActive ? "1px solid var(--accent)" : "1px solid var(--border)",
                  background: isActive ? "var(--accent)" : "var(--surface-2)",
                  color: isActive ? "var(--primary-btn-text)" : "var(--text)",
                  boxShadow: isActive ? "0 2px 10px rgba(245, 158, 11, 0.25)" : "none",
                }}
              >
                {group}
              </button>
            );
          })}
        </div>

        {/* Browser Frame Showcase */}
        <div
          onTouchStart={(e) => {
            touchStartXRef.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartXRef.current === null) return;
            const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
            if (Math.abs(diffX) > 40) {
              if (diffX > 0) handlePrev();
              else handleNext();
            }
            touchStartXRef.current = null;
          }}
          style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            background: "var(--bg)",
            overflow: "hidden",
            boxShadow: "var(--card-shadow)",
            position: "relative",
          }}
        >
          {/* Browser Chrome Header */}
          <div
            style={{
              padding: "12px 16px",
              background: "var(--surface-2)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            {/* Window Dots */}
            <div style={{ display: "flex", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444", opacity: 0.8 }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b", opacity: 0.8 }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", opacity: 0.8 }} />
            </div>

            {/* Simulated Address Bar */}
            <div
              style={{
                flex: 1,
                maxWidth: "460px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "4px 12px",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.74rem",
                color: "var(--muted)",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <span style={{ color: "var(--accent)" }}>🔒</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                classroom-meet.vercel.app/meet/{currentItem.id}
              </span>
            </div>

            {/* Lightbox Trigger */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "4px 10px",
                fontSize: "0.75rem",
                fontFamily: "var(--font-geist-mono)",
                color: "var(--accent)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
              title="Open full size image"
            >
              <span>🔍</span>
              <span className="hidden sm:inline">Open full size</span>
            </button>
          </div>

          {/* Main Display Container with Hotspots */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 10",
              background: "#0e0d0b",
              opacity: isTransitioning ? 0.3 : 1,
              transition: "opacity 300ms ease",
            }}
          >
            <Image
              src={currentItem.screenshot.src}
              alt={currentItem.screenshot.alt}
              fill
              priority={activeGroup === availableGroups[0] && activeIndex === 0}
              sizes="(max-width: 1024px) 100vw, 1140px"
              style={{ objectFit: "contain", objectPosition: "center" }}
            />

            {/* Interactive CSS Hotspot Dots */}
            {currentItem.screenshot.hotspots?.map((spot, idx) => {
              const isSpotActive = activeHotspot === idx;
              return (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 20,
                  }}
                >
                  <button
                    onClick={() => setActiveHotspot(isSpotActive ? null : idx)}
                    onMouseEnter={() => setActiveHotspot(idx)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    aria-label={`Hotspot ${idx + 1}: ${spot.label}`}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "#f59e0b",
                      color: "#0e0d0b",
                      border: "2px solid #ffffff",
                      boxShadow: "0 0 14px rgba(245, 158, 11, 0.7)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      fontFamily: "var(--font-geist-mono)",
                      position: "relative",
                      animation: "pulseHotspot 2.2s infinite ease-in-out",
                    }}
                  >
                    {idx + 1}
                  </button>

                  {/* Hotspot Tooltip Label */}
                  {isSpotActive && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "34px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(14, 13, 11, 0.95)",
                        border: "1px solid #f59e0b",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        whiteSpace: "nowrap",
                        color: "#f3eee6",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        fontFamily: "var(--font-geist-sans)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                        zIndex: 30,
                        pointerEvents: "none",
                      }}
                    >
                      {spot.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Caption & Description Strip */}
          <div
            style={{
              padding: "18px 24px",
              background: "var(--surface)",
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
              <h3
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                {currentItem.title}
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.78rem",
                  color: "var(--accent)",
                  background: "rgba(245, 158, 11, 0.1)",
                  padding: "3px 8px",
                  borderRadius: "4px",
                }}
              >
                {activeIndex + 1} of {itemsInActiveGroup.length}
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.92rem",
                lineHeight: 1.5,
                color: "var(--muted)",
                margin: 0,
              }}
            >
              {currentItem.screenshot.caption}
            </p>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        {itemsInActiveGroup.length > 1 && (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              paddingBottom: "8px",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {itemsInActiveGroup.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setActiveHotspot(null);
                  }}
                  style={{
                    position: "relative",
                    width: "120px",
                    aspectRatio: "16 / 10",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: isSelected ? "2px solid var(--accent)" : "1px solid var(--border)",
                    cursor: "pointer",
                    padding: 0,
                    flexShrink: 0,
                    background: "var(--surface-2)",
                    boxShadow: isSelected ? "0 0 10px rgba(245, 158, 11, 0.3)" : "none",
                    opacity: isSelected ? 1 : 0.7,
                    transition: "all 0.15s ease",
                  }}
                >
                  <Image
                    src={item.screenshot.thumb}
                    alt={item.title}
                    fill
                    sizes="120px"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.92)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
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
              maxWidth: "1400px",
              width: "100%",
              maxHeight: "92vh",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ color: "#f3eee6", fontFamily: "var(--font-geist-sans)" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>{currentItem.title}</span>
                <span style={{ marginLeft: "12px", fontSize: "0.85rem", color: "#a39e94" }}>{currentItem.screenshot.caption}</span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#f3eee6",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                ✕ Close
              </button>
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                height: "80vh",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "#000000",
              }}
            >
              <Image
                src={currentItem.screenshot.src}
                alt={currentItem.screenshot.alt}
                fill
                sizes="1400px"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS for Soft Pulsing Hotspot */}
      <style jsx>{`
        @keyframes pulseHotspot {
          0% {
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(245, 158, 11, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          button {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
