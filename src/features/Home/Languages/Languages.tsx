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
import useLanguageForm from "./hook/useLanguageForm";

const Languages = React.memo(() => {
  const {
    languagesFormValidationSchema,
    initialValues,
    handleAddNewLanguagesSection,
    languagesSectionCount,
    handleRemoveLanguagesSection,
    saveLanguagesData,
  } = useLanguageForm();
  return (
    <SectionWrapper>
      <FormTitle title="Languages" />
      <FormWrapper>
        <Formik
          key={languagesSectionCount}
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={languagesFormValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            saveLanguagesData(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
            <FormsGroup handleSubmit={handleSubmit}>
              {Array(languagesSectionCount)
                .fill(0)
                .map((_, i) => (
                  <FormItemSection
                    key={i}
                    title={`Skill ${i + 1}`}
                    remove={() => handleRemoveLanguagesSection(values[i].id)}
                  >
                    <InputText
                      hideLabel={true}
                      name={`${i}.languageTitle`}
                      placeholder={"languages"}
                      onValueChange={handleChange}
                      handleBlur={handleBlur}
                      value={values[i]?.languageTitle ?? ""}
                      errorMsg={errors[i]?.languageTitle}
                    />
                  </FormItemSection>
                ))}

              <ActionButtonContainer>
                <AddButton onBtnClick={handleAddNewLanguagesSection} />
                <SaveButton onBtnClick={handleSubmit} />
              </ActionButtonContainer>
            </FormsGroup>
          )}
        </Formik>
      </FormWrapper>
    </SectionWrapper>
  );
});
Languages.displayName = "Languages";

export default Languages;
