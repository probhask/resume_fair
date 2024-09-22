import * as Yup from "yup";

import { useEffect, useState } from "react";

import useLocalStorage from "@hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

// skills form felids
const skillsFormFields: FormInputType[] = [
  {
    title: "skill",
    fieldName: "skill",
    placeholder: "skill",
  },
];

const skillsFormValidationSchema = Yup.array().of(
  Yup.object({
    skill: Yup.string().required("skill is required"),
  })
);

const useSkillForm = () => {
  const { getLocalStorageByKey, storeToLocalStorage } = useLocalStorage();
  const [storedSkillsData, setStoredSkillsData] = useState<SkillsFields[]>([]);
  const [skillsSectionCount, setSkillsSectionCount] = useState<number>(
    getLocalStorageByKey<SkillsFields>("skills").length
  );
  const [initialValues, setInitialValues] = useState<SkillsFields[]>([]);

  // common function for updating local storage for Skills
  const updateSkillsLocalStorage = (data: SkillsFields[]) => {
    storeToLocalStorage<SkillsFields[]>("skills", data);
  };

  // retrieve local data
  useEffect(() => {
    const data = getLocalStorageByKey<SkillsFields>("skills");
    setStoredSkillsData(data);
  }, []);

  // set initial value
  useEffect(() => {
    const arr: SkillsFields[] = [];
    Array.from({ length: skillsSectionCount }).forEach((_, i) => {
      const currentData = storedSkillsData[i] || {};
      arr.push({
        id: currentData.id || uuidV4(),
        skill: currentData.skill || "",
      });
    });
    setInitialValues(arr);
  }, [skillsSectionCount, storedSkillsData]);

  // add new Skills section
  const handleAddNewSkillsSection = () => {
    setSkillsSectionCount((prev) => prev + 1);
  };
  // add to local storage
  const saveSkillsData = (data: SkillsFields[]) => {
    updateSkillsLocalStorage(data);
  };

  // remove section
  const handleRemoveSkillsSection = (id: string) => {
    setStoredSkillsData((prevLocalData) => {
      const updatedData = prevLocalData.filter((section) => section.id !== id);
      // update section length and initial values
      setInitialValues([...updatedData]);
      setSkillsSectionCount(updatedData.length);
      updateSkillsLocalStorage(updatedData);
      return updatedData;
    });
  };

  return {
    skillsFormValidationSchema,
    handleAddNewSkillsSection,
    handleRemoveSkillsSection,
    saveSkillsData,
    initialValues,
    skillsSectionCount,
    skillsFormFields,
  };
};

export default useSkillForm;
