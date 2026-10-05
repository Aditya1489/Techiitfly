import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TermsClient from "./TermsClient";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Plain-language Terms & Conditions for techiitfly web development services, fixed packages, and software products.",
  openGraph: {
    title: "Terms & Conditions | techiitfly",
    description:
      "Plain-language Terms & Conditions for techiitfly web development services, delivery guarantee, and payment policies.",
    url: `${SITE.siteUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", paddingTop: "80px", background: "var(--bg)" }}>
        <TermsClient />
      </main>
      <Footer />
    </>
  );
}
