export interface WorkProject {
  slug: string;
  title: string;
  client: string;
  label?: string; // e.g. "EDTECH CLIENT · MATHSY.IN" for Mathsy
  tagline: string;
  problem: string;
  built: string;
  result?: string; // result empty = hide that line
  clientQuote?: {
    quote: string;
    author: string;
    role?: string;
  }; // empty = hide
  screenshots: {
    desktop?: string;
    mobile?: string;
  };
  liveUrl: string;
  stack?: string[];
  keyFeatures?: string[];
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    slug: "yogagarhi",
    title: "YogaGarhi",
    client: "YogaGarhi School of Yoga",
    tagline: "Conversion-focused website for a Yoga Alliance school in Bali & Rishikesh",
    problem:
      "Retreat seekers needed clear cohort dates, campus clarity across Bali and Rishikesh, and direct, friction-free booking channels.",
    built:
      "A fast, responsive Next.js website featuring retreat cohort countdowns, an interactive Ayurveda Prakriti quiz, and one-tap WhatsApp bookings.",
    result: "", // empty = hide that line
    clientQuote: undefined, // empty = hide
    screenshots: {
      desktop: "/screenshots/yogagarhi-desktop.webp",
      mobile: "/screenshots/yogagarhi-mobile.webp",
    },
    liveUrl: "https://www.yogagarhi.com",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp CTAs"],
    keyFeatures: [
      "Interactive Ayurveda Prakriti diagnostic quiz for lead capture",
      "Retreat cohort countdown timers for booking urgency",
      "WhatsApp click-to-chat bookings pre-filling selected course",
      "Fast mobile loading with optimized media pipeline",
    ],
  },
  {
    slug: "yogicpath",
    title: "Yogic Path",
    client: "Yogic Path Yoga Teacher Training",
    tagline: "Lead capture & course curriculum platform for Yoga Alliance certification",
    problem:
      "Prospective teacher trainees required deep curriculum transparency, accommodation details, and accreditation proof before committing to a multi-week course.",
    built:
      "A clean website showcasing detailed daily schedules, syllabus modules, instructor credentials, and an automated syllabus brochure download funnel.",
    result: "", // empty = hide that line
    clientQuote: undefined, // empty = hide
    screenshots: {
      desktop: "/screenshots/yogicpath-desktop.webp",
      mobile: "/screenshots/yogicpath-mobile.webp",
    },
    liveUrl: "https://yogicpathytt.com",
    stack: ["WordPress", "Custom CSS", "SEO", "Lead Capture"],
    keyFeatures: [
      "Gated syllabus brochure download capturing qualified student leads",
      "200-Hour and 300-Hour interactive curriculum breakdown",
      "Campus location landing pages across Rishikesh, Kerala, and Bali",
      "WhatsApp enquiry follow-up routing",
    ],
  },
  {
    slug: "mathsy",
    title: "Mathsy",
    client: "Mathsy (mathsy.in)",
    label: "EDTECH CLIENT · MATHSY.IN",
    tagline: "4-portal learning platform with live classes and proctored exam engine",
    problem:
      "An online maths and science academy needed one platform for students, tutors, parents and admins — including live classes built for teaching maths.",
    built:
      "A 4-portal learning platform with live classes, proctored exams, digital answer-sheet evaluation, parent progress tracking and report cards.",
    result: "", // empty = hide that line
    clientQuote: undefined, // empty = hide
    screenshots: {
      desktop: "/screenshots/mathsy-desktop.webp",
      mobile: "/screenshots/mathsy-mobile.webp",
    },
    liveUrl: "https://www.mathsy.in",
    stack: ["React 18", "TypeScript", "Mediasoup SFU", "Supabase", "KaTeX"],
    keyFeatures: [
      "Custom virtual classroom with real-time video and audio",
      "Interactive whiteboard geometry instrumentation (compass, protractor, ruler)",
      "Proctored testing engine and digital answer-sheet evaluation",
      "Student learning dashboard and parent progress tracking",
    ],
  },
];

export function getAllWork(): WorkProject[] {
  return WORK_PROJECTS;
}

export function getWorkBySlug(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug);
}
