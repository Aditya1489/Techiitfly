import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CheckoutClient from "./CheckoutClient";
import { WEB_PLANS } from "@/content/pricing";

interface PageProps {
  params: Promise<{ package: string }>;
}

export function generateStaticParams() {
  return [
    { package: "starter" },
    { package: "business" },
    { package: "premium" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { package: slug } = await params;
  const name =
    slug === "starter" ? "Starter" : slug === "business" ? "Business" : slug === "premium" ? "Premium" : "Website";

  return {
    title: `Book ${name} Website Package | techiitfly`,
    description: `Book your ${name} website project with techiitfly. Fixed price, 7-day turnaround, and transparent terms.`,
  };
}

export default async function CheckoutPage({ params }: PageProps) {
  const { package: slug } = await params;

  if (slug !== "starter" && slug !== "business" && slug !== "premium") {
    notFound();
  }

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", paddingTop: "80px", background: "var(--bg)" }}>
        <CheckoutClient packageSlug={slug} />
      </main>
      <Footer />
    </>
  );
}
