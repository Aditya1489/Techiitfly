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

export interface MeetHotspot {
  x: number; // percentage of image width
  y: number; // percentage of image height
  label: string;
}

export interface MeetScreenshot {
  src: string;
  thumb: string;
  mobile?: string;
  alt: string;
  caption: string;
  hotspots?: MeetHotspot[];
}

export interface MeetFeature {
  id: string;
  title: string;
  description: string;
  group: FeatureGroup;
  status: MeetFeatureStatus;
  plans: MeetPlanTier[];
  note?: string;
  screenshots?: MeetScreenshot[];
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
    screenshots: [
      {
        src: "/screenshots/meet/lobby-v2.webp",
        thumb: "/screenshots/meet/lobby-v2-thumb.webp",
        mobile: "/screenshots/meet/lobby-mobile-v2.webp",
        alt: "Mathsy Meet pre-join lobby with role selection and audio-video testing",
        caption: "Students join immediately in their browser without downloading any apps.",
        hotspots: [
          { x: 62, y: 35, label: "Role selector (Tutor vs Student)" },
          { x: 62, y: 55, label: "Custom display name input" },
          { x: 28, y: 50, label: "Live camera & microphone test" },
        ],
      },
    ],
  },
  {
    id: "shareable-class-link",
    title: "Shareable class link",
    description: "Copy and share the class link in one click.",
    group: "Joining & access",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/share-link-v2.webp",
        thumb: "/screenshots/meet/share-link-v2-thumb.webp",
        alt: "Mathsy Meet shareable class link modal",
        caption: "One-click copyable invite link for your students.",
        hotspots: [{ x: 88, y: 16, label: "Copy meeting link" }],
      },
    ],
  },
  {
    id: "prejoin-lobby",
    title: "Pre-join lobby",
    description: "Test camera and microphone (with a volume meter) before joining.",
    group: "Joining & access",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/lobby-v2.webp",
        thumb: "/screenshots/meet/lobby-v2-thumb.webp",
        mobile: "/screenshots/meet/lobby-mobile-v2.webp",
        alt: "Mathsy Meet pre-join lobby check-in",
        caption: "Verify your microphone volume and camera before class starts.",
        hotspots: [
          { x: 28, y: 50, label: "Camera preview & mic monitor" },
          { x: 62, y: 70, label: "1-Click host meeting button" },
        ],
      },
    ],
  },
  {
    id: "display-name-role",
    title: "Display name & role",
    description: "Choose a name and join as tutor or student.",
    group: "Joining & access",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/lobby-v2.webp",
        thumb: "/screenshots/meet/lobby-v2-thumb.webp",
        alt: "Display name and role selection screen",
        caption: "Educator and student roles configured at check-in.",
        hotspots: [{ x: 62, y: 35, label: "Tutor vs Student role selection" }],
      },
    ],
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
    screenshots: [
      {
        src: "/screenshots/meet/grid-view-v2.webp",
        thumb: "/screenshots/meet/grid-view-v2-thumb.webp",
        alt: "Mathsy Meet dedicated media server video tiles",
        caption: "High-definition video and audio routed through dedicated Mediasoup SFU.",
        hotspots: [{ x: 50, y: 50, label: "High-definition video tile" }],
      },
    ],
  },
  {
    id: "grid-view",
    title: "Grid view",
    description: "See the whole class at once.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/grid-view-v2.webp",
        thumb: "/screenshots/meet/grid-view-v2-thumb.webp",
        alt: "Mathsy Meet responsive classroom grid view",
        caption: "See every participant simultaneously with adaptive layout sizing.",
        hotspots: [{ x: 50, y: 50, label: "Responsive video tile grid" }],
      },
    ],
  },
  {
    id: "spotlight-view",
    title: "Spotlight view",
    description: "Focus on one speaker.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/spotlight-pin-v2.webp",
        thumb: "/screenshots/meet/spotlight-pin-v2-thumb.webp",
        alt: "Mathsy Meet spotlight view",
        caption: "Pin the active tutor or student presentation in primary focus.",
        hotspots: [{ x: 45, y: 50, label: "Featured spotlight speaker" }],
      },
    ],
  },
  {
    id: "pin-participant",
    title: "Pin a participant",
    description: "Keep one person's video in focus.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/spotlight-pin-v2.webp",
        thumb: "/screenshots/meet/spotlight-pin-v2-thumb.webp",
        alt: "Mathsy Meet participant pinning",
        caption: "Lock any video tile to prevent camera switching.",
        hotspots: [{ x: 45, y: 50, label: "Pinned video tile" }],
      },
    ],
  },
  {
    id: "speaking-indicator",
    title: "Speaking indicator",
    description: "See who is talking.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/speaking-indicator-v2.webp",
        thumb: "/screenshots/meet/speaking-indicator-v2-thumb.webp",
        alt: "Mathsy Meet audio visualizer speaking indicator",
        caption: "Visual 3-bar audio wave indicator shows who is actively speaking.",
        hotspots: [{ x: 10, y: 93, label: "Google Meet-style audio meter" }],
      },
    ],
  },
  {
    id: "screen-sharing",
    title: "Screen sharing",
    description: "Share your screen, a window or a browser tab (tutors and students).",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/screen-share-v2.webp",
        thumb: "/screenshots/meet/screen-share-v2-thumb.webp",
        alt: "Mathsy Meet screen sharing geometry problem",
        caption: "Crisp tab and window sharing for complex math problem walkthroughs.",
        hotspots: [{ x: 50, y: 50, label: "Shared maths worksheet" }],
      },
    ],
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
    screenshots: [
      {
        src: "/screenshots/meet/class-timer-v2.webp",
        thumb: "/screenshots/meet/class-timer-v2-thumb.webp",
        alt: "Mathsy Meet elapsed class duration timer in header",
        caption: "Always-visible duration counter keeps sessions on schedule.",
        hotspots: [{ x: 50, y: 50, label: "Elapsed time counter" }],
      },
    ],
  },
  {
    id: "meeting-details-panel",
    title: "Meeting details panel",
    description: "Class link and joining info in one place.",
    group: "Live class",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/share-link-v2.webp",
        thumb: "/screenshots/meet/share-link-v2-thumb.webp",
        alt: "Meeting details and invite modal",
        caption: "Room ID and student invite links ready to copy.",
        hotspots: [{ x: 88, y: 16, label: "Meeting link details" }],
      },
    ],
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
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/whiteboard-tools-v2.webp",
        thumb: "/screenshots/meet/whiteboard-tools-v2-thumb.webp",
        alt: "Mathsy Meet infinite whiteboard canvas with geometry pen tools",
        caption: "Infinite collaborative whiteboard designed for STEM problem solving.",
        hotspots: [
          { x: 48, y: 92, label: "Drawing tools & geometric styles" },
          { x: 93, y: 3, label: "Geometry instruments toolbar" },
        ],
      },
    ],
  },
  {
    id: "compass",
    title: "Compass",
    description: "Adjustable radius; draw circles and arcs; snap to 0°, 45°, 90° and 180°.",
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/compass-v2.webp",
        thumb: "/screenshots/meet/compass-v2-thumb.webp",
        alt: "Mathsy Meet compass tool drawing a circle with an adjustable radius",
        caption: "Physical-accuracy compass for constructing circles and arcs with degree snapping.",
        hotspots: [
          { x: 52, y: 48, label: "Compass pivot & pencil radius control" },
          { x: 65, y: 48, label: "Live angle degree readout" },
        ],
      },
    ],
  },
  {
    id: "protractor",
    title: "Protractor",
    description: "180° protractor with a rotating pointer.",
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/protractor-v2.webp",
        thumb: "/screenshots/meet/protractor-v2-thumb.webp",
        alt: "Mathsy Meet 180-degree protractor with rotating angle pointer",
        caption: "Measure and draw angles with a full 180° protractor and degree indicator.",
        hotspots: [
          { x: 50, y: 52, label: "Rotating angle pointer" },
          { x: 50, y: 70, label: "Precision degree tick marks" },
        ],
      },
    ],
  },
  {
    id: "ruler",
    title: "Ruler",
    description: "Straight edge with centimetre markings.",
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/ruler-v2.webp",
        thumb: "/screenshots/meet/ruler-v2-thumb.webp",
        alt: "Mathsy Meet metric ruler on whiteboard",
        caption: "Metric ruler with millimeter ticks for scale drawings.",
        hotspots: [{ x: 50, y: 50, label: "Metric centimeter scale" }],
      },
    ],
  },
  {
    id: "set-squares",
    title: "Set-squares",
    description: "30-60-90° and 45-45-90° triangles.",
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/set-squares-v2.webp",
        thumb: "/screenshots/meet/set-squares-v2-thumb.webp",
        alt: "Mathsy Meet set-squares on whiteboard canvas",
        caption: "Standard drafting set-squares for coordinate geometry and triangle proofs.",
        hotspots: [{ x: 45, y: 45, label: "30-60-90° & 45-45-90° set-squares" }],
      },
    ],
  },
  {
    id: "clear-board",
    title: "Clear board",
    description: "Wipe the board in one click.",
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
  },
  {
    id: "tablet-as-pen",
    title: "Tablet as a pen",
    description: "Pair a tablet with a code and write on the board.",
    group: "Maths whiteboard",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/tablet-pairing-v2.webp",
        thumb: "/screenshots/meet/tablet-pairing-v2-thumb.webp",
        alt: "Mathsy Meet tablet companion pairing code dialog",
        caption: "Connect your iPad or drawing tablet with a 9-digit code as a dedicated stylus pen.",
        hotspots: [
          { x: 50, y: 42, label: "9-Digit pairing code" },
          { x: 50, y: 62, label: "Connect stylus companion" },
        ],
      },
    ],
  },

  // Engagement
  {
    id: "chat",
    title: "Chat",
    description: "Message everyone in the class.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/chat-pinned-v2.webp",
        thumb: "/screenshots/meet/chat-pinned-v2-thumb.webp",
        alt: "Mathsy Meet interactive class feed chat",
        caption: "Dedicated classroom chat feed for links and discussions.",
        hotspots: [{ x: 88, y: 94, label: "Classroom chat input" }],
      },
    ],
  },
  {
    id: "pinned-message",
    title: "Pinned message",
    description: "Pin a notice, link or formula for everyone.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/chat-pinned-v2.webp",
        thumb: "/screenshots/meet/chat-pinned-v2-thumb.webp",
        alt: "Mathsy Meet pinned homework announcement banner",
        caption: "Pin key formulas, homework questions or reference links at the top of the chat.",
        hotspots: [{ x: 88, y: 15, label: "Pinned homework announcement" }],
      },
    ],
  },
  {
    id: "raise-hand",
    title: "Raise hand",
    description: "Students raise a hand; it shows on their video tile.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/raise-hand-v2.webp",
        thumb: "/screenshots/meet/raise-hand-v2-thumb.webp",
        alt: "Mathsy Meet student raised hand indicator",
        caption: "Students can raise hands to ask questions; host receives instant visual notification.",
        hotspots: [{ x: 50, y: 50, label: "Hand raised badge" }],
      },
    ],
  },
  {
    id: "emoji-reactions",
    title: "Emoji reactions",
    description: "Floating reactions without interrupting the class.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/reactions-v2.webp",
        thumb: "/screenshots/meet/reactions-v2-thumb.webp",
        alt: "Mathsy Meet floating emoji reaction animations",
        caption: "Lightweight floating emoji reactions give real-time feedback without mic noise.",
        hotspots: [{ x: 50, y: 70, label: "Floating reaction animation" }],
      },
    ],
  },
  {
    id: "live-polls",
    title: "Live polls",
    description: "2 to 6 options, created in seconds during class.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/poll-create-v2.webp",
        thumb: "/screenshots/meet/poll-create-v2-thumb.webp",
        alt: "Mathsy Meet live poll creation form",
        caption: "Create custom multiple-choice polls in seconds during live class.",
        hotspots: [
          { x: 88, y: 22, label: "Poll question input" },
          { x: 88, y: 38, label: "Poll type selector" },
        ],
      },
    ],
  },
  {
    id: "more-poll-types",
    title: "More poll types: single choice & multi-correct",
    description: "Single choice, multi-correct (true/false works as a 2-option poll).",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/poll-multi-correct-v2.webp",
        thumb: "/screenshots/meet/poll-multi-correct-v2-thumb.webp",
        alt: "Mathsy Meet multi-correct poll creation form",
        caption: "Support for single choice and multi-correct question structures.",
        hotspots: [{ x: 88, y: 38, label: "Multi-choice poll toggle" }],
      },
    ],
  },
  {
    id: "poll-timers",
    title: "Poll timers",
    description: "Set a countdown for answers.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/poll-timer-v2.webp",
        thumb: "/screenshots/meet/poll-timer-v2-thumb.webp",
        alt: "Mathsy Meet poll timer and active question countdown",
        caption: "Timed polls add urgency and keep class pacing prompt.",
        hotspots: [{ x: 88, y: 18, label: "Countdown timer limit" }],
      },
    ],
  },
  {
    id: "live-poll-results",
    title: "Live poll results",
    description: "Votes and percentages update as students answer.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/poll-results-v2.webp",
        thumb: "/screenshots/meet/poll-results-v2-thumb.webp",
        alt: "Mathsy Meet live poll results and percentage bars",
        caption: "Live tally progress bars update dynamically with each student submission.",
        hotspots: [{ x: 88, y: 35, label: "Real-time percentage bars" }],
      },
    ],
  },
  {
    id: "poll-leaderboard",
    title: "Poll leaderboard",
    description: "Mark the correct answer and show the top students.",
    group: "Engagement",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/poll-leaderboard-v2.webp",
        thumb: "/screenshots/meet/poll-leaderboard-v2-thumb.webp",
        alt: "Mathsy Meet poll leaderboard with top students",
        caption: "Reveal correct answers and celebrate top student responders.",
        hotspots: [{ x: 88, y: 80, label: "Live leaderboard rankings" }],
      },
    ],
  },

  // Classroom controls
  {
    id: "mute-all-one",
    title: "Mute all / mute one student",
    description: "Tutor audio control over participant microphones.",
    group: "Classroom controls",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/mute-all-v2.webp",
        thumb: "/screenshots/meet/mute-all-v2-thumb.webp",
        alt: "Mathsy Meet mute all students control in user list",
        caption: "One-click 'Mute All' eliminates background noise instantly.",
        hotspots: [{ x: 88, y: 12, label: "Mute all student microphones" }],
      },
    ],
  },
  {
    id: "remove-student",
    title: "Remove a student from class",
    description: "Remove a disruptive participant from the live session.",
    group: "Classroom controls",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/tutor-controls-v2.webp",
        thumb: "/screenshots/meet/tutor-controls-v2-thumb.webp",
        alt: "Mathsy Meet expel student moderation button",
        caption: "Host moderation lets tutors remove disruptive participants.",
        hotspots: [{ x: 88, y: 38, label: "Expel participant option" }],
      },
    ],
  },
  {
    id: "lower-all-hands",
    title: "Lower all hands / lower one hand",
    description: "Clear raised hands with one click.",
    group: "Classroom controls",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/tutor-controls-v2.webp",
        thumb: "/screenshots/meet/tutor-controls-v2-thumb.webp",
        alt: "Mathsy Meet lower all hands control",
        caption: "Reset all raised hands once questions have been answered.",
        hotspots: [{ x: 88, y: 12, label: "Lower all hands button" }],
      },
    ],
  },
  {
    id: "lock-chat",
    title: "Lock chat for students",
    description: "Pause text chat to keep student attention on class.",
    group: "Classroom controls",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/chat-locked-v2.webp",
        thumb: "/screenshots/meet/chat-locked-v2-thumb.webp",
        alt: "Mathsy Meet chat locked for students banner",
        caption: "Lock chat during lectures so students focus on the board.",
        hotspots: [{ x: 88, y: 94, label: "Chat locked banner" }],
      },
    ],
  },
  {
    id: "camera-rules",
    title: "Camera rules",
    description: "Ask students to keep cameras on; students can request approval if their camera doesn't work.",
    group: "Classroom controls",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/camera-rules-v2.webp",
        thumb: "/screenshots/meet/camera-rules-v2-thumb.webp",
        alt: "Mathsy Meet camera required policy and exemption workflow",
        caption: "Enforce camera-on attendance discipline with host exemption requests.",
        hotspots: [
          { x: 50, y: 42, label: "Camera required policy banner" },
          { x: 50, y: 82, label: "Request camera-off exemption" },
        ],
      },
    ],
  },

  // Recording & streaming
  {
    id: "local-hd-recording",
    title: "Local HD recording",
    description: "Record the class and download it to your computer.",
    group: "Recording & streaming",
    status: "available",
    plans: ALL_PLANS,
    screenshots: [
      {
        src: "/screenshots/meet/local-recording-v2.webp",
        thumb: "/screenshots/meet/local-recording-v2-thumb.webp",
        alt: "Mathsy Meet local HD recording download panel",
        caption: "Download crystal-clear class recordings directly to your computer.",
        hotspots: [{ x: 50, y: 40, label: "Local HD recording controls" }],
      },
    ],
  },
  {
    id: "youtube-live",
    title: "YouTube Live",
    description:
      "Connect your channel once and stream classes live; auto-detect and share the watch link; optional auto-start.",
    group: "Recording & streaming",
    status: "available",
    plans: PRO_ACADEMY,
    screenshots: [
      {
        src: "/screenshots/meet/youtube-live-v2.webp",
        thumb: "/screenshots/meet/youtube-live-v2-thumb.webp",
        alt: "Mathsy Meet YouTube Live connection modal",
        caption: "Broadcast live lessons to YouTube Live with 1 click.",
        hotspots: [{ x: 50, y: 48, label: "YouTube Live stream key setup" }],
      },
    ],
  },

  // ─── COMING SOON ─────────────────────────────────────────────────────────────
  {
    id: "live-whiteboard-students",
    title: "Live whiteboard for students",
    description: "Students see the tutor's board in real time, no screen sharing needed.",
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
    id: "whiteboard-pdf-notes",
    title: "Whiteboard notes as PDF after class",
    description: "Download the board pages and geometry drawings as a PDF.",
    group: "Maths whiteboard",
    status: "coming-soon",
    plans: ALL_PLANS,
  },
  {
    id: "poll-written-answers",
    title: "Written poll answers",
    description: "Short written and numeric text answers from students in polls.",
    group: "Engagement",
    status: "coming-soon",
    plans: ALL_PLANS,
  },

  // ─── ON THE ROADMAP ─────────────────────────────────────────────────────────
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
          title: "Turn a question on a slide into a poll (AI)",
          description: "Detect question text on imported slides and launch instant live polls.",
          group: "Engagement" as FeatureGroup,
          status: "roadmap" as MeetFeatureStatus,
          plans: PRO_ACADEMY,
        },
        {
          id: "ai-practice-questions",
          title: "Generate practice questions from the class topic (AI)",
          description: "Generate similar practice problems with step-by-step solutions.",
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
    mathsyMeet: "Built-in live board with maths instruments",
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
    feature: "Write with a tablet as a pen",
    googleMeet: "Second device via Companion Mode",
    zoom: "Possible",
    mathsyMeet: "Yes — pair with a code",
    featureId: "tablet-as-pen",
  },
  {
    feature: "Whiteboard notes after class",
    googleMeet: "No built-in whiteboard",
    zoom: "Manual export",
    mathsyMeet: "Download as PDF",
    featureId: "whiteboard-pdf-notes",
  },
  {
    feature: "Live polls",
    googleMeet: "Depends on plan",
    zoom: "Yes",
    mathsyMeet: "Single choice, multi-correct and written answers, with timers and a leaderboard",
    featureId: "live-polls",
  },
  {
    feature: "Tutor controls (mute all, remove, lock chat)",
    googleMeet: "Yes",
    zoom: "Yes",
    mathsyMeet: "Yes",
    featureId: "mute-all-one",
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
  return MEET_COMPARISON_BASE_ROWS;
}
