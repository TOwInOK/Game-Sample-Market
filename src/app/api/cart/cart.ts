// Example usage:
import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

async function getCart(email: string) {
  return prisma.cart.findUnique({
    where: {
      user_mail: email,
    },
    include: {
      products: true,
    },
  });
}

function addToCart(email: string, product: Product) {
  return prisma.cart.update({
    where: {
      user_mail: email,
    },
    data: {
      products: {
        connect: product,
      },
    },
  });
}

async function removeFromCart(email: string, productId: number) {
  return prisma.cart.update({
    where: {
      user_mail: email,
    },
    data: {
      products: {
        disconnect: {
          id: productId,
        },
      },
    },
  });
}

//flush
async function flushCart(email: string) {
  return prisma.cart.update({
    where: {
      user_mail: email,
    },
    data: {
      products: {
        set: [],
      },
    },
  });
}

function addToCartMany(email: string, products: Product[]) {
  return prisma.cart.update({
    where: {
      user_mail: email,
    },
    data: {
      products: {
        set: products,
      },
    },
  });
}

export { getCart, addToCart, removeFromCart, flushCart, addToCartMany };
