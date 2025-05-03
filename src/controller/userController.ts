import { Request, Response, NextFunction } from "express";
import { authService } from "../services/userServices";
import { UserSignInData } from "../types/userTypes";

interface UserSignUpData {
  name: string;
  email: string;
  password: string;
}

async function handleSignUp(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userData = req.body as UserSignUpData;

  try {
    await authService.signUp(userData);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function handleSignIn(req: Request, res: Response, next: NextFunction): Promise<void> {
  const loginData = req.body as UserSignInData;

  try {
    const token = await authService.signIn(loginData);
    res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
}

async function handleDeleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = res.locals.userId as number;
  try {
    await authService.deleteAccount(userId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export const authController = {
  handleSignUp,
  handleSignIn,
  handleDeleteAccount,
};
