import { Request, Response, NextFunction } from "express";
import { credentialService } from "../services/credentialService";
import { CredentialCreationRequestData } from "../types/credentialTypes";

async function handleCreateCredential(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = res.locals.userId as number;
  const data = req.body as CredentialCreationRequestData;

  try {
    await credentialService.createCredential(userId, data);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function handleGetAllCredentials(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = res.locals.userId as number;

  try {
    const credentials = await credentialService.getAllCredentials(userId);
    res.status(200).json(credentials);
  } catch (error) {
    next(error);
  }
}

async function handleGetCredentialById(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = res.locals.userId as number;
  const credentialId = Number(req.params.id);

  try {
    const credential = await credentialService.getCredentialById(userId, credentialId);
    res.status(200).json(credential);
  } catch (error) {
    next(error);
  }
}

async function handleUpdateCredential(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = res.locals.userId as number;
  const credentialId = Number(req.params.id);
  const data = req.body as CredentialCreationRequestData;

  try {
    await credentialService.updateCredential(userId, credentialId, data);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

async function handleDeleteCredential(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = res.locals.userId as number;
  const credentialId = Number(req.params.id);

  try {
    await credentialService.deleteCredential(userId, credentialId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export const credentialController = {
  handleCreateCredential,
  handleGetAllCredentials,
  handleGetCredentialById,
  handleUpdateCredential,
  handleDeleteCredential,
};
