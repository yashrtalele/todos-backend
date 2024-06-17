import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteTodo = async (id: number) => {
  try {
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    return todo;
  } catch (error) {
    throw error;
  }
};
