export interface GalleryItem {
  id: string;
  label: string;
  path: string;
  group?: string;
  desktop: string;
  desktopPoster: string;
  mobile?: string;
  mobilePoster?: string;
  caption: string;
}

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
  gallery?: GalleryItem[];
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
    gallery: [
      {
        id: "home",
        label: "Home",
        path: "/",
        desktop: "/screenshots/work/yogagarhi/home-desktop.webp",
        desktopPoster: "/screenshots/work/yogagarhi/home-desktop-poster.webp",
        mobile: "/screenshots/work/yogagarhi/home-mobile.webp",
        mobilePoster: "/screenshots/work/yogagarhi/home-mobile-poster.webp",
        caption: "High-converting homepage presenting Bali & Rishikesh school credentials, course highlights, and direct inquiry channels.",
      },
      {
        id: "about",
        label: "About School",
        path: "/about-school",
        desktop: "/screenshots/work/yogagarhi/about-desktop.webp",
        desktopPoster: "/screenshots/work/yogagarhi/about-desktop-poster.webp",
        mobile: "/screenshots/work/yogagarhi/about-mobile.webp",
        mobilePoster: "/screenshots/work/yogagarhi/about-mobile-poster.webp",
        caption: "Foundational story, Vedic tradition lineage, master teacher introductions, and Yoga Alliance accreditation credentials.",
      },
      {
        id: "courses",
        label: "200-Hour Bali YTT",
        path: "/200-hour-yoga-teacher-training-in-bali",
        desktop: "/screenshots/work/yogagarhi/courses-desktop.webp",
        desktopPoster: "/screenshots/work/yogagarhi/courses-desktop-poster.webp",
        mobile: "/screenshots/work/yogagarhi/courses-mobile.webp",
        mobilePoster: "/screenshots/work/yogagarhi/courses-mobile-poster.webp",
        caption: "Residential teacher training syllabus with daily routines, accommodation tiers, curriculum modules, and fee details.",
      },
      {
        id: "retreats",
        label: "Bali Retreat",
        path: "/retreat/bali/7-days",
        desktop: "/screenshots/work/yogagarhi/retreats-desktop.webp",
        desktopPoster: "/screenshots/work/yogagarhi/retreats-desktop-poster.webp",
        mobile: "/screenshots/work/yogagarhi/retreats-mobile.webp",
        mobilePoster: "/screenshots/work/yogagarhi/retreats-mobile-poster.webp",
        caption: "Wellness retreat program featuring daily restorative yoga, sound baths, cultural excursions, and villa accommodation.",
      },
      {
        id: "gallery",
        label: "Gallery",
        path: "/gallery",
        desktop: "/screenshots/work/yogagarhi/gallery-desktop.webp",
        desktopPoster: "/screenshots/work/yogagarhi/gallery-desktop-poster.webp",
        mobile: "/screenshots/work/yogagarhi/gallery-mobile.webp",
        mobilePoster: "/screenshots/work/yogagarhi/gallery-mobile-poster.webp",
        caption: "Visual campus showcase highlighting open-air shalas, meditation gardens, cohort sessions, and teacher training moments.",
      },
      {
        id: "contact",
        label: "Contact",
        path: "/contact-us",
        desktop: "/screenshots/work/yogagarhi/contact-desktop.webp",
        desktopPoster: "/screenshots/work/yogagarhi/contact-desktop-poster.webp",
        mobile: "/screenshots/work/yogagarhi/contact-mobile.webp",
        mobilePoster: "/screenshots/work/yogagarhi/contact-mobile-poster.webp",
        caption: "Campus admission form, campus maps, phone numbers, and WhatsApp chat for course counseling.",
      },
    ],
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
    gallery: [
      {
        id: "home",
        label: "Home",
        path: "/",
        desktop: "/screenshots/work/yogicpath/home-desktop.webp",
        desktopPoster: "/screenshots/work/yogicpath/home-desktop-poster.webp",
        mobile: "/screenshots/work/yogicpath/home-mobile.webp",
        mobilePoster: "/screenshots/work/yogicpath/home-mobile-poster.webp",
        caption: "Flagship landing page introducing Yoga Alliance accredited residential teacher trainings in Rishikesh and Kerala.",
      },
      {
        id: "about",
        label: "About Us",
        path: "/about-us/",
        desktop: "/screenshots/work/yogicpath/about-desktop.webp",
        desktopPoster: "/screenshots/work/yogicpath/about-desktop-poster.webp",
        mobile: "/screenshots/work/yogicpath/about-mobile.webp",
        mobilePoster: "/screenshots/work/yogicpath/about-mobile-poster.webp",
        caption: "School tradition, Himalayan yogic lineage, lead instructor biographies, and worldwide accreditation standards.",
      },
      {
        id: "ytt-200",
        label: "200-Hour Rishikesh",
        path: "/200-hour-yoga-teacher-training-rishikesh/",
        desktop: "/screenshots/work/yogicpath/ytt-200-desktop.webp",
        desktopPoster: "/screenshots/work/yogicpath/ytt-200-desktop-poster.webp",
        mobile: "/screenshots/work/yogicpath/ytt-200-mobile.webp",
        mobilePoster: "/screenshots/work/yogicpath/ytt-200-mobile-poster.webp",
        caption: "Foundational 200-hour course breakdown with daily schedules, asana modules, ashram amenities, and intake dates.",
      },
      {
        id: "ytt-300",
        label: "300-Hour Rishikesh",
        path: "/300-hour-yoga-teacher-training-rishikesh/",
        desktop: "/screenshots/work/yogicpath/ytt-300-desktop.webp",
        desktopPoster: "/screenshots/work/yogicpath/ytt-300-desktop-poster.webp",
        mobile: "/screenshots/work/yogicpath/ytt-300-mobile.webp",
        mobilePoster: "/screenshots/work/yogicpath/ytt-300-mobile-poster.webp",
        caption: "Advanced curriculum covering hands-on adjustments, pranayama, therapeutic yoga, and RYT-500 certification progression.",
      },
      {
        id: "events",
        label: "Events",
        path: "/events/",
        desktop: "/screenshots/work/yogicpath/events-desktop.webp",
        desktopPoster: "/screenshots/work/yogicpath/events-desktop-poster.webp",
        mobile: "/screenshots/work/yogicpath/events-mobile.webp",
        mobilePoster: "/screenshots/work/yogicpath/events-mobile-poster.webp",
        caption: "Upcoming training calendar, course dates across destinations, and scheduled admissions.",
      },
      {
        id: "contact",
        label: "Contact",
        path: "/contact-us/",
        desktop: "/screenshots/work/yogicpath/contact-desktop.webp",
        desktopPoster: "/screenshots/work/yogicpath/contact-desktop-poster.webp",
        mobile: "/screenshots/work/yogicpath/contact-mobile.webp",
        mobilePoster: "/screenshots/work/yogicpath/contact-mobile-poster.webp",
        caption: "Admissions inquiry form, email contacts, direct phone lines, and campus location guidance.",
      },
    ],
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
    gallery: [
      // 1. Public website
      {
        id: "home",
        group: "Public website",
        label: "Home",
        path: "/",
        desktop: "/screenshots/work/mathsy/home-desktop.webp",
        desktopPoster: "/screenshots/work/mathsy/home-desktop-poster.webp",
        mobile: "/screenshots/work/mathsy/home-mobile.webp",
        mobilePoster: "/screenshots/work/mathsy/home-mobile-poster.webp",
        caption: "Public learning academy portal presenting mentor faculty, course modes, platform features, and trial sign-ups.",
      },
      {
        id: "test-series",
        group: "Public website",
        label: "NEET Test Series",
        path: "/test-series",
        desktop: "/screenshots/work/mathsy/test-series-desktop.webp",
        desktopPoster: "/screenshots/work/mathsy/test-series-desktop-poster.webp",
        mobile: "/screenshots/work/mathsy/test-series-mobile.webp",
        mobilePoster: "/screenshots/work/mathsy/test-series-mobile-poster.webp",
        caption: "Curriculum-aligned practice series directory with 140+ mock exams, chapter syllabus breakdowns, and exam simulation overview.",
      },
      // 2. Student portal
      {
        id: "student-dashboard",
        group: "Student portal",
        label: "Student Dashboard",
        path: "/student/dashboard",
        desktop: "/screenshots/work/mathsy/student-dashboard-desktop.webp",
        desktopPoster: "/screenshots/work/mathsy/student-dashboard-desktop-poster.webp",
        mobile: "/screenshots/work/mathsy/student-dashboard-mobile.webp",
        mobilePoster: "/screenshots/work/mathsy/student-dashboard-mobile-poster.webp",
        caption: "Student home dashboard tracking active learning streaks, pending questions, accuracy benchmarks, and topic mastery modules.",
      },
      {
        id: "student-exams",
        group: "Student portal",
        label: "Proctored Exams",
        path: "/student/exams",
        desktop: "/screenshots/work/mathsy/student-exams-desktop.webp",
        desktopPoster: "/screenshots/work/mathsy/student-exams-desktop-poster.webp",
        mobile: "/screenshots/work/mathsy/student-exams-mobile.webp",
        mobilePoster: "/screenshots/work/mathsy/student-exams-mobile-poster.webp",
        caption: "Scheduled proctored examination hub with timed papers, violation logging, submission status, and evaluated scorecards.",
      },
      {
        id: "student-practice",
        group: "Student portal",
        label: "Practice Modules",
        path: "/student/practice",
        desktop: "/screenshots/work/mathsy/student-practice-desktop.webp",
        desktopPoster: "/screenshots/work/mathsy/student-practice-desktop-poster.webp",
        mobile: "/screenshots/work/mathsy/student-practice-mobile.webp",
        mobilePoster: "/screenshots/work/mathsy/student-practice-mobile-poster.webp",
        caption: "Subject-wise interactive practice workspace with chapter accuracy percentages, session history, and unlocked feed modules.",
      },
      {
        id: "student-study-materials",
        group: "Student portal",
        label: "Study Library",
        path: "/student/library",
        desktop: "/screenshots/work/mathsy/student-study-materials-desktop.webp",
        desktopPoster: "/screenshots/work/mathsy/student-study-materials-desktop-poster.webp",
        mobile: "/screenshots/work/mathsy/student-study-materials-mobile.webp",
        mobilePoster: "/screenshots/work/mathsy/student-study-materials-mobile-poster.webp",
        caption: "Curated textbook study resources directory organized across science and mathematics disciplines with chapter guides and revision notes.",
      },
      {
        id: "student-progress",
        group: "Student portal",
        label: "Learning Analytics",
        path: "/student/analytics",
        desktop: "/screenshots/work/mathsy/student-progress-desktop.webp",
        desktopPoster: "/screenshots/work/mathsy/student-progress-desktop-poster.webp",
        mobile: "/screenshots/work/mathsy/student-progress-mobile.webp",
        mobilePoster: "/screenshots/work/mathsy/student-progress-mobile-poster.webp",
        caption: "Comprehensive student progress analytics detailing attempt volumes, question accuracy trends, and mastery timelines.",
      },
      // 3. Tutor portal
      {
        id: "tutor-dashboard",
        group: "Tutor portal",
        label: "Mentor Overview",
        path: "/tutor/dashboard",
        desktop: "/screenshots/work/mathsy/tutor-dashboard-desktop.webp",
        desktopPoster: "/screenshots/work/mathsy/tutor-dashboard-desktop-poster.webp",
        mobile: "/screenshots/work/mathsy/tutor-dashboard-mobile.webp",
        mobilePoster: "/screenshots/work/mathsy/tutor-dashboard-mobile-poster.webp",
        caption: "Faculty command center summarizing active student cohorts, validated curriculum topics, cohort accuracy rates, and quick action hubs.",
      },
      {
        id: "tutor-evaluation",
        group: "Tutor portal",
        label: "Evaluation Queue",
        path: "/tutor/evaluations",
        desktop: "/screenshots/work/mathsy/tutor-evaluation-desktop.webp",
        desktopPoster: "/screenshots/work/mathsy/tutor-evaluation-desktop-poster.webp",
        mobile: "/screenshots/work/mathsy/tutor-evaluation-mobile.webp",
        mobilePoster: "/screenshots/work/mathsy/tutor-evaluation-mobile-poster.webp",
        caption: "Centralized answer-sheet evaluation queue displaying student submissions, examination tiers, proctoring violations, and digital grading workflows.",
      },
      {
        id: "tutor-questions",
        group: "Tutor portal",
        label: "Question Directory",
        path: "/tutor/question-bank",
        desktop: "/screenshots/work/mathsy/tutor-questions-desktop.webp",
        desktopPoster: "/screenshots/work/mathsy/tutor-questions-desktop-poster.webp",
        mobile: "/screenshots/work/mathsy/tutor-questions-mobile.webp",
        mobilePoster: "/screenshots/work/mathsy/tutor-questions-mobile-poster.webp",
        caption: "Multi-board question directory categorized across CBSE, ICSE, and SSC syllabi with difficulty breakdowns and curriculum import tools.",
      },
      {
        id: "tutor-exams",
        group: "Tutor portal",
        label: "Exam Control Deck",
        path: "/tutor/exams",
        desktop: "/screenshots/work/mathsy/tutor-exams-desktop.webp",
        desktopPoster: "/screenshots/work/mathsy/tutor-exams-desktop-poster.webp",
        mobile: "/screenshots/work/mathsy/tutor-exams-mobile.webp",
        mobilePoster: "/screenshots/work/mathsy/tutor-exams-mobile-poster.webp",
        caption: "Assessment management deck enabling tutors to schedule proctored exams, configure paper durations, monitor completions, and manage question weighting.",
      },
      {
        id: "tutor-progress",
        group: "Tutor portal",
        label: "Cohort Performance",
        path: "/tutor/cohort-reports",
        desktop: "/screenshots/work/mathsy/tutor-progress-desktop.webp",
        desktopPoster: "/screenshots/work/mathsy/tutor-progress-desktop-poster.webp",
        mobile: "/screenshots/work/mathsy/tutor-progress-mobile.webp",
        mobilePoster: "/screenshots/work/mathsy/tutor-progress-mobile-poster.webp",
        caption: "Student cohort performance tracking with board-wise student filters, accuracy ratings, and one-click access to student academic dossiers.",
      },
    ],
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
