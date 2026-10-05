export interface ReceiptsSite {
  id: string;
  name: string;
  url: string;
  category: "EdTech" | "Wellness";
  stack: string[];
}

export const RECEIPTS_SITES: ReceiptsSite[] = [
  {
    id: "mathsy",
    name: "Mathsy",
    url: "https://www.mathsy.in",
    category: "EdTech",
    stack: ["React 18", "TypeScript", "Vite", "Supabase"],
  },
  {
    id: "yogagarhi",
    name: "YogaGarhi",
    url: "https://www.yogagarhi.com",
    category: "Wellness",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "yogicpath",
    name: "Yogic Path",
    url: "https://yogicpathytt.com",
    category: "Wellness",
    stack: ["WordPress", "WPForms", "custom theme/CSS"],
  },
];
