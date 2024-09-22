import FormErrorMessage from "@components/FormErrorMessage/FormErrorMessage";
import Label from "./Label";
import React from "react";

type InputTextProps = {
  label?: string;
  placeholder?: string;
  name: string;
  value: string;
  hideLabel?: boolean;
  onValueChange: (e: React.ChangeEvent<any>) => void;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  errorMsg?: string;
};

// Input form element
const InputText = React.memo(
  ({
    label,
    hideLabel,
    name,
    placeholder,
    value,
    onValueChange,
    handleBlur,
    errorMsg,
  }: InputTextProps) => {
    return (
      <div className="flex flex-col">
        {!hideLabel && label && <Label label={label} elementId={name} />}
        <input
          type="text"
          id={name}
          placeholder={
            placeholder ? placeholder : `Your ${label ? label : name}`
          }
          name={name}
          value={value}
          onBlur={handleBlur}
          onChange={onValueChange}
          className="border-2 border-pink-600 caret-pink-600 bg-neutral-800 text-white h-10 outline-none  px-2 py-1 text-[0.85rem] rounded focus-visible:border-neutral-400 placeholder:text-[0.85rem]"
        />
        {errorMsg && <FormErrorMessage error={errorMsg} />}
      </div>
    );
  }
);
InputText.displayName = "InputText";
export default InputText;
