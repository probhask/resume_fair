import * as Yup from "yup";

import { useEffect, useState } from "react";

import useLocalStorage from "@hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

// input fields
const educationFormFields: FormInputType[] = [
  {
    title: "course",
    fieldName: "course",
    placeholder: "Course / Degree",
  },
  {
    title: "institution",
    fieldName: "institution",
    placeholder: "School / College / Institute",
  },
  {
    title: "score",
    fieldName: "score",
    placeholder: "7.9 / 79%",
  },
  {
    title: "year",
    fieldName: "year",
    placeholder: "2000-2001",
  },
];

// validation schema
const educationSchema = Yup.array().of(
  Yup.object().shape({
    id: Yup.string().required(),
    course: Yup.string().required("course is required"),
    institution: Yup.string().required("institution is required"),
    score: Yup.string(),
    year: Yup.string(),
  })
);

// hook
const useEducationForm = () => {
  const { getLocalStorageByKey, storeToLocalStorage } = useLocalStorage();
  const [storedEducationData, setStoredEducationData] = useState<
    EducationFields[]
  >([]);
  const [educationSectionCount, setEducationSectionCount] = useState<number>(
    getLocalStorageByKey<EducationFields>("education").length
  );
  const [initialValues, setInitialValues] = useState<EducationFields[]>([]);

  // common function for updating local storage for EducationFields
  const updateEducationLocalStorage = (data: EducationFields[]) => {
    storeToLocalStorage<EducationFields[]>("education", data);
  };

  // retrieve local data
  useEffect(() => {
    const data = getLocalStorageByKey<EducationFields>("education");
    setStoredEducationData(data);
  }, []);

  // set initial values
  // const initialValues = useMemo(() => {
  //   const arr: EducationFields[] = [];
  //   Array.from({ length: educationSectionCount }).forEach((_, i) => {
  //     const currentData = storedEducationData[i] || {};
  //     arr.push({
  //       id: currentData.id || uuidV4(),
  //       course: currentData.course || "",
  //       institution: currentData.institution || "",
  //       score: currentData.score || "",
  //       year: currentData.year || "",
  //     });
  //   });
  //   return arr;
  // }, [educationSectionCount, educationFormFields, storedEducationData]);

  // set initial value
  useEffect(() => {
    const arr: EducationFields[] = [];
    Array.from({ length: educationSectionCount }).forEach((_, i) => {
      const currentData = storedEducationData[i] || {};
      arr.push({
        id: currentData.id || uuidV4(),
        course: currentData.course || "",
        institution: currentData.institution || "",
        score: currentData.score || "",
        year: currentData.year || "",
      });
    });
    setInitialValues(arr);
  }, [educationSectionCount, storedEducationData]);

  // add new education section
  const handleAddNewEducationSection = () => {
    setEducationSectionCount((prev) => prev + 1);
  };
  // add to local storage
  const saveEducationData = (data: EducationFields[]) => {
    updateEducationLocalStorage(data);
  };

  // remove section
  const handleRemoveEducationSection = (id: string) => {
    setStoredEducationData((prevLocalData) => {
      const updatedData = prevLocalData.filter((section) => section.id !== id);
      // update section length and initial values
      setInitialValues([...updatedData]);
      setEducationSectionCount(updatedData.length);
      updateEducationLocalStorage(updatedData);
      return updatedData;
    });
  };
  return {
    educationFormFields,
    educationSchema,
    handleAddNewEducationSection,
    saveEducationData,
    handleRemoveEducationSection,
    initialValues,
    educationSectionCount,
  };
};

export default useEducationForm;
