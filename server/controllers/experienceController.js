const Experience = require('../models/Experience');

// @desc    Get all experience entries
// @route   GET /api/experience
// @access  Public
const getExperience = async (req, res) => {
  try {
    // Sort by order (ascending), then newest entries first (createdAt descending)
    const experience = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getExperience
};
