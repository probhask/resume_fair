/**
 * Pure font-name resolution — no asset imports, safe to use anywhere.
 * The actual `Font.register` calls (which pull in .ttf assets) live in
 * `registerAppFonts.ts` and are triggered from `ResumePDF.tsx`.
 */
export type FontKey = "sans" | "serif" | "slab";

export const FONT_FAMILY: Record<FontKey, string> = {
  sans: "Inter",
  serif: "Source Serif 4",
  slab: "Roboto Slab",
};

/** Built-in react-pdf fallbacks if registration ever fails. */
export const FONT_FALLBACK: Record<FontKey, string> = {
  sans: "Helvetica",
  serif: "Times-Roman",
  slab: "Times-Roman",
};

export const resolveFamily = (key: FontKey): string =>
  FONT_FAMILY[key] ?? FONT_FALLBACK[key] ?? "Helvetica";
