const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [
    {
      id: String,
      text: String,
      weight: Number,
      tags: [String], // Tags that hint at skills (e.g. ["Frontend", "JavaScript"])
    },
  ]
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
