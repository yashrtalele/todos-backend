import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUser = async (username: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
        password: password,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
