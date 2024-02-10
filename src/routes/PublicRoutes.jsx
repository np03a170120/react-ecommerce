import { Navigate } from "react-router-dom";
import Login from "../app/User/Login";
import SignUp from "../app/User/SignUp";
import Home from "../app/Home/Home";

export default function PublicRoutes({ loginDetail }) {
  return [
    {
      path: "/login",
      element: loginDetail ? <Navigate to="/" replace /> : <Login />,
    },
    { path: "/signup", element: <SignUp /> },
    {
      path: "/",
      element: <Home loginDetail={loginDetail} />,
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ];
}
