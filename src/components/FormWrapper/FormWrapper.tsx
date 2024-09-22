import React, { ReactNode } from "react";

const FormWrapper = React.memo(({ children }: { children: ReactNode }) => {
  return <div className="px-2 my-3 bg-inherit">{children}</div>;
});
FormWrapper.displayName = "FormWrapper";
export default FormWrapper;
