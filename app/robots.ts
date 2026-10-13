import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.siteUrl;

  const crawlers = [
    "*",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
    "Bingbot",
  ];

  return {
    rules: crawlers.map((bot) => ({
      userAgent: bot,
      allow: "/",
    })),
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

