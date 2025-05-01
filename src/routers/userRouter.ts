import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { signUpSchema, signInSchema } from "../schemas/userSchema";
import { authController } from "../controller/userController";
import { validateToken } from "../middlewares/tokenMiddleware";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), authController.handleSignUp);
authRouter.post("/sign-in", validateSchema(signInSchema), authController.handleSignIn);
authRouter.delete("/erase", validateToken, authController.handleDeleteAccount);

export default authRouter;
