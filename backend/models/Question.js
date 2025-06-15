const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  id: String,
  text: String,
});

const questionSchema = new mongoose.Schema({
  id: Number,
  question: String,
  options: [optionSchema],
});

module.exports = mongoose.model('Question', questionSchema);
