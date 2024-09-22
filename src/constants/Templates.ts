export const defaultTemplate: TemplateStyle = {
  personalDetail: {
    align: "center",
  },
  sectionHeading: {
    bg: "white",
    text: "black",
  },
  skillFlexDirection: "column",
};
// section gray bg
export const template2: TemplateStyle = {
  personalDetail: {
    align: "center",
  },
  sectionHeading: {
    bg: "gray",
    text: "white",
  },
  skillFlexDirection: "row",
};

const templateList: TemplateList[] = [
  { id: "1", template: defaultTemplate },
  { id: "2", template: template2 },
];
export default templateList;
