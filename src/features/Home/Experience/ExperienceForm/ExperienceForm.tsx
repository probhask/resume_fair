import FormItemSection from "@components/FormItemSection/FormItemSection";
import { FormikErrors } from "formik";
import InputText from "@components/Forms/InputText";
import InputTextArea from "@components/Forms/InputTextArea";
import React from "react";

const ExperienceForm = React.memo(
  ({
    experienceSectionTitle,
    index,
    values,
    error,
    handleBlur,
    handleChange,
    experienceFormFields,
    handleRemoveExperienceSection,
  }: {
    experienceSectionTitle: string;
    index: number;
    values: ExperienceFields;
    experienceFormFields: FormInputType[];
    error: FormikErrors<ExperienceFields> | undefined;
    handleChange: (e: React.ChangeEvent<string>) => void;
    handleBlur?: ((e: React.FocusEvent<string>) => void) | undefined;
    handleRemoveExperienceSection: (id: string) => void;
  }) => {
    return (
      <FormItemSection
        title={experienceSectionTitle}
        remove={() => handleRemoveExperienceSection(values.id)}
      >
        {experienceFormFields.map(
          ({ title, fieldName, isTextArea, placeholder }) => {
            // Ensure fieldName is a key of ExperienceField
            const key = fieldName as keyof ExperienceFields;
            return isTextArea ? (
              <InputTextArea
                key={`${experienceSectionTitle}.${title}`}
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
                key={`${experienceSectionTitle}.${title}`}
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
      </FormItemSection>
    );
  }
);
ExperienceForm.displayName = "ExperienceForm";
export default ExperienceForm;
