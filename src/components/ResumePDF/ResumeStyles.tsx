import { StyleSheet } from "@react-pdf/renderer";
import { defaultTemplate } from "@constants/Templates";

type StyleProps = {
  fontSize: number;
  pageMargin: number;
  template: TemplateStyle;
};

const ResumeStyles = ({
  fontSize = 10,
  pageMargin = 14,
  template = defaultTemplate,
}: StyleProps) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: pageMargin,
      backgroundColor: "white",
    },
    flex_row: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 10,
    },
    flex_row_between: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    // bullet points
    bulletContent: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 4,
    },
    bulletPoint: {
      fontSize: fontSize,
      fontWeight: 700,
    },
    bulletContentSibling: {
      paddingLeft: 8,
    },
    // time
    time: {
      flexDirection: "row",
      columnGap: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    // name
    name: {
      fontSize: fontSize + 6,
      fontWeight: 900,
      textTransform: "capitalize",
      marginBottom: 5,
    },
    // section
    section: {
      marginBottom: 15,
    },
    sectionData: {
      paddingHorizontal: 4,
      rowGap: 5,
    },
    sectionHeading: {
      fontSize:
        template.sectionHeading.bg === "white" ? fontSize + 3 : fontSize + 2,
      fontWeight: 800,
      marginBottom: 5,
      textTransform: "capitalize",
      paddingHorizontal: 4,
      paddingVertical: 2,
      backgroundColor: template.sectionHeading.bg,
      color: template.sectionHeading.text,
    },
    subHeading: {
      fontSize: fontSize + 1,
      marginBottom: 2,
      fontWeight: 700,
    },
    // text
    text: {
      fontSize: fontSize,
      //   marginBottom: 2,
      color: "#404040",
    },
    //personal details
    personalDetail: {
      alignItems: template.personalDetail.align,
      marginBottom: 20,
      paddingHorizontal: 4,
    },
    otherDetails: {
      alignItems: "center",
      textAlign: "center",
      rowGap: 2,
    },
    // skill:
    skillsData: {
      flexDirection: template.skillFlexDirection,
      flexWrap: "wrap",
      width: "100%",
      rowGap: 5,
    },
    skillsItem: {
      width: "20%",
      minWidth: "20%",
    },
  });
  return styles;
};

export default ResumeStyles;
