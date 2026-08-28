import type { Template } from "../types/resume";

/**
 * Eight resume templates modelled on widely-recognised designs. Ids "1"–"8" are
 * stable: legacy stored `templateId` values ("1".."6") still resolve, and unknown
 * ids fall back to Classic.
 */
export const TEMPLATES: Template[] = [
  {
    id: "1",
    name: "Classic",
    blurb: "Harvard-style. Centered serif name, ruled headings, no color.",
    layout: "single",
    fontPair: { heading: "serif", body: "serif" },
    accent: "#1f2937",
    headingStyle: "rule",
    dateAlign: "right",
    density: "comfortable",
    showPhoto: false,
  },
  {
    id: "2",
    name: "Executive",
    blurb: "Full-width header band, uppercase headings. Senior / corporate.",
    layout: "header-band",
    fontPair: { heading: "sans", body: "sans" },
    accent: "#0f172a",
    headingStyle: "plain-caps",
    dateAlign: "right",
    density: "comfortable",
    showPhoto: false,
  },
  {
    id: "3",
    name: "Modern",
    blurb: "Deedy-style two-column. Skills & education beside your experience.",
    layout: "two-column",
    fontPair: { heading: "sans", body: "sans" },
    accent: "#2563eb",
    headingStyle: "plain-caps",
    dateAlign: "inline",
    density: "comfortable",
    showPhoto: false,
    sidebar: {
      widthPct: 34,
      bg: "#ffffff",
      text: "#1f2937",
      sections: ["skills", "education", "languages"],
    },
  },
  {
    id: "4",
    name: "Cascade",
    blurb: "Colored sidebar with photo, contact, skills. The designer look.",
    layout: "sidebar",
    fontPair: { heading: "sans", body: "sans" },
    accent: "#0d9488",
    headingStyle: "plain-caps",
    dateAlign: "right",
    density: "comfortable",
    showPhoto: true,
    sidebar: {
      widthPct: 35,
      bg: "#0d9488",
      text: "#ffffff",
      sections: ["skills", "languages", "education", "references"],
    },
  },
  {
    id: "5",
    name: "Minimal",
    blurb: "One typeface, lots of whitespace, no rules. ATS-friendly.",
    layout: "single",
    fontPair: { heading: "sans", body: "sans" },
    accent: "#111827",
    headingStyle: "plain-caps",
    dateAlign: "right",
    density: "comfortable",
    showPhoto: false,
  },
  {
    id: "6",
    name: "Elegant",
    blurb: "Centered small-caps headings, hairline rules, serif. Editorial.",
    layout: "single",
    fontPair: { heading: "serif", body: "serif" },
    accent: "#7c2d12",
    headingStyle: "smallcaps-center",
    dateAlign: "right",
    density: "comfortable",
    showPhoto: false,
  },
  {
    id: "7",
    name: "Awesome-CV",
    blurb: "Large accent name, short underline headings, muted dates.",
    layout: "single",
    fontPair: { heading: "slab", body: "sans" },
    accent: "#c0392b",
    headingStyle: "accent-underline",
    dateAlign: "right",
    density: "comfortable",
    showPhoto: false,
  },
  {
    id: "8",
    name: "Compact",
    blurb: "Tight margins, three-column skills. Fits a full CV on one page.",
    layout: "single",
    fontPair: { heading: "sans", body: "sans" },
    accent: "#334155",
    headingStyle: "rule",
    dateAlign: "right",
    density: "compact",
    showPhoto: false,
  },
];

export const getTemplate = (id: string | undefined): Template =>
  TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];

export const defaultTemplate = TEMPLATES[0];

export default TEMPLATES;
