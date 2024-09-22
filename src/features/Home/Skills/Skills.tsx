import ActionButtonContainer from "@components/ActionButtonContainer/ActionButtonContainer";
import AddButton from "@components/Forms/AddButton";
import FormItemSection from "@components/FormItemSection/FormItemSection";
import FormTitle from "@components/FormTitle/FormTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import { Formik } from "formik";
import FormsGroup from "@components/FormsGroup/FormsGroup";
import InputText from "@components/Forms/InputText";
import React from "react";
import SaveButton from "@components/Forms/SaveButton";
import SectionWrapper from "@components/SectionWrapper/SectionWrapper";
import useSkillForm from "./hook/useSkillForm";

const Skills = React.memo(() => {
  const {
    skillsFormValidationSchema,
    initialValues,
    handleAddNewSkillsSection,
    skillsSectionCount,
    handleRemoveSkillsSection,
    saveSkillsData,
  } = useSkillForm();
  return (
    <SectionWrapper>
      <FormTitle title="Skills" />
      <FormWrapper>
        <Formik
          key={skillsSectionCount}
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={skillsFormValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            saveSkillsData(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
            <FormsGroup handleSubmit={handleSubmit}>
              {Array(skillsSectionCount)
                .fill(0)
                .map((_, i) => (
                  <FormItemSection
                    key={i}
                    title={`Skill ${i + 1}`}
                    remove={() => handleRemoveSkillsSection(values[i].id)}
                  >
                    <InputText
                      hideLabel={true}
                      name={`${i}.skill`}
                      onValueChange={handleChange}
                      placeholder={"skill"}
                      handleBlur={handleBlur}
                      value={values[i]?.skill ?? ""}
                      errorMsg={errors[i]?.skill}
                    />
                  </FormItemSection>
                ))}

              <ActionButtonContainer>
                <AddButton onBtnClick={handleAddNewSkillsSection} />
                <SaveButton onBtnClick={handleSubmit} />
              </ActionButtonContainer>
            </FormsGroup>
          )}
        </Formik>
      </FormWrapper>
    </SectionWrapper>
  );
});
Skills.displayName = "Skills";

export default Skills;
