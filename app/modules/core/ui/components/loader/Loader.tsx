import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import { selectLoaderState } from "../../adapters/redux/loader/loader.selectors";

const Loader: FunctionComponent = () => {
  const loader = useSelector(selectLoaderState);

  if (loader.isActive) {
    return (
      <LinearProgress
        data-testid="global-loader"
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          backgroundColor: `rgba(${theme.palette.customTheme.mainRGB || ""}, 0.5)`,
          "& .MuiLinearProgress-bar": {
            backgroundColor: "customTheme.main",
          },
        })}
      />
    );
  }
  return null;
};

export default Loader;
