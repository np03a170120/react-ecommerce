import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductDetailFallbackLoader = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 items-start max-w-6xl px-4 mx-auto gap-6 lg:gap-12 py-6">
        <div className="grid gap-4">
          <Skeleton className="aspect-square" />
        </div>
        <div className="grid gap-2 md:gap-10 items-start">
          <div className="hidden md:flex items-start">
            <div className="grid gap-4">
              <Skeleton className="h-6 w-[200px]" />
            </div>
          </div>
          <Skeleton className="h-4 w-[400px]" />
          <Skeleton className="h-4 w-[400px] mb-12" />
          <Skeleton className="h-8 w-[400px]" />
        </div>
      </div>
    </>
  );
};

export default ProductDetailFallbackLoader;
