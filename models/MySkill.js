import mongoose from "mongoose";

const MySkillSchema = new mongoose.Schema(
  {
    skillId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MySkill = mongoose.model("MySkill", MySkillSchema);

export default MySkill;