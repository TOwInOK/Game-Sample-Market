"use client";
import React, { useEffect, useState } from "react";

import {
  createProduct,
  deleteProduct,
  getProducts,
} from "@/app/api/products/crud";
import { rand_num } from "@/app/api/random";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Products } from "@/app/api/products/Products";
import CardAdmin from "@/app/ui/card_admin";

export default function ProductForm() {
  const router = useRouter();

  // проверка на админа
  useEffect(() => {
    const fetchPrivilege = async () => {
      const res = await fetch("/api/auth");
      const user = await res.json();

      if (res.status !== 200) {
        router.push("/products");
      }
    };

    fetchPrivilege();
  }, [router]);

  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [faq, setFaq] = useState<string>("");
  const [stat, setStat] = useState<string>("armor");
  const [price, setPrice] = useState<number | null>();
  const [value, setValue] = useState<number | null>();
  const [stars, setStars] = useState<number | null>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [products, setProducts] = useState<Products>({ vec: [] });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts({ vec: products });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts().then();
  }, [products]);
  const listOfStats = [
    "armor",
    "health",
    "mana",
    "stamina",
    "strength",
    "dexterity",
    "intelligence",
    "wisdom",
    "charisma",
  ];

  const handleDelete = (productId: number) => {
    deleteProduct(productId).then();
    setProducts({
      vec: products.vec.filter((prod) => prod.id !== productId),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "" || faq === "" || about === "") {
      setTimeout(() => {
        setSuccessMessage("Please set the text!");
        // Спустя несколько секунд скрываем сообщение об успехе
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }, 1000);
      return;
    } else {
      if (stat === "" || value === 0) {
        setTimeout(() => {
          setSuccessMessage("Please fill stats data");
          // Спустя несколько секунд скрываем сообщение об успехе
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        }, 1000);
        return;
      }
    }

    try {
      const product: Product = {
        id: rand_num(),
        name: name,
        price: price ? price : 0,
        stat: stat,
        value: value ? value : 0,
        about: about,
        faq: faq,
        stars: stars ? stars : 0,
      };
      const data = await createProduct(product);
      // setProducts({ vec: [...products.vec, product] });
      console.log(data);

      setTimeout(() => {
        setSuccessMessage("Product successfully created!");
        setName("");
        setStat("");
        setFaq("");
        setAbout("");
        setPrice(0);
        setValue(0);
        setStars(0);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }, 1000);
      return;
    } catch (error) {
      console.error("Error pushing products:", error);
      setTimeout(() => {
        setSuccessMessage("Data create is confused, proof log");

        // Спустя несколько секунд скрываем сообщение об успехе
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }, 1000);
      return;
    }
  };

  const handleStatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStat(event.target.value);
  };

  return (
    <div className="flex gap-6">
      <div className="grid gap-4">
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <label className="flex gap-4 items-center">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              className="p-2 border-2 border-black dark:border-white flex w-full dark:text-black"
            />
          </label>
          <label className="flex gap-4 items-center">
            Price:
            <input
              type="number"
              value={price || ""}
              onChange={(e) => setPrice(e.target.valueAsNumber)}
              placeholder="price"
              className="ml-1.5 p-2 border-2 border-black dark:border-white flex w-full dark:text-black"
            />
          </label>
          <label className="flex gap-4 items-center">
            About:
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="about"
              className=" p-2 border-2 border-black dark:border-white flex w-full dark:text-black"
            />
          </label>
          <label className="flex gap-4 items-center">
            faq:
            <input
              type="text"
              value={faq}
              onChange={(e) => setFaq(e.target.value)}
              placeholder="faq"
              className="ml-[18px] p-2 border-2 border-black dark:border-white flex w-full max-h-32 dark:text-black"
            />
          </label>
          <label className="flex gap-4 items-center">
            stars:
            <input
              type="number"
              value={stars || ""}
              onChange={(e) => setStars(e.target.valueAsNumber)}
              placeholder="stars"
              className="ml-1.5 p-2 border-2 border-black dark:border-white flex w-full max-h-32 dark:text-black"
            />
          </label>
          <h3 className="flex justify-around">Stat:</h3>

          <div className="flex gap-4">
            <label className="flex gap-4 items-center">
              Value:
              <input
                type="number"
                value={value || ""}
                onChange={(e) => setValue(e.target.valueAsNumber)}
                placeholder="value"
                className="p-2 border-2 border-black dark:border-white dark:text-black"
              />
            </label>
            <label className="dark:text-black flex gap-4 items-center">
              <label className="dark:text-white">Stat: </label>
              <select
                value={stat}
                onChange={handleStatChange}
                className="p-2 border-2 border-black dark:border-white h-full"
              >
                {listOfStats.map((stat) => (
                  <option key={stat} value={stat}>
                    {stat}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="p-4 border-2  transition duration-300 ease-in-out transform hover:scale-110 border-black dark:border-white"
          >
            Create
          </button>
        </form>
        {successMessage && (
          <p className="text-xl font-bold">{successMessage}</p>
        )}
      </div>
      <div className="grid grid-cols-auto gap-6 overflow-y-scroll h-[600px] w-full p-4 no-scrollbar scroll-smooth border border-black dark:border-white">
        {products.vec.length === 0 ? (
          <div className="flex justify-center text-xl font-bold w-[270px]">
            No items in products
          </div>
        ) : (
          <div>
            {products.vec.map((item) => (
              <CardAdmin
                key={item.id}
                item={item}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
