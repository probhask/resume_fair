import { FaCode, FaFileAlt } from "react-icons/fa";
import { IoLanguage, IoPeople } from "react-icons/io5";
import { MdPeople, MdPerson, MdSchool, MdWork } from "react-icons/md";

import { ReactNode } from "react";

type SectionListType = {
  path: string;
  icon: ReactNode;
  title: string;
};
export const sectionList: SectionListType[] = [
  {
    path: "personal-details",
    icon: <MdPerson />,
    title: "Personal Details",
  },
  {
    path: "objective",
    icon: <MdPeople />,
    title: "Objective",
  },
  {
    path: "education",
    icon: <MdSchool />,
    title: "Education",
  },
  {
    path: "experience",
    icon: <MdWork />,
    title: "Experience",
  },

  {
    path: "skills",
    icon: <FaCode />,
    title: "Skills",
  },
  {
    path: "project",
    icon: <FaFileAlt />,
    title: "Projects",
  },
  {
    path: "languages",
    icon: <IoLanguage />,
    title: "Languages",
  },
  {
    path: "reference",
    icon: <IoPeople />,
    title: "Reference",
  },
];
