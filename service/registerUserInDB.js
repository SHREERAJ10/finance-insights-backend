import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const registerUserInDB = async (username, userId) => {
  const user = await prisma.user.create({
    data: {
      id: userId,
      username: username,
    },
  });
};

export default registerUserInDB;
