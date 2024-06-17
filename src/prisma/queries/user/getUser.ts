import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUser = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
