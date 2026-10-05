"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/content/site";

export default function WalkthroughModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  // Hide button when Contact section is in view
  useEffect(() => {
    if (typeof window === "undefined") return;
    const contactEl = document.getElementById("contact");
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (isContactVisible) return null;

  return (
    <>
      {/* Floating Walkthrough Compact Pill Button (Desktop only, hidden on mobile while sticky bar shows) */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="desktop-walkthrough-btn"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 90,
          alignItems: "center",
          gap: "6px",
          padding: "8px 14px",
          borderRadius: "999px",
          background: "var(--surface)",
          border: "1px solid var(--accent)",
          color: "var(--accent)",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.78rem",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)",
        }}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 0 6px var(--accent)",
          }}
        />
        Walkthrough
      </motion.button>

      <style jsx global>{`
        .desktop-walkthrough-btn {
          display: flex !important;
        }
        @media (max-width: 768px) {
          .desktop-walkthrough-btn {
            display: none !important;
          }
        }
      `}</style>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="walkthrough-title"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 110,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: "24px",
              pointerEvents: "auto",
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Floating Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "relative",
                zIndex: 111,
                width: "100%",
                maxWidth: "380px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
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
                    }}
                  >
                    1-ON-1 DEMO
                  </span>
                  <h3
                    id="walkthrough-title"
                    style={{
                      fontFamily: "var(--font-instrument-serif)",
                      fontSize: "1.45rem",
                      color: "var(--text)",
                      marginTop: "2px",
                    }}
                  >
                    Walk Me Through It
                  </h3>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close dialog"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    borderRadius: "6px",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  ✕
                </button>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                  marginBottom: "20px",
                }}
              >
                Pick how you&apos;d like to tour our architecture and platform codebases:
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* 1. Mathsy Meet */}
                <a
                  href="https://mathsy.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    textDecoration: "none",
                    color: "var(--text)",
                    transition: "border-color 0.15s ease",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>🎥</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.9rem", fontWeight: 600 }}>
                      Join live on Mathsy Meet
                    </div>
                    <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", color: "var(--muted)" }}>
                      Live session inside our custom classroom
                    </div>
                  </div>
                </a>

                {/* 2. WhatsApp */}
                <a
                  href="https://wa.me/919373917738?text=Hi%20Aditya%2C%20I%27d%20like%20a%20walkthrough%20of%20your%20work."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: "var(--accent)",
                    border: "none",
                    textDecoration: "none",
                    color: "#0e0d0b",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>💬</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.9rem" }}>
                      Message on WhatsApp
                    </div>
                    <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", opacity: 0.8 }}>
                      Direct message with founder Aditya
                    </div>
                  </div>
                </a>

                {/* 3. Optional Calendar booking (hidden until verified email configured) */}
                {SITE.contactEmail && (
                  <a
                    href={`mailto:${SITE.contactEmail}?subject=Architecture%20Walkthrough%20Request`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      textDecoration: "none",
                      color: "var(--muted)",
                      fontSize: "0.84rem",
                      fontFamily: "var(--font-geist-sans)",
                    }}
                  >
                    <span>✉️</span>
                    <span>Schedule via email / calendar</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
