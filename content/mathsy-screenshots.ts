export interface MathsyScreenshot {
  file: string;
  portal: "tutor" | "student" | "public";
  viewport: "1440x900 @ 2x" | "390x844 @ 3x";
  caption: string;
  redacted: boolean;
}

export const mathsyScreenshots: MathsyScreenshot[] = [
  {
    file: "mathsy-live-classroom-desktop.webp",
    portal: "tutor",
    viewport: "1440x900 @ 2x",
    caption: "Live virtual classroom panel showing chemistry lecture presentation, drawing palette, tutor webcam feed, and active students",
    redacted: false,
  },
  {
    file: "mathsy-public-homepage-desktop.webp",
    portal: "public",
    viewport: "1440x900 @ 2x",
    caption: "Public homepage hero section scrolled past banner, showing 3D geometry graphic and key metrics",
    redacted: false,
  },
  {
    file: "mathsy-tutor-dashboard-desktop.webp",
    portal: "tutor",
    viewport: "1440x900 @ 2x",
    caption: "Tutor Mentorship Hub dashboard with quick action cards for student cohorts and activity",
    redacted: false,
  },
  {
    file: "mathsy-tutor-poll-bank-desktop.webp",
    portal: "tutor",
    viewport: "1440x900 @ 2x",
    caption: "Tutor live class poll bank repository interface with create poll action",
    redacted: false,
  },
  {
    file: "mathsy-tutor-exam-setup-desktop.webp",
    portal: "tutor",
    viewport: "1440x900 @ 2x",
    caption: "Tutor exams control deck loading interface",
    redacted: false,
  },
  {
    file: "mathsy-tutor-evaluation-desktop.webp",
    portal: "tutor",
    viewport: "1440x900 @ 2x",
    caption: "Tutor subjective booklet evaluation queue with student names and emails redacted for privacy",
    redacted: true,
  },
  {
    file: "mathsy-student-dashboard-desktop.webp",
    portal: "student",
    viewport: "1440x900 @ 2x",
    caption: "Student dashboard with streak counter, attempt metrics, topic list, and redacted student profile",
    redacted: true,
  },
  {
    file: "mathsy-student-progress-desktop.webp",
    portal: "student",
    viewport: "1440x900 @ 2x",
    caption: "Student progress screen displaying questions attempted, accuracy rate, and mastered topics",
    redacted: true,
  },
  {
    file: "mathsy-student-test-series-desktop.webp",
    portal: "student",
    viewport: "1440x900 @ 2x",
    caption: "Proctored and practice exams catalog showing test cards, durations, and submission statuses",
    redacted: true,
  },
  {
    file: "mathsy-student-leaderboard-desktop.webp",
    portal: "student",
    viewport: "1440x900 @ 2x",
    caption: "Student practice portal displaying subject selection tiles, accuracy stats, and recent sessions",
    redacted: true,
  },
  {
    file: "mathsy-student-dashboard-mobile.webp",
    portal: "student",
    viewport: "390x844 @ 3x",
    caption: "Mobile student dashboard with streak banner, metric tiles, and curriculum topics",
    redacted: true,
  },
  {
    file: "mathsy-student-test-series-mobile.webp",
    portal: "student",
    viewport: "390x844 @ 3x",
    caption: "Mobile proctored and practice exams list showing scheduled and submitted tests",
    redacted: false,
  },
];
