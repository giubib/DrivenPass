import { Router } from "express";
import { validateToken } from "../middlewares/tokenMiddleware";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";
import { credentialController } from "../controller/credentialController";
import { validateParamId } from "../middlewares/paramMiddleware";

const credentialRouter = Router();

credentialRouter.use(validateToken);

credentialRouter.post("/", validateSchema(credentialSchema), credentialController.handleCreateCredential);

credentialRouter.get("/", credentialController.handleGetAllCredentials);

credentialRouter.get("/:id", validateParamId, credentialController.handleGetCredentialById);

credentialRouter.put(
  "/:id",
  validateParamId,
  validateSchema(credentialSchema),
  credentialController.handleUpdateCredential
);

credentialRouter.delete("/:id", validateParamId, credentialController.handleDeleteCredential);

export default credentialRouter;
