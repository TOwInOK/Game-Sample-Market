"use client";
import React, { useEffect, useState } from "react";
import { useCart, useRemoveFromCart } from "@/app/api/cart";
import CartItemDelete from "@/app/ui/card_delete";
import { Products } from "@/app/api/products/Products";
import { getCookie } from "cookies-next";
import { getMoney } from "@/app/api/money/crud";
import { useSession } from "next-auth/react";

export default function Page() {
  const { state } = useCart();
  const { removeItemById } = useRemoveFromCart();
  const [layer, setLayer] = useState<Products>(state);
  const [sortedProducts, setSortedProducts] = useState<Products>(layer);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [statSearch, setStatSearch] = useState<string>("");
  const [nameSearch, setNameSearch] = useState<string>("");
  const [coin, setCoin] = useState<number>(0);
  const { data } = useSession();
  useEffect(() => {
    if (data?.user?.email) {
      getMoney(data.user.email).then((money) => {
        if (money) {
          setCoin(money.coins);
        }
      });
      console.log("money: ", coin);
    }
  });
  useEffect(() => {
    const fetchCart = async () => {
      try {
        let cookieData = getCookie("cart");
        if (cookieData) {
          setLayer({ vec: [...JSON.parse(cookieData)] });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchCart();
  }, [state]);

  useEffect(() => {
    const filtered = layer.vec.filter(
      (product) =>
        product?.stat?.includes(valueSearch) &&
        product?.value?.toString().includes(statSearch),
    );
    setSortedProducts({ vec: filtered });
  }, [valueSearch, statSearch, layer.vec]);

  useEffect(() => {
    const filtered = layer.vec.filter(
      (product) =>
        product.value.toString().includes(valueSearch) &&
        product.stat.includes(statSearch) &&
        product.name.toLowerCase().includes(nameSearch.toLowerCase()),
    );
    setSortedProducts({ vec: filtered });
  }, [valueSearch, statSearch, nameSearch, layer]);

  const handleDelete = (productId: number) => {
    removeItemById(productId);
    setSortedProducts({
      vec: sortedProducts.vec.filter((prod) => prod.id !== productId),
    });
  };
  const sortByPriceAsc = () => {
    const sorted = layer.vec.sort((a, b) => a.price - b.price);
    setSortedProducts({ vec: sorted });
  };

  const sortByPriceDesc = () => {
    const sorted = layer.vec.sort((a, b) => b.price - a.price);
    setSortedProducts({ vec: sorted });
  };

  const sortByNameAsc = () => {
    const sorted = layer.vec.sort((a, b) => a.name.localeCompare(b.name));
    setSortedProducts({ vec: sorted });
  };

  const sortByNameDesc = () => {
    const sorted = layer.vec.sort((a, b) => b.name.localeCompare(a.name));
    setSortedProducts({ vec: sorted });
  };

  return (
    <div className="w-full grow grid gap-14">
      {/* Sorted buttons */}
      <div className="flex justify-between">
        <button
          className="p-4 border-2 border-black dark:border-white transition duration-300 ease-in-out transform hover:scale-110"
          onClick={sortByPriceAsc}
        >
          Price (Low to High)
        </button>
        <button
          className="p-4 border-2 border-black dark:border-white transition duration-300 ease-in-out transform hover:scale-110"
          onClick={sortByPriceDesc}
        >
          Price (High to Low)
        </button>
        <button
          className="p-4 border-2 border-black dark:border-white transition duration-300 ease-in-out transform hover:scale-110"
          onClick={sortByNameAsc}
        >
          Name (A to Z)
        </button>
        <button
          className="p-4 border-2 border-black dark:border-white transition duration-300 ease-in-out transform hover:scale-110"
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
          className="p-4 border-2 border-black dark:border-white transition duration-300 ease-in-out transform hover:scale-110 dark:bg-black"
        />
        <input
          type="text"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          placeholder="Name"
          className="p-4 border-2 border-black dark:border-white transition duration-300 ease-in-out transform hover:scale-110 grow dark:bg-black"
        />
        <input
          type="text"
          value={statSearch}
          onChange={(e) => setStatSearch(e.target.value)}
          placeholder="Stat"
          className="p-4 border-2 border-black dark:border-white transition duration-300 ease-in-out transform hover:scale-110 dark:bg-black"
        />
      </div>
      <div className="flex justify-around w-full">
        {sortedProducts?.vec?.length === 0 ? (
          <p className="col-span-3 h-[430px]">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-3 gap-40 overflow-y-scroll h-[430px] p-4 no-scrollbar scroll-smooth">
            {sortedProducts?.vec?.map((item) => (
              <CartItemDelete
                key={item.id}
                item={item}
                onDelete={handleDelete}
                coins={coin}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
