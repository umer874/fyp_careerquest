// controllers/userController.js
const User = require('../models/User');
const mongoose = require('mongoose');

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { includeSkills } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Use `let` instead of `const` if you're modifying the value
    let selectFields = '_id first_name last_name email phone profile_asset';

    if (includeSkills === 'true') {
      selectFields += ' skills';
    }

    const user = await User.findById(id)
      .select(selectFields)
      .lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


// controllers/userController.js
exports.getUpdatedUser = async (req, res) => {
  try {

     if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not found in request' });
    }
    // Debug log to verify user attachment
    console.log('Authenticated user:', req.user);
    
    // Send back user data (excluding sensitive fields)
    const userData = {
      _id: req.user._id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      phone: req.user.phone,
      skills: req.user.skills || []
    };

    res.send({ success: true, user: userData });
  } catch (error) {
    console.error('GetUpdatedUser error:', error);
    res.status(500).send({ error: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const allowedUpdates = ['first_name', 'last_name', 'email','phone','profile_asset'];
    const isValidOperation = Object.keys(updates).every(update => 
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.addFcmToken = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fcm_token } = req.body;

    if (!fcm_token) {
      return res.status(400).json({ error: "FCM token is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { fcmTokens: fcm_token } },
      { new: true }
    ).select('fcmTokens');

    res.json({
      success: true,
      fcmTokens: user.fcmTokens
    });

  } catch (error) {
    console.error("Add FCM token error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};