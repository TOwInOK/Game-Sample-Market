import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createUser, getUserByEmail } from "@/app/api/auth/crud";

export async function GET(request: NextRequest) {
  try {
    let session = await auth();
    if (session?.user?.email && session?.user?.name) {
      console.log("Email: " + session.user.email);
      let user = await getUserByEmail(session.user.email);
      if (!user) {
        let new_user = await createUser(session.user.email, session.user.name);
        if (new_user) {
          return NextResponse.redirect(new URL("/", request.url));
        } else {
          return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 },
          );
        }
      } else {
        return NextResponse.json({ message: "User already exists" });
      }
    } else {
      return NextResponse.json({ error: "No session found" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
