import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createTodo = async (
  title: string,
  description: string,
  userId: number,
) => {
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId,
      },
    });
    return todo;
  } catch (error) {
    throw error;
  }
};
