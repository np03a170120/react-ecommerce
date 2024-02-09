import React from "react";
import Test from "../app/Dashboard/Test";
import Layout from "../Layout/Layout";

const PrivateRoutes = ({ isAuthenticated }) => {
  return {
    element: <Layout />,
    children: [{ path: "/dashboard", element: <Test /> }],
  };
};

export default PrivateRoutes;
