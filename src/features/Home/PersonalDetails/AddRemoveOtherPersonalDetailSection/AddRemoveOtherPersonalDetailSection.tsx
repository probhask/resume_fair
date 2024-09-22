import FormTitle from "@components/FormTitle/FormTitle";
import { IoToggle } from "react-icons/io5";
import { LiaToggleOffSolid } from "react-icons/lia";
import React from "react";
import SectionWrapper from "@components/SectionWrapper/SectionWrapper";
import usePersonalDetailsForm from "../hook/usePersonalDetailsForm";

const AddRemoveOtherPersonalDetailSection = React.memo(() => {
  const { otherPersonalDetailsFields, addFormFields, removeFormFields } =
    usePersonalDetailsForm();

  return (
    <SectionWrapper>
      <FormTitle
        title="Add More Personal Info"
        backRoute="forms/personal-details"
      />
      {/* <FormWrapper> */}
      <div className="flex flex-col ">
        {otherPersonalDetailsFields.map((field, index) => (
          <div
            key={field.title + "add-section"}
            className={`flex items-center justify-between px-2 py-2 bg-gray-50/10  ${
              otherPersonalDetailsFields.length !== index + 1 && "border-b "
            }`}
          >
            <h6 className="capitalize text-xl">{field.title}</h6>
            <div className="[&>*]:text-4xl  active:scale-x-95 cursor-pointer transition-all">
              {field.hidden ? (
                <span
                  className="text-pink-600"
                  onClick={() => addFormFields(field)}
                >
                  <LiaToggleOffSolid />
                </span>
              ) : (
                <span
                  className="text-pink-600"
                  onClick={() => removeFormFields(field.fieldName)}
                >
                  <IoToggle />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* </FormWrapper> */}
    </SectionWrapper>
  );
});
AddRemoveOtherPersonalDetailSection.displayName =
  "Add Remove Other Personal Detail Section";
export default AddRemoveOtherPersonalDetailSection;
