"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Example usage:
async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function isAdmin(email: string) {
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      privilege: true,
    },
  });

  return user?.privilege === "Admin";
}

async function deleteUserByName(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function createUser(email: string, name: string, password?: string) {
  return prisma.user.create({
    data: {
      email,
      name,
      password,
      coins: 0,
    },
  });
}

async function updateUser(email: string, password: string) {
  return prisma.user.update({
    where: {
      email,
    },
    data: {
      password,
    },
  });
}

async function addCoins(email: string, coins: number) {
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

async function existUser(email: string) {
  let user = prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user !== null;
}

export {
  getUserByEmail,
  deleteUserByName,
  createUser,
  updateUser,
  addCoins,
  existUser,
  isAdmin,
};
