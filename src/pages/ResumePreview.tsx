import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import templateList, { defaultTemplate } from "@constants/Templates";
import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import ResumePDF from "@components/ResumePDF/ResumePDF";
import useLocalStorage from "@hooks/useLocalStorage";
import { useParams } from "react-router-dom";

const ResumePreview = () => {
  const [fontSize] = useState<number>(10);
  const [pageMargin] = useState<number>(14);
  const [template, setTemplate] = useState<TemplateStyle>(defaultTemplate);

  const { templateID } = useParams();
  useEffect(() => {
    const template = templateList.find(
      (template) => template.id === templateID
    );
    setTemplate(template ? template.template : defaultTemplate);
  }, [templateID]);

  const [, setScale] = useState(1);
  const [, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const { getLocalStorage } = useLocalStorage();
  const storedData = getLocalStorage();

  const pdfRef = useRef<HTMLDivElement>(null);

  const updateScale = () => {
    const a4Width = 210;
    const a4Height = 297;

    const a4WidthPx = (a4Width / 25.4) * 96;
    const a4HeightPx = (a4Height / 25.4) * 96;

    const viewPortWidth = window.innerWidth;
    const viewPortHeight = window.innerHeight;

    const scaleWidth = viewPortWidth / a4WidthPx;
    const scaleHeight = viewPortHeight / a4HeightPx;

    setScale(Math.min(scaleWidth, scaleHeight));
    setScaleX(scaleWidth);
    setScaleY(scaleHeight);
  };

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <div
      className="resume-preview-container bg-black cursor-pointer h-svh overflow-y-auto text-white max-w-[1200px]
    "
    >
      <div className="flex flex-col  items-center gap-y-2 py-3 h-full w-full">
        <div className="sm:hidden">
          {/* logo */}
          <div>
            <img
              src="/logo-color.png"
              alt="logo"
              className="w-full min-w-[150px] h-[200px] max-h-[200px]"
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
        <div
          key={window.innerWidth}
          className="hidden sm:block w-[99%] max-w-[217mm] h-[100vh] overflow-hidden"
          ref={pdfRef}
        >
          <PDFViewer
            key={
              scaleY +
              fontSize +
              pageMargin +
              (templateID ? templateID : "1") +
              window.innerWidth
            }
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
      </div>
    </div>
  );
};
export default ResumePreview;
