import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TermsClient from "./TermsClient";
import { SITE } from "@/content/site";
import { getPageDate } from "@/content/dates";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Plain-language Terms & Conditions for techiitfly website and app development services, project timelines, deliverables, and payment policies.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Conditions | techiitfly",
    description:
      "Plain-language Terms & Conditions for techiitfly website and app development services, project timelines, deliverables, and payment policies.",
    url: `${SITE.siteUrl}/terms`,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "techiitfly Terms & Conditions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | techiitfly",
    description:
      "Plain-language Terms & Conditions for techiitfly website and app development services, project timelines, deliverables, and payment policies.",
    images: ["/og/home.png"],
  },
};

export default function TermsPage() {
  const pageDate = getPageDate("/terms");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions | techiitfly",
    description:
      "Plain-language Terms & Conditions for techiitfly website and app development services, project timelines, deliverables, and payment policies.",
    url: `${SITE.siteUrl}/terms`,
    dateModified: pageDate.iso,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Terms & Conditions",
        item: `${SITE.siteUrl}/terms`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main style={{ minHeight: "100vh", paddingTop: "80px", background: "var(--bg)" }}>
        <TermsClient />
      </main>
      <Footer />
    </>
  );
}
