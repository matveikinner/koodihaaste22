import { RouteProps } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import SearchPage from "../pages/search/SearchPage";

export enum LunchbreakModuleRoutes {
  LUNCHBREAK_ROOT = "/",
  LUNCHBREAK_SEARCH = "/search",
}

const routes: RouteProps[] = [
  {
    path: LunchbreakModuleRoutes.LUNCHBREAK_ROOT,
    element: <DashboardPage />,
  },
  {
    path: LunchbreakModuleRoutes.LUNCHBREAK_SEARCH,
    element: <SearchPage />,
  },
];

export default routes;
