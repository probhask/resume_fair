import { v4 as uuidV4 } from "uuid";

import {
  DEFAULT_SECTION_ORDER,
  DEFAULT_SETTINGS,
  Resume,
  ResumeSectionKey,
  SCHEMA_VERSION,
} from "../types/resume";

export const LEGACY_KEY = "resume-builder";

const asArray = <T,>(value: unknown): T[] =>
  Array.isArray(value) ? (value as T[]) : [];

const asString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

/** Fill an arbitrary object with every field a valid `Resume` requires. */
export const normalizeResume = (raw: unknown, name = "My Resume"): Resume => {
  const src = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;

  const sectionOrder = asArray<ResumeSectionKey>(src.sectionOrder).filter((k) =>
    DEFAULT_SECTION_ORDER.includes(k)
  );

  return {
    id: asString(src.id) || uuidV4(),
    name: asString(src.name, name) || name,
    updatedAt: typeof src.updatedAt === "number" ? src.updatedAt : Date.now(),
    schemaVersion: SCHEMA_VERSION,
    templateId: asString(src.templateId, "1") || "1",
    settings: { ...DEFAULT_SETTINGS, ...(src.settings as object) },
    sectionOrder: sectionOrder.length ? sectionOrder : [...DEFAULT_SECTION_ORDER],
    hiddenSections: asArray<ResumeSectionKey>(src.hiddenSections),
    sectionTitles:
      src.sectionTitles && typeof src.sectionTitles === "object"
        ? (src.sectionTitles as Record<string, string>)
        : {},
    customSections: asArray(src.customSections),

    personalDetails: asArray<PersonalDetailFields>(src.personalDetails),
    fields_personalDetails: src.fields_personalDetails
      ? asArray<FormInputType>(src.fields_personalDetails)
      : undefined,
    otherFields_personalDetails: src.otherFields_personalDetails
      ? asArray<OtherFormInputType>(src.otherFields_personalDetails)
      : undefined,
    objective: asArray<ObjectiveFields>(src.objective),
    experience: asArray<ExperienceFields>(src.experience),
    education: asArray<EducationFields>(src.education),
    skills: asArray<SkillsFields>(src.skills),
    projects: asArray<ProjectsFields>(src.projects),
    languages: asArray<LanguagesFields>(src.languages),
    references: asArray<ReferencesFields>(src.references),
  };
};

/**
 * Read the pre-Phase-1 single localStorage blob (`resume-builder`) and turn it
 * into a `Resume`. Returns null if nothing usable is stored.
 */
export const migrateLegacyBlob = (): Resume | null => {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(LEGACY_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;

  const obj = parsed as Record<string, unknown>;
  const hasContent = Object.values(obj).some(
    (v) => Array.isArray(v) && v.length > 0
  );
  if (!hasContent) return null;

  return normalizeResume(obj, "My Resume");
};
