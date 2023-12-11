import { Inter, Dosis, Josefin_Sans, Ubuntu } from "next/font/google";

export const fontInter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const fontJosefinSans = Josefin_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const fontDosis = Dosis({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const fontUbuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
