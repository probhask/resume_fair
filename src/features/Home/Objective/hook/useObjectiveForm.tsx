import * as Yup from "yup";

import { useEffect, useMemo, useState } from "react";

import useLocalStorage from "@hooks/useLocalStorage";

const useObjectiveForm = () => {
  const [storedObjectiveData, setStoredObjectiveData] =
    useState<ObjectiveFields>({
      objective: "",
    });
  const { getLocalStorageByKey, storeToLocalStorage } = useLocalStorage();

  // validation schema
  const ObjectiveValidationSchema = Yup.object({
    objective: Yup.string().required().max(250, "must be less than 250"),
  });

  useEffect(() => {
    const data = getLocalStorageByKey<ObjectiveFields>("objective")[0];
    console.log("data: ", data);
    setStoredObjectiveData(data);
  }, []);

  const initialValues = useMemo(
    (): ObjectiveFields => ({
      objective: storedObjectiveData?.objective || "",
    }),
    [storedObjectiveData]
  );

  const saveObjectiveData = (data: ObjectiveFields) => {
    storeToLocalStorage<ObjectiveFields>("objective", data);
  };

  return { ObjectiveValidationSchema, initialValues, saveObjectiveData };
};

export default useObjectiveForm;
