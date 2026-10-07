export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tagline: string;
  category: "EdTech Platform" | "Wellness & Retreats" | "Teacher Training";
  role: string;
  liveUrl: string;
  featuredScreenshots: {
    desktop?: string;
    mobile?: string;
  };
  summary: string;
  challenge: string;
  solution: string;
  keyFeatures: string[];
  stack: string[];
  metrics: {
    label: string;
    value: string;
    note: string;
  }[];
}

export const PROJECTS: CaseStudy[] = [
  {
    slug: "yogagarhi",
    title: "YogaGarhi",
    client: "YogaGarhi School of Yoga",
    tagline: "Conversion-focused site for a Yoga Alliance school in Bali & Rishikesh",
    category: "Wellness & Retreats",
    role: "UX Strategy, Frontend Engineering & Technical SEO",
    liveUrl: "https://www.yogagarhi.com",
    featuredScreenshots: {
      desktop: "/screenshots/yogagarhi-desktop.webp",
      mobile: "/screenshots/yogagarhi-mobile.webp",
    },
    summary:
      "A conversion-focused site for a Yoga Alliance school in Bali and Rishikesh, featuring an Ayurveda Prakriti quiz, sale countdown, and WhatsApp direct bookings.",
    challenge:
      "Retreat seekers need clear cohort dates, campus clarity across Bali and Rishikesh, and frictionless booking channels.",
    solution:
      "Engineered a high-converting Next.js site featuring an interactive Ayurveda Prakriti diagnostic quiz, retreat cohort countdown timers, student testimonials, and direct WhatsApp click-to-chat booking CTAs.",
    keyFeatures: [
      "Interactive Ayurveda 'Prakriti' diagnostic quiz for qualified lead capture",
      "Retreat cohort countdown timers for booking urgency",
      "Google Reviews integration with student video testimonials",
      "WhatsApp click-to-chat CTAs pre-filling the selected retreat course",
      "Cloudinary media optimization pipeline delivering responsive images",
      "Complete OpenGraph social preview tags and Schema.org Course markup",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Cloudinary",
      "WhatsApp click-to-chat CTAs",
    ],
    metrics: [
      {
        label: "Campuses",
        value: "2 Campuses",
        note: "Bali (Ubud) & Rishikesh (Ganges)",
      },
      {
        label: "Lead Funnel",
        value: "Prakriti Quiz",
        note: "Interactive quiz lead capture",
      },
      {
        label: "Booking Action",
        value: "WhatsApp CTAs",
        note: "Direct click-to-chat inquiries",
      },
    ],
  },
  {
    slug: "yogicpath",
    title: "Yogic Path",
    client: "Yogic Path Yoga Teacher Training",
    tagline: "Lead capture & course curriculum platform for Yoga Alliance certification",
    category: "Teacher Training",
    role: "Web Architecture, Lead Capture Funnel & Technical SEO",
    liveUrl: "https://yogicpathytt.com",
    featuredScreenshots: {
      desktop: "/screenshots/yogicpath-desktop.webp",
      mobile: "/screenshots/yogicpath-mobile.webp",
    },
    summary:
      "A lead generation architecture for a Yoga Alliance accredited institution offering 200-hour and 300-hour residential teacher training certifications.",
    challenge:
      "Prospective teacher trainees require deep curriculum transparency, accommodation details, and accreditation proof before committing to a multi-week course.",
    solution:
      "Built a clear information architecture showcasing detailed daily schedules, syllabus modules, instructor credentials, and an automated brochure download lead gate.",
    keyFeatures: [
      "Gated syllabus brochure download capturing qualified student leads",
      "200-Hour and 300-Hour interactive curriculum breakdown",
      "Campus location landing pages across Rishikesh, Kerala, and Bali",
      "SEO-optimized FAQ section structured with Google FAQ Schema",
      "Multi-step enquiry form with WhatsApp follow-up routing",
    ],
    stack: [
      "WordPress",
      "WPForms",
      "custom theme/CSS",
      "SEO",
    ],
    metrics: [
      {
        label: "Accreditation",
        value: "Yoga Alliance",
        note: "RYS 200 & RYS 300 registered curriculum",
      },
      {
        label: "Locations",
        value: "3 Hubs",
        note: "Rishikesh, Kerala, and Bali course centers",
      },
      {
        label: "Lead Capture",
        value: "Brochure Gate",
        note: "Curriculum download funnel",
      },
    ],
  },
  {
    slug: "mathsy",
    title: "Mathsy",
    client: "Mathsy",
    tagline: "Online learning platform for a maths & science academy",
    category: "EdTech Platform",
    role: "Product Design, Full-Stack Development & Live Classes",
    liveUrl: "https://www.mathsy.in",
    featuredScreenshots: {
      desktop: "/screenshots/mathsy-desktop.webp",
      mobile: "/screenshots/mathsy-mobile.webp",
    },
    summary:
      "A learning platform for an online maths and science academy, with separate portals for students, tutors, parents and admins.",
    challenge:
      "The academy was juggling separate tools for live classes, tests and parent updates, and general video tools had no way to draw geometry properly during class.",
    solution:
      "We built one platform with four role-based portals, live classes with a maths whiteboard, proctored online tests, digital answer-sheet evaluation and automatic parent progress reports.",
    keyFeatures: [
      "Role-based portals for students, tutors, parents and admins",
      "Live classes with a maths whiteboard (compass, protractor, ruler)",
      "Proctored online tests with timers",
      "Digital answer-sheet evaluation by tutors",
      "Parent progress tracking and report cards",
    ],
    stack: ["React", "TypeScript", "Supabase", "WebRTC", "KaTeX"],
    metrics: [
      {
        label: "Portals",
        value: "4 Portals",
        note: "Student, Tutor, Parent, Admin",
      },
      {
        label: "Live Classes",
        value: "Built in",
        note: "Maths whiteboard with geometry tools",
      },
      {
        label: "Tests",
        value: "Proctored",
        note: "Online tests with digital evaluation",
      },
    ],
  },
];

export function getAllProjects(): CaseStudy[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): CaseStudy | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export * from "./work";
