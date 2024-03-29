import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { GridFour, Table } from "@phosphor-icons/react";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUserProducts,
  usePurchaseDeteProduct,
} from "../../api/requestProcessor";

import { createColumnHelper } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { DotsThreeVertical } from "@phosphor-icons/react";
import ProductTable from "../../hooks/ProductTable";
import UserProductCard from "./Product/UserProductCard";

const UserProducts = () => {
  const [currentProduct, setCurrentProduct] = useState({
    userId: "",
    productId: "",
    produtName: "",
  });
  const [open, setOpen] = useState(false);
  const [cardView, setCardView] = useState(0);
  const [globalFilter, setGlobalFilter] = useState("");
  const loginDetailRaw = localStorage.getItem("loginDetail");
  const loginDetail = JSON.parse(loginDetailRaw);
  const { toast } = useToast();
  const { data, isLoading: loading } = fetchUserProducts({ loginDetail });

  const { mutate: deleteProduct, isPending: deleteLoading } =
    usePurchaseDeteProduct();

  const products = data?.data.data;

  const columnHelper = createColumnHelper();

  const navigate = useNavigate();

  const edit = { edit: true };

  const handleSelectedProduct = (userId, productId, productName) => {
    setOpen(true);
    setCurrentProduct({
      productId: productId,
      userId: userId,
      productName: productName,
    });
  };

  const handleDeleteProduct = () => {
    const userId = currentProduct.userId;
    const productId = currentProduct.productId;
    deleteProduct(
      { loginDetail, userId, productId },
      {
        onSuccess: () => {
          setOpen(false);
          navigate(0);
          toast({
            title: `successfully deleted`,
            variant: "success",
          });
        },
      }
    );
  };

  useEffect(() => {
    if (deleteLoading) {
      toast({
        title: "Deleting.....",
        variant: "destructive",
      });
    }
  }, [deleteLoading]);

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
          <>
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
                <DropdownMenuItem
                  onClick={() =>
                    handleSelectedProduct(
                      product?.userId,
                      product?._id,
                      product?.name
                    )
                  }
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="border px-8 py-6 rounded-[6px] bg-gray-50">
        <div className="flex justify-between ">
          <h3 className="scroll-m-20 text-1xl font-semibold mb-6 tracking-tight">
            My Products
          </h3>
          <div className="flex gap-3 items-top">
            <Input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-[2.1rem]"
              size="xs"
              type="text"
              placeholder="Search..."
            />
            <Button
              onClick={() => setCardView(0)}
              variant={cardView === 0 ? "default" : "secondary"}
              size="xs"
            >
              <Table size={18} />
            </Button>
            <Button
              onClick={() => setCardView(1)}
              variant={cardView === 1 ? "default" : "secondary"}
              size="xs"
            >
              <GridFour size={18} />
            </Button>
          </div>
        </div>

        {cardView === 0 && (
          <>
            {products && (
              <div className="table-container">
                <ProductTable
                  globalFilter={globalFilter}
                  columns={columns}
                  data={data?.data.data}
                />
              </div>
            )}
          </>
        )}

        {cardView === 1 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {products &&
                products.map(
                  (productDetail, index) =>
                    (globalFilter === "" ||
                      productDetail.name
                        .toLowerCase()
                        .includes(globalFilter.toLowerCase())) && (
                      <UserProductCard
                        key={index}
                        globalFilter={globalFilter}
                        productDetail={productDetail}
                      />
                    )
                )}
            </div>
          </>
        )}
      </div>

      <Dialog modal open={open} onOpenChange={setOpen}>
        <DialogContent className="p-6 pb-2">
          <DialogHeader>
            <DialogTitle className="mb-2">Delete product?</DialogTitle>
            <DialogDescription>
              Do you want to delete{" "}
              <span className="font-bold">`{currentProduct.productName}`</span>?
              Deleting this product cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              onClick={() => handleDeleteProduct()}
              variant="destructive"
            >
              {deleteLoading === true ? (
                <Loader2 className=" h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserProducts;
