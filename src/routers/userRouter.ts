import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { signUpSchema, signInSchema } from "../schemas/userSchema";
import { authController } from "../controller/userController";
import { validateToken } from "../middlewares/tokenMiddleware";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(signUpSchema), authController.handleSignUp);
userRouter.post("/sign-in", validateSchema(signInSchema), authController.handleSignIn);
userRouter.delete("/erase", validateToken, authController.handleDeleteAccount);

export default userRouter;
