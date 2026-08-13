import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await API.post("/cart", {
        productId,
      });

      alert("Product added to cart");

      fetchCart();
    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.message || error.message);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      if (quantity < 1) return;
      await API.put(`/cart/${cartItemId}`, { quantity });
      fetchCart();
    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.message || error.message);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await API.delete(`/cart/${cartItemId}`);
      fetchCart();
    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.message || error.message);
    }
  };

  const clearCart = async () => {
    try {
      await API.delete("/cart");
      setCart([]);
    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        fetchCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
