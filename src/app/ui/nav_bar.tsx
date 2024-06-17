import Cart from "@/app/ui/cart";
import NavLinks from "./nav_links";
import { auth, signOut } from "@/auth";
import React from "react";

function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <p>{children}</p>
      <button type="submit">Sign out</button>
    </form>
  );
}

export default async function NavBar() {
  let session = await auth();
  return (
    <div className="w-full items-center justify-between gap-24 inline-flex">
      <NavLinks />
      {session ? (
        <div className="flex gap-4 items-center">
          <SignOut>{``}</SignOut>
          <Cart />
        </div>
      ) : (
        <div className="p-2.5">{""}</div>
      )}
    </div>
  );
}
