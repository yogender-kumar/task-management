import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import config from "../config/auth.config";
import logger from "../config/logger.config";
import UserModel, { validatePassword } from "../models/user.model";

export const signup = async (req: Request, res: Response) => {
  try {
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();

    logger.info("[SIGNUP] success");
    res.status(201).send({ message: "User registered successfully!" });
  } catch (err) {
    logger.error(err, "[SIGNUP] error");
    return res.status(500).send({ message: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      logger.warn("[LOGIN] error");
      return res.status(404).send({ message: "User not found" });
    }
    const isMatch = await validatePassword(req.body.password, user.password);
    if (!isMatch) {
      logger.warn("[LOGIN] Invalid Password");
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const accessToken = jwt.sign(
      { id: user.id, name: user.name },
      config.secret,
      { expiresIn: 86400 }
    );
    res.send({
      accessToken,
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    logger.error(err, "[LOGIN] error");
    return res.status(500).send({ message: err });
  }
};
