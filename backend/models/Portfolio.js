const mongoose = require('mongoose');

const portfolioAssetSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true,
    enum: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'video/mp4', 'video/quicktime']
  },
  size: {
    type: Number,
    required: true
  },
  full_thumbnail_path: {
    type: String,
    required: function() {
      return this.mimetype.startsWith('image/') || this.mimetype.startsWith('video/');
    }
  },
  type: {
    type: String,
    required: true,
    enum: ['image', 'video', 'pdf'],
    default: function() {
      if (this.mimetype.startsWith('image/')) return 'image';
      if (this.mimetype.startsWith('video/')) return 'video';
      if (this.mimetype === 'application/pdf') return 'pdf';
      return null;
    }
  }
});

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  portfolio_asset: {
    type: portfolioAssetSchema,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update the updated_at field before saving
portfolioSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// Add text index for search functionality
portfolioSchema.index({
  title: 'text',
  description: 'text'
});

module.exports = mongoose.model('Portfolio', portfolioSchema);