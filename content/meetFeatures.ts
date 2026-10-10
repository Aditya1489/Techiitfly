export type MeetFeatureStatus = "live" | "coming-soon";

export interface MeetFeature {
  id: string;
  title: string;
  description: string;
  group: "classroom" | "whiteboard" | "interaction" | "recording" | "moderation";
  status: MeetFeatureStatus;
  screenshot?: string;
  screenshotAlt?: string;
  bullets?: string[];
}

export const MEET_FEATURES: MeetFeature[] = [
  // ─── LIVE FEATURES ──────────────────────────────────────────────────────────
  {
    id: "maths-whiteboard",
    title: "Whiteboard with compass, protractor, ruler and set-square",
    description:
      "Interactive digital geometry instruments on the whiteboard canvas for accurate circles, angles, and geometric figures.",
    group: "whiteboard",
    status: "live",
    screenshot: "/screenshots/mathsy-meet-instruments.webp",
    screenshotAlt: "Mathsy Meet maths whiteboard with compass, protractor, ruler and set-square",
    bullets: [
      "Compass with adjustable radius for constructing accurate circles and arcs",
      "180° protractor with rotating pointer and angle degree readout",
      "Ruler with clear metric markings for drawing straight lines to scale",
      "30-60-90° and 45-45-90° set-squares for coordinate geometry and triangles",
    ],
  },
  {
    id: "screen-sharing",
    title: "Screen sharing",
    description:
      "Share your full screen, an application window, or a browser tab with students in one click.",
    group: "classroom",
    status: "live",
    screenshot: "/screenshots/mathsy-meet-desktop.webp",
    screenshotAlt: "Mathsy Meet screen sharing and live classroom view",
    bullets: [
      "Share your entire screen, a single window, or a browser tab",
      "Both tutors and students can share when requested",
      "Full audio pass-through for online video and interactive applets",
    ],
  },
  {
    id: "live-polls",
    title: "Live polls (up to 6 options) with live results",
    description:
      "Run multiple-choice polls during live class and view real-time student response tallies as answers arrive.",
    group: "interaction",
    status: "live",
    screenshot: "/screenshots/mathsy-meet-polls.webp",
    screenshotAlt: "Mathsy Meet live poll creation and real-time response results",
    bullets: [
      "Create polls instantly with 2 to 6 custom answer options",
      "Real-time live vote counts and percentage tallies as students respond",
      "Instant answer reveal to show correct choices and review concepts together",
    ],
  },
  {
    id: "video-classes",
    title: "Video classes on our own media server",
    description:
      "WebRTC video routing powered by our own dedicated media server for low-latency, crisp classroom video.",
    group: "classroom",
    status: "live",
    bullets: [
      "High-performance WebRTC video routing hosted on our dedicated media server",
      "Grid and spotlight views with active participant pinning",
      "Visual speaking indicator highlighting whoever is currently speaking",
      "One-click fullscreen mode for an unobstructed classroom view",
    ],
  },
  {
    id: "lobby-and-access",
    title: "Pre-join lobby and shareable class link",
    description:
      "Students join directly from a shared browser link with camera/mic check in the pre-join lobby.",
    group: "classroom",
    status: "live",
    bullets: [
      "Shareable class link: students join in their browser without installing extra software",
      "Pre-join lobby with live microphone and camera check before joining",
      "Clear tutor and student role selection upon entering the session",
      "Google sign-in for quick, secure account access",
    ],
  },
  {
    id: "chat-and-reactions",
    title: "Chat with a pinned message, raise hand and emoji reactions",
    description:
      "Keep sessions interactive with in-class text chat, announcements, structured questions, and emojis.",
    group: "interaction",
    status: "live",
    bullets: [
      "Classroom text chat with pinned message support for links and notices",
      "Structured raise-hand queue so tutors can answer questions one by one",
      "Real-time emoji reactions for rapid understanding checks without unmuting",
    ],
  },
  {
    id: "recording-and-streaming",
    title: "Local HD recording download and YouTube Live streaming",
    description:
      "Save high-definition class recordings to your computer or broadcast lectures live to YouTube.",
    group: "recording",
    status: "live",
    bullets: [
      "Local HD recording download saved directly to your computer after class",
      "Stream live classes directly to YouTube for public, private, or unlisted lectures",
      "Zero server storage dependencies for your class video files",
    ],
  },
  {
    id: "grid-spotlight",
    title: "Grid & spotlight views with pinning",
    description: "Switch between student gallery and tutor spotlight with manual video pinning.",
    group: "classroom",
    status: "live",
  },
  {
    id: "speaking-indicator",
    title: "Speaking indicator",
    description: "Visual ring indicating who is speaking in real time.",
    group: "classroom",
    status: "live",
  },
  {
    id: "fullscreen",
    title: "Fullscreen",
    description: "Immersive fullscreen classroom display.",
    group: "classroom",
    status: "live",
  },
  {
    id: "google-signin",
    title: "Google sign-in",
    description: "Single-click authentication with Google.",
    group: "classroom",
    status: "live",
  },
  {
    id: "shareable-link",
    title: "Shareable class link",
    description: "Direct room URLs for students to join from any modern web browser.",
    group: "classroom",
    status: "live",
  },
  {
    id: "emoji-reactions",
    title: "Emoji reactions",
    description: "Instant in-class emoji responses.",
    group: "interaction",
    status: "live",
  },
  {
    id: "raise-hand",
    title: "Raise hand",
    description: "Student raise hand queue with tutor notification.",
    group: "interaction",
    status: "live",
  },

  // ─── COMING SOON FEATURES ───────────────────────────────────────────────────
  {
    id: "shared-whiteboard",
    title: "Whiteboard shared live with students",
    description: "Multi-user collaborative whiteboard canvas for interactive student problem solving.",
    group: "whiteboard",
    status: "coming-soon",
  },
  {
    id: "tutor-mute-controls",
    title: "Tutor mute all / mute one",
    description: "One-click classroom audio management to mute individual students or all participants.",
    group: "moderation",
    status: "coming-soon",
  },
  {
    id: "remove-student",
    title: "Remove a student",
    description: "Tutor moderation controls to eject participants from the live session.",
    group: "moderation",
    status: "coming-soon",
  },
  {
    id: "lower-all-hands",
    title: "Lower all hands",
    description: "Clear the entire student hand-raise queue in a single click.",
    group: "moderation",
    status: "coming-soon",
  },
  {
    id: "lock-chat",
    title: "Lock chat",
    description: "Temporarily pause text chat during focused lectures or problem solving.",
    group: "moderation",
    status: "coming-soon",
  },
  {
    id: "whiteboard-pdf-notes",
    title: "Whiteboard notes as PDF",
    description: "Export full whiteboard drawings and geometric figures as a post-class PDF.",
    group: "whiteboard",
    status: "coming-soon",
  },
  {
    id: "tablet-as-pen",
    title: "Tablet as a pen",
    description: "Use an iPad or graphics tablet as an echo-free stylus drawing companion.",
    group: "whiteboard",
    status: "coming-soon",
  },
  {
    id: "camera-rules-approval",
    title: "Camera rules with approval",
    description: "Enforce student camera presence rules with tutor approval workflows.",
    group: "moderation",
    status: "coming-soon",
  },
];

export const LIVE_MEET_FEATURES = MEET_FEATURES.filter((f) => f.status === "live");
export const COMING_SOON_MEET_FEATURES = MEET_FEATURES.filter((f) => f.status === "coming-soon");

// ─── COMPARISON TABLE DEFINITIONS ───────────────────────────────────────────
export interface MeetComparisonRow {
  feature: string;
  googleMeet: string;
  zoom: string;
  mathsyMeet: string;
  featureId?: string; // If tied to a feature in MEET_FEATURES, only shown when status is "live"
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
    featureId: "shareable-link",
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
    mathsyMeet: "Built-in, with maths instruments",
    featureId: "maths-whiteboard",
  },
  {
    feature: "Compass, protractor, ruler, set-squares",
    googleMeet: "No",
    zoom: "No",
    mathsyMeet: "Yes",
    featureId: "maths-whiteboard",
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
    featureId: "recording-and-streaming",
  },
  // Dynamic rows tied to coming-soon features (will show automatically when status becomes "live"):
  {
    feature: "Second device without echo",
    googleMeet: "Yes (Companion Mode)",
    zoom: "Possible",
    mathsyMeet: "Yes — your tablet writes on the board like a pen",
    featureId: "tablet-as-pen",
  },
  {
    feature: "Whiteboard notes as PDF",
    googleMeet: "No built-in whiteboard",
    zoom: "Manual export",
    mathsyMeet: "Downloadable PDF export",
    featureId: "whiteboard-pdf-notes",
  },
  {
    feature: "Price",
    googleMeet: "Free plan with limits; paid plans",
    zoom: "Free plan with limits; paid plans",
    mathsyMeet: "Flat ₹999/month per tutor",
  },
];

/**
 * Returns comparison rows where Mathsy Meet's answer is live today.
 * Rows associated with a featureId only appear when that feature's status is "live".
 */
export function getActiveComparisonRows(): MeetComparisonRow[] {
  return MEET_COMPARISON_BASE_ROWS.filter((row) => {
    if (!row.featureId) return true;
    const feat = MEET_FEATURES.find((f) => f.id === row.featureId);
    return feat ? feat.status === "live" : true;
  });
}
