
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "express-async-errors";
import errorHandler from "./middlewares/errorMiddleware";
import userRouter from "./routers/userRouter";
import credentialRouter from "./routers/credentialRouter";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("OK!");
});

app.use( userRouter);
app.use("/credentials", credentialRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
