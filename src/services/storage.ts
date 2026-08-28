import { v4 as uuidV4 } from "uuid";

import { DefaultResumeData } from "../constants/DefaultResumeData";
import {
  Resume,
  ResumeIndex,
  ResumeMeta,
} from "../types/resume";
import { migrateLegacyBlob, normalizeResume } from "./migrate";

const INDEX_KEY = "resumefair:index";
const resumeKey = (id: string) => `resumefair:resume:${id}`;

const emptyIndex = (): ResumeIndex => ({ activeId: null, resumes: [] });

const readJSON = <T,>(key: string, fallback: T): T => {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    return fallback;
  }
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJSON = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // Quota exceeded / private mode — surface, don't crash the app.
    console.error(`resumefair: failed to persist "${key}"`, err);
  }
};

export const loadIndex = (): ResumeIndex => readJSON(INDEX_KEY, emptyIndex());

export const saveIndex = (index: ResumeIndex): void =>
  writeJSON(INDEX_KEY, index);

export const loadResume = (id: string): Resume | null => {
  const raw = readJSON<Record<string, unknown> | null>(resumeKey(id), null);
  return raw ? normalizeResume(raw) : null;
};

const upsertMeta = (index: ResumeIndex, resume: Resume): ResumeIndex => {
  const meta: ResumeMeta = {
    id: resume.id,
    name: resume.name,
    updatedAt: resume.updatedAt,
  };
  const resumes = index.resumes.some((r) => r.id === resume.id)
    ? index.resumes.map((r) => (r.id === resume.id ? meta : r))
    : [...index.resumes, meta];
  return { ...index, resumes };
};

export const saveResume = (resume: Resume): Resume => {
  const stamped: Resume = { ...resume, updatedAt: Date.now() };
  writeJSON(resumeKey(stamped.id), stamped);
  saveIndex(upsertMeta(loadIndex(), stamped));
  return stamped;
};

export const createResume = (
  name = "Untitled Resume",
  seed?: Partial<Resume>
): Resume => {
  const resume = normalizeResume({ ...seed, id: uuidV4(), name }, name);
  const saved = saveResume(resume);
  const index = loadIndex();
  saveIndex({ ...loadIndex(), activeId: index.activeId ?? saved.id });
  return saved;
};

export const duplicateResume = (id: string): Resume | null => {
  const source = loadResume(id);
  if (!source) return null;
  return createResume(`${source.name} (copy)`, {
    ...source,
    id: undefined,
    name: `${source.name} (copy)`,
  });
};

export const renameResume = (id: string, name: string): void => {
  const resume = loadResume(id);
  if (!resume) return;
  saveResume({ ...resume, name });
};

export const deleteResume = (id: string): ResumeIndex => {
  try {
    localStorage.removeItem(resumeKey(id));
  } catch {
    /* ignore */
  }
  const index = loadIndex();
  const resumes = index.resumes.filter((r) => r.id !== id);
  const activeId =
    index.activeId === id ? resumes[0]?.id ?? null : index.activeId;
  const next = { activeId, resumes };
  saveIndex(next);
  return next;
};

export const setActiveResume = (id: string): void => {
  saveIndex({ ...loadIndex(), activeId: id });
};

/**
 * Guarantees a usable active resume exists and returns it. On first run this
 * migrates the legacy `resume-builder` blob, or seeds the sample resume.
 */
export const getOrInitActiveResume = (): Resume => {
  const index = loadIndex();

  if (index.activeId) {
    const active = loadResume(index.activeId);
    if (active) return active;
  }
  if (index.resumes.length) {
    const first = loadResume(index.resumes[0].id);
    if (first) {
      setActiveResume(first.id);
      return first;
    }
  }

  const legacy = migrateLegacyBlob();
  const resume = createResume(
    legacy ? "My Resume" : "Sample Resume",
    legacy ?? { ...(DefaultResumeData as Partial<Resume>), name: "Sample Resume" }
  );
  setActiveResume(resume.id);
  return resume;
};

export const exportResume = (id: string): string | null => {
  const resume = loadResume(id);
  return resume ? JSON.stringify(resume, null, 2) : null;
};

export const importResume = (json: string): Resume => {
  const parsed = JSON.parse(json) as Record<string, unknown>;
  const name =
    typeof parsed.name === "string" && parsed.name.trim()
      ? `${parsed.name} (imported)`
      : "Imported Resume";
  return createResume(name, { ...parsed, id: undefined, name });
};
