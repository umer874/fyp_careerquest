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
    type: {
      type: String,
      enum: ['image', 'video', 'pdf'],
      required: true
    },
    full_thumbnail_path: {
      type: String,
      required: true
    },
    asset_path: {
      type: String,
      required: true
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);