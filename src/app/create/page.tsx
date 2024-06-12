"use client";
import React, { useState } from "react";
import { Product, Stat } from "@/app/api/products/Product";
import { createProduct } from "@/app/api/products/crud";
import { rand_num } from "@/app/api/random";

export default function ProductForm() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stats, setStats] = useState<Stat[]>([{ value: "", stat: "" }]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const addStatField = () => {
    setStats([...stats, { value: "", stat: "" }]);
  };
  const rmStatField = (outerid: number) => {
    setStats(stats.filter((item, id) => id !== outerid));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "") {
      setTimeout(() => {
        setSuccessMessage("Please set the name!");
        // Спустя несколько секунд скрываем сообщение об успехе
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }, 1000);
      return;
    } else {
      stats.map((stat, value) => {
        if (stat.stat === "" || stat.value === "") {
          setTimeout(() => {
            setSuccessMessage("Please fill stats data");
            // Спустя несколько секунд скрываем сообщение об успехе
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          }, 1000);
          return;
        }
      });
    }

    try {
      const product: Product = {
        id: rand_num(),
        name: name,
        price: price,
        stats: stats,
      };
      const data = await createProduct(product);
      console.log(data); // Здесь ты можешь работать с полученными данными

      setTimeout(() => {
        setSuccessMessage("Product successfully created!");
        // Очищаем форму
        setName("");
        setPrice(0);
        setStats([{ value: "", stat: "" }]);
        // Спустя несколько секунд скрываем сообщение об успехе
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }, 1000);
      return;
    } catch (error) {
      console.error("Error pushing products:", error);
      setTimeout(() => {
        setSuccessMessage("Data create is confused, check log");

        // Спустя несколько секунд скрываем сообщение об успехе
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }, 1000);
      return;
    }
  };

  const handleStatChange = (
    index: number,
    field: keyof Stat,
    value: string,
  ) => {
    const updatedStats = [...stats];
    updatedStats[index][field] = value;
    setStats(updatedStats);
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
            className="p-2 border-2 dark:bg-black flex w-full"
          />
        </label>
        <label className="flex gap-4 items-center">
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            placeholder="price"
            className="ml-1.5 p-2 border-2 dark:bg-black flex w-full"
          />
        </label>
        <h3 className="flex justify-around">Stats:</h3>
        {stats.map((stat, index) => (
          <div className="flex gap-4" key={index}>
            <label className="flex gap-4 items-center">
              Value:
              <input
                type="text"
                value={stat.value}
                onChange={(e) =>
                  handleStatChange(index, "value", e.target.value)
                }
                placeholder="value"
                className="p-2 border-2 dark:bg-black"
              />
            </label>
            <label className="flex gap-4 items-center">
              Stat:
              <input
                type="text"
                value={stat.stat}
                onChange={(e) =>
                  handleStatChange(index, "stat", e.target.value)
                }
                placeholder="stat"
                className="p-2 border-2 dark:bg-black"
              />
            </label>
            <button
              type="button"
              onClick={() => rmStatField(index)}
              className="p-2 border-2 transition duration-300 ease-in-out transform hover:scale-110"
            >
              X
            </button>
          </div>
        ))}
        <div className="grid gap-4">
          <button
            type="button"
            onClick={addStatField}
            className="p-2 border-2 transition duration-300 ease-in-out transform hover:scale-110"
          >
            Add Stat
          </button>
          <button
            type="submit"
            className="p-2 border-2 transition duration-300 ease-in-out transform hover:scale-110"
          >
            Create
          </button>
        </div>
      </form>
      {successMessage && <p className="text-xl font-bold">{successMessage}</p>}
    </div>
  );
}
