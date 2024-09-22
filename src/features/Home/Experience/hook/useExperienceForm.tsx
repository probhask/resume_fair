import * as Yup from "yup";

import { useEffect, useState } from "react";

import useLocalStorage from "@hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

// experience form fields
const experienceFormFields: FormInputType[] = [
  {
    title: "company name",
    fieldName: "companyName",
    placeholder: "Company Name",
  },
  {
    title: "job title",
    fieldName: "jobTitle",
    placeholder: "Job Title",
  },
  {
    title: "start date",
    fieldName: "startDate",
    placeholder: "2/2/2015",
  },
  {
    title: "end date",
    fieldName: "endDate",
    placeholder: "2/12/2015",
  },
  {
    title: "description",
    fieldName: "description",
    placeholder: "write about your experience",
    isTextArea: true,
  },
];

const experienceFieldSchema = Yup.object().shape({
  companyName: Yup.string().required("company name is required"),
  jobTitle: Yup.string().required("job title is required"),
  startDate: Yup.string(),
  endDate: Yup.string(),
  description: Yup.string().max(100, "must be less than 100 words"),
});
// validation schema
const experienceValidationSchema = Yup.array().of(experienceFieldSchema);

// //////////////////////////////////////////////////////////////////////
const useExperienceForm = () => {
  const { getLocalStorageByKey, storeToLocalStorage } = useLocalStorage();
  const [storedExperienceData, setStoredExperienceData] = useState<
    ExperienceFields[]
  >([]);
  const [experienceSectionCount, setExperienceSectionCount] = useState<number>(
    getLocalStorageByKey<ExperienceFields>("experience").length
  );
  const [initialValues, setInitialValues] = useState<ExperienceFields[]>([]);

  // common function for updating local storage for Experience
  const updateExperienceLocalStorage = (data: ExperienceFields[]) => {
    storeToLocalStorage<ExperienceFields[]>("experience", data);
  };
  //   updateExperienceLocalStorage(sampleData);

  // retrieve local data
  useEffect(() => {
    const data = getLocalStorageByKey<ExperienceFields>("experience");
    setStoredExperienceData(data);
  }, []);

  // set initial value
  useEffect(() => {
    const arr: ExperienceFields[] = [];
    Array.from({ length: experienceSectionCount }).forEach((_, i) => {
      const currentData = storedExperienceData[i] || {};
      arr.push({
        id: currentData.id || uuidV4(),
        companyName: currentData.companyName || "",
        jobTitle: currentData.jobTitle || "",
        startDate: currentData.startDate || "",
        endDate: currentData.endDate || "",
        description: currentData.description || "",
      });
    });
    setInitialValues(arr);
  }, [experienceSectionCount, storedExperienceData]);

  // add new Experience section
  const handleAddNewExperienceSection = () => {
    setExperienceSectionCount((prev) => prev + 1);
  };
  // add to local storage
  const saveExperienceData = (data: ExperienceFields[]) => {
    updateExperienceLocalStorage(data);
  };

  // remove section
  const handleRemoveExperienceSection = (id: string) => {
    setStoredExperienceData((prevLocalData) => {
      const updatedData = prevLocalData.filter((section) => section.id !== id);
      // update section length and initial values
      setInitialValues([...updatedData]);
      setExperienceSectionCount(updatedData.length);
      updateExperienceLocalStorage(updatedData);
      return updatedData;
    });
  };
  return {
    experienceFormFields,
    experienceValidationSchema,
    handleAddNewExperienceSection,
    saveExperienceData,
    handleRemoveExperienceSection,
    initialValues,
    experienceSectionCount,
  };
};

export default useExperienceForm;
