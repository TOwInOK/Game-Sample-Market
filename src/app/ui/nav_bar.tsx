import Cart from "@/app/ui/cart";
import NavLinks from "./nav_links";
import { auth, signOut } from "@/auth";
import React, { Suspense } from "react";

export function SignOut({ children }: { children: React.ReactNode }) {
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
    <nav className="w-full items-center justify-between gap-24 inline-flex">
      <Suspense fallback={<div>Loading...</div>}>
        <NavLinks />
      </Suspense>
      {session ? (
        <div className="flex gap-4 items-center">
          <Cart />
        </div>
      ) : (
        <div className="p-2.5">{""}</div>
      )}
    </nav>
  );
}
