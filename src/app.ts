import express, { Response, NextFunction } from "express";
import cors from "cors";
import { connect } from "mongoose";

import dbConfig from "./config/db.config";
import logger from "./config/logger.config";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(function (_, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

const port = 3000;

connect(
  `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
  (err: Error) => {
    if (err) {
      logger.error("Unable to connect to Database ........");
      process.exit(1);
    } else {
      app.listen(port, () => {
        logger.info(`Application is running on port ${port}.`);
      });
    }
  }
);
