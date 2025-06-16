const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Please authenticate' });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    console.error('Authentication error:', err.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = auth;
