import { FunctionComponent, ReactNode } from "react";
import { Provider } from "react-redux";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import store from "../frameworks/redux/redux.config";
import customTheme from "../theme";
import { ErrorFallbackPage } from "../pages";

/**
 * Top level application provider component
 *
 * @param {ReactNode} children
 * @returns FunctionComponent
 */
const CoreProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const theme = createTheme(customTheme);

  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallbackPage}>{children}</ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default CoreProvider;
