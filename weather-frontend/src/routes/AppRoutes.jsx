// src/routes/AppRoutes.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import Welcome from "../pages/welcome"; // ✅ Import the Welcome page

const router = createBrowserRouter(
  [
    { path: "/", element: <Dashboard /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/welcome", element: <Welcome /> }, // ✅ Add this route
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
