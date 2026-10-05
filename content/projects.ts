export interface ProjectPortal {
  title: string;
  description: string;
  features: string[];
}

export interface GlorifiedScreenshot {
  id: string;
  title: string;
  badge: string;
  description: string;
  src: string;
  url?: string;
  tag?: string;
  eyebrow?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tagline: string;
  category: "EdTech Platform" | "Wellness & Retreats" | "Teacher Training" | "Our Product";
  role: string;
  liveUrl: string;
  isFlagship?: boolean;
  featuredScreenshots: {
    desktop?: string;
    mobile?: string;
  };
  portalScreenshot?: string;
  glorifiedScreenshots?: GlorifiedScreenshot[];
  summary: string;
  challenge: string;
  solution: string;
  portals?: ProjectPortal[];
  flagshipModule?: {
    name: string;
    subtitle: string;
    screenshots?: {
      desktop?: string;
      mobile?: string;
    };
    description: string;
    highlights: string[];
    stack: string[];
  };
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
    slug: "mathsy",
    title: "Mathsy",
    client: "Mathsy Online Learning",
    tagline: "4-portal EdTech platform with custom virtual classroom and exam engine",
    category: "Our Product",
    role: "Product design, architecture & full-stack development",
    liveUrl: "https://mathsy.in",
    isFlagship: true,
    featuredScreenshots: {
      desktop: "/screenshots/mathsy-desktop.webp",
      mobile: "/screenshots/mathsy-mobile.webp",
    },
    portalScreenshot: "/screenshots/mathsy-portal.webp",
    glorifiedScreenshots: [
      {
        id: "student-dashboard",
        eyebrow: "STUDENT PORTAL",
        title: "Student Portal Learning Deck",
        badge: "Student Portal",
        tag: "STUDENT PORTAL",
        url: "https://mathsy.in/dashboard",
        description: "Real-time dashboard showing study streaks, question queues, chapter progress, and active metrics.",
        src: "/screenshots/mathsy/mathsy-student-dashboard-desktop.webp",
      },
      {
        id: "live-classroom",
        eyebrow: "VIRTUAL CLASSROOM",
        title: "Live Virtual Classroom & Whiteboard",
        badge: "Virtual Classroom",
        tag: "VIRTUAL CLASSROOM",
        url: "https://mathsy.in/meet",
        description: "Live chemistry lecture deck with presentation slides, interactive drawing toolbar, and multi-user video feeds.",
        src: "/screenshots/mathsy/mathsy-live-classroom-desktop.webp",
      },
      {
        id: "proctored-exams",
        eyebrow: "EXAM ENGINE",
        title: "Scheduled Examination & Test Catalog",
        badge: "Exam Engine",
        tag: "EXAM ENGINE",
        url: "https://mathsy.in/test-series",
        description: "Test series catalog showing duration timers, total marks, syllabus coverage, and submission statuses.",
        src: "/screenshots/mathsy/mathsy-student-test-series-desktop.webp",
      },
      {
        id: "tutor-evaluation",
        eyebrow: "EVALUATION QUEUE",
        title: "Digital Booklet Evaluation Queue",
        badge: "Tutor Portal",
        tag: "EVALUATION",
        url: "https://mathsy.in/tutor/evaluations",
        description: "Subjective booklet evaluation table with student submission queues, subject tags, and grading statuses.",
        src: "/screenshots/mathsy/mathsy-tutor-evaluation-desktop.webp",
      },
      {
        id: "practice-portal",
        eyebrow: "PRACTICE PORTAL",
        title: "Subject Mastery & Practice Feed",
        badge: "Practice Engine",
        tag: "PRACTICE",
        url: "https://mathsy.in/practice",
        description: "Interactive practice tiles across Biology, Mathematics, and Physics with accuracy stats and recent sessions.",
        src: "/screenshots/mathsy/mathsy-student-leaderboard-desktop.webp",
      },
      {
        id: "public-homepage",
        eyebrow: "PUBLIC PLATFORM",
        title: "Curriculum Hub & Platform Landing",
        badge: "Public Site",
        tag: "PUBLIC SITE",
        url: "https://mathsy.in",
        description: "Public-facing landing hub featuring interactive 3D geometry visuals, course curricula, and enrollment metrics.",
        src: "/screenshots/mathsy/mathsy-public-homepage-desktop.webp",
      },
    ],
    summary:
      "A 4-portal EdTech platform (student/tutor/parent/admin) with live classes, exam engine with proctoring, digital answer-sheet evaluation, parent progress tracking, and report cards.",
    challenge:
      "Off-the-shelf tools lacked integrated math sketching tools and unified coordination between students, tutors, parents, and administrative staff.",
    solution:
      "Built a unified 4-portal platform using React 18, TypeScript, Vite, and Supabase, featuring Mathsy Meet — a custom virtual classroom with self-hosted Mediasoup SFU and bespoke TLDraw math tools.",
    portals: [
      {
        title: "Student Portal",
        description:
          "Live classes, exam engine with proctoring, digital answer-sheet review, and report cards.",
        features: [
          "Live class entry with one-click room access",
          "Auto PDF notes delivered after class",
          "Exam engine with proctoring & KaTeX rendering",
          "Digital answer-sheet review and report cards",
        ],
      },
      {
        title: "Tutor Portal",
        description:
          "Live class orchestration, digital answer-sheet evaluation, and tablet pairing for tutors.",
        features: [
          "Tablet pairing for tutors for stylus sketching",
          "Slide-to-poll interactive question broadcaster",
          "Digital answer-sheet evaluation interface",
          "Attendance tracking and lecture management",
        ],
      },
      {
        title: "Parent Portal",
        description:
          "Progress tracking giving parents direct visibility into attendance and report cards.",
        features: [
          "Class attendance and punctuality records",
          "Parent progress tracking and test scores",
          "Auto-generated student report cards",
        ],
      },
      {
        title: "Admin Portal",
        description:
          "Operational oversight for batch scheduling, tutor management, and platform oversight.",
        features: [
          "Granular role-based permissions",
          "Centralized timetable and batch scheduling",
          "Tutor management and course allocation",
        ],
      },
    ],
    flagshipModule: {
      name: "Mathsy Meet",
      subtitle: "Custom Virtual Classroom Inside Mathsy",
      screenshots: {
        desktop: "/screenshots/mathsy-meet-desktop.webp",
      },
      description:
        "Custom virtual classroom inside Mathsy built with a self-hosted Mediasoup SFU media server and TLDraw whiteboard with custom math tools.",
      highlights: [
        "Self-hosted Mediasoup SFU (+ LiveKit adapter, coturn)",
        "TLDraw whiteboard with custom math tools (compass, protractor, ruler, set-squares)",
        "Slide-to-poll interactive widget",
        "Hand-raise queue",
        "Auto PDF notes after class",
        "YouTube Live bridge for masterclasses",
        "Tablet pairing for tutors",
      ],
      stack: [
        "Mediasoup SFU",
        "LiveKit Adapter",
        "coturn",
        "TLDraw Custom Tools",
        "React 18",
        "TypeScript",
        "Zustand",
        "KaTeX",
      ],
    },
    keyFeatures: [
      "4 role-based portals (Student, Tutor, Parent, Admin)",
      "Mathsy Meet custom virtual classroom (Mediasoup SFU, coturn)",
      "TLDraw geometric math tools (compass, protractor, ruler, set-squares)",
      "Exam engine with proctoring and digital answer-sheet evaluation",
      "Parent progress tracking and auto report cards",
    ],
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Supabase",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "shadcn/ui",
      "KaTeX",
    ],
    metrics: [
      {
        label: "Portals",
        value: "4 Portals",
        note: "Student, Tutor, Parent, Admin",
      },
      {
        label: "Virtual Classroom",
        value: "Mathsy Meet",
        note: "Self-hosted Mediasoup SFU + coturn",
      },
      {
        label: "Whiteboard Tools",
        value: "4 Tools",
        note: "Compass, protractor, ruler, set-squares",
      },
    ],
  },
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
      "Gated syllabus brochure download capturing verified student leads",
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
];

export function getAllProjects(): CaseStudy[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): CaseStudy | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
