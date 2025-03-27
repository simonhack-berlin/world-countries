import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Country from "./Pages/Country/Country";
import HomePage from "./Pages/HomePage/HomePage";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/:countryCode", element: <Country /> },
    // ...
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
