import React from "react";
import Layout from "../Layout/Layout";
import Test from "../app/Dashboard/Test";
import AddProductForm from "../app/Product/Form/ProductForm";
import Profile from "../app/user/Profile";
import Checkout from "../app/user/Checkout";
import UserProducts from "../app/user/UserProducts";

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
          {
            path: "my-products",
            element: <UserProducts />,
          },
        ],
      },
    ],
  };
};

export default PrivateRoutes;
