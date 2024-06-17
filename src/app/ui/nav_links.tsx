"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
  { name: "main", href: "/" },
  {
    name: "products",
    href: "/products",
  },
  { name: "about", href: "/about" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="grow shrink basis-0 h-10 justify-start items-start gap-9 flex">
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
    </div>
  );
}
