import { FunctionComponent, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Container } from "@mui/material";
import routes from "./CoreModule.routes";
import { Loader, Toast, LanguageSelector } from "../components";

/**
 * Top level Core Module which wraps all other application module routes
 *
 * @returns FunctionComponent
 */
const CoreModule: FunctionComponent = () => {
  return (
    <Container maxWidth="lg">
      <Loader />
      <LanguageSelector />
      <BrowserRouter>
        <Routes>
          {routes.map(({ element, path }) => (
            <Route key={uuid()} element={<Suspense>{element}</Suspense>} path={path} />
          ))}
        </Routes>
      </BrowserRouter>
      <Toast />
    </Container>
  );
};

export default CoreModule;
