import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const completeTodo = async (id: number) => {
  try {
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed: true,
      },
    });
    return todo;
  } catch (error) {
    throw error;
  }
};
