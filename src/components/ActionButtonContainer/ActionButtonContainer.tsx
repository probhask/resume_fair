import React, { ReactNode } from "react";

const ActionButtonContainer = React.memo(
  ({ children }: { children: ReactNode }) => {
    return (
      <div className="flex items-center justify-center gap-x-5 gap-y-2 mt-4 mb-4  ">
        {children}
      </div>
    );
  }
);
ActionButtonContainer.displayName = "ActionButtonContainer";
export default ActionButtonContainer;
