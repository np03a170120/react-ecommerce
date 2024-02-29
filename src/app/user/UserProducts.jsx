import { Card } from "@/components/ui/card";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { fetchUserProducts } from "../../api/requestProcessor";
import { DashboardProductsFallbackLoader } from "../../components/FallbackLoader/DashboardProductsFallbackLoader";

const UserProducts = () => {
  const loginDetailRaw = localStorage.getItem("loginDetail");
  const loginDetail = JSON.parse(loginDetailRaw);

  const { data } = fetchUserProducts({ loginDetail });

  const products = data?.data.data;

  return (
    <>
      <h3 className="scroll-m-20 text-1xl font-semibold mb-6 tracking-tight">
        My Products
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {products &&
          products.map((productDetail, index) => (
            <>
              <Suspense fallback={<DashboardProductsFallbackLoader />}>
                <Link
                  to={`/product/detail/${productDetail?.userId}/${productDetail?._id}`}
                >
                  <Card className="w-full h-full cursor-pointer hover:shadow-lg transition ease-in-out ">
                    <div className="gap-3 h-full">
                      <div className="text-left flex flex-col gap-1 leading-none px-4 py-6">
                        <h3 className="text-sm font-medium leading-none">
                          {productDetail?.name}
                        </h3>
                        <p className="text-xs text-muted-foreground dark:text-muted-background">
                          Available Quantity: {productDetail?.quantity}
                        </p>
                        <p className="text-sm font-medium">
                          Rs.{productDetail?.price}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Suspense>
            </>
          ))}
      </div>
    </>
  );
};

export default UserProducts;
