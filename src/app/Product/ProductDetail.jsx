import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  fetchProductDetail,
  useCategoryList,
  usePurchaseDeteProduct,
  usePurchaseEditProduct,
} from "../../api/requestProcessor";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GlobalLayout from "../../Layout/GlobalLayout";
import ProductDetailFallbackLoader from "../../components/FallbackLoader/ProductDetailFallbackLoader";
import Image from "../../components/custom/Image";
import { CartContext } from "../../providers/useCartContext";

import { Controller, useForm } from "react-hook-form";

const ProductDetail = () => {
  let { userId, productId } = useParams();
  const { data: category } = useCategoryList();
  const { data, isPending, isFetchedAfterMount } = fetchProductDetail({
    userId,
    productId,
  });
  const productDetail = data?.data.data;

  const [open, setOpen] = useState(false);
  const location = useLocation();

  const [edit, setEdit] = useState(false);
  const loginDetailRaw = localStorage.getItem("loginDetail");
  const loginDetail = JSON.parse(loginDetailRaw);
  const access_token = loginDetail?.access_token;
  const { mutate: deleteProduct, isPending: deleteLoading } =
    usePurchaseDeteProduct();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(""),
  });

  const [quantity, seQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    const allowIncrease = quantity < productDetail?.quantity;
    if (allowIncrease) {
      seQuantity(quantity + 1);
    }
  };

  const handleDecreseQuantity = () => {
    const allowDecrease = quantity > 1;
    if (allowDecrease) {
      seQuantity(quantity - 1);
    }
  };

  const handleInputQuantity = (e) => {
    const inputParse = parseInt(e.target.value);
    if (inputParse > 0 && inputParse <= productDetail?.quantity) {
      seQuantity(inputParse);
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Backspace" || key === "Delete") {
      seQuantity(1);
    }
  };

  const handleDeleteProduct = () => {
    const userId = productDetail?.userId;
    const productId = productDetail?._id;
    deleteProduct(
      { loginDetail, userId, productId },
      {
        onSuccess: () => {
          setOpen(false);
          navigate(-1);
          toast({
            title: `successfully deleted`,
            variant: "success",
          });
        },
      }
    );
  };

  const [availableQuantity, setAvailableQuantity] = useState();
  useEffect(() => {
    setAvailableQuantity(productDetail?.quantity - quantity);
  }, [quantity, data]);

  const { addToCart, addToCartHandler } = useContext(CartContext);

  const { toast } = useToast();

  const navigate = useNavigate();

  const isUserProduct = productDetail?.userId === loginDetail?._id;

  const sanitizedData = category?.data.data.map(({ _id, categoryName }) => ({
    value: _id,
    label: categoryName,
  }));

  const { mutate: postEditProductMutation, isPending: loadingEditPost } =
    usePurchaseEditProduct();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("productImages", data.productImages);
    const productEditedData = {
      userId: loginDetail._id,
      name: data.name,
      quantity: data.quantity,
      category: data.category,
      price: data.price,
      description: data.description,
      // productImages: data.productImages[0],
    };
    postEditProductMutation(
      { productEditedData, loginDetail, userId, productId },
      {
        onSuccess: () => {
          navigate(0);
        },
      }
    );
  };

  useEffect(() => {
    if (isUserProduct && location.state) {
      setEdit(location.state.edit);
    } else {
      setEdit(false);
    }
  }, [isUserProduct, location.state]);

  return (
    <GlobalLayout>
      <>
        {isFetchedAfterMount ? (
          <Suspense fallback={<ProductDetailFallbackLoader />}>
            {isUserProduct && (
              <>
                <div className="flex gap-4 flex-end items-center mb-6 justify-end">
                  <Button variant="destructive" onClick={() => setOpen(true)}>
                    Delete Product{" "}
                  </Button>
                  <Button
                    className="w-[200px] float-end "
                    onClick={() => setEdit((prev) => !prev)}
                    variant="outline"
                  >
                    {!edit ? "Edit page" : "Initial Page"}
                  </Button>
                </div>
              </>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 justify-between w-full px-4  gap-6 lg:gap-12 ">
                <div className="grid gap-4 w-full">
                  {productDetail?.productImages &&
                    productDetail?.productImages.length > 0 && (
                      <Image
                        alt={productDetail?.name}
                        src={productDetail?.productImages[0]?.url}
                        className="aspect-square object-cover border  w-full rounded-lg overflow-hidden dark:border-gray-800"
                      />
                    )}
                </div>
                <div className="grid gap-2  items-start">
                  <div className="flex justify-between  w-full">
                    <div className="grid gap-4 w-full">
                      <div className="flex justify-between w-full">
                        {edit ? (
                          <>
                            <div className="w-full">
                              <Label htmlFor="name">Product's Name</Label>
                              <Input
                                {...register("name", {
                                  value: productDetail?.name,
                                })}
                                className="items-start border-yellow-500 text-left border-2  bg-yellow-100"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <h1 className="items-start text-left font-bold text-2xl lg:text-2xl">
                              {productDetail?.name}
                            </h1>
                          </>
                        )}
                      </div>

                      {edit ? (
                        <>
                          <div className="w-full">
                            <Label htmlFor="shortDescription">
                              {" "}
                              Short Description
                            </Label>

                            <Textarea
                              {...register("description", {
                                value: productDetail?.description,
                              })}
                              className="items-start border-yellow-500 text-left  border-2 h-[120px] bg-yellow-100"
                              title="description"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-left">
                            {" "}
                            {productDetail?.description}
                          </p>
                        </>
                      )}

                      {edit ? (
                        <>
                          <div className="w-full">
                            <Label htmlFor="shortDescription"> Price</Label>

                            <Input
                              {...register("price", {
                                value: productDetail?.price,
                              })}
                              className="items-start border-yellow-500 text-left border-2   bg-yellow-100"
                              title="price"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <h2 className=" text-left font-medium text-2xl lg:text-2xl">
                            Rs.{productDetail?.price}
                          </h2>
                        </>
                      )}

                      {edit && (
                        <>
                          <div className="flex flex-col space-y-1.5 w-full">
                            <Label htmlFor="category">Category</Label>
                            <Controller
                              control={control}
                              name="category"
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  classNames={"bg-yellow-900"}
                                  options={sanitizedData || []}
                                  onChange={(selectedData) =>
                                    onChange(selectedData.value)
                                  }
                                  value={
                                    sanitizedData
                                      ? sanitizedData.find(
                                          (option) =>
                                            option.label ===
                                            productDetail?.category
                                        )
                                      : null
                                  }
                                />
                              )}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid  gap-6  text-left">
                    {edit ? (
                      <>
                        <div className="w-full">
                          <Label htmlFor="quantity"> Quantity</Label>
                          <Input
                            {...register("quantity", {
                              value: productDetail?.quantity,
                            })}
                            className="items-start border-yellow-500 text-left border-2  bg-yellow-100"
                            title="price"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Label className="text-base" htmlFor="quantity">
                          Quantity
                        </Label>
                        <div className="flex gap-2 w-[150px]">
                          <Button
                            disabled={quantity <= 1 || isUserProduct}
                            onClick={handleDecreseQuantity}
                            type="button"
                            variant="secondary"
                          >
                            -
                          </Button>
                          <Input
                            disabled={isUserProduct}
                            onKeyDown={handleKeyDown}
                            onChange={handleInputQuantity}
                            value={quantity}
                            max={productDetail?.quantity}
                            className="border"
                            type="text"
                          />

                          <Button
                            disabled={
                              quantity >= productDetail?.quantity ||
                              isUserProduct
                            }
                            onClick={handleIncreaseQuantity}
                            type="button"
                            variant="secondary"
                          >
                            +
                          </Button>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground dark:text-muted-background">
                            Available Quantity: {availableQuantity}
                          </p>
                          {!isUserProduct && (
                            <Button variant="link" className="p-0 underline">
                              Chat with Seller
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  {edit ? (
                    <>
                      <Button
                        className="mt-6"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        {loadingEditPost === true ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          "Edit"
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-5">
                        <Button
                          onClick={() =>
                            access_token
                              ? (addToCart({
                                  ...productDetail,
                                  selectedQuantity: quantity,
                                }),
                                addToCartHandler,
                                toast({
                                  title: "Success",
                                  description: "Product added to cart",
                                  variant: "success",
                                }))
                              : (toast({
                                  description: "Please login to Add to Cart",
                                  variant: "destructive",
                                }),
                                navigate("/login"))
                          }
                          type="button"
                          variant="outline"
                          size="lg"
                          className={
                            isUserProduct
                              ? "cursor-not-allowed	 pointer-events-none "
                              : null
                          }
                        >
                          Add to Cart
                        </Button>
                        <Button
                          className={
                            isUserProduct
                              ? "pointer-events-none cursor-not-allowed	 "
                              : null
                          }
                          size="lg"
                        >
                          Buy
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>
            <Dialog modal open={open} onOpenChange={setOpen}>
              <DialogContent className="p-6 pb-2">
                <DialogHeader>
                  <DialogTitle className="mb-2">Delete product?</DialogTitle>
                  <DialogDescription>
                    Do you want to delete{" "}
                    <span className="font-bold">`{productDetail?.name}`</span>?
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
          </Suspense>
        ) : (
          <ProductDetailFallbackLoader />
        )}
      </>
    </GlobalLayout>
  );
};

export default ProductDetail;
