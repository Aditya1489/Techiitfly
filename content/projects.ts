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
  category: "EdTech client platform" | "EdTech Platform" | "Wellness & Retreats" | "Teacher Training" | "Our Product";
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
    client: "Mathsy (mathsy.in)",
    tagline: "4-portal learning platform with live classes, proctored exams, and parent progress tracking",
    category: "EdTech client platform",
    role: "Product design, architecture & full-stack development",
    liveUrl: "https://www.mathsy.in",
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
        description: "Student dashboard showing study streaks, upcoming classes, chapter progress, and subject practice feeds.",
        src: "/screenshots/mathsy-screens/student-dashboard.webp",
      },
      {
        id: "proctored-exams",
        eyebrow: "EXAM ENGINE",
        title: "Scheduled Examination & Test Series",
        badge: "Exam Engine",
        tag: "EXAM ENGINE",
        description: "Test series catalog showing duration timers, total marks, syllabus coverage, and submission statuses.",
        src: "/screenshots/mathsy-screens/proctored-exams.webp",
      },
      {
        id: "exam-interface",
        eyebrow: "TEST PALETTE",
        title: "Proctored Exam Interface & Question Palette",
        badge: "Exam Engine",
        tag: "EXAM ENGINE",
        description: "Live exam screen with question navigation palette, countdown timer, and KaTeX math equation rendering.",
        src: "/screenshots/mathsy-screens/exam-engine.webp",
      },
      {
        id: "tutor-evaluation",
        eyebrow: "EVALUATION QUEUE",
        title: "Digital Booklet Evaluation & Grading Queue",
        badge: "Tutor Portal",
        tag: "EVALUATION",
        description: "Subjective booklet evaluation table where tutors review student answer sheets, annotate marks, and submit feedback.",
        src: "/screenshots/mathsy-screens/evaluation-scorecard.webp",
      },
      {
        id: "study-resources",
        eyebrow: "RESOURCES PORTAL",
        title: "NCERT Chapter Library & Practice Resources",
        badge: "Resources",
        tag: "RESOURCES",
        description: "Interactive practice resources across Mathematics, Physics, and Chemistry with chapter-wise curriculum organization.",
        src: "/screenshots/mathsy-screens/study-resources.webp",
      },
    ],
    summary:
      "A 4-portal EdTech platform (student, tutor, parent, and admin) with live classes, proctored exams, digital answer-sheet evaluation, parent progress tracking, and report cards.",
    challenge:
      "An online maths and science academy needed one platform for students, tutors, parents and admins — including live classes built for teaching maths.",
    solution:
      "A 4-portal learning platform with live classes, proctored exams, digital answer-sheet evaluation, parent progress tracking and report cards.",
    portals: [
      {
        title: "Student Portal",
        description:
          "Live classes with interactive whiteboard, proctored exams, digital answer-sheet review, and progress reports.",
        features: [
          "Live class entry with one-click room access",
          "Automatic PDF notes delivered after class",
          "Proctored exam engine with KaTeX math rendering",
          "Digital answer-sheet review and report cards",
        ],
      },
      {
        title: "Tutor Portal",
        description:
          "Live class orchestration, digital answer-sheet evaluation, and tablet pairing for handwriting.",
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
    flagshipModule: undefined,
    keyFeatures: [
      "4 role-based portals (Student, Tutor, Parent, Admin)",
      "Dedicated live classroom with geometry instruments and tablet pen input",
      "Proctored exam engine and digital answer-sheet evaluation",
      "Parent progress tracking and automatic report cards",
      "NCERT syllabus chapter library and practice feeds",
    ],
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Supabase",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "KaTeX",
    ],
    metrics: [],
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
];

export function getAllProjects(): CaseStudy[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): CaseStudy | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export * from "./work";

