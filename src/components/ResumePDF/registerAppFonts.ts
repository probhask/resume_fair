import { Font } from "@react-pdf/renderer";

import InterRegular from "../../assets/fonts/Inter-Regular.ttf";
import InterSemiBold from "../../assets/fonts/Inter-SemiBold.ttf";
import InterBold from "../../assets/fonts/Inter-Bold.ttf";
import SourceSerifRegular from "../../assets/fonts/SourceSerif4-Regular.ttf";
import SourceSerifSemiBold from "../../assets/fonts/SourceSerif4-SemiBold.ttf";
import SourceSerifBold from "../../assets/fonts/SourceSerif4-Bold.ttf";
import RobotoSlabRegular from "../../assets/fonts/RobotoSlab-Regular.ttf";
import RobotoSlabBold from "../../assets/fonts/RobotoSlab-Bold.ttf";

let done = false;

/** Register the bundled TTFs once. Safe to call repeatedly. */
export const registerAppFonts = () => {
  if (done) return;
  done = true;
  try {
    Font.register({
      family: "Inter",
      fonts: [
        { src: InterRegular, fontWeight: 400 },
        { src: InterSemiBold, fontWeight: 600 },
        { src: InterBold, fontWeight: 700 },
      ],
    });
    Font.register({
      family: "Source Serif 4",
      fonts: [
        { src: SourceSerifRegular, fontWeight: 400 },
        { src: SourceSerifSemiBold, fontWeight: 600 },
        { src: SourceSerifBold, fontWeight: 700 },
      ],
    });
    Font.register({
      family: "Roboto Slab",
      fonts: [
        { src: RobotoSlabRegular, fontWeight: 400 },
        { src: RobotoSlabBold, fontWeight: 700 },
      ],
    });
    Font.registerHyphenationCallback((word) => [word]);
  } catch (err) {
    console.error("resumefair: font registration failed, using built-ins", err);
  }
};
