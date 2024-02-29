import { Button } from "@/components/ui/button";
import React from "react";

import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import { Loader2 } from "lucide-react";
import { uploadProduct } from "../product.schema";
import { useCategoryList, usePostProduct } from "../../../api/requestProcessor";

const AddProductForm = () => {
  const loginDetailRaw = localStorage.getItem("loginDetail");
  const loginDetail = JSON.parse(loginDetailRaw);

  const { data } = useCategoryList();
  const { mutate: postProductMutation, isPending } = usePostProduct();
  const {
    getValues,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(uploadProduct),
  });

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

  const sanitizedData = data?.data.data.map(({ _id, categoryName }) => ({
    value: _id,
    label: categoryName,
  }));

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border px-8 py-6 rounded-[6px] bg-gray-50"
      >
        <h3 className="scroll-m-20 text-1xl font-semibold mb-6 tracking-tight">
          Add Product
        </h3>

        <div className="grid w-full items-center gap-4 ">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input {...register("name")} id="name" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Quantity</Label>
            <Input {...register("quantity")} id="quantity" />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label htmlFor="category">Category</Label>
            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, value } }) => (
                <Select
                  options={sanitizedData || []}
                  onChange={(selectedData) => onChange(selectedData.value)}
                  value={
                    sanitizedData
                      ? sanitizedData.find((option) => option.value === value)
                      : null
                  }
                />
              )}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Price</Label>
            <Input {...register("price")} id="category" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="shortDescription"> Short Description</Label>
            <Textarea {...register("shortDescription")} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea {...register("description")} />
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
    </>
  );
};

export default AddProductForm;
