import { useResumeStore } from "../../../store/useResumeStore";
import { v4 as uuidV4 } from "uuid";

import type { ResumeSectionKey } from "../../../types/resume";

interface WithId {
  id: string;
}

/**
 * Generic replacement for the per-section copy-paste hooks
 * (`useEducationForm`, `useExperienceForm`, ...). Drives a repeatable section
 * directly off `useResumeStore`; consumed by the Phase 2 editor.
 */
export const useRepeatableSection = <T extends WithId>(
  key: ResumeSectionKey,
  makeEmpty: () => Omit<T, "id">
) => {
  const items = useResumeStore(
    (s) => (s.resume?.[key] as unknown as T[]) ?? []
  );
  const updateSection = useResumeStore((s) => s.updateSection);

  const commit = (next: T[]) =>
    updateSection(key, next as unknown as never);

  return {
    items,
    add: () => commit([...items, { id: uuidV4(), ...makeEmpty() } as T]),
    update: (id: string, patch: Partial<T>) =>
      commit(items.map((it) => (it.id === id ? { ...it, ...patch } : it))),
    remove: (id: string) => commit(items.filter((it) => it.id !== id)),
    reorder: (from: number, to: number) => {
      const next = [...items];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      commit(next);
    },
  };
};
