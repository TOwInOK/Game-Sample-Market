"use server";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

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

  function GithubIn() {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button type="submit">Sign in with github</button>
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
  if (session?.user?.email) {
    redirect("/proof");
  }

  return (
    <section className="flex flex-col gap-12">
      {session?.user?.email ? (
        <div>
          <h1>You are signed</h1>
          <SignOut />
        </div>
      ) : (
        <div className="grid gap-6">
          <h1 className="text-3xl font-bold ">Sign with:</h1>
          <div className="grid gap-7">
            <div className="text-xl transition duration-100 ease-linear transform hover:rotate-12 ">
              {<GoogleIn />}
            </div>
            <div className="text-xl transition duration-100 ease-linear transform hover:rotate-12 ">
              {<GithubIn />}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
