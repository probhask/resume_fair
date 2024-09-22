import ActionButtonContainer from "@components/ActionButtonContainer/ActionButtonContainer";
import FormTitle from "@components/FormTitle/FormTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import { Formik } from "formik";
import InputTextArea from "@components/Forms/InputTextArea";
import React from "react";
import SaveButton from "@components/Forms/SaveButton";
import SectionWrapper from "@components/SectionWrapper/SectionWrapper";
import useObjectiveForm from "./hook/useObjectiveForm";

const Objective = React.memo(() => {
  const { ObjectiveValidationSchema, initialValues, saveObjectiveData } =
    useObjectiveForm();
  return (
    <SectionWrapper>
      <FormTitle title="Objective" />
      <FormWrapper>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={ObjectiveValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            saveObjectiveData(values);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
            <form onSubmit={handleSubmit}>
              <InputTextArea
                label="Objective"
                name="objective"
                placeholder="write your objective"
                value={values.objective}
                onValueChange={handleChange}
                errorMsg={errors.objective}
                handleBlur={handleBlur}
              />

              <ActionButtonContainer>
                <SaveButton onBtnClick={handleSubmit} />
              </ActionButtonContainer>
            </form>
          )}
        </Formik>
      </FormWrapper>
    </SectionWrapper>
  );
});
Objective.displayName = "Objective";

export default Objective;
