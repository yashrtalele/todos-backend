import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getTodo = async (userId: number) => {
  try {
    const todo = await prisma.todo.findMany({
      where: {
        userId,
      },
    });
    return todo;
  } catch (error) {
    throw error;
  }
};
