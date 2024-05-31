"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

export interface Product {
  id: string;
  name: string;
  stats: { value: string; stat: string }[];
  price: number;
}

interface CartState {
  cart: Product[];
}

type CartAction =
  | { type: "ADD_TO_CART"; item: Product }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "REMOVE_ALL" };

const CartContext = createContext<
  | {
      state: CartState;
      dispatch: Dispatch<CartAction>;
    }
  | undefined
>(undefined);
// Функция для генерации случайного числа в заданном диапазоне
export function randomInt(): string {
  // Создаем уникальный идентификатор на основе текущего времени и случайного числа
  const timestamp = new Date().getTime();
  const randomNumber = Math.random() * 1000000;
  return `${timestamp}${randomNumber}`;
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem: Product = {
        ...action.item,
        id: randomInt(),
      }; // Генерация случайного числового id
      return { ...state, cart: [...state.cart, newItem] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };
    case "REMOVE_ALL":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export function useGetPrice(): number {
  const { state } = useCart();
  let price = 0;
  state.cart.map((item) => {
    price += item.price;
  });
  return price;
}
export function useRemoveFromCart() {
  const { dispatch } = useCart();

  const removeAllItems = () => {
    dispatch({ type: "REMOVE_ALL" });
  };

  return { removeAllItems };
}
