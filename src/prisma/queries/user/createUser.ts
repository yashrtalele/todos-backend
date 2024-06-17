import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
) => {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        firstName,
        lastName,
        password,
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
