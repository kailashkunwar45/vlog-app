import express from "express";
const router = express.Router();

import { signin, signup, updateUser } from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update/:id", auth, updateUser);

export default router;
