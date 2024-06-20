import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { isAdmin } from "@/app/api/auth/crud";

export async function GET(request: NextRequest) {
  try {
    let session = await auth();
    if (session) {
      if (session.user?.email) {
        const user = await isAdmin(session.user.email);

        if (user) {
          return NextResponse.json({}, { status: 200 });
        } else {
          return NextResponse.json(
            { error: "User is not an admin" },
            { status: 403 },
          );
        }
      } else {
        return NextResponse.json(
          { error: "No session found" },
          { status: 401 },
        );
      }
    } else {
      return NextResponse.json({}, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}
