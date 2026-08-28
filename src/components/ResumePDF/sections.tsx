import { Image, Text, View } from "@react-pdf/renderer";

import type {
  CustomSection,
  Resume,
  ResumeSectionKey,
  Template,
} from "../../types/resume";
import type { ResumeStyleSheet } from "./buildStyles";

const DEFAULT_TITLES: Record<ResumeSectionKey, string> = {
  personalDetails: "",
  objective: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  languages: "Languages",
  references: "References",
};

export const sectionTitle = (
  resume: Resume,
  key: string,
  fallback?: string
): string =>
  resume.sectionTitles[key] ??
  fallback ??
  DEFAULT_TITLES[key as ResumeSectionKey] ??
  key;

// ---------------------------------------------------------------------------

export const SectionHeading = ({
  title,
  s,
  template,
  inSidebar,
}: {
  title: string;
  s: ResumeStyleSheet;
  template: Template;
  inSidebar?: boolean;
}) => (
  <View>
    <Text style={[s.heading, inSidebar ? s.headingInSidebar : {}]}>{title}</Text>
    {template.headingStyle === "accent-underline" && !inSidebar && (
      <View style={s.headingBar} />
    )}
  </View>
);

const DateText = ({
  start,
  end,
  s,
  inline,
}: {
  start?: string;
  end?: string;
  s: ResumeStyleSheet;
  inline?: boolean;
}) => {
  if (!start && !end) return null;
  const label = [start, end].filter(Boolean).join(" – ");
  return <Text style={inline ? s.entryDateInline : s.entryDate}>{label}</Text>;
};

// --- personal header -------------------------------------------------------

export const PersonalHeader = ({
  resume,
  s,
  template,
  mode = "default",
}: {
  resume: Resume;
  s: ResumeStyleSheet;
  template: Template;
  mode?: "default" | "band" | "sidebar";
}) => {
  const p = resume.personalDetails[0];
  if (!p) return null;
  const contact = [p.phone, p.email, p.address, p.linkedin, p.github].filter(
    Boolean
  ) as string[];

  if (mode === "sidebar") {
    return (
      <View>
        {template.showPhoto && p.photo ? (
          <Image style={s.photo} src={p.photo} />
        ) : null}
        <Text style={[s.name, s.sidebarText]}>{p.name}</Text>
        {p.title ? (
          <Text style={[s.roleTitle, s.sidebarText]}>{p.title}</Text>
        ) : null}
        <View style={s.sidebarContact}>
          {contact.map((c, i) => (
            <Text key={i} style={[s.sidebarContactItem, s.sidebarText]}>
              {c}
            </Text>
          ))}
        </View>
      </View>
    );
  }

  const wrap = mode === "band" ? s.band : s.header;
  return (
    <View style={wrap}>
      <Text style={s.name}>{p.name}</Text>
      {p.title ? <Text style={s.roleTitle}>{p.title}</Text> : null}
      <View style={s.contactRow}>
        {contact.map((c, i) => (
          <Text key={i} style={s.contactItem}>
            {c}
          </Text>
        ))}
      </View>
    </View>
  );
};

// --- section bodies ------------------------------------------------------

const Objective = ({ resume, s }: BodyProps) => (
  <Text style={s.bodyText}>{resume.objective[0]?.objective}</Text>
);

const Experience = ({ resume, s, template }: BodyProps) => (
  <View>
    {resume.experience.map((e) => (
      <View key={e.id} style={s.entry} wrap={false}>
        <View style={s.rowBetween}>
          <Text style={[s.entryTitle, s.entryTitleFlex]}>
            {e.companyName}
            {e.jobTitle ? ` — ${e.jobTitle}` : ""}
          </Text>
          {template.dateAlign === "right" && (e.startDate || e.endDate) ? (
            <View style={s.entryDateFixed}>
              <DateText start={e.startDate} end={e.endDate} s={s} />
            </View>
          ) : null}
        </View>
        {template.dateAlign === "inline" && (
          <DateText start={e.startDate} end={e.endDate} s={s} inline />
        )}
        {e.description ? <Text style={s.para}>{e.description}</Text> : null}
      </View>
    ))}
  </View>
);

const Education = ({ resume, s, template, inSidebar }: BodyProps) => {
  const stacked = inSidebar || template.layout === "two-column";
  return (
    <View>
      {resume.education.map((ed) => (
        <View key={ed.id} style={s.entry} wrap={false}>
          {stacked ? (
            <>
              <Text style={[s.entryTitle, inSidebar ? s.sidebarText : {}]}>
                {ed.institution}
              </Text>
              {ed.year ? (
                <Text style={[s.entryDateInline, inSidebar ? s.sidebarText : {}]}>
                  {ed.year}
                </Text>
              ) : null}
            </>
          ) : (
            <View style={s.rowBetween}>
              <Text style={[s.entryTitle, s.entryTitleFlex]}>
                {ed.institution}
              </Text>
              {ed.year ? (
                <Text style={[s.entryDate, s.entryDateFixed]}>{ed.year}</Text>
              ) : null}
            </View>
          )}
          <Text style={[s.entrySubtitle, inSidebar ? s.sidebarText : {}]}>
            {[ed.course, ed.score].filter(Boolean).join(" · ")}
          </Text>
        </View>
      ))}
    </View>
  );
};

const Skills = ({ resume, s, template, inSidebar }: BodyProps) => {
  const list = resume.skills.map((sk) => sk.skill).filter(Boolean);
  if (template.layout === "single" && template.density !== "compact" && !inSidebar) {
    return (
      <View style={s.skillsWrap}>
        {list.map((sk, i) => (
          <Text key={i} style={s.skillChip}>
            {sk}
          </Text>
        ))}
      </View>
    );
  }
  return (
    <View style={s.skillsWrap}>
      {list.map((sk, i) => (
        <Text key={i} style={inSidebar ? s.skillChipSidebar : s.skillChip}>
          {sk}
        </Text>
      ))}
    </View>
  );
};

const Projects = ({ resume, s }: BodyProps) => (
  <View>
    {resume.projects.map((p) => (
      <View key={p.id} style={s.entry} wrap={false}>
        <Text style={s.entryTitle}>{p.projectTitle}</Text>
        {p.description ? <Text style={s.para}>{p.description}</Text> : null}
      </View>
    ))}
  </View>
);

const Languages = ({ resume, s, inSidebar }: BodyProps) => (
  <View style={s.skillList}>
    {resume.languages.map((l) => (
      <Text
        key={l.id}
        style={[s.skillListItem, inSidebar ? s.sidebarText : {}]}
      >
        {l.languageTitle}
      </Text>
    ))}
  </View>
);

const References = ({ resume, s, inSidebar }: BodyProps) => (
  <View>
    {resume.references.map((r) => (
      <View key={r.id} style={s.entry} wrap={false}>
        <Text style={[s.entryTitle, inSidebar ? s.sidebarText : {}]}>
          {r.referenceName}
        </Text>
        <Text style={[s.entrySubtitle, inSidebar ? s.sidebarText : {}]}>
          {[r.jobTitle, r.companyName].filter(Boolean).join(", ")}
        </Text>
        <Text style={[s.entrySubtitle, inSidebar ? s.sidebarText : {}]}>
          {[r.email, r.phone].filter(Boolean).join(" · ")}
        </Text>
      </View>
    ))}
  </View>
);

const CustomBody = ({
  section,
  s,
}: {
  section: CustomSection;
  s: ResumeStyleSheet;
}) => (
  <View>
    {section.items.map((it) => (
      <View key={it.id} style={s.entry} wrap={false}>
        {it.heading || it.subheading || it.date ? (
          <View style={s.rowBetween}>
            <Text style={[s.entryTitle, s.entryTitleFlex]}>
              {it.heading}
              {it.subheading ? ` — ${it.subheading}` : ""}
            </Text>
            {it.date ? (
              <Text style={[s.entryDate, s.entryDateFixed]}>{it.date}</Text>
            ) : null}
          </View>
        ) : null}
        {it.description ? <Text style={s.para}>{it.description}</Text> : null}
      </View>
    ))}
  </View>
);

interface BodyProps {
  resume: Resume;
  s: ResumeStyleSheet;
  template: Template;
  inSidebar?: boolean;
}

const BODY: Record<
  Exclude<ResumeSectionKey, "personalDetails">,
  (p: BodyProps) => JSX.Element
> = {
  objective: Objective,
  experience: Experience,
  education: Education,
  skills: Skills,
  projects: Projects,
  languages: Languages,
  references: References,
};

const hasContent = (resume: Resume, key: ResumeSectionKey): boolean => {
  const v = resume[key] as unknown[];
  if (key === "objective") return Boolean(resume.objective[0]?.objective?.trim());
  return Array.isArray(v) && v.length > 0;
};

/** Render one built-in section (heading + body) or null if empty/hidden. */
export const renderSection = (
  key: ResumeSectionKey,
  resume: Resume,
  s: ResumeStyleSheet,
  template: Template,
  opts: { inSidebar?: boolean } = {}
): JSX.Element | null => {
  if (key === "personalDetails") return null;
  if (resume.hiddenSections.includes(key)) return null;
  if (!hasContent(resume, key)) return null;
  const Body = BODY[key];
  return (
    <View key={key} style={s.section}>
      <SectionHeading
        title={sectionTitle(resume, key)}
        s={s}
        template={template}
        inSidebar={opts.inSidebar}
      />
      <Body resume={resume} s={s} template={template} inSidebar={opts.inSidebar} />
    </View>
  );
};

export const renderCustomSections = (
  resume: Resume,
  s: ResumeStyleSheet,
  template: Template
): JSX.Element[] =>
  resume.customSections
    .filter((sec) => sec.items.length > 0)
    .map((sec) => (
      <View key={sec.id} style={s.section}>
        <SectionHeading
          title={sectionTitle(resume, sec.id, sec.title)}
          s={s}
          template={template}
        />
        <CustomBody section={sec} s={s} />
      </View>
    ));
