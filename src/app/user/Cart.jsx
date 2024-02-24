import { Card } from "@/components/ui/card";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingBag, TrashSimple } from "@phosphor-icons/react";
import { useContext } from "react";
import Image from "../../components/custom/Image";
import { CartContext } from "../../providers/useCartContext";
const Cart = ({ loginDetail }) => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  const total = cartItems
    .map((item) => item.selectedQuantity)
    .reduce((sum, a) => sum + a, 0);

  return (
    <>
      {loginDetail && (
        <Drawer>
          <DrawerTrigger asChild>
            <div className="bg-gray-200 rounded-full p-2  transition ease-in-out  hover:shadow-lg relative mr-2">
              <ShoppingBag className="cursor-pointer	" size={24} />
              <span className=" z-[10] bg-red-200 rounded-full h-6 w-6 flex items-center justify-center absolute bottom-5 right-[-2px] text-xs font-semibold">
                {total}
              </span>
            </div>
          </DrawerTrigger>
          <DrawerContent className="container w-[750px]">
            <DrawerHeader className="pl-0">
              <DrawerTitle> Cart Items</DrawerTitle>
              <DrawerDescription>Total Products: {total}</DrawerDescription>
            </DrawerHeader>
            <div className="flex align-top gap-16 w-full">
              <div className="grid grid-cols-1 gap-4 flex-1">
                {cartItems.map((item) => (
                  <Card
                    className=" relative transition ease-in-out  flex border p-4  hover:shadow-lg cursor-pointer  items-center"
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
      )}
    </>
  );
};

export default Cart;
