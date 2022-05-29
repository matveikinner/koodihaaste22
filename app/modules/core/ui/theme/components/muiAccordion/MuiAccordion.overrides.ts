import { ThemeOptions } from "@mui/material";

const muiAccordionOverrides: ThemeOptions["components"] = {
  MuiContainer: {
    styleOverrides: {
      root: {
        "&:before": {
          borderRadius: 2,
        },
      },
    },
  },
};

export default muiAccordionOverrides;
