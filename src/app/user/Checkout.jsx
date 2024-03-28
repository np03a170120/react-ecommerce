import React from "react";
import { CartContext } from "../../providers/useCartContext";
import { Card } from "@/components/ui/card";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { usePurchaseProduct } from "../../api/requestProcessor";
import { TrashSimple } from "@phosphor-icons/react";
import Image from "../../components/custom/Image";
import { Loader2 } from "lucide-react";
import GlobalLayout from "../../Layout/GlobalLayout";

const Checkout = ({ loginDetail }) => {
  const { cartItems, clearCart, addToCart, removeProductFromCart } =
    useContext(CartContext);

  const { mutate: postProductMutation, isPending } = usePurchaseProduct();

  const handleSubmit = (data) => {
    const formData = new FormData();
    formData.append("productImages", data.productImages);

    const purchaseDetail = {
      customerId: loginDetail._id,
      quantity: 1,
      reviews: "Good and fresh juice awesome",
      rating: 4,
      products: cartItems,
    };

    postProductMutation(
      { purchaseDetail, loginDetail },
      {
        onSuccess: () => {
          clearCart();
        },
      }
    );
  };

  return (
    <GlobalLayout>
      <h1>This is checkout</h1>
      {cartItems.map((item, index) => (
        <Card
          className=" relative transition ease-in-out  flex border p-4  hover:shadow-lg cursor-pointer  items-center"
          key={index}
        >
          <div className="flex gap-4">
            {item.productImages && (
              <>
                <Image
                  src={item?.productImages[0]?.url}
                  alt={item?.title}
                  className="rounded-md h-24"
                />
              </>
            )}
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-left">{item?.name}</h1>
              <p className="text-gray-600 text-left">{item?.price}</p>
              <div className="flex gap-4 mt-2 items-center ">
                <Button
                  size="xs"
                  variant="secondary"
                  disabled={item.selectedQuantity <= 1}
                  onClick={() => {
                    addToCart({
                      ...item,
                      selectedQuantity: item.selectedQuantity - 1,
                    });
                  }}
                >
                  -
                </Button>
                <p>{item?.selectedQuantity}</p>
                <Button
                  size="xs"
                  variant="secondary"
                  disabled={item.quantity === item.selectedQuantity}
                  onClick={() => {
                    addToCart({
                      ...item,
                      selectedQuantity: item.selectedQuantity + 1,
                    });
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <TrashSimple
            className="absolute right-3 top-3"
            onClick={() => removeProductFromCart(item)}
            size={16}
          />
        </Card>
      ))}
      <Button disabled={cartItems.length < 1} onClick={handleSubmit}>
        {isPending === true ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Place Order"
        )}
      </Button>
    </GlobalLayout>
  );
};

export default Checkout;
