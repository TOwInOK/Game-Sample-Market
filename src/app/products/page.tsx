"use client";

import { useState, useEffect } from "react";
import CartItemAdd from "../ui/card_add";
import {Products} from "@/app/cartapi/Products";



const products: Products = {
  vec: [
    {
      id: 1,
      name: "Assout cirase",
      price: 100,
      stats: {
        vec: [
          { value: 1, stat: "armor" },
          { value: -2, stat: "armor for enemy" }
        ]
      }
    },
    {
      id: 2,
      name: "Meat",
      price: 200,
      stats: {
        vec: [
          { value: 20, stat: "heal" }
        ]
      }
    },
    {
      id: 3,
      name: "Sturdy Shield",
      price: 150,
      stats: {
        vec: [
          { value: 3, stat: "armor" },
          { value: -1, stat: "armor for enemy" }
        ]
      }
    },
    {
      id: 4,
      name: "Potion of Strength",
      price: 120,
      stats: {
        vec: [
          { value: 10, stat: "strength" }
        ]
      }
    },
    {
      id: 5,
      name: "Silver Sword",
      price: 300,
      stats: {
        vec: [
          { value: 5, stat: "attack" }
        ]
      }
    },
    {
      id: 6,
      name: "Elven Bow",
      price: 250,
      stats: {
        vec: [
          { value: 8, stat: "ranged attack" }
        ]
      }
    },
    {
      id: 7,
      name: "Cloak of Invisibility",
      price: 500,
      stats: {
        vec: [
          { value: "invisibility", stat: "special" }
        ]
      }
    },
    {
      id: 8,
      name: "Wand of Fireball",
      price: 400,
      stats: {
        vec: [
          { value: "fireball", stat: "spell" }
        ]
      }
    },
    {
      id: 9,
      name: "Scroll of Teleportation",
      price: 350,
      stats: {
        vec: [
          { value: "teleportation", stat: "spell" }
        ]
      }
    },
    {
      id: 10,
      name: "Ring of Regeneration",
      price: 280,
      stats: {
        vec: [
          { value: 5, stat: "health regeneration" }
        ]
      }
    },
    {
      id: 11,
      name: "Dagger of Poison",
      price: 180,
      stats: {
        vec: [
          { value: "poison", stat: "special" }
        ]
      }
    },
    {
      id: 12,
      name: "Helmet of Intelligence",
      price: 220,
      stats: {
        vec: [
          { value: 3, stat: "intelligence" }
        ]
      }
    },
    {
      id: 13,
      name: "Boots of Agility",
      price: 190,
      stats: {
        vec: [
          { value: 4, stat: "agility" }
        ]
      }
    },
    {
      id: 14,
      name: "Amulet of Luck",
      price: 270,
      stats: {
        vec: [
          { value: 10, stat: "luck" }
        ]
      }
    },
    {
      id: 15,
      name: "Staff of Healing",
      price: 320,
      stats: {
        vec: [
          { value: 15, stat: "healing" }
        ]
      }
    },
    {
      id: 16,
      name: "Holy Water",
      price: 150,
      stats: {
        vec: [
          { value: "undead damage", stat: "special" }
        ]
      }
    },
    {
      id: 17,
      name: "Robe of Protection",
      price: 280,
      stats: {
        vec: [
          { value: 2, stat: "armor" },
          { value: 1, stat: "magic resistance" }
        ]
      }
    },
    {
      id: 18,
      name: "Gloves of Dexterity",
      price: 200,
      stats: {
        vec: [
          { value: 4, stat: "dexterity" }
        ]
      }
    },
    {
      id: 19,
      name: "Enchanted Necklace",
      price: 300,
      stats: {
        vec: [
          { value: 5, stat: "magic" }
        ]
      }
    },
    {
      id: 20,
      name: "Scepter of Thunder",
      price: 450,
      stats: {
        vec: [
          { value: "thunderbolt", stat: "spell" }
        ]
      }
    }
  ]
};

export default function Page() {
  const [sortedProducts, setSortedProducts] = useState<Products>(products);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [statSearch, setStatSearch] = useState<string>("");
  const [nameSearch, setNameSearch] = useState<string>("");

  useEffect(() => {
    const filtered = products.vec.filter((product) =>
      product.stats.vec.some(
        (stat) =>
          stat.value.toString().includes(valueSearch) && stat.stat.includes(statSearch),
      ),
    );
    setSortedProducts({vec: filtered});
  }, [valueSearch, statSearch]);

  useEffect(() => {
    const filtered = products.vec.filter(
      (product) =>
        product.stats.vec.some(
          (stat) =>
            stat.value.toString().includes(valueSearch) && stat.stat.includes(statSearch),
        ) && product.name.toLowerCase().includes(nameSearch.toLowerCase()),
    );
    setSortedProducts({vec: filtered});
  }, [valueSearch, statSearch, nameSearch]);



  const sortByPriceAsc = () => {
    const sorted = products.vec.sort((a, b) => a.price - b.price);
    setSortedProducts({vec: sorted});
  };

  const sortByPriceDesc = () => {
    const sorted = products.vec.sort((a, b) => b.price - a.price);
    setSortedProducts({vec: sorted});
  };

  const sortByNameAsc = () => {
    const sorted = products.vec.sort((a, b) => a.name.localeCompare(b.name));
    setSortedProducts({vec: sorted});
  };

  const sortByNameDesc = () => {
    const sorted = products.vec.sort((a, b) => b.name.localeCompare(a.name));
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
      {/* Cards */}
      <div className="justify-center items-start gap-24 grid grid-cols-3 pl-14 py-4 h-96 overflow-x-auto no-scrollbar scroll-smooth">
        {sortedProducts.vec.length === 0 ? (
          <p className="col-span-3">Your cart is empty</p>
        ) : (
          sortedProducts.vec.map((item) => <CartItemAdd key={item.id} {...item} />)
        )}
      </div>
    </div>
  );
}
