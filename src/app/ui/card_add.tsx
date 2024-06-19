import React, { useState } from "react";
import { usePushToCart } from "@/app/api/cart";
import { rand_num } from "@/app/api/random";
import Modal from "@/app/api/modal";
import { Product } from "@prisma/client";

export default function CartItemAdd(item: Product) {
  const { add } = usePushToCart();

  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      key={`${rand_num()}`}
      className="shrink h-96 px-6 py-4 rounded-lg border-4 border-black dark:border-white  flex-col justify-center gap-5 inline-flex transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className=" text-3xl font-normal font-itim">{item.name}</div>
      {item.about ? (
        <p key={`${rand_num()}`} className=" text-2xl font-normal font-itim">
          {item.about}
        </p>
      ) : (
        <></>
      )}
      <div className=" text-2xl font-normal font-itim">Stat:</div>
      <p
        key={`${rand_num()}`}
        className="self-stretch grow shrink basis-0  text-base font-normal font-itim"
      >
        {item.value} {item.stat}
      </p>
      <div className="justify-start items-start gap-5 inline-flex text-3xl font-normal font-itim">
        <div className="flex gap-4">
          <div>price:</div>
          <div>{item.price === 0 ? "free" : `$${item.price}`}</div>
        </div>
        <br />
        <div className="flex gap-4">
          <div>{item.stars === 0 ? "0" : `${item.stars}`}</div>
          <div>☆</div>
        </div>
      </div>
      <div className="justify-around items-center gap-5 flex w-full text-3xl font-normal font-itim">
        <button
          onClick={async () => add(item)}
          className="p-2.5 rounded-lg border-2 border-black dark:border-white transition duration-300 ease-in-out transform hover:scale-105 grow"
        >
          Pay
        </button>
        {item.faq ? (
          <div
            onClick={toggleModal}
            className="p-2.5 rounded-lg border-2  border-black dark:border-white flex-col justify-center items-center gap-2.5 inline-flex transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            FAQ
          </div>
        ) : (
          <></>
        )}
      </div>
      <Modal toggleModal={toggleModal} isOpen={showModal}>
        {/* Your FAQ content goes here */}
        <h2>Frequently Asked Questions</h2>
        {item.faq ? <p>{item.faq}</p> : <p>FAQ not found</p>}
        {/* Close */}
        <button
          className="p-2 border-2 border-black dark:border-white rounded-lg"
          onClick={toggleModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}
