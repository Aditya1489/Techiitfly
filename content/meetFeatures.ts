import { SITE } from "@/content/site";

export type MeetFeatureStatus = "available" | "coming-soon" | "roadmap";
export type MeetPlanTier = "solo" | "pro" | "academy";

export const FEATURE_GROUPS = [
  "Joining & access",
  "Live class",
  "Maths whiteboard",
  "Engagement",
  "Recording & streaming",
  "Classroom controls",
] as const;

export type FeatureGroup = (typeof FEATURE_GROUPS)[number];

export interface MeetFeature {
  id: string;
  title: string;
  description: string;
  group: FeatureGroup;
  status: MeetFeatureStatus;
  plans: MeetPlanTier[];
  note?: string;
  screenshot?: string;
  screenshotAlt?: string;
}

const ALL_PLANS: MeetPlanTier[] = ["solo", "pro", "academy"];
const PRO_ACADEMY: MeetPlanTier[] = ["pro", "academy"];

export const MEET_FEATURES: MeetFeature[] = [
  // ─── AVAILABLE NOW ──────────────────────────────────────────────────────────
  // Joining & access
  {
    id: "join-from-browser",
    title: "Join from a browser link",
    description: "Students join from a link, no download.",
    group: "Joining & access",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "shareable-class-link",
    title: "Shareable class link",
    description: "Copy and share the class link in one click.",
    group: "Joining & access",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "prejoin-lobby",
    title: "Pre-join lobby",
    description: "Test camera and microphone (with a volume meter) before joining.",
    group: "Joining & access",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "display-name-role",
    title: "Display name & role",
    description: "Choose a name and join as tutor or student.",
    group: "Joining & access",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "google-signin",
    title: "Google sign-in",
    description: "Tutors can sign in with Google in one click.",
    group: "Joining & access",
    status: "available",
    plans: ALL_PLANS,
  },

  // Live class
  {
    id: "hd-video-audio",
    title: "HD video and audio classes on our own media server",
    description: "No per-minute fees.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "grid-view",
    title: "Grid view",
    description: "See the whole class at once.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "spotlight-view",
    title: "Spotlight view",
    description: "Focus on one speaker.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "pin-participant",
    title: "Pin a participant",
    description: "Keep one person's video in focus.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "speaking-indicator",
    title: "Speaking indicator",
    description: "See who is talking.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "screen-sharing",
    title: "Screen sharing",
    description: "Share your screen, a window or a browser tab (tutors and students).",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
    screenshot: "/screenshots/mathsy-meet-desktop.webp",
    screenshotAlt: "Mathsy Meet screen sharing controls and classroom view",
  },
  {
    id: "fullscreen-mode",
    title: "Fullscreen mode",
    description: "Distraction-free class view.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "class-timer",
    title: "Class timer",
    description: "See how long the class has been running.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "meeting-details-panel",
    title: "Meeting details panel",
    description: "Class link and joining info in one place.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "encrypted-connections",
    title: "Encrypted connections",
    description: "Audio and video are encrypted in transit (WebRTC standard).",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
  },

  // Maths whiteboard
  {
    id: "whiteboard-drawing-tools",
    title: "Whiteboard with drawing tools",
    description:
      "Pen, eraser, shapes, arrows, text, sticky notes, images, colours and sizes, undo/redo, zoom and multiple pages.",
    note: "Tutors show the board to students by sharing their screen; live board sync is coming soon.",
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
    screenshot: "/screenshots/mathsy-meet-instruments.webp",
    screenshotAlt: "Mathsy Meet geometry instruments on whiteboard canvas",
  },
  {
    id: "compass",
    title: "Compass",
    description: "Adjustable radius; draw circles and arcs; snap to 0°, 45°, 90° and 180°.",
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "protractor",
    title: "Protractor",
    description: "180° protractor with a rotating pointer.",
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "ruler",
    title: "Ruler",
    description: "Straight edge with centimetre markings.",
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "set-squares",
    title: "Set-squares",
    description: "30-60-90° and 45-45-90° triangles.",
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "clear-board",
    title: "Clear board",
    description: "Wipe the board in one click.",
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
  },

  // Engagement
  {
    id: "chat",
    title: "Chat",
    description: "Message everyone in the class.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "pinned-message",
    title: "Pinned message",
    description: "Pin a notice, link or formula for everyone.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "raise-hand",
    title: "Raise hand",
    description: "Students raise a hand; it shows on their video tile.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "emoji-reactions",
    title: "Emoji reactions",
    description: "Floating reactions without interrupting the class.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "live-polls",
    title: "Live polls",
    description: "2 to 6 options, created in seconds during class.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
    screenshot: "/screenshots/mathsy-meet-polls.webp",
    screenshotAlt: "Mathsy Meet live poll creation and real-time response tallies",
  },
  {
    id: "live-poll-results",
    title: "Live poll results",
    description: "Votes and percentages update as students answer.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
  },

  // Recording & streaming
  {
    id: "local-hd-recording",
    title: "Local HD recording",
    description: "Record the class and download it to your computer.",
    group: "Recording & streaming",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "youtube-live",
    title: "YouTube Live",
    description:
      "Connect your channel once and stream classes live; auto-detect and share the watch link; optional auto-start.",
    group: "Recording & streaming",
    status: "available",
    plans: PRO_ACADEMY,
  },

  // ─── COMING SOON (in the app, being completed) ───────────────────────────────
  {
    id: "live-whiteboard-students",
    title: "Live whiteboard for students",
    description: "Students see the tutor's board in real time.",
    group: "Maths whiteboard",
    status: "coming-soon",
    plans: ALL_PLANS,
  },
  {
    id: "let-students-draw",
    title: "Let students draw",
    description: "Tutor can allow students to write on the board.",
    group: "Maths whiteboard",
    status: "coming-soon",
    plans: ALL_PLANS,
  },
  {
    id: "mute-all-one",
    title: "Mute all / mute one student",
    description: "Tutor audio control over participant microphones.",
    group: "Classroom controls",
    status: "coming-soon",
    plans: ALL_PLANS,
  },
  {
    id: "remove-student",
    title: "Remove a student from class",
    description: "Remove a disruptive participant from the live session.",
    group: "Classroom controls",
    status: "coming-soon",
    plans: ALL_PLANS,
  },
  {
    id: "lower-all-hands",
    title: "Lower all hands",
    description: "Clear all raised hands with one click.",
    group: "Classroom controls",
    status: "coming-soon",
    plans: ALL_PLANS,
  },
  {
    id: "lock-chat",
    title: "Lock chat for students",
    description: "Pause text chat to keep student attention on class.",
    group: "Classroom controls",
    status: "coming-soon",
    plans: ALL_PLANS,
  },
  {
    id: "whiteboard-pdf-notes",
    title: "Whiteboard notes as PDF after class",
    description: "Export board notes and geometry drawings to a PDF.",
    group: "Maths whiteboard",
    status: "coming-soon",
    plans: ALL_PLANS,
  },
  {
    id: "tablet-as-pen",
    title: "Tablet as a pen",
    description: "Pair a tablet with a code and write on the board.",
    group: "Maths whiteboard",
    status: "coming-soon",
    plans: ALL_PLANS,
  },
  {
    id: "camera-rules",
    title: "Camera rules",
    description: "Ask students to keep cameras on, with an approval request if their camera doesn't work.",
    group: "Classroom controls",
    status: "coming-soon",
    plans: ALL_PLANS,
  },
  {
    id: "poll-leaderboard",
    title: "Poll leaderboard",
    description: "Mark the correct answer and show the top students.",
    group: "Engagement",
    status: "coming-soon",
    plans: ALL_PLANS,
  },

  // ─── ON THE ROADMAP (planned) ───────────────────────────────────────────────
  {
    id: "teach-from-pdf-ncert",
    title: "Teach from PDF and NCERT chapters, with notes on each page",
    description: "Import textbook chapters directly into board pages.",
    group: "Maths whiteboard",
    status: "roadmap",
    plans: ALL_PLANS,
  },
  {
    id: "add-another-pdf",
    title: "Add another PDF during class",
    description: "Load extra worksheets mid-class without wiping your work.",
    group: "Maths whiteboard",
    status: "roadmap",
    plans: ALL_PLANS,
  },
  {
    id: "laser-pointer",
    title: "Laser pointer",
    description: "Temporary highlight beam for focus and diagram review.",
    group: "Maths whiteboard",
    status: "roadmap",
    plans: ALL_PLANS,
  },
  {
    id: "popout-whiteboard",
    title: "Pop-out whiteboard for a second screen or OBS",
    description: "Separate window for dual-monitor or recording setups.",
    group: "Maths whiteboard",
    status: "roadmap",
    plans: ALL_PLANS,
  },
  {
    id: "question-bank",
    title: "Question bank for reusable poll questions",
    description: "Save and categorize questions by subject and topic.",
    group: "Engagement",
    status: "roadmap",
    plans: ALL_PLANS,
  },
  {
    id: "more-poll-types",
    title: "More poll types: multi-correct, true/false and written answers",
    description: "Expanded poll question formats.",
    group: "Engagement",
    status: "roadmap",
    plans: ALL_PLANS,
  },
  {
    id: "poll-timers",
    title: "Poll timers",
    description: "Add countdown limits to student answer submissions.",
    group: "Engagement",
    status: "roadmap",
    plans: ALL_PLANS,
  },
  {
    id: "cloud-recording",
    title: "Cloud recording with automatic upload",
    description: "Automatic cloud archiving of class recordings.",
    group: "Recording & streaming",
    status: "roadmap",
    plans: ALL_PLANS,
  },
  ...(SITE.showMeetAiFeatures
    ? [
        {
          id: "ai-question-to-poll",
          title: "Turn a question on a slide into a poll",
          description: "AI question detection and poll generation.",
          group: "Engagement" as FeatureGroup,
          status: "roadmap" as MeetFeatureStatus,
          plans: PRO_ACADEMY,
        },
        {
          id: "ai-practice-questions",
          title: "Generate practice questions from the class topic",
          description: "On-demand practice generation from lesson notes.",
          group: "Engagement" as FeatureGroup,
          status: "roadmap" as MeetFeatureStatus,
          plans: PRO_ACADEMY,
        },
      ]
    : []),
];

export const AVAILABLE_FEATURES = MEET_FEATURES.filter((f) => f.status === "available");
export const COMING_SOON_FEATURES = MEET_FEATURES.filter((f) => f.status === "coming-soon");
export const ROADMAP_FEATURES = MEET_FEATURES.filter((f) => f.status === "roadmap");

// Backward-compatible alias for existing code
export const LIVE_MEET_FEATURES = AVAILABLE_FEATURES;
export const COMING_SOON_MEET_FEATURES = COMING_SOON_FEATURES;

// ─── COMPARISON TABLE DEFINITIONS ───────────────────────────────────────────
export interface MeetComparisonRow {
  feature: string;
  googleMeet: string;
  zoom: string;
  mathsyMeet: string;
  featureId?: string;
}

export const MEET_COMPARISON_BASE_ROWS: MeetComparisonRow[] = [
  {
    feature: "Built for",
    googleMeet: "General meetings",
    zoom: "Meetings and webinars",
    mathsyMeet: "Maths and science tutoring",
  },
  {
    feature: "Join from a browser link",
    googleMeet: "Yes",
    zoom: "Yes",
    mathsyMeet: "Yes",
    featureId: "join-from-browser",
  },
  {
    feature: "Screen sharing",
    googleMeet: "Yes",
    zoom: "Yes",
    mathsyMeet: "Yes",
    featureId: "screen-sharing",
  },
  {
    feature: "Whiteboard",
    googleMeet: "Through add-ons (Miro, Figma)",
    zoom: "Built-in whiteboard",
    mathsyMeet: "Built-in, with maths instruments (shared via screen share)",
    featureId: "whiteboard-drawing-tools",
  },
  {
    feature: "Compass, protractor, ruler, set-squares",
    googleMeet: "No",
    zoom: "No",
    mathsyMeet: "Yes",
    featureId: "compass",
  },
  {
    feature: "Live polls",
    googleMeet: "Depends on plan",
    zoom: "Yes",
    mathsyMeet: "Yes, built in",
    featureId: "live-polls",
  },
  {
    feature: "Raise hand & reactions",
    googleMeet: "Yes",
    zoom: "Yes",
    mathsyMeet: "Yes",
    featureId: "raise-hand",
  },
  {
    feature: "Record your class",
    googleMeet: "Depends on plan",
    zoom: "Yes",
    mathsyMeet: "Yes, saved to your computer",
    featureId: "local-hd-recording",
  },
  {
    feature: "Price",
    googleMeet: "Free plan with limits; paid plans",
    zoom: "Free plan with limits; paid plans",
    mathsyMeet: "Flat ₹999/month per tutor",
  },
];

export function getActiveComparisonRows(): MeetComparisonRow[] {
  return MEET_COMPARISON_BASE_ROWS.filter((row) => {
    if (!row.featureId) return true;
    const feat = MEET_FEATURES.find((f) => f.id === row.featureId);
    return feat ? feat.status === "available" : true;
  });
}
