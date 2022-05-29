import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./LuncbreakModule.routes";
import Title from "../../../core/ui/components/title/Title";

const LuncbreakModule: FunctionComponent = () => {
  return (
    <>
      <Title />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </>
  );
};

export default LuncbreakModule;
