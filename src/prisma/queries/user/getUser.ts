import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUser = async (username: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
        password: password,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
