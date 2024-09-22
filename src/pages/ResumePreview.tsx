import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import templateList, { defaultTemplate } from "@constants/Templates";
import { useEffect, useState } from "react";

import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import { Link } from "react-router-dom";
import ResumePDF from "@components/ResumePDF/ResumePDF";
import useLocalStorage from "@hooks/useLocalStorage";
import { useParams } from "react-router-dom";

const ResumePreview = () => {
  const [fontSize] = useState<number>(10);
  const [pageMargin] = useState<number>(14);
  const [template, setTemplate] = useState<TemplateStyle>(defaultTemplate);

  const { templateId } = useParams();
  useEffect(() => {
    if (templateId) {
      const template = templateList.find(
        (template) => template?.id === templateId
      );
      setTemplate(template ? template?.template : defaultTemplate);
    }
  }, [templateId]);

  const { getLocalStorage } = useLocalStorage();
  const storedData = getLocalStorage();

  return (
    <div
      className="resume-preview-container bg-black cursor-pointer min-h-svh h-auto overflow-auto text-white max-w-[1200px] mx-auto
    "
    >
      <div className="flex flex-col  items-center gap-y-2 py-3 h-full w-full">
        <div className="sm:hidden">
          {/* logo */}
          <div className="w-full min-w-[150px] sm:min-w-[400px] h-[200px] max-h-[300px] sm:h-[400px] sm:max-h-[400px] overflow-hidden">
            <img
              src="/logo-color.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
          {/* small screen msg */}
          <div className="text-lg px-2 mx-auto text-center my-5 text-[#f00b51]">
            <p>Your PDF is ready to download. Click the button below</p>
          </div>
        </div>
        {/* buttons */}
        <div className="flex items-center justify-center gap-x-10 gap-y-5 flex-wrap [&>*]:text-white [&>*]:text-center [&>*]:px-4 [&>*]:py-2 [&>*]:rounded [&>*]:w-52">
          <PDFDownloadLink
            document={
              <ResumePDF
                fontSize={fontSize}
                pageMargin={pageMargin}
                template={template}
                data={storedData}
              />
            }
            fileName="resume.pdf"
            className={` bg-blue-600 active:scale-90 transition-all `}
          >
            {({ loading }) =>
              loading ? "Generating PDF..." : "Download Resume PDF"
            }
          </PDFDownloadLink>
          <Link
            to={"/forms"}
            className=" bg-green-700 active:scale-90 transition-all "
          >
            Edit
          </Link>
        </div>

        {/* resume preview */}
        <ErrorBoundary>
          <div
            key={window?.innerWidth}
            className="hidden sm:block w-[99%] max-w-[217mm] h-[100vh] overflow-hidden"
          >
            <PDFViewer
              key={window?.innerWidth}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "inherit",
              }}
              showToolbar={false}
            >
              <ResumePDF
                fontSize={fontSize}
                pageMargin={pageMargin}
                template={template}
                data={storedData}
              />
            </PDFViewer>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};
export default ResumePreview;
