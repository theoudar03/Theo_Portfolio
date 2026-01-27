const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, featured: -1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public (for now, usually Protected)
const createProject = async (req, res) => {
  try {
    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image' });
    }

    const { title, description, technologies, githubLink, liveLink, category, featured } = req.body;

    // Parse technologies if it comes as a JSON string (common with FormData)
    let parsedTechnologies;
    try {
      parsedTechnologies = JSON.parse(technologies);
    } catch (e) {
      // If it's not a JSON string, assume it's already an array or a comma-separated string
      parsedTechnologies = Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim());
    }

    // Create new project
    const newProject = new Project({
      title,
      description,
      technologies: parsedTechnologies,
      githubLink,
      liveLink,
      category,
      featured: featured === 'true' || featured === true, // Handle boolean from FormData string
      image: `/uploads/projects/${req.file.filename}` // Store relative path
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProjects,
  createProject
};
