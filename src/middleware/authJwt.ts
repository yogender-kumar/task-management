import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import config from "../config/auth.config";
import logger from "../config/logger.config";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      logger.warn("[AUTHORIZATION] No token provided");
      return res.status(403).send({ message: "No token provided" });
    }
    const user = await jwt.verify(token, config.secret);
    // @ts-ignore
    req.userId = user.id;
    next();
  } catch (err) {
    logger.warn("[AUTHORIZATION] Unauthorized");
    return res.status(401).send({ message: "Unauthorized!" });
  }
};
