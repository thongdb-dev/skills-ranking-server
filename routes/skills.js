import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { createSkill, getSkills, updateSkill } from "../controllers/skillsController.js";

const router = express.Router();

router.get("/", verifyToken, getSkills);
router.post("/", verifyToken, createSkill);
router.put("/:id", verifyToken, updateSkill);

export default router;