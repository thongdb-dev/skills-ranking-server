import Skill from '../models/Skill.js';

export const getSkills = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      search = '',
      sort = '-createdAt',
    } = req.query;
    const userId = req.user.id;

    const filter = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const skillsQuery = Skill.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: 'myskills',
          localField: '_id',
          foreignField: 'skill',
          as: 'mySkillData',
        },
      },
      {
        $addFields: {
          achieved: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: '$mySkillData',
                        as: 'item',
                        cond: { $eq: ['$$item.user', userId] },
                      },
                    },
                  },
                  0,
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creator',
        },
      },
      {
        $unwind: {
          path: '$creator',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          mySkillData: 0,
          'creator.password': 0,
          'creator.__v': 0,
        },
      },
      { $sort: { createdAt: sort === '-createdAt' ? -1 : 1 } },
      { $skip: (page - 1) * pageSize },
      { $limit: Number(pageSize) },
    ]);

    const skills = await skillsQuery.exec();
    const totalCount = await Skill.countDocuments(filter);

    res.status(200).json({
      totalCount,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / pageSize),
      pageSize: Number(pageSize),
      skills,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { name, description, image, creator, active } = req.body;

    if (!name || !creator) {
      return res
        .status(400)
        .json({ error: 'Name and Creator are required fields.' });
    }

    const newSkill = new Skill({
      name,
      description,
      image,
      creator,
      active: active || 1,
    });

    const savedSkill = await newSkill.save();

    res.status(201).json({
      skill: savedSkill,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, active } = req.body;

    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      {
        name,
        description,
        image,
        active,
      },
      { new: true, runValidators: true },
    );

    if (!updatedSkill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.status(200).json({
      skill: updatedSkill,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
