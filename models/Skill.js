import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill Name is required!"],
      min: 2,
      max: 50,
    },
    active: Number,
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", SkillSchema);

export default Skill;