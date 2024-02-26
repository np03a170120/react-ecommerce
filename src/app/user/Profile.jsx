import { Card } from "@/components/ui/card";
import React from "react";
import GlobalLayout from "../../Layout/GlobalLayout";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../Home/Home";
import AddProduct from "../Product/AddProduct";

const Profile = ({ loginDetail }) => {
  const profileImage = loginDetail?.image;
  return (
    <GlobalLayout>
      <div className="flex justify-between ">
        <div>
          <h1>side bar items</h1>
        </div>
        <div>side contents</div>
        <Card className="w-[16rem]  rounded-lg border">
          <div className="px-6 py-4 grid items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="overflow-hidden rounded-full border w-24 h-24">
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
