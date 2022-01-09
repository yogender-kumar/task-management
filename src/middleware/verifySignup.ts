import { Request, Response, NextFunction } from "express";

import UserModel, { User } from "../models/user.model";
import logger from "../config/logger.config";

export const checkDuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (user) {
      logger.warn("[SIGNUP] Email already exists!");
      return res.status(400).send({ message: "Email already exists!" });
    }
    next();
  } catch (err) {
    logger.error(err, "[SIGNUP] check duplicate email");
    return res.status(500).send({ message: err });
  }
};
