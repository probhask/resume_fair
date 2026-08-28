/**
 * Resume document schema (Phase 1 foundation).
 *
 * The legacy per-section types (`PersonalDetailFields`, `EducationFields`, ...) are
 * still declared as ambient globals in `src/types/index.d.ts`. This module wraps
 * them into a single serialisable `Resume` document plus the multi-resume index
 * that the storage service and the Zustand store operate on.
 */

export const SCHEMA_VERSION = 1;

/** Keys of the repeatable / single content sections that live on a Resume. */
export type ResumeSectionKey =
  | "personalDetails"
  | "objective"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "languages"
  | "references";

/** Default render order used when a resume does not specify one. */
export const DEFAULT_SECTION_ORDER: ResumeSectionKey[] = [
  "personalDetails",
  "objective",
  "experience",
  "education",
  "skills",
  "projects",
  "languages",
  "references",
];

export type HeadingStyle = "bar" | "underline" | "plain" | "caps";

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

export type FontKey = "sans" | "serif" | "slab";

export type TemplateLayout = "single" | "two-column" | "sidebar" | "header-band";

export type TemplateHeadingStyle =
  | "rule" // full-width bottom border
  | "accent-underline" // short accent bar under the title
  | "smallcaps-center" // centered, letter-spaced, hairline rules
  | "band" // reversed-out bar
  | "plain-caps"; // uppercase, letter-spaced, no rule

export interface TemplateSidebar {
  widthPct: number;
  bg: string;
  text: string;
  /** section keys routed into the narrow column */
  sections: ResumeSectionKey[];
}

export interface Template {
  id: string;
  name: string;
  blurb: string;
  layout: TemplateLayout;
  fontPair: { heading: FontKey; body: FontKey };
  /** default accent; overridable via `ResumeSettings.accentColor` */
  accent: string;
  headingStyle: TemplateHeadingStyle;
  dateAlign: "right" | "inline";
  density: "comfortable" | "compact";
  showPhoto: boolean;
  sidebar?: TemplateSidebar;
}

export interface ResumeSettings {
  fontFamily: string;
  fontSize: number;
  pageMargin: number;
  accentColor: string;
  lineHeight: number;
  headingStyle: HeadingStyle;
}

export const DEFAULT_SETTINGS: ResumeSettings = {
  fontFamily: "Helvetica",
  fontSize: 10,
  pageMargin: 14,
  accentColor: "#404040",
  lineHeight: 1.4,
  headingStyle: "bar",
};

export interface CustomSectionItem {
  id: string;
  heading?: string;
  subheading?: string;
  date?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

/**
 * A single resume document. Section payloads reuse the ambient field types so
 * existing form code keeps compiling.
 */
export interface Resume {
  id: string;
  name: string;
  /** epoch millis of last write */
  updatedAt: number;
  schemaVersion: number;
  templateId: string;
  settings: ResumeSettings;
  sectionOrder: ResumeSectionKey[];
  hiddenSections: ResumeSectionKey[];
  /** per-section heading overrides, keyed by section key or custom-section id */
  sectionTitles: Record<string, string>;
  customSections: CustomSection[];

  personalDetails: PersonalDetailFields[];
  fields_personalDetails?: FormInputType[];
  otherFields_personalDetails?: OtherFormInputType[];
  objective: ObjectiveFields[];
  experience: ExperienceFields[];
  education: EducationFields[];
  skills: SkillsFields[];
  projects: ProjectsFields[];
  languages: LanguagesFields[];
  references: ReferencesFields[];
}

/** Lightweight descriptor kept in the index (no section payloads). */
export interface ResumeMeta {
  id: string;
  name: string;
  updatedAt: number;
}

export interface ResumeIndex {
  activeId: string | null;
  resumes: ResumeMeta[];
}
