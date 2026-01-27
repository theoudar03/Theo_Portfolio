const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String, // "Technical Skill" or "Tool"
    required: true,
    enum: ['Technical Skill', 'Tool']
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Experienced', 'Basics'],
    required: false
  },
  iconUrl: {
    type: String, // URL from DevIcon or SimpleIcons
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
