import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

import logger from "../config/logger.config";

const SALT_FACTORY = 10;

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}

const schema = new Schema<User>(
  {
    name: { type: String, required: true, index: { unique: true } },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next: any) {
  logger.info("[SAVE USER]");
  if (!this.isModified("password")) {
    return next();
  }
  const user = this;
  bcrypt.genSalt(SALT_FACTORY, function (err, salt) {
    if (err) {
      logger.error(err, "[PASSWORD] generate salt error");
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (e, hash) {
      if (e) {
        logger.error(e, "[PASSWORD] hash error");
        return next(e);
      }
      user.password = hash;
      logger.info("[PASSWORD] success");
      next();
    });
  });
});

export const validatePassword = async (
  password: string,
  dbPassword: string,
) => {
  try {
    const isMatch = await bcrypt.compare(password, dbPassword);
    return isMatch;
  } catch (err) {
    logger.info(`[PASSWORD MATCH] status: error`);
  }
};

const UserModel = model<User>("User", schema);

export default UserModel;
