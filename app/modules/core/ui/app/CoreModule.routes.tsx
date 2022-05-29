import { lazy } from "react";
import { RouteProps } from "react-router-dom";

const LunchbrekaModule = lazy(() => import("@lunchbreak/ui/app/LunchbreakModule"));

export enum CoreModuleRoutes {
  LUNCHBREAK_MODULE = "/*",
}

const routes: RouteProps[] = [
  {
    path: CoreModuleRoutes.LUNCHBREAK_MODULE,
    element: <LunchbrekaModule />,
    index: true,
  },
];

export default routes;
