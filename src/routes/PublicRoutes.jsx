import { Navigate } from "react-router-dom";
import Login from "../app/User/Login";
import SignUp from "../app/User/SignUp";
import Home from "../app/Home/Home";

export default function PublicRoutes({ isAuthenticated }) {
  return [
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" replace /> : <Login />,
    },
    { path: "/signup", element: <SignUp /> },
    { path: "/", element: <Home isAuthenticated={isAuthenticated} /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ];
}
