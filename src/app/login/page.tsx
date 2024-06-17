"use server";
import { auth, signIn, signOut } from "@/auth";

export default async function Page() {
  function GoogleIn() {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("google", { callbackUrl: "/" });
        }}
      >
        <button type="submit">Sign in with google</button>
      </form>
    );
  }

  function SignOut() {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Log Out</button>
      </form>
    );
  }

  let session = await auth();

  return (
    <section className="flex flex-col gap-12">
      {session?.user?.email ? (
        <div>
          <h1>You are signed</h1>
          <SignOut />
        </div>
      ) : (
        <div className="grid">
          <h1>use social</h1>
          <div>{<GoogleIn />}</div>
        </div>
      )}
    </section>
  );
}
