import * as Yup from "yup";

import { useEffect, useMemo, useState } from "react";

import useLocalStorage from "@hooks/useLocalStorage";

// formik form validation
const personalDetailFormValidationSchema = Yup.object({
  name: Yup.string()
    .required("name is required")
    .trim()
    .min(4, "must have minimum 4 letters"),
  address: Yup.string(),
  email: Yup.string().email("enter valid email address"),
  phone: Yup.string()
    .trim()
    .min(10, "number must be 10 digit long")
    .max(10, "number must be 10 digit long"),
  linkedin: Yup.string(),
  github: Yup.string().matches(
    /^https:\/\/github\.com\/[a-zA-Z0-9_-]/,
    "must contain https://github.com"
  ),
});
const defaultField: FormInputType[] = [
  { title: "name", fieldName: "name" },
  { title: "address", fieldName: "address", isTextArea: true },
  {
    title: "email",
    fieldName: "email",
    placeholder: "name@gmail.com",
    isMail: true,
  },
  { title: "phone", fieldName: "phone", placeholder: "8213456790" },
];

const usePersonalDetailsForm = () => {
  const [storedPersonalData, setStoredPersonalData] =
    useState<PersonalDetailFields>({
      name: "",
    });
  const { getLocalStorageByKey, storeToLocalStorage } = useLocalStorage();

  const getLocalFormFields = (): FormInputType[] => {
    const storedField = getLocalStorageByKey<FormInputType>(
      "fields_personalDetails"
    );
    if (storedField.length) {
      return storedField;
    }
    storeToLocalStorage<FormInputType[]>(
      "fields_personalDetails",
      defaultField
    );
    return defaultField;
  };
  // input fields list
  const [personalDetailsFormFields, setPersonalDetailsFormFields] =
    useState<FormInputType[]>(getLocalFormFields);
  const isOtherFieldHidden = (fieldName: string) => {
    let isHidden = true;
    for (const field of personalDetailsFormFields) {
      if (field.fieldName === fieldName) {
        isHidden = false;
      }
    }

    return isHidden;
  };
  // other fields
  const defaultOtherFields: OtherFormInputType[] = [
    {
      title: "linkedin",
      fieldName: "linkedin",
      placeholder: "https://www.linkedin.com/in/name",
      hidden: isOtherFieldHidden("linkedin"),
      isLink: true,
    },
    {
      title: "github",
      fieldName: "github",
      placeholder: "https://github.com/name",
      hidden: isOtherFieldHidden("github"),
      isLink: true,
    },
  ];

  const getOtherLocalFormFields = (): OtherFormInputType[] => {
    const storedField = getLocalStorageByKey<OtherFormInputType>(
      "otherFields_personalDetails"
    );
    if (storedField.length) {
      return storedField;
    }
    storeToLocalStorage<OtherFormInputType[]>(
      "otherFields_personalDetails",
      defaultOtherFields
    );
    return defaultOtherFields;
  };

  const [otherPersonalDetailsFields, setOtherPersonalDetailsFields] = useState<
    OtherFormInputType[]
  >(getOtherLocalFormFields);

  // save data to local storage
  const savePersonalData = (data: PersonalDetailFields) => {
    storeToLocalStorage<PersonalDetailFields>("personalDetails", data);
  };
  const updateFormFields = (fields: FormInputType[]): void => {
    storeToLocalStorage<FormInputType[]>("fields_personalDetails", fields);
  };
  const updateOtherFormFields = (fields: OtherFormInputType[]): void => {
    storeToLocalStorage<OtherFormInputType[]>(
      "otherFields_personalDetails",
      fields
    );
  };

  // retrieve data from local storage
  useEffect(() => {
    const localData =
      getLocalStorageByKey<PersonalDetailFields>("personalDetails")[0];
    setStoredPersonalData((prev) => ({ ...prev, ...localData }));
  }, []);

  // add fields
  const addFormFields = (toAddField: FormInputType) => {
    const storedField = getLocalFormFields();
    if (storedField.some((field) => field.fieldName !== toAddField.fieldName)) {
      const updatedField = storedField.concat(toAddField);
      // update field
      updateFormFields(updatedField);
      setPersonalDetailsFormFields(updatedField);
      // update other fields
      const otherUpdatedField = otherPersonalDetailsFields.map((otherField) => {
        if (otherField.fieldName === toAddField.fieldName) {
          otherField.hidden = false;
        }
        return otherField;
      });
      updateOtherFormFields(otherUpdatedField);
      setOtherPersonalDetailsFields(otherUpdatedField);
    }
  };
  // remove fields
  const removeFormFields = (fieldName: string) => {
    const storedField = getLocalFormFields();
    const updatedField = storedField.filter(
      (field) => field.fieldName !== fieldName
    );
    // update field
    updateFormFields(updatedField);
    setPersonalDetailsFormFields(updatedField);
    // update other fields
    const otherUpdatedField = otherPersonalDetailsFields.map((otherField) => {
      if (otherField.fieldName === fieldName) {
        otherField.hidden = true;
      }
      return otherField;
    });
    updateOtherFormFields(otherUpdatedField);
    setOtherPersonalDetailsFields(otherUpdatedField);
  };

  // set initial values
  const formInitialValues = useMemo(
    () =>
      personalDetailsFormFields.reduce(
        (acc: Record<string, string>, { fieldName }) => {
          acc[fieldName] =
            storedPersonalData[fieldName as keyof PersonalDetailFields] ?? "";
          return acc;
        },
        {}
      ),
    [storedPersonalData, personalDetailsFormFields]
  );

  return {
    personalDetailFormValidationSchema,
    otherPersonalDetailsFields,
    personalDetailsFormFields,
    formInitialValues,
    savePersonalData,
    addFormFields,
    removeFormFields,
  };
};

export default usePersonalDetailsForm;
