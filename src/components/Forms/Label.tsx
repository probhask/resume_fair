import React from "react";

const Label = React.memo(
  ({ label, elementId }: { label: string; elementId: string }) => {
    return (
      <label
        htmlFor={elementId}
        className="text-[0.8rem] text-white font-[400] capitalize"
      >
        {label}
      </label>
    );
  }
);

export default Label;
