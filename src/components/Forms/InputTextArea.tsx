import FormErrorMessage from "@components/FormErrorMessage/FormErrorMessage";
import Label from "./Label";
import React from "react";

type InputTextProps = {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  hideLabel?: boolean;
  onValueChange: (e: React.ChangeEvent<any>) => void;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  errorMsg?: string;
};

// Input form element
const InputTextArea = React.memo(
  ({
    label,
    hideLabel,
    name,
    value,
    placeholder,
    handleBlur,
    onValueChange,
    errorMsg,
  }: InputTextProps) => {
    return (
      <div className="flex flex-col">
        {!hideLabel && label && <Label label={label} elementId={name} />}
        <textarea
          id={name}
          name={name}
          placeholder={placeholder ? placeholder : `Your ${label}`}
          value={value}
          onChange={onValueChange}
          rows={4}
          onBlur={handleBlur}
          className="no-scrollbar border-2 border-pink-600 caret-pink-600 bg-neutral-800 text-white outline-none px-2 py-1 text-[0.85rem]  rounded focus-visible:border-neutral-400 placeholder:text-[0.85rem] resize-none"
        />
        {errorMsg && <FormErrorMessage error={errorMsg} />}
      </div>
    );
  }
);
InputTextArea.displayName = "InputTextArea";
export default InputTextArea;
