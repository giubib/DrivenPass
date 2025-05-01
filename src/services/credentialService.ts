import cryptr from "../utils/cryptr";
import { credentialRepository } from "../repositories/credentialRepository";
import { throwError } from "../utils/errorUtils";
import {
  CredentialCreationRequestData,
  CredentialRepoData,
  CredentialResponseData,
  CredentialUpdateRequestData,
} from "../types/credentialTypes";
import { Credential } from "@prisma/client";

async function createCredential(userId: number, data: CredentialCreationRequestData): Promise<void> {
  const { title, url, username, password } = data;
  const existingByTitle = await credentialRepository.findByTitleAndUserId(userId, title);
  if (existingByTitle) {
    throwError("conflict", "Credential title already in use for this user.");
  }
  const encryptedPassword = cryptr.encrypt(password);
  const repoData: CredentialRepoData = {
    title,
    url,
    username,
    password: encryptedPassword,
  };
  await credentialRepository.insert(userId, repoData);
}

async function getAllCredentials(userId: number): Promise<CredentialResponseData[]> {
  const credentials = await credentialRepository.findAllByUserId(userId);
  const responseData = credentials.map((cred): CredentialResponseData => {
    let decryptedPassword: string | undefined = undefined;
    try {
      decryptedPassword = cryptr.decrypt(cred.password);
    } catch (error) {
      console.error(`Error decrypting password for credential ID ${cred.id}:`, error);
    }
    return {
      id: cred.id,
      userId: cred.userId,
      title: cred.title,
      url: cred.url,
      username: cred.username,
      createdAt: cred.createdAt,
      updatedAt: cred.updatedAt,
      decryptedPassword: decryptedPassword,
    };
  });
  return responseData;
}

async function getCredentialById(userId: number, credentialId: number): Promise<CredentialResponseData> {
  const credential = await credentialRepository.findByIdAndUserId(credentialId, userId);
  if (!credential) {
    throwError("not_found", "Credential not found or access denied.");
  }
  let decryptedPassword: string | undefined = undefined;
  try {
    decryptedPassword = cryptr.decrypt(credential.password);
  } catch (error) {
    console.error(`Error decrypting password for credential ID ${credential.id}:`, error);
  }
  const responseData: CredentialResponseData = {
    id: credential.id,
    userId: credential.userId,
    title: credential.title,
    url: credential.url,
    username: credential.username,
    createdAt: credential.createdAt,
    updatedAt: credential.updatedAt,
    decryptedPassword: decryptedPassword,
  };
  return responseData;
}

async function updateCredential(
  userId: number,
  credentialId: number,
  data: CredentialUpdateRequestData
): Promise<void> {
  const existingCredential = await credentialRepository.findByIdAndUserId(credentialId, userId);
  if (!existingCredential) {
    throwError("not_found", "Credential not found or access denied.");
  }
  if (data.title && data.title !== existingCredential.title) {
    const conflictingCredential = await credentialRepository.findByTitleAndUserId(userId, data.title);
    if (conflictingCredential && conflictingCredential.id !== credentialId) {
      throwError("conflict", "New credential title already in use by this user.");
    }
  }
  const dataToUpdate: Partial<CredentialRepoData> = {};
  if (data.title !== undefined) {
    dataToUpdate.title = data.title;
  }
  if (data.url !== undefined) {
    dataToUpdate.url = data.url;
  }
  if (data.username !== undefined) {
    dataToUpdate.username = data.username;
  }
  if (data.password !== undefined) {
    dataToUpdate.password = cryptr.encrypt(data.password);
  }
  if (Object.keys(dataToUpdate).length > 0) {
    await credentialRepository.update(credentialId, dataToUpdate);
  }
}

async function deleteCredential(userId: number, credentialId: number): Promise<void> {
  const credential = await credentialRepository.findByIdAndUserId(credentialId, userId);
  if (!credential) {
    throwError("not_found", "Credential not found or access denied.");
  }
  await credentialRepository.remove(credentialId);
}

export const credentialService = {
  createCredential,
  getAllCredentials,
  getCredentialById,
  updateCredential,
  deleteCredential,
};
