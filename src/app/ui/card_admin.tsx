import React from "react";
import { rand_num } from "@/app/api/random";
import { Product } from "@prisma/client";
import { deleteProduct } from "@/app/api/products/crud";

interface CartItemProps {
  item: Product;
  onDelete: (productId: number) => void;
}
const CardAdmin: React.FC<CartItemProps> = ({ item, onDelete }) => {
  const deleteItem = () => {
    deleteProduct(item.id).then();
  };

  return (
    <div
      key={`${item.id}`}
      className="shrink h-96 px-6 py-4 rounded-lg border-4 border-black dark:border-white  flex-col justify-center  gap-5 inline-flex transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className=" text-3xl font-normal font-itim">{item.name}</div>
      <div className=" text-2xl font-normal font-itim">Stats:</div>
      <p
        key={`${rand_num()}`}
        className="self-stretch grow shrink basis-0  text-base font-normal font-itim"
      >
        {item.value} {item.stat}
      </p>
      <div className="justify-start items-start gap-5 inline-flex">
        <div className=" text-3xl font-normal font-itim">price:</div>
        <div className=" text-3xl font-normal font-itim">
          {item.price === 0 ? "free" : `$${item.price}`}
        </div>
      </div>
      <div className="grid gap-2">
        <h2>FAQ</h2>
        {item.faq ? <p>{item.faq}</p> : <p>FAQ not found</p>}
      </div>
      <div
        onClick={deleteItem}
        className="forced-colors:text-yellow-200 p-2.5 rounded-lg border-2 border-black dark:border-white  flex-col justify-center items-center gap-2.5 inline-flex transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer w-full"
      >
        <div className="-black text-3xl font-normal font-itim">remove</div>
      </div>
    </div>
  );
};

export default CardAdmin;
