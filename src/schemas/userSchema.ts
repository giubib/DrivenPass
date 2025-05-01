import joi from "joi";
import { UserSignUpData, UserSignInData } from "../types/userTypes";

export const signUpSchema = joi.object<UserSignUpData & { confirmPassword?: string }>({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().required().valid(joi.ref("password")).messages({
    "any.only": "Senhas não conferem",
  }),
});

export const signInSchema = joi.object<UserSignInData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
