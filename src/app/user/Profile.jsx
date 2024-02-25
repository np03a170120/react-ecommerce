import { Card } from "@/components/ui/card";
import React from "react";
import GlobalLayout from "../../Layout/GlobalLayout";

const Profile = ({ loginDetail }) => {
  const profileImage = loginDetail?.image;
  return (
    <GlobalLayout>
      <div className="flex ">
        <div className=" mr-3">
          <Card className="w-[24rem] max-w-sm rounded-lg border">
            <div className="p-6 grid items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="overflow-hidden rounded-full border w-12 h-12">
                  <img
                    alt="User"
                    className="rounded-full border"
                    src={profileImage}
                  />
                </div>
                <div className="grid gap-1.5">
                  <h1 className="text-lg font-bold">{loginDetail?.fullName}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Product Designer
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <dl className="grid gap-1.5">
                  <dt className="text-sm font-medium">Email</dt>
                  <dd className="text-sm text-gray-500 dark:text-gray-400">
                    {loginDetail?.email}
                  </dd>
                </dl>
                <dl className="grid gap-1.5">
                  <dt className="text-sm font-medium">Phone</dt>
                  <dd className="text-sm text-gray-500 dark:text-gray-400">
                    +1 (555) 123-4567
                  </dd>
                </dl>
              </div>
            </div>
          </Card>
        </div>
        <div>side contents</div>
      </div>
    </GlobalLayout>
  );
};

export default Profile;
