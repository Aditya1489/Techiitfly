"use client";

import Image from "next/image";
import { CLIENT_LOGOS, hasClientLogos } from "@/content/clients";

export default function ClientLogos() {
  if (!hasClientLogos) {
    return null;
  }

  return (
    <section
      id="clients"
      style={{
        padding: "36px 24px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.78rem",
            color: "var(--muted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Trusted by schools and businesses in India and abroad
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "36px",
          }}
        >
          {CLIENT_LOGOS.map((client) => (
            <div key={client.name} style={{ opacity: 0.8, transition: "opacity 0.2s ease" }}>
              {client.url ? (
                <a href={client.url} target="_blank" rel="noopener noreferrer">
                  <Image src={client.logo} alt={client.name} width={120} height={40} style={{ objectFit: "contain" }} />
                </a>
              ) : (
                <Image src={client.logo} alt={client.name} width={120} height={40} style={{ objectFit: "contain" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
