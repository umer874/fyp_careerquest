// models/Skill.js
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "JavaScript"
  category: String // e.g., "Frontend", "Backend"
});

module.exports = mongoose.model('Skill', skillSchema);
