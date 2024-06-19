"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart, useRemoveFromCart } from "@/app/api/cart";
import { getCookie, hasCookie } from "cookies-next";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Cart() {
  const currentPath = usePathname();
  const paths = ["/products", "/cart"];
  const { removeAllItems } = useRemoveFromCart();
  const { state } = useCart();
  const [money, setMoney] = useState(0);
  let exist = hasCookie("cart");
  useEffect(() => {
    if (exist) {
      let cart = getCookie("cart");
      let cartLayer: Product[] = JSON.parse(cart?.toString() || "");
      setMoney(cartLayer.reduce((total, item) => total + item.price, 0));
    } else {
      setMoney(0);
    }
  }, [state]);

  return (
    <div
      className={clsx(
        "p-2.5 justify-center items-center gap-5 inline-flex",
        {
          " border-2 border-black dark:border-white rounded-lg": paths.some(
            (path) => currentPath.includes(path),
          ),
        },
        {
          "pb-8": !paths.some((path) => currentPath.includes(path)),
        },
      )}
    >
      <>
        <Link
          href="/cart"
          key="cart"
          className="forced-colors:fill-yellow-300 fill-black stroke-black size-10 transition duration-300 ease-in-out transform hover:scale-110 hover:underline dark:fill-white"
        >
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 32C33.0609 32 34.0783 32.4214 34.8284 33.1716C35.5786 33.9217 36 34.9391 36 36C36 37.0609 35.5786 38.0783 34.8284 38.8284C34.0783 39.5786 33.0609 40 32 40C30.9391 40 29.9217 39.5786 29.1716 38.8284C28.4214 38.0783 28 37.0609 28 36C28 33.78 29.78 32 32 32ZM0 0H6.54L8.42 4H38C38.5304 4 39.0391 4.21071 39.4142 4.58579C39.7893 4.96086 40 5.46957 40 6C40 6.34 39.9 6.68 39.76 7L32.6 19.94C31.92 21.16 30.6 22 29.1 22H14.2L12.4 25.26L12.34 25.5C12.34 25.6326 12.3927 25.7598 12.4864 25.8536C12.5802 25.9473 12.7074 26 12.84 26H36V30H12C10.9391 30 9.92172 29.5786 9.17157 28.8284C8.42143 28.0783 8 27.0609 8 26C8 25.3 8.18 24.64 8.48 24.08L11.2 19.18L4 4H0V0ZM12 32C13.0609 32 14.0783 32.4214 14.8284 33.1716C15.5786 33.9217 16 34.9391 16 36C16 37.0609 15.5786 38.0783 14.8284 38.8284C14.0783 39.5786 13.0609 40 12 40C10.9391 40 9.92172 39.5786 9.17157 38.8284C8.42143 38.0783 8 37.0609 8 36C8 33.78 9.78 32 12 32ZM30 18L35.56 8H10.28L15 18H30Z" />
          </svg>
        </Link>
      </>
      <div
        className={clsx("flex justify-center items-center gap-3", {
          hidden: !paths.some((path) => currentPath.includes(path)),
        })}
      >
        <div className=" text-3xl font-normal font-itim uppercase">
          {money}$
        </div>
        <button
          onClick={() => removeAllItems()}
          className="p-2.5 rounded-lg border-2 border-black dark:border-white flex-col justify-center items-center gap-2.5 inline-flex"
        >
          {/* Button */}
          <div className="text-md md:text-xl font-normal font-itim forced-colors:text-yellow-200">
            pay all
          </div>
        </button>
      </div>
    </div>
  );
}
