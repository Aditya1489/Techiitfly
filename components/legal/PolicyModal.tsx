"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fullPageHref: string;
  children: React.ReactNode;
}

export default function PolicyModal({
  isOpen,
  onClose,
  title,
  fullPageHref,
  children,
}: PolicyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "760px",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--surface-2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <h3
              id="policy-modal-title"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "var(--text)",
                margin: 0,
              }}
            >
              {title}
            </h3>
            <Link
              href={fullPageHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.78rem",
                color: "var(--accent)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                padding: "3px 8px",
                borderRadius: "4px",
              }}
            >
              Open full page ↗
            </Link>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--muted)",
              fontSize: "1.3rem",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            padding: "24px",
            overflowY: "auto",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.92rem",
            lineHeight: 1.65,
            color: "var(--text)",
          }}
        >
          {children}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--surface-2)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.75rem",
              color: "var(--muted)",
            }}
          >
            Press Esc to close
          </span>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link
              href={fullPageHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.85rem",
                color: "var(--accent)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Open full page ↗
            </Link>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 18px",
                borderRadius: "8px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
