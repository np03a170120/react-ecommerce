import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetail } from "../../api/requestProcessor";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GlobalLayout from "../../Layout/GlobalLayout";
import ProductDetailFallbackLoader from "../../components/FallbackLoader/ProductDetailFallbackLoader";
import Image from "../../components/custom/Image";
import { CartContext } from "../../providers/useCartContext";

const ProductDetail = () => {
  let { userId, productId } = useParams();
  const { data, isPending, isFetchedAfterMount } = fetchProductDetail({
    userId,
    productId,
  });
  const productDetail = data?.data.data;
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

  const [availableQuantity, setAvailableQuantity] = useState();
  useEffect(() => {
    setAvailableQuantity(productDetail?.quantity - quantity);
  }, [quantity, data]);

  const { addToCart } = useContext(CartContext);

  const loginDetailRaw = localStorage.getItem("loginDetail");
  const loginDetail = JSON.parse(loginDetailRaw);
  const access_token = loginDetail?.access_token;
  const { toast } = useToast();

  const navigate = useNavigate();

  return (
    <GlobalLayout>
      <>
        {isFetchedAfterMount ? (
          <Suspense fallback={<ProductDetailFallbackLoader />}>
            <div className="grid md:grid-cols-2 items-start max-w-6xl px-4 mx-auto gap-6 lg:gap-12 ">
              <div className="grid gap-4">
                {productDetail?.productImages && (
                  <>
                    <Image
                      alt={productDetail?.name}
                      src={productDetail?.productImages[0]?.url}
                      className="aspect-square object-cover border  w-full rounded-lg overflow-hidden dark:border-gray-800"
                    />
                  </>
                )}
              </div>
              <div className="grid gap-2 md:gap-10 items-start">
                <div className="hidden md:flex items-start">
                  <div className="grid gap-4">
                    <h1 className="items-start text-left font-bold text-2xl lg:text-2xl">
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
                    <div className="flex gap-2 w-[150px]">
                      <Button
                        disabled={quantity <= 1}
                        onClick={handleDecreseQuantity}
                        type="button"
                        variant="secondary"
                      >
                        -
                      </Button>
                      <Input
                        onKeyDown={handleKeyDown}
                        onChange={handleInputQuantity}
                        value={quantity}
                        max={productDetail?.quantity}
                        className="border"
                        type="text"
                      />

                      <Button
                        disabled={quantity >= productDetail?.quantity}
                        onClick={handleIncreaseQuantity}
                        type="button"
                        variant="secondary"
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-muted-background">
                      Available Quantity: {availableQuantity}
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      access_token
                        ? (addToCart({
                            ...productDetail,
                            selectedQuantity: quantity,
                          }),
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
                  >
                    Add to Cart
                  </Button>
                  <Button size="lg">Buy</Button>
                </form>
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
          </Suspense>
        ) : (
          <ProductDetailFallbackLoader />
        )}
      </>
    </GlobalLayout>
  );
};

export default ProductDetail;
