// input field types
type FormInputType = {
  title: string;
  fieldName: string;
  isTextArea?: boolean;
  placeholder?: string;
  isLink?: boolean;
  isMail?: boolean;
};
type OtherFormInputType = FormInputType & { hidden: boolean };
// section types
type PersonalDetailFields = {
  name: string;
  address?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
};
type ObjectiveFields = {
  objective: string;
};
type EducationFields = {
  id: string;
  course: string;
  institution: string;
  score?: string;
  year?: string;
};
type ExperienceFields = {
  id: string;
  companyName: string;
  jobTitle: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};
type SkillsFields = {
  id: string;
  skill: string;
};
type ProjectsFields = {
  id: string;
  projectTitle: string;
  description?: string;
};
type LanguagesFields = {
  id: string;
  languageTitle: string;
};
type ReferencesFields = {
  id: string;
  referenceName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  phone?: string;
};

// local storage key type
type LocalStorageKey =
  | "personalDetails"
  | "objective"
  | "education"
  | "experience"
  | "skills"
  | "projects"
  | "languages"
  | "references"
  | "fields_personalDetails"
  | "otherFields_personalDetails";

type LocalStorageDataMap = {
  personalDetails: PersonalDetailFields[];
  fields_personalDetails?: FormInputType[];
  otherFields_personalDetails?: OtherFormInputType[];
  objective: ObjectiveFields[];
  education: EducationFields[];
  experience: ExperienceFields[];
  skills: SkillsFields[];
  projects: ProjectsFields[];
  languages: LanguagesFields[];
  references: ReferencesFields[];
};
type LocalStorageSection<K extends LocalStorageKey> = {
  section: K;
  dataType: LocalStorageDataMap[K];
};

type TemplateStyle = {
  sectionHeading: {
    text: string;
    bg: string;
  };
  skillFlexDirection: "column" | "row" | "column-reverse" | "row-reverse";
  personalDetail: {
    align:
      | "center"
      | "flex-start"
      | "flex-end"
      | "stretch"
      | "baseline"
      | undefined;
  };
};

type TemplateList = {
  id: string;
  template: TemplateStyle;
};
