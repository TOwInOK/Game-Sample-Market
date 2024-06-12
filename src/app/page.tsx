import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col justify-between items-center py-40 px-20">
      <div className="text-6xl font-normal font-itim">
        Hey! Do you wana buy something?
      </div>
      <div className="flex justify-between w-full">
        <button className="transition duration-700 ease-in-out transform hover:scale-105 hover:-rotate-[1deg] px-10 py-1.5 origin-top-left rotate-[20deg] rounded-xl border flex justify-center items-center gap-2.5">
          <Link
            href="/register"
            id="register"
            className=" text-6xl font-normal font-itim"
          >
            register
          </Link>
        </button>
        <button className="transition duration-700 ease-in-out transform hover:scale-105 hover:-rotate-[1deg] px-10 py-1.5 origin-top-left rotate-[20deg] rounded-xl border flex justify-center items-center gap-2.5">
          <Link
            href="/products"
            id="go_product"
            className=" text-6xl font-normal font-itim"
          >
            find out?
          </Link>
        </button>
        <button className="transition duration-700 ease-in-out transform hover:scale-105 hover:-rotate-[1deg] px-10 py-1.5 origin-top-left rotate-[20deg] rounded-xl border flex justify-center items-center gap-2.5">
          <Link
            href="/login"
            id="login"
            className=" text-6xl font-normal font-itim"
          >
            login
          </Link>
        </button>
      </div>
    </main>
  );
}
