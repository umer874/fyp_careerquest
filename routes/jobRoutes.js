const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/recommended', jobController.getRecommendedJobs);

module.exports = router;