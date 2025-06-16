const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: { type: String, required: true },
  coordinates: { type: Array }, // or [Number] or { type: [Number] }
  checked: { type: Boolean },
  password: { type: String, required: true },
    skills: {
    type: [String],
    default: []
  },
});

module.exports = mongoose.model('User', userSchema);
