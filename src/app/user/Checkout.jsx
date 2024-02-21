import React from "react";
import { CartContext } from "../../providers/useCartContext";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { usePurchaseProduct } from "../../api/requestProcessor";

const Checkout = ({ loginDetail }) => {
  const { cartItems } = useContext(CartContext);

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
        onSuccess: () => {},
      }
    );
  };

  return (
    <div>
      <h1>This is checkout</h1>
      <Button onClick={handleSubmit}>Place Order</Button>
    </div>
  );
};

export default Checkout;
