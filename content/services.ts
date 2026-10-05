export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  deliverables: string[];
  bestFor: string;
}

export const SERVICES: Service[] = [
  {
    id: "platforms",
    number: "01",
    title: "Learning Platforms & Custom Classrooms",
    tagline: "Bespoke digital infrastructure for education businesses when standard tools limit your pedagogy.",
    deliverables: [
      "Custom role-based portals (Student, Tutor, Parent, Admin)",
      "Virtual classrooms with interactive whiteboards and drawing tools",
      "Exam engine with proctored testing and evaluation",
    ],
    bestFor: "EdTech founders, online academies, coaching institutions, tutoring networks.",
  },
  {
    id: "conversion-sites",
    number: "02",
    title: "High-Converting Brand & Course Sites",
    tagline: "Websites engineered to build trust and drive enrollments for wellness and certification programs.",
    deliverables: [
      "Interactive diagnostic lead quizzes (e.g., Ayurveda Prakriti test)",
      "Course cohort schedules and early-bird discount engines",
      "WhatsApp click-to-chat CTAs and Google Reviews integration",
    ],
    bestFor: "Yoga schools, retreat centers, boutique academies, certification providers.",
  },
  {
    id: "performance-architecture",
    number: "03",
    title: "Performance & Technical Optimization",
    tagline: "Codebase refactoring and asset optimization to deliver fast, reliable web experiences.",
    deliverables: [
      "Core Web Vitals audit and performance optimization",
      "Static architecture migration with low maintenance overhead",
      "Clean TypeScript codebases and image pipeline compression",
    ],
    bestFor: "Businesses seeking faster load times, improved mobile responsiveness, or lower hosting overhead.",
  },
];
