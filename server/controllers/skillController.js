const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, category: 1, name: 1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getSkills
};
