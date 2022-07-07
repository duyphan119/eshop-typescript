import React from "react";
import config from "../config";
import { DashboardLayout, DefaultLayout } from "../layouts";

const Home = React.lazy(() => import("../pages/Home"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));

export interface RouteType {
  path: string;
  element: React.FC<any>;
  layout: React.FC<any>;
}

export const publicRoutes: RouteType[] = [
  {
    path: config.routes.home,
    element: Home,
    layout: DefaultLayout,
  },
  {
    path: config.routes.dashboard,
    element: Dashboard,
    layout: DashboardLayout,
  },
];
