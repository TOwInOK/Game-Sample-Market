"use client";
import React, {useEffect, useState} from "react";
import {useCart, useRemoveFromCart} from "../cartapi/cart";
import CartItemDelete from "@/app/ui/card_delete";
import {Products} from "@/app/cartapi/Products";
export default function Page() {
  const { state } = useCart();
  const {removeItemById} = useRemoveFromCart();

  const [sortedProducts, setSortedProducts] = useState<Products>(state);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [statSearch, setStatSearch] = useState<string>("");
  const [nameSearch, setNameSearch] = useState<string>("");

  useEffect(() => {
    const filtered = state.vec.filter((product) =>
        product.stats.vec.some(
            (stat) =>
                stat.value.toString().includes(valueSearch) && stat.stat.includes(statSearch),
        ),
    );
    setSortedProducts({vec: filtered});
  }, [valueSearch, statSearch]);

  useEffect(() => {
    const filtered = state.vec.filter(
        (product) =>
            product.stats.vec.some(
                (stat) =>
                    stat.value.toString().includes(valueSearch) && stat.stat.includes(statSearch),
            ) && product.name.toLowerCase().includes(nameSearch.toLowerCase()),
    );
    setSortedProducts({vec: filtered});
  }, [valueSearch, statSearch, nameSearch]);

  const handleDelete = (productId: number) => {
    removeItemById(productId)
    setSortedProducts({vec: sortedProducts.vec.filter((prod) => prod.id !== productId)})
  };
  const sortByPriceAsc = () => {
    const sorted = state.vec.sort((a, b) => a.price - b.price);
    setSortedProducts({vec: sorted});
  };

  const sortByPriceDesc = () => {
    const sorted = state.vec.sort((a, b) => b.price - a.price);
    setSortedProducts({vec: sorted});
  };

  const sortByNameAsc = () => {
    const sorted = state.vec.sort((a, b) => a.name.localeCompare(b.name));
    setSortedProducts({vec: sorted});
  };

  const sortByNameDesc = () => {
    const sorted = state.vec.sort((a, b) => b.name.localeCompare(a.name));
    setSortedProducts({vec: sorted});
  };

  return (
      <div className="w-full grow grid gap-14">
      {/* Sorted buttons */}
  <div className="flex justify-between">
    <button
        className="p-4 border-2 border-black transition duration-300 ease-in-out transform hover:scale-110"
        onClick={sortByPriceAsc}
    >
      Price (Low to High)
    </button>
    <button
        className="p-4 border-2 border-black transition duration-300 ease-in-out transform hover:scale-110"
        onClick={sortByPriceDesc}
    >
      Price (High to Low)
    </button>
    <button
        className="p-4 border-2 border-black transition duration-300 ease-in-out transform hover:scale-110"
        onClick={sortByNameAsc}
    >
      Name (A to Z)
    </button>
    <button
        className="p-4 border-2 border-black transition duration-300 ease-in-out transform hover:scale-110"
        onClick={sortByNameDesc}
    >
      Name (Z to A)
    </button>
  </div>
  {/* Search */}
  <div className="inline-flex items-center gap-12 px-20">
    <input
        type="text"
        value={valueSearch}
        onChange={(e) => setValueSearch(e.target.value)}
        placeholder="Value"
        className="p-4 border-2 border-black transition duration-300 ease-in-out transform hover:scale-110"
    />
    <input
        type="text"
        value={nameSearch}
        onChange={(e) => setNameSearch(e.target.value)}
        placeholder="Name"
        className="p-4 border-2 border-black transition duration-300 ease-in-out transform hover:scale-110 grow"
    />
    <input
        type="text"
        value={statSearch}
        onChange={(e) => setStatSearch(e.target.value)}
        placeholder="Stat"
        className="p-4 border-2 border-black transition duration-300 ease-in-out transform hover:scale-110"
    />
  </div>
    <div className="justify-center items-start gap-24 grid grid-cols-3">
      {sortedProducts.vec.length === 0 ? (
        <p className="col-span-3">Your cart is empty</p>
      ) : (
        <>
          {sortedProducts.vec.map((item) => (
            <CartItemDelete key={item.id} item={item} onDelete={handleDelete}/>
          ))}
        </>
      )}
    </div>
      </div>
  );
}
