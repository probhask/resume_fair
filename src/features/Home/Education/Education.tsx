import ActionButtonContainer from "@components/ActionButtonContainer/ActionButtonContainer";
import AddButton from "@components/Forms/AddButton";
import EducationForm from "./EducationForm/EducationForm";
import FormTitle from "@components/FormTitle/FormTitle";
import FormWrapper from "@components/FormWrapper/FormWrapper";
import { Formik } from "formik";
import SaveButton from "@components/Forms/SaveButton";
import SectionWrapper from "@components/SectionWrapper/SectionWrapper";
import useEducationForm from "./hook/useEducationForm";

const Education = () => {
  const {
    handleAddNewEducationSection,
    initialValues,
    educationSectionCount,
    educationSchema,
    saveEducationData,
    handleRemoveEducationSection,
    educationFormFields,
  } = useEducationForm();

  return (
    <SectionWrapper>
      <FormTitle title="Education" />
      <FormWrapper>
        <Formik
          key={educationSectionCount}
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={educationSchema}
          onSubmit={(values) => {
            saveEducationData(values);
          }}
        >
          {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
            <form onSubmit={handleSubmit} className="flex flex-col">
              {Array(educationSectionCount)
                .fill(0)
                .map((_, i) => (
                  <EducationForm
                    key={`education${i + 1}`}
                    index={i}
                    educationSectionTitle={`education ${i + 1}`}
                    values={values[i]}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors[i]}
                    educationFormFields={educationFormFields}
                    handleRemoveEducationSection={handleRemoveEducationSection}
                  />
                ))}
              <ActionButtonContainer>
                <AddButton onBtnClick={handleAddNewEducationSection} />
                <SaveButton onBtnClick={handleSubmit} />
              </ActionButtonContainer>
            </form>
          )}
        </Formik>
      </FormWrapper>
    </SectionWrapper>
  );
};
Education.displayName = "Education";

export default Education;
