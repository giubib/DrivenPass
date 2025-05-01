import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    console.log("Authorization header missing");
    res.status(401).send("Authorization header is missing.");
    return;
  }

  const tokenParts = authorizationHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer" || !tokenParts[1]) {
    console.log("Token format invalid or token missing");
    res.status(401).send("Token format is invalid or token is missing.");
    return;
  }

  const token = tokenParts[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("FATAL: JWT_SECRET environment variable is not set.");
    res.status(500).send("Server configuration error.");
    return;
  }

  try {
    const decodedPayload = jwt.verify(token, jwtSecret) as JwtPayload;
    res.locals.userId = decodedPayload.userId;
    next();
  } catch (error) {
    console.error("JWT Validation Error:", error instanceof Error ? error.message : error);
    res.status(401).send("Invalid or expired token.");
  }
};
