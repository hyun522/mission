import React, { createContext, useContext, useState } from 'react';
// createContext :
// Context 객체 안에는 Provider라는 컴포넌트가 들어있습니다.
// 그리고, 그 컴포넌트간에 공유하고자 하는 값을 value 라는 Props로 설정하면 자식 컴포넌트들에서 해당 값에 바로 접근을 할 수 있습니다.

//useContext
// 원하는 컴포넌트에서 useContext 라는 Hook을 사용하여 Context에 넣은 값에 바로 접근할 수 있습니다

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
      {/* cart : 자식 컴포넌트들이 현재 장바구니에 담긴 아이템들을 접근 */}
      {/* addToCart : 자식 컴포넌트들이 장바구니에 아이템을 추가할 수 있게 해줍니다.  */}
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
