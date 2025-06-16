class ErrorResponse extends Error {
  /**
   * Create custom ErrorResponse
   * @param {string} message Error message
   * @param {number} statusCode HTTP status code
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // To distinguish operational errors from programming errors
    
    // Capture stack trace, excluding constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Create a bad request error (400)
   * @param {string} message Error message
   * @returns {ErrorResponse} Bad request error
   */
  static badRequest(message = 'Bad Request') {
    return new ErrorResponse(message, 400);
  }

  /**
   * Create an unauthorized error (401)
   * @param {string} message Error message
   * @returns {ErrorResponse} Unauthorized error
   */
  static unauthorized(message = 'Unauthorized') {
    return new ErrorResponse(message, 401);
  }

  /**
   * Create a forbidden error (403)
   * @param {string} message Error message
   * @returns {ErrorResponse} Forbidden error
   */
  static forbidden(message = 'Forbidden') {
    return new ErrorResponse(message, 403);
  }

  /**
   * Create a not found error (404)
   * @param {string} message Error message
   * @returns {ErrorResponse} Not found error
   */
  static notFound(message = 'Not Found') {
    return new ErrorResponse(message, 404);
  }

  /**
   * Create a conflict error (409)
   * @param {string} message Error message
   * @returns {ErrorResponse} Conflict error
   */
  static conflict(message = 'Conflict') {
    return new ErrorResponse(message, 409);
  }

  /**
   * Create a validation error (422)
   * @param {string} message Error message
   * @returns {ErrorResponse} Validation error
   */
  static validationError(message = 'Validation Error') {
    return new ErrorResponse(message, 422);
  }

  /**
   * Create a server error (500)
   * @param {string} message Error message
   * @returns {ErrorResponse} Server error
   */
  static serverError(message = 'Internal Server Error') {
    return new ErrorResponse(message, 500);
  }

  /**
   * Convert error to JSON response format
   * @returns {Object} Error response object
   */
  toJSON() {
    return {
      success: false,
      error: this.message,
      statusCode: this.statusCode,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined
    };
  }
}

module.exports = ErrorResponse;