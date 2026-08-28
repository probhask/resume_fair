import { View } from "@react-pdf/renderer";

import type { Resume, ResumeSectionKey, Template } from "../../types/resume";
import type { ResumeStyleSheet } from "./buildStyles";
import {
  PersonalHeader,
  renderCustomSections,
  renderSection,
} from "./sections";

interface LayoutProps {
  resume: Resume;
  s: ResumeStyleSheet;
  template: Template;
}

const orderedKeys = (resume: Resume): ResumeSectionKey[] =>
  resume.sectionOrder.filter((k) => k !== "personalDetails");

const splitSections = (resume: Resume, template: Template) => {
  const inSidebar = new Set(template.sidebar?.sections ?? []);
  const keys = orderedKeys(resume);
  return {
    sidebar: keys.filter((k) => inSidebar.has(k)),
    main: keys.filter((k) => !inSidebar.has(k)),
  };
};

// --- single column -------------------------------------------------------

export const SingleColumnLayout = ({ resume, s, template }: LayoutProps) => (
  <View style={s.column}>
    <PersonalHeader resume={resume} s={s} template={template} />
    {orderedKeys(resume).map((k) => renderSection(k, resume, s, template))}
    {renderCustomSections(resume, s, template)}
  </View>
);

// --- header band (Executive) --------------------------------------------

export const HeaderBandLayout = ({ resume, s, template }: LayoutProps) => (
  <View style={s.column}>
    <PersonalHeader resume={resume} s={s} template={template} mode="band" />
    <View style={s.mainPad}>
      {orderedKeys(resume).map((k) => renderSection(k, resume, s, template))}
      {renderCustomSections(resume, s, template)}
    </View>
  </View>
);

// --- two column (Modern / Deedy) ---------------------------------------

export const TwoColumnLayout = ({ resume, s, template }: LayoutProps) => {
  const { sidebar, main } = splitSections(resume, template);
  return (
    <View style={s.column}>
      <PersonalHeader resume={resume} s={s} template={template} />
      <View style={s.twoColRow}>
        <View style={s.twoColLeft}>
          {sidebar.map((k) => renderSection(k, resume, s, template))}
        </View>
        <View style={s.twoColRight}>
          {main.map((k) => renderSection(k, resume, s, template))}
          {renderCustomSections(resume, s, template)}
        </View>
      </View>
    </View>
  );
};

// --- colored sidebar (Cascade) ---------------------------------------

export const SidebarLayout = ({ resume, s, template }: LayoutProps) => {
  const { sidebar, main } = splitSections(resume, template);
  return (
    <>
      <View style={s.sidebar}>
        <PersonalHeader
          resume={resume}
          s={s}
          template={template}
          mode="sidebar"
        />
        {sidebar.map((k) =>
          renderSection(k, resume, s, template, { inSidebar: true })
        )}
      </View>
      <View style={[s.column, s.mainPad]}>
        {main.map((k) => renderSection(k, resume, s, template))}
        {renderCustomSections(resume, s, template)}
      </View>
    </>
  );
};

export const pickLayout = (template: Template) => {
  switch (template.layout) {
    case "header-band":
      return HeaderBandLayout;
    case "two-column":
      return TwoColumnLayout;
    case "sidebar":
      return SidebarLayout;
    default:
      return SingleColumnLayout;
  }
};
