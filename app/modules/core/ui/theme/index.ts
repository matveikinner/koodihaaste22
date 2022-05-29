import { ThemeOptions } from "@mui/material";
import globalTypography from "./typography/global.typography";
import globalPalette from "./palette/global.palette";
import { muiAccordionOverrides, muiButtonOverrides, muiInputOverrides } from "./components";

const customTheme: ThemeOptions = {
  typography: globalTypography,
  palette: globalPalette,
  components: {
    ...muiButtonOverrides,
    ...muiInputOverrides,
    ...muiAccordionOverrides,
  },
};

export default customTheme;
