import * as Yup from "yup";

import { useEffect, useState } from "react";

import useLocalStorage from "@hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

// languages form felids
const languagesFormFields: FormInputType[] = [
  {
    title: "Title",
    fieldName: "languageTitle",
    placeholder: "language",
  },
];

const languagesFormValidationSchema = Yup.array().of(
  Yup.object({
    languageTitle: Yup.string().required("language is required"),
  })
);

const useLanguageForm = () => {
  const { getLocalStorageByKey, storeToLocalStorage } = useLocalStorage();
  const [storedLanguagesData, setStoredLanguagesData] = useState<
    LanguagesFields[]
  >([]);
  const [languagesSectionCount, setLanguagesSectionCount] = useState<number>(
    getLocalStorageByKey<LanguagesFields>("languages").length
  );
  const [initialValues, setInitialValues] = useState<LanguagesFields[]>([]);

  // common function for updating local storage for Languages
  const updateLanguagesLocalStorage = (data: LanguagesFields[]) => {
    storeToLocalStorage<LanguagesFields[]>("languages", data);
  };

  // retrieve local data
  useEffect(() => {
    const data = getLocalStorageByKey<LanguagesFields>("languages");
    setStoredLanguagesData(data);
  }, []);

  // set initial value
  useEffect(() => {
    const arr: LanguagesFields[] = [];
    Array.from({ length: languagesSectionCount }).forEach((_, i) => {
      const currentData = storedLanguagesData[i] || {};
      arr.push({
        id: currentData.id || uuidV4(),
        languageTitle: currentData.languageTitle || "",
      });
    });
    setInitialValues(arr);
  }, [languagesSectionCount, storedLanguagesData]);

  // add new Languages section
  const handleAddNewLanguagesSection = () => {
    setLanguagesSectionCount((prev) => prev + 1);
  };
  // add to local storage
  const saveLanguagesData = (data: LanguagesFields[]) => {
    updateLanguagesLocalStorage(data);
  };

  // remove section
  const handleRemoveLanguagesSection = (id: string) => {
    setStoredLanguagesData((prevLocalData) => {
      const updatedData = prevLocalData.filter((section) => section.id !== id);
      // update section length and initial values
      setInitialValues([...updatedData]);
      setLanguagesSectionCount(updatedData.length);
      updateLanguagesLocalStorage(updatedData);
      return updatedData;
    });
  };

  return {
    languagesFormValidationSchema,
    handleAddNewLanguagesSection,
    handleRemoveLanguagesSection,
    saveLanguagesData,
    initialValues,
    languagesSectionCount,
    languagesFormFields,
  };
};

export default useLanguageForm;
