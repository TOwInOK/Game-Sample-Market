"use server";
import { PrismaClient } from "@prisma/client";
import { Product } from "@/app/api/products/Product";
import { rand_num } from "@/app/api/random";
import { Products } from "@/app/api/products/Products";

const prisma = new PrismaClient();
export const createProduct = async (
  product: Omit<Product, "id">,
): Promise<Product> => {
  const createdProduct = await prisma.product.create({
    data: {
      name: product.name,
      price: product.price,
      stats: {
        create: product.stats.map((stat) => ({
          value: stat.value,
          stat: stat.stat,
        })),
      },
    },
    include: {
      stats: true,
    },
  });

  return {
    id: createdProduct.id,
    name: createdProduct.name,
    stats: createdProduct.stats.map((stat) => ({
      value: stat.value,
      stat: stat.stat,
    })),
    price: createdProduct.price,
  };
};
export const getProducts = async (): Promise<Products> => {
  const products = await prisma.product.findMany({
    include: {
      stats: true,
    },
  });

  return {
    vec: products.map((product) => ({
      id: product.id,
      name: product.name,
      stats: product.stats.map((stat) => ({
        value: stat.value,
        stat: stat.stat,
      })),
      price: product.price,
    })),
  };
};

export const updateProduct = async (
  id: number,
  product: Partial<Product>,
): Promise<Product> => {
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name: product.name,
      price: product.price,
      stats: {
        upsert: product.stats?.map((stat) => ({
          where: { id: rand_num() }, // Assuming stat has an id
          update: {
            value: stat.value,
            stat: stat.stat,
          },
          create: {
            value: stat.value,
            stat: stat.stat,
          },
        })),
      },
    },
    include: {
      stats: true,
    },
  });

  return {
    id: updatedProduct.id,
    name: updatedProduct.name,
    stats: updatedProduct.stats.map((stat) => ({
      value: stat.value,
      stat: stat.stat,
    })),
    price: updatedProduct.price,
  };
};

export const deleteProduct = async (id: number): Promise<void> => {
  await prisma.product.delete({
    where: { id },
  });
};
