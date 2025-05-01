import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((d) => d.message);
      res.status(422).json({
        message: "Validation failed",
        errors: errorMessages,
      });
    }

    next();
  };
}
