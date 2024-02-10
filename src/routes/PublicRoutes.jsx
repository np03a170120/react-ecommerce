import { Navigate } from "react-router-dom";
import Home from "../app/Home/Home";
import Login from "../app/user/Login";
import SignUp from "../app/user/SignUp";

export default function PublicRoutes({ loginDetail }) {
  return [
    {
      path: "/login",
      element: loginDetail ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: "/signup",
      element: loginDetail ? <Navigate to="/" replace /> : <SignUp />,
    },
    {
      path: "/",
      element: <Home loginDetail={loginDetail} />,
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ];
}
