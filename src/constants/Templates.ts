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

export const templatePreviewList: { id: string; templateImage: string }[] = [
  {
    id: "1",
    templateImage: "/template/template1.png",
  },
  {
    id: "2",
    templateImage: "/template/template2.png",
  },
];
export default templateList;
