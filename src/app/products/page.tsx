"use client";

import { useEffect, useState } from "react";
import CartItemAdd from "../ui/card_add";
import { Products } from "@/app/api/products/Products";
import { getProducts } from "@/app/api/crud";

export default function Page() {
  const [products, setProducts] = useState<Products>({ vec: [] });
  const [sortedProducts, setSortedProducts] = useState<Products>({ vec: [] });
  const [valueSearch, setValueSearch] = useState<string>("");
  const [statSearch, setStatSearch] = useState<string>("");
  const [nameSearch, setNameSearch] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts().then();
  }, []);

  useEffect(() => {
    const filtered = products.vec.filter((product) =>
      product.stats.some(
        (stat) =>
          stat.value.toString().includes(valueSearch) &&
          stat.stat.includes(statSearch),
      ),
    );
    setSortedProducts({ vec: filtered });
  }, [valueSearch, statSearch, products.vec]);

  useEffect(() => {
    const filtered = products.vec.filter(
      (product) =>
        product.stats.some(
          (stat) =>
            stat.value.toString().includes(valueSearch) &&
            stat.stat.includes(statSearch),
        ) && product.name.toLowerCase().includes(nameSearch.toLowerCase()),
    );
    setSortedProducts({ vec: filtered });
  }, [valueSearch, statSearch, nameSearch, products.vec]);

  const sortByPriceAsc = () => {
    const sorted = products.vec.sort((a, b) => a.price - b.price);
    setSortedProducts({ vec: sorted });
  };

  const sortByPriceDesc = () => {
    const sorted = products.vec.sort((a, b) => b.price - a.price);
    setSortedProducts({ vec: sorted });
  };

  const sortByNameAsc = () => {
    const sorted = products.vec.sort((a, b) => a.name.localeCompare(b.name));
    setSortedProducts({ vec: sorted });
  };

  const sortByNameDesc = () => {
    const sorted = products.vec.sort((a, b) => b.name.localeCompare(a.name));
    setSortedProducts({ vec: sorted });
  };

  return (
    <div className="w-full grow grid gap-14">
      {/* Sorted buttons */}
      <div className="flex justify-between">
        <button
          className="p-4 border-2  transition duration-300 ease-in-out transform hover:scale-110"
          onClick={sortByPriceAsc}
        >
          Price (Low to High)
        </button>
        <button
          className="p-4 border-2  transition duration-300 ease-in-out transform hover:scale-110"
          onClick={sortByPriceDesc}
        >
          Price (High to Low)
        </button>
        <button
          className="p-4 border-2  transition duration-300 ease-in-out transform hover:scale-110"
          onClick={sortByNameAsc}
        >
          Name (A to Z)
        </button>
        <button
          className="p-4 border-2  transition duration-300 ease-in-out transform hover:scale-110"
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
          className="p-4 border-2  transition duration-300 ease-in-out transform hover:scale-110 dark:bg-black"
        />
        <input
          type="text"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          placeholder="Name"
          className="p-4 border-2  transition duration-300 ease-in-out transform hover:scale-110 grow dark:bg-black"
        />
        <input
          type="text"
          value={statSearch}
          onChange={(e) => setStatSearch(e.target.value)}
          placeholder="Stat"
          className="p-4 border-2 transition duration-300 ease-in-out transform hover:scale-110 dark:bg-black"
        />
      </div>
      {/* Cards */}
      <div className="flex justify-around w-full">
        {sortedProducts.vec.length === 0 ? (
          <p className="text-3xl h-96">Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-40 overflow-y-scroll h-96 p-4 no-scrollbar scroll-smooth">
            {sortedProducts.vec.map((item) => (
              <CartItemAdd key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
