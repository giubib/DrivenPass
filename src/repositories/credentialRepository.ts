import prisma from "../config/database";
import { Credential } from "@prisma/client";
import { CredentialRepoData } from "../types/credentialTypes";

async function findByIdAndUserId(id: number, userId: number): Promise<Credential | null> {
  return prisma.credential.findFirst({
    where: {
      id: id,
      userId: userId,
    },
  });
}

async function findByTitleAndUserId(userId: number, title: string): Promise<Credential | null> {
  return prisma.credential.findFirst({
    where: {
      userId: userId,
      title: title,
    },
  });
}

async function findAllByUserId(userId: number): Promise<Credential[]> {
  return prisma.credential.findMany({
    where: {
      userId: userId,
    },
  });
}

async function insert(userId: number, data: CredentialRepoData): Promise<Credential> {
  return prisma.credential.create({
    data: {
      ...data,
      userId: userId,
    },
  });
}

async function update(id: number, data: Partial<CredentialRepoData>): Promise<Credential> {
  return prisma.credential.update({
    where: { id: id },
    data: data,
  });
}

async function remove(id: number): Promise<Credential> {
  return prisma.credential.delete({
    where: { id: id },
  });
}

export const credentialRepository = {
  findByIdAndUserId,
  findByTitleAndUserId,
  findAllByUserId,
  insert,
  update,
  remove,
};
