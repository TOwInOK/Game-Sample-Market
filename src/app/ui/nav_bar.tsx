"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "@/app/ui/cart";
import clsx from "clsx";

const links = [
  { name: "main", href: "/" },
  {
    name: "products",
    href: "/products",
  },
  { name: "about", href: "/about" },
];

export default function NavBar() {
  const pathname = usePathname(); // Убедитесь, что usePathname правильно импортирован

  return (
    <div className="w-full items-center justify-between gap-24 inline-flex">
      <div className="grow shrink basis-0 h-10 justify-start items-start gap-9 flex">
        <>
          {links.map((link) => {
            return (
              <Link key={link.name} href={link.href}>
                <p
                  className={clsx(
                    "text-3xl font-normal font-itim uppercase",
                    { underline: pathname === link.href },
                    {
                      "transition duration-300 ease-in-out transform hover:scale-110 hover:underline":
                        pathname !== link.href,
                    },
                  )}
                >
                  {link.name}
                </p>
              </Link>
            );
          })}
        </>
      </div>
      <>{Cart()}</>
    </div>
  );
}
