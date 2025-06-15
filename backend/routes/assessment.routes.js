require('dotenv').config();

// routes/assessment.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/assessment.controller');

router.get('/questions', controller.getQuestions);
router.post('/submit', controller.submitAssessment);

module.exports = router;
