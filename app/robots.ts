import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/pay",
        "/websites",
        "/checkout/",
        "/payment-success",
        "/receipts",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
