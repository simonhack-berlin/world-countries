import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import Country from "./Pages/Country/Country";
import HomePage from './Pages/HomePage/HomePage';

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/:name", element: <Country /> },
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
