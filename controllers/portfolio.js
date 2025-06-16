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
exports.createPortfolio = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.userId = req.user.id;

  const portfolio = await Portfolio.create(req.body);

  res.status(201).json({
    success: true,
    data: portfolio
  });
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