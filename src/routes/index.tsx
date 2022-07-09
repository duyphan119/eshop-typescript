import React from "react";
import config from "../config";
import { DashboardLayout, DefaultLayout } from "../layouts";
import OnlyContentLayout from "../layouts/OnlyContentLayout/OnlyContentLayout";

const Home = React.lazy(() => import("../pages/Home"));
const CategoryList = React.lazy(() => import("../pages/CategoryList"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
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
  {
    path: config.routes.categoryList,
    element: CategoryList,
    layout: DashboardLayout,
  },
  {
    path: config.routes.login,
    element: Login,
    layout: OnlyContentLayout,
  },
  {
    path: config.routes.register,
    element: Register,
    layout: OnlyContentLayout,
  },
];
