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
  return (
    <details
      className="faq-item group"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        marginBottom: "12px",
        transition: "border-color 0.2s ease",
      }}
    >
      <summary
        style={{
          width: "100%",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          background: "transparent",
          textAlign: "left",
          cursor: "pointer",
          listStyle: "none",
          userSelect: "none",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-geist-sans)",
            fontSize: "1.02rem",
            fontWeight: 600,
            color: "var(--text)",
          }}
        >
          {item.q}
        </h3>
        <span
          className="faq-icon"
          aria-hidden="true"
          style={{
            color: "var(--accent)",
            fontSize: "1.3rem",
            lineHeight: 1,
            flexShrink: 0,
            transition: "transform 0.2s ease",
          }}
        >
          +
        </span>
      </summary>

      <div style={{ padding: "0 24px 20px" }}>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.92rem",
            color: "var(--muted)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {item.a}
        </p>
      </div>
    </details>
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
