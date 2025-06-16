/**
 * Wrapper for async middleware to handle errors
 * @param {Function} fn Async middleware function
 * @returns {Function} Wrapped middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    // Handle mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    // Handle mongoose duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const message = `${field} already exists`;
      return res.status(400).json({
        success: false,
        error: message
      });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    // Handle JWT expired errors
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired, please login again'
      });
    }

    // Handle custom ErrorResponse
    if (err.isOperational) {
      return res.status(err.statusCode || 500).json({
        success: false,
        error: err.message
      });
    }

    // Log unexpected errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Unexpected Error:', err);
    }

    // Handle all other errors
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  });
};

module.exports = asyncHandler;