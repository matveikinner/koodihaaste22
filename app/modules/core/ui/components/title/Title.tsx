import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@mui/material";

const Title: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography
          variant="title"
          align="center"
          sx={(theme) => ({
            color: "customTheme.main",
            transform: "rotate(-3deg)",
            pt: 8,
            [theme.breakpoints.down("sm")]: {
              pt: 4,
            },
          })}
        >
          Food is Good
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pb: 8,
          [theme.breakpoints.down("sm")]: {
            pb: 4,
          },
        })}
      >
        <Typography variant="link" align="center" sx={{ color: "customTheme.neutral" }}>
          {t(["core:components.title.text", "error:translations.notExistingKey"])}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Title;
