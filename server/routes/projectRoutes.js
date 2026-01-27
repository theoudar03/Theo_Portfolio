const express = require('express');
const router = express.Router();
const { getProjects, createProject } = require('../controllers/projectController');
const upload = require('../middleware/uploadMiddleware');

// GET all projects
router.get('/', getProjects);

// POST a new project with image upload
// Key for the image file in FormData must be 'image'
router.post('/', upload.single('image'), createProject);

module.exports = router;
