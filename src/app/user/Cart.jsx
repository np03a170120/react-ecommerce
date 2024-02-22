import * as React from "react";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CartContext } from "../../providers/useCartContext";
import { useContext } from "react";
import Image from "../../components/custom/Image";
import { TrashSimple } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  console.log(cartItems[0]?.selectedQuantity, "from cart");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="container w-[750px]">
        <DrawerHeader className="pl-0">
          <DrawerTitle> Cart Items</DrawerTitle>
        </DrawerHeader>
        <div className="flex align-top gap-16 w-full">
          <div className="grid grid-cols-1 gap-4 flex-1">
            {cartItems.map((item) => (
              <Card
                className=" relative transition ease-in-out delay-150 flex border p-4  hover:shadow-lg cursor-pointer  items-center"
                key={item?.id}
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
                    <h1 className="text-lg font-bold text-left">
                      {item?.name}
                    </h1>
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
                  onClick={() => removeFromCart(item)}
                  size={16}
                />
              </Card>
            ))}
            <div>
              {cartItems.length > 0 ? (
                <div className="  w-full">
                  <h1 className="text-lg font-bold">
                    Total: ${getCartTotal()}
                  </h1>
                  <Button
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    Clear cart
                  </Button>
                </div>
              ) : (
                <h1 className="text-lg font-bold">Your cart is empty</h1>
              )}
            </div>
            {/* <Link to="product/checkout">Checkout</Link> */}
          </div>
        </div>
        <DrawerFooter>
          {/* <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
