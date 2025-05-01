import { Credential } from "@prisma/client";

export interface CredentialCreationRequestData {
  title: string;
  url: string;
  username: string;
  password: string;
}

export type CredentialRepoData = Omit<Credential, "id" | "userId" | "createdAt" | "updatedAt">;

export type CredentialUpdateRequestData = Partial<CredentialCreationRequestData>;

export type CredentialResponseData = Omit<Credential, "password"> & { decryptedPassword?: string };
