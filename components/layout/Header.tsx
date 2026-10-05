"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SITE } from "@/content/site";

// ─── Theme toggle ────────────────────────────────────────────────────────────
function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setDark(!stored || stored === "dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "7px 10px",
        cursor: "pointer",
        color: "var(--muted)",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.8rem",
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      {dark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </motion.button>
  );
}

// ─── Nav links ───────────────────────────────────────────────────────────────
interface NavItem {
  id: string;
  label: string;
  href: string;
  isDropdown?: boolean;
  children?: {
    label: string;
    desc: string;
    href: string;
  }[];
}

const NAV_LINKS: NavItem[] = [
  { id: "work", label: "Work", href: "/#work" },
  {
    id: "products",
    label: "Products",
    href: "#",
    isDropdown: true,
    children: [
      {
        label: "Mathsy for Institutes",
        desc: "4-portal learning platform for coaching classes",
        href: "/mathsy-for-institutes",
      },
      {
        label: "Mathsy Meet",
        desc: "virtual math classroom with geometry tools",
        href: "/mathsy-meet",
      },
    ],
  },
  { id: "pricing", label: "Pricing", href: "/pricing" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

// ─── Header ──────────────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  // Background blur on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // ── Scroll-spy with IntersectionObserver ──
  useEffect(() => {
    const sectionIds = ["hero", "offers", "work", "guarantee", "about", "products-overview", "faq", "contact"];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length > 0) {
        visible.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        const currentId = visible[0].target.id;
        setActiveSection(currentId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -45% 0px",
      threshold: [0, 0.1, 0.25, 0.5],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 24px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s",
        background: scrolled ? "var(--header-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
        {/* techiitfly logo icon */}
        <svg width="30" height="30" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <linearGradient id="hdr-box" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1D4ED8" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <rect width="150" height="150" rx="40" fill="url(#hdr-box)" />
          <g transform="translate(16,24) scale(0.78)">
            <path d="M20,140 C44,140 70,128 92,106 C86,132 60,148 20,140 Z" fill="#fff" opacity="0.55" />
            <path d="M18,118 C46,116 84,100 118,64 C110,98 78,126 18,118 Z" fill="#fff" opacity="0.78" />
            <path d="M18,96 C50,92 100,70 142,18 C132,64 90,104 18,96 Z" fill="#fff" />
            <circle cx="148" cy="12" r="10" fill="#fff" opacity="0.6" />
            <circle cx="148" cy="12" r="6" fill="#fff" />
          </g>
        </svg>
        <span
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "var(--text)",
            letterSpacing: "-0.03em",
          }}
        >
          techiit<span style={{ color: "var(--accent)" }}>fly</span>
        </span>
      </Link>

      {/* Desktop navigation */}
      <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            padding: 0,
            margin: 0,
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => {
            if (link.isDropdown && link.children) {
              return (
                <li
                  key={link.id}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setProductsOpen((prev) => !prev)}
                    aria-expanded={productsOpen}
                    style={{
                      background: "transparent",
                      border: "none",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      color: productsOpen ? "var(--accent)" : "var(--muted)",
                      fontWeight: 500,
                      cursor: "pointer",
                      padding: "4px 2px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>{link.label}</span>
                    <span style={{ fontSize: "0.65rem", transition: "transform 0.2s ease", transform: productsOpen ? "rotate(180deg)" : "rotate(0)" }}>
                      ▼
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "-20px",
                          width: "300px",
                          background: "#14110E",
                          border: "1px solid var(--border)",
                          borderRadius: "10px",
                          padding: "10px",
                          boxShadow: "0 18px 40px rgba(0,0,0,0.75)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                          zIndex: 110,
                        }}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setProductsOpen(false)}
                            style={{
                              padding: "10px 12px",
                              borderRadius: "6px",
                              textDecoration: "none",
                              background: "transparent",
                              transition: "background 0.15s ease",
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>
                              {child.label}
                            </span>
                            <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.75rem", color: "var(--muted)" }}>
                              {child.desc}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            const isActive = activeSection === link.id || (link.id === "work" && activeSection === "flagship");

            return (
              <li key={link.id} style={{ position: "relative" }}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.85rem",
                    color: isActive ? "var(--accent)" : "var(--muted)",
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    padding: "4px 2px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--muted)";
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-dot"
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "var(--accent)",
                        display: "inline-block",
                      }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <ThemeToggle />

        <motion.a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="desktop-nav"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.82rem",
            fontWeight: 500,
            padding: "7px 15px",
            borderRadius: "6px",
            background: "var(--accent)",
            color: "var(--primary-btn-text)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Let&apos;s talk
        </motion.a>

        {/* Mobile menu hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-nav-toggle"
          aria-label="Toggle navigation menu"
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "6px 8px",
            color: "var(--text)",
            cursor: "pointer",
            display: "none",
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile navigation dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "fixed",
              top: "60px",
              left: 0,
              right: 0,
              background: "var(--header-bg)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              zIndex: 99,
            }}
          >
            {NAV_LINKS.map((link) => {
              if (link.isDropdown && link.children) {
                return (
                  <div key={link.id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.72rem",
                        color: "var(--accent)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {link.label}
                    </span>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "0.95rem",
                          color: "var(--text)",
                          textDecoration: "none",
                          paddingLeft: "12px",
                          borderLeft: "2px solid var(--border)",
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                );
              }
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1rem",
                    color: activeSection === link.id ? "var(--accent)" : "var(--text)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.95rem",
                padding: "10px 16px",
                borderRadius: "6px",
                background: "var(--accent)",
                color: "#0e0d0b",
                textAlign: "center",
                textDecoration: "none",
                fontWeight: 600,
                marginTop: "8px",
              }}
            >
              Let&apos;s talk on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
