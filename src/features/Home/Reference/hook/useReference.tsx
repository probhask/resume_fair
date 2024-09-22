import * as Yup from "yup";

import { useEffect, useState } from "react";

import useLocalStorage from "@hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

//  reference from fields
const referenceFormFields: FormInputType[] = [
  {
    title: "Reference Name",
    fieldName: "referenceName",
    placeholder: "Project name",
  },
  {
    title: "Job Title",
    fieldName: "jobTitle",
    placeholder: "Job",
  },

  {
    title: "Company Name",
    fieldName: "companyName",
    placeholder: "company",
  },
  {
    title: "Phone",
    fieldName: "phone",
    placeholder: "phone number",
  },
  {
    title: "Email",
    fieldName: "email",
    placeholder: "email address",
  },
];

// validation schema
const referenceFormValidationSchema = Yup.array().of(
  Yup.object({
    referenceName: Yup.string().required("name is required"),
    jobTitle: Yup.string().required("job is required"),
    companyName: Yup.string().required("company is required"),
    phone: Yup.string()
      .trim()
      .min(10, "number must be 10 digit long")
      .max(10, "number must be 10 digit long"),
    email: Yup.string()
      .email("must be a valid email")
      .required("email is required"),
  })
);

////////////////////////////////////////////////////////////////
const useReferenceForm = () => {
  const { getLocalStorageByKey, storeToLocalStorage } = useLocalStorage();
  const [storedReferencesData, setStoredReferencesData] = useState<
    ReferencesFields[]
  >([]);
  const [referencesSectionCount, setReferencesSectionCount] = useState<number>(
    getLocalStorageByKey<ReferencesFields>("references").length
  );
  const [initialValues, setInitialValues] = useState<ReferencesFields[]>([]);

  // common function for updating local storage for ReferencesFields
  const updateReferencesLocalStorage = (data: ReferencesFields[]) => {
    storeToLocalStorage<ReferencesFields[]>("references", data);
  };

  // retrieve local data
  useEffect(() => {
    const data = getLocalStorageByKey<ReferencesFields>("references");
    setStoredReferencesData(data);
  }, []);

  // set initial value
  useEffect(() => {
    const arr: ReferencesFields[] = [];
    Array.from({ length: referencesSectionCount }).forEach((_, i) => {
      const currentData = storedReferencesData[i] || {};
      arr.push({
        id: currentData.id || uuidV4(),
        referenceName: currentData.referenceName || "",
        jobTitle: currentData.jobTitle || "",
        companyName: currentData.companyName || "",
        email: currentData.email || "",
        phone: currentData.phone || "",
      });
    });
    setInitialValues(arr);
  }, [referencesSectionCount, storedReferencesData]);

  // add new references section
  const handleAddNewReferencesSection = () => {
    setReferencesSectionCount((prev) => prev + 1);
  };
  // add to local storage
  const saveReferencesData = (data: ReferencesFields[]) => {
    updateReferencesLocalStorage(data);
  };

  // remove section
  const handleRemoveReferencesSection = (id: string) => {
    setStoredReferencesData((prevLocalData) => {
      const updatedData = prevLocalData.filter((section) => section.id !== id);
      // update section length and initial values
      setInitialValues([...updatedData]);
      setReferencesSectionCount(updatedData.length);
      updateReferencesLocalStorage(updatedData);
      return updatedData;
    });
  };
  return {
    referenceFormFields,
    referenceFormValidationSchema,
    handleAddNewReferencesSection,
    saveReferencesData,
    handleRemoveReferencesSection,
    initialValues,
    referencesSectionCount,
  };
};

export default useReferenceForm;
