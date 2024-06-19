"use client";
import React, { ReactNode, useContext, useReducer } from "react";
import {
  ProductContext,
  Products,
  StateSelector,
} from "@/app/api/products/Products";
import { Product } from "@prisma/client";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import { decMoney, getMoney } from "@/app/api/money/crud";

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
  let exist = hasCookie("cart");
  if (exist) {
    let cart = getCookie("cart");
    let cartLayer: Product[] = JSON.parse(cart?.toString() || "");
    return cartLayer.reduce((total, item) => total + item.price, 0);
  } else {
    return 0;
  }
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
    let exist = hasCookie("cart");
    if (exist) {
      let cart = getCookie("cart");
      let cartLayer: Product[] = JSON.parse(cart?.toString() || "");
      let id = cartLayer[cartLayer.length - 1]?.id + 1;
      let local_item = {
        ...item,
        id: id,
      };
      setCookie("cart", [...cartLayer, local_item], {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    } else {
      setCookie("cart", [item], {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    dispatch({ type: "add", item });
  };

  return { add };
}

export function useRemoveFromCart() {
  const { dispatch } = useCart();
  const { data } = useSession();
  const removeAllItems = () => {
    deleteCookie("cart");
    setCookie("cart", [], {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    dispatch({ type: "rm_all" });
  };
  const removeItemById = (id: number) => {
    let cart = getCookie("cart");
    let cartLayer: Product[] = JSON.parse(cart?.toString() || "");
    setCookie("cart", [...cartLayer.filter((product) => product.id !== id)], {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    //
    if (data?.user?.email) {
      getMoney(data.user.email).then((money) => {
        if (money && money.coins >= 10) {
          if (data.user?.email) {
            decMoney(data.user.email, 10).then();
          }
        }
      });
    }
    dispatch({ type: "rm_by_id", id });
  };
  return { removeAllItems, removeItemById };
}
