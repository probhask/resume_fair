import ActionButtonContainer from "@components/ActionButtonContainer/ActionButtonContainer";
import AddButton from "@components/Forms/AddButton";
import FormTitle from "@components/FormTitle/FormTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import { Formik } from "formik";
import InputText from "@components/Forms/InputText";
import InputTextArea from "@components/Forms/InputTextArea";
import React from "react";
import SaveButton from "@components/Forms/SaveButton";
import SectionWrapper from "@components/SectionWrapper/SectionWrapper";
import { useNavigate } from "react-router-dom";
import usePersonalDetailsForm from "./hook/usePersonalDetailsForm";

const PersonalDetails = React.memo(() => {
  const navigate = useNavigate();
  const {
    personalDetailFormValidationSchema,
    formInitialValues,
    personalDetailsFormFields,
    savePersonalData,
  } = usePersonalDetailsForm();
  return (
    <SectionWrapper>
      <FormTitle title="Personal Details" />
      <FormWrapper>
        <Formik
          enableReinitialize={true}
          initialValues={formInitialValues}
          validationSchema={personalDetailFormValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            savePersonalData(values as PersonalDetailFields);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {personalDetailsFormFields.map(
                ({ title, fieldName, isTextArea, placeholder }) => {
                  return isTextArea ? (
                    <InputTextArea
                      key={title}
                      label={title}
                      name={fieldName}
                      placeholder={placeholder}
                      value={values[fieldName]}
                      errorMsg={errors[fieldName]}
                      onValueChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  ) : (
                    <InputText
                      key={title}
                      label={title}
                      name={title}
                      placeholder={placeholder}
                      value={values[title]}
                      onValueChange={handleChange}
                      handleBlur={handleBlur}
                      errorMsg={errors[title]}
                    />
                  );
                }
              )}
              {/* action button */}
              <ActionButtonContainer>
                <AddButton
                  onBtnClick={() =>
                    navigate("/forms/more-personal-details-section")
                  }
                />
                <SaveButton onBtnClick={handleSubmit} disabled={isSubmitting} />
              </ActionButtonContainer>
            </form>
          )}
        </Formik>
      </FormWrapper>
    </SectionWrapper>
  );
});
PersonalDetails.displayName = "PersonalDetails";

export default PersonalDetails;
