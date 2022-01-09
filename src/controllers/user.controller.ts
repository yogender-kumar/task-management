import { Request, Response } from "express";

import logger from "../config/logger.config";
import UserModel from "../models/user.model";

export const updateUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const id = req.userId;
    const user = await UserModel.findById(id);
    if (!user) {
      logger.warn("[UPDATE_USER] user not found");
      return res.status(404).send({ message: "User not found" });
    }
    user.name = req.body.name || user.name;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.save((err) => {
      if (err) {
        logger.error("[UPDATE_USER] save error");
        return res.status(500).send({ message: err });
      }
      res.status(204).send();
    });
  } catch (err) {
    logger.error(err, "[UPDATE_USER] error");
    return res.status(500).send({ message: err });
  }
};
