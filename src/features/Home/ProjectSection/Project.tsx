import ActionButtonContainer from "@components/ActionButtonContainer/ActionButtonContainer";
import AddButton from "@components/Forms/AddButton";
import FormItemSection from "@components/FormItemSection/FormItemSection";
import FormTitle from "@components/FormTitle/FormTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import { Formik } from "formik";
import FormsGroup from "@components/FormsGroup/FormsGroup";
import InputText from "@components/Forms/InputText";
import InputTextArea from "@components/Forms/InputTextArea";
import React from "react";
import SaveButton from "@components/Forms/SaveButton";
import SectionWrapper from "@components/SectionWrapper/SectionWrapper";
import useProjectForm from "./hook/useProjectForm";

const Projects = React.memo(() => {
  const {
    handleAddNewProjectsSection,
    handleRemoveProjectsSection,
    initialValues,
    projectFormFields,
    projectFormValidationSchema,
    projectsSectionCount,
    saveProjectsData,
  } = useProjectForm();
  return (
    <SectionWrapper>
      <FormTitle title="Projects" />
      <FormWrapper>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={projectFormValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            saveProjectsData(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
            <FormsGroup handleSubmit={handleSubmit}>
              {Array(projectsSectionCount)
                .fill(0)
                .map((_, index) => (
                  <FormItemSection
                    key={"form section" + index}
                    title={`Project ${index + 1}`}
                    remove={() => handleRemoveProjectsSection(values[index].id)}
                  >
                    {projectFormFields.map(
                      ({ title, fieldName, isTextArea, placeholder }) => {
                        const key = fieldName as keyof ProjectsFields;
                        return isTextArea ? (
                          <InputTextArea
                            key={`${index}.${fieldName}`}
                            label={title}
                            name={`${index}.${fieldName}`}
                            value={values[index]?.[key] ?? ""}
                            errorMsg={errors[index]?.[key] ?? ""}
                            placeholder={placeholder}
                            onValueChange={handleChange}
                            handleBlur={handleBlur}
                          />
                        ) : (
                          <InputText
                            key={`${index}.${fieldName}`}
                            label={title}
                            name={`${index}.${fieldName}`}
                            value={values[index]?.[key] ?? ""}
                            errorMsg={errors[index]?.[key] ?? ""}
                            placeholder={placeholder}
                            onValueChange={handleChange}
                            handleBlur={handleBlur}
                          />
                        );
                      }
                    )}
                  </FormItemSection>
                ))}
              <ActionButtonContainer>
                <AddButton onBtnClick={handleAddNewProjectsSection} />
                <SaveButton onBtnClick={handleSubmit} />
              </ActionButtonContainer>
            </FormsGroup>
          )}
        </Formik>
      </FormWrapper>
    </SectionWrapper>
  );
});
Projects.displayName = "Projects";

export default Projects;
