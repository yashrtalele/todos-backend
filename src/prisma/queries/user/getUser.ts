import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUser = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
