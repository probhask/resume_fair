import { DefaultResumeData } from "@constants/DefaultResumeData";
import { Link } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import ResumePDF from "@components/ResumePDF/ResumePDF";
import templateList from "@constants/Templates";

const ChooseTemplate = () => {
  return (
    <div className="w-full h-svh  py-8 bg-black flex flex-col item-center">
      <h1 className=" text-pink-700 font-extrabold text-2xl mb-5 text-center">
        Choose Template
      </h1>
      <div className="flex items-center justify-start flex-wrap gap-5 w-full max-w-[1200px]">
        {templateList.map(({ id, template }) => (
          <Link
            to={`/resume/${id}`}
            key={id}
            className="w-[217px] h-[305px] pdf-container  relative mx-auto rounded-lg overflow-hidden hover:scale-[1.04] transition-all cursor-pointer m-0"
          >
            <PDFViewer
              style={{
                width: "201px",
                height: "284px",
                backgroundColor: "inherit",
                overflow: "hidden",
                position: "relative",
              }}
              showToolbar={false}
            >
              <ResumePDF
                fontSize={10}
                pageMargin={14}
                template={template}
                data={DefaultResumeData}
              />
            </PDFViewer>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-transparent"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChooseTemplate;
