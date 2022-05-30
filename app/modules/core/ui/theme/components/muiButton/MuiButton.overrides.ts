import { ThemeOptions } from "@mui/material";

const muiButtonOverrides: ThemeOptions["components"] = {
  MuiButton: {
    styleOverrides: {
      iconSizeSmall: {
        "& > *:first-of-type": {
          fontSize: 16,
        },
      },
    },
  },
};

export default muiButtonOverrides;
