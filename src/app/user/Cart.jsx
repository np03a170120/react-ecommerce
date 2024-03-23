import { Card } from "@/components/ui/card";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingBag, TrashSimple } from "@phosphor-icons/react";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";
import Image from "../../components/custom/Image";
import { CartContext } from "../../providers/useCartContext";
import { Link } from "react-router-dom";
const Cart = ({ loginDetail }) => {
  const {
    cartItems,
    addToCart,
    clearCart,
    getCartTotal,
    removeProductFromCart,
  } = useContext(CartContext);

  const total = cartItems
    .map((item) => item.selectedQuantity)
    .reduce((sum, a) => sum + a, 0);

  const [animateBounch, setAnimateBounch] = React.useState("");

  React.useEffect(() => {
    setAnimateBounch("animate-bounce");
    setTimeout(() => {
      setAnimateBounch("");
    }, 5000);
  }, [total]);

  const tempClassName = twMerge(
    animateBounch,
    `transition-all	 ease-in-out  z-[10] bg-red-200 rounded-full h-6 w-6 flex items-center justify-center absolute bottom-5 right-[-2px] text-xs font-semibold`
  );

  return (
    <>
      {loginDetail && (
        <Drawer>
          <DrawerTrigger asChild>
            <div className="bg-gray-200 rounded-full p-2  transition ease-in-out  hover:shadow-lg relative mr-2">
              <ShoppingBag className="cursor-pointer	" size={24} />

              <span
                className={
                  total > 0
                    ? tempClassName
                    : " z-[10] bg-red-200 rounded-full h-6 w-6 flex items-center justify-center absolute bottom-5 right-[-2px] text-xs font-semibold"
                }
              >
                {total}
              </span>
            </div>
          </DrawerTrigger>
          <DrawerContent className="container w-[550px] rounded-md outline-none px-6">
            <DrawerHeader className="pl-0 !mb-4 mt-4">
              <DrawerTitle> Cart Items</DrawerTitle>
              <DrawerDescription>Total Products: {total}</DrawerDescription>
            </DrawerHeader>
            <div className="flex align-top gap-16 w-full">
              <div className="grid grid-cols-1 gap-4 flex-1">
                {cartItems.map((item, index) => (
                  <Card
                    className=" relative transition pb-4 !shadow-none  border-0 border-b ease-in-out  rounded-none  flex filter-none   cursor-pointer  items-center"
                    key={index}
                  >
                    <div className="flex gap-4">
                      {item.productImages && (
                        <>
                          <Image
                            src={item?.productImages[0]?.url}
                            alt={item?.title}
                            className="rounded-md h-20"
                          />
                        </>
                      )}
                      <div className="flex flex-col">
                        <h1 className="text-md font-bold text-left pr-12">
                          {item?.name}
                        </h1>
                        <p className="text-gray-600 text-left">
                          Rs.{item?.price}
                        </p>
                        <div className="flex gap-4 mt-2 items-center ">
                          <Button
                            className="h-2 w-2 p-2 bg-none  hover:bg-gray-200"
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
                          <p className="text-sm">{item?.selectedQuantity}</p>
                          <Button
                            className="h-2 w-2 p-2 bg-none  hover:bg-gray-200 "
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
                <div className="flex mt-6">
                  {cartItems.length > 0 ? (
                    <div className=" flex justify-between items-center w-full">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          clearCart();
                        }}
                      >
                        Clear cart
                      </Button>
                      <Button size="sm">
                        <Link to="/product/checkout">Proceed to Checkout</Link>
                      </Button>
                    </div>
                  ) : (
                    <h1 className="text-lg font-bold">Your cart is empty</h1>
                  )}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default Cart;
