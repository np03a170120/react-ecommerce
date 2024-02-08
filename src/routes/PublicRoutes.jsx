import { Navigate } from "react-router-dom";
import Login from "../app/user/Login";
import SignUp from "../app/user/SignUp";

export default function PublicRoutes() {
  return [
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];
}
