"use client";

import { useState, useEffect } from "react";
import { getConsultUrl } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

interface HeroSlide {
  id: string;
  name: string;
  domain: string;
  badge: string;
  badgeColor: string;
  url: string;
  desktopImg: string;
  mobileImg: string;
  alt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "yogagarhi",
    name: "YogaGarhi",
    domain: "yogagarhi.com",
    badge: "● Live Client Site",
    badgeColor: "var(--accent)",
    url: "https://www.yogagarhi.com",
    desktopImg: "/screenshots/yogagarhi-desktop.webp",
    mobileImg: "/screenshots/yogagarhi-mobile.webp",
    alt: "YogaGarhi client website desktop preview",
  },
  {
    id: "yogicpath",
    name: "Yogic Path",
    domain: "yogicpathytt.com",
    badge: "● Live Client Site",
    badgeColor: "var(--accent)",
    url: "https://yogicpathytt.com",
    desktopImg: "/screenshots/yogicpath-desktop.webp",
    mobileImg: "/screenshots/yogicpath-mobile.webp",
    alt: "Yogic Path client website desktop preview",
  },
  {
    id: "mathsy",
    name: "Mathsy",
    domain: "mathsy.in",
    badge: "● Live Platform",
    badgeColor: "#38bdf8",
    url: "https://mathsy.in",
    desktopImg: "/screenshots/mathsy-homepage.png",
    mobileImg: "/screenshots/mathsy-mobile.webp",
    alt: "Mathsy Learning Platform front page preview",
  },
];

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isMobileOrReducedMotion, setIsMobileOrReducedMotion] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Detect mobile or prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMobile = () => window.innerWidth < 1024 || mediaQuery.matches;
    
    setIsMobileOrReducedMotion(checkMobile());
    
    const handleResize = () => setIsMobileOrReducedMotion(checkMobile());
    window.addEventListener("resize", handleResize);
    mediaQuery.addEventListener("change", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  // Auto-advance slides every 4.2 seconds unless paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [isPaused, activeSlide]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobileOrReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate tilt normalized between -4deg and +4deg
    const deltaX = ((e.clientX - centerX) / (rect.width / 2)) * 4;
    const deltaY = -((e.clientY - centerY) / (rect.height / 2)) * 4;
    
    setTilt({
      x: Math.max(-4, Math.min(4, deltaY)),
      y: Math.max(-4, Math.min(4, deltaX)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const currentRotateY = -16 + tilt.y;
  const currentRotateX = 6 + tilt.x;

  const current = HERO_SLIDES[activeSlide];
  const nextSlide = HERO_SLIDES[(activeSlide + 1) % HERO_SLIDES.length];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "86svh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1240px",
          width: "100%",
          margin: "0 auto",
          padding: "56px 24px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "48px",
          alignItems: "center",
        }}
      >
        {/* Left Column: Headline, CTAs, Services positioning */}
        <div style={{ maxWidth: "580px" }}>
          {/* Eyebrow */}
          <p className="section-label" style={{ marginBottom: "16px" }}>
            techiitfly · Pune, India
          </p>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: "16px",
            }}
          >
            We build websites that{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>prove</em> themselves.
          </h1>

          {/* Subline */}
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(1.02rem, 1.8vw, 1.15rem)",
              lineHeight: 1.55,
              color: "var(--muted)",
              marginBottom: "28px",
            }}
          >
            Fast, mobile-friendly websites for growing businesses — fixed prices, live in 7 days, guaranteed.
          </p>

          {/* CTAs */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              {/* Primary Filled CTA (scrolls to Services) */}
              <a
                href="#services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 26px",
                  borderRadius: "8px",
                  background: "var(--accent)",
                  color: "#0e0d0b",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(245,158,11,0.3)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                <span>Get my website in 7 days →</span>
              </a>

              {/* Secondary Consultation Button (Outlined) */}
              <a
                href={getConsultUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("consult_click", "hero")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 22px",
                  borderRadius: "8px",
                  background: "transparent",
                  color: "var(--text)",
                  border: "1.5px solid var(--border)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text)";
                }}
              >
                <span>Book a free 15-min consultation</span>
                <span style={{ color: "var(--accent)" }}>↗</span>
              </a>
            </div>
          </div>

          {/* Small mono text under buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.78rem",
              color: "var(--muted)",
              letterSpacing: "0.02em",
              paddingTop: "6px",
            }}
          >
            <span>Free consultation</span>
            <span>·</span>
            <span>Fixed prices</span>
            <span>·</span>
            <span>Live in 7 days</span>
          </div>
        </div>

        {/* Right Column: Animated Live Slides Showcase */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Animated Slide Selector Row */}
          <div
            className="hero-slide-row"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 6px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "999px",
              marginBottom: "20px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              zIndex: 10,
              maxWidth: "100%",
              overflowX: "auto",
            }}
          >
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "999px",
                    border: "none",
                    background: isActive ? "var(--surface-2)" : "transparent",
                    color: isActive ? "var(--text)" : "var(--muted)",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.82rem",
                    fontWeight: isActive ? 600 : 500,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: isActive ? "#10b981" : "var(--border)",
                      boxShadow: isActive ? "0 0 8px #10b981" : "none",
                      transition: "all 0.2s ease",
                    }}
                  />
                  <span>{slide.name}</span>
                  {isActive && (
                    <span
                      className="hero-slide-badge"
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.68rem",
                        color: slide.badgeColor,
                        background: "rgba(245,158,11,0.1)",
                        padding: "1px 6px",
                        borderRadius: "4px",
                        marginLeft: "2px",
                      }}
                    >
                      {slide.badge.replace("● ", "")}
                    </span>
                  )}
                  {/* Progress bar on active tab */}
                  {isActive && !isPaused && (
                    <span
                      key={`progress-${idx}`}
                      className="tab-progress-bar"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: "2px",
                        background: "var(--accent)",
                        animation: "slideProgress 4.2s linear infinite",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* 3D Showcase Area */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "420px",
              perspective: "1600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "500px",
                height: "320px",
                transformStyle: "preserve-3d",
                transform: isMobileOrReducedMotion
                  ? "none"
                  : `rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              {/* 1. Behind Frame: Upcoming Next Slide */}
              <div
                className="force-dark"
                data-theme="dark"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "12px",
                  background: "#100E0C",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "var(--card-shadow), 0 20px 40px rgba(0,0,0,0.4)",
                  transform: isMobileOrReducedMotion
                    ? "translate(-12px, -12px)"
                    : "translate3d(-35px, -25px, -60px)",
                  opacity: 0.82,
                  overflow: "hidden",
                  zIndex: 1,
                  transition: "all 0.4s ease",
                }}
              >
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
                  <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444" }} />
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f59e0b" }} />
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
                    <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", color: "var(--muted)", marginLeft: "6px" }}>
                      {nextSlide.domain}
                    </span>
                  </div>
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.62rem", color: "#10b981" }}>
                    Up next
                  </span>
                </div>
                <img
                  src={nextSlide.desktopImg}
                  alt={nextSlide.alt}
                  style={{ width: "100%", height: "calc(100% - 31px)", objectFit: "cover", objectPosition: "top" }}
                />
              </div>

              {/* 2. Front Frame: Active Live Slide with smooth keyframe animation */}
              <div
                key={`front-${current.id}`}
                className="force-dark hero-front-card"
                data-theme="dark"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "12px",
                  background: "#100E0C",
                  border: "1.5px solid var(--accent)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 25px rgba(245,158,11,0.18)",
                  transform: isMobileOrReducedMotion
                    ? "none"
                    : "translate3d(0px, 0px, 10px)",
                  opacity: 1,
                  overflow: "hidden",
                  zIndex: 2,
                }}
              >
                {/* Browser Header */}
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
                  <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444" }} />
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f59e0b" }} />
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.65rem",
                        color: "#f3eee6",
                        marginLeft: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      {current.domain}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.62rem",
                      color: current.badgeColor,
                      background: "rgba(245,158,11,0.12)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontWeight: 600,
                    }}
                  >
                    {current.badge}
                  </span>
                </div>

                {/* Screenshot Image */}
                <img
                  src={current.desktopImg}
                  alt={current.alt}
                  style={{ width: "100%", height: "calc(100% - 31px)", objectFit: "cover", objectPosition: "top" }}
                />
              </div>

              {/* 3. Third Frame: Active Site Mobile View */}
              <div
                key={`mobile-${current.id}`}
                className="force-dark hero-mobile-card"
                data-theme="dark"
                style={{
                  position: "absolute",
                  right: "-15px",
                  bottom: "-25px",
                  width: "150px",
                  height: "260px",
                  borderRadius: "18px",
                  background: "#100E0C",
                  border: "2px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.75), 0 0 20px rgba(0,0,0,0.5)",
                  transform: isMobileOrReducedMotion
                    ? "translate(10px, 15px)"
                    : "translate3d(35px, 35px, 70px)",
                  overflow: "hidden",
                  zIndex: 3,
                }}
              >
                {/* Phone Speaker Notch Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px 8px",
                    background: "#16130F",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{ width: "32px", height: "4px", borderRadius: "999px", background: "rgba(255,255,255,0.3)" }} />
                </div>
                <img
                  src={current.mobileImg}
                  alt={`${current.name} mobile view`}
                  style={{ width: "100%", height: "calc(100% - 17px)", objectFit: "cover", objectPosition: "top" }}
                />
              </div>
            </div>

            {/* Left / Right Nav Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous live site"
              className="hero-arrow-btn hero-arrow-prev"
              style={{
                position: "absolute",
                left: "-6px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 12,
                boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                transition: "all 0.15s ease",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next live site"
              className="hero-arrow-btn hero-arrow-next"
              style={{
                position: "absolute",
                right: "-6px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 12,
                boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                transition: "all 0.15s ease",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        @keyframes heroCardSwap {
          0% {
            opacity: 0.45;
            transform: scale(0.97) translateY(8px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes heroMobileSwap {
          0% {
            opacity: 0.4;
            transform: scale(0.95) translateY(12px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        :global(.hero-front-card) {
          animation: heroCardSwap 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        :global(.hero-mobile-card) {
          animation: heroMobileSwap 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (max-width: 640px) {
          :global(.hero-slide-badge) {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
