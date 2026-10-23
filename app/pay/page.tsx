import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PayClient from "./PayClient";

import { SITE } from "@/content/site";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Pay Your Quote",
  description:
    "Securely pay your project advance or milestone invoice for written quotes from techiitfly.",
  alternates: {
    canonical: "/pay",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: buildOpenGraph({
    title: "Pay Your Quote | techiitfly",
    description: "Securely pay your project advance or milestone invoice for written quotes from techiitfly.",
    path: "/pay",
    image: "/og/checkout.png",
    alt: "Pay Your Quote | techiitfly",
  }),
  twitter: buildTwitter({
    title: "Pay Your Quote | techiitfly",
    description: "Securely pay your project advance or milestone invoice for written quotes from techiitfly.",
    image: "/og/checkout.png",
  }),
};

export default function PayPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", paddingTop: "80px", background: "var(--bg)" }}>
        <PayClient />
      </main>
      <Footer />
    </>
  );
}
