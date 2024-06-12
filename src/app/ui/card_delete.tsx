import React, { useState } from "react";
import { useRemoveFromCart } from "@/app/api/cart";
import { Product } from "@/app/api/products/Product";
import Modal from "@/app/api/modal";
import { rand_num } from "@/app/api/random";

interface CartItemProps {
  item: Product;
  onDelete: (productId: number) => void;
}

const CartItemDelete: React.FC<CartItemProps> = ({ item, onDelete }) => {
  const { removeItemById } = useRemoveFromCart();
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      key={`${item.id}`}
      className="w-56 h-96 px-6 py-4 rounded-lg border-4  flex-col justify-center items-start gap-5 inline-flex transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className=" text-3xl font-normal font-itim">{item.name}</div>
      <div className=" text-2xl font-normal font-itim">Stats:</div>
      {item.stats.map((stat) => (
        <p
          key={`${rand_num()}`}
          className="self-stretch grow shrink basis-0  text-base font-normal font-itim"
        >
          {stat.value} {stat.stat}
        </p>
      ))}
      <div className="justify-start items-start gap-5 inline-flex">
        <div className=" text-3xl font-normal font-itim">price:</div>
        <div className=" text-3xl font-normal font-itim">
          {item.price === 0 ? "free" : `$${item.price}`}
        </div>
      </div>
      <div className="justify-center items-center gap-5 inline-flex">
        <button
          onClick={() => onDelete(item.id)}
          className="p-2.5 rounded-lg border-2  flex-col justify-center items-center gap-2.5 inline-flex transition duration-300 ease-in-out transform hover:scale-105"
        >
          <div className=" text-3xl font-normal font-itim ">Buy</div>
        </button>
        <div
          onClick={toggleModal}
          className="p-2.5 rounded-lg border-2  flex-col justify-center items-center gap-2.5 inline-flex transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          <div className="-black text-3xl font-normal font-itim">FAQ</div>
        </div>
      </div>

      <Modal isOpen={showModal} toggleModal={toggleModal}>
        {/* Your FAQ content goes here */}
        <h2>Frequently Asked Questions</h2>
        <p>This is where you put your FAQ content.</p>
        {/* Close */}
        <button className="p-2 border-2  rounded-lg" onClick={toggleModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default CartItemDelete;
