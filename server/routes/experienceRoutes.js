const express = require('express');
const router = express.Router();
const { getExperience } = require('../controllers/experienceController');

// GET all experience
router.get('/', getExperience);

module.exports = router;
