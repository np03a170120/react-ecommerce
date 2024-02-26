import React from "react";
import Test from "../app/Dashboard/Test";
import Layout from "../Layout/Layout";
import Checkout from "../app/user/Checkout";
import UserProduct from "../app/Product/UserProduct";
import Profile from "../app/user/Profile";
import { Outlet } from "react-router-dom";
import AddProductForm from "../app/Product/Form/ProductForm";

const PrivateRoutes = ({ loginDetail }) => {
  return {
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Test /> },
      {
        path: "/product/checkout",
        element: <Checkout loginDetail={loginDetail} />,
      },
      {
        path: "/user/profile",
        element: <Profile loginDetail={loginDetail} />,
        children: [
          {
            path: "add-product",
            element: <AddProductForm />,
          },
          {
            path: "add-banner",
            element: <h1>test</h1>,
          },
        ],
      },
    ],
  };
};

export default PrivateRoutes;
