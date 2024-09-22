import React from "react";

const FormErrorMessage = React.memo(({ error }: { error: string }) => {
  return <div className="text-red-600 text-xs font-semibold">{error}</div>;
});
FormErrorMessage.displayName = "FormErrorMessage";
export default FormErrorMessage;
