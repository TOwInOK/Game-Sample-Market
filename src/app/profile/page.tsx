import { SignOut } from "@/app/ui/nav_bar";
import { auth } from "@/auth";
import { getMoney } from "@/app/api/money/crud";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const coins = await getMoney(session?.user?.email!);
  return (
    <div className="h-full flex flex-col items-center gap-4 justify-around">
      <div className=" text-3xl font-normal font-itim">
        You Best Profile Ever
      </div>
      {/*  Profile image*/}
      <div className="size-36 flex justify-around p-4 border-2 border-black dark:border-white">
        <img
          src={session?.user?.image!}
          alt="Profile image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid gap-4">
        <div className=" text-3xl font-normal font-itim">
          {"Username:=> "}
          {session?.user?.name}
        </div>
        <div className=" text-3xl font-normal font-itim">
          {"Email:=> "}
          {session?.user?.email}
        </div>
      </div>
      <div className="grid gap-4">
        <div className=" text-3xl font-normal font-itim">
          {"Coins:=> "}
          {coins?.coins}
        </div>
        <div className=" text-3xl font-normal font-itim">
          {"Have you 2 or 1 free items?=> "}
          {coins && coins.coins >= 10 ? "yes" : "no"}
        </div>
      </div>
      <div className="p-4 border-2  transition duration-300 ease-in-out transform hover:scale-110">
        <SignOut>{""}</SignOut>
      </div>
    </div>
  );
}
