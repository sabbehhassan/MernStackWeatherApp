// src/routes/AppRoutes.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Register from "../components/Register";

// ✅ Future flags enabled here
const router = createBrowserRouter(
  [
    { path: "/", element: <Dashboard /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ],
  {
    future: {
      v7_startTransition: true,       // ✅ Fixes warning
      v7_relativeSplatPath: true,     // ✅ Future-proofing splat route behavior
    },
  }
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
