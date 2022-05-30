import { CSSProperties } from "react";
import "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title: CSSProperties;
    subtitle: CSSProperties;
    link: CSSProperties;
    text: CSSProperties;
    textTheme: CSSProperties;
    small: CSSProperties;
  }

  interface TypographyVariantsOptions {
    title?: CSSProperties;
    subtitle: CSSProperties;
    link?: CSSProperties;
    text?: CSSProperties;
    textTheme?: CSSProperties;
    small?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
    subtitle: true;
    link: true;
    text: true;
    textTheme: true;
    small: true;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    customTheme: Palette["primary"];
  }

  interface PaletteOptions {
    customTheme: PaletteOptions["primary"];
  }

  interface PaletteColor {
    mainRGB?: string;
    neutral?: string;
    highlightGreen?: string;
    highlightGreenAlt?: string;
    highlightRed?: string;
    highlightRedAlt?: string;
  }

  interface SimplePaletteColorOptions {
    mainRGB: string;
    neutral?: string;
    highlightGreen?: string;
    highlightGreenAlt?: string;
    highlightRed?: string;
    highlightRedAlt?: string;
  }
}
