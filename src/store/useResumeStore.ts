import { create } from "zustand";

import {
  CustomSection,
  Resume,
  ResumeIndex,
  ResumeSectionKey,
  ResumeSettings,
} from "../types/resume";
import {
  createResume,
  deleteResume,
  duplicateResume,
  getOrInitActiveResume,
  loadIndex,
  loadResume,
  renameResume,
  saveResume,
  setActiveResume,
} from "../services/storage";
import { v4 as uuidV4 } from "uuid";

type SaveState = "saved" | "saving";

let saveTimer: ReturnType<typeof setTimeout> | undefined;

interface ResumeStore {
  resume: Resume | null;
  index: ResumeIndex;
  saveState: SaveState;

  /** Load (or initialise) the active resume + index. Call once on app mount. */
  init: () => void;
  refreshIndex: () => void;

  /** Mutate the active resume in memory and schedule a debounced persist. */
  patch: (updater: (draft: Resume) => Resume) => void;

  updateSection: <K extends ResumeSectionKey>(
    key: K,
    value: Resume[K]
  ) => void;
  updateSettings: (partial: Partial<ResumeSettings>) => void;
  setTemplate: (templateId: string) => void;
  reorderSections: (order: ResumeSectionKey[]) => void;
  toggleSection: (key: ResumeSectionKey) => void;
  renameSectionHeading: (key: string, title: string) => void;
  addCustomSection: (title: string) => void;
  updateCustomSection: (section: CustomSection) => void;
  removeCustomSection: (id: string) => void;

  switchResume: (id: string) => void;
  newResume: (name?: string) => void;
  copyResume: (id: string) => void;
  removeResume: (id: string) => void;
  rename: (id: string, name: string) => void;
}

const scheduleSave = (
  get: () => ResumeStore,
  set: (partial: Partial<ResumeStore>) => void
) => {
  set({ saveState: "saving" });
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const current = get().resume;
    if (current) {
      const saved = saveResume(current);
      set({ resume: saved, index: loadIndex(), saveState: "saved" });
    } else {
      set({ saveState: "saved" });
    }
  }, 500);
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resume: null,
  index: { activeId: null, resumes: [] },
  saveState: "saved",

  init: () => {
    const resume = getOrInitActiveResume();
    set({ resume, index: loadIndex(), saveState: "saved" });
  },

  refreshIndex: () => set({ index: loadIndex() }),

  patch: (updater) => {
    const current = get().resume;
    if (!current) return;
    set({ resume: updater(current) });
    scheduleSave(get, set);
  },

  updateSection: (key, value) =>
    get().patch((draft) => ({ ...draft, [key]: value })),

  updateSettings: (partial) =>
    get().patch((draft) => ({
      ...draft,
      settings: { ...draft.settings, ...partial },
    })),

  setTemplate: (templateId) =>
    get().patch((draft) => ({ ...draft, templateId })),

  reorderSections: (order) =>
    get().patch((draft) => ({ ...draft, sectionOrder: order })),

  toggleSection: (key) =>
    get().patch((draft) => ({
      ...draft,
      hiddenSections: draft.hiddenSections.includes(key)
        ? draft.hiddenSections.filter((k) => k !== key)
        : [...draft.hiddenSections, key],
    })),

  renameSectionHeading: (key, title) =>
    get().patch((draft) => ({
      ...draft,
      sectionTitles: { ...draft.sectionTitles, [key]: title },
    })),

  addCustomSection: (title) =>
    get().patch((draft) => ({
      ...draft,
      customSections: [
        ...draft.customSections,
        { id: uuidV4(), title, items: [] },
      ],
    })),

  updateCustomSection: (section) =>
    get().patch((draft) => ({
      ...draft,
      customSections: draft.customSections.map((s) =>
        s.id === section.id ? section : s
      ),
    })),

  removeCustomSection: (id) =>
    get().patch((draft) => ({
      ...draft,
      customSections: draft.customSections.filter((s) => s.id !== id),
    })),

  switchResume: (id) => {
    const resume = loadResume(id);
    if (!resume) return;
    setActiveResume(id);
    set({ resume, index: loadIndex(), saveState: "saved" });
  },

  newResume: (name) => {
    const resume = createResume(name ?? "Untitled Resume");
    setActiveResume(resume.id);
    set({ resume, index: loadIndex(), saveState: "saved" });
  },

  copyResume: (id) => {
    const copy = duplicateResume(id);
    if (copy) {
      setActiveResume(copy.id);
      set({ resume: copy, index: loadIndex(), saveState: "saved" });
    }
  },

  removeResume: (id) => {
    const next = deleteResume(id);
    const active = next.activeId ? loadResume(next.activeId) : null;
    set({ resume: active, index: next, saveState: "saved" });
    if (!active && next.resumes.length === 0) get().init();
  },

  rename: (id, name) => {
    renameResume(id, name);
    const current = get().resume;
    set({
      index: loadIndex(),
      resume: current && current.id === id ? { ...current, name } : current,
    });
  },
}));
