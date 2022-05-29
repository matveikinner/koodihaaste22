import { Fragment, FunctionComponent, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { AvailableLocaleLanguageType, availableLocaleOptions } from "@core/ui/frameworks/i18next/i18next.config";

const LanguageSelector: FunctionComponent = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (locale: AvailableLocaleLanguageType) => (event: MouseEvent<HTMLParagraphElement>) =>
    void i18n.changeLanguage(locale);

  return (
    <Box
      data-testid="global-languageselector"
      sx={{
        display: "flex",
        alignItems: "center",
        "p:nth-of-type(odd)": {
          mr: "4px",
        },
        "p:nth-of-type(even)": {
          ml: "4px",
        },
      }}
    >
      {availableLocaleOptions.map(({ locale, localeShort }, index) => (
        <Fragment key={locale}>
          <Box component="span" sx={{ color: "customTheme.neutral" }}>
            {index > 0 ? " | " : ""}
          </Box>
          <Box
            component="p"
            sx={{
              display: "flex",
              color: i18n.language === locale ? "customTheme.main" : "customTheme.neutral",
              cursor: "pointer",
            }}
            onClick={changeLanguage(locale)}
          >
            <Typography variant="caption">{localeShort.toUpperCase()}</Typography>
          </Box>
        </Fragment>
      ))}
    </Box>
  );
};

export default LanguageSelector;
