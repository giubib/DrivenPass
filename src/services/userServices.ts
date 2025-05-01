import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";
import { UserCreationData as UserRepoData } from "../types/userTypes";
import { UserSignInData } from "../types/userTypes";

interface UserSignUpData {
  name: string;
  email: string;
  password: string;
}

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

function throwError(type: string, message: string): never {
  throw { type, message };
}

async function signUp(userData: UserSignUpData): Promise<void> {
  const { name, email, password } = userData;

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throwError("conflict", "Email já cadastrado.");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const userToCreate: UserRepoData = {
    name,
    email,
    password: hashedPassword,
  };

  await userRepository.create(userToCreate);
}

async function signIn(loginData: UserSignInData): Promise<string> {
  const { email, password } = loginData;

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throwError("not found", "Usuario não encontrado");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throwError("unauthorized", "Senha incorreta");
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("FATAL: JWT_SECRET environment variable is not set.");
    throwError("internal_server_error", "Server configuration error.");
  }

  const tokenPayload = { userId: user.id };
  const tokenOptions: jwt.SignOptions = { expiresIn: process.env.JWT_EXPIRES_IN || "1d" };

  const token = jwt.sign(tokenPayload, jwtSecret, tokenOptions);

  return token;
}
async function deleteAccount(userId: number): Promise<void> {
  await userRepository.remove(userId);
}

export const authService = {
  signUp,
  signIn,
  deleteAccount,
};
