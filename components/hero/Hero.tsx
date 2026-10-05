"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isMobileOrReducedMotion, setIsMobileOrReducedMotion] = useState(false);

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

  const currentRotateY = -18 + tilt.y;
  const currentRotateX = 6 + tilt.x;

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
        {/* Left Column: Headline, Audience Options, CTAs */}
        <div style={{ maxWidth: "560px" }}>
          {/* Eyebrow */}
          <p className="section-label" style={{ marginBottom: "16px" }}>
            techiitfly · Pune, India
          </p>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: "16px",
            }}
          >
            Websites and learning platforms that{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>prove</em> themselves.
          </h1>

          {/* Subline */}
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(1.02rem, 1.8vw, 1.14rem)",
              lineHeight: 1.55,
              color: "var(--muted)",
              marginBottom: "28px",
            }}
          >
            For education and wellness businesses — from 7-day websites to a full learning platform with its own live classroom.
          </p>

          {/* CTAs */}
          <div style={{ marginBottom: "20px" }}>
            {/* Primary Filled CTA */}
            <a
              href="#offers"
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
              <span>Get my website in 7 days</span>
              <span>→</span>
            </a>

            {/* Secondary text links (one row, smaller) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
                marginTop: "16px",
              }}
            >
              <Link
                href="/mathsy-for-institutes"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  color: "var(--text)",
                  textDecoration: "none",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>Mathsy for institutes</span>
                <span style={{ color: "var(--accent)" }}>→</span>
              </Link>
              <span style={{ color: "var(--border)", fontSize: "0.85rem" }}>·</span>
              <Link
                href="/mathsy-meet"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  color: "var(--text)",
                  textDecoration: "none",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>Mathsy Meet for tutors</span>
                <span style={{ color: "var(--accent)" }}>→</span>
              </Link>
            </div>
          </div>

          {/* Trust row under CTAs (Geist Mono) */}
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
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            <span>3 live projects</span>
            <span>·</span>
            <span>Fixed prices</span>
            <span>·</span>
            <span>Live in 7 days</span>
          </div>
        </div>

        {/* Right Column: CSS 3D Screenshot Stack */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "460px",
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
              maxWidth: "520px",
              height: "330px",
              transformStyle: "preserve-3d",
              transform: isMobileOrReducedMotion
                ? "none"
                : `rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* 1. Back Frame: Yogic Path */}
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
                  ? "translate(20px, -20px)"
                  : "translate3d(-35px, -25px, -70px)",
                opacity: 0.85,
                overflow: "hidden",
                zIndex: 1,
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
                <div style={{ display: "flex", gap: "5px" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f59e0b" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", color: "var(--muted)", marginLeft: "6px" }}>
                    yogicpathytt.com
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.62rem", color: "#10b981" }}>● Live</span>
              </div>
              <img
                src="/screenshots/yogicpath-desktop.webp"
                alt="Yogic Path website screenshot"
                style={{ width: "100%", height: "calc(100% - 31px)", objectFit: "cover", objectPosition: "top" }}
              />
            </div>

            {/* 2. Middle Frame: YogaGarhi */}
            <div
              className="force-dark"
              data-theme="dark"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "12px",
                background: "#100E0C",
                border: "1px solid rgba(245,158,11,0.25)",
                boxShadow: "var(--card-shadow), 0 25px 50px rgba(0,0,0,0.5)",
                transform: isMobileOrReducedMotion
                  ? "translate(10px, -10px)"
                  : "translate3d(0px, 0px, 0px)",
                opacity: 0.95,
                overflow: "hidden",
                zIndex: 2,
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
                <div style={{ display: "flex", gap: "5px" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f59e0b" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", color: "var(--muted)", marginLeft: "6px" }}>
                    yogagarhi.com
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.62rem", color: "#10b981" }}>● Live</span>
              </div>
              <img
                src="/screenshots/yogagarhi-desktop.webp"
                alt="YogaGarhi website screenshot"
                style={{ width: "100%", height: "calc(100% - 31px)", objectFit: "cover", objectPosition: "top" }}
              />
            </div>

            {/* 3. Front Frame: Mathsy Dashboard */}
            <div
              className="force-dark"
              data-theme="dark"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "12px",
                background: "#100E0C",
                border: "1px solid var(--accent)",
                boxShadow: "0 30px 70px rgba(0,0,0,0.65), 0 0 30px rgba(245,158,11,0.15)",
                transform: isMobileOrReducedMotion
                  ? "none"
                  : "translate3d(35px, 25px, 70px)",
                opacity: 1,
                overflow: "hidden",
                zIndex: 3,
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
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", color: "#f3eee6", marginLeft: "6px" }}>
                    🔒 mathsy.in/dashboard
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.62rem",
                    color: "var(--accent)",
                    background: "rgba(245,158,11,0.12)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  Flagship Platform
                </span>
              </div>
              <img
                src="/screenshots/mathsy/mathsy-student-dashboard-desktop.webp"
                alt="Mathsy student portal dashboard screenshot"
                style={{ width: "100%", height: "calc(100% - 31px)", objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
