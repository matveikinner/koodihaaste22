import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Container, Grid, Typography } from "@mui/material";
import { Title, Text, LanguageSelector } from "@core/ui/components";
import { StyledLink } from "./ErrorFallbackPage.styles";

const ErrorFallbackPage: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <LanguageSelector />
      <Title />
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Text
            text={t(["core:pages.errorFallback.text", "error:translations.notExistingKey"])}
            typographyProps={{ align: "center" }}
          />
          <StyledLink href="mailto:hello@matveikinner.com" sx={{ mx: "auto" }}>
            <Typography variant="textTheme" align="center" sx={{ color: "customTheme.main" }}>
              {t(["core:pages.errorFallback.contactInformation", "error:translations.notExistingKey"])}
            </Typography>
          </StyledLink>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorFallbackPage;
