import FormItemSection from "@components/FormItemSection/FormItemSection";
import { FormikErrors } from "formik";
import InputText from "@components/Forms/InputText";
import InputTextArea from "@components/Forms/InputTextArea";
import React from "react";

const EducationForm = React.memo(
  ({
    educationSectionTitle,
    index,
    values,
    error,
    handleBlur,
    handleChange,
    educationFormFields,
    handleRemoveEducationSection,
  }: {
    educationSectionTitle: string;
    index: number;
    values: EducationFields;
    educationFormFields: FormInputType[];
    error: FormikErrors<EducationFields> | undefined;
    handleChange: (e: React.ChangeEvent<string>) => void;
    handleBlur?: ((e: React.FocusEvent<string>) => void) | undefined;
    handleRemoveEducationSection: (id: string) => void;
  }) => {
    return (
      <FormItemSection
        title={educationSectionTitle}
        remove={() => handleRemoveEducationSection(values.id)}
      >
        {educationFormFields.map(
          ({ title, fieldName, isTextArea, placeholder }) => {
            // Ensure fieldName is a key of EducationFields
            const key = fieldName as keyof EducationFields;

            return isTextArea ? (
              <InputTextArea
                key={`${educationSectionTitle}.${title}`}
                label={title}
                placeholder={placeholder}
                name={`${index}.${fieldName}`}
                value={values?.[key] ?? ""}
                errorMsg={error?.[key]}
                onValueChange={handleChange}
                handleBlur={handleBlur}
              />
            ) : (
              <InputText
                key={`${educationSectionTitle}.${title}`}
                label={title}
                placeholder={placeholder}
                name={`${index}.${fieldName}`}
                value={values?.[key] ?? ""}
                errorMsg={error?.[key]}
                onValueChange={handleChange}
                handleBlur={handleBlur}
              />
            );
          }
        )}

        {/* {educationFormFields.map(
          ({ title, fieldName, isTextArea, placeholder }) => {
            return isTextArea ? (
              <InputTextArea
                key={`${educationSectionTitle}.${title}`}
                label={title}
                placeholder={placeholder}
                name={`${index}.${fieldName}`}
                value={values?.[fieldName] ?? ""}
                errorMsg={error?.[fieldName]}
                onValueChange={handleChange}
                handleBlur={handleBlur}
              />
            ) : (
              <InputText
                key={`${educationSectionTitle}.${title}`}
                label={title}
                placeholder={placeholder}
                name={`${index}.${fieldName}`}
                value={values?.[fieldName] ?? ""}
                errorMsg={error?.[fieldName]}
                onValueChange={handleChange}
                handleBlur={handleBlur}
              />
            );
          }
        )} */}
      </FormItemSection>
    );
  }
);
EducationForm.displayName = "EducationForm";
export default EducationForm;
