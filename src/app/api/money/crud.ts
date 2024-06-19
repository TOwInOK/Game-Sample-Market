"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getMoney(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      coins: true,
    },
  });
}

async function incMoney(email: string, coins: number) {
  return prisma.user.update({
    where: {
      email,
    },
    data: {
      coins: {
        increment: coins,
      },
    },
  });
}

async function decMoney(email: string, coins: number) {
  return prisma.user.update({
    where: {
      email,
    },
    data: {
      coins: {
        decrement: coins,
      },
    },
  });
}

async function flushMoney(email: string) {
  return prisma.user.update({
    where: {
      email,
    },
    data: {
      coins: {
        set: 0,
      },
    },
  });
}

export { getMoney, decMoney, incMoney, flushMoney };
