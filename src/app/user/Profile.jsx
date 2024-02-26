import { Card } from "@/components/ui/card";
import React from "react";
import GlobalLayout from "../../Layout/GlobalLayout";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Home from "../Home/Home";
import AddProduct from "../Product/AddProduct";

const Profile = ({ loginDetail }) => {
  const profileImage = loginDetail?.image;
  return (
    <GlobalLayout>
      <div className="flex justify-between ">
        <div className="w-[20%] border-r flex flex-col gap-3">
          <Link to="add-product">
            <h1 className="bg-gray-200 px-4 py-2 ">Add Product</h1>
          </Link>
          <Link to="add-banner">
            <h1 className=" px-4 py-2">Add Banner</h1>
          </Link>
        </div>
        <div className="w-[40%]">
          <Outlet />
        </div>
        <Card className="w-[16rem]  rounded-lg border-0 ">
          <div className="px-6 py-4 grid items-center gap-4 border rounded-sm">
            <div className="flex items-center space-x-4">
              <div className="overflow-hidden rounded-full  w-24 h-24">
                <img
                  alt="User"
                  className="rounded-full h-full w-full border"
                  src={profileImage}
                />
              </div>
            </div>
            <div className="grid gap-1">
              <h1 className="text-lg font-bold capitalize">
                {loginDetail?.fullName}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @SeasonShrestha75
              </p>
            </div>
            <div className="grid gap-3">
              <dl className="grid gap-1">
                <dt className="text-sm font-medium">Email</dt>
                <dd className="text-sm text-gray-500 dark:text-gray-400">
                  {loginDetail?.email}
                </dd>
              </dl>
              <dl className="grid gap-1">
                <dt className="text-sm font-medium">Phone</dt>
                <dd className="text-sm text-gray-500 dark:text-gray-400">
                  (+977) 9847779841
                </dd>
              </dl>
            </div>
          </div>
        </Card>
      </div>
    </GlobalLayout>
  );
};

export default Profile;
