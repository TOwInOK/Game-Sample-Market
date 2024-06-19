"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const links = [
  { name: "main", href: "/", private: false },
  {
    name: "products",
    href: "/products",
    private: true,
  },
  { name: "about", href: "/about", private: false },
  { name: "game", href: "/game", private: true },
  { name: "profile", href: "/profile", private: true },
];

export default function NavLinks() {
  const { data } = useSession();
  const pathname = usePathname();
  return (
    <div className="grow shrink basis-0 h-10 justify-start items-start gap-9 flex">
      {links.map((link) => {
        return link.private && !data?.user ? null : (
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
