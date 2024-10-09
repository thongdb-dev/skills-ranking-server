import mongoose from "mongoose";

const MySkillSchema = new mongoose.Schema(
  {
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    level: Number,
  },
  { timestamps: true }
);

const MySkill = mongoose.model("MySkill", MySkillSchema);

export default MySkill;