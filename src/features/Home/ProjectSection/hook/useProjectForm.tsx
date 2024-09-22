import * as Yup from "yup";

import { useEffect, useState } from "react";

import useLocalStorage from "@hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

//  project from fields
const projectFormFields: FormInputType[] = [
  {
    title: "Title",
    fieldName: "projectTitle",
    placeholder: "Project Title",
  },
  {
    title: "Description",
    fieldName: "description",
    placeholder: "Project Description",
    isTextArea: true,
  },
];
// validation schema
const projectFormValidationSchema = Yup.array().of(
  Yup.object({
    projectTitle: Yup.string().required("title is required"),
    description: Yup.string()
      .required("description is required")
      .max(200, "must be less than 200 characters"),
  })
);

const useProjectForm = () => {
  const { getLocalStorageByKey, storeToLocalStorage } = useLocalStorage();
  const [storedProjectsData, setStoredProjectsData] = useState<
    ProjectsFields[]
  >([]);
  const [projectsSectionCount, setProjectsSectionCount] = useState<number>(
    getLocalStorageByKey<ProjectsFields>("projects").length
  );
  const [initialValues, setInitialValues] = useState<ProjectsFields[]>([]);

  // common function for updating local storage for ProjectsFields
  const updateProjectsLocalStorage = (data: ProjectsFields[]) => {
    storeToLocalStorage<ProjectsFields[]>("projects", data);
  };

  // retrieve local data
  useEffect(() => {
    const data = getLocalStorageByKey<ProjectsFields>("projects");
    setStoredProjectsData(data);
  }, []);

  // set initial value
  useEffect(() => {
    const arr: ProjectsFields[] = [];
    Array.from({ length: projectsSectionCount }).forEach((_, i) => {
      const currentData = storedProjectsData[i] || {};
      arr.push({
        id: currentData.id || uuidV4(),
        projectTitle: currentData.projectTitle || "",
        description: currentData.description || "",
      });
    });
    setInitialValues(arr);
  }, [projectsSectionCount, storedProjectsData]);

  // add new projects section
  const handleAddNewProjectsSection = () => {
    setProjectsSectionCount((prev) => prev + 1);
  };
  // add to local storage
  const saveProjectsData = (data: ProjectsFields[]) => {
    updateProjectsLocalStorage(data);
  };

  // remove section
  const handleRemoveProjectsSection = (id: string) => {
    setStoredProjectsData((prevLocalData) => {
      const updatedData = prevLocalData.filter((section) => section.id !== id);
      // update section length and initial values
      setInitialValues([...updatedData]);
      setProjectsSectionCount(updatedData.length);
      updateProjectsLocalStorage(updatedData);
      return updatedData;
    });
  };
  return {
    projectFormFields,
    projectFormValidationSchema,
    handleAddNewProjectsSection,
    saveProjectsData,
    handleRemoveProjectsSection,
    initialValues,
    projectsSectionCount,
  };
};

export default useProjectForm;
