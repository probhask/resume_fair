import { StyleSheet } from "@react-pdf/renderer";

import type { ResumeSettings, Template } from "../../types/resume";
import { resolveFamily } from "./fonts";

export const resolveAccent = (
  template: Template,
  settings: ResumeSettings
): string => {
  const c = settings.accentColor?.trim();
  if (c && c.toLowerCase() !== "#404040") return c;
  return template.accent;
};

export type ResumeStyleSheet = ReturnType<typeof buildStyles>;

export const buildStyles = (template: Template, settings: ResumeSettings) => {
  const compact = template.density === "compact";
  const base = (settings.fontSize || 10) - (compact ? 0.5 : 0);
  const lh = settings.lineHeight || 1.4;
  const margin = (settings.pageMargin || 14) * (compact ? 0.7 : 1);
  const gap = compact ? 3 : 5;
  const sectionGap = compact ? 9 : 15;

  const headingFont = resolveFamily(template.fontPair.heading);
  const bodyFont = resolveFamily(template.fontPair.body);
  const accent = resolveAccent(template, settings);
  const muted = "#525252";
  const ink = "#1f2937";

  const hs = template.headingStyle;

  return StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#ffffff",
      fontFamily: bodyFont,
      fontSize: base,
      lineHeight: lh,
      color: ink,
      padding:
        template.layout === "sidebar" || template.layout === "header-band"
          ? 0
          : margin,
    },
    // layout scaffolding -----------------------------------------------------
    column: { flexDirection: "column", flexGrow: 1, flexBasis: 0 },
    mainPad: { padding: margin },
    row: { flexDirection: "row" },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    rowWrap: { flexDirection: "row", flexWrap: "wrap" },

    twoColRow: { flexDirection: "row" },
    twoColLeft: {
      width: `${template.sidebar?.widthPct ?? 34}%`,
      paddingRight: compact ? 12 : 18,
      flexDirection: "column",
    },
    twoColRight: {
      flexGrow: 1,
      flexBasis: 0,
      paddingLeft: compact ? 12 : 18,
      borderLeftWidth: 0.75,
      borderColor: "#e5e7eb",
      flexDirection: "column",
    },
    sidebar: {
      width: `${template.sidebar?.widthPct ?? 34}%`,
      backgroundColor: template.sidebar?.bg ?? "#ffffff",
      color: template.sidebar?.text ?? ink,
      padding: margin,
      flexDirection: "column",
    },
    sidebarText: { color: template.sidebar?.text ?? ink },

    // header ---------------------------------------------------------------
    header: {
      marginBottom: compact ? 10 : 16,
      alignItems:
        hs === "smallcaps-center" || template.id === "1" ? "center" : "flex-start",
    },
    band: {
      backgroundColor: accent,
      color: "#ffffff",
      paddingVertical: compact ? 10 : 16,
      paddingHorizontal: margin,
      marginBottom: compact ? 10 : 16,
    },
    name: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: base + (template.layout === "header-band" ? 12 : 10),
      letterSpacing: hs === "smallcaps-center" ? 1.5 : 0.3,
      color:
        template.layout === "header-band"
          ? "#ffffff"
          : template.id === "7"
          ? accent
          : ink,
    },
    roleTitle: {
      fontFamily: headingFont,
      fontSize: base + 1,
      marginTop: 2,
      color:
        template.layout === "header-band"
          ? "#e5e7eb"
          : template.id === "3"
          ? accent
          : muted,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 4,
      color:
        template.layout === "header-band" ? "#e5e7eb" : muted,
      fontSize: base - 1,
    },
    contactItem: { marginRight: 10, marginBottom: 1 },
    sidebarContact: { flexDirection: "column", marginTop: 6 },
    sidebarContactItem: { marginBottom: 3, fontSize: base - 1 },

    photo: {
      width: 84,
      height: 84,
      borderRadius: 42,
      marginBottom: 10,
      objectFit: "cover",
      alignSelf: "flex-start",
    },

    // sections -----------------------------------------------------------
    section: { marginBottom: sectionGap },
    heading: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize:
        hs === "smallcaps-center" ? base - 0.5 : base + (hs === "band" ? 1 : 1.5),
      textTransform:
        hs === "smallcaps-center" || hs === "plain-caps" || hs === "rule"
          ? "uppercase"
          : undefined,
      letterSpacing:
        hs === "smallcaps-center" ? 2 : hs === "plain-caps" ? 1 : 0.5,
      marginBottom: gap + 1,
      color: hs === "band" ? "#ffffff" : hs === "rule" ? ink : accent,
      backgroundColor: hs === "band" ? accent : "transparent",
      paddingVertical: hs === "band" ? 3 : 0,
      paddingHorizontal: hs === "band" ? 5 : 0,
      borderBottomWidth: hs === "rule" ? 1 : hs === "smallcaps-center" ? 0.75 : 0,
      borderTopWidth: hs === "smallcaps-center" ? 0.75 : 0,
      borderColor: hs === "rule" ? "#9ca3af" : "#d1d5db",
      paddingBottom: hs === "rule" ? 2 : hs === "smallcaps-center" ? 3 : 0,
      textAlign: hs === "smallcaps-center" ? "center" : "left",
      alignSelf: hs === "smallcaps-center" ? "stretch" : "auto",
    },
    headingBar: {
      width: 26,
      height: 2,
      backgroundColor: accent,
      marginBottom: gap + 1,
      marginTop: -1,
    },
    headingInSidebar: {
      color: template.sidebar?.text ?? "#ffffff",
      borderColor: "rgba(255,255,255,0.4)",
    },

    // entries ----------------------------------------------------------
    entry: { marginBottom: gap + 2 },
    entryTitle: { fontFamily: headingFont, fontWeight: 600, fontSize: base + 0.5 },
    entryTitleFlex: { flexGrow: 1, flexShrink: 1, paddingRight: 8 },
    entryDateFixed: { flexShrink: 0, flexGrow: 0 },
    entrySubtitle: { color: muted, fontSize: base },
    entryDate: {
      color: muted,
      fontSize: base - 0.5,
      textAlign: template.dateAlign === "right" ? "right" : "left",
    },
    entryDateInline: { color: muted, fontSize: base - 0.5 },
    bulletRow: { flexDirection: "row", marginTop: 1 },
    bulletDot: { width: 8, fontSize: base },
    bodyText: { fontSize: base },
    para: { marginTop: 2, fontSize: base },

    // skills ---------------------------------------------------------
    skillsWrap: { flexDirection: "row", flexWrap: "wrap" },
    skillChip: {
      fontSize: base - 0.5,
      marginRight: 6,
      marginBottom: 4,
      paddingVertical: 1.5,
      paddingHorizontal: 5,
      borderRadius: 3,
      backgroundColor: "#f3f4f6",
      color: ink,
    },
    skillChipSidebar: {
      fontSize: base - 0.5,
      marginRight: 5,
      marginBottom: 4,
      paddingVertical: 1.5,
      paddingHorizontal: 5,
      borderRadius: 3,
      backgroundColor: "rgba(255,255,255,0.18)",
      color: template.sidebar?.text ?? "#ffffff",
    },
    skillList: { flexDirection: "column" },
    skillListItem: { fontSize: base, marginBottom: 2 },
  });
};
