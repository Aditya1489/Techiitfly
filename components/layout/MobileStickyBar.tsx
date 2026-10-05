"use client";

import { useState, useEffect } from "react";
import { getConsultUrl } from "@/content/site";
import { getWhatsAppHref, trackEvent } from "@/lib/tracking";

export default function MobileStickyBar() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isConsultationVisible, setIsConsultationVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const heroEl = document.getElementById("hero");
    const consultEl = document.getElementById("consultation");
    const contactEl = document.getElementById("contact");

    const checkVisibility = () => {
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        // Hero is visible if its bottom is still below 120px from top
        setIsHeroVisible(heroRect.bottom > 120);
      }
      if (consultEl) {
        const consultRect = consultEl.getBoundingClientRect();
        const isInView = consultRect.top < window.innerHeight && consultRect.bottom > 0;
        setIsConsultationVisible(isInView);
      }
      if (contactEl) {
        const contactRect = contactEl.getBoundingClientRect();
        const isInView = contactRect.top < window.innerHeight && contactRect.bottom > 0;
        setIsContactVisible(isInView);
      }
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });
    checkVisibility();

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);

  // Hidden during hero, consultation band, or contact section
  const isVisible = !isHeroVisible && !isConsultationVisible && !isContactVisible;

  if (!isVisible) return null;

  return (
    <div
      className="mobile-sticky-bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 95,
        padding: "10px 16px 14px",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.35)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Primary Free Consultation Button */}
      <a
        href={getConsultUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("consult_click", "mobile_sticky_bar")}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "12px 18px",
          borderRadius: "8px",
          background: "var(--accent)",
          color: "var(--primary-btn-text)",
          fontFamily: "var(--font-geist-sans)",
          fontSize: "0.95rem",
          fontWeight: 700,
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        <span>Free consultation</span>
        <span>→</span>
      </a>

      {/* WhatsApp Icon Button */}
      <a
        href={getWhatsAppHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => trackEvent("whatsapp_click", "mobile_sticky_bar")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "46px",
          height: "46px",
          borderRadius: "8px",
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          color: "#25D366",
          flexShrink: 0,
          textDecoration: "none",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <style jsx>{`
        @media (min-width: 769px) {
          .mobile-sticky-bar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
