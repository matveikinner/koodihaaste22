import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Box, Chip } from "@mui/material";
import { UnfoldMore as UnfoldMoreIcon, UnfoldLess as UnfoldLessIcon } from "@mui/icons-material";
import AccordionExpandIconProps from "./AccordionExpandIcon.types";

const AccordionExpandIcon: FunctionComponent<AccordionExpandIconProps> = ({
  votes,
  onClick,
}: AccordionExpandIconProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        ".Mui-expanded & > .collapsIconWrapper": {
          display: "none",
        },
        ".expandIconWrapper": {
          display: "none",
        },
        ".Mui-expanded & > .expandIconWrapper": {
          display: "flex",
        },
      }}
      onClick={onClick}
    >
      {votes > 0 && (
        <Chip
          label={t("lunchbreak:components.accordionExpandIcon.votes", { count: votes })}
          size="small"
          sx={{ backgroundColor: "customTheme.highlightGreen", mr: 2 }}
        />
      )}
      <Box className="expandIconWrapper" sx={{ display: "flex", alignItems: "center" }}>
        <UnfoldLessIcon />
      </Box>
      <Box className="collapsIconWrapper" sx={{ display: "flex", alignItems: "center" }}>
        <UnfoldMoreIcon />
      </Box>
    </Box>
  );
};

export default AccordionExpandIcon;
