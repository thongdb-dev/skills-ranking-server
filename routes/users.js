import express from "express";

import { verifyToken } from "../middlewares/auth.js";
import { getUser } from "../controllers/usersController.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);

export default router;