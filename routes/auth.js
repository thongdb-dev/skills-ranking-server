import express from "express";

import { login, register, activateAccount } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/activate/:token', activateAccount); 

export default router;