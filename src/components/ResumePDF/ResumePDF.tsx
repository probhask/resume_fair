import { Document, Page } from "@react-pdf/renderer";

import type { Resume } from "../../types/resume";
import { DEFAULT_SETTINGS } from "../../types/resume";
import { buildStyles } from "./buildStyles";
import { getTemplate } from "../../constants/Templates";
import { pickLayout } from "./layouts";
import { registerAppFonts } from "./registerAppFonts";

registerAppFonts();

const ResumePDF = ({ resume }: { resume: Resume }) => {
  const template = getTemplate(resume.templateId);
  const settings = { ...DEFAULT_SETTINGS, ...resume.settings };
  const s = buildStyles(template, settings);
  const Layout = pickLayout(template);

  return (
    <Document title={resume.name} author={resume.personalDetails?.[0]?.name}>
      <Page size="A4" style={s.page}>
        <Layout resume={resume} s={s} template={template} />
      </Page>
    </Document>
  );
};

export default ResumePDF;
