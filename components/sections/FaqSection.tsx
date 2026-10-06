"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "How much does a website cost?",
    a: "Every project gets a fixed price after a free 15-minute call. You can also see our starting packages on the Pricing page.",
  },
  {
    q: "How fast is it really?",
    a: "Starter websites (up to 5 pages) launch in 7 days guaranteed, counted from the day we receive your content. Business websites typically launch in 7–10 days.",
  },
  {
    q: "How many revisions do I get?",
    a: "Our Starter package includes one round of design changes. Business and custom packages include two rounds of revisions. Extra rounds or scope changes are quoted separately before any work begins.",
  },
  {
    q: "How does payment work?",
    a: "50% advance to start, and 50% on delivery once the site is tested and approved. For monthly maintenance, billing is month-to-month.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. Once the final payment is complete, full ownership of the code, content, and design files is transferred to you. No vendor lock-in.",
  },
  {
    q: "What's not included?",
    a: "Domain registration, third-party software subscriptions, and payment gateway transaction fees are paid directly to providers. Extra pages, blog platforms, or custom web apps are quoted separately.",
  },
  {
    q: "What happens after launch?",
    a: "Every website includes 14 to 30 days of post-launch bug fixing and support. After that, you can subscribe to our monthly maintenance plan for updates, backups, and security, or manage the site yourself.",
  },
];

function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        marginBottom: "12px",
        transition: "border-color 0.2s ease",
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          background: "transparent",
          border: "none",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "1.02rem",
            fontWeight: 600,
            color: "var(--text)",
          }}
        >
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            color: "var(--accent)",
            fontSize: "1.3rem",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.92rem",
                color: "var(--muted)",
                lineHeight: 1.6,
                padding: "0 24px 20px",
                margin: 0,
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  return (
    <section
      id="faq"
      style={{
        background: "var(--bg)",
        padding: "80px 24px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <span className="section-label">COMMON QUESTIONS</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "10px",
              marginBottom: "12px",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.04rem",
              lineHeight: 1.55,
              color: "var(--muted)",
            }}
          >
            Everything you need to know about our timelines, revision cycles, and deliverables.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div>
          {FAQS.map((faq) => (
            <FaqAccordionItem key={faq.q} item={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
