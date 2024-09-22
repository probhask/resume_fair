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

// section blue bg with left-aligned text
export const template3: TemplateStyle = {
  personalDetail: {
    align: "flex-start",
  },
  sectionHeading: {
    bg: "lightblue",
    text: "darkblue",
  },
  skillFlexDirection: "row",
};

// section dark bg with white text and center-aligned text
export const template4: TemplateStyle = {
  personalDetail: {
    align: "center",
  },
  sectionHeading: {
    bg: "black",
    text: "white",
  },
  skillFlexDirection: "column",
};

// section light bg with bold text
export const template5: TemplateStyle = {
  personalDetail: {
    align: "flex-end",
  },
  sectionHeading: {
    bg: "lightgray",
    text: "darkgray",
  },
  skillFlexDirection: "row",
};

// section dark bg with pink text and center-aligned text
export const template6: TemplateStyle = {
  personalDetail: {
    align: "center",
  },
  sectionHeading: {
    bg: "#f00b51",
    text: "white",
  },
  skillFlexDirection: "row",
};

const templateList: TemplateList[] = [
  { id: "1", template: defaultTemplate },
  { id: "2", template: template2 },
  { id: "3", template: template3 },
  { id: "4", template: template4 },
  { id: "5", template: template5 },
  { id: "6", template: template6 },
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
  {
    id: "3",
    templateImage: "/template/template3.png",
  },
  {
    id: "4",
    templateImage: "/template/template4.png",
  },
  {
    id: "5",
    templateImage: "/template/template5.png",
  },
  {
    id: "6",
    templateImage: "/template/template6.png",
  },
];

export default templateList;
