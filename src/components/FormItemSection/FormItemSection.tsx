import React, { ReactNode } from "react";

import { MdDeleteForever } from "react-icons/md";

type FormItemSectionProps = {
  title: string;
  remove: () => void;
  children: ReactNode;
};

const FormItemSection = React.memo(
  ({ children, title, remove }: FormItemSectionProps) => {
    return (
      <div className="border border-pink-800 rounded-lg overflow-hidden shadow-sm mb-5 ">
        <div className="bg-gradient-to-tr from-pink-800 to-pink-600 text-white mb-2 px-2 py-1 rounded-t-lg flex items-center justify-between ">
          <h5 className="capitalize text-lg">{title}</h5>
          <div className="flex items-center gap-x-1">
            {/* <span
              title="move up"
              className="text-xl active:scale-90 cursor-pointer transition-all"
            >
              <FaArrowUp />
            </span>
            <span
              title="move down"
              className="text-xl active:scale-90 cursor-pointer transition-all"
            >
              <FaArrowDown />
            </span> */}
            <span
              title="remove"
              className="text-2xl active:scale-90 cursor-pointer transition-all"
              onClick={remove}
            >
              <MdDeleteForever />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 mx-2 mb-3 " key={title}>
          {children}
        </div>
      </div>
    );
  }
);
FormItemSection.displayName = "FormItemSection";
export default FormItemSection;
