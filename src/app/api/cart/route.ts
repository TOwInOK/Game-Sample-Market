import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  addToCart,
  addToCartMany,
  getCart,
  removeFromCart,
} from "@/app/api/cart/cart";
import { Products } from "@/app/api/products/Products";
import { Product } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    let session = await auth();
    if (session?.user?.email) {
      const products: Products = await request.json();
      for (let item of products.vec) {
        await addToCart(session.user.email, item);
      }
      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    let session = await auth();
    if (session?.user?.email) {
      const cart = await getCart(session.user.email);
      return NextResponse.json({ cart });
    } else {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error: " + error },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    let session = await auth();
    if (session?.user?.email) {
      const itemId: number = await request.json();
      await removeFromCart(session.user.email, itemId);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    let session = await auth();
    if (session?.user?.email) {
      const products: Product[] = await request.json();
      await addToCartMany(session.user.email, products);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error: " + error },
      { status: 500 },
    );
  }
}
