import { Router } from "express";

import { verifyToken } from "../middleware/authJwt";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

const router = Router();

router.post("/", verifyToken, createTask);
router.put("/:taskId", verifyToken, updateTask);
router.delete("/:taskId", verifyToken, deleteTask);
router.get("/:taskId", verifyToken, getTask);

export default router;
