import MySkill from '../models/MySkill.js';

export const getMySkills = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      sort = '-createdAt',
      search = '',
    } = req.query;
    const userId = req.user.id;

    const skillFilter = search
      ? { $or: [{ name: { $regex: search, $options: 'i' } }] }
      : {};

    const mySkillsQuery = MySkill.find({ user: userId })
      .populate({
        path: 'skill',
        match: skillFilter,
        select: 'name description',
      })
      .populate('user', 'firstName lastName email')
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    const mySkills = await mySkillsQuery.exec();
    const filteredMySkills = mySkills.filter((mySkill) => mySkill.skill !== null);

    const totalCount = await MySkill.countDocuments({ user: userId });

    res.status(200).json({
      totalCount,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / pageSize),
      pageSize: Number(pageSize),
      mySkills: filteredMySkills,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMySkill = async (req, res) => {
  try {
    const { skill, level } = req.body;
    const userId = req.user.id;

    if (!skill) {
      return res.status(400).json({ error: 'Skill is required.' });
    }

    const newMySkill = new MySkill({
      skill,
      user: userId,
      level: level ?? 0,
    });

    const savedMySkill = await newMySkill.save();

    res.status(201).json(savedMySkill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMySkillLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const { level } = req.body;
    const userId = req.user.id;

    const mySkill = await MySkill.findOneAndUpdate(
      { _id: id, user: userId },
      { level },
      { new: true },
    );

    if (!mySkill) {
      return res
        .status(404)
        .json({ error: 'MySkill entry not found or not authorized to update' });
    }

    res.status(200).json(mySkill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMySkill = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const mySkill = await MySkill.findOneAndDelete({ _id: id, user: userId });

    if (!mySkill) {
      return res
        .status(404)
        .json({ error: 'MySkill entry not found or not authorized to delete' });
    }

    res.status(200).json(mySkill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
