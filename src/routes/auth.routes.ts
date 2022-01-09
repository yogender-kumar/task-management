import { Router } from "express";

import { checkDuplicateEmail } from "../middleware/verifySignup";
import { signup, login } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", checkDuplicateEmail, signup);
router.post("/login", login);

export default router;
