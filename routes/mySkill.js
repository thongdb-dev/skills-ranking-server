import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import {
  createMySkill,
  deleteMySkill,
  getMySkills,
  updateMySkillLevel,
} from '../controllers/mySkillsController.js';

const router = express.Router();

router.get('/', verifyToken, getMySkills);
router.post('/', verifyToken, createMySkill);
router.put('/:id/level', verifyToken, updateMySkillLevel);
router.delete(':/id', verifyToken, deleteMySkill);

export default router;
