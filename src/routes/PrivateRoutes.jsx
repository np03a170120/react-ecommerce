import React from "react";
import Test from "../app/Dashboard/Test";
import Layout from "../Layout/Layout";
import Checkout from "../app/user/Checkout";

const PrivateRoutes = ({ loginDetail }) => {
  return {
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Test /> },
      { path: "/checkout", element: <Checkout loginDetail={loginDetail} /> },
    ],
  };
};

export default PrivateRoutes;
