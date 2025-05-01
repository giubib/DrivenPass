import { Request, Response, NextFunction } from "express";

export function validateParamId(req: Request, res: Response, next: NextFunction): void {
  const idParam = req.params.id;
  const id = parseInt(idParam, 10);

  if (isNaN(id) || id <= 0 || String(id) !== idParam) {
    res.status(400).send("Invalid ID parameter: Must be a positive integer.");
    return;
  }

  next();
}
