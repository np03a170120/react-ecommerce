import { Card } from "@/components/ui/card";
import { PictureInPicture, ShoppingCart } from "@phosphor-icons/react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import GlobalLayout from "../../Layout/GlobalLayout";

const Profile = ({ loginDetail }) => {
  const profileImage = loginDetail?.image;
  return (
    <GlobalLayout>
      <div className="flex justify-between ">
        <div className="w-[20%] border-r flex flex-col gap-1 navlink">
          <NavLink
            to="add-product"
            className={"flex font-medium gap-2 items-center px-2 py-2"}
          >
            <ShoppingCart size={18} />
            <h3 className="text-sm">Add Product</h3>
          </NavLink>
          <NavLink
            to="add-banner"
            className={"flex font-medium gap-2 items-center px-2 py-2"}
          >
            <PictureInPicture size={18} />

            <h3 className="text-sm">Add Banner</h3>
          </NavLink>
        </div>
        <div className="w-[50%]">
          <Outlet />
        </div>
        <Card className=" border-0 shadow-none ">
          <div className="px-6 py-4 grid items-center gap-4 border rounded-[6px]">
            <div className="flex items-center space-x-4">
              <div className="overflow-hidden rounded-full  w-16 h-16">
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
