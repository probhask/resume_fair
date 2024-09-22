import ActionButtonContainer from "@components/ActionButtonContainer/ActionButtonContainer";
import AddButton from "@components/Forms/AddButton";
import ExperienceForm from "./ExperienceForm/ExperienceForm";
import FormTitle from "@components/FormTitle/FormTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import { Formik } from "formik";
import FormsGroup from "@components/FormsGroup/FormsGroup";
import React from "react";
import SaveButton from "@components/Forms/SaveButton";
import SectionWrapper from "@components/SectionWrapper/SectionWrapper";
import useExperienceForm from "./hook/useExperienceForm";

const Experience = React.memo(() => {
  const {
    experienceFormFields,
    experienceSectionCount,
    experienceValidationSchema,
    handleAddNewExperienceSection,
    handleRemoveExperienceSection,
    initialValues,
    saveExperienceData,
  } = useExperienceForm();
  return (
    <SectionWrapper>
      <FormTitle title="Experience" />
      <FormWrapper>
        <Formik
          key={experienceSectionCount}
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={experienceValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            saveExperienceData(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
            <FormsGroup handleSubmit={handleSubmit}>
              {Array(experienceSectionCount)
                .fill(0)
                .map((_, i) => (
                  <ExperienceForm
                    key={`experience${i + 1}`}
                    index={i}
                    experienceSectionTitle={`experience ${i + 1}`}
                    values={values[i]}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors[i]}
                    experienceFormFields={experienceFormFields}
                    handleRemoveExperienceSection={
                      handleRemoveExperienceSection
                    }
                  />
                ))}
              <ActionButtonContainer>
                <AddButton onBtnClick={handleAddNewExperienceSection} />
                <SaveButton onBtnClick={handleSubmit} />
              </ActionButtonContainer>
            </FormsGroup>
          )}
        </Formik>
      </FormWrapper>
    </SectionWrapper>
  );
});
Experience.displayName = "Experience";

export default Experience;
