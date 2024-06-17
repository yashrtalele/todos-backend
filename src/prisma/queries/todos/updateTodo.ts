import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const updateTodo = async (
  id: number,
  title: string,
  description: string,
) => {
  try {
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });
    return todo;
  } catch (error) {
    throw error;
  }
};
