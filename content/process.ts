export interface ProcessStep {
  day: string;
  title: string;
  sentence: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    day: "Day 1",
    title: "Kickoff & content check",
    sentence: "We align on goals, review your text, images, logo, and domain access, and confirm project scope in writing.",
  },
  {
    day: "Day 3",
    title: "Design preview",
    sentence: "You review the design preview for your single round of design changes and layout feedback.",
  },
  {
    day: "Day 5",
    title: "Full site on preview link",
    sentence: "All pages are built and deployed to a private preview link so you can click and test live.",
  },
  {
    day: "Day 6",
    title: "Testing & fixes",
    sentence: "We test mobile responsiveness, contact forms, navigation, basic SEO, and cross-browser formatting.",
  },
  {
    day: "Day 7",
    title: "Live on your domain",
    sentence: "We configure DNS and SSL, connect your domain, run final verification checks, and launch your site.",
  },
];
