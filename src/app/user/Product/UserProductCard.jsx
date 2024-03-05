import { Card } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserProductCard = ({ productDetail }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() =>
          navigate(
            `/product/detail/${productDetail?.userId}/${productDetail?._id}`,
            {
              state: "",
            }
          )
        }
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
              <p className="text-sm font-medium">Rs.{productDetail?.price}</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UserProductCard;
