import React, { useState, useEffect, useRef } from "react";
import { Product, randomInt, useCart } from "../cartapi/cart";

interface CartItemProps {
  item: Product;
}

const CartItemDelete: React.FC<CartItemProps> = ({ item }) => {
  const { dispatch } = useCart();
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);

  return (
    <div
      key={`${item.id}`}
      className="w-56 h-96 px-6 py-4 rounded-lg border-4 border-black flex-col justify-center items-start gap-5 inline-flex transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="text-black text-3xl font-normal font-itim">
        {item.name}
      </div>
      <div className="text-black text-2xl font-normal font-itim">Stats:</div>
      {item.stats.map((stat) => (
        <p
          key={`${randomInt()}`}
          className="self-stretch grow shrink basis-0 text-black text-base font-normal font-itim"
        >
          {stat.value} {stat.stat}
        </p>
      ))}
      <div className="justify-start items-start gap-5 inline-flex">
        <div className="text-black text-3xl font-normal font-itim">price:</div>
        <div className="text-black text-3xl font-normal font-itim">
          ${item.price}$
        </div>
      </div>
      <div className="justify-center items-center gap-5 inline-flex">
        <button
          onClick={() => dispatch({ type: "REMOVE_FROM_CART", id: item.id })}
          className="p-2.5 rounded-lg border-2 border-black flex-col justify-center items-center gap-2.5 inline-flex transition duration-300 ease-in-out transform hover:scale-105"
        >
          <div className="text-black text-3xl font-normal font-itim ">Buy</div>
        </button>
        <div
          onClick={toggleModal}
          className="p-2.5 rounded-lg border-2 border-black flex-col justify-center items-center gap-2.5 inline-flex transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          <div className="text-black text-3xl font-normal font-itim">FAQ</div>
        </div>
      </div>
      {showModal && (
        // FAQ
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div
            className="bg-white p-6 rounded-lg flex flex-col justify-between gap-2"
            ref={modalRef}
          >
            {/* Your FAQ content goes here */}
            <h2>Frequently Asked Questions</h2>
            <p>This is where you put your FAQ content.</p>
            {/* Close */}
            <button
              className="p-2 border-2 border-black rounded-lg"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemDelete;
