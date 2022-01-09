import { Router } from "express";

import { verifyToken } from "../middleware/authJwt";
import { updateUser } from "../controllers/user.controller";

const router = Router();

router.put("/", verifyToken, updateUser);

export default router;
