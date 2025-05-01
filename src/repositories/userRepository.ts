import prisma from "../config/database";
import { UserCreationData } from "../types/userTypes";

async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function create(userData: UserCreationData) {
  return prisma.user.create({
    data: userData,
  });
}
async function remove(id: number): Promise<void> {
  await prisma.user.delete({ where: { id } });
}

export const userRepository = {
  findByEmail,
  create,
  remove,
};
