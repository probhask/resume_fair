import { NavLink } from "react-router-dom";
import React from "react";
import { sectionList } from "@constants/SectionList";

const Sections = React.memo(() => {
  return (
    <div className=" w-full ">
      <h3 className="px-2 mb-2 mt-2 border-b">Sections</h3>
      <div className="w-full ">
        {sectionList.map((section) => (
          <NavLink
            to={`${section.path}`}
            key={`${section.path}`}
            className={({ isActive }) =>
              `flex items-center gap-x-3 shadow-[0_0_0.8px] h-12 rounded-md px-1  text-white  cursor-pointer mb-2 bg-gray-100/50 te ${
                isActive ? "bg-pink-300 shadow shadow-pink-400" : "bg-pink-900"
              }`
            }
          >
            <span className="text-2xl text-[#f00b51]">{section.icon}</span>
            <span className="text-md text-white">{section.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
});
Sections.displayName = "Sections";

export default Sections;
