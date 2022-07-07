import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, RouteType } from "./routes";

function App() {
  function showRoutes(routes: RouteType[]): React.ReactElement {
    return (
      <Routes>
        {routes.map((route: RouteType, index: number): React.ReactElement => {
          let Layout = route.layout;

          const Page = route.element;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    );
  }

  return (
    <React.Suspense fallback={<div>loading...</div>}>
      {showRoutes(publicRoutes)}
    </React.Suspense>
  );
}

export default App;
