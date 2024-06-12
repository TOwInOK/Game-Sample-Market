"use client";
import React, { ReactNode, useContext, useReducer } from "react";
import {
  ProductContext,
  Products,
  StateSelector,
} from "@/app/api/products/Products";
import { Product } from "@/app/api/products/Product";

const initialProducts: Products = { vec: [] };
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(StateSelector, initialProducts);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

/// Get state of cart
export const useCart = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export function useGetPrice(): number {
  const { state } = useCart();
  return state.vec.reduce((total, item) => total + item.price, 0);
}

export function useGetSorted() {
  const { state } = useCart();

  const priceAsc = () => {
    return [...state.vec].sort((a, b) => a.price - b.price);
  };

  const priceDesc = () => {
    return [...state.vec].sort((a, b) => b.price - a.price);
  };

  const nameAsc = () => {
    return [...state.vec].sort((a, b) => a.name.localeCompare(b.name));
  };

  const nameDesc = () => {
    return [...state.vec].sort((a, b) => b.name.localeCompare(a.name));
  };

  return {
    priceAsc,
    priceDesc,
    nameAsc,
    nameDesc,
  };
}

export function usePushToCart() {
  const { dispatch } = useCart();
  const add = (item: Product) => {
    dispatch({ type: "add", item });
  };

  return { add };
}

export function useRemoveFromCart() {
  const { dispatch } = useCart();
  const removeAllItems = () => {
    dispatch({ type: "rm_all" });
  };
  const removeItemById = (id: number) => {
    dispatch({ type: "rm_by_id", id });
  };
  return { removeAllItems, removeItemById };
}
