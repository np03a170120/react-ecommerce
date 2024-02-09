import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const queryClient = new QueryClient();
  const isAuthenticated = localStorage.getItem("access_token");
  const router = createBrowserRouter([
    isAuthenticated ? PrivateRoutes({ isAuthenticated }) : {},
    ...PublicRoutes({ isAuthenticated }),
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
