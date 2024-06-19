//Victorine game of stats in items
"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { getProducts } from "@/app/api/products/crud";
import { useSession } from "next-auth/react";
import { incMoney } from "@/app/api/money/crud";
import { useRouter } from "next/navigation";

export default function Page() {
  //See 4 stats we need to write item with these stats
  //We see 1 right items with these stats and 3 wrong
  const [list, setList] = useState<Product[]>([]);
  const [currentStat, setCurrentStat] = useState<string>("");
  const [rightItem, setRightItem] = useState<Product>({
    about: null,
    faq: null,
    id: 0,
    name: "",
    price: 0,
    stat: "",
    value: 0,
    stars: 0,
  });
  const [wrongItems, setWrongItems] = useState<Product[]>([]);
  const [randomList, setRandomList] = useState<Product[]>([]);
  const { data } = useSession();
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  // Stat for right item
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
  // Load items
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setList(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts().then();
  }, []);

  // Set stat to find
  useEffect(() => {
    setCurrentStat(listOfStats[Math.floor(Math.random() * 10)]);
  }, [list]);

  // Set right item
  useEffect(() => {
    for (let item of list) {
      if (item.stat === currentStat) {
        setRightItem(item);
      }
    }
  }, [currentStat]);

  // Set wrong item
  useEffect(() => {
    setWrongItems(
      [...list.filter((item) => item.stat !== currentStat)].slice(0, 3),
    );
  }, [currentStat]);

  let shuffledList = [...wrongItems, rightItem];
  useEffect(() => {
    // Создаем копию массива для иммутабельного обновления
    let shuffledList = [...wrongItems, rightItem];
    console.log(shuffledList);
    // Перемешиваем копию массива
    for (let i = shuffledList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }

    // Устанавливаем перемешанный массив в состояние
    setRandomList(shuffledList);
  }, [rightItem, wrongItems]); // Пустой массив зависимостей, чтобы эффект выполнился один раз после монтирования компонента

  const router = useRouter();
  useEffect(() => {
    if (data?.user?.email) {
      incMoney(data.user.email, 1).then();
    }
  }, [isCorrect]);
  const handleClick = (item: Product) => {
    if (item.stat === currentStat) {
      setIsCorrect(true);
      router.push("products/");
    } else {
      setRandomList(randomList.filter((i) => i !== item));
    }
  };
  const restartClick = () => {
    setCurrentStat(listOfStats[Math.floor(Math.random() * 10)]);
    setIsCorrect(false);
  };
  return (
    <section className="transition-opacity duration-300 gap-4 flex flex-col justify-around items-center">
      <h1 className="text-xl md:text-3xl font-bold">Victorine Game</h1>
      <p className="text-lg md:text-2xl font-bold">
        Current stat: {currentStat}
      </p>
      {/*<p>Right item: {rightItem?.name}</p>*/}
      <div className="grid gap-4 grid-cols-2">
        {randomList.length > 3 &&
          randomList.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`border ${
                isCorrect && item.stat === currentStat
                  ? "border-green-500"
                  : "border-white"
              }`}
            >
              <p
                className="p-2 border-2 border-black dark:border-white"
                key={item.name}
              >
                {item.name}
              </p>
            </button>
          ))}
      </div>
      {isCorrect ? (
        <p className="text-lg md:text-2xl font-bold">Correct</p>
      ) : (
        <p></p>
      )}
      {randomList.length < 4 && (
        <p className="text-lg md:text-2xl font-bold">Wrong</p>
      )}

      <button onClick={restartClick}>Restart</button>
    </section>
  );
}
