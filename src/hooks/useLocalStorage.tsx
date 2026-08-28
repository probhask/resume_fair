import {
  getOrInitActiveResume,
  loadResume,
  saveResume,
} from "../services/storage";
import { loadIndex } from "../services/storage";
import toast from "react-hot-toast";

/** Internal field-config keys — writes to these are setup, not user saves. */
const SILENT_KEYS = new Set<LocalStorageKey>([
  "fields_personalDetails",
  "otherFields_personalDetails",
]);

/**
 * Back-compat shim. The app used to keep a single `resume-builder` blob; it now
 * stores one document per resume (see `src/services/storage.ts`). This hook keeps
 * the old `getLocalStorage` / `getLocalStorageByKey` / `storeToLocalStorage` API
 * working against the currently active resume so existing form hooks are
 * untouched. New code should use `useResumeStore` instead.
 */
const useLocalStorage = () => {
  const getLocalStorage = (): LocalStorageDataMap => {
    return getOrInitActiveResume() as unknown as LocalStorageDataMap;
  };

  const getLocalStorageByKey = <T,>(key: LocalStorageKey): T[] => {
    const data = getLocalStorage() as unknown as Record<string, unknown>;
    const value = data[key];
    return (Array.isArray(value) ? value : []) as T[];
  };

  const storeToLocalStorage = <T,>(key: LocalStorageKey, value: T) => {
    const activeId = loadIndex().activeId;
    const resume = (activeId && loadResume(activeId)) || getOrInitActiveResume();
    try {
      saveResume({
        ...resume,
        [key]: Array.isArray(value) ? value : [value],
      });
      if (!SILENT_KEYS.has(key)) toast.success("Saved");
    } catch {
      if (!SILENT_KEYS.has(key)) toast.error("Couldn't save — storage may be full");
    }
  };

  return { getLocalStorage, storeToLocalStorage, getLocalStorageByKey };
};

export default useLocalStorage;
