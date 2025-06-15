// models/SkillAssessmentResult.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  answers: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      selectedOptionIndex: Number,
      isCorrect: Boolean
    }
  ],
  score: Number
});

module.exports = mongoose.model('SkillAssessmentResult', resultSchema);
