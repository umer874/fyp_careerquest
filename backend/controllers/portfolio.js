const Portfolio = require('../models/Portfolio');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get user portfolios
// @route   GET /api/portfolios/user/:userId
// @access  Private
exports.getUserPortfolios = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 9 } = req.query;
  const userId = req.params.id;

  const startIndex = (page - 1) * limit;
  const total = await Portfolio.countDocuments({ userId });

  const portfolios = await Portfolio.find({ userId })
    .skip(startIndex)
    .limit(parseInt(limit))
    .sort('-created_at');

  res.status(200).json({
    success: true,
    count: portfolios.length,
    data: portfolios,
    meta: {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      pageSize: parseInt(limit)
    }
  });
});

// @desc    Get single portfolio
// @route   GET /api/portfolios/:id
// @access  Private
exports.getPortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    return next(
      new ErrorResponse(`Portfolio not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: portfolio
  });
});

// @desc    Create portfolio
// @route   POST /api/portfolios
// @access  Private
exports.createPortfolio = asyncHandler(async (req, res) => {
  try{
  console.log('Raw request headers:', req.headers);
  console.log('Content-Type header:', req.headers['content-type']);

  if (!req.file) {
    console.error('File upload details:');
    console.error('- Field name expected:', 'portfolio_asset');
    console.error('- Received files:', req.files);
    console.error('- Request body:', req.body);

    return res.status(400).json({
      success: false,
      error: "File upload failed",
      details: {
        expected: "multipart/form-data with 'portfolio_asset' field",
        received: {
          contentType: req.headers['content-type'],
          bodyKeys: Object.keys(req.body)
        }
      }
    });
  }

  const { title, description } = req.body;

  if (!title || !description) {
    console.error('[CreatePortfolio] Missing required fields');
    return res.status(400).json({
      success: false,
      error: "Missing required fields",
      required: ["title", "description"]
    });
  }

  console.log('[CreatePortfolio] Creating portfolio entry...');
  const portfolio = await Portfolio.create({
    title,
    description,
    userId: req.user.id,
    portfolio_asset: {
      filename: req.file.filename,
      path: req.file.path,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    }
  });

  console.log('[CreatePortfolio] Portfolio created successfully:', portfolio.id);
  res.status(201).json({
    success: true,
    data: portfolio
  });

} catch (err) {
  console.error('[CreatePortfolio] Error:', err.message);
  console.error(err.stack);

  // Handle specific errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      details: err.message
    });
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      error: "File too large",
      details: "Maximum file size is 50MB"
    });
  }

  res.status(500).json({
    success: false,
    error: "Server Error",
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}
});



// @desc    Update portfolio
// @route   PUT /api/portfolios/:id
// @access  Private
exports.updatePortfolio = asyncHandler(async (req, res, next) => {
  // Validate the portfolio ID format first
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorResponse(`Invalid portfolio ID format`, 400));
  }

  let portfolio = await Portfolio.findOne({
    _id: req.params.id,
    userId: req.user.id // Ensure the portfolio belongs to the requesting user
  });

  if (!portfolio) {
    return next(
      new ErrorResponse(`Portfolio not found with id of ${req.params.id}`, 404)
    );
  }

  // Update only allowed fields
  const { title, description, portfolio_asset } = req.body;
  if (title) portfolio.title = title;
  if (description) portfolio.description = description;
  if (portfolio_asset) portfolio.portfolio_asset = portfolio_asset;

  await portfolio.save();

  res.status(200).json({
    success: true,
    data: portfolio
  });
});

// @desc    Delete portfolio
// @route   DELETE /api/portfolios/:id
// @access  Private
exports.deletePortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    return next(
      new ErrorResponse(`Portfolio not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is portfolio owner
  if (portfolio.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this portfolio`,
        401
      )
    );
  }

  await portfolio.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});