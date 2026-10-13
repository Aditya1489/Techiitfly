import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PayClient from "./PayClient";

import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Pay Your Quote",
  description:
    "Securely pay your project advance or milestone invoice for written quotes from techiitfly.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Pay Your Quote | techiitfly",
    description: "Securely pay your project advance or milestone invoice for written quotes from techiitfly.",
    url: `${SITE.siteUrl}/pay`,
  },
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
