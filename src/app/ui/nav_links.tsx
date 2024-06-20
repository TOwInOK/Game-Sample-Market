"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const links = [
  { name: "main", href: "/", private: false, protected: false },
  {
    name: "products",
    href: "/products",
    private: true,
    protected: false,
  },
  { name: "about", href: "/about", private: false, protected: false },
  { name: "game", href: "/game", private: true, protected: false },
  { name: "profile", href: "/profile", private: true, protected: false },
  {
    name: "MANAGE_ITEMS",
    href: "/products/create",
    private: true,
    protected: true,
  },
];

export default function NavLinks() {
  const router = useRouter();
  const [prot, setProt] = useState<boolean>(false);
  // проверка на админа
  useEffect(() => {
    const fetchPrivilege = async () => {
      const res = await fetch("/api/auth");
      const user = await res.json();

      if (res.status === 200) {
        setProt(true);
      }
    };

    fetchPrivilege();
  }, [router]);

  const { data } = useSession();
  const pathname = usePathname();
  return (
    <div className="grow shrink basis-0 h-10 justify-start items-start gap-9 flex">
      {links.map((link) => {
        return (link.private && !link.private && !data?.user) ||
          (link.private && link.protected && !data?.user) ? null : (
          <Link key={link.name} href={link.href}>
            <p
              className={clsx(
                "text-3xl font-normal font-itim uppercase",
                { underline: pathname === link.href },
                {
                  "transition duration-300 ease-in-out transform hover:scale-110 hover:underline":
                    pathname !== link.href,
                },
                {
                  hidden: link.protected && !prot,
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
