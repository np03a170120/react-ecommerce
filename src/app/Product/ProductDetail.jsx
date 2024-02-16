import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../../api/requestProcessor";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import GlobalLayout from "../../Layout/GlobalLayout";
import { Loader2 } from "lucide-react";

const ProductDetail = () => {
  let { userId, productId } = useParams();
  const { data, isPending, isFetchedAfterMount } = fetchProductDetail({
    userId,
    productId,
  });
  const productDetail = data?.data.data;

  return (
    <GlobalLayout>
      {!isPending && isFetchedAfterMount ? (
        <>
          <div className="grid md:grid-cols-2 items-start max-w-6xl px-4 mx-auto gap-6 lg:gap-12 py-6">
            <div className="grid gap-4">
              <img
                alt="Product Image"
                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                height={600}
                src=""
                width={600}
              />
            </div>
            <div className="grid gap-2 md:gap-10 items-start">
              <div className="hidden md:flex items-start">
                <div className="grid gap-4">
                  <h1 className="items-start text-left font-bold text-3xl lg:text-4xl">
                    {productDetail?.name}
                  </h1>

                  <p className="text-left"> {productDetail?.description}</p>
                  <h2 className=" text-left font-medium text-2xl lg:text-2xl">
                    Rs.{productDetail?.price}
                  </h2>
                </div>
              </div>
              <form className="grid gap-4 md:gap-10">
                <div className="grid gap-2 text-left">
                  <Label className="text-base" htmlFor="quantity">
                    Quantity
                  </Label>
                  <Select defaultValue="1">
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="lg">Add to cart</Button>
              </form>
              <Separator />
            </div>
            <div className="flex md:hidden items-start">
              <div className="grid gap-4">
                <h1 className="font-bold text-2xl sm:text-3xl">
                  Acme Circles T-Shirt
                </h1>
                <div>
                  <p>60% combed ringspun cotton/40% polyester jersey tee.</p>
                </div>
              </div>
              <div className="text-4xl font-bold ml-auto">$99</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Loader2 className=" text-center h-4 animate-spin" />
        </>
      )}
    </GlobalLayout>
  );
};

export default ProductDetail;
