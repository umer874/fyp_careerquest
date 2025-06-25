const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  portfolio_asset: {
    path: { 
      type: String, 
      required: true 
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
