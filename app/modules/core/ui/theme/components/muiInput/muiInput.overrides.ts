import { ThemeOptions } from "@mui/material";

const muiInputOverrides: ThemeOptions["components"] = {
  MuiInput: {
    styleOverrides: {
      root: {
        "&:before": {
          borderColor: "transparent",
        },
        "&:after": {
          borderColor: "#F6416C",
        },
      },
      underline: {
        "&&:hover": {
          "&:before": {
            borderColor: "#F6416C",
          },
          "&:after": {
            borderColor: "#F6416C",
          },
        },
        "&:focus-within": {
          "&:after": {
            borderColor: "#F6416C",
          },
        },
      },
    },
  },
};

export default muiInputOverrides;
