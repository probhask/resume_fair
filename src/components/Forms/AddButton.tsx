import React from "react";
import { MdCheck } from "react-icons/md";

type AddBtnProps = {
  onBtnClick: () => void;
};

const AddButton = React.memo(({ onBtnClick }: AddBtnProps) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 text-white text-base bg-gradient-to-br  from-blue-500 to-blue-900 w-[80px] h-[30px] rounded-3xl shadow-inner active:scale-95 transition-all"
      onClick={onBtnClick}
    >
      <span>
        <MdCheck />
      </span>
      Add
    </button>
  );
});
AddButton.displayName = "Add";

export default AddButton;
