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
import useReferenceForm from "./hook/useReference";

const Reference = React.memo(() => {
  const {
    handleAddNewReferencesSection,
    handleRemoveReferencesSection,
    initialValues,
    referenceFormFields,
    referenceFormValidationSchema,
    referencesSectionCount,
    saveReferencesData,
  } = useReferenceForm();
  return (
    <SectionWrapper>
      <FormTitle title="References" />
      <FormWrapper>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={referenceFormValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            saveReferencesData(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
            <FormsGroup handleSubmit={handleSubmit}>
              {Array(referencesSectionCount)
                .fill(0)
                .map((_, index) => (
                  <FormItemSection
                    key={"form section" + index}
                    title={`Reference ${index + 1}`}
                    remove={() =>
                      handleRemoveReferencesSection(values[index].id)
                    }
                  >
                    {referenceFormFields.map(
                      ({ title, fieldName, placeholder, isTextArea }) => {
                        const key = fieldName as keyof ReferencesFields;
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
                <AddButton onBtnClick={handleAddNewReferencesSection} />
                <SaveButton onBtnClick={handleSubmit} />
              </ActionButtonContainer>
            </FormsGroup>
          )}
        </Formik>
      </FormWrapper>
    </SectionWrapper>
  );
});
Reference.displayName = "Reference";

export default Reference;
