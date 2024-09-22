import templateList, { templatePreviewList } from "@constants/Templates";

import { Link } from "react-router-dom";

const ChooseTemplate = () => {
  return (
    <div className="w-full h-svh  py-8 bg-black flex flex-col item-center overflow-y-auto">
      <h1 className=" text-pink-700 font-bold text-3xl sm:text-6xl mb-5 sm:mb-20 text-center">
        Choose Template
      </h1>
      <div className="flex items-center justify-start flex-wrap w-fit gap-x-[100px] gap-y-[50px] max-w-[1200px] mx-auto ">
        {templateList.map(({ id }, index) => (
          <Link
            to={`/resume/${id}`}
            key={id}
            className="w-[180px] sm:w-[213px] h-[250px] sm:h-[300px] flex-grow-0 flex-shrink-0  pdf-container  relative mx-auto rounded-lg overflow-hidden  hover:scale-[1.04] transition-all cursor-pointer m-0 hide-scrollbar shadow shadow-white flex justify-center items-center border-2 border-neutral-900  p-0.5"
          >
            <img
              src={templatePreviewList[index].templateImage}
              alt=" template-image"
              className="w-full  h-full object-contain"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChooseTemplate;
