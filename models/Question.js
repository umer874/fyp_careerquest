const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true,
    uppercase: true,
    trim: true
  },
  text: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true,
    validate: {
      validator: v => Array.isArray(v) && v.length > 0,
      message: 'At least one tag is required'
    }
  },
  weight: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

const questionSchema = new mongoose.Schema({
  questionId: {  // Changed from 'id' to be explicit
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: {
    type: [optionSchema],
    required: true,
    validate: {
      validator: v => Array.isArray(v) && v.length > 0,
      message: 'At least one option is required'
    }
  }
});

// Add compound index if you frequently search by both fields
questionSchema.index({ questionId: 1, question: 'text' });

module.exports = mongoose.model('Question', questionSchema);