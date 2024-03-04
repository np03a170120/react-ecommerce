import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProducts } from "../../api/requestProcessor";

import { createColumnHelper } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DotsThreeVertical } from "@phosphor-icons/react";
import ProductTable from "../../hooks/ProductTable";

const UserProducts = () => {
  const loginDetailRaw = localStorage.getItem("loginDetail");
  const loginDetail = JSON.parse(loginDetailRaw);

  const { data, isLoading: loading } = fetchUserProducts({ loginDetail });

  const products = data?.data.data;

  const columnHelper = createColumnHelper();

  const navigate = useNavigate();

  const edit = { edit: true };

  const columns = [
    columnHelper.accessor("name", {
      header: "Product",
    }),
    columnHelper.accessor("price", {
      header: "Price",
    }),
    columnHelper.accessor("category.category", {
      header: "Category",
    }),
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsThreeVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/product/detail/${product?.userId}/${product?._id}`,
                    { state: "" }
                  )
                }
              >
                Preview
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/product/detail/${product?.userId}/${product?._id}`,
                    { state: edit }
                  )
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <h3 className="scroll-m-20 text-1xl font-semibold mb-6 tracking-tight">
        My Products
      </h3>
      {products && (
        <div className="table-container">
          <ProductTable columns={columns} data={data?.data.data} />
        </div>
      )}
      {/* <div className="grid grid-cols-2 gap-4">
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
      </div> */}
    </>
  );
};

export default UserProducts;
