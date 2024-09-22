import React, { ReactNode } from "react";

type FormsGroupProps = {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};
const FormsGroup = React.memo(({ handleSubmit, children }: FormsGroupProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {children}
    </form>
  );
});
FormsGroup.displayName = "FormsGroup";
export default FormsGroup;
