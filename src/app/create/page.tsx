"use client";
import React, { useState } from "react";

import { createProduct } from "@/app/api/products/crud";
import { rand_num } from "@/app/api/random";
import { Product } from "@prisma/client";

export default function ProductForm() {
  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [faq, setFaq] = useState<string>("");
  const [stat, setStat] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [value, setValue] = useState<number>(0);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
        price: price,
        stat: stat,
        value: value,
        about: about,
        faq: faq,
        stars: 0,
      };
      const data = await createProduct(product);
      console.log(data);

      setTimeout(() => {
        setSuccessMessage("Product successfully created!");
        // Очищаем форму
        setName("");
        setStat("");
        setFaq("");
        setAbout("");
        setPrice(0);
        setValue(0);
        // Спустя несколько секунд скрываем сообщение об успехе
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

  return (
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
            className="p-2 border-2 border-black dark:border-white flex w-full"
          />
        </label>
        <label className="flex gap-4 items-center">
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            placeholder="price"
            className="ml-1.5 p-2 border-2 border-black dark:border-white flex w-full"
          />
        </label>
        <label className="flex gap-4 items-center">
          About:
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="about"
            className=" p-2 border-2 border-black dark:border-white flex w-full"
          />
        </label>
        <label className="flex gap-4 items-center">
          faq:
          <input
            type="text"
            value={faq}
            onChange={(e) => setFaq(e.target.value)}
            placeholder="faq"
            className="ml-1.5 p-2 border-2 border-black dark:border-white flex w-full max-h-32"
          />
        </label>
        <h3 className="flex justify-around">Stat:</h3>

        <div className="flex gap-4">
          <label className="flex gap-4 items-center">
            Value:
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.valueAsNumber)}
              placeholder="value"
              className="p-2 border-2 border-black dark:border-white"
            />
          </label>
          <label className="flex gap-4 items-center">
            Stat:
            <input
              type="text"
              value={stat}
              onChange={(e) => setStat(e.target.value)}
              placeholder="stat"
              className="p-2 border-2 border-black dark:border-white"
            />
          </label>
        </div>

        <button
          type="submit"
          className="p-4 border-2  transition duration-300 ease-in-out transform hover:scale-110"
        >
          Create
        </button>
      </form>
      {successMessage && <p className="text-xl font-bold">{successMessage}</p>}
    </div>
  );
}
