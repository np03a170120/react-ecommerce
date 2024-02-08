import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const isAuthenticated = false;
  const router = createBrowserRouter([
    isAuthenticated ? PrivateRoutes() : {},
    ...PublicRoutes(),
  ]);
  return <RouterProvider router={router} />;
}

export default App;
