"use client";
import React from "react";
import { useCart } from "../cartapi/cart";
import CartItemDelete from "../ui/card_delete";

export default function Page() {
  const { state } = useCart();

  return (
    <div className="justify-center items-start gap-24 grid grid-cols-3">
      {state.cart.length === 0 ? (
        <p className="col-span-3">Your cart is empty</p>
      ) : (
        <>
          {state.cart.map((item) => (
            <CartItemDelete key={item.id} item={item} />
          ))}
        </>
      )}
    </div>
  );
}
