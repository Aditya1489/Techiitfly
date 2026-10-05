import Link from "next/link";
import receiptsData from "@/public/data/receipts.json";

interface SiteReceipt {
  name: string;
  url: string;
  history?: Array<{
    date?: string;
    scores?: {
      performance?: number | string;
    };
  }>;
}

export default function ProofStrip() {
  const sitesMap = (receiptsData as { sites?: Record<string, SiteReceipt> })?.sites || {};

  const sites = [
    {
      id: "yogagarhi",
      name: "YogaGarhi",
      url: "https://www.yogagarhi.com",
    },
    {
      id: "yogicpath",
      name: "Yogic Path",
      url: "https://yogicpathytt.com",
    },
    {
      id: "mathsy",
      name: "Mathsy",
      url: "https://mathsy.in",
    },
  ];

  return (
    <section
      id="proof-strip"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        padding: "14px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Sites list */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {sites.map((site) => {
            const receipt = sitesMap[site.id];
            const latest = receipt?.history && receipt.history.length > 0 ? receipt.history[receipt.history.length - 1] : null;
            const perfScore = latest?.scores?.performance;
            const hasScore = typeof perfScore === "number" && !isNaN(perfScore);

            return (
              <a
                key={site.id}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  textDecoration: "none",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.86rem",
                  color: "var(--text)",
                  fontWeight: 500,
                  transition: "color 0.15s ease",
                }}
              >
                <span>{site.name}</span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.7rem",
                    color: "#34d399",
                    background: "rgba(16,185,129,0.12)",
                    padding: "2px 7px",
                    borderRadius: "999px",
                  }}
                >
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#10b981" }} />
                  Live
                </span>
                {hasScore && (
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.72rem",
                      color: "var(--accent)",
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      padding: "1px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {perfScore}/100
                  </span>
                )}
              </a>
            );
          })}
        </div>

        {/* Link to Receipts page */}
        <Link
          href="/receipts"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.78rem",
            color: "var(--accent)",
            textDecoration: "none",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          <span>See daily performance receipts</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
