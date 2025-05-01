import Joi from "joi";
import { CredentialCreationRequestData } from "../types/credentialTypes";

export const credentialSchema = Joi.object<CredentialCreationRequestData>({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
