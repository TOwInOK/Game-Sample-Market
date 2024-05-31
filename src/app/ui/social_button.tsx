import Link from "next/link";
import Image from "next/image";

const links = [
  { name: "discord", href: "/about", icon: "/ds.svg" },
  { name: "vk", href: "/about", icon: "/tg.svg" },
  { name: "X", href: "/about", icon: "/x.svg" },
  { name: "telegram", href: "/about", icon: "/vk.svg" },
];

export default function Social_button() {
  return (
    <div className=" justify-between flex grow px-32">
      {links.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className="transition duration-300 ease-in-out transform hover:rotate-180"
        >
          <Image
            src={item.icon}
            alt={`icon: ${item.name}`}
            width={25}
            height={25}
            className="transition duration-1200 ease-in-out transform hover:size-8"
          />
        </Link>
      ))}
    </div>
  );
}
