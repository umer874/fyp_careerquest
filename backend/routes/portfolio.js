require('dotenv').config();

// routes/assessment.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/portfolio');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload'); 
const protect  = require('../middleware/auth');
//const Portfolio = require('../models/Portfolio');



// Match exactly with your endpoint definitions
router.route('/create')
  .post( protect,controller.createPortfolio);

router.route('/update/:id')
  .put(auth, controller.updatePortfolio);

router.route('/delete/:id')
  .delete(auth, controller.deletePortfolio);

router.route('/get/:id')
  .get(auth, controller.getPortfolio);

router.route('/get-user-portfolios/:id')
  .get(auth, controller.getUserPortfolios);

module.exports = router;