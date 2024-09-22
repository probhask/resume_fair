const localStorageName = "resume-builder";
const useLocalStorage = () => {
  // get local storage
  const getLocalStorage = (): LocalStorageDataMap => {
    const raw = localStorage.getItem(localStorageName);
    if (raw) {
      return JSON.parse(raw) as LocalStorageDataMap;
    } else {
      localStorage.setItem(localStorageName, JSON.stringify({}));
      return getLocalStorage();
    }
  };

  // get by key value
  const getLocalStorageByKey = <T,>(key: LocalStorageKey): T[] => {
    const data = getLocalStorage();
    return (data[key] ?? []) as T[];
  };

  // set by key value
  const storeToLocalStorage = <T,>(key: LocalStorageKey, value: T) => {
    const data = getLocalStorage();
    const updatedData = {
      ...data,
      [key]: Array.isArray(value) ? value : [value],
    };
    localStorage.setItem(localStorageName, JSON.stringify(updatedData));
  };

  return { getLocalStorage, storeToLocalStorage, getLocalStorageByKey };
};

export default useLocalStorage;
