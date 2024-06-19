"use server";
import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();
export const createProduct = async (product: Product): Promise<Product> => {
  return prisma.product.create({
    data: {
      name: product.name,
      price: product.price,
      value: product.value,
      stat: product.stat,
      about: product.about,
      faq: product.faq,
    },
  });
};
export const getProducts = async (): Promise<Product[]> => {
  return prisma.product.findMany();
};

export const updateProduct = async (product: Product): Promise<Product> => {
  return prisma.product.update({
    where: { id: product.id },
    data: {
      name: product.name,
      price: product.price,
      stat: product.stat,
      value: product.value,
    },
  });
};

export const deleteProduct = async (id: number): Promise<void> => {
  await prisma.product.delete({
    where: { id },
  });
};
