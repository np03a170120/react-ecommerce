import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const addToCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, selectedQuantity: item.selectedQuantity }
            : cartItem
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...item, selectedQuantity: item.selectedQuantity },
      ]);
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );

    if (isItemInCart.selectedQuantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, selectedQuantity: item.selectedQuantity }
            : cartItem
        )
      );
    }
  };

  const removeProductFromCart = (item) => {
    setCartItems(cartItems.filter((cartItems) => cartItems._id !== item._id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
