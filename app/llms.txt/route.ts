import { NextResponse } from "next/server";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

export function GET() {
  const content = `# techiitfly
> Website and app development studio in Pune, India. Websites live in 7 days with a delivery guarantee and fixed prices.

## Services
- Websites (Starter / Business / Premium) — ${SITE.siteUrl}/pricing
- Mobile apps — ${SITE.siteUrl}/pricing#apps
- Mathsy Meet (our product: live maths classroom for tutors) — ${SITE.siteUrl}/mathsy-meet

## Work
- YogaGarhi — ${SITE.siteUrl}/work/yogagarhi
- Yogic Path — ${SITE.siteUrl}/work/yogicpath
- Mathsy — ${SITE.siteUrl}/work/mathsy

## Contact
- contact@techiitfly.com · +91 93739 17738 · Pune, India

## Key pages
- Pricing: ${SITE.siteUrl}/pricing
- Terms: ${SITE.siteUrl}/terms
- Free website audit: ${SITE.siteUrl}/xray
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
