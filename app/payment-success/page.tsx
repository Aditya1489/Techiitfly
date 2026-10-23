import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PaymentSuccessClient from "./PaymentSuccessClient";

import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Payment Received",
  description: "Payment confirmed. Your website project slot is booked with techiitfly.",
  alternates: {
    canonical: "/payment-success",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Payment Received | techiitfly",
    description: "Payment confirmed. Your website project slot is booked with techiitfly.",
    url: `${SITE.siteUrl}/payment-success`,
  },
};

export default function PaymentSuccessPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", paddingTop: "80px", background: "var(--bg)" }}>
        <Suspense
          fallback={
            <div style={{ textAlign: "center", padding: "100px 24px", color: "var(--muted)" }}>
              Loading booking confirmation...
            </div>
          }
        >
          <PaymentSuccessClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
