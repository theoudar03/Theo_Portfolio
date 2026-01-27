const express = require('express');
const router = express.Router();
const { getSkills } = require('../controllers/skillController');

// GET all skills
router.get('/', getSkills);

module.exports = router;
