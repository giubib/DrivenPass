import { User } from "@prisma/client";

export type UserCreationData = Omit<User, "id" | "createdAt" | "updatedAt">;

export interface UserSignUpData {
  name: string;
  email: string;
  password: string;
}

export interface UserSignInData {
  email: string;
  password: string;
}
