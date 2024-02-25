import React from "react";
import Test from "../app/Dashboard/Test";
import Layout from "../Layout/Layout";
import Checkout from "../app/user/Checkout";
import UserProduct from "../app/Product/UserProduct";
import Profile from "../app/user/Profile";

const PrivateRoutes = ({ loginDetail }) => {
  return {
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Test /> },
      {
        path: "product/checkout",
        element: <Checkout loginDetail={loginDetail} />,
      },
      {
        path: "user/profile",
        element: <Profile loginDetail={loginDetail} />,
      },
    ],
  };
};

export default PrivateRoutes;
