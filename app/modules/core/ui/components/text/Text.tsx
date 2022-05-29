import { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import TextProps from "./Text.types";

const Text: FunctionComponent<TextProps> = ({ text, typographyProps, sx }: TextProps) => {
  return (
    <Typography variant="text" sx={{ color: "customTheme.neutral", ...sx }} {...typographyProps}>
      {text}
    </Typography>
  );
};

export default Text;
