import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

interface AppError {
  type: string;
  message: string;
}

const errorHandler: ErrorRequestHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error encountered:", error);

  if ((error as AppError).type) {
    if ("type" in error)
      switch (error.type) {
        case "conflict":
          res.status(409).send({ message: error.message });
          break;
        case "not_found":
          res.status(404).send({ message: error.message });
          break;
        case "unauthorized":
          res.status(401).send({ message: error.message });
          break;
        case "unprocessable_entity":
          res.status(422).send({ message: error.message });
          break;
        case "bad_request":
          res.status(400).send({ message: error.message });
          break;
        default:
          console.error("Unhandled application error type:", error.type);
          res.status(500).send({ message: "Internal Server Error" });
          break;
      }
  } else {
    res.status(500).send({ message: "Internal Server Error" });
  }

  next();
};

export default errorHandler;
