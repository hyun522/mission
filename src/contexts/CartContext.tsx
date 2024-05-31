import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: number;
  image: string;
  rating: { rate: number; count: number };
}

interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, totalPrice: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    product: Product,
    quantity: number,
    totalPrice: number,
  ) => {
    setCart((prevCart: CartItem[]) => [
      ...prevCart,
      { product, quantity, totalPrice },
    ]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
