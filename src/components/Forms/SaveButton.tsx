import React from "react";
import { MdCheck } from "react-icons/md";

type SaveBtnProps = {
  onBtnClick: () => void;
  disabled?: boolean;
};

const SaveButton = React.memo(({ onBtnClick, disabled }: SaveBtnProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className="flex items-center justify-center gap-2 text-white text-base bg-gradient-to-r  from-green-800 to-green-600 w-[80px] h-[30px] rounded-3xl shadow-inner active:scale-95 transition-all "
      onClick={onBtnClick}
    >
      <span>
        <MdCheck />
      </span>
      Save
    </button>
  );
});
SaveButton.displayName = "SaveButton";

export default SaveButton;
