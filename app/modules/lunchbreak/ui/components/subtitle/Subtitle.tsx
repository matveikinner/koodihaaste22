import { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import SubtitleProps from "./Subtitle.types";

const Subtitle: FunctionComponent<SubtitleProps> = ({ text }: SubtitleProps) => {
  return (
    <Typography
      data-testid="subtitle"
      variant="subtitle"
      align="center"
      sx={{ color: "customTheme.main", transform: "rotate(-3deg)" }}
    >
      {text}
    </Typography>
  );
};

export default Subtitle;
