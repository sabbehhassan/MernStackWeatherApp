// src/routes/AppRoutes.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import Welcome from "../pages/welcome";

// ✅ ProtectedRoute component to check if user is logged in
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
};

// ✅ Define router with protected /welcome route
const router = createBrowserRouter(
  [
    { path: "/", element: <Dashboard /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/welcome",
      element: (
        <ProtectedRoute>
          <Welcome />
        </ProtectedRoute>
      ),
    },
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
