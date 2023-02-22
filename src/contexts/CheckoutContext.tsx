import React, { createContext, ReactNode, useMemo, useState } from "react";

import axios from "axios";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  priceId: string;
}

interface CheckoutContextType {
  cart: Product[];
  totalItems: number;
  productsTotalAmount: number;

  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;

  submitOrder: () => void;
}

export const CheckoutContext = createContext({} as CheckoutContextType);

interface CheckoutContextProviderProps {
  children: ReactNode;
}

const CheckoutContextProvider = ({
  children,
}: CheckoutContextProviderProps) => {
  const [cart, setCart] = useState<Product[]>([]);

  const totalItems = cart.length;

  const productsTotalAmount = cart
    .map((prodByQtd) => prodByQtd.price)
    .reduce((total, curr) => total + curr, 0);

  const addProductToCart = (product: Product) => {
    const existingProduct = cart.find((prod) => prod.id === product.id);

    if (!existingProduct) {
      setCart((state) => {
        return [...state, product];
      });
    }
  };

  const removeProductFromCart = (productId: string) => {
    setCart((state) => {
      return state.filter((prod) => prod.id !== productId);
    });
  };

  const submitOrder = async () => {
    try {
      const response = await axios.post("/api/checkout", {
        priceIds: cart.map((product) => product.priceId),
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      alert("Falha ao realizar a compra");
    }
  };

  const contextReturn = useMemo(() => {
    return {
      cart,
      totalItems,
      productsTotalAmount,
      addProductToCart,
      removeProductFromCart,
      submitOrder,
    };
  }, [
    cart,
    totalItems,
    productsTotalAmount,
    addProductToCart,
    removeProductFromCart,
    submitOrder,
  ]);

  return (
    <CheckoutContext.Provider value={contextReturn}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
