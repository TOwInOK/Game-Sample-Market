"use client";
import { useState, useEffect } from "react";
import CartItemAdd from "../ui/card_add";

export interface Product {
  id: string;
  name: string;
  stats: { value: string; stat: string }[];
  price: number;
}

// Пример массива продуктов
const products: Product[] = [
  {
    id: "1",
    name: "Assout cirase",
    stats: [
      { value: "+1", stat: "armor" },
      { value: "-2", stat: "armor for enemy" },
    ],
    price: 100,
  },
  {
    id: "2",
    name: "Meat",
    stats: [{ value: "+20", stat: "heal" }],
    price: 200,
  },
  {
    id: "3",
    name: "Sturdy Shield",
    stats: [
      { value: "+3", stat: "armor" },
      { value: "-1", stat: "armor for enemy" },
    ],
    price: 150,
  },
  {
    id: "4",
    name: "Potion of Strength",
    stats: [{ value: "+10", stat: "strength" }],
    price: 120,
  },
  {
    id: "5",
    name: "Silver Sword",
    stats: [{ value: "+5", stat: "attack" }],
    price: 300,
  },
  {
    id: "6",
    name: "Elven Bow",
    stats: [{ value: "+8", stat: "ranged attack" }],
    price: 250,
  },
  {
    id: "7",
    name: "Cloak of Invisibility",
    stats: [{ value: "invisibility", stat: "special" }],
    price: 500,
  },
  {
    id: "8",
    name: "Wand of Fireball",
    stats: [{ value: "fireball", stat: "spell" }],
    price: 400,
  },
  {
    id: "9",
    name: "Scroll of Teleportation",
    stats: [{ value: "teleportation", stat: "spell" }],
    price: 350,
  },
  {
    id: "10",
    name: "Ring of Regeneration",
    stats: [{ value: "+5", stat: "health regeneration" }],
    price: 280,
  },
  {
    id: "11",
    name: "Dagger of Poison",
    stats: [{ value: "poison", stat: "special" }],
    price: 180,
  },
  {
    id: "12",
    name: "Helmet of Intelligence",
    stats: [{ value: "+3", stat: "intelligence" }],
    price: 220,
  },
  {
    id: "13",
    name: "Boots of Agility",
    stats: [{ value: "+4", stat: "agility" }],
    price: 190,
  },
  {
    id: "14",
    name: "Amulet of Luck",
    stats: [{ value: "+10", stat: "luck" }],
    price: 270,
  },
  {
    id: "15",
    name: "Staff of Healing",
    stats: [{ value: "+15", stat: "healing" }],
    price: 320,
  },
  {
    id: "16",
    name: "Holy Water",
    stats: [{ value: "undead damage", stat: "special" }],
    price: 150,
  },
  {
    id: "17",
    name: "Robe of Protection",
    stats: [
      { value: "+2", stat: "armor" },
      { value: "+1", stat: "magic resistance" },
    ],
    price: 280,
  },
  {
    id: "18",
    name: "Gloves of Dexterity",
    stats: [{ value: "+4", stat: "dexterity" }],
    price: 200,
  },
  {
    id: "19",
    name: "Enchanted Necklace",
    stats: [{ value: "+5", stat: "magic" }],
    price: 300,
  },
  {
    id: "20",
    name: "Scepter of Thunder",
    stats: [{ value: "thunderbolt", stat: "spell" }],
    price: 450,
  },
];

export default function Page() {
  const [sortedProducts, setSortedProducts] = useState<Product[]>([
    ...products,
  ]);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [statSearch, setStatSearch] = useState<string>("");
  const [nameSearch, setNameSearch] = useState<string>("");

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.stats.some(
        (stat) =>
          stat.value.includes(valueSearch) && stat.stat.includes(statSearch),
      ),
    );
    setSortedProducts(filtered);
  }, [valueSearch, statSearch]);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.stats.some(
          (stat) =>
            stat.value.includes(valueSearch) && stat.stat.includes(statSearch),
        ) && product.name.toLowerCase().includes(nameSearch.toLowerCase()),
    );
    setSortedProducts(filtered);
  }, [valueSearch, statSearch, nameSearch]);

  const sortByPriceAsc = () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };

  const sortByPriceDesc = () => {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    setSortedProducts(sorted);
  };

  const sortByNameAsc = () => {
    const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
    setSortedProducts(sorted);
  };

  const sortByNameDesc = () => {
    const sorted = [...products].sort((a, b) => b.name.localeCompare(a.name));
    setSortedProducts(sorted);
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
      {/* Cards */}
      <div className="justify-center items-start gap-24 grid grid-cols-3 pl-14 py-4 h-96 overflow-x-auto no-scrollbar scroll-smooth">
        {sortedProducts.length === 0 ? (
          <p className="col-span-3">Your cart is empty</p>
        ) : (
          sortedProducts.map((item) => <CartItemAdd key={item.id} {...item} />)
        )}
      </div>
    </div>
  );
}
