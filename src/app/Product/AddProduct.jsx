import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { PlusCircle } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";

import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useCategoryList, usePostProduct } from "../../api/requestProcessor";
import { uploadProduct } from "./product.schema";

const AddProduct = ({ loginDetail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(uploadProduct),
  });

  const { mutate: postProductMutation, isPending } = usePostProduct();
  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("productImages", data.productImages);
    const productData = {
      userId: loginDetail._id,
      name: data.name,
      quantity: data.quantity,
      category: data.category,
      price: data.price,
      description: data.description,
      shortDescription: data.shortDescription,
      productImages: data.productImages[0],
    };
    postProductMutation(
      { productData, loginDetail },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  const { data } = useCategoryList();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="font-medium">
            <PlusCircle size={18} className="mr-1 " /> Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[620px]">
          <DialogHeader>
            <DialogTitle>Post Product</DialogTitle>
            <DialogDescription>
              Fill out all required details when posting a product and adhere to
              platform restrictions to avoid warnings.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input {...register("name")} id="name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Quantity</Label>
                <Input {...register("quantity")} id="quantity" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Category</Label>
                <select {...register("category")}>
                  {data?.data.data.map((item) => (
                    <option value={item._id}>{item.categoryName}</option>
                  ))}
                </select>
                {/* <Select>
                  <SelectTrigger>
                    <SelectValue 
                      {...register("category")}
                      placeholder="Select Category"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.data.data.map((item) => (
                      <SelectItem value={item._id}>
                        {item.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Price</Label>
                <Input {...register("price")} id="category" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea {...register("description")} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="shortDescription"> Short Description</Label>
                <Textarea {...register("shortDescription")} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <input type="file" {...register("productImages")} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {isPending === true ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProduct;
